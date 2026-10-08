// lib/validations/booking.ts
// Zod schemas for all booking flow steps — shared between frontend and backend.

import { z } from "zod";

/* ── Step 1: Plan selection ───────────────────────────────── */
export const planSchema = z.object({
  planId: z.string().uuid("Please select a valid consultation plan."),
  planName: z.string().min(1),
  planPrice: z.number().positive(),
  planDuration: z.number().positive(),
});

/* ── Step 2: Slot selection ───────────────────────────────── */
export const slotSchema = z.object({
  slotId: z.string().uuid("Please select a valid time slot."),
  slotStartTime: z.string().min(1),
  slotEndTime: z.string().min(1),
});

/* ── Step 3: Personal & birth details ────────────────────── */
export const personalDetailsSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters.")
    .max(100, "Full name is too long."),
  mobile: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number."),
  email: z
    .string()
    .trim()
    .email("Enter a valid email address.")
    .max(200),
  dateOfBirth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format.")
    .refine((d) => {
      const date = new Date(d);
      return !isNaN(date.getTime()) && date < new Date();
    }, "Date of birth must be a valid past date."),
  timeOfBirth: z
    .string()
    .regex(/^\d{2}:\d{2}$/, "Time must be in HH:MM format.")
    .optional()
    .or(z.literal("")),
  placeOfBirth: z
    .string()
    .trim()
    .min(2, "Place of birth is required.")
    .max(200),
  concern: z
    .string()
    .trim()
    .min(10, "Please describe your concern in at least 10 characters.")
    .max(2000, "Concern is too long (max 2000 characters)."),
});

/* ── Full booking payload (backend validation) ────────────── */
export const createOrderSchema = z.object({
  planId: z.string().uuid(),
  slotId: z.string().uuid(),
  fullName: z.string().trim().min(2).max(100),
  mobile: z.string().regex(/^[6-9]\d{9}$/),
  email: z.string().trim().email().max(200),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  timeOfBirth: z.string().optional().default(""),
  placeOfBirth: z.string().trim().min(2).max(200),
  concern: z.string().trim().min(10).max(2000),
});

/* ── Hold-slot payload ────────────────────────────────────── */
export const holdSlotSchema = z.object({
  slotId: z.string().uuid("Invalid slot ID."),
});

/* ── Inferred TypeScript types ────────────────────────────── */
export type PlanFormData = z.infer<typeof planSchema>;
export type SlotFormData = z.infer<typeof slotSchema>;
export type PersonalDetailsFormData = z.infer<typeof personalDetailsSchema>;
export type CreateOrderPayload = z.infer<typeof createOrderSchema>;
export type HoldSlotPayload = z.infer<typeof holdSlotSchema>;
