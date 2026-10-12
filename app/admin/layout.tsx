// app/admin/layout.tsx
// Admin dashboard shell — sidebar nav + top bar.
// Auth is enforced by proxy.ts (redirects to /admin/login if no session).

import type { Metadata } from "next";
import AdminLayoutShell from "@/components/admin/AdminLayoutShell";

export const metadata: Metadata = {
  title: { default: "Admin | Balaji Jyotish", template: "%s — Admin" },
};

// Next.js 16 Cache Components — marks admin segment as allowed to block at request time
export const instant = false;

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminLayoutShell>{children}</AdminLayoutShell>;
}
