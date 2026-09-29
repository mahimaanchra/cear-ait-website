"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, MapPin, Mail, ChevronDown, CheckCircle2, MessageSquare, Terminal } from "lucide-react";
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
      setContactData({ name: "", email: "", subject: "Induction Query", message: "" });
    }, 4000);
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-transparent border-b border-cyan-500/20">
      <div className="max-w-6xl mx-auto space-y-14">
        {/* Section Heading */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0a101d] border border-cyan-500/35 text-xs font-mono font-bold text-cyan-300 mb-2">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>COMMUNICATIONS TERMINAL</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-tech tracking-tight text-slate-100 mb-2">
            Contact &amp; FAQ
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-body max-w-xl">
            Transmit telemetry inquiries directly to CEAR faculty coordinators and student leadership.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Transmission Form */}
          <div className="lg:col-span-6 rounded-2xl bg-[#0c1222]/85 border border-cyan-500/25 p-6 sm:p-8 shadow-[0_10px_35px_rgba(0,0,0,0.6)] backdrop-blur-xl relative overflow-hidden">
            <div className="cyber-bracket-top-left" />
            <div className="cyber-bracket-bottom-right" />

            {submitted ? (
              <div className="text-center py-10 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mx-auto flex items-center justify-center font-bold shadow-[0_0_15px_rgba(0,255,157,0.3)]">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-tech text-xl text-slate-100 font-bold">
                  Transmission Dispatched
                </h4>
                <p className="text-xs text-slate-300 font-body">
                  Telemetry received. We will respond directly to your provided email.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-body text-xs">
                <div>
                  <label className="font-mono text-[11px] text-slate-300 font-bold block mb-1">
                    Cadet / Inquirer Name
                  </label>
                  <input
                    type="text"
                    required
                    value={contactData.name}
                    onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                    placeholder="Cadet Name"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#070b14] border border-slate-800 text-slate-100 font-mono focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400/40 transition-all placeholder:text-slate-600"
                  />
                </div>

                <div>
                  <label className="font-mono text-[11px] text-slate-300 font-bold block mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={contactData.email}
                    onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                    placeholder="your.email@aitpune.edu.in"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#070b14] border border-slate-800 text-slate-100 font-mono focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400/40 transition-all placeholder:text-slate-600"
                  />
                </div>

                <div>
                  <label className="font-mono text-[11px] text-slate-300 font-bold block mb-1">
                    Transmission Topic
                  </label>
                  <select
                    value={contactData.subject}
                    onChange={(e) => setContactData({ ...contactData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#070b14] border border-slate-800 text-slate-100 focus:border-cyan-400 focus:outline-none font-mono font-bold transition-all"
                  >
                    <option value="Induction Query" className="bg-[#070b14]">Club Inductions 2026</option>
                    <option value="Project Collaboration" className="bg-[#070b14]">Research Collaboration</option>
                    <option value="Wartech 2026 Fest" className="bg-[#070b14]">Wartech 2026 Inquiry</option>
                    <option value="General Inquiry" className="bg-[#070b14]">General Lab Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="font-mono text-[11px] text-slate-300 font-bold block mb-1">
                    Transmission Body
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={contactData.message}
                    onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                    placeholder="Enter your transmission..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#070b14] border border-slate-800 text-slate-100 font-body focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400/40 resize-none transition-all placeholder:text-slate-600"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full cyber-btn-primary !h-[44px] text-sm cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Transmission</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: FAQ Accordion & Coordinates */}
          <div className="lg:col-span-6 space-y-5">
            <div className="rounded-2xl bg-[#0c1222]/85 border border-cyan-500/25 p-6 sm:p-8 shadow-[0_10px_35px_rgba(0,0,0,0.6)] backdrop-blur-xl">
              <h3 className="font-tech text-lg font-bold text-slate-100 mb-3 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-cyan-400" />
                <span>Frequently Asked Questions</span>
              </h3>

              <div className="divide-y divide-slate-800/80">
                {faqs.slice(0, 4).map((faq, index) => {
                  const isOpen = openFaq === index;

                  return (
                    <div key={index} className="py-3">
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        className="w-full text-left flex items-start justify-between gap-3 group cursor-pointer"
                      >
                        <span className="font-tech text-sm font-bold text-slate-200 group-hover:text-cyan-300 transition-colors leading-snug">
                          {faq.question}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-cyan-400 shrink-0 mt-0.5 transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-cyan-300" : ""
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.18 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-2 pb-1 text-xs text-slate-400 leading-relaxed font-body">
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
            <div className="rounded-xl bg-[#0c1222]/85 border border-cyan-500/20 p-5 space-y-2.5 font-mono text-xs text-slate-300 shadow-[0_8px_25px_rgba(0,0,0,0.5)] backdrop-blur-xl">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span className="font-semibold">
                  Lab 104, Dept of E&amp;TC, Army Institute of Technology, Pune 411015
                </span>
              </div>
              <div className="flex items-center gap-2.5 pt-2 border-t border-slate-800">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="font-bold text-slate-100">{siteConfig.contactEmail}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactAndFAQ;
