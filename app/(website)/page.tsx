import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Star,
  ArrowRight,
  CheckCircle2,
  Quote,
  ChevronRight,
} from "lucide-react";
import YouTubeVideosSection from "@/components/website/YouTubeVideosSection";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Home | Balaji Jyotish — Vedic Astrology Consultation",
  description:
    "Discover your destiny through the ancient wisdom of Vedic Astrology. Book a personalized consultation with Balaji Jyotish today.",
};

/* ──────────────────────────────────────────────────────────
   DATA
   ────────────────────────────────────────────────────────── */

const STATS = [
  { value: "10+", label: "Years of Experience" },
  { value: "1000+", label: "Consultations Done" },
  { value: "12", label: "Horoscopes Types" },
];

const SERVICES = [
  {
    image: "/assets/services/kundali.jpg",
    title: "Kundali Analysis",
    subtitle: "Birth Chart & Life Predictions",
    description:
      "Deep evaluation of your Janam Kundali, planetary positions, Mahadasha cycles, and future forecasts to give you crystal-clear life direction.",
    href: "/services#kundali",
    badge: "Most Popular",
  },
  {
    image: "/assets/services/career.jpg",
    title: "Career & Business Growth",
    subtitle: "Job, Wealth & Financial Stability",
    description:
      "Overcome career stagnation, job transition dilemmas, delayed promotions, business losses, and financial hurdles with practical astrological remedies.",
    href: "/services#career",
    badge: null,
  },
  {
    image: "/assets/services/marriage.jpg",
    title: "Marriage & Relationships",
    subtitle: "Kundali Milan & Compatibility",
    description:
      "Resolve delayed marriage, love relationship hurdles, and marital discord with thorough 36-Guna matching, Manglik Dosha analysis, and remedies.",
    href: "/services#marriage",
    badge: "High Demand",
  },
  {
    image: "/assets/services/family.jpg",
    title: "Family Dispute Resolution",
    subtitle: "Domestic Peace & Generational Harmony",
    description:
      "Find peaceful remedies for recurring domestic conflicts, ancestral property disputes, and family misunderstandings to restore household harmony.",
    href: "/services#family",
    badge: null,
  },
  {
    image: "/assets/services/vastu.jpg",
    title: "Vastu Shastra Consultation",
    subtitle: "Home & Commercial Energy Balance",
    description:
      "Harmonise your home, plot, or commercial workplace with cosmic energies. Identify structural defects and receive effective, non-demolition remedies.",
    href: "/services#vastu",
    badge: null,
  },
  {
    image: "/assets/services/remedies.jpg",
    title: "Health & Vedic Remedies",
    subtitle: "Gemstones & Planetary Healing",
    description:
      "Alleviate persistent stress, chronic vitality issues, and planetary afflictions with authentic certified gemstone advice, mantras, and personalized Upayas.",
    href: "/services#remedies",
    badge: null,
  },
];

const TESTIMONIALS = [
  {
    name: "Priya Venkataraman",
    location: "Bangalore, Karnataka",
    rating: 5,
    text: "Guruji's reading was uncannily accurate. He described events from my past I had never shared and guided me through a very difficult career transition. Truly a divine experience.",
    consultation: "Career & Business Guidance",
  },
  {
    name: "Rajesh & Sunita Mehta",
    location: "Pune, Maharashtra",
    rating: 5,
    text: "We consulted Guruji for Kundali matching before our wedding. His thorough analysis gave us immense clarity and confidence. We are now happily married for 3 years.",
    consultation: "Marriage & Relationship Harmony",
  },
  {
    name: "Dr. Arvind Krishnamurthy",
    location: "Chennai, Tamil Nadu",
    rating: 5,
    text: "The Vastu consultation transformed our clinic. Within months, patient footfall increased significantly. Guruji's recommendations were precise and highly practical.",
    consultation: "Vastu Shastra Consultation",
  },
];

/* ──────────────────────────────────────────────────────────
   PAGE
   ────────────────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <>
      {/* ════════════════════════════════════════════════════
          1. HERO SECTION
          ════════════════════════════════════════════════════ */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center overflow-hidden bg-[#0B1633]"
        aria-label="Hero"
      >
        {/* Background: subtle radial glow */}
        <div className="absolute inset-0 pointer-events-none select-none">
          {/* Deep maroon glow, top-left */}
          <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-[#5A1725]/20 blur-[120px]" />
          {/* Gold glow, bottom-right */}
          <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#C9A24D]/10 blur-[120px]" />
          {/* Decorative concentric rings */}
          <div className="deco-ring w-[400px] h-[400px] top-1/2 right-[5%] -translate-y-1/2 opacity-40" />
          <div className="deco-ring w-[600px] h-[600px] top-1/2 right-[5%] -translate-y-1/2 opacity-25" />
          <div className="deco-ring w-[800px] h-[800px] top-1/2 right-[5%] -translate-y-1/2 opacity-15" />
          {/* Om ornament */}
          <div className="absolute top-1/2 right-[6%] -translate-y-1/2 ornament hidden lg:block select-none">
            ॐ
          </div>
        </div>

        {/* Subtle star field — static positions (Next.js 16 disallows Math.random() at prerender) */}
        {[
          { top: "8%", left: "12%", opacity: 0.5 },
          { top: "15%", left: "78%", opacity: 0.3 },
          { top: "22%", left: "34%", opacity: 0.7 },
          { top: "31%", left: "55%", opacity: 0.4 },
          { top: "38%", left: "88%", opacity: 0.6 },
          { top: "45%", left: "7%", opacity: 0.35 },
          { top: "52%", left: "42%", opacity: 0.55 },
          { top: "59%", left: "68%", opacity: 0.45 },
          { top: "66%", left: "23%", opacity: 0.65 },
          { top: "73%", left: "91%", opacity: 0.3 },
          { top: "18%", left: "51%", opacity: 0.5 },
          { top: "82%", left: "38%", opacity: 0.4 },
          { top: "4%", left: "63%", opacity: 0.6 },
          { top: "91%", left: "74%", opacity: 0.35 },
          { top: "47%", left: "18%", opacity: 0.55 },
          { top: "28%", left: "82%", opacity: 0.42 },
          { top: "63%", left: "47%", opacity: 0.68 },
          { top: "76%", left: "11%", opacity: 0.3 },
          { top: "13%", left: "29%", opacity: 0.55 },
          { top: "88%", left: "58%", opacity: 0.45 },
          { top: "55%", left: "96%", opacity: 0.38 },
          { top: "3%", left: "41%", opacity: 0.6 },
          { top: "41%", left: "73%", opacity: 0.32 },
          { top: "95%", left: "28%", opacity: 0.5 },
          { top: "68%", left: "85%", opacity: 0.4 },
          { top: "24%", left: "9%", opacity: 0.65 },
          { top: "79%", left: "61%", opacity: 0.45 },
          { top: "36%", left: "31%", opacity: 0.55 },
          { top: "11%", left: "95%", opacity: 0.35 },
          { top: "85%", left: "45%", opacity: 0.5 },
        ].map((star, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 rounded-full bg-white/30"
            style={{ top: star.top, left: star.left, opacity: star.opacity }}
          />
        ))}

        {/* Hero Content */}
        <div className="section-container relative z-10 pt-32 pb-24 md:pt-40 md:pb-32">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <div className="animate-fade-up flex items-center gap-3 mb-7">
              <div className="h-px w-10 bg-[#C9A24D]" />
              <span className="text-[#C9A24D] text-xs font-semibold tracking-[0.22em] uppercase">
                Ancient Wisdom · Modern Guidance
              </span>
              <div className="h-px w-10 bg-[#C9A24D]" />
            </div>

            {/* Headline */}
            <h1 className="animate-fade-up-delay-1 font-serif text-white leading-[1.15] mb-6">
              <span className="block text-4xl sm:text-5xl lg:text-6xl font-bold">
                Illuminate Your
              </span>
              <span className="block text-4xl sm:text-5xl lg:text-6xl font-bold text-gold-gradient mt-1">
                Destiny&apos;s Path
              </span>
              <span className="block text-lg sm:text-xl text-white/55 font-normal mt-3 font-sans tracking-wide">
                Through the Sacred Science of Jyotish
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="animate-fade-up-delay-2 text-white/65 text-base sm:text-lg leading-relaxed mb-10 max-w-lg">
              With over 10+ years of Vedic scholarship, Guruji Balaji provides
              deeply personal, spiritually grounded consultations that bring
              clarity, peace, and purpose to your life journey.
            </p>

            {/* CTA Buttons */}
            <div className="animate-fade-up-delay-3 flex items-center gap-4">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold text-base px-8 py-4 inline-flex items-center gap-2"
              >
                Book Consultation
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Social proof */}
            <div className="animate-fade-up-delay-4 flex items-center gap-4 mt-10">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((n) => (
                  <div
                    key={n}
                    className="w-8 h-8 rounded-full border-2 border-[#0B1633] bg-gradient-to-br from-[#C9A24D]/30 to-[#5A1725]/30"
                  />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-[#C9A24D] fill-[#C9A24D]" />
                  ))}
                </div>
                <p className="text-white/50 text-xs mt-0.5">
                  Trusted by 1,000+ seekers worldwide
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom gradient transition */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F7F3E8] to-transparent pointer-events-none" />
      </section>

      {/* ════════════════════════════════════════════════════
          2. TRUST / CREDIBILITY STATS BANNER
          ════════════════════════════════════════════════════ */}
      <section
        id="credibility"
        className="bg-[#5A1725] py-12 lg:py-14"
        aria-label="Credibility statistics"
      >
        <div className="section-container">
          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6">
            {STATS.map((stat, i) => (
              <div
                key={i}
                className={`text-center px-4 ${i < 2
                    ? "border-b border-white/15 pb-6 sm:pb-0 sm:border-b-0 sm:border-r"
                    : ""
                  }`}
              >
                <p className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#E0C477] mb-1.5">
                  {stat.value}
                </p>
                <p className="text-white/70 text-sm sm:text-base tracking-wide font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          3. SERVICES GRID
          ════════════════════════════════════════════════════ */}
      <section
        id="services"
        className="py-20 lg:py-28 bg-[#F7F3E8]"
        aria-label="Our services"
      >
        <div className="section-container">
          {/* Section Header */}
          <div className="text-center mb-14 lg:mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#C9A24D]" />
              <span className="text-[#C9A24D] text-xs font-semibold tracking-[0.22em] uppercase">
                Problem-Solving Guidance
              </span>
              <div className="h-px w-8 bg-[#C9A24D]" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1633] mb-4">
              Consultations We Offer
            </h2>
            <div className="gold-divider my-4" />
            <p className="text-[#202020]/70 max-w-xl mx-auto text-base leading-relaxed mt-4">
              Clear, scripture-backed astrological solutions for everyday life challenges — from career transitions and family disputes to marital harmony and Vastu.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
            {SERVICES.map((service, i) => (
              <Link
                key={i}
                href={service.href}
                className="service-card group relative bg-white rounded-2xl overflow-hidden flex flex-col cursor-pointer shadow-[var(--shadow-card)] hover:shadow-xl transition-all duration-300 no-underline border border-[#d9cdb6]/60 hover:border-[#C9A24D]"
              >
                {/* Image Banner */}
                <div className="relative h-48 w-full overflow-hidden bg-[#0B1633]/5">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
                  {service.badge && (
                    <span className="absolute top-3.5 right-3.5 bg-[#C9A24D] text-[#0B1633] text-[0.65rem] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full shadow-sm">
                      {service.badge}
                    </span>
                  )}
                  <p className="absolute bottom-3 left-4 text-[#E0C477] text-[0.7rem] font-semibold tracking-[0.18em] uppercase">
                    {service.subtitle}
                  </p>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-serif text-xl font-bold text-[#0B1633] mb-2.5 group-hover:text-[#8C6D23] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-[#202020]/70 text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <div className="flex items-center gap-1.5 text-[#C9A24D] text-sm font-semibold mt-auto pt-2 group-hover:gap-3 transition-all duration-200">
                    Learn More <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* All Services CTA */}
          <div className="text-center mt-12">
            <Link href="/services" className="btn-outline-gold">
              View All Services
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          4. ABOUT THE ASTROLOGER
          ════════════════════════════════════════════════════ */}
      <section
        id="about"
        className="py-20 lg:py-28 bg-[#EDE8D6]"
        aria-label="About the astrologer"
      >
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image Column */}
            <div className="relative order-2 lg:order-1">
              {/* Decorative gold frame offset */}
              <div className="absolute -top-4 -left-4 w-full h-full rounded-2xl border border-[#C9A24D]/40 pointer-events-none" />
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-[#c8bea8] flex flex-col items-center justify-center gap-3">
                {/* Replace this div with Next.js <Image> once /assets/astrologer-photo.jpg is in place */}
                <div className="w-20 h-20 rounded-full bg-[#C9A24D]/20 flex items-center justify-center">
                  <Star className="w-8 h-8 text-[#C9A24D]" />
                </div>
                <p className="text-[#0B1633]/50 text-sm">Guruji&apos;s Portrait</p>
                <p className="text-[#0B1633]/35 text-xs">/assets/astrologer-photo.jpg</p>
              </div>

              {/* Floating experience badge */}
              <div className="absolute -bottom-5 -right-5 bg-[#0B1633] rounded-xl px-5 py-4 shadow-xl flex items-center gap-3">
                <div className="text-center">
                  <p className="font-serif text-3xl font-bold text-[#C9A24D] leading-none">25</p>
                  <p className="text-white/60 text-[0.65rem] tracking-wide uppercase mt-1">Years</p>
                </div>
                <div className="h-10 w-px bg-white/15" />
                <p className="text-white/80 text-xs leading-snug max-w-[100px]">
                  of Vedic<br />Scholarship
                </p>
              </div>
            </div>

            {/* Content Column */}
            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-8 bg-[#C9A24D]" />
                <span className="text-[#C9A24D] text-xs font-semibold tracking-[0.22em] uppercase">
                  The Astrologer
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1633] mb-2 leading-tight">
                Guruji Balaji
              </h2>
              <p className="text-[#5A1725] font-serif text-lg italic mb-6">
                Jyotish Acharya & Vastu Visheshajna
              </p>

              <div className="gold-divider mb-6" style={{ marginLeft: 0 }} />

              <p className="text-[#202020]/70 text-base leading-relaxed mb-5">
                Born in Tirupati, the sacred city of Lord Venkateswara, Guruji Balaji
                was initiated into the ancient science of Jyotish at the age of twelve
                under the lineage of revered scholars from Andhra Pradesh.
              </p>
              <p className="text-[#202020]/70 text-base leading-relaxed mb-8">
                With over 10+ years of dedicated practice and more than 1,000
                consultations across India, the United States, UK, and Southeast Asia,
                he has earned a reputation for penetrating insight, compassionate
                guidance, and uncanny accuracy.
              </p>

              {/* Credentials */}
              <ul className="space-y-3 mb-10">
                {[
                  "M.A. Jyotish Shastra, Rashtriya Sanskrit Vidyapeeth",
                  "Certified Vastu Visheshajna (Expert Practitioner)",
                  "Author of 'Nakshatra Rahasya' — Secrets of the Stars",
                  "Featured in Times of India, Deccan Chronicle & Zee TV",
                ].map((c, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#202020]/70">
                    <CheckCircle2 className="w-4 h-4 text-[#C9A24D] flex-shrink-0 mt-0.5" />
                    {c}
                  </li>
                ))}
              </ul>

              <Link href="/about" className="btn-gold">
                Read Full Story
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          4B. YOUTUBE VIDEO DISCOURSES
          ════════════════════════════════════════════════════ */}
      <YouTubeVideosSection />

      {/* ════════════════════════════════════════════════════
          5. TESTIMONIALS
          ════════════════════════════════════════════════════ */}
      <section
        id="testimonials"
        className="py-20 lg:py-28 bg-[#0B1633] relative overflow-hidden"
        aria-label="Client testimonials"
      >
        {/* Decorative glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-[#C9A24D]/40 to-transparent" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/3 w-96 h-96 rounded-full bg-[#5A1725]/15 blur-[100px]" />
        </div>

        <div className="section-container relative z-10">
          {/* Header */}
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#C9A24D]" />
              <span className="text-[#C9A24D] text-xs font-semibold tracking-[0.22em] uppercase">
                Seeker Stories
              </span>
              <div className="h-px w-8 bg-[#C9A24D]" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Words from Our Clients
            </h2>
            <div className="gold-divider my-4" />
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="bg-white/5 backdrop-blur-sm border border-white/8 rounded-xl p-7 flex flex-col gap-5 hover:border-[#C9A24D]/30 transition-colors duration-300"
              >
                {/* Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <Star key={s} className="w-3.5 h-3.5 text-[#C9A24D] fill-[#C9A24D]" />
                  ))}
                </div>

                {/* Quote */}
                <div className="relative">
                  <Quote className="absolute -top-2 -left-1 w-7 h-7 text-[#C9A24D]/20 fill-[#C9A24D]/20" />
                  <p className="text-white/65 text-sm leading-relaxed pl-5">
                    {t.text}
                  </p>
                </div>

                {/* Author */}
                <div className="flex items-center gap-3 mt-auto pt-3 border-t border-white/8">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C9A24D]/30 to-[#5A1725]/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-[#C9A24D] font-serif font-bold text-sm">
                      {t.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">{t.name}</p>
                    <p className="text-white/40 text-xs">{t.location}</p>
                  </div>
                  <span className="ml-auto text-[#C9A24D] text-[0.65rem] font-medium tracking-wide bg-[#C9A24D]/10 px-2.5 py-1 rounded-full whitespace-nowrap">
                    {t.consultation}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          6. FINAL CTA SECTION
          ════════════════════════════════════════════════════ */}
      <section
        id="cta"
        className="relative py-20 lg:py-28 overflow-hidden bg-[#F7F3E8]"
        aria-label="Book a consultation"
      >
        {/* Top decorative line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A24D]/50 to-transparent" />

        {/* Background ornament */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ornament text-[12rem] opacity-[0.04]">
            ॐ
          </div>
        </div>

        <div className="section-container relative z-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-8 bg-[#C9A24D]" />
            <span className="text-[#C9A24D] text-xs font-semibold tracking-[0.22em] uppercase">
              Begin Your Journey
            </span>
            <div className="h-px w-8 bg-[#C9A24D]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1633] mb-5 max-w-2xl mx-auto leading-snug">
            Your Stars Are Waiting to Be Read
          </h2>

          <div className="gold-divider my-5" />

          <p className="text-[#202020]/60 text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-10">
            Take the first step toward clarity, purpose, and spiritual harmony.
            Book a private consultation with Guruji Balaji — online or in person.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {[
              "✦ Strictly Confidential",
              "✦ Available Online & In-Person",
              "✦ English, Hindi & Telugu",
              "✦ Direct Consultation via WhatsApp",
            ].map((pill) => (
              <span
                key={pill}
                className="text-xs font-medium text-[#5A1725] bg-[#5A1725]/8 border border-[#5A1725]/15 px-4 py-2 rounded-full"
              >
                {pill}
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold text-base px-10 py-4 inline-flex items-center gap-2"
            >
              Book Consultation
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-gold text-base px-10 py-4"
            >
              {/* WhatsApp icon inline svg */}
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp Guruji
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
