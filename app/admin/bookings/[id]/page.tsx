import { connection } from "next/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { createServiceClient } from "@/lib/supabase/server";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  IndianRupee,
  ShieldCheck,
  MessageCircle,
} from "lucide-react";
import { formatSlotDate, formatSlotTime, formatSlotDateTime, formatTimestamp } from "@/lib/date-utils";

export const metadata = { title: "Booking Details" };
export const instant = false;



export default async function AdminBookingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await connection();
  const { id } = await params;
  const db = createServiceClient();

  const { data: rawBooking, error } = await db
    .from("bookings")
    .select(`
      id,
      booking_number,
      booking_status,
      payment_status,
      concern,
      amount,
      currency,
      created_at,
      clients (id, full_name, email, mobile),
      birth_profiles (date_of_birth, time_of_birth, place_of_birth),
      consultation_plans (name, duration_minutes, price),
      slots (slot_date, start_time, end_time),
      payments (status, gateway_order_id, gateway_payment_id)
    `)
    .eq("id", id)
    .single();

  if (error || !rawBooking) {
    notFound();
  }

  const booking = rawBooking as any;
  const client = Array.isArray(booking.clients) ? booking.clients[0] : booking.clients;
  const birth = Array.isArray(booking.birth_profiles) ? booking.birth_profiles[0] : booking.birth_profiles;
  const plan = Array.isArray(booking.consultation_plans) ? booking.consultation_plans[0] : booking.consultation_plans;
  const slot = Array.isArray(booking.slots) ? booking.slots[0] : booking.slots;
  const payment = Array.isArray(booking.payments) ? booking.payments[0] : booking.payments;

  const adminWhatsApp = client?.mobile?.replace(/\D/g, "");
  const whatsAppUrl = adminWhatsApp
    ? `https://wa.me/91${adminWhatsApp.slice(-10)}?text=${encodeURIComponent(
        `Namaste ${client?.full_name}, this is Balaji Jyotish regarding your consultation booking (${booking.booking_number}).`
      )}`
    : null;

  return (
    <div className="pt-14 lg:pt-0 p-6 flex flex-col gap-6 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/bookings"
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="font-serif text-2xl font-bold text-white tracking-wide">
                {booking.booking_number}
              </h1>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider border ${
                  booking.booking_status === "CONFIRMED"
                    ? "bg-green-500/15 text-green-400 border-green-500/20"
                    : "bg-orange-500/15 text-orange-400 border-orange-500/20"
                }`}
              >
                {booking.booking_status}
              </span>
            </div>
            <p className="text-white/40 text-xs mt-0.5">
              Booked on {formatTimestamp(booking.created_at)}
            </p>
          </div>
        </div>

        {whatsAppUrl && (
          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold text-sm flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            Message Client on WhatsApp
          </a>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 cols) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Client & Birth Chart Details */}
          <div className="bg-white/5 border border-white/8 rounded-2xl p-6">
            <h2 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C9A24D]" />
              Astrological Birth Profile (Kundali Data)
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-white/3 border border-white/5 mb-6">
              <div>
                <p className="text-xs text-white/40 font-medium">Date of Birth</p>
                <p className="text-white font-medium text-sm mt-0.5">
                  {birth?.date_of_birth ? formatSlotDate(birth.date_of_birth) : "N/A"}
                </p>
              </div>
              <div>
                <p className="text-xs text-white/40 font-medium">Time of Birth</p>
                <p className="text-white font-medium text-sm mt-0.5">
                  {birth?.time_of_birth ? formatSlotTime(birth.time_of_birth) : "Not provided"}
                </p>
              </div>
              <div>
                <p className="text-xs text-white/40 font-medium">Place of Birth</p>
                <p className="text-white font-medium text-sm mt-0.5 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#C9A24D]" />
                  {birth?.place_of_birth ?? "N/A"}
                </p>
              </div>
            </div>

            {/* Concern */}
            <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
              Client Consultation Concern / Questions
            </h3>
            <div className="p-4 rounded-xl bg-white/3 border border-white/5 text-white/80 text-sm leading-relaxed whitespace-pre-wrap">
              {booking.concern ?? "No specific concern described."}
            </div>
          </div>

          {/* Consultation Service & Time */}
          <div className="bg-white/5 border border-white/8 rounded-2xl p-6">
            <h2 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#C9A24D]" />
              Appointment Schedule
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/3 border border-white/5">
                <p className="text-xs text-white/40">Selected Service</p>
                <p className="text-white font-serif font-bold text-base mt-1">
                  {plan?.name ?? "Astrology Consultation"}
                </p>
                <p className="text-[#C9A24D] text-xs mt-1">
                  Duration: {plan?.duration_minutes ?? 45} minutes
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/3 border border-white/5">
                <p className="text-xs text-white/40">Scheduled Date & Time</p>
                <p className="text-white font-medium text-base mt-1 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#C9A24D]" />
                  {slot
                    ? formatSlotDateTime(slot.slot_date, slot.start_time, { includeWeekday: true })
                    : "Not assigned"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (1 col): Client & Payment */}
        <div className="flex flex-col gap-6">
          {/* Client Details */}
          <div className="bg-white/5 border border-white/8 rounded-2xl p-6">
            <h2 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-4 flex items-center gap-2">
              <User className="w-4 h-4 text-[#C9A24D]" />
              Client Contact
            </h2>

            <div className="flex flex-col gap-3">
              <div>
                <p className="text-xs text-white/40">Full Name</p>
                <p className="text-white font-medium text-sm mt-0.5">{client?.full_name}</p>
              </div>
              <div>
                <p className="text-xs text-white/40">Phone</p>
                <p className="text-white font-mono text-sm mt-0.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-white/30" />
                  {client?.mobile}
                </p>
              </div>
              <div>
                <p className="text-xs text-white/40">Email</p>
                <p className="text-white text-sm mt-0.5 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-white/30" />
                  {client?.email}
                </p>
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div className="bg-white/5 border border-white/8 rounded-2xl p-6">
            <h2 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-4 flex items-center gap-2">
              <IndianRupee className="w-4 h-4 text-[#C9A24D]" />
              Payment Summary
            </h2>

            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center py-2 border-b border-white/8">
                <span className="text-xs text-white/40">Consultation Fee</span>
                <span className="text-lg font-bold text-[#C9A24D]">
                  ₹{Number(booking.amount).toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-xs text-white/40">Payment Status</span>
                <span className="text-xs font-bold text-green-400 uppercase">
                  {booking.payment_status}
                </span>
              </div>
              {payment?.gateway_order_id && (
                <div className="py-2 border-t border-white/8">
                  <p className="text-[0.65rem] text-white/40 uppercase">Razorpay Order ID</p>
                  <p className="text-xs font-mono text-white/60 mt-0.5 truncate">
                    {payment.gateway_order_id}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
