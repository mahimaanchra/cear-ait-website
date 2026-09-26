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
    badge: "OCTOBER 2026",
    badgeColor: "red",
    category: "FLAGSHIP",
    title: "Wartech 2026",
    tagline: "National Robotics Championship: 8 Combat & Autonomous Arenas.",
    date: "October 14–16, 2026",
    countdown: "14 Days",
    location: "Lab 104 & Campus Arena, AIT Pune",
    perks: [
      { label: "PRIZE POOL", value: "₹1,50,000+" },
      { label: "ARENAS", value: "8 Sub-Tracks" },
    ],
    primaryCtaText: "Register for Wartech",
    registerTrackId: "robo-soccer",
    detailsHref: "#wartech",
  },
  {
    id: "inductions-2026",
    badge: "RECRUITMENT",
    badgeColor: "emerald",
    category: "ANNUAL",
    title: "CEAR Inductions",
    tagline: "Recruiting FE & SE cadets across AI, hardware, and robotics.",
    date: "October 2026",
    countdown: "Live",
    location: "Manekshaw Hall & Lab 104",
    perks: [
      { label: "ELIGIBILITY", value: "FE & SE Cadets" },
      { label: "DOMAINS", value: "Hardware & AI" },
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
    <div className="w-full max-w-md bg-white border-[3px] border-ink rounded-[22px_27px_20px_25px_/_27px_20px_25px_22px] shadow-[6px_7px_0_#14140f] -rotate-1 hover:rotate-0 transition-transform duration-200 relative overflow-hidden flex flex-col justify-between font-body">
      {/* Top Banner Accent Stripe */}
      <div className="h-2 w-full bg-alarm border-b-2 border-ink" />

      {/* Card Header: Live Status & Switcher */}
      <div className="p-5 pb-3 border-b-2 border-ink/15 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-alarm opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-alarm border border-ink" />
          </span>
          <span className="text-[11px] font-mono font-black tracking-wider uppercase text-ink bg-paper px-2.5 py-0.5 rounded-full border-2 border-ink shadow-[2px_2px_0_#14140f]">
            {activeEvent.badge}
          </span>
        </div>

        <span className="text-[10px] font-mono font-black text-ink-muted uppercase tracking-wider">
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
            transition={{ duration: 0.18 }}
            className="space-y-4"
          >
            {/* Title & Tagline */}
            <div>
              <h3 className="text-2xl font-black font-tech text-ink tracking-tight flex items-center gap-2">
                <span>{activeEvent.title}</span>
                <Flame className="w-5 h-5 text-alarm shrink-0 animate-bounce" />
              </h3>
              <p className="text-xs text-ink/80 font-body font-semibold mt-1 leading-relaxed">
                {activeEvent.tagline}
              </p>
            </div>

            {/* Schedule & Location in a single clean block */}
            <div className="p-3 rounded-xl bg-paper border-2 border-ink space-y-1.5 font-mono text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-ink">
                  <Calendar className="w-3.5 h-3.5 text-ink shrink-0" />
                  <span>{activeEvent.date}</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-ink text-white font-black animate-pulse">
                  {activeEvent.countdown}
                </span>
              </div>
              <div className="flex items-center gap-2 text-ink/75 text-[11px] font-semibold">
                <MapPin className="w-3.5 h-3.5 text-ink/70 shrink-0" />
                <span className="truncate">{activeEvent.location}</span>
              </div>
            </div>

            {/* Tactile Meter Track with Animated Hazard Stripes */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[10px] font-mono font-bold text-ink">
                <span>SLOT FILL RATE</span>
                <span className="text-alarm font-black">84% CAPACITY</span>
              </div>
              <div className="paper-track">
                <div className="paper-track-fill hazard-stripes" style={{ width: "84%" }} />
                <div className="paper-track-need" style={{ left: "84%" }} />
              </div>
            </div>

            {/* 2 Perks in a minimal horizontal split */}
            <div className="grid grid-cols-2 gap-2 font-mono">
              {activeEvent.perks.map((perk, i) => (
                <div
                  key={i}
                  className="px-3 py-2 rounded-xl bg-paper/60 border border-ink/40 text-left"
                >
                  <span className="block text-[9px] uppercase tracking-wider text-ink/60 font-bold">
                    {perk.label}
                  </span>
                  <span className="block text-xs font-black text-ink font-tech">
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
            className="flex-1 btn-paper-red !h-[42px] !text-xs !py-0 !px-4"
          >
            <span>{activeEvent.primaryCtaText}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <Link
            href={activeEvent.detailsHref}
            className="btn-paper-secondary !h-[42px] !text-xs !py-0 !px-4"
            title="Explore event details"
          >
            <span>Details</span>
          </Link>
        </div>

        {/* Event Quick-Switch Carousel Tabs */}
        <div className="pt-3 border-t-2 border-ink/15 flex items-center justify-between text-[11px] font-mono text-ink">
          <span className="text-[10px] uppercase font-black text-ink-muted">SWITCH:</span>
          <div className="flex items-center gap-1.5">
            {spotlightEvents.map((evt, idx) => (
              <button
                key={evt.id}
                onClick={() => setCurrentIndex(idx)}
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-black transition-all cursor-pointer border-2 border-ink ${
                  currentIndex === idx
                    ? "bg-ink text-paper shadow-[2px_2px_0_#14140f] -translate-y-0.5"
                    : "bg-white text-ink hover:bg-paper"
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
