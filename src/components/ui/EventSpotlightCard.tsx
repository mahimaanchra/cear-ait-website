"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  MapPin,
  Trophy,
  ArrowRight,
  Flame,
  Users,
  Clock,
  Sparkles,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

interface EventSpotlightCardProps {
  onOpenRegister?: (trackId?: string) => void;
}

interface SpotlightItem {
  id: string;
  badge: string;
  badgeColor: "red" | "emerald" | "blue" | "amber";
  category: string;
  title: string;
  tagline: string;
  date: string;
  countdown: string;
  location: string;
  perks: { label: string; value: string }[];
  primaryCtaText: string;
  registerTrackId?: string;
  detailsHref: string;
}

const spotlightEvents: SpotlightItem[] = [
  {
    id: "wartech-2026",
    badge: "FLAGSHIP COMPETITION",
    badgeColor: "red",
    category: "NATIONAL EVENT",
    title: "Wartech 2026",
    tagline: "National Robotics Championship: 8 Combat & Autonomous Arenas",
    date: "October 14–16, 2026",
    countdown: "14 Days To Go",
    location: "AIT Ground Arena & Lab 104, Pune",
    perks: [
      { label: "PRIZE POOL", value: "₹1,50,000+" },
      { label: "ARENAS", value: "8 Sub-Tracks" },
      { label: "FEATURED", value: "RoboWar & Drone FPV" },
      { label: "TEAMS", value: "National Footprint" },
    ],
    primaryCtaText: "Register for Wartech",
    registerTrackId: "robo-soccer",
    detailsHref: "#wartech",
  },
  {
    id: "inductions-2026",
    badge: "RECRUITMENT DRIVE",
    badgeColor: "emerald",
    category: "ANNUAL INDUCTIONS",
    title: "CEAR Inductions 2026",
    tagline: "Join the Elite Cadre: AI, Embedded Systems, Mechanics & Vision",
    date: "October 2026",
    countdown: "Applications Live",
    location: "Manekshaw Hall & CEAR Lab 104",
    perks: [
      { label: "ELIGIBILITY", value: "FE & SE Cadets" },
      { label: "DOMAINS", value: "Hardware & AI" },
      { label: "PROJECTS", value: "Defense Robotics" },
      { label: "MENTORSHIP", value: "Senior Cadre" },
    ],
    primaryCtaText: "Apply for Inductions",
    registerTrackId: undefined,
    detailsHref: "#events",
  },
];

export function EventSpotlightCard({ onOpenRegister }: EventSpotlightCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const activeEvent = spotlightEvents[currentIndex];

  const handleRegisterClick = () => {
    if (onOpenRegister) {
      onOpenRegister(activeEvent.registerTrackId);
    }
  };

  return (
    <div className="w-full max-w-md rounded-2xl bg-white border border-slate-200/90 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between font-sans">
      {/* Top Banner Accent */}
      <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-emerald-500 to-amber-500" />

      {/* Card Header: Live Status & Switcher */}
      <div className="p-5 pb-3 border-b border-slate-100 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
          </span>
          <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200">
            {activeEvent.badge}
          </span>
        </div>

        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
          {activeEvent.category}
        </span>
      </div>

      {/* Main Event Details */}
      <div className="p-6 py-4 space-y-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeEvent.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {/* Title & Tagline */}
            <div>
              <h3 className="text-2xl font-black font-tech text-slate-900 tracking-tight flex items-center gap-2">
                <span>{activeEvent.title}</span>
                <Flame className="w-5 h-5 text-amber-500 shrink-0" />
              </h3>
              <p className="text-xs text-slate-600 font-sans mt-1 leading-relaxed">
                {activeEvent.tagline}
              </p>
            </div>

            {/* Schedule & Location Pills */}
            <div className="space-y-1.5 font-mono text-xs">
              <div className="flex items-center gap-2 text-slate-700 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-100">
                <Calendar className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span className="font-semibold text-slate-800">{activeEvent.date}</span>
                <span className="ml-auto text-[10px] px-2 py-0.5 rounded bg-blue-100/80 text-blue-700 font-bold">
                  {activeEvent.countdown}
                </span>
              </div>

              <div className="flex items-center gap-2 text-slate-600 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-100">
                <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="truncate">{activeEvent.location}</span>
              </div>
            </div>

            {/* 4-Item Metric Perks Grid */}
            <div className="grid grid-cols-2 gap-2 pt-1 font-mono">
              {activeEvent.perks.map((perk, i) => (
                <div
                  key={i}
                  className="p-2 rounded-lg bg-slate-50/80 border border-slate-100 text-left"
                >
                  <span className="block text-[9px] uppercase tracking-wider text-slate-400 font-bold">
                    {perk.label}
                  </span>
                  <span className="block text-xs font-bold text-slate-900 font-tech">
                    {perk.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Action Buttons */}
      <div className="p-5 pt-2 space-y-3">
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleRegisterClick}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-tech font-bold text-xs sm:text-sm py-2.5 px-4 rounded-xl shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer group"
          >
            <span>{activeEvent.primaryCtaText}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>

          <Link
            href={activeEvent.detailsHref}
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-mono font-bold text-xs py-2.5 px-3.5 rounded-xl border border-slate-200 transition-colors flex items-center justify-center shrink-0"
            title="Explore event details"
          >
            <span>Details</span>
          </Link>
        </div>

        {/* Event Quick-Switch Carousel Tabs */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-500">
          <span className="text-[10px] uppercase font-bold text-slate-400">SPOTLIGHT:</span>
          <div className="flex items-center gap-1.5">
            {spotlightEvents.map((evt, idx) => (
              <button
                key={evt.id}
                onClick={() => setCurrentIndex(idx)}
                className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                  currentIndex === idx
                    ? "bg-logo-navy text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {idx === 0 ? "01. Wartech" : "02. Inductions"}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventSpotlightCard;
