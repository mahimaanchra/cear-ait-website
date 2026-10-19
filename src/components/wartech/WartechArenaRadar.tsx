"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Crosshair,
  Radio,
  Trophy,
  Flame,
  Zap,
  Compass,
  Grab,
  Route,
  Layers,
  ShieldAlert,
  ArrowRight,
  Shield,
  Activity,
  AlertTriangle,
  X,
  Users,
  CheckCircle2,
  Filter,
} from "lucide-react";
import { wartechTracks, WartechTrack } from "@/data/siteData";
import { GlassCard } from "@/components/ui/GlassCard";

interface WartechArenaRadarProps {
  onOpenRegister?: (trackId?: string) => void;
  className?: string;
}

type SectorFilter = "all" | "Alpha Combat" | "Bravo Autonomy" | "Gamma Dynamic" | "filling_fast";

const iconMap: Record<string, React.ReactNode> = {
  Trophy: <Trophy className="w-4 h-4 text-[#ff6b35]" />,
  Flame: <Flame className="w-4 h-4 text-[#ff6b35]" />,
  Compass: <Compass className="w-4 h-4 text-emerald-500" />,
  ShieldAlert: <ShieldAlert className="w-4 h-4 text-amber-500" />,
  Route: <Route className="w-4 h-4 text-blue-500" />,
  Grab: <Grab className="w-4 h-4 text-emerald-500" />,
  Layers: <Layers className="w-4 h-4 text-amber-500" />,
  Zap: <Zap className="w-4 h-4 text-red-500" />,
};

export function WartechArenaRadar({
  onOpenRegister,
  className = "",
}: WartechArenaRadarProps) {
  const [selectedTrack, setSelectedTrack] = useState<WartechTrack | null>(wartechTracks[0]);
  const [sectorFilter, setSectorFilter] = useState<SectorFilter>("all");
  const [hoveredTrackId, setHoveredTrackId] = useState<string | null>(null);

  const filteredTracks = useMemo(() => {
    return wartechTracks.filter((t) => {
      if (sectorFilter === "all") return true;
      if (sectorFilter === "filling_fast") return t.status === "Filling Fast";
      return t.radarSector === sectorFilter;
    });
  }, [sectorFilter]);

  // Center coordinate of the 400x400 SVG radar map
  const center = 200;
  const maxRadius = 160;

  return (
    <div
      className={`relative w-full rounded-[36px] bg-white/80 backdrop-blur-2xl border border-white/90 p-6 sm:p-10 shadow-[0_20px_50px_rgba(36,13,43,0.06)] overflow-hidden space-y-8 ${className}`}
    >
      {/* Specular Bevel & Background Grid */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ff6b35]/30 to-transparent" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-[#ff6b35]/5 blur-3xl" />

      {/* Header & Sector Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#240d2b]/[0.08] pb-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff6b35]/10 border border-[#ff6b35]/20 text-[#ff6b35] text-[11px] font-mono uppercase tracking-wider font-semibold">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>Championship Field Operations // 2D Radar</span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-black font-display text-[#240d2b] tracking-tight">
            Wartech Arena Radar Visualizer
          </h3>
          <p className="text-xs sm:text-sm text-[#240d2b]/70 font-body max-w-xl">
            Live polar telemetry mapping 8 competition arenas, obstacle zones, hazard parameters, and real-time team slot allocations across the AIT Pune championship grounds.
          </p>
        </div>

        {/* Sector Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-full bg-white/70 border border-white/80 shadow-xs">
          {[
            { id: "all", label: "All Arenas (8)" },
            { id: "Alpha Combat", label: "Sector Alpha" },
            { id: "Bravo Autonomy", label: "Sector Bravo" },
            { id: "Gamma Dynamic", label: "Sector Gamma" },
            { id: "filling_fast", label: "Filling Fast" },
          ].map((pill) => (
            <button
              key={pill.id}
              onClick={() => setSectorFilter(pill.id as SectorFilter)}
              className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer whitespace-nowrap ${
                sectorFilter === pill.id
                  ? "bg-[#240d2b] text-white font-bold shadow-xs"
                  : "text-[#240d2b]/70 hover:text-[#240d2b] hover:bg-black/5"
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Radar Screen (Left) + Arena Tactical Dossier (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Radar Screen Visualizer (5 Cols) */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
          <div className="relative w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] rounded-full bg-[#17081b] border-2 border-[#ff6b35]/30 shadow-[0_0_40px_rgba(255,107,53,0.15)] overflow-hidden flex items-center justify-center">
            {/* Radar Grid Circles & Crosshairs SVG */}
            <svg
              viewBox="0 0 400 400"
              className="absolute inset-0 w-full h-full pointer-events-none select-none"
            >
              <defs>
                <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ff6b35" stopOpacity="0.08" />
                  <stop offset="85%" stopColor="#240d2b" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#0d030f" stopOpacity="1" />
                </radialGradient>
              </defs>

              {/* Background gradient */}
              <circle cx="200" cy="200" r="198" fill="url(#radarGlow)" />

              {/* Range Rings */}
              <circle cx="200" cy="200" r="40" fill="none" stroke="#ff6b35" strokeOpacity="0.15" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="200" cy="200" r="80" fill="none" stroke="#ff6b35" strokeOpacity="0.2" strokeWidth="1" />
              <circle cx="200" cy="200" r="120" fill="none" stroke="#ff6b35" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="4 4" />
              <circle cx="200" cy="200" r="160" fill="none" stroke="#ff6b35" strokeOpacity="0.4" strokeWidth="1.5" />

              {/* Tactical Crosshairs */}
              <line x1="200" y1="20" x2="200" y2="380" stroke="#ff6b35" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="20" y1="200" x2="380" y2="200" stroke="#ff6b35" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="4 4" />

              {/* 45-degree angle lines */}
              <line x1="72" y1="72" x2="328" y2="328" stroke="#ff6b35" strokeOpacity="0.1" strokeWidth="1" strokeDasharray="2 4" />
              <line x1="328" y1="72" x2="72" y2="328" stroke="#ff6b35" strokeOpacity="0.1" strokeWidth="1" strokeDasharray="2 4" />

              {/* Cardinal Azimuth Labels */}
              <text x="200" y="32" textAnchor="middle" fill="#ff6b35" fillOpacity="0.7" fontSize="9" fontFamily="monospace">000° NORTH</text>
              <text x="368" y="203" textAnchor="end" fill="#ff6b35" fillOpacity="0.7" fontSize="9" fontFamily="monospace">090°</text>
              <text x="200" y="374" textAnchor="middle" fill="#ff6b35" fillOpacity="0.7" fontSize="9" fontFamily="monospace">180° SOUTH</text>
              <text x="32" y="203" textAnchor="start" fill="#ff6b35" fillOpacity="0.7" fontSize="9" fontFamily="monospace">270°</text>

              {/* Sector Labels */}
              <text x="300" y="110" fill="#ffffff" fillOpacity="0.3" fontSize="8" fontFamily="monospace">SEC-ALPHA</text>
              <text x="90" y="300" fill="#ffffff" fillOpacity="0.3" fontSize="8" fontFamily="monospace">SEC-BRAVO</text>
              <text x="300" y="300" fill="#ffffff" fillOpacity="0.3" fontSize="8" fontFamily="monospace">SEC-GAMMA</text>
            </svg>

            {/* Rotating 360-degree Radar Sweep Beam */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "linear" }}
              className="absolute inset-0 pointer-events-none origin-center"
            >
              <div
                className="w-1/2 h-1/2 absolute top-0 right-0 origin-bottom-left"
                style={{
                  background: "conic-gradient(from 270deg, rgba(255, 107, 53, 0.4) 0deg, transparent 75deg)",
                  borderRight: "1.5px solid rgba(255, 107, 53, 0.9)",
                }}
              />
            </motion.div>

            {/* Central Command Beacon */}
            <div className="absolute w-3 h-3 rounded-full bg-[#ff6b35] shadow-[0_0_12px_#ff6b35] pointer-events-none">
              <span className="absolute -inset-1 rounded-full border border-[#ff6b35] animate-ping" />
            </div>

            {/* Interactive Arena Track Nodes */}
            {filteredTracks.map((track) => {
              const angleRad = (track.radarAngle - 90) * (Math.PI / 180);
              const r = track.radarDistance * maxRadius;
              const x = center + r * Math.cos(angleRad);
              const y = center + r * Math.sin(angleRad);

              const isSelected = selectedTrack?.id === track.id;
              const isHovered = hoveredTrackId === track.id;
              const isFillingFast = track.status === "Filling Fast";

              return (
                <button
                  key={track.id}
                  onClick={() => setSelectedTrack(track)}
                  onMouseEnter={() => setHoveredTrackId(track.id)}
                  onMouseLeave={() => setHoveredTrackId(null)}
                  style={{
                    left: `${(x / 400) * 100}%`,
                    top: `${(y / 400) * 100}%`,
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer focus:outline-hidden z-20"
                >
                  <div className="relative flex items-center justify-center">
                    {/* Pulsing ring for selected / filling fast */}
                    {(isSelected || isFillingFast) && (
                      <span
                        className={`absolute w-7 h-7 rounded-full animate-ping pointer-events-none ${
                          isFillingFast ? "bg-amber-500/40" : "bg-[#ff6b35]/40"
                        }`}
                      />
                    )}

                    {/* Blip Dot */}
                    <div
                      className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-mono font-bold transition-all shadow-md ${
                        isSelected
                          ? "bg-[#ff6b35] text-white scale-125 ring-2 ring-white"
                          : isHovered
                          ? "bg-white text-[#240d2b] scale-110"
                          : isFillingFast
                          ? "bg-amber-400 text-black ring-1 ring-amber-300"
                          : "bg-white/80 text-[#240d2b] border border-white"
                      }`}
                    >
                      {track.trackCode.replace("WT-", "")}
                    </div>

                    {/* Code Tag badge hovering above node */}
                    <div
                      className={`absolute bottom-full mb-1 px-1.5 py-0.5 rounded-sm text-[8px] font-mono whitespace-nowrap transition-all pointer-events-none ${
                        isSelected
                          ? "bg-[#ff6b35] text-white font-bold opacity-100"
                          : isHovered
                          ? "bg-white text-[#240d2b] font-medium opacity-100"
                          : "bg-black/60 text-white/80 opacity-0 group-hover:opacity-100"
                      }`}
                    >
                      {track.trackCode}: {track.title}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Radar Telemetry Bar */}
          <div className="mt-3 flex items-center gap-4 text-[10px] font-mono text-[#240d2b]/60">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#ff6b35] animate-ping" />
              <span>SWEEP: 4.5s / 360°</span>
            </span>
            <span>&bull;</span>
            <span>RANGE: 160m RADIAL</span>
            <span>&bull;</span>
            <span>NODES: {filteredTracks.length} PINGS</span>
          </div>
        </div>

        {/* Arena Tactical Dossier / Inspector Card (7 Cols) */}
        <div className="lg:col-span-6">
          <AnimatePresence mode="wait">
            {selectedTrack ? (
              <motion.div
                key={selectedTrack.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="p-6 sm:p-8 rounded-3xl bg-white/95 border border-white/90 shadow-lg space-y-6"
              >
                {/* Header with track Code & Prize */}
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#240d2b] text-white text-[10px] font-mono font-bold">
                        {selectedTrack.trackCode}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#ff6b35]/15 border border-[#ff6b35]/25 text-[#ff6b35] text-[10px] font-mono font-bold uppercase">
                        {selectedTrack.radarSector}
                      </span>
                      {selectedTrack.status === "Filling Fast" && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-700 text-[10px] font-mono font-bold animate-pulse">
                          ⚡ Filling Fast
                        </span>
                      )}
                    </div>
                    <h4 className="text-2xl font-bold font-display text-[#240d2b]">
                      {selectedTrack.title}
                    </h4>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[10px] font-mono uppercase text-[#240d2b]/50 block">Prize Pool</span>
                    <span className="text-xl font-bold font-mono text-[#ff6b35]">{selectedTrack.prizePool}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#240d2b]/75 leading-relaxed font-body">
                  {selectedTrack.description}
                </p>

                {/* Capacity & Slot Allocation Meter */}
                <div className="p-3.5 rounded-2xl bg-[#240d2b]/[0.03] border border-[#240d2b]/[0.06] space-y-2 font-mono text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[#240d2b]/60 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#ff6b35]" />
                      <span>ARENA TEAM SLOTS:</span>
                    </span>
                    <span className="font-bold text-[#240d2b]">
                      <span className="text-[#ff6b35]">{selectedTrack.filledSlots}</span> / {selectedTrack.maxSlots} Slots
                      {" "}({Math.round((selectedTrack.filledSlots / selectedTrack.maxSlots) * 100)}%)
                    </span>
                  </div>

                  <div className="w-full h-2 bg-black/10 rounded-full overflow-hidden p-0.5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${(selectedTrack.filledSlots / selectedTrack.maxSlots) * 100}%`,
                      }}
                      className="h-full rounded-full bg-gradient-to-r from-[#ff6b35] to-[#fa5519]"
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-[#240d2b]/55">
                    <span>Team Size: {selectedTrack.teamSize}</span>
                    <span className="text-emerald-700 font-medium">
                      {selectedTrack.maxSlots - selectedTrack.filledSlots} Slots Available
                    </span>
                  </div>
                </div>

                {/* Arena Layout & Physical Hazards */}
                <div className="space-y-3">
                  <div className="text-xs font-mono">
                    <span className="text-[#240d2b]/50 uppercase block text-[10px] tracking-wider">
                      Arena Parameters:
                    </span>
                    <span className="font-semibold text-[#240d2b]">{selectedTrack.arenaType}</span>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#240d2b]/50 block">
                      Active Arena Hazards &amp; Obstacles:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedTrack.arenaHazards.map((hazard, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-[#240d2b]/10 text-[11px] font-mono text-[#240d2b]/80 shadow-xs"
                        >
                          <AlertTriangle className="w-3 h-3 text-[#ff6b35]" />
                          <span>{hazard}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-[#240d2b]/[0.08] flex items-center justify-between gap-4">
                  <div className="text-[11px] font-mono text-[#240d2b]/60">
                    Azimuth: {selectedTrack.radarAngle}° &bull; Distance: {Math.round(selectedTrack.radarDistance * 160)}m
                  </div>

                  <button
                    onClick={() => onOpenRegister?.(selectedTrack.id)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#ff6b35] hover:bg-[#fa5519] text-white text-xs font-medium font-body transition-all shadow-[0_4px_16px_rgba(255,107,53,0.35)] cursor-pointer hover:scale-102 active:scale-98"
                  >
                    <span>Register for {selectedTrack.trackCode}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="p-12 text-center rounded-3xl bg-white/60 border border-white/80 font-mono text-sm text-[#240d2b]/60">
                Click any radar blip to inspect arena telemetry.
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default WartechArenaRadar;
