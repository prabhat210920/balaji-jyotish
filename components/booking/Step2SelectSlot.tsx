"use client";

import { useEffect, useState, useCallback } from "react";
import { useBookingStore } from "@/lib/store/booking-store";
import { getBrowserClient } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/types";
import { ArrowLeft, ArrowRight, Calendar, Clock, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Slot = Database["public"]["Tables"]["slots"]["Row"];

function groupSlotsByDate(slots: Slot[]): Map<string, Slot[]> {
  const map = new Map<string, Slot[]>();
  for (const slot of slots) {
    const date = slot.start_time.split("T")[0]; // YYYY-MM-DD
    if (!map.has(date)) map.set(date, []);
    map.get(date)!.push(slot);
  }
  return map;
}

function formatDate(isoDate: string): string {
  return new Date(isoDate + "T00:00:00").toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatTime(isoString: string): string {
  return new Date(isoString).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export function Step2SelectSlot() {
  const { plan, slot: storedSlot, setSlot, setStep, setError, error, setLoading, isLoading } =
    useBookingStore();
  const [slots, setSlots] = useState<Slot[]>([]);
  const [fetching, setFetching] = useState(true);
  const [selectedId, setSelectedId] = useState<string>(storedSlot?.slotId ?? "");
  const [selectedDate, setSelectedDate] = useState<string>("");

  const fetchSlots = useCallback(async () => {
    setFetching(true);
    try {
      const supabase = getBrowserClient();
      const now = new Date().toISOString();

      // Fetch AVAILABLE slots + HELD slots (client checks expiry)
      const { data, error: fetchError } = await supabase
        .from("slots")
        .select("*")
        .or(`status.eq.AVAILABLE,and(status.eq.HELD,held_until.lt.${now})`)
        .gte("start_time", now) // only future slots
        .order("start_time", { ascending: true })
        .limit(90);

      if (fetchError) throw fetchError;
      setSlots(data ?? []);

      // Pre-select first available date
      if (data && data.length > 0) {
        const firstDate = data[0].start_time.split("T")[0];
        setSelectedDate(firstDate);
      }
    } catch {
      setError("Could not load available slots. Please refresh.");
    } finally {
      setFetching(false);
    }
  }, [setError]);

  useEffect(() => { fetchSlots(); }, [fetchSlots]);

  async function handleConfirmSlot() {
    if (!selectedId) return;
    const chosen = slots.find((s) => s.id === selectedId);
    if (!chosen) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/bookings/hold-slot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slotId: selectedId }),
      });
      const json = await res.json();

      if (!res.ok || !json.success) {
        setError(json.message ?? "Slot is no longer available. Please choose another.");
        setSelectedId("");
        await fetchSlots();
        return;
      }

      setSlot({
        slotId: chosen.id,
        slotStartTime: chosen.start_time,
        slotEndTime: chosen.end_time,
      });
      setStep(3);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const grouped = groupSlotsByDate(slots);
  const dates = Array.from(grouped.keys());
  const slotsForDate = selectedDate ? (grouped.get(selectedDate) ?? []) : [];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-serif text-2xl font-bold text-[#0B1633] mb-1">
          Pick a Date & Time
        </h2>
        <p className="text-[#202020]/60 text-sm">
          Showing available slots for{" "}
          <span className="font-semibold text-[#0B1633]">{plan?.planName}</span>.
        </p>
      </div>

      {fetching ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-7 h-7 text-[#C9A24D] animate-spin" />
        </div>
      ) : slots.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-[#d9cdb6]">
          <Calendar className="w-10 h-10 text-[#C9A24D]/50 mx-auto mb-3" />
          <p className="text-[#202020]/60 text-sm">No available slots at the moment.</p>
          <p className="text-[#202020]/40 text-xs mt-1">Please check back soon or contact us via WhatsApp.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-4">
          {/* Date Picker Sidebar */}
          <div className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0">
            {dates.map((date) => (
              <button
                key={date}
                type="button"
                onClick={() => { setSelectedDate(date); setSelectedId(""); }}
                className={cn(
                  "flex-shrink-0 text-left rounded-lg border px-3 py-2.5 transition-all duration-200 min-w-[130px] md:min-w-0",
                  selectedDate === date
                    ? "border-[#C9A24D] bg-[#0B1633] text-white"
                    : "border-[#d9cdb6] bg-white hover:border-[#C9A24D]/50 text-[#202020]"
                )}
              >
                <p className={cn("text-[0.65rem] font-semibold uppercase tracking-wider",
                  selectedDate === date ? "text-[#C9A24D]" : "text-[#8a8070]")}>
                  {new Date(date + "T00:00:00").toLocaleDateString("en-IN", { weekday: "short" })}
                </p>
                <p className="font-serif font-bold text-sm leading-tight">
                  {new Date(date + "T00:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                </p>
              </button>
            ))}
          </div>

          {/* Time Slots Grid */}
          <div>
            {selectedDate && (
              <p className="text-xs font-semibold text-[#8a8070] mb-3 uppercase tracking-wider">
                {formatDate(selectedDate)}
              </p>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {slotsForDate.map((slot) => (
                <button
                  key={slot.id}
                  type="button"
                  onClick={() => setSelectedId(slot.id)}
                  className={cn(
                    "rounded-lg border px-3 py-3 text-sm font-medium transition-all duration-200 flex flex-col items-center gap-1",
                    selectedId === slot.id
                      ? "border-[#C9A24D] bg-[#C9A24D]/8 text-[#0B1633] shadow-[0_0_0_2px_rgba(201,162,77,0.2)]"
                      : "border-[#d9cdb6] bg-white hover:border-[#C9A24D]/50 text-[#202020]"
                  )}
                >
                  <Clock className={cn("w-3.5 h-3.5", selectedId === slot.id ? "text-[#C9A24D]" : "text-[#8a8070]")} />
                  <span>{formatTime(slot.start_time)}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {error && (
        <p className="text-red-600 text-sm bg-red-50 border border-red-100 rounded-lg px-4 py-3">
          {error}
        </p>
      )}

      <div className="flex justify-between pt-2">
        <button type="button" onClick={() => setStep(1)} className="btn-outline-gold">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <button
          type="button"
          onClick={handleConfirmSlot}
          disabled={!selectedId || isLoading || fetching}
          className="btn-gold disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Continue <ArrowRight className="w-4 h-4" /></>}
        </button>
      </div>
    </div>
  );
}
