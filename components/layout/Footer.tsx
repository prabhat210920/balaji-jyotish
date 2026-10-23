import Link from "next/link";
import { Star, Phone, Mail, MapPin } from "lucide-react";
import { getWhatsAppUrl, WHATSAPP_DISPLAY_PHONE, WHATSAPP_NUMBER } from "@/lib/whatsapp";
import { SITE_CONFIG } from "@/lib/site-config";

// Brand icons not available in lucide-react — use inline SVGs
function IconInstagram({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function IconYoutube({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function IconFacebook({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

const FOOTER_SERVICES = [
  { label: "Kundali Analysis", href: "/services#kundali" },
  { label: "Career & Business", href: "/services#career" },
  { label: "Marriage & Relationships", href: "/services#marriage" },
  { label: "Family Disputes", href: "/services#family" },
  { label: "Vastu Shastra", href: "/services#vastu" },
  { label: "Health & Vedic Remedies", href: "/services#remedies" },
];

const FOOTER_QUICK = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Book Consultation", href: getWhatsAppUrl(), isExternal: true },
];

// Static year constant — Next.js 16 disallows dynamic `new Date()` during prerender
const CURRENT_YEAR = 2026;

export default function Footer() {

  return (
    <footer className="bg-[#0B1633] text-white/80">
      {/* Gold top border */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#C9A24D] to-transparent" />

      {/* Main Footer Content */}
      <div className="section-container py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-5 group w-fit">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C9A24D] to-[#E0C477] flex items-center justify-center">
                <Star className="w-5 h-5 text-[#0B1633] fill-[#0B1633]" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-serif text-lg font-bold text-white tracking-wide">Balaji Jyotish</span>
                <span className="text-[0.6rem] tracking-[0.18em] uppercase text-[#C9A24D]">Vedic Astrology</span>
              </div>
            </Link>

            <p className="text-sm leading-relaxed text-white/60 mb-6">
              Illuminating life&apos;s journey through the ancient wisdom of Vedic astrology.
              Trusted by thousands across India and globally.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {[
                { icon: IconInstagram, href: SITE_CONFIG.instagramUrl, label: "Instagram" },
                { icon: IconYoutube, href: SITE_CONFIG.youtubeUrl, label: "YouTube" },
                { icon: IconFacebook, href: SITE_CONFIG.facebookUrl, label: "Facebook" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-[#C9A24D] hover:border-[#C9A24D]/50 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-serif text-white text-base font-semibold mb-5 relative">
              Our Services
              <span className="absolute -bottom-2 left-0 w-8 h-px bg-[#C9A24D]" />
            </h3>
            <ul className="space-y-3 mt-4">
              {FOOTER_SERVICES.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="text-sm text-white/55 hover:text-[#C9A24D] transition-colors duration-200 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9A24D]/40 flex-shrink-0" />
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-white text-base font-semibold mb-5 relative">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-8 h-px bg-[#C9A24D]" />
            </h3>
            <ul className="space-y-3 mt-4">
              {FOOTER_QUICK.map((s) => (
                <li key={s.label}>
                  {"isExternal" in s && s.isExternal ? (
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white/55 hover:text-[#C9A24D] transition-colors duration-200 flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C9A24D]/40 flex-shrink-0" />
                      {s.label}
                    </a>
                  ) : (
                    <Link
                      href={s.href}
                      className="text-sm text-white/55 hover:text-[#C9A24D] transition-colors duration-200 flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C9A24D]/40 flex-shrink-0" />
                      {s.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-white text-base font-semibold mb-5 relative">
              Get in Touch
              <span className="absolute -bottom-2 left-0 w-8 h-px bg-[#C9A24D]" />
            </h3>
            <ul className="space-y-4 mt-4">
              <li>
                <a
                  href={`tel:+${WHATSAPP_NUMBER}`}
                  className="flex items-start gap-3 text-sm text-white/55 hover:text-[#C9A24D] transition-colors duration-200"
                >
                  <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#C9A24D]/70" />
                  {WHATSAPP_DISPLAY_PHONE}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="flex items-start gap-3 text-sm text-white/55 hover:text-[#C9A24D] transition-colors duration-200"
                >
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#C9A24D]/70" />
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li>
                <span className="flex items-start gap-3 text-sm text-white/55">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#C9A24D]/70" />
                  <span>{SITE_CONFIG.address}</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/8">
        <div className="section-container py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/35">
          <p>© {CURRENT_YEAR} Balaji Jyotish. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-[#C9A24D] transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#C9A24D] transition-colors duration-200">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
