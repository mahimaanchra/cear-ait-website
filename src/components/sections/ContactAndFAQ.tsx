"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, ChevronDown, CheckCircle2, Mail, MapPin, Radio } from "lucide-react";
import { siteConfig, faqs } from "@/data/siteData";

export function ContactAndFAQ() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [submitted, setSubmitted] = useState(false);
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    subject: "Induction Query",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setContactData({
        name: "",
        email: "",
        subject: "Induction Query",
        message: "",
      });
    }, 3000);
  };

  return (
    <section id="contact" className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        {/* Section Heading: Red Dash + INITIATE CONNECTION_ */}
        <div>
          <div className="w-10 h-1 bg-red-600 rounded-sm mb-3" />
          <h2 className="text-3xl sm:text-5xl font-extrabold uppercase font-industrial tracking-tight text-zinc-900 leading-[0.95] mb-3">
            INITIATE <br />
            <span className="text-[#0d5c58]">CONNECTION_</span>
          </h2>
          <p className="text-sm text-zinc-600 font-sans max-w-xl">
            Direct communications link with faculty coordinators and student engineering leadership.
          </p>
        </div>

        {/* 2-Column Grid: Form on Left, FAQ & Direct Coordinates on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Transmission Form */}
          <div className="lg:col-span-6 rounded-2xl bg-white border border-zinc-200/90 p-8 shadow-sm">
            <div className="mb-6 flex items-center justify-between pb-3 border-b border-zinc-100">
              <span className="font-mono text-xs font-bold text-red-600 uppercase tracking-wider">
                [SECURE TRANSMISSION]
              </span>
              <span className="font-mono text-[10px] text-zinc-400">STATUS: READY</span>
            </div>

            {submitted ? (
              <div className="text-center py-12 space-y-3">
                <div className="w-12 h-12 rounded-full bg-teal-100 text-[#0d5c58] mx-auto flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="font-industrial text-xl text-zinc-900 font-bold">
                  Transmission Sent!
                </h4>
                <p className="text-xs text-zinc-600 font-sans">
                  Thank you {contactData.name || "Cadet"}. We will respond directly to your email.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
                <div>
                  <label className="font-mono text-[11px] text-zinc-500 block mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactData.name}
                    onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                    placeholder="Cadet Name"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-50 border border-zinc-200 text-zinc-900 focus:bg-white focus:border-[#0d5c58] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="font-mono text-[11px] text-zinc-500 block mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={contactData.email}
                    onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                    placeholder="your.email@aitpune.edu.in"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-50 border border-zinc-200 text-zinc-900 focus:bg-white focus:border-[#0d5c58] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="font-mono text-[11px] text-zinc-500 block mb-1">
                    Subject / Area of Query
                  </label>
                  <select
                    value={contactData.subject}
                    onChange={(e) => setContactData({ ...contactData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-50 border border-zinc-200 text-zinc-900 focus:bg-white focus:border-[#0d5c58] focus:outline-none font-mono transition-colors"
                  >
                    <option value="Induction Query">Club Inductions 2026-27</option>
                    <option value="Project Collaboration">Research &amp; Defense Collaboration</option>
                    <option value="Wartech 2026 Fest">Wartech Robotics Festival Query</option>
                    <option value="General Inquiry">General Lab Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="font-mono text-[11px] text-zinc-500 block mb-1">
                    Transmission Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={contactData.message}
                    onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                    placeholder="Enter message details or proposal..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-50 border border-zinc-200 text-zinc-900 focus:bg-white focus:border-[#0d5c58] focus:outline-none resize-none transition-colors"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="btn-teal-pill w-full cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>DISPATCH TRANSMISSION</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: FAQ Accordion & Direct Coordinates */}
          <div className="lg:col-span-6 space-y-6">
            <div className="rounded-2xl bg-white border border-zinc-200/90 p-8 shadow-sm">
              <span className="font-mono text-xs font-bold text-[#0d5c58] uppercase tracking-wider block mb-4">
                [FREQUENTLY ASKED QUESTIONS]
              </span>

              <div className="divide-y divide-zinc-100">
                {faqs.slice(0, 4).map((faq, index) => {
                  const isOpen = openFaq === index;

                  return (
                    <div key={index} className="py-3.5">
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        className="w-full text-left flex items-start justify-between gap-3 group cursor-pointer"
                      >
                        <span className="font-industrial text-sm font-bold text-zinc-900 group-hover:text-[#0d5c58] transition-colors leading-snug">
                          {faq.question}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-zinc-400 shrink-0 mt-0.5 transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-[#0d5c58]" : ""
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-2 pb-1 text-xs text-zinc-600 leading-relaxed font-sans">
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

            {/* Direct Coordinates Card */}
            <div className="rounded-2xl bg-zinc-50 border border-zinc-200 p-6 space-y-3 font-mono text-xs text-zinc-600">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span>
                  Lab 104, Dept of E&amp;TC, Army Institute of Technology, Dighi Hills, Pune 411015
                </span>
              </div>
              <div className="flex items-center gap-2.5 pt-2 border-t border-zinc-200">
                <Mail className="w-4 h-4 text-[#0d5c58] shrink-0" />
                <span>{siteConfig.contactEmail}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Big Watermark Logo from AIT_CIDC Reference Screenshot */}
        <div className="text-center pt-8 overflow-hidden select-none pointer-events-none">
          <div className="text-6xl sm:text-8xl md:text-9xl font-black font-industrial tracking-tighter text-zinc-900/[0.06] whitespace-nowrap">
            AIT_CEAR|
          </div>
        </div>
      </div>
    </section>
  );
}
