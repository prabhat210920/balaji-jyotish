"use client";

import { useState, useTransition } from "react";
import { CalendarDays, Clock, CheckCircle2, XCircle, Loader2, Ban, Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Database } from "@/lib/supabase/types";
import { formatSlotDate, formatSlotTime, formatTimestamp } from "@/lib/date-utils";

type Slot = Database["public"]["Tables"]["slots"]["Row"];
type Plan = { id: string; name: string };

type FilterStatus = "ALL" | "AVAILABLE" | "HELD" | "BOOKED" | "BLOCKED";

const STATUS_CONFIG = {
  AVAILABLE: { label: "Available", color: "text-green-400 bg-green-500/10 border-green-500/20" },
  HELD: { label: "Held", color: "text-orange-400 bg-orange-500/10 border-orange-500/20" },
  BOOKED: { label: "Booked", color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
  BLOCKED: { label: "Muted", color: "text-red-400 bg-red-500/10 border-red-500/20" },
};

function formatDateTime(timeOrIso: string, slotDate?: string) {
  const date = slotDate
    ? formatSlotDate(slotDate, { includeWeekday: true })
    : timeOrIso.includes("T")
    ? formatSlotDate(timeOrIso, { includeWeekday: true })
    : "";
  const time = formatSlotTime(timeOrIso);
  return { date, time };
}

async function apiPatch(slotId: string, body: Record<string, unknown>) {
  const res = await fetch(`/api/admin/slots/${slotId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error((await res.json()).message ?? "Failed");
  return res.json();
}

async function apiDelete(slotId: string) {
  const res = await fetch(`/api/admin/slots/${slotId}`, { method: "DELETE" });
  if (!res.ok) throw new Error((await res.json()).message ?? "Failed");
}

export default function SlotManagerClient({
  initialSlots,
  plans,
}: {
  initialSlots: Slot[];
  plans: Plan[];
}) {
  const [slots, setSlots] = useState<Slot[]>(initialSlots);
  const [filter, setFilter] = useState<FilterStatus>("ALL");
  const [isPending, startTransition] = useTransition();
  const [actionSlotId, setActionSlotId] = useState<string | null>(null);

  const filtered = filter === "ALL" ? slots : slots.filter((s) => s.status === filter);

  function updateSlotLocally(id: string, patch: Partial<Slot>) {
    setSlots((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  }

  function removeSlotLocally(id: string) {
    setSlots((prev) => prev.filter((s) => s.id !== id));
  }

  async function handleStatusChange(slot: Slot, newStatus: Slot["status"]) {
    if (slot.status === "BOOKED") return; // Can't change booked slots
    setActionSlotId(slot.id);
    try {
      await apiPatch(slot.id, { status: newStatus });
      updateSlotLocally(slot.id, { status: newStatus });
    } catch (e) {
      alert("Failed to update slot: " + (e as Error).message);
    } finally {
      setActionSlotId(null);
    }
  }

  async function handleDelete(slot: Slot) {
    if (slot.status === "BOOKED") {
      alert("Cannot delete a booked slot.");
      return;
    }
    const { date, time } = formatDateTime(slot.start_time, slot.slot_date);
    if (!confirm(`Delete slot on ${date} at ${time}?`)) return;
    setActionSlotId(slot.id);
    try {
      await apiDelete(slot.id);
      removeSlotLocally(slot.id);
    } catch (e) {
      alert("Failed to delete: " + (e as Error).message);
    } finally {
      setActionSlotId(null);
    }
  }

  const filterCounts: Record<FilterStatus, number> = {
    ALL: slots.length,
    AVAILABLE: slots.filter((s) => s.status === "AVAILABLE").length,
    HELD: slots.filter((s) => s.status === "HELD").length,
    BOOKED: slots.filter((s) => s.status === "BOOKED").length,
    BLOCKED: slots.filter((s) => s.status === "BLOCKED").length,
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        {(["ALL", "AVAILABLE", "HELD", "BOOKED", "BLOCKED"] as FilterStatus[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all",
              filter === f
                ? "bg-[#C9A24D] border-[#C9A24D] text-[#0B1633]"
                : "border-white/15 text-white/50 hover:border-white/30 hover:text-white"
            )}
          >
            {f === "ALL" ? "All" : STATUS_CONFIG[f as keyof typeof STATUS_CONFIG]?.label}
            <span className="ml-1.5 opacity-60">{filterCounts[f]}</span>
          </button>
        ))}
      </div>

      {/* Slot Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-white/30 text-sm">
          <CalendarDays className="w-10 h-10 mx-auto mb-3 opacity-30" />
          No slots found.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
          {filtered.map((slot) => {
            const { date, time } = formatDateTime(slot.start_time, slot.slot_date);
            const { time: endTime } = formatDateTime(slot.end_time, slot.slot_date);
            const isLoading = actionSlotId === slot.id;
            const cfg = STATUS_CONFIG[slot.status as keyof typeof STATUS_CONFIG];

            return (
              <div
                key={slot.id}
                className="bg-white/5 border border-white/8 rounded-xl p-4 flex flex-col gap-3 hover:border-white/15 transition-colors"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-white font-semibold text-sm">{date}</p>
                    <p className="text-white/50 text-xs flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3" />
                      {time} — {endTime}
                    </p>
                  </div>
                  <span className={cn("px-2 py-0.5 rounded-full text-[0.65rem] font-bold border", cfg?.color)}>
                    {cfg?.label}
                  </span>
                </div>

                {/* Hold expiry */}
                {slot.status === "HELD" && slot.held_until && (
                  <p className="text-orange-400/70 text-xs">
                    Held until {formatTimestamp(slot.held_until, { hour: "2-digit", minute: "2-digit", hour12: true })}
                  </p>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-1 border-t border-white/8">
                  {isLoading ? (
                    <div className="flex items-center gap-1.5 text-white/30 text-xs">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" /> Updating…
                    </div>
                  ) : slot.status === "BOOKED" ? (
                    <p className="text-blue-400/60 text-xs flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Booked — no changes
                    </p>
                  ) : (
                    <>
                      {slot.status !== "AVAILABLE" && (
                        <button
                          onClick={() => handleStatusChange(slot, "AVAILABLE")}
                          title="Mark Available"
                          className="flex items-center gap-1 text-green-400 hover:text-green-300 text-xs font-medium transition-colors"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" /> Open
                        </button>
                      )}
                      {slot.status !== "BLOCKED" && (
                        <button
                          onClick={() => handleStatusChange(slot, "BLOCKED")}
                          title="Block / Mute slot"
                          className="flex items-center gap-1 text-orange-400 hover:text-orange-300 text-xs font-medium transition-colors"
                        >
                          <Ban className="w-3.5 h-3.5" /> Mute
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(slot)}
                        title="Delete slot"
                        className="ml-auto flex items-center gap-1 text-red-400/60 hover:text-red-400 text-xs font-medium transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
