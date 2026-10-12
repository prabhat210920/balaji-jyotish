"use client";

import { useState } from "react";
import { Sparkles, Plus, Clock, IndianRupee, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Database } from "@/lib/supabase/types";

type Plan = Database["public"]["Tables"]["consultation_plans"]["Row"];

export default function PlanManagerClient({ initialPlans }: { initialPlans: Plan[] }) {
  const [plans, setPlans] = useState<Plan[]>(initialPlans);
  const [showCreate, setShowCreate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    name: "",
    type: "vedic",
    duration_minutes: "45",
    price: "1100",
    description: "",
    sort_order: String(plans.length + 1),
  });

  async function toggleActive(plan: Plan) {
    setTogglingId(plan.id);
    setError("");
    try {
      const res = await fetch("/api/admin/plans", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: plan.id, active: !plan.active }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update plan.");

      setPlans((prev) =>
        prev.map((p) => (p.id === plan.id ? { ...p, active: !p.active } : p))
      );
    } catch (err: any) {
      setError(err.message || "Failed to update plan.");
    } finally {
      setTogglingId(null);
    }
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.name.trim()) {
      setError("Plan name is required.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/admin/plans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          type: form.type,
          duration_minutes: parseInt(form.duration_minutes, 10),
          price: parseFloat(form.price),
          description: form.description.trim() || null,
          sort_order: parseInt(form.sort_order, 10) || 1,
          active: true,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to create plan.");

      setPlans((prev) => [...prev, data.plan]);
      setSuccess("Consultation plan created successfully!");
      setShowCreate(false);
      setForm({
        name: "",
        type: "vedic",
        duration_minutes: "45",
        price: "1100",
        description: "",
        sort_order: String(plans.length + 2),
      });
    } catch (err: any) {
      setError(err.message || "Failed to create plan.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {error && (
        <div className="p-3 bg-red-500/15 border border-red-500/25 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}
      {success && (
        <div className="p-3 bg-green-500/15 border border-green-500/25 rounded-lg text-green-400 text-sm">
          {success}
        </div>
      )}

      {/* Action Header */}
      <div className="flex items-center justify-between">
        <p className="text-white/50 text-sm">
          {plans.length} consultation {plans.length === 1 ? "plan" : "plans"} registered
        </p>
        <button
          onClick={() => setShowCreate(!showCreate)}
          className="btn-gold text-sm flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          {showCreate ? "Cancel" : "Add New Plan"}
        </button>
      </div>

      {/* Create Plan Drawer / Form */}
      {showCreate && (
        <form
          onSubmit={handleCreate}
          className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-4 shadow-xl"
        >
          <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C9A24D]" /> Create Consultation Plan
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white/60 text-xs font-medium mb-1.5">Plan Name</label>
              <input
                type="text"
                placeholder="e.g. Vedic Astrology Consultation"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-white text-sm outline-none focus:border-[#C9A24D]"
                required
              />
            </div>
            <div>
              <label className="block text-white/60 text-xs font-medium mb-1.5">Plan Category / Type</label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full bg-slate-900 border border-white/10 rounded-lg px-3.5 py-2.5 text-white text-sm outline-none focus:border-[#C9A24D]"
              >
                <option value="vedic">Vedic Astrology</option>
                <option value="kundali">Kundali Matching</option>
                <option value="vastu">Vastu Shastra</option>
                <option value="career">Career / Finance</option>
                <option value="muhurta">Muhurta Selection</option>
                <option value="general">General</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-white/60 text-xs font-medium mb-1.5">Price (₹ INR)</label>
              <input
                type="number"
                min="1"
                placeholder="1100"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-white text-sm outline-none focus:border-[#C9A24D]"
                required
              />
            </div>
            <div>
              <label className="block text-white/60 text-xs font-medium mb-1.5">Duration (Minutes)</label>
              <input
                type="number"
                min="5"
                placeholder="45"
                value={form.duration_minutes}
                onChange={(e) => setForm({ ...form, duration_minutes: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-white text-sm outline-none focus:border-[#C9A24D]"
                required
              />
            </div>
            <div>
              <label className="block text-white/60 text-xs font-medium mb-1.5">Sort Order</label>
              <input
                type="number"
                min="1"
                placeholder="1"
                value={form.sort_order}
                onChange={(e) => setForm({ ...form, sort_order: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-white text-sm outline-none focus:border-[#C9A24D]"
              />
            </div>
          </div>

          <div>
            <label className="block text-white/60 text-xs font-medium mb-1.5">Description</label>
            <textarea
              rows={3}
              placeholder="Brief details about what the client gets during this consultation..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-white text-sm outline-none focus:border-[#C9A24D]"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowCreate(false)}
              className="px-4 py-2 text-white/60 hover:text-white text-sm transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-gold text-sm flex items-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              Save Plan
            </button>
          </div>
        </form>
      )}

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {plans.map((p) => {
          const isToggling = togglingId === p.id;

          return (
            <div
              key={p.id}
              className={cn(
                "rounded-xl border p-5 flex flex-col justify-between transition-all duration-200",
                p.active
                  ? "bg-white/5 border-white/10 hover:border-[#C9A24D]/40"
                  : "bg-white/2 border-white/5 opacity-60"
              )}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h4 className="font-serif font-bold text-white text-lg leading-snug">
                    {p.name}
                  </h4>
                  <span
                    className={cn(
                      "px-2.5 py-0.5 rounded-full text-[0.65rem] font-bold uppercase tracking-wider border",
                      p.active
                        ? "bg-green-500/15 text-green-400 border-green-500/25"
                        : "bg-white/10 text-white/40 border-white/10"
                    )}
                  >
                    {p.active ? "Active" : "Inactive"}
                  </span>
                </div>

                {p.description && (
                  <p className="text-white/55 text-xs leading-relaxed mb-4">
                    {p.description}
                  </p>
                )}
              </div>

              <div className="pt-3 border-t border-white/8 flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs text-white/60">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#C9A24D]" />
                    {p.duration_minutes} mins
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-white">
                    ₹{Number(p.price).toLocaleString("en-IN")}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => toggleActive(p)}
                  disabled={isToggling}
                  className={cn(
                    "text-xs px-3 py-1.5 rounded-lg border font-medium transition-colors flex items-center gap-1.5",
                    p.active
                      ? "border-red-500/25 text-red-400 hover:bg-red-500/10"
                      : "border-green-500/25 text-green-400 hover:bg-green-500/10"
                  )}
                >
                  {isToggling ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : p.active ? (
                    <>
                      <XCircle className="w-3.5 h-3.5" /> Deactivate
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" /> Activate
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
