import type { Metadata } from "next";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import ContactForm from "@/components/website/ContactForm";
import { getWhatsAppUrl, WHATSAPP_DISPLAY_PHONE, WHATSAPP_NUMBER } from "@/lib/whatsapp";
import { SITE_CONFIG } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact Us & Chamber Location | Balaji Jyotish",
  description:
    "Get in touch with Balaji Jyotish. Visit our consultation chamber in Patna, Bihar or message Guruji on WhatsApp for astrology consultations.",
};

export default function ContactPage() {
  return (
    <div className="bg-[#F7F3E8] min-h-screen pt-28 pb-20">
      <div className="section-container">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9A24D]/15 border border-[#C9A24D]/30 text-[#0B1633] text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#8C6D23]" />
            Connect With Us
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#0B1633] mb-4">
            Get in Touch With Guruji
          </h1>
          <p className="text-[#202020]/70 text-base leading-relaxed">
            Have questions about an upcoming consultation, auspicious dates, or need assistance
            booking a consultation? Reach out directly via WhatsApp, phone, or visit our chambers.
          </p>
        </div>

        {/* Info Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {/* Card 1: WhatsApp */}
          <a
            href={getWhatsAppUrl("Namaste Guruji, I would like to inquire about an astrology consultation.")}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white p-6 rounded-2xl border border-[#d9cdb6] shadow-sm hover:border-[#C9A24D] hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-green-500/10 text-green-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#0B1633] mb-1">WhatsApp Us</h3>
              <p className="text-xs text-[#202020]/60 mb-3">Quickest response for bookings & timings</p>
            </div>
            <p className="text-sm font-semibold text-green-600 flex items-center gap-1">
              {WHATSAPP_DISPLAY_PHONE}
              <ExternalLink className="w-3.5 h-3.5" />
            </p>
          </a>

          {/* Card 2: Phone */}
          <a
            href={`tel:+${WHATSAPP_NUMBER}`}
            className="bg-white p-6 rounded-2xl border border-[#d9cdb6] shadow-sm hover:border-[#C9A24D] hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#0B1633] text-[#C9A24D] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#0B1633] mb-1">Direct Call</h3>
              <p className="text-xs text-[#202020]/60 mb-3">Call during active chamber hours</p>
            </div>
            <p className="text-sm font-semibold text-[#0B1633]">{WHATSAPP_DISPLAY_PHONE}</p>
          </a>

          {/* Card 3: Email */}
          <a
            href={`mailto:${SITE_CONFIG.email}`}
            className="bg-white p-6 rounded-2xl border border-[#d9cdb6] shadow-sm hover:border-[#C9A24D] hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#5A1725]/10 text-[#5A1725] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#0B1633] mb-1">Email Inquiries</h3>
              <p className="text-xs text-[#202020]/60 mb-3">For detailed queries & astrological inquiries</p>
            </div>
            <p className="text-sm font-semibold text-[#5A1725] truncate">{SITE_CONFIG.email}</p>
          </a>

          {/* Card 4: Hours */}
          <div className="bg-white p-6 rounded-2xl border border-[#d9cdb6] shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#C9A24D]/15 text-[#8C6D23] flex items-center justify-center mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#0B1633] mb-1">Chamber Hours</h3>
              <p className="text-xs text-[#202020]/60 mb-3">Appointments scheduled in IST</p>
            </div>
            <p className="text-xs font-semibold text-[#0B1633] leading-relaxed">
              Mon – Sun: 9:00 AM – 7:00 PM IST
            </p>
          </div>
        </div>

        {/* Form and Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
          {/* Contact Inquiry Form */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#d9cdb6] shadow-sm">
            <h2 className="font-serif text-2xl font-bold text-[#0B1633] mb-2">Send a Message</h2>
            <p className="text-xs sm:text-sm text-[#202020]/65 mb-6">
              Fill in your details below and Guruji&apos;s team will get back to you within 24 hours.
            </p>

            <ContactForm />
          </div>

          {/* Embedded Google Map + Chamber Location Info */}
          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-3xl p-8 border border-[#d9cdb6] shadow-sm">
              <div className="flex items-start gap-3.5 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#0B1633] text-[#C9A24D] flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-xl text-[#0B1633]">
                    Balaji Jyotish Consultation Chamber
                  </h3>
                  <p className="text-xs text-[#8C6D23] font-semibold mt-0.5">
                    {SITE_CONFIG.landmark}, {SITE_CONFIG.cityState}
                  </p>
                </div>
              </div>

              <p className="text-sm text-[#202020]/75 leading-relaxed mb-6">
                {SITE_CONFIG.address}. In-person visits strictly by prior appointment only.
              </p>

              {/* Embedded Google Map */}
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-[#d9cdb6] shadow-inner">
                <iframe
                  title="Balaji Jyotish Chamber Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14390.495208573215!2d85.0744!3d25.6267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed57f022dfecb5%3A0xb3a53d1e17621f37!2sRukanpura%2C%20Patna%2C%20Bihar!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-[#202020]/60">Google Maps Navigation Verified</span>
                <a
                  href={SITE_CONFIG.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0B1633] hover:text-[#8C6D23]"
                >
                  Open in Google Maps
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Quick Consultation CTA */}
            <div className="bg-[#0B1633] rounded-2xl p-6 text-white flex items-center justify-between gap-4">
              <div>
                <p className="font-serif font-bold text-base text-white">Prefer to book immediately?</p>
                <p className="text-xs text-white/60 mt-0.5">Connect directly with Guruji on WhatsApp</p>
              </div>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold text-xs px-4 py-2.5 whitespace-nowrap"
              >
                Book on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
