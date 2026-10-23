"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { getWhatsAppUrl } from "@/lib/whatsapp";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const whatsappUrl = getWhatsAppUrl();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-[#F7F3E8]/95 backdrop-blur-md shadow-[0_2px_20px_rgba(11,22,51,0.10)] border-b border-[#d9cdb6]"
            : "bg-transparent"
        )}
      >
        <div className="section-container">
          <nav className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2.5 group"
              aria-label="Balaji Jyotish Home"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C9A24D] to-[#E0C477] flex items-center justify-center shadow-[0_0_12px_rgba(201,162,77,0.5)]">
                <Star className="w-5 h-5 text-[#0B1633] fill-[#0B1633]" />
              </div>
              <div className="flex flex-col leading-none">
                <span
                  className={cn(
                    "font-serif text-xl font-bold tracking-wide transition-colors duration-300",
                    scrolled ? "text-[#0B1633]" : "text-white"
                  )}
                >
                  Balaji Jyotish
                </span>
                <span
                  className={cn(
                    "text-[0.65rem] tracking-[0.18em] uppercase transition-colors duration-300",
                    scrolled ? "text-[#C9A24D]" : "text-[#E0C477]"
                  )}
                >
                  Vedic Astrology
                </span>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <ul className="hidden md:flex items-center gap-8" role="list">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "nav-link text-sm font-medium tracking-wide transition-colors duration-300",
                      scrolled ? "scrolled" : ""
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <div className="hidden md:block">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold text-sm px-6 py-3 inline-flex items-center gap-2"
              >
                Book Consultation
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className={cn(
                "md:hidden p-2 rounded-lg transition-colors duration-200",
                scrolled
                  ? "text-[#0B1633] hover:bg-[#C9A24D]/10"
                  : "text-white hover:bg-white/10"
              )}
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={cn(
          "fixed inset-0 z-40 md:hidden transition-all duration-300",
          mobileOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div
          className={cn(
            "absolute inset-0 bg-[#0B1633]/70 backdrop-blur-sm transition-opacity duration-300",
            mobileOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setMobileOpen(false)}
        />

        {/* Drawer Panel */}
        <aside
          className={cn(
            "absolute top-0 right-0 h-full w-[280px] bg-[#0B1633] shadow-2xl flex flex-col transition-transform duration-300 ease-out",
            mobileOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex items-center justify-between p-5 border-b border-white/10">
            <span className="font-serif text-lg text-white tracking-wide">Menu</span>
            <button
              className="text-white/70 hover:text-white p-1 rounded transition-colors"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex flex-col gap-1 p-5 flex-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/80 hover:text-[#C9A24D] font-medium text-base py-3 px-3 rounded-lg hover:bg-white/5 transition-all duration-200 border-b border-white/5"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="p-5 border-t border-white/10">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold w-full justify-center text-center"
              onClick={() => setMobileOpen(false)}
            >
              Book Consultation
            </a>
          </div>
        </aside>
      </div>
    </>
  );
}
