"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, ArrowRight, CheckCircle2, Clock, Sparkles, X } from "lucide-react";
import { upcomingEvents, EventItem } from "@/data/siteData";

interface UpcomingEventsProps {
  onOpenRegister?: () => void;
}

export function UpcomingEvents({ onOpenRegister }: UpcomingEventsProps) {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  const getStatusBadge = (status: EventItem["status"]) => {
    switch (status) {
      case "Ongoing":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-50 text-amber-800 border border-amber-200">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span>Ongoing</span>
          </span>
        );
      case "Upcoming":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Upcoming</span>
          </span>
        );
      case "Completed":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-slate-100 text-slate-600 border border-slate-200">
            <span>Completed</span>
          </span>
        );
    }
  };

  return (
    <section id="events" className="relative py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-blue-100 text-blue-800 text-xs font-mono font-bold uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5 text-blue-700" />
            <span>TRAINING CALENDAR &amp; SESSIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-tech text-slate-900 tracking-tight">
            Key Events &amp; Workshops
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
            Hands-on hardware bootcamps, annual cadet inductions, and technical guest workshops hosted at the CEAR Robotics Wing.
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
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="bg-white rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all p-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Status & Category Bar */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-slate-500 uppercase">
                    {event.category}
                  </span>
                  {getStatusBadge(event.status)}
                </div>

                {/* Event Title */}
                <h3 className="text-xl font-bold font-tech text-slate-900">
                  {event.title}
                </h3>

                {/* Date & Location Metas */}
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-500 pt-1">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-blue-600" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{event.location}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                  {event.description}
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400 font-semibold">
                  AIT PUNE CAMPUS
                </span>

                {event.status !== "Completed" ? (
                  <button
                    onClick={onOpenRegister}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
                  >
                    <span>{event.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <span className="text-xs font-mono text-slate-400 font-semibold">
                    Session Concluded
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
