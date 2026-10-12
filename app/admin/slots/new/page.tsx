import type { Metadata } from "next";
import { Suspense } from "react";
import { connection } from "next/server";
import NewSlotsForm from "@/components/admin/NewSlotsForm";

export const metadata: Metadata = {
  title: "Create Slots | Balaji Jyotish Admin",
};

export const instant = false;

export default async function NewSlotsPage() {
  await connection();

  return (
    <Suspense
      fallback={
        <div className="pt-14 lg:pt-0 p-6 min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-[#C9A24D]/30 border-t-[#C9A24D] animate-spin" />
        </div>
      }
    >
      <NewSlotsForm />
    </Suspense>
  );
}
