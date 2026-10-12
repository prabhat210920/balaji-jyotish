import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import {
  BookOpen,
  CalendarDays,
  IndianRupee,
  Users,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { formatSlotDateTime } from "@/lib/date-utils";

export const metadata: Metadata = { title: "Dashboard" };
export const instant = false;

async function getStats() {
  await connection();
  const db = createServiceClient();
  const now = new Date().toISOString();

  const [
    { count: totalBookings },
    { count: confirmedBookings },
    { count: pendingBookings },
    { count: availableSlots },
    { count: totalClients },
    payments,
    recentBookings,
  ] = await Promise.all([
    db.from("bookings").select("*", { count: "exact", head: true }),
    db.from("bookings").select("*", { count: "exact", head: true }).eq("booking_status", "CONFIRMED"),
    db.from("bookings").select("*", { count: "exact", head: true }).eq("booking_status", "PENDING_PAYMENT"),
    db.from("slots").select("*", { count: "exact", head: true }).eq("status", "AVAILABLE").gte("slot_date", new Date().toISOString().split("T")[0]),
    db.from("clients").select("*", { count: "exact", head: true }),
    db.from("payments").select("amount").eq("status", "CAPTURED"),
    db
      .from("bookings")
      .select(`
        id, booking_number, booking_status, created_at,
        clients (full_name),
        consultation_plans (name),
        slots (slot_date, start_time)
      `)
      .order("created_at", { ascending: false })
      .limit(8),
  ]);

  const revenue = (payments.data ?? []).reduce((s, p) => s + (p.amount ?? 0), 0);

  return {
    totalBookings: totalBookings ?? 0,
    confirmedBookings: confirmedBookings ?? 0,
    pendingBookings: pendingBookings ?? 0,
    availableSlots: availableSlots ?? 0,
    totalClients: totalClients ?? 0,
    revenue,
    recentBookings: recentBookings.data ?? [],
  };
}

function StatCard({
  label,
  value,
  icon: Icon,
  sub,
  color = "gold",
}: {
  label: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  sub?: string;
  color?: "gold" | "green" | "blue" | "orange";
}) {
  const colorMap = {
    gold: "bg-[#C9A24D]/15 text-[#C9A24D]",
    green: "bg-green-500/15 text-green-400",
    blue: "bg-blue-500/15 text-blue-400",
    orange: "bg-orange-500/15 text-orange-400",
  };
  return (
    <div className="bg-white/5 border border-white/8 rounded-xl p-5 flex items-start gap-4">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${colorMap[color]}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-white/50 text-xs font-semibold uppercase tracking-wide mb-0.5">{label}</p>
        <p className="font-serif text-2xl font-bold text-white">{value}</p>
        {sub && <p className="text-white/35 text-xs mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    CONFIRMED: "bg-green-500/15 text-green-400",
    PENDING_PAYMENT: "bg-orange-500/15 text-orange-400",
    CANCELLED: "bg-red-500/15 text-red-400",
    REFUNDED: "bg-purple-500/15 text-purple-400",
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-[0.65rem] font-bold uppercase tracking-wide ${map[status] ?? "bg-white/10 text-white/50"}`}>
      {status.replace("_", " ")}
    </span>
  );
}

export default async function AdminDashboardPage() {
  const stats = await getStats();

  return (
    <div className="pt-14 lg:pt-0 p-6 flex flex-col gap-6 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between pt-2">
        <div>
          <h1 className="font-serif text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-white/40 text-sm mt-0.5">
            {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>
        <Link href="/admin/slots/new" className="btn-gold text-sm">
          <CalendarDays className="w-4 h-4" /> New Slot
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          label="Total Revenue"
          value={`₹${Number(stats.revenue).toLocaleString("en-IN")}`}
          icon={IndianRupee}
          color="gold"
          sub="From confirmed bookings"
        />
        <StatCard
          label="Confirmed Bookings"
          value={stats.confirmedBookings}
          icon={CheckCircle2}
          color="green"
          sub={`${stats.totalBookings} total bookings`}
        />
        <StatCard
          label="Pending Payment"
          value={stats.pendingBookings}
          icon={Clock}
          color="orange"
          sub="Awaiting payment"
        />
        <StatCard
          label="Available Slots"
          value={stats.availableSlots}
          icon={CalendarDays}
          color="blue"
          sub="Future slots open"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Bookings */}
        <div className="xl:col-span-2 bg-white/5 border border-white/8 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-white/8 flex items-center justify-between">
            <h2 className="text-white font-semibold text-sm flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#C9A24D]" /> Recent Bookings
            </h2>
            <Link href="/admin/bookings" className="text-[#C9A24D] text-xs hover:underline flex items-center gap-1">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y divide-white/5">
            {stats.recentBookings.length === 0 ? (
              <p className="text-white/30 text-sm text-center py-10">No bookings yet.</p>
            ) : (
              stats.recentBookings.map((b: any) => {
                const client = Array.isArray(b.clients) ? b.clients[0] : b.clients;
                const plan = Array.isArray(b.consultation_plans) ? b.consultation_plans[0] : b.consultation_plans;
                const slot = Array.isArray(b.slots) ? b.slots[0] : b.slots;
                return (
                  <Link
                    key={b.id}
                    href={`/admin/bookings/${b.id}`}
                    className="flex items-center gap-3 px-5 py-3.5 hover:bg-white/3 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#C9A24D]/15 flex items-center justify-center flex-shrink-0">
                      <span className="text-[#C9A24D] font-serif font-bold text-xs">
                        {client?.full_name?.[0] ?? "?"}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate">{client?.full_name}</p>
                      <p className="text-white/40 text-xs truncate">{plan?.name}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <StatusBadge status={b.booking_status} />
                      <p className="text-white/30 text-[0.65rem] mt-1">
                        {formatSlotDateTime(slot?.slot_date, slot?.start_time, { includeYear: false })}
                      </p>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col gap-4">
          <div className="bg-white/5 border border-white/8 rounded-xl p-5">
            <h2 className="text-white font-semibold text-sm mb-4 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-[#C9A24D]" /> Quick Actions
            </h2>
            <div className="flex flex-col gap-2">
              <Link href="/admin/slots/new" className="flex items-center justify-between p-3 rounded-lg bg-[#C9A24D]/8 border border-[#C9A24D]/15 hover:border-[#C9A24D]/40 transition-colors group">
                <span className="text-white/80 text-sm font-medium group-hover:text-white">Create Slots</span>
                <ArrowRight className="w-4 h-4 text-[#C9A24D]" />
              </Link>
              <Link href="/admin/bookings?status=PENDING_PAYMENT" className="flex items-center justify-between p-3 rounded-lg bg-orange-500/8 border border-orange-500/15 hover:border-orange-500/40 transition-colors group">
                <span className="text-white/80 text-sm font-medium group-hover:text-white">Pending Payments</span>
                <ArrowRight className="w-4 h-4 text-orange-400" />
              </Link>
              <Link href="/admin/slots" className="flex items-center justify-between p-3 rounded-lg bg-blue-500/8 border border-blue-500/15 hover:border-blue-500/40 transition-colors group">
                <span className="text-white/80 text-sm font-medium group-hover:text-white">Manage Slots</span>
                <ArrowRight className="w-4 h-4 text-blue-400" />
              </Link>
              <Link href="/admin/clients" className="flex items-center justify-between p-3 rounded-lg bg-purple-500/8 border border-purple-500/15 hover:border-purple-500/40 transition-colors group">
                <span className="text-white/80 text-sm font-medium group-hover:text-white">View Clients</span>
                <ArrowRight className="w-4 h-4 text-purple-400" />
              </Link>
            </div>
          </div>

          <div className="bg-white/5 border border-white/8 rounded-xl p-5">
            <h2 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
              <Users className="w-4 h-4 text-[#C9A24D]" /> Overview
            </h2>
            <div className="space-y-2.5">
              {[
                { label: "Total Clients", value: stats.totalClients },
                { label: "Total Bookings", value: stats.totalBookings },
                { label: "Conversion", value: stats.totalBookings > 0 ? `${Math.round((stats.confirmedBookings / stats.totalBookings) * 100)}%` : "0%" },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center text-sm">
                  <span className="text-white/40">{label}</span>
                  <span className="text-white font-semibold">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
