"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  }

  if (submitted) {
    return (
      <div className="bg-[#C9A24D]/10 border border-[#C9A24D]/30 rounded-2xl p-8 text-center flex flex-col items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-[#C9A24D]/20 text-[#8C6D23] flex items-center justify-center">
          <CheckCircle2 className="w-6 h-6 text-[#8C6D23]" />
        </div>
        <h3 className="font-serif font-bold text-xl text-[#0B1633]">Message Received</h3>
        <p className="text-sm text-[#202020]/75 max-w-md">
          Thank you for reaching out. Guruji Balaji&apos;s team will get back to your inquiry
          via WhatsApp or call within 24 hours.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-xs font-semibold text-[#8C6D23] underline mt-2"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-[#0B1633] uppercase tracking-wider">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="Srikanth Sharma"
            className="w-full px-4 py-2.5 rounded-xl border border-[#d9cdb6] text-sm bg-[#F7F3E8]/40 text-[#202020] outline-none focus:border-[#C9A24D] focus:ring-2 focus:ring-[#C9A24D]/20 transition-all"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-[#0B1633] uppercase tracking-wider">
            Mobile Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            required
            placeholder="+91 98765 43210"
            className="w-full px-4 py-2.5 rounded-xl border border-[#d9cdb6] text-sm bg-[#F7F3E8]/40 text-[#202020] outline-none focus:border-[#C9A24D] focus:ring-2 focus:ring-[#C9A24D]/20 transition-all"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-[#0B1633] uppercase tracking-wider">
          Email Address
        </label>
        <input
          type="email"
          placeholder="srikanth@example.com"
          className="w-full px-4 py-2.5 rounded-xl border border-[#d9cdb6] text-sm bg-[#F7F3E8]/40 text-[#202020] outline-none focus:border-[#C9A24D] focus:ring-2 focus:ring-[#C9A24D]/20 transition-all"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-[#0B1633] uppercase tracking-wider">
          Service of Interest
        </label>
        <select className="w-full px-4 py-2.5 rounded-xl border border-[#d9cdb6] text-sm bg-[#F7F3E8]/40 text-[#202020] outline-none focus:border-[#C9A24D] focus:ring-2 focus:ring-[#C9A24D]/20 transition-all cursor-pointer">
          <option value="kundali">Comprehensive Kundali Consultation</option>
          <option value="matching">Kundali Milan & Marriage Compatibility</option>
          <option value="nadi">Nadi Palm Leaf Reading</option>
          <option value="vastu">Vastu Shastra Site Assessment</option>
          <option value="muhurta">Auspicious Muhurta Selection</option>
          <option value="other">General Astrological Inquiry</option>
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-[#0B1633] uppercase tracking-wider">
          Your Message or Question
        </label>
        <textarea
          rows={4}
          required
          placeholder="Briefly describe your question, concern, or preferred appointment dates..."
          className="w-full px-4 py-2.5 rounded-xl border border-[#d9cdb6] text-sm bg-[#F7F3E8]/40 text-[#202020] outline-none focus:border-[#C9A24D] focus:ring-2 focus:ring-[#C9A24D]/20 transition-all"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-gold mt-2 flex items-center justify-center gap-2 py-3"
      >
        <Send className="w-4 h-4" />
        {loading ? "Sending Message..." : "Submit Message"}
      </button>
    </form>
  );
}
