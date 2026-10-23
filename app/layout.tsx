import type { Metadata } from "next";
import "./globals.css";

/* ── Metadata ─────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: {
    default: "Balaji Jyotish | Vedic Astrology Consultation",
    template: "%s | Balaji Jyotish",
  },
  description:
    "Experience the ancient wisdom of Vedic Astrology with Balaji Jyotish. Consultations for Kundali, Vastu, Nadi Shastra, and more directly on WhatsApp.",
  keywords: [
    "Vedic Astrology",
    "Jyotish",
    "Kundali",
    "Astrology Consultation",
    "Vastu Shastra",
    "Nadi Astrology",
    "Indian Astrology",
    "Horoscope",
  ],
  authors: [{ name: "Balaji Jyotish" }],
  metadataBase: new URL("https://balajijyotish.com"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Balaji Jyotish",
    title: "Balaji Jyotish | Vedic Astrology Consultation",
    description:
      "Experience the ancient wisdom of Vedic Astrology. Consultations for Kundali, Vastu, Nadi Shastra, and more.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Balaji Jyotish | Vedic Astrology Consultation",
    description:
      "Experience the ancient wisdom of Vedic Astrology. Consultations for Kundali, Vastu, Nadi Shastra, and more.",
  },
};

/* ── Root Layout ─────────────────────────────────────────── */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="h-full antialiased scroll-smooth"
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col bg-[#F7F3E8] text-[#202020] font-sans"
        suppressHydrationWarning
      >
        <main className="flex-1 flex flex-col">{children}</main>
      </body>
    </html>
  );
}
