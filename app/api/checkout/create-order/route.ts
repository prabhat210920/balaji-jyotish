// app/api/checkout/create-order/route.ts
// POST — Securely creates client, birth_profile, booking, payment records
// and a Razorpay order in a single atomic-ish flow.

import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { createServiceClient } from "@/lib/supabase/server";
import { createOrderSchema } from "@/lib/validations/booking";
import { ZodError } from "zod";

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
      .select("id, status, held_until")
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
      .select("id, name, price")
      .eq("id", data.planId)
      .eq("active", true)
      .single();

    if (planError || !plan) {
      return NextResponse.json({ message: "Plan not found or inactive." }, { status: 404 });
    }

    // ── 4. Find or create client (deduplicate by mobile) ───────
    let client: { id: string };

    const { data: existingClient } = await supabase
      .from("clients")
      .select("id")
      .eq("mobile", data.mobile)
      .maybeSingle();

    if (existingClient) {
      // Update name/email if they changed
      await supabase
        .from("clients")
        .update({
          full_name: data.fullName,
          email: data.email,
        })
        .eq("id", existingClient.id);

      client = existingClient;
    } else {
      const { data: newClient, error: clientInsertError } = await supabase
        .from("clients")
        .insert({
          full_name: data.fullName,
          mobile: data.mobile,
          email: data.email,
        })
        .select("id")
        .single();

      if (clientInsertError || !newClient) {
        console.error("[create-order] Client insert error:", clientInsertError);
        return NextResponse.json({ message: "Failed to save client details." }, { status: 500 });
      }

      client = newClient;
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
    const nowTimestamp = Date.now().toString().slice(-6);
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const bookingNumber = `BJ-${nowTimestamp}-${randomSuffix}`;

    const { data: booking, error: bookingError } = await supabase
      .from("bookings")
      .insert({
        booking_number: bookingNumber,
        client_id: client.id,
        birth_profile_id: birthProfile.id,
        consultation_plan_id: data.planId,
        slot_id: data.slotId,
        concern: data.concern,
        amount: plan.price,
        currency: "INR",
        booking_status: "PENDING_PAYMENT",
        payment_status: "PENDING",
      })
      .select("id, booking_number")
      .single();

    if (bookingError || !booking) {
      console.error("[create-order] Booking error:", bookingError);
      return NextResponse.json({ message: "Failed to create booking." }, { status: 500 });
    }

    // ── 7. Create Razorpay order ───────────────────────────────
    const amountInPaise = Math.round(Number(plan.price) * 100);
    let rzpOrder: { id: string };
    try {
      const razorpay = getRazorpay();

      rzpOrder = await razorpay.orders.create({
        amount: amountInPaise,
        currency: "INR",
        receipt: booking.booking_number,
        notes: {
          booking_id: booking.id,
          plan_name: plan.name,
          client_name: data.fullName,
        },
      });
    } catch (rzpErr: any) {
      console.error("[create-order] Razorpay error:", rzpErr);
      const isPlaceholder =
        !process.env.RAZORPAY_KEY_ID ||
        process.env.RAZORPAY_KEY_ID.includes("xxxx");

      return NextResponse.json(
        {
          message: isPlaceholder
            ? "Razorpay test credentials are not configured in .env.local. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET."
            : rzpErr?.error?.description || rzpErr?.message || "Failed to initialize payment gateway.",
        },
        { status: 502 }
      );
    }

    // ── 8. Insert payment record (PENDING) ────────────────────
    const { error: paymentError } = await supabase
      .from("payments")
      .insert({
        booking_id: booking.id,
        gateway_order_id: rzpOrder.id,
        gateway_payment_id: null,
        amount: Number(plan.price),
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
        amount: amountInPaise, // in paise for Razorpay Checkout.js
        amountInRupees: Number(plan.price),
        currency: "INR",
        planName: plan.name,
        keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID,
      },
      { status: 200 }
    );
  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json(
        { message: err.issues[0]?.message || "Validation error" },
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
