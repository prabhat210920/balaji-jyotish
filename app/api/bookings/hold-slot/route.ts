// app/api/bookings/hold-slot/route.ts
// POST — Atomically hold a slot for 10 minutes. Prevents double-booking.

import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { holdSlotSchema } from "@/lib/validations/booking";
import { ZodError } from "zod";


export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { slotId } = holdSlotSchema.parse(body);

    const supabase = createServiceClient();
    const now = new Date();

    // ── 1. Fetch the slot ─────────────────────────────────────
    const { data: slot, error: fetchError } = await supabase
      .from("slots")
      .select("id, status, held_until")
      .eq("id", slotId)
      .single();

    if (fetchError || !slot) {
      return NextResponse.json({ success: false, message: "Slot not found." }, { status: 404 });
    }

    // ── 2. Check availability ─────────────────────────────────
    // AVAILABLE → always holdable
    // HELD → holdable only if the hold has expired (prevents double-hold)
    // BOOKED / BLOCKED → never holdable
    const isAvailable =
      slot.status === "AVAILABLE" ||
      (slot.status === "HELD" &&
        slot.held_until !== null &&
        new Date(slot.held_until) < now);

    if (!isAvailable) {
      const reason =
        slot.status === "BOOKED"
          ? "This slot has already been booked. Please choose another time."
          : slot.status === "BLOCKED"
          ? "This slot is not available."
          : "Someone else is holding this slot. Please choose another time or try again in a few minutes.";

      return NextResponse.json({ success: false, message: reason }, { status: 409 });
    }

    // ── 3. Atomic hold with optimistic concurrency ────────────
    // The WHERE clause includes both the status and held_until check,
    // so a race condition where two requests arrive simultaneously
    // will result in one succeeding and one failing the update.
    const heldUntil = new Date(now.getTime() + 10 * 60 * 1000).toISOString();

    const { data: updated, error: updateError } = await supabase
      .from("slots")
      .update({ status: "HELD", held_until: heldUntil })
      .eq("id", slotId)
      .or(
        `status.eq.AVAILABLE,and(status.eq.HELD,held_until.lt.${now.toISOString()})`
      )
      .select("id")
      .single();

    if (updateError || !updated) {
      // The slot was grabbed by another concurrent request between our read and write
      return NextResponse.json(
        {
          success: false,
          message:
            "This slot was just taken by another user. Please select a different time.",
        },
        { status: 409 }
      );
    }

    return NextResponse.json({ success: true, heldUntil }, { status: 200 });
  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json({ success: false, message: err.issues[0]?.message || "Validation error" }, { status: 400 });
    }
    console.error("[hold-slot]", err);
    return NextResponse.json({ success: false, message: "An unexpected error occurred." }, { status: 500 });
  }
}
