"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  MapPin,
  ArrowRight,
  Sparkles,
  Clock,
  Trophy,
  Users,
  Copy,
  Check,
  Zap,
} from "lucide-react";

interface EventSpotlightCardProps {
  onOpenRegister?: (trackId?: string) => void;
  className?: string;
}

interface SpotlightItem {
  id: string;
  badge: string;
  category: string;
  title: string;
  tagline: string;
  date: string;
  targetDate: string; // ISO string for countdown
  location: string;
  perks: { label: string; value: string; icon?: string }[];
  primaryCtaText: string;
  registerTrackId?: string;
  detailsHref: string;
  accentColor: string;
}

const spotlightEvents: SpotlightItem[] = [
  {
    id: "wartech-2026",
    badge: "FLAGSHIP CHAMPIONSHIP",
    category: "NATIONAL ROBOTICS",
    title: "Wartech 2026",
    tagline: "National inter-collegiate championship: 8 Combat, Autonomous & Aerial Arenas.",
    date: "October 14–16, 2026",
    targetDate: "2026-10-14T09:00:00+05:30",
    location: "Lab 104 & Campus Arena, AIT Pune",
    perks: [
      { label: "PRIZE POOL", value: "₹1,50,000+" },
      { label: "ARENAS", value: "8 COMBAT TRACKS" },
      { label: "TEAMS", value: "50+ COLLEGES" },
    ],
    primaryCtaText: "Register for Wartech",
    registerTrackId: "robo-soccer",
    detailsHref: "#wartech",
    accentColor: "#ff6b35",
  },
  {
    id: "inductions-2026",
    badge: "CADET RECRUITMENT",
    category: "SELECTION DRIVE",
    title: "CEAR Inductions 2026",
    tagline: "Recruiting FE & SE engineering cadets across AI, hardware, embedded circuits, and flight telemetry.",
    date: "October 2026",
    targetDate: "2026-10-20T17:00:00+05:30",
    location: "Manekshaw Hall & Lab 104",
    perks: [
      { label: "ELIGIBILITY", value: "FE & SE CADETS" },
      { label: "RESEARCH WINGS", value: "4 DOMAINS" },
      { label: "ACCELERATORS", value: "JETSON + ROS2" },
    ],
    primaryCtaText: "Apply for Inductions",
    registerTrackId: undefined,
    detailsHref: "#events",
    accentColor: "#240d2b",
  },
];

export function EventSpotlightCard({ onOpenRegister, className = "" }: EventSpotlightCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const activeEvent = spotlightEvents[currentIndex];

  // Countdown timer logic
  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(activeEvent.targetDate).getTime();
      const now = new Date().getTime();
      const diff = Math.max(0, target - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [activeEvent.targetDate]);

  const handleRegisterClick = () => {
    if (onOpenRegister) {
      onOpenRegister(activeEvent.registerTrackId);
    }
  };

  const handleCopyShare = () => {
    const shareText = `[CEAR AIT Pune] ${activeEvent.title} — ${activeEvent.tagline} | Date: ${activeEvent.date} at ${activeEvent.location}. Details: https://cear.aitpune.in/${activeEvent.detailsHref}`;
    navigator.clipboard?.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <div
      className={`relative w-full rounded-[32px] sm:rounded-[36px] bg-white/85 backdrop-blur-2xl border border-white/90 shadow-[0_20px_50px_-15px_rgba(36,13,43,0.1)] overflow-hidden flex flex-col justify-between font-body group ${className}`}
    >
      {/* Top Specular Inner Bevel Highlight */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent z-10" />

      {/* Top Banner Accent Stripe */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#ff6b35] via-[#240d2b] to-[#ff6b35]" />

      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-gradient-to-bl from-[#ff6b35]/10 to-transparent blur-2xl pointer-events-none" />

      <div className="p-6 sm:p-8 space-y-6 relative z-10">
        {/* Header Tabs & Selector */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 p-1 rounded-full bg-[#240d2b]/[0.05] border border-[#240d2b]/[0.06]">
            {spotlightEvents.map((ev, i) => (
              <button
                key={ev.id}
                onClick={() => setCurrentIndex(i)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all cursor-pointer ${
                  currentIndex === i
                    ? "bg-[#240d2b] text-white shadow-xs"
                    : "text-[#240d2b]/70 hover:text-[#240d2b] hover:bg-black/5"
                }`}
              >
                {ev.badge}
              </button>
            ))}
          </div>

          <button
            onClick={handleCopyShare}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-mono text-[#240d2b]/65 hover:text-[#240d2b] bg-white/80 border border-white/90 hover:border-[#240d2b]/20 shadow-xs transition-colors cursor-pointer"
            title="Copy shareable event details"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-600" />
                <span className="text-emerald-600 font-bold">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Share</span>
              </>
            )}
          </button>
        </div>

        {/* Dynamic Content Transition */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeEvent.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="space-y-4"
          >
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-[#ff6b35] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b35] animate-ping" />
                <span>{activeEvent.category}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black font-display text-[#240d2b] tracking-tight">
                {activeEvent.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#240d2b]/75 leading-relaxed font-body">
                {activeEvent.tagline}
              </p>
            </div>

            {/* Live Ticker Countdown */}
            <div className="p-3.5 rounded-2xl bg-[#240d2b]/[0.03] border border-[#240d2b]/[0.06] flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-[#240d2b]/60">
                <Clock className="w-3.5 h-3.5 text-[#ff6b35]" />
                <span className="uppercase tracking-wider text-[10px]">T-MINUS COUNTDOWN:</span>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs">
                <div className="text-center">
                  <span className="font-bold text-[#240d2b]">{timeLeft.days}</span>
                  <span className="text-[9px] text-[#240d2b]/50 ml-0.5">d</span>
                </div>
                <span className="text-[#240d2b]/30">:</span>
                <div className="text-center">
                  <span className="font-bold text-[#240d2b]">{String(timeLeft.hours).padStart(2, "0")}</span>
                  <span className="text-[9px] text-[#240d2b]/50 ml-0.5">h</span>
                </div>
                <span className="text-[#240d2b]/30">:</span>
                <div className="text-center">
                  <span className="font-bold text-[#240d2b]">{String(timeLeft.minutes).padStart(2, "0")}</span>
                  <span className="text-[9px] text-[#240d2b]/50 ml-0.5">m</span>
                </div>
                <span className="text-[#240d2b]/30">:</span>
                <div className="text-center">
                  <span className="font-bold text-[#ff6b35]">{String(timeLeft.seconds).padStart(2, "0")}</span>
                  <span className="text-[9px] text-[#240d2b]/50 ml-0.5">s</span>
                </div>
              </div>
            </div>

            {/* Logistics info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-[#240d2b]/70 pt-1">
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-[#ff6b35] shrink-0" />
                <span>{activeEvent.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#ff6b35] shrink-0" />
                <span className="truncate">{activeEvent.location}</span>
              </div>
            </div>

            {/* Perks & Stats */}
            <div className="grid grid-cols-3 gap-2 pt-2">
              {activeEvent.perks.map((p, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-2xl bg-white/70 border border-white/90 text-center shadow-xs"
                >
                  <span className="text-[#240d2b]/50 block text-[9px] font-mono tracking-wider uppercase">
                    {p.label}
                  </span>
                  <span className="font-bold text-xs sm:text-sm text-[#ff6b35] font-mono">
                    {p.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Action Footer */}
      <div className="p-6 sm:p-8 pt-0 flex items-center justify-between border-t border-[#240d2b]/[0.06] mt-4 relative z-10">
        <Link
          href={activeEvent.detailsHref}
          className="text-xs font-mono text-[#240d2b]/70 hover:text-[#ff6b35] transition-colors flex items-center gap-1 group/link"
        >
          <span>Explore Arena</span>
          <span className="transition-transform group-hover/link:translate-x-0.5">→</span>
        </Link>
        <button
          onClick={handleRegisterClick}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-medium bg-[#ff6b35] text-white hover:bg-[#fa5519] transition-all shadow-[0_4px_16px_rgba(255,107,53,0.35)] hover:shadow-[0_6px_22px_rgba(255,107,53,0.5)] cursor-pointer hover:scale-102 active:scale-98"
        >
          <span>{activeEvent.primaryCtaText}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

export default EventSpotlightCard;
