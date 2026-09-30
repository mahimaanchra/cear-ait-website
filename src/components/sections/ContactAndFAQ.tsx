"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, MapPin, Mail, ChevronDown, CheckCircle2 } from "lucide-react";
import { siteConfig, faqs } from "@/data/siteData";

export function ContactAndFAQ() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [submitted, setSubmitted] = useState(false);
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setContactData({ name: "", email: "", subject: "General Inquiry", message: "" });
    }, 4000);
  };

  return (
    <section id="contact" className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Heading */}
        <div className="space-y-2 max-w-xl border-b border-[#0d1321]/[0.08] pb-6">
          <span className="text-xs font-mono tracking-widest uppercase text-[#0d1321]/50">
            06 // Communications &amp; Queries
          </span>
          <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-[#0d1321]">
            Contact &amp; Frequently Asked
          </h2>
          <p className="text-sm sm:text-base text-[#0d1321]/70 font-body">
            Get in touch with the CEAR engineering cadre or explore answers to common technical and induction questions.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Clean Contact Form */}
          <div className="lg:col-span-6 rounded-3xl bg-white border border-[#0d1321]/[0.08] p-8 sm:p-10 shadow-[0_15px_40px_-15px_rgba(13,19,33,0.04)]">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#fafaf9] text-[#0d1321] border border-[#0d1321]/[0.1] mx-auto flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-6 h-6 text-[#0d1321]" />
                </div>
                <h4 className="font-display text-2xl text-[#0d1321] font-bold">
                  Message Sent
                </h4>
                <p className="text-sm text-[#0d1321]/70 font-body max-w-sm mx-auto">
                  Thank you for reaching out. The CEAR team will respond to your inquiry shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 font-body text-xs">
                <div>
                  <label className="font-mono text-xs text-[#0d1321] font-bold block mb-1.5 uppercase">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={contactData.name}
                    onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl bg-[#fafaf9] border border-[#0d1321]/[0.08] text-[#0d1321] font-body text-sm focus:border-[#0d1321] focus:bg-white focus:outline-none transition-all placeholder:text-[#0d1321]/30"
                  />
                </div>

                <div>
                  <label className="font-mono text-xs text-[#0d1321] font-bold block mb-1.5 uppercase">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={contactData.email}
                    onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-[#fafaf9] border border-[#0d1321]/[0.08] text-[#0d1321] font-body text-sm focus:border-[#0d1321] focus:bg-white focus:outline-none transition-all placeholder:text-[#0d1321]/30"
                  />
                </div>

                <div>
                  <label className="font-mono text-xs text-[#0d1321] font-bold block mb-1.5 uppercase">
                    Topic of Inquiry
                  </label>
                  <select
                    value={contactData.subject}
                    onChange={(e) => setContactData({ ...contactData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#fafaf9] border border-[#0d1321]/[0.08] text-[#0d1321] font-body text-sm focus:border-[#0d1321] focus:bg-white focus:outline-none transition-all"
                  >
                    <option value="Induction Query">Club Induction &amp; Recruitment</option>
                    <option value="Wartech 2026 Registration">Wartech 2026 Registration</option>
                    <option value="Project Collaboration">Research &amp; Project Collaboration</option>
                    <option value="Sponsorship">Sponsorship &amp; Industry Partnership</option>
                  </select>
                </div>

                <div>
                  <label className="font-mono text-xs text-[#0d1321] font-bold block mb-1.5 uppercase">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={contactData.message}
                    onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                    placeholder="How can we help you?"
                    className="w-full px-4 py-3 rounded-xl bg-[#fafaf9] border border-[#0d1321]/[0.08] text-[#0d1321] font-body text-sm focus:border-[#0d1321] focus:bg-white focus:outline-none transition-all resize-none placeholder:text-[#0d1321]/30"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-full text-sm font-medium font-body bg-[#0d1321] text-white hover:bg-[#1a2640] transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
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
                  className="rounded-2xl bg-white border border-[#0d1321]/[0.08] overflow-hidden transition-all shadow-xs"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="font-display text-base sm:text-lg font-bold text-[#0d1321]">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#0d1321] shrink-0 transition-transform duration-300 ${
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
                        <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-[#0d1321]/70 font-body leading-relaxed border-t border-[#0d1321]/[0.04]">
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
