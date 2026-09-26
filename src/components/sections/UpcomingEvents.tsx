"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, ArrowRight, CheckCircle2, Clock, Sparkles, X } from "lucide-react";
import { EventItem } from "@/data/siteData";
import { useSiteContent } from "@/context/SiteContentContext";

interface UpcomingEventsProps {
  onOpenRegister?: () => void;
}

export function UpcomingEvents({ onOpenRegister }: UpcomingEventsProps) {
  const { upcomingEvents } = useSiteContent();
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  const getStatusBadge = (status: EventItem["status"]) => {
    switch (status) {
      case "Ongoing":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-mono font-black bg-alarm text-white border-2 border-ink shadow-[2px_2px_0_#14140f] animate-pulse">
            <span className="w-2 h-2 rounded-full bg-white border border-ink animate-ping" />
            <span>Ongoing</span>
          </span>
        );
      case "Upcoming":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-mono font-black bg-ink text-white border-2 border-ink shadow-[2px_2px_0_#14140f]">
            <span className="w-2 h-2 rounded-full bg-white border border-ink" />
            <span>Upcoming</span>
          </span>
        );
      case "Completed":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-mono font-black bg-paper text-ink/60 border-2 border-ink shadow-[2px_2px_0_#14140f]">
            <span>Completed</span>
          </span>
        );
    }
  };

  return (
    <section id="events" className="relative py-24 sm:py-32 bg-paper border-b-[2.5px] border-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Section Header */}
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-paper border-2 border-ink shadow-[2px_2px_0_#14140f] text-xs font-mono font-black text-ink mb-1 -rotate-1">
            <span>CADRE TIMELINE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-tech text-ink tracking-tight">
            Events &amp; Workshops
          </h2>
          <p className="text-sm sm:text-base text-ink/80 font-body font-semibold leading-relaxed">
            Hands-on technical bootcamps, hardware hackathons, and annual recruitments.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {upcomingEvents.map((event, idx) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -6, scale: 1.02, rotate: idx % 2 === 0 ? -1.5 : 1.5 }}
              transition={{ type: "spring", stiffness: 350, damping: 18 }}
              className="bg-white rounded-[20px_24px_18px_22px_/_24px_18px_22px_20px] border-[2.5px] border-ink shadow-[4px_5px_0_#14140f] p-6 flex flex-col justify-between cursor-default"
            >
              <div className="space-y-3.5">
                {/* Status & Category Bar */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-black text-ink bg-paper px-2.5 py-0.5 rounded-full border-2 border-ink shadow-[1.5px_1.5px_0_#14140f] uppercase">
                    {event.category}
                  </span>
                  {getStatusBadge(event.status)}
                </div>

                {/* Event Title */}
                <h3 className="text-2xl font-black font-tech text-ink">
                  {event.title}
                </h3>

                {/* Date & Location Metas */}
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono pt-0.5">
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-paper border-2 border-ink shadow-[1.5px_1.5px_0_#14140f] text-ink font-bold">
                    <Calendar className="w-3.5 h-3.5 text-ink" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-paper border-2 border-ink shadow-[1.5px_1.5px_0_#14140f] text-ink/80 font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-ink" />
                    <span>{event.location}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-ink/80 font-body font-semibold leading-relaxed">
                  {event.description}
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-4 mt-4 border-t-2 border-ink/10 flex items-center justify-end">
                {event.status !== "Completed" ? (
                  <button
                    onClick={onOpenRegister}
                    className="btn-paper-primary !h-[38px] !text-xs !py-0 !px-4 hover-wiggle"
                  >
                    <span>{event.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                ) : (
                  <span className="text-xs font-mono text-ink/60 font-bold">
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
