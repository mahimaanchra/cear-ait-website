"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, MapPin, Mail, ChevronDown, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { siteConfig, faqs } from "@/data/siteData";

export function ContactAndFAQ() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    subject: "Induction Query",
    message: "",
  });

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
      setContactData({ name: "", email: "", subject: "Induction Query", message: "" });
    } catch (err: any) {
      setErrorMessage(err?.message || "Failed to send message. Please try again or email cear@aitpune.edu.in");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Heading */}
        <div className="space-y-2 max-w-xl border-b border-[#240d2b]/[0.08] pb-6">
          <span className="text-xs font-mono tracking-widest uppercase text-[#240d2b]/50">
            06 // Communications &amp; Queries
          </span>
          <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-[#240d2b]">
            Contact &amp; Frequently Asked
          </h2>
          <p className="text-sm sm:text-base text-[#240d2b]/70 font-body">
            Get in touch with the CEAR engineering cadre or explore answers to common technical and induction questions.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Clean Contact Form */}
          <div className="lg:col-span-6 rounded-3xl bg-white border border-[#240d2b]/[0.08] p-8 sm:p-10 shadow-[0_15px_40px_-15px_rgba(36,13,43,0.04)]">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#f6f3ee] text-[#ff6b35] border border-[#ff6b35]/20 mx-auto flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-6 h-6 text-[#ff6b35]" />
                </div>
                <h4 className="font-display text-2xl text-[#240d2b] font-bold">
                  Message Sent
                </h4>
                <p className="text-sm text-[#240d2b]/70 font-body max-w-sm mx-auto">
                  Thank you for reaching out. The CEAR team will respond to your inquiry shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 font-body text-xs">
                <div>
                  <label className="font-mono text-xs text-[#240d2b] font-bold block mb-1.5 uppercase">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={contactData.name}
                    onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl bg-[#f6f3ee] border border-[#240d2b]/[0.08] text-[#240d2b] font-body text-sm focus:border-[#ff6b35] focus:bg-white focus:outline-none transition-all placeholder:text-[#240d2b]/30"
                  />
                </div>

                <div>
                  <label className="font-mono text-xs text-[#240d2b] font-bold block mb-1.5 uppercase">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={contactData.email}
                    onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-[#f6f3ee] border border-[#240d2b]/[0.08] text-[#240d2b] font-body text-sm focus:border-[#ff6b35] focus:bg-white focus:outline-none transition-all placeholder:text-[#240d2b]/30"
                  />
                </div>

                <div>
                  <label className="font-mono text-xs text-[#240d2b] font-bold block mb-1.5 uppercase">
                    Topic of Inquiry
                  </label>
                  <select
                    value={contactData.subject}
                    onChange={(e) => setContactData({ ...contactData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#f6f3ee] border border-[#240d2b]/[0.08] text-[#240d2b] font-body text-sm focus:border-[#ff6b35] focus:bg-white focus:outline-none transition-all"
                  >
                    <option value="Induction Query">Club Induction &amp; Recruitment</option>
                    <option value="Wartech 2026 Registration">Wartech 2026 Registration</option>
                    <option value="Project Collaboration">Research &amp; Project Collaboration</option>
                    <option value="Sponsorship">Sponsorship &amp; Industry Partnership</option>
                  </select>
                </div>

                <div>
                  <label className="font-mono text-xs text-[#240d2b] font-bold block mb-1.5 uppercase">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={contactData.message}
                    onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                    placeholder="How can we help you?"
                    className="w-full px-4 py-3 rounded-xl bg-[#f6f3ee] border border-[#240d2b]/[0.08] text-[#240d2b] font-body text-sm focus:border-[#ff6b35] focus:bg-white focus:outline-none transition-all resize-none placeholder:text-[#240d2b]/30"
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
                  className="w-full py-3.5 px-6 rounded-full text-sm font-medium font-body bg-[#ff6b35] text-white hover:bg-[#fa5519] disabled:opacity-60 disabled:cursor-not-allowed transition-all cursor-pointer flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(255,107,53,0.3)] hover:shadow-[0_6px_20px_rgba(255,107,53,0.45)]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: FAQ Accordion */}
          <div className="lg:col-span-6 space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl bg-white border transition-all shadow-xs ${
                    isOpen ? "border-[#ff6b35]/40" : "border-[#240d2b]/[0.08]"
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="font-display text-base sm:text-lg font-bold text-[#240d2b]">
                      {faq.question}
                    </span>
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
                        <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-[#240d2b]/70 font-body leading-relaxed border-t border-[#240d2b]/[0.04]">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactAndFAQ;
