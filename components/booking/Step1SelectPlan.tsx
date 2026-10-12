"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { planSchema, type PlanFormData } from "@/lib/validations/booking";
import { useBookingStore } from "@/lib/store/booking-store";
import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/types";
import { ArrowRight, Clock, IndianRupee, Loader2, Star } from "lucide-react";
import { cn } from "@/lib/utils";

type Plan = Database["public"]["Tables"]["consultation_plans"]["Row"];

export function Step1SelectPlan() {
  const { setPlan, setStep, error, setError } = useBookingStore();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string>("");

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PlanFormData>({ resolver: zodResolver(planSchema) });

  // Fetch active plans from Supabase (public read — RLS allows this)
  useEffect(() => {
    let mounted = true;
    async function fetchPlans() {
      try {
        const supabase = createClient();
        const { data, error: fetchError } = await supabase
          .from("consultation_plans")
          .select("*")
          .eq("active", true)
          .order("sort_order", { ascending: true });

        if (mounted) {
          if (fetchError) throw fetchError;
          setPlans(data ?? []);
        }
      } catch (err) {
        console.error("[Step1SelectPlan] Error loading plans:", err);
        if (mounted)
          setError("Could not load consultation plans. Please refresh.");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchPlans();
    return () => { mounted = false; };
  }, [setError]);

  function selectPlan(plan: Plan) {
    setSelectedId(plan.id);
    setValue("planId", plan.id);
    setValue("planName", plan.name);
    setValue("planPrice", plan.price);
    setValue("planDuration", plan.duration_minutes);
    setError(null);
  }

  const onSubmit = (data: PlanFormData) => {
    setPlan(data);
    setStep(2);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div>
        <h2 className="font-serif text-2xl font-bold text-[#0B1633] mb-1">
          Choose Your Consultation
        </h2>
        <p className="text-[#202020]/60 text-sm">
          Select the service that best fits your needs.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-7 h-7 text-[#C9A24D] animate-spin" />
        </div>
      ) : plans.length === 0 ? (
        <div className="text-center py-12 text-[#202020]/50 text-sm">
          No consultation plans available at this time. Please check back later.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {plans.map((plan) => (
            <button
              key={plan.id}
              type="button"
              onClick={() => selectPlan(plan)}
              className={cn(
                "text-left rounded-xl border-2 p-5 transition-all duration-200 cursor-pointer group",
                selectedId === plan.id
                  ? "border-[#C9A24D] bg-[#C9A24D]/5 shadow-[0_0_0_3px_rgba(201,162,77,0.15)]"
                  : "border-[#d9cdb6] bg-white hover:border-[#C9A24D]/60 hover:shadow-md"
              )}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-[#0B1633]/5 flex items-center justify-center">
                  <Star className="w-4 h-4 text-[#C9A24D]" strokeWidth={1.5} />
                </div>
                {selectedId === plan.id && (
                  <div className="w-5 h-5 rounded-full bg-[#C9A24D] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
              <h3 className="font-serif font-bold text-[#0B1633] text-base mb-1">
                {plan.name}
              </h3>
              {plan.description && (
                <p className="text-[#202020]/55 text-xs leading-relaxed mb-3">
                  {plan.description}
                </p>
              )}
              <div className="flex items-center gap-3 pt-3 border-t border-[#d9cdb6]/60">
                <span className="flex items-center gap-1 text-[#0B1633] font-bold text-sm">
                  <IndianRupee className="w-3.5 h-3.5" />
                  {Number(plan.price).toLocaleString("en-IN")}
                </span>
                <span className="text-[#8a8070] text-xs flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {plan.duration_minutes} minutes
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {(errors.planId || error) && (
        <p className="text-red-600 text-sm">{errors.planId?.message ?? error}</p>
      )}

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={!selectedId}
          className="btn-gold disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
        >
          Continue <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
}
