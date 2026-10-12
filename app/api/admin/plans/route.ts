import { type NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/supabase/server-session";
import type { Database } from "@/lib/supabase/types";
import { z } from "zod";

type PlanUpdate = Database["public"]["Tables"]["consultation_plans"]["Update"];

const createPlanSchema = z.object({
  name: z.string().min(2, "Plan name is required."),
  type: z.string().default("general"),
  duration_minutes: z.number().int().positive("Duration must be positive."),
  price: z.number().positive("Price must be positive."),
  description: z.string().optional().nullable(),
  active: z.boolean().default(true),
  sort_order: z.number().int().default(1),
});

export async function GET() {
  try {
    const adminUser = await requireAdmin();
    if (!adminUser) {
      return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
    }

    const db = createServiceClient();
    const { data, error } = await db
      .from("consultation_plans")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    return NextResponse.json({ plans: data ?? [] });
  } catch (err) {
    return NextResponse.json({ message: "Unexpected error." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const adminUser = await requireAdmin();
    if (!adminUser) {
      return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
    }

    const body = await req.json();
    const parsed = createPlanSchema.parse(body);

    const db = createServiceClient();
    const { data, error } = await db
      .from("consultation_plans")
      .insert({
        name: parsed.name,
        type: parsed.type,
        duration_minutes: parsed.duration_minutes,
        price: parsed.price,
        description: parsed.description ?? null,
        active: parsed.active,
        sort_order: parsed.sort_order,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, plan: data }, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ message: err.issues[0]?.message || "Validation error" }, { status: 400 });
    }
    return NextResponse.json({ message: "Unexpected error." }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const adminUser = await requireAdmin();
    if (!adminUser) {
      return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
    }

    const body = await req.json();
    const { id, active, price, duration_minutes, name, description } = body;

    if (!id) {
      return NextResponse.json({ message: "Plan ID is required." }, { status: 400 });
    }

    const db = createServiceClient();
    const updateData: PlanUpdate = {};
    if (typeof active === "boolean") updateData.active = active;
    if (typeof price === "number") updateData.price = price;
    if (typeof duration_minutes === "number") updateData.duration_minutes = duration_minutes;
    if (typeof name === "string") updateData.name = name;
    if (typeof description !== "undefined") updateData.description = description;

    const { data, error } = await db
      .from("consultation_plans")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, plan: data });
  } catch (err) {
    return NextResponse.json({ message: "Unexpected error." }, { status: 500 });
  }
}
