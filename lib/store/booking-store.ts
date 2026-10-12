// lib/store/booking-store.ts
// Zustand store that holds the full multi-step booking state in memory.
// State is ephemeral — resets on page reload (intentional for security).

import { create } from "zustand";
import type {
  PlanFormData,
  SlotFormData,
  PersonalDetailsFormData,
} from "@/lib/validations/booking";

export type BookingStep = 1 | 2 | 3 | 4 | 5;

export interface BookingState {
  // Navigation
  currentStep: BookingStep;

  // Step 1 — Selected plan
  plan: PlanFormData | null;

  // Step 2 — Selected slot
  slot: SlotFormData | null;

  // Step 3 — Personal & birth details
  personalDetails: PersonalDetailsFormData | null;

  // API response — returned after /api/checkout/create-order succeeds
  razorpayOrderId: string | null;
  bookingId: string | null; // internal Supabase booking UUID
  bookingNumber: string | null; // human-readable booking number

  // Error state
  error: string | null;

  // Loading state (for async API calls between steps)
  isLoading: boolean;

  /* ── Actions ── */
  setStep: (step: BookingStep) => void;
  setPlan: (plan: PlanFormData) => void;
  setSlot: (slot: SlotFormData) => void;
  setPersonalDetails: (details: PersonalDetailsFormData) => void;
  setOrderResult: (result: {
    razorpayOrderId: string;
    bookingId: string;
    bookingNumber: string;
  }) => void;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;
  nextStep: () => void;
  prevStep: () => void;
  reset: () => void;
}

const initialState = {
  currentStep: 1 as BookingStep,
  plan: null,
  slot: null,
  personalDetails: null,
  razorpayOrderId: null,
  bookingId: null,
  bookingNumber: null,
  error: null,
  isLoading: false,
};

export const useBookingStore = create<BookingState>((set, get) => ({
  currentStep: 1,
  plan: null,
  slot: null,
  personalDetails: null,
  razorpayOrderId: null,
  bookingId: null,
  bookingNumber: null,
  error: null,
  isLoading: false,

  setStep: (step) => set({ currentStep: step, error: null }),
  setPlan: (plan) => set({ plan, error: null }),
  setSlot: (slot) => set({ slot, error: null }),
  setPersonalDetails: (personalDetails) => set({ personalDetails, error: null }),
  setOrderResult: ({ razorpayOrderId, bookingId, bookingNumber }) =>
    set({ razorpayOrderId, bookingId, bookingNumber }),
  setError: (error) => set({ error }),
  setLoading: (isLoading) => set({ isLoading }),
  nextStep: () => {
    const current = get().currentStep;
    if (current < 5) set({ currentStep: (current + 1) as BookingStep, error: null });
  },
  prevStep: () => {
    const current = get().currentStep;
    if (current > 1) set({ currentStep: (current - 1) as BookingStep, error: null });
  },
  reset: () =>
    set({
      currentStep: 1,
      plan: null,
      slot: null,
      personalDetails: null,
      razorpayOrderId: null,
      bookingId: null,
      bookingNumber: null,
      error: null,
      isLoading: false,
    }),
}));
