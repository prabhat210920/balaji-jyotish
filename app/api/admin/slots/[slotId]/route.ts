// app/api/admin/slots/[slotId]/route.ts
// PATCH — Update slot status. DELETE — Remove slot. Admin only.

import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/supabase/server-session";
import { z } from "zod";


const patchSchema = z.object({
  status: z.enum(["AVAILABLE", "BLOCKED"]),
});

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ slotId: string }> }
) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { slotId } = await params;
    const body = await req.json();
    const { status } = patchSchema.parse(body);

    const db = createServiceClient();

    // Safety: don't allow changing a BOOKED slot via this endpoint
    const { data: existing } = await db
      .from("slots")
      .select("status")
      .eq("id", slotId)
      .single();

    if (!existing) {
      return NextResponse.json({ message: "Slot not found." }, { status: 404 });
    }

    if (existing.status === "BOOKED") {
      return NextResponse.json(
        { message: "Cannot modify a booked slot." },
        { status: 409 }
      );
    }

    const { error } = await db
      .from("slots")
      .update({
        status,
        ...(status === "AVAILABLE" ? { held_until: null } : {}),
      })
      .eq("id", slotId);

    if (error) {
      return NextResponse.json({ message: "DB update failed." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ message: err.issues[0]?.message || "Validation error" }, { status: 400 });
    }
    return NextResponse.json({ message: "Unexpected error." }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ slotId: string }> }
) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { slotId } = await params;
    const db = createServiceClient();

    const { data: existing } = await db
      .from("slots")
      .select("status")
      .eq("id", slotId)
      .single();

    if (!existing) {
      return NextResponse.json({ message: "Slot not found." }, { status: 404 });
    }

    if (existing.status === "BOOKED") {
      return NextResponse.json(
        { message: "Cannot delete a booked slot." },
        { status: 409 }
      );
    }

    const { error } = await db.from("slots").delete().eq("id", slotId);

    if (error) {
      return NextResponse.json({ message: "DB delete failed." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ message: "Unexpected error." }, { status: 500 });
  }
}
