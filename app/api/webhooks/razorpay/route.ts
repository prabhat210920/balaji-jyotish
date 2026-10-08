// app/api/webhooks/razorpay/route.ts
// POST — Razorpay webhook: verify signature, confirm booking & payment.

import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createServiceClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

// Razorpay sends the raw body — we must read it as text for signature verification.
export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-razorpay-signature");
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

    // ── 1. Verify webhook signature ───────────────────────────
    if (!webhookSecret) {
      console.error("[razorpay-webhook] RAZORPAY_WEBHOOK_SECRET not configured.");
      return NextResponse.json({ error: "Webhook not configured." }, { status: 500 });
    }

    if (!signature) {
      return NextResponse.json({ error: "Missing signature." }, { status: 400 });
    }

    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(rawBody)
      .digest("hex");

    if (
      !crypto.timingSafeEqual(
        Buffer.from(signature),
        Buffer.from(expectedSignature)
      )
    ) {
      console.warn("[razorpay-webhook] Signature mismatch — potential spoofing attempt.");
      return NextResponse.json({ error: "Invalid signature." }, { status: 401 });
    }

    // ── 2. Parse & handle the event ──────────────────────────
    const event = JSON.parse(rawBody) as {
      event: string;
      payload: {
        payment: {
          entity: {
            id: string;
            order_id: string;
            amount: number;
            currency: string;
            status: string;
          };
        };
      };
    };

    // We only act on payment.captured
    if (event.event !== "payment.captured") {
      // Acknowledge other events silently
      return NextResponse.json({ received: true }, { status: 200 });
    }

    const { id: razorpayPaymentId, order_id: razorpayOrderId } =
      event.payload.payment.entity;

    const supabase = createServiceClient();

    // ── 3. Find the payment record by razorpay_order_id ──────
    const { data: payment, error: paymentFetchError } = await supabase
      .from("payments")
      .select("id, booking_id, status")
      .eq("razorpay_order_id", razorpayOrderId)
      .single();

    if (paymentFetchError || !payment) {
      console.error("[razorpay-webhook] Payment record not found for order:", razorpayOrderId);
      // Return 200 so Razorpay does not retry indefinitely
      return NextResponse.json({ received: true }, { status: 200 });
    }

    // Idempotency guard — skip if already processed
    if (payment.status === "CAPTURED") {
      return NextResponse.json({ received: true }, { status: 200 });
    }

    // ── 4. Update payment record ──────────────────────────────
    const { error: paymentUpdateError } = await supabase
      .from("payments")
      .update({
        razorpay_payment_id: razorpayPaymentId,
        razorpay_signature: signature,
        status: "CAPTURED",
      })
      .eq("id", payment.id);

    if (paymentUpdateError) {
      console.error("[razorpay-webhook] Failed to update payment:", paymentUpdateError);
      return NextResponse.json({ error: "DB update failed." }, { status: 500 });
    }

    // ── 5. Fetch the booking to get the slot_id ───────────────
    const { data: booking, error: bookingFetchError } = await supabase
      .from("bookings")
      .select("id, slot_id, status")
      .eq("id", payment.booking_id)
      .single();

    if (bookingFetchError || !booking) {
      console.error("[razorpay-webhook] Booking not found:", payment.booking_id);
      return NextResponse.json({ received: true }, { status: 200 });
    }

    // ── 6. Update booking status → CONFIRMED ─────────────────
    const { error: bookingUpdateError } = await supabase
      .from("bookings")
      .update({ status: "CONFIRMED" })
      .eq("id", booking.id);

    if (bookingUpdateError) {
      console.error("[razorpay-webhook] Failed to confirm booking:", bookingUpdateError);
      return NextResponse.json({ error: "DB update failed." }, { status: 500 });
    }

    // ── 7. Update slot status → BOOKED ───────────────────────
    await supabase
      .from("slots")
      .update({ status: "BOOKED", held_until: null })
      .eq("id", booking.slot_id);

    // ── 8. TODO: Send confirmation email via Resend ───────────
    // await sendConfirmationEmail({ bookingId: booking.id });

    console.info("[razorpay-webhook] Booking confirmed:", booking.id);
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (err) {
    console.error("[razorpay-webhook] Unhandled error:", err);
    // Return 200 to prevent Razorpay from retrying on our bug
    return NextResponse.json({ received: true }, { status: 200 });
  }
}
