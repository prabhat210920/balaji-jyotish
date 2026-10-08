// lib/supabase/types.ts
// Minimal type definitions for the Balaji Jyotish database schema.
// Replace with the full generated types from `supabase gen types typescript` once the project is linked.

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type SlotStatus = "AVAILABLE" | "HELD" | "BOOKED" | "BLOCKED";
export type BookingStatus = "PENDING_PAYMENT" | "CONFIRMED" | "CANCELLED" | "REFUNDED";
export type PaymentStatus = "PENDING" | "CAPTURED" | "FAILED" | "REFUNDED";

export interface Database {
  public: {
    Tables: {
      consultation_plans: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          duration_minutes: number;
          price: number; // in paise (INR x 100) for Razorpay
          currency: string;
          is_active: boolean;
          sort_order: number;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["consultation_plans"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["consultation_plans"]["Insert"]>;
      };
      slots: {
        Row: {
          id: string;
          start_time: string; // ISO datetime
          end_time: string;
          status: SlotStatus;
          held_until: string | null;
          plan_id: string | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["slots"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["slots"]["Insert"]>;
      };
      clients: {
        Row: {
          id: string;
          full_name: string;
          mobile: string;
          email: string;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["clients"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["clients"]["Insert"]>;
      };
      birth_profiles: {
        Row: {
          id: string;
          client_id: string;
          date_of_birth: string; // YYYY-MM-DD
          time_of_birth: string | null; // HH:MM
          place_of_birth: string;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["birth_profiles"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["birth_profiles"]["Insert"]>;
      };
      bookings: {
        Row: {
          id: string;
          booking_number: string; // human-readable e.g. BJ-2024-0042
          client_id: string;
          birth_profile_id: string;
          plan_id: string;
          slot_id: string;
          concern: string | null;
          status: BookingStatus;
          meet_link: string | null;
          admin_notes: string | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["bookings"]["Row"], "id" | "booking_number" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["bookings"]["Insert"]>;
      };
      payments: {
        Row: {
          id: string;
          booking_id: string;
          razorpay_order_id: string;
          razorpay_payment_id: string | null;
          razorpay_signature: string | null;
          amount: number; // paise
          currency: string;
          status: PaymentStatus;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["payments"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["payments"]["Insert"]>;
      };
    };
  };
}
