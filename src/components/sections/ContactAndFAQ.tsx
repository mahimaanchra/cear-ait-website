"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  MapPin,
  Mail,
  ChevronDown,
  CheckCircle2,
  Loader2,
  AlertCircle,
  Search,
  X,
  Compass,
  Copy,
  Check,
  Clock,
  Sparkles,
  Radio,
} from "lucide-react";
import { siteConfig, faqs, FAQItem } from "@/data/siteData";
import { GlassCard } from "@/components/ui/GlassCard";

export function ContactAndFAQ() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [faqCategory, setFaqCategory] = useState<string>("All");
  const [faqSearch, setFaqSearch] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedCoords, setCopiedCoords] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    subject: "Induction Selection & Recruitment",
    message: "",
  });

  const categories = ["All", "Inductions", "Wartech", "Lab Facilities", "General"];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCat = faqCategory === "All" || faq.category === faqCategory;
    const q = faqSearch.toLowerCase().trim();
    if (!q) return matchesCat;
    const matchesQuery =
      faq.question.toLowerCase().includes(q) || faq.answer.toLowerCase().includes(q);
    return matchesCat && matchesQuery;
  });

  const handleCopyCoords = () => {
    navigator.clipboard?.writeText("18.6068° N, 73.8753° E");
    setCopiedCoords(true);
    setTimeout(() => setCopiedCoords(false), 2400);
  };

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(siteConfig.contactEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2400);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactData),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to send message");
      }

      setSubmitted(true);
      setContactData({
        name: "",
        email: "",
        subject: "Induction Selection & Recruitment",
        message: "",
      });
    } catch (err: any) {
      setErrorMessage(
        err?.message || "Failed to send message. Please try again or email cear@aitpune.edu.in"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Heading */}
        <div className="space-y-2 max-w-xl border-b border-[#240d2b]/[0.08] pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff6b35]/10 border border-[#ff6b35]/20 text-[#ff6b35] text-[11px] font-mono uppercase tracking-wider font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>06 // Communications &amp; Directives</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-[#240d2b]">
            Contact &amp; Frequently Asked
          </h2>
          <p className="text-sm sm:text-base text-[#240d2b]/70 font-body">
            Connect with the CEAR robotics cadre, dispatch technical inquiries, or review answers to cadet inductions and tournament guidelines.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Glass Contact Form & Transit Coordinates */}
          <div className="lg:col-span-6 space-y-6">
            <GlassCard
              className="p-8 sm:p-10"
              spotlightColor="rgba(255, 107, 53, 0.14)"
            >
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-white text-[#ff6b35] border border-[#ff6b35]/25 mx-auto flex items-center justify-center font-bold shadow-xs">
                    <CheckCircle2 className="w-6 h-6 text-[#ff6b35]" />
                  </div>
                  <h4 className="font-display text-2xl text-[#240d2b] font-bold">
                    Message Dispatched
                  </h4>
                  <p className="text-sm text-[#240d2b]/70 font-body max-w-sm mx-auto">
                    Thank you for reaching out. The CEAR communications cadre has received your transmission and will respond shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-5 py-2 rounded-full bg-[#240d2b] text-white text-xs font-mono hover:bg-[#3b1646] transition-colors cursor-pointer"
                  >
                    Send Another Transmission
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 font-body text-xs">
                  <div>
                    <label className="font-mono text-xs text-[#240d2b] font-bold block mb-1.5 uppercase">
                      Cadet / Contact Name
                    </label>
                    <input
                      type="text"
                      required
                      value={contactData.name}
                      onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                      placeholder="e.g. Cadet Aryan Varma"
                      className="w-full px-4 py-3 rounded-xl bg-white/80 border border-white/80 text-[#240d2b] font-body text-sm focus:border-[#ff6b35] focus:bg-white focus:outline-hidden transition-all placeholder:text-[#240d2b]/30 shadow-xs"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-xs text-[#240d2b] font-bold block mb-1.5 uppercase">
                      Official Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={contactData.email}
                      onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                      placeholder="name@aitpune.edu.in"
                      className="w-full px-4 py-3 rounded-xl bg-white/80 border border-white/80 text-[#240d2b] font-body text-sm focus:border-[#ff6b35] focus:bg-white focus:outline-hidden transition-all placeholder:text-[#240d2b]/30 shadow-xs"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-xs text-[#240d2b] font-bold block mb-1.5 uppercase">
                      Inquiry Directive
                    </label>
                    <select
                      value={contactData.subject}
                      onChange={(e) => setContactData({ ...contactData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/80 border border-white/80 text-[#240d2b] font-body text-sm focus:border-[#ff6b35] focus:bg-white focus:outline-hidden transition-all shadow-xs cursor-pointer"
                    >
                      <option value="Induction Selection & Recruitment">Club Induction &amp; Recruitment</option>
                      <option value="Wartech 2026 Tournament">Wartech 2026 Tournament Inquiries</option>
                      <option value="Research & Hardware Collaboration">Research &amp; Hardware Collaboration</option>
                      <option value="Sponsorship & Test Trials">Defense Sponsorship &amp; Field Trials</option>
                    </select>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="font-mono text-xs text-[#240d2b] font-bold uppercase">
                        Transmission Message
                      </label>
                      <span className="font-mono text-[10px] text-[#240d2b]/40">
                        {contactData.message.length}/1000
                      </span>
                    </div>
                    <textarea
                      required
                      maxLength={1000}
                      rows={4}
                      value={contactData.message}
                      onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                      placeholder="Detail your inquiry, project proposal, or technical domain question..."
                      className="w-full px-4 py-3 rounded-xl bg-white/80 border border-white/80 text-[#240d2b] font-body text-sm focus:border-[#ff6b35] focus:bg-white focus:outline-hidden transition-all resize-none placeholder:text-[#240d2b]/30 shadow-xs"
                    />
                  </div>

                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-full text-sm font-medium font-body bg-[#ff6b35] text-white hover:bg-[#fa5519] disabled:opacity-60 disabled:cursor-not-allowed transition-all cursor-pointer flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(255,107,53,0.3)] hover:shadow-[0_6px_20px_rgba(255,107,53,0.45)] hover:scale-102 active:scale-98"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Transmitting Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Dispatch Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </GlassCard>

            {/* Lab 104 Tactical Transit Coordinates Card */}
            <div className="rounded-3xl bg-white/70 backdrop-blur-xl border border-white/80 p-6 shadow-xs space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-[#240d2b]/[0.06] pb-3">
                <span className="text-[10px] uppercase tracking-wider text-[#240d2b]/50">
                  PHYSICAL DISPATCH &bull; LAB 104
                </span>
                <span className="inline-flex items-center gap-1.5 text-emerald-600 font-bold text-[11px]">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>FACILITY ACTIVE</span>
                </span>
              </div>

              <div className="space-y-2.5 text-[#240d2b]/80">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#ff6b35] shrink-0 mt-0.5" />
                    <span>{siteConfig.labLocation}, AIT Pune</span>
                  </div>
                  <button
                    onClick={handleCopyCoords}
                    className="text-[10px] text-[#240d2b]/50 hover:text-[#240d2b] flex items-center gap-1 cursor-pointer shrink-0"
                    title="Copy GPS coordinates"
                  >
                    {copiedCoords ? (
                      <Check className="w-3 h-3 text-emerald-600" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                    <span>18.6068° N</span>
                  </button>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#ff6b35] shrink-0" />
                    <span>Mon–Sat &bull; 09:00 – 21:00 IST</span>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="text-[10px] text-[#240d2b]/50 hover:text-[#240d2b] flex items-center gap-1 cursor-pointer shrink-0"
                    title="Copy email address"
                  >
                    {copiedEmail ? (
                      <Check className="w-3 h-3 text-emerald-600" />
                    ) : (
                      <Mail className="w-3 h-3" />
                    )}
                    <span>Copy Email</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Searchable FAQ Accordion */}
          <div className="lg:col-span-6 space-y-6">
            {/* FAQ Search & Category Controls */}
            <div className="space-y-3">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#240d2b]/40 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Filter questions, inductions, kits..."
                  value={faqSearch}
                  onChange={(e) => setFaqSearch(e.target.value)}
                  className="w-full pl-9 pr-8 py-2.5 rounded-full bg-white/80 border border-white/90 text-xs font-mono text-[#240d2b] placeholder-[#240d2b]/40 focus:outline-hidden focus:ring-2 focus:ring-[#ff6b35]/30 focus:border-[#ff6b35] transition-all shadow-xs"
                />
                {faqSearch && (
                  <button
                    onClick={() => setFaqSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#240d2b]/40 hover:text-[#240d2b] cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFaqCategory(cat)}
                    className={`px-3 py-1 rounded-full text-xs transition-all cursor-pointer ${
                      faqCategory === cat
                        ? "bg-[#240d2b] text-white shadow-xs font-bold"
                        : "bg-white/70 text-[#240d2b]/70 border border-white/80 hover:bg-white hover:text-[#240d2b]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Accordion List */}
            {filteredFaqs.length === 0 ? (
              <div className="rounded-2xl bg-white/60 backdrop-blur-md border border-white/80 p-8 text-center space-y-2">
                <p className="font-mono text-xs text-[#240d2b]/60">
                  No questions match &ldquo;{faqSearch}&rdquo;.
                </p>
                <button
                  onClick={() => {
                    setFaqSearch("");
                    setFaqCategory("All");
                  }}
                  className="text-xs font-mono text-[#ff6b35] hover:underline cursor-pointer"
                >
                  Clear FAQ Filters
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredFaqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className={`rounded-2xl bg-white/80 backdrop-blur-xl border transition-all shadow-xs overflow-hidden ${
                        isOpen ? "border-[#ff6b35]/40 shadow-sm" : "border-white/80 hover:border-white"
                      }`}
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                      >
                        <div className="space-y-1 pr-2">
                          <span className="text-[9px] font-mono uppercase tracking-wider text-[#ff6b35] font-bold block">
                            {faq.category}
                          </span>
                          <span className="font-display text-sm sm:text-base font-bold text-[#240d2b] block">
                            {faq.question}
                          </span>
                        </div>
                        <ChevronDown
                          className={`w-4 h-4 text-[#ff6b35] shrink-0 transition-transform duration-300 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#240d2b]/75 font-body leading-relaxed border-t border-[#240d2b]/[0.06]">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactAndFAQ;
