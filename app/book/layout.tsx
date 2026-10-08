// app/book/layout.tsx
// Layout for the multi-step booking flow.
// Intentionally has NO navbar/footer from root — booking gets its own minimal chrome.

import type { Metadata } from "next";
import Link from "next/link";
import { Star, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Book a Consultation | Balaji Jyotish",
  description: "Book your personal Vedic astrology consultation with Guruji Balaji.",
};

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F7F3E8] flex flex-col">
      {/* Minimal Book Header */}
      <header className="bg-[#0B1633] border-b border-white/10">
        <div className="section-container h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group" aria-label="Back to Balaji Jyotish">
            <ArrowLeft className="w-4 h-4 text-white/50 group-hover:text-[#C9A24D] transition-colors" />
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#C9A24D] to-[#E0C477] flex items-center justify-center">
                <Star className="w-3.5 h-3.5 text-[#0B1633] fill-[#0B1633]" />
              </div>
              <span className="font-serif text-white text-base font-semibold tracking-wide">
                Balaji Jyotish
              </span>
            </div>
          </Link>
          <span className="text-white/40 text-sm hidden sm:block">Secure Booking</span>
        </div>
      </header>

      {/* Booking Content */}
      <main className="flex-1 flex flex-col">{children}</main>

      {/* Minimal Footer */}
      <footer className="border-t border-[#d9cdb6] bg-[#F7F3E8]">
        <div className="section-container py-4 flex items-center justify-center gap-4 text-xs text-[#202020]/40">
          <span>© 2026 Balaji Jyotish</span>
          <span>·</span>
          <Link href="/privacy-policy" className="hover:text-[#C9A24D] transition-colors">Privacy Policy</Link>
          <span>·</span>
          <Link href="/terms" className="hover:text-[#C9A24D] transition-colors">Terms</Link>
        </div>
      </footer>
    </div>
  );
}
