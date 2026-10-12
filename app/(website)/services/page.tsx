import type { Metadata } from "next";
import Link from "next/link";
import {
  Sun,
  BookOpen,
  Compass,
  Heart,
  Moon,
  Hash,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Clock,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Astrology Services",
  description:
    "Explore authentic Vedic Astrology consultations including Kundali Milan, Nadi Shastra, Vastu Shastra, and Auspicious Muhurta selection.",
};

const SERVICES_DATA = [
  {
    id: "vedic",
    icon: Sun,
    title: "Comprehensive Vedic Astrology",
    subtitle: "Complete Birth Chart & Kundali Analysis",
    description:
      "A deep, comprehensive analysis of your Janam Kundali (birth chart). Understand planetary periods (Dasha & Antardasha), planetary strengths, life challenges, and timely remedial measures (Upayas) rooted in Parashari Jyotish.",
    duration: "45–60 mins",
    popular: true,
  },
  {
    id: "kundali",
    icon: Heart,
    title: "Kundali Milan & Compatibility",
    subtitle: "Marriage & Relationship Horoscope Matching",
    description:
      "In-depth 36-Guna Ashtakoot matching, detailed assessment of Mangal Dosha, Nadi Dosha, mental temperaments, and long-term marital prosperity for prospective couples.",
    duration: "45 mins",
    popular: true,
  },
  {
    id: "nadi",
    icon: BookOpen,
    title: "Nadi Astrology Consultation",
    subtitle: "Ancient Palm Leaf Wisdom",
    description:
      "Unlock past karmic patterns and precise life trajectory predictions through ancient South Indian Nadi astrological principles. Understand major turning points with uncanny accuracy.",
    duration: "60 mins",
    popular: false,
  },
  {
    id: "vastu",
    icon: Compass,
    title: "Vastu Shastra Consultation",
    subtitle: "Harmonising Energy for Home & Workplace",
    description:
      "Evaluation of your residential or commercial space according to Vedic Vastu principles. Identify energy blockages and receive practical, non-destructive remedial remedies.",
    duration: "60 mins",
    popular: false,
  },
  {
    id: "muhurta",
    icon: Moon,
    title: "Auspicious Muhurta Selection",
    subtitle: "Divine Timing for Sacred Milestones",
    description:
      "Scientific selection of the most propitious planetary alignment for weddings, Griha Pravesh (housewarming), business inaugurations, and crucial ventures.",
    duration: "30 mins",
    popular: false,
  },
  {
    id: "numerology",
    icon: Hash,
    title: "Vedic Numerology & Name Correction",
    subtitle: "Harnessing the Vibrations of Numbers",
    description:
      "Analysis of your Life Path, Destiny, and Soul numbers. Get personalized suggestions for business naming, personal name spelling adjustments, and lucky numbers.",
    duration: "30 mins",
    popular: false,
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-[#F7F3E8] min-h-screen pt-28 pb-20">
      <div className="section-container">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9A24D]/15 border border-[#C9A24D]/30 text-[#0B1633] text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#8C6D23]" />
            Sacred Consultations
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#0B1633] mb-4">
            Astrology Consultation Services
          </h1>
          <p className="text-[#202020]/70 text-base leading-relaxed">
            Every session is personalized, strictly confidential, and grounded in authentic ancient
            Vedic scriptures. Choose a service to discover divine guidance for your life path.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_DATA.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.id}
                id={s.id}
                className="bg-white rounded-2xl p-7 border border-[#d9cdb6] shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#0B1633] flex items-center justify-center text-[#C9A24D]">
                      <Icon className="w-6 h-6" />
                    </div>
                    {s.popular && (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#C9A24D]/20 text-[#8C6D23] border border-[#C9A24D]/40">
                        Popular
                      </span>
                    )}
                  </div>
                  <h2 className="font-serif text-xl font-bold text-[#0B1633] mb-1">
                    {s.title}
                  </h2>
                  <p className="text-xs text-[#8C6D23] font-semibold mb-3">
                    {s.subtitle}
                  </p>
                  <p className="text-sm text-[#202020]/70 leading-relaxed mb-6">
                    {s.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#d9cdb6]/60 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-[#202020]/60">
                    <Clock className="w-3.5 h-3.5 text-[#C9A24D]" />
                    <span>{s.duration}</span>
                  </div>
                  <Link
                    href="/book"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0B1633] hover:text-[#8C6D23] transition-colors"
                  >
                    Book Now
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 bg-[#0B1633] rounded-2xl p-8 sm:p-12 text-center text-white relative overflow-hidden">
          <div className="relative z-10 max-w-xl mx-auto">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-3 text-white">
              Not sure which consultation is right for you?
            </h3>
            <p className="text-white/70 text-sm mb-6">
              Book a Comprehensive Kundali session. Guruji will evaluate your birth chart and address all your specific questions across career, health, family, and marriage.
            </p>
            <Link href="/book" className="btn-gold inline-flex items-center gap-2">
              Book Consultation Now
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
