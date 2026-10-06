"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { useSiteContent } from "@/context/SiteContentContext";
import { GlassCard } from "@/components/ui/GlassCard";

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
              05 // Timeline &amp; Events
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-display text-[#240d2b] tracking-tight">
              Workshops, Hackathons &amp; Bootcamps
            </h2>
            <p className="text-sm sm:text-base text-[#240d2b]/70 font-body leading-relaxed">
              Hands-on autonomous systems workshops, cadet induction drives, and robotics competitions.
            </p>
          </div>

          <div className="text-xs font-mono text-[#240d2b]/60 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-white/80 shadow-xs shrink-0">
            <span className="text-[#ff6b35] font-semibold">{upcomingEvents.length} Scheduled Sessions</span>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {upcomingEvents.map((event) => (
            <GlassCard
              key={event.id}
              spotlightColor="rgba(255, 107, 53, 0.15)"
              className="p-8 sm:p-10 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {event.imageUrl && (
                  <div className="relative w-full h-52 rounded-2xl overflow-hidden bg-[#240d2b]/5 border border-white/80 mb-4 shadow-inner">
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
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#240d2b]/70 bg-white/80 border border-white/80 px-3 py-1 rounded-full shadow-xs">
                    {event.category}
                  </span>
                  <span className="text-xs font-mono font-medium text-[#ff6b35] bg-[#ff6b35]/10 px-2.5 py-0.5 rounded-full">
                    {event.status}
                  </span>
                </div>

                <h3 className="text-2xl font-bold font-display text-[#240d2b] tracking-tight">
                  {event.title}
                </h3>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#240d2b]/65 pt-1">
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

                <p className="text-xs sm:text-sm text-[#240d2b]/75 font-body leading-relaxed pt-1">
                  {event.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#240d2b]/[0.08] flex items-center justify-between">
                <span className="text-xs font-mono text-[#240d2b]/50">
                  Open to all AIT students
                </span>

                <button
                  onClick={onOpenRegister}
                  className="inline-flex items-center gap-1.5 text-xs font-medium font-body text-white bg-[#ff6b35] hover:bg-[#fa5519] px-4 py-2 rounded-full transition-all cursor-pointer shadow-[0_2px_12px_rgba(255,107,53,0.35)] hover:scale-102 active:scale-98"
                >
                  <span>{event.ctaText || "Register"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

export default UpcomingEvents;
