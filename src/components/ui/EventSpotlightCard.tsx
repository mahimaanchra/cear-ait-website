"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, ArrowRight, ChevronRight } from "lucide-react";

interface EventSpotlightCardProps {
  onOpenRegister?: (trackId?: string) => void;
}

interface SpotlightItem {
  id: string;
  badge: string;
  category: string;
  title: string;
  tagline: string;
  date: string;
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
    category: "NATIONAL FLAGSHIP",
    title: "Wartech 2026",
    tagline: "National Robotics Championship: 8 Combat & Autonomous Arenas.",
    date: "October 14–16, 2026",
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
    category: "CADET SELECTION",
    title: "CEAR Inductions",
    tagline: "Recruiting FE & SE engineering cadets across AI, hardware, and embedded robotics.",
    date: "October 2026",
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
    <div className="w-full max-w-md bg-white border border-[#0d1321]/[0.08] rounded-3xl shadow-[0_15px_40px_-15px_rgba(13,19,33,0.06)] overflow-hidden flex flex-col justify-between font-body">
      {/* Top Banner Accent */}
      <div className="h-1.5 w-full bg-[#0d1321]" />

      <div className="p-6 sm:p-7 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono tracking-widest uppercase text-[#0d1321]/50 bg-[#fafaf9] border border-[#0d1321]/[0.08] px-3 py-1 rounded-full">
            {activeEvent.category}
          </span>
          <div className="flex gap-1.5">
            {spotlightEvents.map((ev, i) => (
              <button
                key={ev.id}
                onClick={() => setCurrentIndex(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentIndex === i ? "bg-[#0d1321] w-4" : "bg-[#0d1321]/20"
                }`}
              />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold font-display text-[#0d1321]">
            {activeEvent.title}
          </h3>
          <p className="text-xs sm:text-sm text-[#0d1321]/70 mt-1">
            {activeEvent.tagline}
          </p>
        </div>

        <div className="space-y-1.5 text-xs font-mono text-[#0d1321]/60">
          <p className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-[#0d1321]" />
            <span>{activeEvent.date}</span>
          </p>
          <p className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#0d1321]" />
            <span>{activeEvent.location}</span>
          </p>
        </div>

        <div className="pt-2 flex items-center gap-2">
          {activeEvent.perks.map((p, idx) => (
            <div key={idx} className="p-2.5 rounded-xl bg-[#fafaf9] border border-[#0d1321]/[0.06] text-xs font-mono">
              <span className="text-[#0d1321]/50 block text-[9px]">{p.label}</span>
              <span className="font-bold text-[#0d1321]">{p.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 pt-0 flex items-center justify-between">
        <Link href={activeEvent.detailsHref} className="text-xs font-mono text-[#0d1321]/60 hover:text-[#0d1321]">
          Learn more
        </Link>
        <button
          onClick={handleRegisterClick}
          className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-medium bg-[#0d1321] text-white hover:bg-[#1a2640] transition-colors"
        >
          <span>{activeEvent.primaryCtaText}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

export default EventSpotlightCard;
