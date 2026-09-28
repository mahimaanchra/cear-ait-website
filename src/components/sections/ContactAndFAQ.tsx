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
    <section id="contact" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-transparent border-b-[2.5px] border-ink">
      <div className="max-w-6xl mx-auto space-y-14">
        {/* Section Heading */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-paper border-2 border-ink shadow-[2px_2px_0_#14140f] text-xs font-mono font-black text-ink mb-1 -rotate-1">
            <span>COMMUNICATIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-tech tracking-tight text-ink mb-2">
            Contact &amp; FAQ
          </h2>
          <p className="text-sm sm:text-base text-ink/80 font-body font-semibold max-w-xl">
            Direct communications with CEAR faculty coordinators and student leadership.
          </p>
        </div>

        {/* 2-Column Grid: Form on Left, FAQ & Direct Coordinates on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Transmission Form */}
          <div className="lg:col-span-6 rounded-[22px_27px_20px_25px_/_27px_20px_25px_22px] bg-white border-[2.5px] border-ink p-6 sm:p-8 shadow-[5px_6px_0_#14140f] -rotate-0.5">
            {submitted ? (
              <div className="text-center py-10 space-y-2 animate-stamp">
                <div className="w-12 h-12 rounded-full bg-ink text-white border-2 border-ink shadow-[2px_2px_0_#14140f] mx-auto flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
                </div>
                <h4 className="font-tech text-xl text-ink font-black">
                  Message Dispatched!
                </h4>
                <p className="text-xs text-ink/80 font-body font-semibold">
                  We will respond directly to your email.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-body text-xs">
                <div>
                  <label className="font-mono text-[11px] text-ink font-bold block mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={contactData.name}
                    onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                    placeholder="Cadet Name"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-paper border-2 border-ink text-ink font-mono font-semibold focus:bg-white focus:shadow-[2px_2px_0_#14140f] focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="font-mono text-[11px] text-ink font-bold block mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={contactData.email}
                    onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                    placeholder="your.email@aitpune.edu.in"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-paper border-2 border-ink text-ink font-mono font-semibold focus:bg-white focus:shadow-[2px_2px_0_#14140f] focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="font-mono text-[11px] text-ink font-bold block mb-1">
                    Topic
                  </label>
                  <select
                    value={contactData.subject}
                    onChange={(e) => setContactData({ ...contactData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-paper border-2 border-ink text-ink focus:bg-white focus:shadow-[2px_2px_0_#14140f] focus:outline-none font-mono font-bold transition-all"
                  >
                    <option value="Induction Query">Club Inductions 2026</option>
                    <option value="Project Collaboration">Research Collaboration</option>
                    <option value="Wartech 2026 Fest">Wartech 2026 Inquiry</option>
                    <option value="General Inquiry">General Lab Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="font-mono text-[11px] text-ink font-bold block mb-1">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={contactData.message}
                    onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                    placeholder="Enter your message..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-paper border-2 border-ink text-ink font-body font-semibold focus:bg-white focus:shadow-[2px_2px_0_#14140f] focus:outline-none resize-none transition-all"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full btn-paper-primary !h-[44px] text-sm hover-wiggle cursor-pointer"
                  >
                    <Send className="w-4 h-4 stroke-[2.5]" />
                    <span>Send Message</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: FAQ Accordion & Direct Coordinates */}
          <div className="lg:col-span-6 space-y-5">
            <div className="rounded-[22px_27px_20px_25px_/_27px_20px_25px_22px] bg-white border-[2.5px] border-ink p-6 sm:p-8 shadow-[5px_6px_0_#14140f] rotate-0.5">
              <h3 className="font-tech text-lg font-black text-ink mb-3">
                Frequently Asked Questions
              </h3>

              <div className="divide-y-2 divide-ink/10">
                {faqs.slice(0, 4).map((faq, index) => {
                  const isOpen = openFaq === index;

                  return (
                    <div key={index} className="py-3">
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        className="w-full text-left flex items-start justify-between gap-3 group cursor-pointer"
                      >
                        <span className="font-tech text-sm font-black text-ink group-hover:text-alarm transition-colors leading-snug">
                          {faq.question}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-ink/60 shrink-0 mt-0.5 transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-alarm" : ""
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
                            <div className="pt-2 pb-1 text-xs text-ink/80 leading-relaxed font-body font-semibold">
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

            {/* Direct Coordinates Card with spring hover */}
            <div className="rounded-2xl bg-white border-[2.5px] border-ink p-5 space-y-2.5 font-mono text-xs text-ink shadow-[3px_4px_0_#14140f] hover:translate-x-1 transition-transform">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-alarm shrink-0 mt-0.5 stroke-[2.2]" />
                <span className="font-bold">
                  Lab 104, Dept of E&amp;TC, Army Institute of Technology, Pune 411015
                </span>
              </div>
              <div className="flex items-center gap-2.5 pt-2 border-t-2 border-ink/10">
                <Mail className="w-4 h-4 text-ink shrink-0 stroke-[2.2]" />
                <span className="font-black text-ink">{siteConfig.contactEmail}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactAndFAQ;
