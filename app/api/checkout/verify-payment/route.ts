// app/api/checkout/verify-payment/route.ts
// POST — Cryptographically verifies Razorpay payment signature
// and marks booking as CONFIRMED and slot as BOOKED.

import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createServiceClient } from "@/lib/supabase/server";
import { z } from "zod";

const verifySchema = z.object({
  bookingId: z.string().uuid(),
  razorpayOrderId: z.string().min(1),
  razorpayPaymentId: z.string().min(1),
  razorpaySignature: z.string().min(1),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { bookingId, razorpayOrderId, razorpayPaymentId, razorpaySignature } =
      verifySchema.parse(body);

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      return NextResponse.json(
        { message: "Payment gateway secret not configured." },
        { status: 500 }
      );
    }

    // ── 1. Cryptographic HMAC-SHA256 signature verification ────
    const expectedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest("hex");

    const isAuthentic = crypto.timingSafeEqual(
      Buffer.from(razorpaySignature),
      Buffer.from(expectedSignature)
    );

    if (!isAuthentic) {
      console.warn("[verify-payment] Signature mismatch — potential tampering.");
      return NextResponse.json(
        { message: "Payment verification failed. Invalid signature." },
        { status: 400 }
      );
    }

    const supabase = createServiceClient();

    // ── 2. Update payment record ───────────────────────────────
    await supabase
      .from("payments")
      .update({
        gateway_payment_id: razorpayPaymentId,
        signature: razorpaySignature,
        status: "CAPTURED",
        paid_at: new Date().toISOString(),
      })
      .eq("gateway_order_id", razorpayOrderId);

    // ── 3. Fetch booking to get slot_id ────────────────────────
    const { data: booking, error: bookingErr } = await supabase
      .from("bookings")
      .select("id, slot_id")
      .eq("id", bookingId)
      .single();

    if (bookingErr || !booking) {
      console.error("[verify-payment] Booking not found:", bookingId);
      return NextResponse.json({ message: "Booking not found." }, { status: 404 });
    }

    // ── 4. Confirm booking ─────────────────────────────────────
    await supabase
      .from("bookings")
      .update({
        booking_status: "CONFIRMED",
        payment_status: "CAPTURED",
      })
      .eq("id", bookingId);

    // ── 5. Mark slot as BOOKED ─────────────────────────────────
    if (booking.slot_id) {
      await supabase
        .from("slots")
        .update({
          status: "BOOKED",
          held_until: null,
        })
        .eq("id", booking.slot_id);
    }

    return NextResponse.json({ success: true, bookingId });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { message: err.issues[0]?.message || "Validation error" },
        { status: 400 }
      );
    }
    console.error("[verify-payment] Error:", err);
    return NextResponse.json(
      { message: "Payment verification failed." },
      { status: 500 }
    );
  }
}
