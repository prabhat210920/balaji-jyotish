// app/api/bookings/hold-slot/route.ts
// POST — Atomically hold a slot for 10 minutes to prevent double-booking.
// Uses the service-role Supabase client to bypass RLS.

import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { holdSlotSchema } from "@/lib/validations/booking";
import { ZodError } from "zod";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    // ── 1. Parse & validate request body ──────────────────────
    const body = await req.json().catch(() => ({}));
    const { slotId } = holdSlotSchema.parse(body);

    const supabase = createServiceClient();

    // ── 2. Fetch the slot — single source of truth ────────────
    const { data: slot, error: fetchError } = await supabase
      .from("slots")
      .select("id, status, held_until")
      .eq("id", slotId)
      .single();

    if (fetchError || !slot) {
      return NextResponse.json(
        { success: false, message: "Slot not found." },
        { status: 404 }
      );
    }

    // ── 3. Check availability (AVAILABLE, or HELD but expired) ─
    const now = new Date();
    const isAvailable =
      slot.status === "AVAILABLE" ||
      (slot.status === "HELD" &&
        slot.held_until !== null &&
        new Date(slot.held_until) < now);

    if (!isAvailable) {
      return NextResponse.json(
        {
          success: false,
          message:
            "This slot is no longer available. Please choose another time.",
        },
        { status: 409 }
      );
    }

    // ── 4. Hold the slot atomically ───────────────────────────
    const heldUntil = new Date(now.getTime() + 10 * 60 * 1000).toISOString(); // +10 min

    const { error: updateError } = await supabase
      .from("slots")
      .update({ status: "HELD", held_until: heldUntil })
      .eq("id", slotId)
      // Optimistic concurrency — only update if still available or hold expired
      .or(
        `status.eq.AVAILABLE,and(status.eq.HELD,held_until.lt.${now.toISOString()})`
      );

    if (updateError) {
      console.error("[hold-slot] Update error:", updateError);
      return NextResponse.json(
        {
          success: false,
          message: "Could not hold the slot. It may have just been taken.",
        },
        { status: 409 }
      );
    }

    return NextResponse.json({ success: true, heldUntil }, { status: 200 });
  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json(
        { success: false, message: err.errors[0].message },
        { status: 400 }
      );
    }

    console.error("[hold-slot] Unexpected error:", err);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
