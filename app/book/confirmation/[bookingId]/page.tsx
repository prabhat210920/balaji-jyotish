import type { Metadata } from "next";
import Link from "next/link";
import { createServiceClient } from "@/lib/supabase/server";
import {
  CheckCircle2,
  Calendar,
  Clock,
  Star,
  ArrowLeft,
} from "lucide-react";
import { notFound } from "next/navigation";
import { connection } from "next/server";

export const metadata: Metadata = {
  title: "Booking Confirmed | Balaji Jyotish",
  description: "Your consultation has been successfully booked.",
};

export const instant = false;

// WhatsApp CTA icon
function IconWhatsApp({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function formatDate(dateStr: string) {
  if (!dateStr) return "N/A";
  const d = dateStr.includes("T") ? new Date(dateStr) : new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatTime(timeStr: string) {
  if (!timeStr) return "N/A";
  if (timeStr.includes("T")) {
    return new Date(timeStr).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }
  const [hours, minutes] = timeStr.split(":");
  const h = parseInt(hours, 10);
  const ampm = h >= 12 ? "PM" : "AM";
  const formattedH = h % 12 || 12;
  return `${formattedH}:${minutes} ${ampm}`;
}

interface Props {
  params: Promise<{ bookingId: string }>;
}

export default async function ConfirmationPage({ params }: Props) {
  await connection();
  const { bookingId } = await params;

  const supabase = createServiceClient();

  const { data: rawBooking, error } = await supabase
    .from("bookings")
    .select(
      `
      id,
      booking_number,
      booking_status,
      payment_status,
      concern,
      clients (id, full_name, email, mobile),
      consultation_plans (id, name, duration_minutes, price),
      slots (id, slot_date, start_time, end_time)
    `
    )
    .eq("id", bookingId)
    .single();

  if (error || !rawBooking) {
    notFound();
  }

  const booking = rawBooking as any;

  const client = Array.isArray(booking.clients)
    ? booking.clients[0]
    : booking.clients;
  const plan = Array.isArray(booking.consultation_plans)
    ? booking.consultation_plans[0]
    : booking.consultation_plans;
  const slot = Array.isArray(booking.slots)
    ? booking.slots[0]
    : booking.slots;

  const adminWhatsApp = process.env.ADMIN_WHATSAPP_NUMBER ?? "919876543210";
  const whatsAppText = encodeURIComponent(
    `Namaste, I have successfully booked a consultation with Balaji Jyotish.\n\n` +
      `📋 Booking ID: ${booking.booking_number}\n` +
      `🔮 Service: ${plan?.name ?? "Consultation"}\n` +
      `📅 Date & Time: ${slot ? `${formatDate(slot.slot_date || slot.start_time)} at ${formatTime(slot.start_time)}` : "N/A"}\n\n` +
      `Please confirm my appointment. Thank you.`
  );
  const whatsAppUrl = `https://wa.me/${adminWhatsApp}?text=${whatsAppText}`;

  return (
    <div className="flex-1 flex flex-col items-center justify-center py-12 px-4">
      <div className="w-full max-w-lg">
        {/* Success Icon */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="relative mb-5">
            <div className="w-20 h-20 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-[#C9A24D] flex items-center justify-center">
              <Star className="w-3.5 h-3.5 text-[#0B1633] fill-[#0B1633]" />
            </div>
          </div>

          <h1 className="font-serif text-3xl font-bold text-[#0B1633] mb-2">
            Booking Confirmed!
          </h1>
          <p className="text-[#202020]/60 text-sm leading-relaxed max-w-sm">
            Your consultation has been successfully booked. Guruji will connect
            with you at the scheduled time.
          </p>
        </div>

        {/* Booking Card */}
        <div className="bg-white rounded-2xl border border-[#d9cdb6] shadow-[0_4px_24px_rgba(11,22,51,0.08)] overflow-hidden mb-6">
          {/* Header */}
          <div className="bg-[#0B1633] px-6 py-4 flex items-center justify-between">
            <div>
              <p className="text-[#C9A24D] text-[0.65rem] font-semibold tracking-[0.18em] uppercase mb-0.5">
                Booking Reference
              </p>
              <p className="font-serif text-xl font-bold text-white tracking-wider">
                {booking.booking_number}
              </p>
            </div>
            <div
              className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide ${
                booking.booking_status === "CONFIRMED"
                  ? "bg-green-500/20 text-green-400"
                  : "bg-[#C9A24D]/20 text-[#C9A24D]"
              }`}
            >
              {booking.booking_status === "CONFIRMED" ? "Confirmed" : "Pending"}
            </div>
          </div>

          {/* Details */}
          <div className="px-6 py-5 flex flex-col gap-4">
            {/* Service */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#C9A24D]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Star className="w-4 h-4 text-[#C9A24D]" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-xs text-[#8a8070] font-semibold uppercase tracking-wide mb-0.5">
                  Service
                </p>
                <p className="text-sm font-semibold text-[#0B1633]">
                  {plan?.name}
                </p>
                {plan && (
                  <p className="text-xs text-[#8a8070]">
                    {plan.duration_minutes} minutes · ₹
                    {Number(plan.price).toLocaleString("en-IN")}
                  </p>
                )}
              </div>
            </div>

            {/* Date & Time */}
            {slot && (
              <>
                <div className="h-px bg-[#d9cdb6]/60" />
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#C9A24D]/10 flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-4 h-4 text-[#C9A24D]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#8a8070] font-semibold uppercase tracking-wide mb-0.5">
                        Date
                      </p>
                      <p className="text-sm font-semibold text-[#0B1633]">
                        {formatDate(slot.slot_date || slot.start_time)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#C9A24D]/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-4 h-4 text-[#C9A24D]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#8a8070] font-semibold uppercase tracking-wide mb-0.5">
                        Time
                      </p>
                      <p className="text-sm font-semibold text-[#0B1633]">
                        {formatTime(slot.start_time)}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Client */}
            {client && (
              <>
                <div className="h-px bg-[#d9cdb6]/60" />
                <div>
                  <p className="text-xs text-[#8a8070] font-semibold uppercase tracking-wide mb-1">
                    Booked For
                  </p>
                  <p className="text-sm font-semibold text-[#0B1633]">
                    {client.full_name}
                  </p>
                  <p className="text-xs text-[#8a8070]">{client.email}</p>
                </div>
              </>
            )}
          </div>

          {/* Meet link placeholder */}
          <div className="bg-amber-50 border-t border-amber-100 px-6 py-3">
            <p className="text-amber-700 text-xs font-medium">
              📹 A Google Meet link will be shared by Guruji before your session.
            </p>
          </div>
        </div>

        {/* WhatsApp CTA */}
        <a
          href={whatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          id="whatsapp-cta"
          className="flex items-center justify-center gap-3 w-full rounded-xl py-4 px-6 bg-[#25D366] hover:bg-[#20b757] text-white font-bold text-base transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 mb-4"
        >
          <IconWhatsApp className="w-5 h-5" />
          Message Guruji on WhatsApp
        </a>

        {/* Secondary actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="flex-1 btn-outline-gold justify-center text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Return Home
          </Link>
          <Link
            href="/book"
            className="flex-1 btn-gold justify-center text-sm"
          >
            Book Another
          </Link>
        </div>

        {/* Disclaimer */}
        <p className="text-center text-[#8a8070] text-xs mt-6 leading-relaxed">
          A confirmation email has been sent to{" "}
          <span className="font-medium text-[#0B1633]">
            {client?.email ?? "your email"}
          </span>
          . If you have any questions, WhatsApp Guruji directly using the button
          above.
        </p>
      </div>
    </div>
  );
}
