// app/api/admin/slots/route.ts
// POST — Bulk create slots. Admin only.

import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/supabase/server-session";
import { z } from "zod";


const createSlotsSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  times: z.array(z.string().regex(/^\d{2}:\d{2}$/)).min(1).max(20),
  durationMinutes: z.number().int().min(15).max(480).default(60),
  repeatDays: z.number().int().min(0).max(90).default(0),
});

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { date, times, durationMinutes, repeatDays } = createSlotsSchema.parse(body);

    const db = createServiceClient();
    const slotsToInsert: Array<{
      slot_date: string;
      start_time: string;
      end_time: string;
      status: "AVAILABLE";
      held_until: null;
    }> = [];

    for (let day = 0; day <= repeatDays; day++) {
      const baseDate = new Date(date + "T00:00:00+05:30"); // IST
      baseDate.setDate(baseDate.getDate() + day);
      const dateStr = baseDate.toISOString().split("T")[0];

      for (const time of times) {
        const [hours, minutes] = time.split(":").map(Number);
        const timeFormatted = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
        const start = new Date(`${dateStr}T${timeFormatted}:00+05:30`);
        const end = new Date(start.getTime() + durationMinutes * 60 * 1000);

        // Skip if in the past
        if (start <= new Date()) continue;

        const endHours = String(end.getHours()).padStart(2, "0");
        const endMinutes = String(end.getMinutes()).padStart(2, "0");

        slotsToInsert.push({
          slot_date: dateStr,
          start_time: `${timeFormatted}:00`,
          end_time: `${endHours}:${endMinutes}:00`,
          status: "AVAILABLE",
          held_until: null,
        });
      }
    }

    if (slotsToInsert.length === 0) {
      return NextResponse.json({ message: "No future slots to create." }, { status: 400 });
    }

    const { data, error } = await db
      .from("slots")
      .insert(slotsToInsert)
      .select("id");

    if (error) {
      console.error("[admin/slots POST]", error);
      return NextResponse.json({ message: "Database error creating slots." }, { status: 500 });
    }

    return NextResponse.json({ success: true, created: data?.length ?? 0 }, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ message: err.issues[0]?.message || "Validation error" }, { status: 400 });
    }
    return NextResponse.json({ message: "Unexpected error." }, { status: 500 });
  }
}
