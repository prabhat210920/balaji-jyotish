"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Plus, CalendarDays } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const inputCls = (err?: boolean) =>
  cn(
    "w-full rounded-lg border px-4 py-2.5 text-sm bg-white/5 text-white outline-none transition-all",
    "focus:border-[#C9A24D] focus:ring-2 focus:ring-[#C9A24D]/20",
    err ? "border-red-400" : "border-white/15 hover:border-white/30"
  );

export default function NewSlotsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    date: "",
    times: "09:00,10:00,11:00,14:00,15:00,16:00",
    durationMinutes: "60",
    repeatDays: "0", // 0 = single day
  });

  function set(key: keyof typeof form, val: string) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.date) { setError("Please select a date."); return; }

    const times = form.times
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    if (times.length === 0) { setError("Enter at least one time."); return; }

    setLoading(true);
    try {
      const res = await fetch("/api/admin/slots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: form.date,
          times,
          durationMinutes: parseInt(form.durationMinutes, 10),
          repeatDays: parseInt(form.repeatDays, 10),
        }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.message ?? "Failed to create slots."); return; }
      setSuccess(`✓ Created ${data.created} slot(s) successfully!`);
      setTimeout(() => router.push("/admin/slots"), 1500);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="pt-14 lg:pt-0 p-6 min-h-screen">
      <div className="max-w-lg">
        <div className="flex items-center gap-3 mb-6 pt-2">
          <Link href="/admin/slots" className="text-white/40 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="font-serif text-2xl font-bold text-white">Create Slots</h1>
            <p className="text-white/40 text-sm">Bulk-generate consultation slots.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/5 border border-white/8 rounded-xl p-6 flex flex-col gap-5">
          {/* Date */}
          <div className="flex flex-col gap-1.5">
            <label className="text-white/60 text-xs font-semibold uppercase tracking-wider">
              Start Date <span className="text-[#C9A24D]">*</span>
            </label>
            <input
              type="date"
              value={form.date}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => set("date", e.target.value)}
              className={inputCls()}
              required
            />
          </div>

          {/* Times */}
          <div className="flex flex-col gap-1.5">
            <label className="text-white/60 text-xs font-semibold uppercase tracking-wider">
              Start Times <span className="text-[#C9A24D]">*</span>
            </label>
            <input
              type="text"
              value={form.times}
              onChange={(e) => set("times", e.target.value)}
              className={inputCls()}
              placeholder="09:00, 10:00, 14:00"
            />
            <p className="text-white/30 text-xs">Comma-separated times in 24h format (HH:MM).</p>
          </div>

          {/* Duration */}
          <div className="flex flex-col gap-1.5">
            <label className="text-white/60 text-xs font-semibold uppercase tracking-wider">
              Duration (minutes)
            </label>
            <select
              value={form.durationMinutes}
              onChange={(e) => set("durationMinutes", e.target.value)}
              className={cn(inputCls(), "cursor-pointer")}
            >
              {[30, 45, 60, 90, 120].map((d) => (
                <option key={d} value={d} className="bg-[#0B1633]">{d} minutes</option>
              ))}
            </select>
          </div>

          {/* Repeat */}
          <div className="flex flex-col gap-1.5">
            <label className="text-white/60 text-xs font-semibold uppercase tracking-wider">
              Repeat for next N days
            </label>
            <input
              type="number"
              min={0}
              max={90}
              value={form.repeatDays}
              onChange={(e) => set("repeatDays", e.target.value)}
              className={inputCls()}
            />
            <p className="text-white/30 text-xs">
              0 = only the selected date. 6 = 7 days total (including start date).
            </p>
          </div>

          {/* Preview */}
          <div className="bg-white/3 border border-white/8 rounded-lg p-3">
            <p className="text-white/40 text-xs mb-2 font-semibold uppercase tracking-wider">Preview</p>
            <p className="text-white/70 text-sm">
              <span className="text-[#C9A24D] font-semibold">
                {form.times.split(",").filter(Boolean).length * (parseInt(form.repeatDays || "0") + 1)}
              </span>{" "}
              slots will be created
              {parseInt(form.repeatDays) > 0
                ? ` across ${parseInt(form.repeatDays) + 1} days`
                : ` on ${form.date || "the selected date"}`}
              .
            </p>
          </div>

          {error && (
            <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2.5">{error}</p>
          )}
          {success && (
            <p className="text-green-400 text-sm bg-green-500/10 border border-green-500/20 rounded-lg px-3 py-2.5">{success}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-gold w-full justify-center disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Creating…</> : <><Plus className="w-4 h-4" /> Create Slots</>}
          </button>
        </form>
      </div>
    </div>
  );
}
