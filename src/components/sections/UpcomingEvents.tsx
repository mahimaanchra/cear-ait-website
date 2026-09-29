"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, ArrowRight, CheckCircle2, Clock, Sparkles, X, Radio } from "lucide-react";
import { EventItem } from "@/data/siteData";
import { useSiteContent } from "@/context/SiteContentContext";

interface UpcomingEventsProps {
  onOpenRegister?: () => void;
}

export function UpcomingEvents({ onOpenRegister }: UpcomingEventsProps) {
  const { upcomingEvents } = useSiteContent();

  const getStatusBadge = (status: EventItem["status"]) => {
    switch (status) {
      case "Ongoing":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-mono font-bold bg-rose-500/15 text-rose-400 border border-rose-500/40">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            <span>OPERATIONAL // LIVE</span>
          </span>
        );
      case "Upcoming":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-mono font-bold bg-cyan-500/15 text-cyan-300 border border-cyan-500/40">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>UPCOMING</span>
          </span>
        );
      case "Completed":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-mono font-bold bg-slate-800 text-slate-400 border border-slate-700">
            <span>CONCLUDED</span>
          </span>
        );
    }
  };

  return (
    <section id="events" className="relative py-24 sm:py-32 bg-transparent border-b border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Section Header */}
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0a101d] border border-cyan-500/35 text-xs font-mono font-bold text-cyan-300">
            <Calendar className="w-3.5 h-3.5 text-cyan-400" />
            <span>OPERATIONAL CALENDAR</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-tech text-slate-100 tracking-tight">
            Events &amp; Workshops
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-body leading-relaxed">
            Technical bootcamps, defense hackathons, and cadet selection inductions.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {upcomingEvents.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="bg-[#0c1222]/85 rounded-xl border border-cyan-500/20 hover:border-cyan-400/50 shadow-[0_8px_30px_rgba(0,0,0,0.6)] p-6 flex flex-col justify-between backdrop-blur-xl transition-all"
            >
              <div className="space-y-3.5">
                {/* Status & Category Bar */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-cyan-400 bg-cyan-950/40 px-2.5 py-0.5 rounded border border-cyan-500/30 uppercase">
                    {event.category}
                  </span>
                  {getStatusBadge(event.status)}
                </div>

                {/* Event Title */}
                <h3 className="text-2xl font-bold font-tech text-slate-100">
                  {event.title}
                </h3>

                {/* Date & Location Metas */}
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono pt-0.5">
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#070b14] border border-slate-800 text-slate-300">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#070b14] border border-slate-800 text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{event.location}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-300 font-body leading-relaxed">
                  {event.description}
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-end">
                {event.status !== "Completed" ? (
                  <button
                    onClick={onOpenRegister}
                    className="cyber-btn-primary !h-[38px] !text-xs !py-0 !px-4"
                  >
                    <span>{event.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <span className="text-xs font-mono text-slate-500 font-bold">
                    Concluded
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default UpcomingEvents;
