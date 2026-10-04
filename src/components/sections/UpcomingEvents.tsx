"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { useSiteContent } from "@/context/SiteContentContext";

interface UpcomingEventsProps {
  onOpenRegister?: () => void;
}

export function UpcomingEvents({ onOpenRegister }: UpcomingEventsProps) {
  const { upcomingEvents } = useSiteContent();

  return (
    <section id="events" className="relative py-28 sm:py-36 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#240d2b]/[0.08] pb-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-mono tracking-widest uppercase text-[#240d2b]/50">
              04 // Timeline &amp; Events
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-display text-[#240d2b] tracking-tight">
              Workshops, Hackathons &amp; Bootcamps
            </h2>
            <p className="text-sm sm:text-base text-[#240d2b]/70 font-body leading-relaxed">
              Hands-on autonomous systems workshops, cadet induction drives, and robotics competitions.
            </p>
          </div>

          <div className="text-xs font-mono text-[#240d2b]/60 px-4 py-2 rounded-full bg-white border border-[#240d2b]/[0.08] shadow-xs shrink-0">
            <span className="text-[#ff6b35] font-semibold">{upcomingEvents.length} Scheduled Sessions</span>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {upcomingEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -5 }}
              className="p-8 sm:p-10 rounded-3xl bg-white border border-[#240d2b]/[0.08] shadow-[0_15px_40px_-15px_rgba(36,13,43,0.04)] hover:shadow-[0_25px_60px_-15px_rgba(36,13,43,0.08)] hover:border-[#ff6b35]/35 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                {event.imageUrl && (
                  <div className="relative w-full h-48 rounded-2xl overflow-hidden bg-[#f6f3ee] border border-[#240d2b]/[0.08] mb-4">
                    <Image
                      src={event.imageUrl}
                      alt={event.title}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                      unoptimized={event.imageUrl.startsWith("http")}
                    />
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#240d2b]/60 bg-[#f6f3ee] border border-[#240d2b]/[0.08] px-3 py-1 rounded-full">
                    {event.category}
                  </span>
                  <span className="text-xs font-mono font-medium text-[#ff6b35]">
                    {event.status}
                  </span>
                </div>

                <h3 className="text-2xl font-bold font-display text-[#240d2b] tracking-tight">
                  {event.title}
                </h3>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#240d2b]/60 pt-1">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#ff6b35]" />
                    <span>{event.date}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#ff6b35]" />
                    <span>{event.location}</span>
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#240d2b]/70 font-body leading-relaxed pt-1">
                  {event.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#240d2b]/[0.06] flex items-center justify-between">
                <span className="text-xs font-mono text-[#240d2b]/50">
                  Open to all AIT students
                </span>

                <button
                  onClick={onOpenRegister}
                  className="inline-flex items-center gap-1.5 text-xs font-medium font-body text-white bg-[#ff6b35] hover:bg-[#fa5519] px-4 py-2 rounded-full transition-all cursor-pointer shadow-[0_2px_10px_rgba(255,107,53,0.3)]"
                >
                  <span>{event.ctaText || "Register"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default UpcomingEvents;
