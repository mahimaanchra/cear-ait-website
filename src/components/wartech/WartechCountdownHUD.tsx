"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Flame,
  ShieldAlert,
  Users,
  Trophy,
  ArrowRight,
  Sparkles,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Download,
  Share2,
  Activity,
  Layers,
  ChevronDown,
  ChevronUp,
  Zap,
  Crosshair,
} from "lucide-react";
import { wartechChampionshipConfig, wartechTracks } from "@/data/siteData";

interface WartechCountdownHUDProps {
  onOpenRegister?: (trackId?: string) => void;
  onOpenRulebook?: () => void;
  className?: string;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export function WartechCountdownHUD({
  onOpenRegister,
  onOpenRulebook,
  className = "",
}: WartechCountdownHUDProps) {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  const [copiedCalendar, setCopiedCalendar] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [selectedSectorFilter, setSelectedSectorFilter] = useState<string>("All");

  const filteredBreakdownTracks = useMemo(() => {
    if (selectedSectorFilter === "All") return wartechTracks;
    return wartechTracks.filter((t) => t.radarSector === selectedSectorFilter);
  }, [selectedSectorFilter]);

  // Calculate live ticking difference
  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(wartechChampionshipConfig.registrationDeadlineIso).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isExpired: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const totalSlots = wartechChampionshipConfig.totalSlots;
  const filledSlots = wartechChampionshipConfig.filledSlots;
  const fillPercentage = Math.round((filledSlots / totalSlots) * 100);
  const remainingSlots = totalSlots - filledSlots;

  const handleDownloadICS = () => {
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//CEAR AIT//Wartech 2026//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      "SUMMARY:Wartech 2026 National Robotics Championship - Registration Close",
      `DESCRIPTION:Final deadline to register teams for Wartech 2026 at Army Institute of Technology, Pune. Prize pool ₹2,45,000 across 8 battlegrounds.`,
      "LOCATION:Army Institute of Technology, Alandi Road, Dighi, Pune 411015",
      "DTSTART:20261115T182959Z",
      "DTEND:20261115T182959Z",
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Wartech2026-Deadline.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setCopiedCalendar(true);
    setTimeout(() => setCopiedCalendar(false), 2400);
  };

  return (
    <div
      className={`relative w-full rounded-[32px] sm:rounded-[36px] bg-gradient-to-br from-[#240d2b] via-[#32123c] to-[#1c0822] text-white p-6 sm:p-10 shadow-[0_20px_60px_-15px_rgba(36,13,43,0.35)] border border-white/10 overflow-hidden font-body ${className}`}
    >
      {/* Specular Edge Highlights */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ff6b35]/60 to-transparent" />
      <div className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#ff6b35]/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#3b1646]/40 blur-3xl" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        {/* Left: Urgency Header & Capacity Telemetry */}
        <div className="space-y-4 max-w-xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff6b35]/20 border border-[#ff6b35]/40 text-[#ff6b35] text-[11px] font-mono font-semibold tracking-wider uppercase shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#ff6b35] animate-ping" />
              <span>Registration Radar Active</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white/80 text-[11px] font-mono">
              <Activity className="w-3 h-3 text-[#ff6b35]" />
              <span>{wartechChampionshipConfig.phaseLabel}</span>
            </span>
          </div>

          <div>
            <h3 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white flex items-center gap-2">
              <span>National Registration Countdown</span>
            </h3>
            <p className="text-xs sm:text-sm text-white/70 font-body leading-relaxed mt-1">
              Final call for collegiate engineering teams. Secure an official slot across 8 battle arenas before the allocation window terminates.
            </p>
          </div>

          {/* Slot Allocation Progress Bar */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2.5 backdrop-blur-md">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-white/60 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#ff6b35]" />
                <span>ARENA CAPACITY:</span>
              </span>
              <span className="font-bold text-white">
                <span className="text-[#ff6b35]">{filledSlots}</span> / {totalSlots} Teams Verified ({fillPercentage}%)
              </span>
            </div>

            {/* Segmented Meter Bar */}
            <div className="w-full h-2.5 bg-black/40 rounded-full overflow-hidden p-0.5 border border-white/10 relative">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${fillPercentage}%` }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="h-full rounded-full bg-gradient-to-r from-[#ff6b35] via-[#ff9248] to-[#ff6b35] shadow-[0_0_12px_rgba(255,107,53,0.8)]"
              />
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-white/60">
              <span className="text-amber-400 font-medium flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                <span>{remainingSlots} slots remaining</span>
              </span>
              <span>Deadline: {wartechChampionshipConfig.registrationDeadlineFormatted}</span>
            </div>
          </div>
        </div>

        {/* Right: Digital Ticking Countdown Clock & CTA Matrix */}
        <div className="flex flex-col items-stretch sm:items-end gap-6 shrink-0">
          <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center">
            {[
              { label: "DAYS", value: timeLeft.days },
              { label: "HOURS", value: timeLeft.hours },
              { label: "MINS", value: timeLeft.minutes },
              { label: "SECS", value: timeLeft.seconds },
            ].map((unit) => (
              <div
                key={unit.label}
                className="p-3 sm:p-4 rounded-2xl bg-black/30 border border-white/10 backdrop-blur-md flex flex-col items-center justify-center min-w-[64px] sm:min-w-[80px] shadow-inner"
              >
                <span className="text-2xl sm:text-4xl font-black font-display text-white tracking-tight tabular-nums">
                  {String(unit.value).padStart(2, "0")}
                </span>
                <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-white/50 mt-1 font-semibold">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>

          {/* Quick Action Dock */}
          <div className="flex flex-wrap items-center justify-end gap-2.5 w-full">
            <button
              onClick={() => setShowBreakdown(!showBreakdown)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-mono text-white/90 hover:text-white transition-all cursor-pointer shadow-xs active:scale-98"
              title="Toggle arena capacity breakdown"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Track Slots (8 Arenas)</span>
              {showBreakdown ? (
                <ChevronUp className="w-3.5 h-3.5 text-white/60" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 text-white/60" />
              )}
            </button>

            <button
              onClick={handleDownloadICS}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-mono text-white/90 hover:text-white transition-all cursor-pointer shadow-xs active:scale-98"
              title="Add deadline to Calendar"
            >
              {copiedCalendar ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Calendar className="w-3.5 h-3.5 text-[#ff6b35]" />
              )}
              <span>{copiedCalendar ? "Exported .ICS" : "Add to Calendar"}</span>
            </button>

            <button
              onClick={onOpenRulebook}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-mono text-white/90 hover:text-white transition-all cursor-pointer shadow-xs active:scale-98"
            >
              <span>Handbook</span>
            </button>

            <button
              onClick={() => onOpenRegister?.()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#ff6b35] hover:bg-[#fa5519] text-white text-xs font-medium font-body transition-all shadow-[0_4px_20px_rgba(255,107,53,0.45)] cursor-pointer hover:scale-102 active:scale-98"
            >
              <span>Secure Arena Slot</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Expandable 8-Track Battleground Allocation Drawer */}
      <AnimatePresence>
        {showBreakdown && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 24 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="border-t border-white/10 pt-6 space-y-4 overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="font-display font-bold text-sm tracking-tight text-white flex items-center gap-2">
                  <Crosshair className="w-4 h-4 text-[#ff6b35]" />
                  <span>Individual Battleground Allocation Roster</span>
                </h4>
                <p className="text-xs text-white/60 font-body">
                  Select any championship track to open instant team registration pre-assigned to that battleground.
                </p>
              </div>

              {/* Sector Filter Chips */}
              <div className="flex items-center gap-1.5 p-1 rounded-full bg-black/30 border border-white/10 text-xs font-mono self-start sm:self-auto">
                {["All", "Alpha Combat", "Bravo Autonomy", "Gamma Dynamic"].map((sector) => (
                  <button
                    key={sector}
                    onClick={() => setSelectedSectorFilter(sector)}
                    className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                      selectedSectorFilter === sector
                        ? "bg-[#ff6b35] text-white font-bold shadow-xs"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    {sector === "All" ? "All Arenas" : sector.replace(" ", " ")}
                  </button>
                ))}
              </div>
            </div>

            {/* Battleground Grid Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {filteredBreakdownTracks.map((track) => {
                const trackFillPct = Math.round(((track.filledSlots || 24) / (track.maxSlots || 32)) * 100);
                const trackRemaining = (track.maxSlots || 32) - (track.filledSlots || 24);

                return (
                  <div
                    key={track.id}
                    className="p-4 rounded-2xl bg-black/25 border border-white/10 hover:border-[#ff6b35]/40 transition-all space-y-3 group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-mono text-[#ff6b35] font-bold block">
                          {track.trackCode} &bull; {track.radarSector}
                        </span>
                        <h5 className="font-display font-bold text-sm text-white group-hover:text-[#ff6b35] transition-colors mt-0.5">
                          {track.title}
                        </h5>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 shrink-0">
                        {track.prizePool}
                      </span>
                    </div>

                    {/* Filling Rate Bar */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11px] font-mono text-white/60">
                        <span>Allocation:</span>
                        <span className="text-white font-bold">
                          {track.filledSlots || 24}/{track.maxSlots || 32} ({trackFillPct}%)
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden p-0.5 border border-white/10">
                        <div
                          style={{ width: `${trackFillPct}%` }}
                          className={`h-full rounded-full ${
                            trackFillPct >= 85 ? "bg-[#ff6b35]" : "bg-emerald-400"
                          }`}
                        />
                      </div>
                      <span className="text-[10px] font-mono text-amber-400 block pt-0.5">
                        {trackRemaining} slots remaining
                      </span>
                    </div>

                    {/* Quick Register Button */}
                    <button
                      onClick={() => onOpenRegister?.(track.id)}
                      className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl bg-white/10 hover:bg-[#ff6b35] text-white text-xs font-mono transition-all cursor-pointer border border-white/10 hover:border-transparent active:scale-98"
                    >
                      <span>Direct Register</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default WartechCountdownHUD;
