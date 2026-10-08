"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useBookingStore } from "@/lib/store/booking-store";
import { ArrowLeft, Calendar, Clock, IndianRupee, Loader2, Lock, User } from "lucide-react";

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill: { name: string; email: string; contact: string };
  theme: { color: string };
  handler: (response: RazorpayResponse) => void;
  modal: { ondismiss: () => void };
}

interface RazorpayInstance {
  open(): void;
}

interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2.5 border-b border-[#d9cdb6]/60 last:border-0">
      <span className="text-xs font-semibold text-[#8a8070] uppercase tracking-wide flex-shrink-0">{label}</span>
      <span className="text-sm text-[#202020] text-right">{value}</span>
    </div>
  );
}

function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-IN", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });
}

function formatTime(isoString: string): string {
  return new Date(isoString).toLocaleTimeString("en-IN", {
    hour: "2-digit", minute: "2-digit", hour12: true,
  });
}

export function Step4Review() {
  const router = useRouter();
  const { plan, slot, personalDetails, setStep, setOrderResult, setError, error } =
    useBookingStore();
  const [isProcessing, setIsProcessing] = useState(false);

  if (!plan || !slot || !personalDetails) {
    return (
      <div className="text-center py-12 text-[#202020]/60 text-sm">
        Missing booking data. Please start again.
      </div>
    );
  }

  async function handleProceedToPayment() {
    setIsProcessing(true);
    setError(null);

    try {
      // 1. Create order on the server
      const res = await fetch("/api/checkout/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: plan!.planId,
          slotId: slot!.slotId,
          fullName: personalDetails!.fullName,
          mobile: personalDetails!.mobile,
          email: personalDetails!.email,
          dateOfBirth: personalDetails!.dateOfBirth,
          timeOfBirth: personalDetails!.timeOfBirth ?? "",
          placeOfBirth: personalDetails!.placeOfBirth,
          concern: personalDetails!.concern,
        }),
      });

      const orderData = await res.json();

      if (!res.ok || !orderData.success) {
        setError(orderData.message ?? "Could not create order. Please try again.");
        setIsProcessing(false);
        return;
      }

      setOrderResult({
        razorpayOrderId: orderData.razorpayOrderId,
        bookingId: orderData.bookingId,
        bookingNumber: orderData.bookingNumber,
      });

      setStep(5);

      // 2. Load Razorpay script dynamically
      await loadRazorpayScript();

      // 3. Open Razorpay checkout
      const rzp = new window.Razorpay({
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Balaji Jyotish",
        description: orderData.planName,
        order_id: orderData.razorpayOrderId,
        prefill: {
          name: personalDetails!.fullName,
          email: personalDetails!.email,
          contact: personalDetails!.mobile,
        },
        theme: { color: "#C9A24D" },
        handler: (response: RazorpayResponse) => {
          // Payment captured — webhook will confirm on the backend.
          // Redirect to confirmation page immediately for UX.
          router.push(`/book/confirmation/${orderData.bookingId}`);
        },
        modal: {
          ondismiss: () => {
            setStep(4);
            setIsProcessing(false);
          },
        },
      });

      rzp.open();
    } catch (err) {
      console.error("[Step4Review] Error:", err);
      setError("An unexpected error occurred. Please try again.");
      setStep(4);
      setIsProcessing(false);
    }
  }

  function loadRazorpayScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (window.Razorpay) { resolve(); return; }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Could not load Razorpay."));
      document.head.appendChild(script);
    });
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-serif text-2xl font-bold text-[#0B1633] mb-1">
          Review Your Booking
        </h2>
        <p className="text-[#202020]/60 text-sm">
          Please confirm all details before proceeding to payment.
        </p>
      </div>

      {/* Booking Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Consultation & Slot */}
        <div className="bg-white rounded-xl border border-[#d9cdb6] p-5">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-4 h-4 text-[#C9A24D]" />
            <p className="text-xs font-bold uppercase tracking-wider text-[#C9A24D]">
              Consultation
            </p>
          </div>
          <ReviewRow label="Service" value={plan.planName} />
          <ReviewRow label="Duration" value={`${plan.planDuration} minutes`} />
          <ReviewRow
            label="Date"
            value={formatDate(slot.slotStartTime)}
          />
          <ReviewRow label="Time" value={formatTime(slot.slotStartTime)} />
        </div>

        {/* Personal Details */}
        <div className="bg-white rounded-xl border border-[#d9cdb6] p-5">
          <div className="flex items-center gap-2 mb-3">
            <User className="w-4 h-4 text-[#C9A24D]" />
            <p className="text-xs font-bold uppercase tracking-wider text-[#C9A24D]">
              Your Details
            </p>
          </div>
          <ReviewRow label="Name" value={personalDetails.fullName} />
          <ReviewRow label="Mobile" value={personalDetails.mobile} />
          <ReviewRow label="Email" value={personalDetails.email} />
          <ReviewRow label="Birth Date" value={personalDetails.dateOfBirth} />
          <ReviewRow label="Birth Place" value={personalDetails.placeOfBirth} />
        </div>
      </div>

      {/* Concern Preview */}
      <div className="bg-white rounded-xl border border-[#d9cdb6] p-5">
        <p className="text-xs font-bold uppercase tracking-wider text-[#C9A24D] mb-2">
          Your Concern
        </p>
        <p className="text-sm text-[#202020]/70 leading-relaxed whitespace-pre-wrap">
          {personalDetails.concern}
        </p>
      </div>

      {/* Price Summary */}
      <div className="bg-[#0B1633] rounded-xl p-5 flex items-center justify-between">
        <div>
          <p className="text-white/50 text-xs mb-0.5">Total Amount</p>
          <p className="font-serif text-2xl font-bold text-[#C9A24D] flex items-center gap-1">
            <IndianRupee className="w-5 h-5" />
            {(plan.planPrice / 100).toLocaleString("en-IN")}
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-white/40 text-xs">
          <Lock className="w-3 h-3" />
          Secured by Razorpay
        </div>
      </div>

      {error && (
        <p className="text-red-600 text-sm bg-red-50 border border-red-100 rounded-lg px-4 py-3">
          {error}
        </p>
      )}

      <div className="flex justify-between pt-2">
        <button
          type="button"
          onClick={() => setStep(3)}
          disabled={isProcessing}
          className="btn-outline-gold disabled:opacity-40"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <button
          type="button"
          onClick={handleProceedToPayment}
          disabled={isProcessing}
          className="btn-gold disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isProcessing ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Processing…</>
          ) : (
            <><Lock className="w-4 h-4" /> Pay Now</>
          )}
        </button>
      </div>
    </div>
  );
}
