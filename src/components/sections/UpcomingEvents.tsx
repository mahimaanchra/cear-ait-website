"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowRight, Sparkles, Filter, CheckCircle2, Bookmark, Flame } from "lucide-react";
import { useSiteContent } from "@/context/SiteContentContext";
import { GlassCard } from "@/components/ui/GlassCard";
import { EventSpotlightCard } from "@/components/ui/EventSpotlightCard";

interface UpcomingEventsProps {
  onOpenRegister?: (trackId?: string) => void;
}

export function UpcomingEvents({ onOpenRegister }: UpcomingEventsProps) {
  const { upcomingEvents } = useSiteContent();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Derive unique categories
  const categories = ["All", ...Array.from(new Set(upcomingEvents.map((e) => e.category)))];

  const filteredEvents = selectedCategory === "All"
    ? upcomingEvents
    : upcomingEvents.filter((e) => e.category === selectedCategory);

  return (
    <section id="events" className="relative py-28 sm:py-36 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#240d2b]/[0.08] pb-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff6b35]/10 border border-[#ff6b35]/20 text-[#ff6b35] text-[11px] font-mono uppercase tracking-wider font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>05 // Timeline &amp; Events</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-display text-[#240d2b] tracking-tight">
              Workshops, Hackathons &amp; Bootcamps
            </h2>
            <p className="text-sm sm:text-base text-[#240d2b]/70 font-body leading-relaxed">
              Hands-on autonomous systems workshops, cadet induction drives, and robotics competitions hosted at Lab 104 and Manekshaw Hall.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-xs font-mono text-[#240d2b]/60 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-white/80 shadow-xs shrink-0">
              <span className="text-[#ff6b35] font-semibold">{upcomingEvents.length} Scheduled Sessions</span>
            </div>
          </div>
        </div>

        {/* Featured Flagship Spotlight Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Spotlight Card */}
          <div className="lg:col-span-7 flex">
            <EventSpotlightCard onOpenRegister={onOpenRegister} className="h-full" />
          </div>

          {/* Logistics & Cadet Guidelines Glass Panel */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-[32px] sm:rounded-[36px] bg-white/75 backdrop-blur-2xl border border-white/80 p-6 sm:p-8 shadow-[0_20px_50px_-15px_rgba(36,13,43,0.08)] relative overflow-hidden group">
            {/* Top Specular Inner Bevel Highlight */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />

            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#240d2b]/50 bg-[#f6f3ee] border border-[#240d2b]/[0.08] px-3 py-1 rounded-full">
                  CADET BRIEFING &bull; 2026
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#ff6b35] font-semibold">
                  <Flame className="w-3.5 h-3.5" />
                  <span>Lab 104 Open Wing</span>
                </span>
              </div>

              <div>
                <h3 className="font-display text-2xl font-bold text-[#240d2b]">
                  Autonomous Systems Roadmap
                </h3>
                <p className="text-xs sm:text-sm text-[#240d2b]/75 font-body leading-relaxed mt-2">
                  All CEAR workshops include complimentary hardware kits, bench testing stations with Keysight oscilloscopes, and direct mentorship from third- and final-year robotics cadre engineers.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-white/90 border border-white/90 flex items-start gap-3 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-[#ff6b35] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-[#240d2b] font-display">Hands-On Bench Hardware</div>
                    <div className="text-[11px] text-[#240d2b]/65 font-body">STM32, Raspberry Pi 5, Jetson Orin Nano, and custom PCB mill test coupons provided during lab sessions.</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/90 border border-white/90 flex items-start gap-3 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-[#ff6b35] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-[#240d2b] font-display">Cadet Certification &amp; Badges</div>
                    <div className="text-[11px] text-[#240d2b]/65 font-body">Participants qualify for CEAR research credits and priority entry into national competition squads.</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#240d2b]/[0.08] flex items-center justify-between">
              <span className="text-xs font-mono text-[#240d2b]/50">
                AIT Campus &bull; Free Registration
              </span>
              <button
                onClick={() => onOpenRegister?.()}
                className="inline-flex items-center gap-1.5 text-xs font-medium font-body text-[#ff6b35] hover:text-[#fa5519] transition-colors cursor-pointer"
              >
                <span>Express Application</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Filter Pills & Complete Session Roster */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#240d2b]/[0.08] pb-4">
            <h3 className="text-xl sm:text-2xl font-black font-display text-[#240d2b] tracking-tight">
              All Scheduled Sessions &amp; Bootcamps
            </h3>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-[#240d2b] text-white shadow-xs font-bold"
                      : "bg-white/80 text-[#240d2b]/70 border border-white/90 hover:bg-white hover:text-[#240d2b]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredEvents.map((event) => (
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
                    onClick={() => onOpenRegister?.()}
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
      </div>
    </section>
  );
}

export default UpcomingEvents;
