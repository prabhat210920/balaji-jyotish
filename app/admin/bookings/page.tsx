import { connection } from "next/server";
import Link from "next/link";
import { createServiceClient } from "@/lib/supabase/server";
import type { BookingStatus } from "@/lib/supabase/types";
import { BookOpen, ExternalLink } from "lucide-react";
import { formatSlotDateTime } from "@/lib/date-utils";

export const metadata = { title: "Bookings" };
export const instant = false;

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    CONFIRMED: "bg-green-500/15 text-green-400 border-green-500/20",
    PENDING_PAYMENT: "bg-orange-500/15 text-orange-400 border-orange-500/20",
    CANCELLED: "bg-red-500/15 text-red-400 border-red-500/20",
    REFUNDED: "bg-purple-500/15 text-purple-400 border-purple-500/20",
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-[0.65rem] font-bold uppercase tracking-wide border ${map[status] ?? "bg-white/10 text-white/50 border-white/10"}`}>
      {status.replace("_", " ")}
    </span>
  );
}

export default async function AdminBookingsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  await connection();
  const { status } = await searchParams;
  const db = createServiceClient();

  let query = db
    .from("bookings")
    .select(`
      id, booking_number, booking_status, created_at,
      clients (full_name, mobile, email),
      consultation_plans (name, price),
      slots (slot_date, start_time, end_time),
      payments (status, amount)
    `)
    .order("created_at", { ascending: false })
    .limit(100);

  if (status && status !== "ALL") {
    query = query.eq("booking_status", status as BookingStatus);
  }

  const { data: bookings } = await query;

  const FILTERS = [
    { label: "All", value: "" },
    { label: "Confirmed", value: "CONFIRMED" },
    { label: "Pending Payment", value: "PENDING_PAYMENT" },
    { label: "Cancelled", value: "CANCELLED" },
  ];

  return (
    <div className="pt-14 lg:pt-0 p-6 flex flex-col gap-6 min-h-screen">
      <div className="flex items-center gap-2 pt-2">
        <BookOpen className="w-5 h-5 text-[#C9A24D]" />
        <h1 className="font-serif text-2xl font-bold text-white">Bookings</h1>
        <span className="ml-2 px-2 py-0.5 rounded-full bg-white/8 text-white/50 text-xs font-semibold">
          {bookings?.length ?? 0}
        </span>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {FILTERS.map((f) => (
          <Link
            key={f.value}
            href={f.value ? `/admin/bookings?status=${f.value}` : "/admin/bookings"}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              (status ?? "") === f.value
                ? "bg-[#C9A24D] border-[#C9A24D] text-[#0B1633]"
                : "border-white/15 text-white/50 hover:border-white/30 hover:text-white"
            }`}
          >
            {f.label}
          </Link>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white/5 border border-white/8 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/8">
                {["Booking #", "Client", "Service", "Date & Time", "Amount", "Status", ""].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-white/40 text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(bookings ?? []).length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-white/30">
                    No bookings found.
                  </td>
                </tr>
              ) : (
                (bookings ?? []).map((b: any) => {
                  const client = Array.isArray(b.clients) ? b.clients[0] : b.clients;
                  const plan = Array.isArray(b.consultation_plans) ? b.consultation_plans[0] : b.consultation_plans;
                  const slot = Array.isArray(b.slots) ? b.slots[0] : b.slots;
                  const payment = Array.isArray(b.payments) ? b.payments[0] : b.payments;

                  return (
                    <tr key={b.id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                      <td className="px-4 py-3 font-mono text-[#C9A24D] text-xs font-semibold whitespace-nowrap">
                        {b.booking_number}
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-white font-medium whitespace-nowrap">{client?.full_name}</p>
                        <p className="text-white/40 text-xs">{client?.mobile}</p>
                      </td>
                      <td className="px-4 py-3 text-white/70 whitespace-nowrap">{plan?.name}</td>
                      <td className="px-4 py-3 text-white/60 text-xs whitespace-nowrap">
                        {formatSlotDateTime(slot?.slot_date, slot?.start_time)}
                      </td>
                      <td className="px-4 py-3 text-white/70 whitespace-nowrap">
                        {payment?.amount ? `₹${Number(payment.amount).toLocaleString("en-IN")}` : "—"}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={b.booking_status} />
                      </td>
                      <td className="px-4 py-3">
                        <Link
                          href={`/admin/bookings/${b.id}`}
                          className="text-white/30 hover:text-[#C9A24D] transition-colors"
                          title="View details"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
