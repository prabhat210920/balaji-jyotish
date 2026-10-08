"use client";

import { Loader2, Lock, ShieldCheck } from "lucide-react";

export function Step5Processing() {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-6 text-center">
      {/* Animated spinner ring */}
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 rounded-full border-4 border-[#C9A24D]/20" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#C9A24D] animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Lock className="w-7 h-7 text-[#C9A24D]" />
        </div>
      </div>

      <div>
        <h2 className="font-serif text-2xl font-bold text-[#0B1633] mb-2">
          Awaiting Payment
        </h2>
        <p className="text-[#202020]/60 text-sm max-w-xs mx-auto leading-relaxed">
          Please complete the payment in the Razorpay window.
          Do not close or refresh this tab.
        </p>
      </div>

      <div className="flex items-center gap-2 text-[#8a8070] text-xs">
        <ShieldCheck className="w-4 h-4 text-green-600" />
        <span>256-bit encrypted · Secured by Razorpay</span>
      </div>
    </div>
  );
}
