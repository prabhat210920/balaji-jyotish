"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  personalDetailsSchema,
  type PersonalDetailsFormData,
} from "@/lib/validations/booking";
import { useBookingStore } from "@/lib/store/booking-store";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface FieldProps {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  hint?: string;
}

function Field({ label, error, required, children, hint }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-[#0B1633]">
        {label}
        {required && <span className="text-[#C9A24D] ml-0.5">*</span>}
      </label>
      {children}
      {hint && !error && <p className="text-[#8a8070] text-xs">{hint}</p>}
      {error && <p className="text-red-600 text-xs">{error}</p>}
    </div>
  );
}

const inputCls = (hasError?: boolean) =>
  cn(
    "w-full rounded-lg border px-4 py-3 text-sm text-[#202020] bg-white outline-none transition-all duration-200",
    "focus:border-[#C9A24D] focus:ring-2 focus:ring-[#C9A24D]/20",
    hasError
      ? "border-red-400 bg-red-50/30"
      : "border-[#d9cdb6] hover:border-[#C9A24D]/50"
  );

export function Step3PersonalDetails() {
  const { personalDetails, setPersonalDetails, setStep } = useBookingStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalDetailsFormData>({
    resolver: zodResolver(personalDetailsSchema),
    defaultValues: personalDetails ?? {},
  });

  const onSubmit = (data: PersonalDetailsFormData) => {
    setPersonalDetails(data);
    setStep(4);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6" noValidate>
      <div>
        <h2 className="font-serif text-2xl font-bold text-[#0B1633] mb-1">
          Your Details
        </h2>
        <p className="text-[#202020]/60 text-sm">
          All information is strictly private and used only for your consultation.
        </p>
      </div>

      {/* ── Personal Info ── */}
      <div className="bg-white rounded-xl border border-[#d9cdb6] p-5 flex flex-col gap-4">
        <p className="text-xs font-bold uppercase tracking-wider text-[#C9A24D]">
          Contact Information
        </p>

        <Field label="Full Name" required error={errors.fullName?.message}>
          <input
            {...register("fullName")}
            className={inputCls(!!errors.fullName)}
            placeholder="e.g. Priya Venkataraman"
            autoComplete="name"
          />
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Mobile Number" required error={errors.mobile?.message} hint="10-digit Indian mobile number">
            <input
              {...register("mobile")}
              className={inputCls(!!errors.mobile)}
              placeholder="9876543210"
              type="tel"
              inputMode="numeric"
              maxLength={10}
              autoComplete="tel"
            />
          </Field>

          <Field label="Email Address" required error={errors.email?.message}>
            <input
              {...register("email")}
              className={inputCls(!!errors.email)}
              placeholder="name@email.com"
              type="email"
              autoComplete="email"
            />
          </Field>
        </div>
      </div>

      {/* ── Birth Details ── */}
      <div className="bg-white rounded-xl border border-[#d9cdb6] p-5 flex flex-col gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-[#C9A24D] mb-0.5">
            Birth Details
          </p>
          <p className="text-xs text-[#8a8070]">
            🔒 Birth details are encrypted and never shared publicly.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Date of Birth" required error={errors.dateOfBirth?.message}>
            <input
              {...register("dateOfBirth")}
              className={inputCls(!!errors.dateOfBirth)}
              type="date"
              max={new Date().toISOString().split("T")[0]}
            />
          </Field>

          <Field label="Time of Birth" error={errors.timeOfBirth?.message} hint="Approximate is fine if exact time unknown">
            <input
              {...register("timeOfBirth")}
              className={inputCls(!!errors.timeOfBirth)}
              type="time"
              placeholder="HH:MM"
            />
          </Field>
        </div>

        <Field label="Place of Birth" required error={errors.placeOfBirth?.message} hint="City, State, Country">
          <input
            {...register("placeOfBirth")}
            className={inputCls(!!errors.placeOfBirth)}
            placeholder="e.g. Tirupati, Andhra Pradesh, India"
            autoComplete="off"
          />
        </Field>
      </div>

      {/* ── Concern ── */}
      <div className="bg-white rounded-xl border border-[#d9cdb6] p-5 flex flex-col gap-4">
        <p className="text-xs font-bold uppercase tracking-wider text-[#C9A24D]">
          Your Concern
        </p>

        <Field
          label="What would you like to discuss?"
          required
          error={errors.concern?.message}
          hint="Career, marriage, health, finance, relocation, education — be as specific as possible."
        >
          <textarea
            {...register("concern")}
            className={cn(inputCls(!!errors.concern), "resize-none min-h-[110px]")}
            placeholder="Describe your concern or question in detail. The more specific you are, the more focused your consultation will be..."
            rows={4}
          />
        </Field>
      </div>

      <div className="flex justify-between pt-2">
        <button type="button" onClick={() => setStep(2)} className="btn-outline-gold">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <button type="submit" className="btn-gold">
          Review Booking <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
}
