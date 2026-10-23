import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { getWhatsAppUrl, getServiceWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Consultations We Offer | Balaji Jyotish",
  description:
    "Explore problem-solving Vedic astrology consultations including Kundali Analysis, Career & Business Guidance, Marriage Harmony, Family Dispute Resolution, and Vastu Shastra.",
};

const SERVICES_DATA = [
  {
    id: "kundali",
    image: "/assets/services/kundali.jpg",
    title: "Kundali Analysis & Predictions",
    subtitle: "Complete Birth Chart & Life Roadmap",
    description:
      "A deep, comprehensive analysis of your Janam Kundali (birth chart). Understand your planetary periods (Dasha & Antardasha), planetary strengths, life challenges, and timely remedial measures (Upayas) rooted in authentic Parashari Jyotish.",
    popular: true,
  },
  {
    id: "career",
    image: "/assets/services/career.jpg",
    title: "Career & Business Guidance",
    subtitle: "Job Growth, Business Success & Financial Stability",
    description:
      "Overcome career stagnation, job change dilemmas, promotion delays, and financial stress. Guruji evaluates your 10th and 11th houses to guide business investments, partnerships, and auspicious timing for career moves.",
    popular: false,
  },
  {
    id: "marriage",
    image: "/assets/services/marriage.jpg",
    title: "Marriage & Relationship Harmony",
    subtitle: "Kundali Milan, Compatibility & Delay in Marriage",
    description:
      "In-depth 36-Guna Ashtakoot matching, thorough assessment of Manglik Dosha, Nadi Dosha, and emotional compatibility. Receive remedies for delayed marriage, misunderstandings, and long-term marital bliss.",
    popular: true,
  },
  {
    id: "family",
    image: "/assets/services/family.jpg",
    title: "Family & Dispute Resolution",
    subtitle: "Domestic Peace, Property & Generational Harmony",
    description:
      "Astrological mediation and spiritual remedies for ongoing family conflicts, property disputes, parent-child disagreements, and domestic tension, restoring peace and mutual respect to your household.",
    popular: false,
  },
  {
    id: "vastu",
    image: "/assets/services/vastu.jpg",
    title: "Vastu Shastra Consultation",
    subtitle: "Harmonising Energy for Home & Workplace",
    description:
      "Evaluation of your residential or commercial space according to Vedic Vastu principles. Identify energy blockages and receive practical, non-destructive remedial recommendations for health and prosperity.",
    popular: false,
  },
  {
    id: "remedies",
    image: "/assets/services/remedies.jpg",
    title: "Health & Vedic Remedies",
    subtitle: "Planetary Healing, Gemstones & Spiritual Upayas",
    description:
      "Holistic guidance on persistent stress, chronic vitality issues, and planetary doshas. Guruji prescribes personalized certified gemstone recommendations, sacred Vedic mantras, and charity remedies.",
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
            Personalized Guidance
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#0B1633] mb-4">
            Consultations We Offer
          </h1>
          <p className="text-[#202020]/70 text-base leading-relaxed">
            Every session is personalized, strictly confidential, and tailored to the exact challenges you face. Choose an area below to receive divine guidance and practical remedies directly via WhatsApp.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {SERVICES_DATA.map((s) => (
            <div
              key={s.id}
              id={s.id}
              className="bg-white rounded-2xl overflow-hidden border border-[#d9cdb6] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Image Banner */}
              <div className="relative h-52 w-full overflow-hidden bg-[#0B1633]/5">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
                {s.popular && (
                  <span className="absolute top-3.5 right-3.5 bg-[#C9A24D] text-[#0B1633] text-xs font-bold tracking-wider uppercase px-2.5 py-1 rounded-full shadow-sm">
                    Popular
                  </span>
                )}
                <p className="absolute bottom-3 left-4 text-[#E0C477] text-xs font-semibold tracking-wider uppercase">
                  {s.subtitle}
                </p>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#0B1633] mb-3 group-hover:text-[#8C6D23] transition-colors">
                    {s.title}
                  </h2>
                  <p className="text-sm text-[#202020]/75 leading-relaxed mb-6">
                    {s.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#d9cdb6]/60">
                  <a
                    href={getServiceWhatsAppUrl(s.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold w-full text-center py-3 px-4 text-sm font-semibold justify-center inline-flex items-center gap-2 rounded-xl"
                  >
                    Book via WhatsApp
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
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
            <a
              href={getWhatsAppUrl("Namaste Guruji, I would like to book a Comprehensive Kundali session. Please guide me on available timings.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold inline-flex items-center gap-2"
            >
              Book Consultation Now
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
