import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

/* ── Google Fonts ─────────────────────────────────────────── */
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

/* ── Metadata ─────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: {
    default: "Balaji Jyotish | Vedic Astrology Consultation",
    template: "%s | Balaji Jyotish",
  },
  description:
    "Experience the ancient wisdom of Vedic Astrology with Balaji Jyotish. Book personalized consultations for Kundali, Vastu, Nadi Shastra, and more.",
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
      "Experience the ancient wisdom of Vedic Astrology. Book personalized consultations.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Balaji Jyotish | Vedic Astrology Consultation",
    description:
      "Experience the ancient wisdom of Vedic Astrology. Book personalized consultations.",
  },
};

/* ── Root Layout ─────────────────────────────────────────── */
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#F7F3E8] text-[#202020] font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
