import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import SlotManagerClient from "@/components/admin/SlotManagerClient";
import { CalendarDays, Plus } from "lucide-react";

export const metadata: Metadata = { title: "Slot Manager" };
export const instant = false;

export default async function AdminSlotsPage() {
  await connection();
  const db = createServiceClient();

  const { data: slots } = await db
    .from("slots")
    .select("*")
    .order("slot_date", { ascending: true })
    .order("start_time", { ascending: true })
    .limit(200);

  const { data: plans } = await db
    .from("consultation_plans")
    .select("id, name")
    .eq("active", true)
    .order("sort_order");

  return (
    <div className="pt-14 lg:pt-0 p-6 flex flex-col gap-6 min-h-screen">
      <div className="flex items-center justify-between pt-2">
        <div>
          <h1 className="font-serif text-2xl font-bold text-white flex items-center gap-2">
            <CalendarDays className="w-6 h-6 text-[#C9A24D]" />
            Slot Manager
          </h1>
          <p className="text-white/40 text-sm mt-0.5">Create, edit, and mute consultation slots.</p>
        </div>
        <Link href="/admin/slots/new" className="btn-gold text-sm">
          <Plus className="w-4 h-4" /> Create Slots
        </Link>
      </div>

      <SlotManagerClient initialSlots={slots ?? []} plans={plans ?? []} />
    </div>
  );
}
