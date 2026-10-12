import { connection } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import PlanManagerClient from "@/components/admin/PlanManagerClient";
import { Sparkles } from "lucide-react";

import type { Metadata } from "next";

export const metadata: Metadata = { title: "Consultation Plans" };
export const instant = false;

export default async function AdminPlansPage() {
  await connection();
  const db = createServiceClient();

  const { data: plans } = await db
    .from("consultation_plans")
    .select("*")
    .order("sort_order", { ascending: true });

  return (
    <div className="pt-14 lg:pt-0 p-6 flex flex-col gap-6 min-h-screen">
      <div className="flex items-center justify-between pt-2">
        <div>
          <h1 className="font-serif text-2xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-[#C9A24D]" />
            Consultation Plans
          </h1>
          <p className="text-white/40 text-sm mt-0.5">
            Manage your astrology consultation packages, pricing, and duration.
          </p>
        </div>
      </div>

      <PlanManagerClient initialPlans={plans ?? []} />
    </div>
  );
}
