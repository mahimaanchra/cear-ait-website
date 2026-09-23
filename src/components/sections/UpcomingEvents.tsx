"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowRight, CheckCircle2, Users, Radio } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { upcomingEvents, EventItem } from "@/data/siteData";

export function UpcomingEvents() {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [applied, setApplied] = useState(false);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setApplied(true);
    setTimeout(() => {
      setApplied(false);
      setSelectedEvent(null);
    }, 2500);
  };

  return (
    <section id="events" className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Heading: Red Dash + UPCOMING OPERATIONS_ */}
        <div>
          <div className="w-10 h-1 bg-red-600 rounded-sm mb-3" />
          <h2 className="text-3xl sm:text-5xl font-extrabold uppercase font-industrial tracking-tight text-zinc-900 leading-[0.95] mb-3">
            UPCOMING <br />
            <span className="text-[#0d5c58]">OPERATIONS_</span>
          </h2>
          <p className="text-sm text-zinc-600 font-sans max-w-xl">
            Scheduled field trials, hardware fabrication workshops, and annual club recruitment.
          </p>
        </div>

        {/* Split Grid: Left Operations List, Right Team War-Room Illustration/Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Operations List */}
          <div className="lg:col-span-7 space-y-4">
            {upcomingEvents.map((evt, idx) => (
              <motion.div
                key={evt.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="rounded-2xl bg-white border border-zinc-200/90 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-600" />
                      <span className="font-mono text-xs font-bold text-red-600 tracking-wider">
                        OPS-0{idx + 1}
                      </span>
                      <span className="text-zinc-300">•</span>
                      <span className="font-mono text-xs text-zinc-500 uppercase">
                        {evt.category}
                      </span>
                    </div>

                    <span
                      className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase ${
                        evt.status === "Registration Closed"
                          ? "bg-zinc-100 text-zinc-500"
                          : "bg-teal-50 text-[#0d5c58] border border-teal-200"
                      }`}
                    >
                      {evt.status}
                    </span>
                  </div>

                  <h3 className="font-industrial text-xl font-bold text-zinc-900">
                    {evt.title}
                  </h3>

                  <p className="font-sans text-xs text-zinc-600 leading-relaxed">
                    {evt.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs font-mono text-zinc-500 pt-2 border-t border-zinc-100">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#0d5c58]" />
                      <span className="font-bold text-zinc-800">{evt.date}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                      <span>{evt.location}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-2">
                  <button
                    onClick={() => setSelectedEvent(evt)}
                    disabled={evt.status === "Registration Closed"}
                    className={`btn-teal-pill text-xs w-full sm:w-auto ${
                      evt.status === "Registration Closed"
                        ? "bg-zinc-200 text-zinc-400 cursor-not-allowed shadow-none"
                        : "cursor-pointer"
                    }`}
                  >
                    <span>{evt.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Column: Team Meeting / War-Room Graphic Card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-white border border-zinc-200/90 p-8 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
                <div className="flex items-center gap-2">
                  <Radio className="w-4 h-4 text-red-600 animate-pulse" />
                  <span className="font-mono text-xs font-bold text-zinc-900 uppercase">
                    LAB OPS DISPATCH
                  </span>
                </div>
                <span className="font-mono text-[10px] bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded">
                  CYCLE 2026-27
                </span>
              </div>

              {/* Graphic / Isometric Meeting Concept */}
              <div className="w-full aspect-[4/3] rounded-xl bg-zinc-50 border border-zinc-200 flex flex-col items-center justify-center p-6 text-center">
                <Users className="w-16 h-16 text-[#0d5c58] mb-3" />
                <h4 className="font-industrial text-base font-bold text-zinc-900">
                  Cadet Strategy &amp; Fabrication Session
                </h4>
                <p className="font-mono text-[11px] text-zinc-500 mt-1 max-w-xs">
                  Every Saturday, 14:00 - 18:00 IST at Lab 104. Open to recruited cadets.
                </p>
              </div>

              <div className="space-y-2 text-xs font-mono text-zinc-600">
                <div className="flex justify-between py-1 border-b border-zinc-100">
                  <span className="text-zinc-400">DISCIPLINE:</span>
                  <span className="font-bold text-zinc-900">ROS2, HARDWARE, PCB</span>
                </div>
                <div className="flex justify-between py-1 border-b border-zinc-100">
                  <span className="text-zinc-400">VENUE:</span>
                  <span className="font-bold text-zinc-900">AIT LAB 104</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-zinc-400">ELIGIBILITY:</span>
                  <span className="font-bold text-zinc-900">ALL ENGINEERING BRANCHES</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Induction / Workshop Registration Modal */}
      <Modal
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        title={selectedEvent?.title || ""}
        subtitle={selectedEvent?.location}
      >
        {applied ? (
          <div className="text-center py-10 space-y-3">
            <div className="w-12 h-12 rounded-full bg-teal-100 text-[#0d5c58] mx-auto flex items-center justify-center font-bold">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="font-industrial text-xl text-zinc-900 font-bold">
              Application Dispatched!
            </h4>
            <p className="text-xs text-zinc-600 font-sans">
              Our student coordinators will reach out to your college email with reporting details.
            </p>
          </div>
        ) : (
          <form onSubmit={handleApply} className="space-y-4 font-sans text-xs">
            <p className="text-xs text-zinc-600">
              {selectedEvent?.description}
            </p>
            <div>
              <label className="font-mono text-[11px] text-zinc-500 block mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="Cadet Name"
                className="w-full px-3 py-2 rounded-lg bg-zinc-50 border border-zinc-200 text-zinc-900 focus:bg-white focus:border-[#0d5c58] focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-mono text-[11px] text-zinc-500 block mb-1">
                  Roll / Registration No. *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 240318"
                  className="w-full px-3 py-2 rounded-lg bg-zinc-50 border border-zinc-200 text-zinc-900 focus:bg-white focus:border-[#0d5c58] focus:outline-none"
                />
              </div>
              <div>
                <label className="font-mono text-[11px] text-zinc-500 block mb-1">
                  Branch &amp; Year *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. E&TC, Comp, IT, Mech"
                  className="w-full px-3 py-2 rounded-lg bg-zinc-50 border border-zinc-200 text-zinc-900 focus:bg-white focus:border-[#0d5c58] focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="font-mono text-[11px] text-zinc-500 block mb-1">
                College Email *
              </label>
              <input
                type="email"
                required
                placeholder="cadet@aitpune.edu.in"
                className="w-full px-3 py-2 rounded-lg bg-zinc-50 border border-zinc-200 text-zinc-900 focus:bg-white focus:border-[#0d5c58] focus:outline-none"
              />
            </div>
            <div className="pt-4 flex justify-end gap-3 font-mono">
              <button
                type="button"
                onClick={() => setSelectedEvent(null)}
                className="px-4 py-2 rounded text-xs text-zinc-500 hover:text-black"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-teal-pill text-xs"
              >
                Submit Application
              </button>
            </div>
          </form>
        )}
      </Modal>
    </section>
  );
}
