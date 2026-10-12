"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  CalendarDays,
  BookOpen,
  Users,
  LogOut,
  Star,
  X,
  Menu,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Bookings", href: "/admin/bookings", icon: BookOpen },
  { label: "Slot Manager", href: "/admin/slots", icon: CalendarDays },
  { label: "Plans", href: "/admin/plans", icon: Sparkles },
  { label: "Clients", href: "/admin/clients", icon: Users },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (pathname === "/admin/login") return null;

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-white/8">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C9A24D] to-[#E0C477] flex items-center justify-center flex-shrink-0">
          <Star className="w-4 h-4 text-[#0B1633] fill-[#0B1633]" />
        </div>
        <div>
          <p className="font-serif text-white font-bold text-sm leading-none">Balaji Jyotish</p>
          <p className="text-[#C9A24D] text-[0.6rem] tracking-widest uppercase mt-0.5">Admin</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 flex flex-col gap-1">
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
          const isActive =
            href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-[#C9A24D]/15 text-[#C9A24D] border border-[#C9A24D]/20"
                  : "text-white/55 hover:text-white hover:bg-white/5"
              )}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 pb-5 border-t border-white/8 pt-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 w-full"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-full w-64 bg-[#0B1633] border-r border-white/8 flex-col z-30">
        <SidebarContent />
      </aside>

      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-[#0B1633] border-b border-white/8 flex items-center justify-between px-4 h-14">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#C9A24D] to-[#E0C477] flex items-center justify-center">
            <Star className="w-3.5 h-3.5 text-[#0B1633] fill-[#0B1633]" />
          </div>
          <span className="font-serif text-white font-bold text-sm">Admin</span>
        </div>
        <button
          onClick={() => setMobileOpen(true)}
          className="text-white/60 hover:text-white p-1"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute left-0 top-0 h-full w-64 bg-[#0B1633] border-r border-white/8 flex flex-col">
            <div className="flex justify-end p-4">
              <button onClick={() => setMobileOpen(false)} className="text-white/60 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <SidebarContent />
          </aside>
        </div>
      )}
    </>
  );
}
