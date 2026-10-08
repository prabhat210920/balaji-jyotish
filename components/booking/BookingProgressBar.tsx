"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

const STEPS = [
  { n: 1, label: "Service" },
  { n: 2, label: "Schedule" },
  { n: 3, label: "Details" },
  { n: 4, label: "Review" },
  { n: 5, label: "Payment" },
] as const;

interface Props {
  currentStep: number;
}

export function BookingProgressBar({ currentStep }: Props) {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6">
      <div className="flex items-center">
        {STEPS.map((step, i) => {
          const isCompleted = currentStep > step.n;
          const isActive = currentStep === step.n;

          return (
            <div key={step.n} className="flex items-center flex-1 last:flex-none">
              {/* Circle */}
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300",
                    isCompleted
                      ? "bg-[#C9A24D] border-[#C9A24D] text-[#0B1633]"
                      : isActive
                      ? "bg-[#0B1633] border-[#C9A24D] text-[#C9A24D]"
                      : "bg-white border-[#d9cdb6] text-[#8a8070]"
                  )}
                >
                  {isCompleted ? <Check className="w-3.5 h-3.5" /> : step.n}
                </div>
                <span
                  className={cn(
                    "text-[0.65rem] font-medium tracking-wide hidden sm:block",
                    isActive
                      ? "text-[#0B1633]"
                      : isCompleted
                      ? "text-[#C9A24D]"
                      : "text-[#8a8070]"
                  )}
                >
                  {step.label}
                </span>
              </div>

              {/* Connector line */}
              {i < STEPS.length - 1 && (
                <div className="flex-1 h-0.5 mx-2 transition-all duration-500">
                  <div
                    className={cn(
                      "h-full transition-all duration-500",
                      currentStep > step.n ? "bg-[#C9A24D]" : "bg-[#d9cdb6]"
                    )}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
