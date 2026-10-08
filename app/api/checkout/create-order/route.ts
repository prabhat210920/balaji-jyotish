// app/api/checkout/create-order/route.ts
// POST — Securely creates client, birth_profile, booking, payment records
// and a Razorpay order in a single atomic-ish flow.

import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { createServiceClient } from "@/lib/supabase/server";
import { createOrderSchema } from "@/lib/validations/booking";
import { ZodError } from "zod";

export const dynamic = "force-dynamic";

function getRazorpay() {
  const key_id = process.env.RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;
  if (!key_id || !key_secret) {
    throw new Error("Razorpay credentials not configured.");
  }
  return new Razorpay({ key_id, key_secret });
}

export async function POST(req: NextRequest) {
  try {
    // ── 1. Parse & validate ────────────────────────────────────
    const body = await req.json().catch(() => ({}));
    const data = createOrderSchema.parse(body);

    const supabase = createServiceClient();

    // ── 2. Re-verify the slot is still HELD ───────────────────
    const { data: slot, error: slotError } = await supabase
      .from("slots")
      .select("id, status, held_until, plan_id")
      .eq("id", data.slotId)
      .single();

    if (slotError || !slot) {
      return NextResponse.json({ message: "Slot not found." }, { status: 404 });
    }

    const now = new Date();
    const isHeldValid =
      slot.status === "HELD" &&
      slot.held_until !== null &&
      new Date(slot.held_until) > now;

    if (!isHeldValid) {
      return NextResponse.json(
        { message: "Your slot hold has expired. Please select a slot again." },
        { status: 409 }
      );
    }

    // ── 3. Fetch the plan for the price ───────────────────────
    const { data: plan, error: planError } = await supabase
      .from("consultation_plans")
      .select("id, name, price, currency")
      .eq("id", data.planId)
      .eq("is_active", true)
      .single();

    if (planError || !plan) {
      return NextResponse.json({ message: "Plan not found or inactive." }, { status: 404 });
    }

    // ── 4. Upsert client (deduplicate by mobile) ───────────────
    const { data: client, error: clientError } = await supabase
      .from("clients")
      .upsert(
        {
          full_name: data.fullName,
          mobile: data.mobile,
          email: data.email,
        },
        { onConflict: "mobile", ignoreDuplicates: false }
      )
      .select("id")
      .single();

    if (clientError || !client) {
      console.error("[create-order] Client upsert error:", clientError);
      return NextResponse.json({ message: "Failed to save client details." }, { status: 500 });
    }

    // ── 5. Insert birth profile ────────────────────────────────
    const { data: birthProfile, error: birthError } = await supabase
      .from("birth_profiles")
      .insert({
        client_id: client.id,
        date_of_birth: data.dateOfBirth,
        time_of_birth: data.timeOfBirth || null,
        place_of_birth: data.placeOfBirth,
      })
      .select("id")
      .single();

    if (birthError || !birthProfile) {
      console.error("[create-order] Birth profile error:", birthError);
      return NextResponse.json({ message: "Failed to save birth details." }, { status: 500 });
    }

    // ── 6. Insert booking with status PENDING_PAYMENT ─────────
    const { data: booking, error: bookingError } = await supabase
      .from("bookings")
      .insert({
        client_id: client.id,
        birth_profile_id: birthProfile.id,
        plan_id: data.planId,
        slot_id: data.slotId,
        concern: data.concern,
        status: "PENDING_PAYMENT",
        meet_link: null,
        admin_notes: null,
      })
      .select("id, booking_number")
      .single();

    if (bookingError || !booking) {
      console.error("[create-order] Booking error:", bookingError);
      return NextResponse.json({ message: "Failed to create booking." }, { status: 500 });
    }

    // ── 7. Create Razorpay order ───────────────────────────────
    const razorpay = getRazorpay();

    const rzpOrder = await razorpay.orders.create({
      amount: plan.price, // already in paise
      currency: plan.currency || "INR",
      receipt: booking.booking_number,
      notes: {
        booking_id: booking.id,
        plan_name: plan.name,
        client_name: data.fullName,
      },
    });

    // ── 8. Insert payment record (PENDING) ────────────────────
    const { error: paymentError } = await supabase
      .from("payments")
      .insert({
        booking_id: booking.id,
        razorpay_order_id: rzpOrder.id,
        razorpay_payment_id: null,
        razorpay_signature: null,
        amount: plan.price,
        currency: plan.currency || "INR",
        status: "PENDING",
      });

    if (paymentError) {
      console.error("[create-order] Payment record error:", paymentError);
      // Non-fatal — webhook will handle reconciliation
    }

    // ── 9. Return Razorpay order details to frontend ──────────
    return NextResponse.json(
      {
        success: true,
        razorpayOrderId: rzpOrder.id,
        bookingId: booking.id,
        bookingNumber: booking.booking_number,
        amount: plan.price,
        currency: plan.currency || "INR",
        planName: plan.name,
        keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      },
      { status: 200 }
    );
  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json(
        { message: err.errors[0].message },
        { status: 400 }
      );
    }

    console.error("[create-order] Unexpected error:", err);
    return NextResponse.json(
      { message: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
