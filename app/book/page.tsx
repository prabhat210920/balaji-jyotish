"use client";

import { useBookingStore } from "@/lib/store/booking-store";
import { BookingProgressBar } from "@/components/booking/BookingProgressBar";
import { Step1SelectPlan } from "@/components/booking/Step1SelectPlan";
import { Step2SelectSlot } from "@/components/booking/Step2SelectSlot";
import { Step3PersonalDetails } from "@/components/booking/Step3PersonalDetails";
import { Step4Review } from "@/components/booking/Step4Review";
import { Step5Processing } from "@/components/booking/Step5Processing";

export default function BookPage() {
  const currentStep = useBookingStore((s) => s.currentStep);

  return (
    <div className="flex-1 flex flex-col">
      {/* Progress Bar */}
      <div className="bg-white border-b border-[#d9cdb6]">
        <BookingProgressBar currentStep={currentStep} />
      </div>

      {/* Step Content */}
      <div className="flex-1 flex flex-col py-8 px-4">
        <div className="w-full max-w-2xl mx-auto">
          {/* Animated step transitions */}
          <div key={currentStep} className="animate-fade-up">
            {currentStep === 1 && <Step1SelectPlan />}
            {currentStep === 2 && <Step2SelectSlot />}
            {currentStep === 3 && <Step3PersonalDetails />}
            {currentStep === 4 && <Step4Review />}
            {currentStep === 5 && <Step5Processing />}
          </div>
        </div>
      </div>
    </div>
  );
}
