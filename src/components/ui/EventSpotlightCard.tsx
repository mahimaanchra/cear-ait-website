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
  Radio,
  Zap,
} from "lucide-react";

interface EventSpotlightCardProps {
  onOpenRegister?: (trackId?: string) => void;
}

interface SpotlightItem {
  id: string;
  badge: string;
  badgeColor: "crimson" | "emerald" | "cyan";
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
    badge: "OCTOBER 2026",
    badgeColor: "crimson",
    category: "NATIONAL FLAGSHIP",
    title: "Wartech 2026",
    tagline: "National Robotics Championship: 8 Combat & Autonomous Arenas.",
    date: "October 14–16, 2026",
    countdown: "T-14 DAYS",
    location: "Lab 104 & Campus Arena, AIT Pune",
    perks: [
      { label: "PRIZE POOL", value: "₹1,50,000+" },
      { label: "ARENAS", value: "8 COMBAT TRACKS" },
    ],
    primaryCtaText: "Register for Wartech",
    registerTrackId: "robo-soccer",
    detailsHref: "#wartech",
  },
  {
    id: "inductions-2026",
    badge: "RECRUITMENT",
    badgeColor: "emerald",
    category: "CADET SELECTION",
    title: "CEAR Inductions",
    tagline: "Recruiting FE & SE engineering cadets across AI, hardware, and embedded robotics.",
    date: "October 2026",
    countdown: "TELEMETRY LIVE",
    location: "Manekshaw Hall & Lab 104",
    perks: [
      { label: "ELIGIBILITY", value: "FE & SE CADETS" },
      { label: "DOMAINS", value: "AI & HARDWARE" },
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
    <div className="w-full max-w-md bg-[#0a101d]/90 border border-cyan-500/35 rounded-xl shadow-[0_10px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(0,240,255,0.15)] relative overflow-hidden flex flex-col justify-between font-body backdrop-blur-xl">
      {/* Corner HUD Laser Brackets */}
      <div className="cyber-bracket-top-left" />
      <div className="cyber-bracket-bottom-right" />

      {/* Top Banner Accent Laser Stripe */}
      <div className="h-1 w-full bg-gradient-to-r from-cyan-400 via-rose-500 to-cyan-400 shadow-[0_0_10px_#00f0ff]" />

      {/* Card Header: Live Telemetry Status & Switcher */}
      <div className="p-5 pb-3 border-b border-cyan-500/20 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500 shadow-[0_0_6px_#ff3366]" />
          </span>
          <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-cyan-400 bg-cyan-950/40 px-2.5 py-0.5 rounded border border-cyan-500/30">
            {activeEvent.badge}
          </span>
        </div>

        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
          <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
          <span>{activeEvent.category}</span>
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
            transition={{ duration: 0.18 }}
            className="space-y-4"
          >
            {/* Title & Tagline */}
            <div>
              <h3 className="text-2xl font-black font-tech text-slate-100 tracking-tight flex items-center gap-2">
                <span>{activeEvent.title}</span>
                <Flame className="w-5 h-5 text-rose-500 shrink-0" />
              </h3>
              <p className="text-xs text-slate-300 font-body font-medium mt-1 leading-relaxed">
                {activeEvent.tagline}
              </p>
            </div>

            {/* Schedule & Location */}
            <div className="p-3 rounded-lg bg-[#070b14]/90 border border-slate-800 space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-semibold text-slate-200">
                  <Calendar className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>{activeEvent.date}</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/15 border border-rose-500/40 text-rose-400 font-bold">
                  {activeEvent.countdown}
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="truncate">{activeEvent.location}</span>
              </div>
            </div>

            {/* Telemetry Capacity Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[10px] font-mono font-bold">
                <span className="text-slate-400">SLOT FILL TELEMETRY</span>
                <span className="text-rose-400">84% CAPACITY [REG OPEN]</span>
              </div>
              <div className="h-2 w-full bg-slate-900 border border-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 via-emerald-400 to-rose-500 shadow-[0_0_8px_rgba(0,240,255,0.6)]"
                  style={{ width: "84%" }}
                />
              </div>
            </div>

            {/* Perks in Split Module */}
            <div className="grid grid-cols-2 gap-2 font-mono">
              {activeEvent.perks.map((perk, i) => (
                <div
                  key={i}
                  className="px-3 py-2 rounded-lg bg-[#080d1a] border border-cyan-500/20 text-left"
                >
                  <span className="block text-[9px] uppercase tracking-wider text-slate-400 font-bold">
                    {perk.label}
                  </span>
                  <span className="block text-xs font-black text-cyan-300 font-tech">
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
            className="flex-1 cyber-btn-crimson !h-[42px] !text-xs !py-0 !px-4"
          >
            <span>{activeEvent.primaryCtaText}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <Link
            href={activeEvent.detailsHref}
            className="cyber-btn-secondary !h-[42px] !text-xs !py-0 !px-4"
            title="Explore event details"
          >
            <span>Details</span>
          </Link>
        </div>

        {/* Quick-Switch Tabs */}
        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
          <span className="text-[10px] uppercase font-bold text-slate-500">TERMINAL:</span>
          <div className="flex items-center gap-1.5">
            {spotlightEvents.map((evt, idx) => (
              <button
                key={evt.id}
                onClick={() => setCurrentIndex(idx)}
                className={`px-2.5 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer border ${
                  currentIndex === idx
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-400/50 shadow-[0_0_8px_rgba(0,240,255,0.3)]"
                    : "bg-slate-900/60 text-slate-400 border-slate-800 hover:border-slate-700"
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
