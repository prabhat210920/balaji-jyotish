import type { Metadata } from "next";
import Link from "next/link";
import {
  Star,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Award,
  BookOpen,
  HeartHandshake,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Guruji Balaji | Vedic Astrologer & Vastu Expert",
  description:
    "Learn about Guruji Balaji, his 25+ years of Vedic astrology scholarship, Tirupati heritage, philosophy, and authentic approach to Janam Kundali and Vastu Shastra.",
};

const ACHIEVEMENTS = [
  { value: "25+", label: "Years of Practice", sub: "Since 1999" },
  { value: "15,000+", label: "Consultations", sub: "Worldwide" },
  { value: "40+", label: "Countries Served", sub: "Global Seekers" },
  { value: "100%", label: "Confidentiality", sub: "Strict Ethics" },
];

const PRINCIPLES = [
  {
    icon: ShieldCheck,
    title: "Compassionate, Non-Fear-Based Guidance",
    description:
      "Astrology in sacred scriptures is 'Jyotish' — the light of divine truth. We never induce fear or prescribe expensive ritual superstitions. Guidance is always empowering, ethical, and rooted in clear remedies.",
  },
  {
    icon: BookOpen,
    title: "Authentic Parashari & Nadi Traditions",
    description:
      "Trained in classical Sanskrit texts including Brihat Parashara Hora Shastra, Jaimini Sutras, and classical Nadi Palm Leaf canons, combining depth of tradition with contemporary clarity.",
  },
  {
    icon: HeartHandshake,
    title: "Actionable & Practical Upayas (Remedies)",
    description:
      "Planetary afflictions are balanced with practical remedial measures — specific Vedic mantras, charitable deeds (Daan), lifestyle modifications, and gemstone recommendations where truly indicated.",
  },
  {
    icon: Award,
    title: "Academic & Traditional Lineage",
    description:
      "Formal scholarship from Rashtriya Sanskrit Vidyapeeth, Tirupati, combined with over two decades of direct mentorship under revered traditional gurus from Andhra Pradesh and South India.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-[#F7F3E8] min-h-screen pt-28 pb-20">
      {/* ── 1. Hero / Header ───────────────────────────────────── */}
      <section className="section-container mb-20 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9A24D]/15 border border-[#C9A24D]/30 text-[#0B1633] text-xs font-semibold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#8C6D23]" />
          About The Astrologer
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#0B1633] mb-6 leading-tight">
          A Quarter Century of Dedicated Vedic Scholarship
        </h1>
        <p className="text-[#202020]/75 text-base sm:text-lg leading-relaxed">
          Guruji Balaji has guided thousands of individuals, families, and entrepreneurs across
          the world toward inner peace, prosperity, and clarity through authentic Vedic Jyotish.
        </p>
      </section>

      {/* ── 2. Bio & Origin Story ──────────────────────────────── */}
      <section className="section-container mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Portrait container */}
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-full h-full rounded-2xl border border-[#C9A24D]/40 pointer-events-none" />
            <div className="relative rounded-2xl aspect-[4/5] bg-[#0B1633] p-8 flex flex-col justify-end text-white overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1633] via-[#0B1633]/60 to-transparent" />
              <div className="absolute top-8 left-8 w-16 h-16 rounded-full bg-gradient-to-br from-[#C9A24D] to-[#E0C477] flex items-center justify-center shadow-lg">
                <Star className="w-8 h-8 text-[#0B1633] fill-[#0B1633]" />
              </div>
              <div className="relative z-10">
                <p className="text-[#C9A24D] text-xs font-semibold uppercase tracking-widest mb-1">
                  Jyotish Acharya
                </p>
                <h2 className="font-serif text-3xl font-bold text-white mb-2">Guruji Balaji</h2>
                <p className="text-white/70 text-sm leading-relaxed">
                  Tirupati Lineage · Sanskrit Scholar · 25+ Years Guiding Seekers Worldwide
                </p>
              </div>
            </div>
          </div>

          {/* Biography Text */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2 text-[#8C6D23] text-xs font-bold uppercase tracking-widest">
              <span>Sacred Lineage</span>
              <span className="w-8 h-px bg-[#8C6D23]" />
            </div>
            <h3 className="font-serif text-2xl sm:text-4xl font-bold text-[#0B1633] leading-snug">
              Rooted in the Sacred Traditions of Tirupati
            </h3>
            <p className="text-[#202020]/75 text-sm sm:text-base leading-relaxed">
              Born in Tirupati, nestled beneath the sacred Seshachalam hills of Lord Venkateswara,
              Guruji was introduced to Vedic recitations and mathematical astrology (Siddhanta)
              at a young age under his paternal grandfather.
            </p>
            <p className="text-[#202020]/75 text-sm sm:text-base leading-relaxed">
              He completed formal studies in Jyotish Shastra and Sanskrit grammar from the revered
              Rashtriya Sanskrit Vidyapeeth, mastering planetary calculations, Nakshatra analysis,
              Muhurta selection, and traditional Vastu Shastra.
            </p>
            <p className="text-[#202020]/75 text-sm sm:text-base leading-relaxed">
              Throughout his 25 years of practice, Guruji has maintained one core conviction:
              Astrology is not a system of deterministic doom, but a cosmic compass designed to
              illuminate your free will and align your actions with universal grace.
            </p>
          </div>
        </div>
      </section>

      {/* ── 3. Achievements Stats ──────────────────────────────── */}
      <section className="bg-[#0B1633] py-16 text-white mb-24">
        <div className="section-container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {ACHIEVEMENTS.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <span className="font-serif text-3xl sm:text-5xl font-bold text-[#C9A24D] mb-1">
                  {item.value}
                </span>
                <span className="text-white font-medium text-sm sm:text-base">{item.label}</span>
                <span className="text-white/40 text-xs mt-0.5">{item.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Core Philosophy / Principles ────────────────────── */}
      <section className="section-container mb-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9A24D]/15 border border-[#C9A24D]/30 text-[#0B1633] text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#8C6D23]" />
            Guiding Ethos
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1633] mb-4">
            Our Consultation Principles
          </h2>
          <p className="text-[#202020]/70 text-sm sm:text-base">
            What makes a consultation with Balaji Jyotish genuinely different and trustworthy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PRINCIPLES.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-8 border border-[#d9cdb6] shadow-sm flex flex-col gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0B1633] flex items-center justify-center text-[#C9A24D] flex-shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#0B1633]">{p.title}</h3>
                <p className="text-[#202020]/70 text-sm leading-relaxed">{p.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 5. Final CTA ───────────────────────────────────────── */}
      <section className="section-container">
        <div className="bg-gradient-to-br from-[#0B1633] to-[#162752] rounded-3xl p-8 sm:p-14 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center">
            <h3 className="font-serif text-2xl sm:text-4xl font-bold mb-4 text-white">
              Ready to Discover Your Astrological Blueprint?
            </h3>
            <p className="text-white/70 text-sm sm:text-base mb-8 leading-relaxed">
              Book a personalized consultation session. Available via Google Meet or in-person.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <Link href="/book" className="btn-gold inline-flex items-center gap-2 px-8 py-3.5">
                Book Consultation
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="btn-outline-gold inline-flex items-center gap-2 px-8 py-3.5 text-white"
              >
                Contact Our Office
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
