"use client";

import { usePathname } from "next/navigation";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <main className="min-h-screen bg-[#0B1633]">{children}</main>;
  }

  return (
    <div className="min-h-screen bg-[#0f1829] flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden lg:ml-64">
        {children}
      </div>
    </div>
  );
}
