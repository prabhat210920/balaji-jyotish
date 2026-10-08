// app/admin/layout.tsx
// Admin dashboard layout — protected by Supabase Auth (Phase 2).

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Balaji Jyotish",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0f1a36] text-white flex">
      {children}
    </div>
  );
}
