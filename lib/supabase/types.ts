// lib/supabase/types.ts
// Accurate database types matching the Balaji Jyotish Supabase schema.

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
          type: string;
          duration_minutes: number;
          price: number;
          description: string | null;
          active: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          type?: string;
          duration_minutes: number;
          price: number;
          description?: string | null;
          active?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          type?: string;
          duration_minutes?: number;
          price?: number;
          description?: string | null;
          active?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      slots: {
        Row: {
          id: string;
          slot_date: string;
          start_time: string;
          end_time: string;
          status: SlotStatus;
          held_until: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slot_date: string;
          start_time: string;
          end_time: string;
          status?: SlotStatus;
          held_until?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slot_date?: string;
          start_time?: string;
          end_time?: string;
          status?: SlotStatus;
          held_until?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      clients: {
        Row: {
          id: string;
          full_name: string;
          mobile: string;
          email: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          full_name: string;
          mobile: string;
          email: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          mobile?: string;
          email?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      birth_profiles: {
        Row: {
          id: string;
          client_id: string;
          date_of_birth: string;
          time_of_birth: string | null;
          place_of_birth: string;
          city: string | null;
          state: string | null;
          country: string | null;
          latitude: number | null;
          longitude: number | null;
          timezone: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          client_id: string;
          date_of_birth: string;
          time_of_birth?: string | null;
          place_of_birth: string;
          city?: string | null;
          state?: string | null;
          country?: string | null;
          latitude?: number | null;
          longitude?: number | null;
          timezone?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          client_id?: string;
          date_of_birth?: string;
          time_of_birth?: string | null;
          place_of_birth?: string;
          city?: string | null;
          state?: string | null;
          country?: string | null;
          latitude?: number | null;
          longitude?: number | null;
          timezone?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      bookings: {
        Row: {
          id: string;
          booking_number: string;
          client_id: string;
          birth_profile_id: string;
          consultation_plan_id: string;
          slot_id: string;
          concern: string | null;
          amount: number;
          currency: string;
          booking_status: BookingStatus;
          payment_status: PaymentStatus;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          booking_number?: string;
          client_id: string;
          birth_profile_id: string;
          consultation_plan_id: string;
          slot_id: string;
          concern?: string | null;
          amount: number;
          currency?: string;
          booking_status?: BookingStatus;
          payment_status?: PaymentStatus;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          booking_number?: string;
          client_id?: string;
          birth_profile_id?: string;
          consultation_plan_id?: string;
          slot_id?: string;
          concern?: string | null;
          amount?: number;
          currency?: string;
          booking_status?: BookingStatus;
          payment_status?: PaymentStatus;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      payments: {
        Row: {
          id: string;
          booking_id: string;
          gateway_order_id: string;
          gateway_payment_id: string | null;
          amount: number;
          status: PaymentStatus;
          signature: string | null;
          paid_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          booking_id: string;
          gateway_order_id: string;
          gateway_payment_id?: string | null;
          amount: number;
          status?: PaymentStatus;
          signature?: string | null;
          paid_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          booking_id?: string;
          gateway_order_id?: string;
          gateway_payment_id?: string | null;
          amount?: number;
          status?: PaymentStatus;
          signature?: string | null;
          paid_at?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      admins: {
        Row: {
          id: string;
          email: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
}
