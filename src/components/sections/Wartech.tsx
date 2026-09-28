"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Flame,
  Zap,
  Compass,
  Grab,
  Route,
  Layers,
  ShieldAlert,
  ArrowRight,
  Download,
  Users,
  Award,
  CheckCircle2,
  FileText,
  X,
} from "lucide-react";
import { wartechTracks, WartechTrack } from "@/data/siteData";

interface WartechProps {
  onOpenRegister?: (trackId?: string) => void;
  onOpenRulebook?: () => void;
}

const iconMap: Record<string, React.ReactNode> = {
  Trophy: <Trophy className="w-5 h-5 text-ink" />,
  Flame: <Flame className="w-5 h-5 text-alarm" />,
  Compass: <Compass className="w-5 h-5 text-ink" />,
  ShieldAlert: <ShieldAlert className="w-5 h-5 text-alarm" />,
  Route: <Route className="w-5 h-5 text-ink" />,
  Grab: <Grab className="w-5 h-5 text-ink" />,
  Layers: <Layers className="w-5 h-5 text-ink" />,
  Zap: <Zap className="w-5 h-5 text-alarm" />,
};

export function Wartech({ onOpenRegister, onOpenRulebook }: WartechProps) {
  const [selectedTrackDetail, setSelectedTrackDetail] = useState<WartechTrack | null>(null);

  return (
    <section id="wartech" className="relative py-24 sm:py-32 bg-transparent border-b-[2.5px] border-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Prominent Flagship Feature Banner in Ink with Paper & Alarm Accents */}
        <div className="rounded-[24px_30px_22px_28px_/_30px_22px_28px_24px] bg-ink text-paper p-8 sm:p-12 shadow-[8px_9px_0_#14140f] relative overflow-hidden border-[3px] border-ink -rotate-0.5">
          {/* Animated Hazard Diagonal Stripe Bar at Top */}
          <div className="absolute top-0 left-0 right-0 h-2.5 hazard-stripes border-b-2 border-ink" />

          {/* Subtle Halftone / Grid overlay */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1.5px,transparent_1.5px)] bg-[size:18px_18px] pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 pt-2">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-alarm text-white text-xs font-mono font-black uppercase tracking-wider border-2 border-white shadow-[2px_2px_0_#000] -rotate-1 animate-wiggle">
                <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
                <span>NATIONAL FLAGSHIP CHAMPIONSHIP</span>
              </div>

              <h2 className="text-4xl sm:text-6xl font-black font-tech tracking-tight text-paper leading-tight">
                WARTECH 2026
              </h2>

              <p className="text-sm sm:text-base text-paper/80 font-body font-semibold leading-relaxed">
                8 battle-tested tracks spanning autonomous combat robotics, high-speed circuit racing, drone navigation, and maze solving.
              </p>

              {/* Quick Stat Indicators */}
              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono">
                <div className="px-3.5 py-1.5 rounded-xl bg-white border-2 border-ink text-ink font-bold shadow-[2px_2px_0_#000] flex items-center gap-2">
                  <span className="text-ink/60">PRIZE:</span>
                  <span className="font-black text-alarm">₹1,50,000+</span>
                </div>

                <div className="px-3.5 py-1.5 rounded-xl bg-white border-2 border-ink text-ink font-bold shadow-[2px_2px_0_#000] flex items-center gap-2">
                  <span className="text-ink/60">TEAMS:</span>
                  <span className="font-black text-ink">120+ SQUADS</span>
                </div>

                <div className="px-3.5 py-1.5 rounded-xl bg-white border-2 border-ink text-ink font-bold shadow-[2px_2px_0_#000] flex items-center gap-2">
                  <span className="text-ink/60">TRACKS:</span>
                  <span className="font-black text-ink">8 ARENAS</span>
                </div>
              </div>
            </div>

            {/* Direct CTAs with tactile press mechanics */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3.5 shrink-0">
              <button
                onClick={() => onOpenRegister?.("robo-soccer")}
                className="btn-paper-red !h-[46px] !text-sm !px-6 hover-wiggle"
              >
                <span>Register for Wartech</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <button
                onClick={onOpenRulebook}
                className="btn-paper-secondary !h-[46px] !text-sm !px-6"
              >
                <Download className="w-4 h-4 text-ink stroke-[2.5]" />
                <span>Official Rulebook</span>
              </button>
            </div>
          </div>
        </div>

        {/* Detailed Event Sub-Tracks Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black font-tech text-ink">
              Competition Arenas (8 Tracks)
            </h3>
            <span className="text-xs font-mono font-bold text-ink/60 hidden sm:inline-block">
              SELECT ANY TRACK TO INSPECT RULES &amp; SPECS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {wartechTracks.map((track, idx) => {
              return (
                <motion.div
                  key={track.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -6, scale: 1.02, rotate: idx % 2 === 0 ? -1.5 : 1.5 }}
                  transition={{ type: "spring", stiffness: 350, damping: 18 }}
                  className="bg-white rounded-[20px_24px_18px_22px_/_24px_18px_22px_20px] border-[2.5px] border-ink shadow-[4px_5px_0_#14140f] p-5 flex flex-col justify-between group cursor-default"
                >
                  <div className="space-y-3">
                    {/* Track Header */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-black text-ink bg-paper px-2.5 py-0.5 rounded-full border-2 border-ink shadow-[1.5px_1.5px_0_#14140f]">
                        {track.trackCode}
                      </span>
                      <span className="text-[11px] font-mono font-black px-2.5 py-0.5 rounded-full bg-paper text-ink border-2 border-ink shadow-[2px_2px_0_#14140f]">
                        {track.prizePool}
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5 pt-1">
                      <div className="p-2 rounded-xl bg-paper border-2 border-ink shadow-[2px_2px_0_#14140f] group-hover:rotate-6 transition-transform">
                        {iconMap[track.iconName] || <Trophy className="w-5 h-5 text-ink" />}
                      </div>
                      <h4 className="font-tech text-base font-black text-ink group-hover:text-alarm transition-colors">
                        {track.title}
                      </h4>
                    </div>

                    <p className="text-xs text-ink/80 font-body font-semibold leading-relaxed line-clamp-3">
                      {track.tagline}
                    </p>

                    <div className="pt-2 space-y-1 text-[11px] font-mono text-ink/70">
                      <div>
                        <span className="font-bold text-ink">Arena:</span> {track.arenaType}
                      </div>
                      <div>
                        <span className="font-bold text-ink">Team:</span> {track.teamSize}
                      </div>
                    </div>
                  </div>

                  {/* Track Actions */}
                  <div className="pt-4 mt-4 border-t-2 border-ink/10 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setSelectedTrackDetail(track)}
                      className="text-xs font-mono font-black text-ink/70 hover:text-ink transition-colors cursor-pointer"
                    >
                      View Specs
                    </button>

                    <button
                      onClick={() => onOpenRegister?.(track.id)}
                      className="text-xs font-tech font-black text-alarm hover:text-ink transition-colors flex items-center gap-1 cursor-pointer hover:translate-x-1 duration-150"
                    >
                      <span>Register</span>
                      <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Track Details Modal (Tactile Paper Dossier) */}
      <AnimatePresence>
        {selectedTrackDetail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-[24px_30px_22px_28px_/_30px_22px_28px_24px] border-[3px] border-ink max-w-lg w-full p-6 sm:p-8 shadow-[8px_9px_0_#14140f] relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedTrackDetail(null)}
                className="absolute top-4 right-4 p-1.5 rounded-xl border-2 border-ink bg-paper hover:bg-white text-ink shadow-[2px_2px_0_#14140f] transition-transform active:translate-x-0.5 active:translate-y-0.5"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-black text-ink bg-paper px-2.5 py-0.5 rounded-full border-2 border-ink shadow-[1.5px_1.5px_0_#14140f]">
                    {selectedTrackDetail.trackCode}
                  </span>
                  <span className="text-xs font-mono font-black text-ink bg-coin-y1 px-2.5 py-0.5 rounded-full border-2 border-ink shadow-[2px_2px_0_#14140f]">
                    PRIZE: {selectedTrackDetail.prizePool}
                  </span>
                </div>

                <h3 className="text-2xl font-black font-tech text-ink">
                  {selectedTrackDetail.title}
                </h3>

                <p className="text-xs sm:text-sm text-ink-soft font-body font-semibold leading-relaxed">
                  {selectedTrackDetail.description}
                </p>

                <div className="p-3.5 rounded-xl bg-paper border-2 border-ink shadow-[2px_2px_0_#14140f] space-y-1.5 text-xs font-mono">
                  <div>
                    <span className="text-ink-muted font-bold">Arena:</span> <span className="text-ink font-black">{selectedTrackDetail.arenaType}</span>
                  </div>
                  <div>
                    <span className="text-ink-muted font-bold">Team Cap:</span> <span className="text-ink font-black">{selectedTrackDetail.teamSize}</span>
                  </div>
                </div>

                {/* Rules Highlights */}
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-mono font-black uppercase tracking-wider text-ink-muted">
                    REGULATION HIGHLIGHTS
                  </span>
                  <ul className="space-y-1.5">
                    {selectedTrackDetail.rulesHighlight.map((rule, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs font-mono text-ink-soft font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-ink shrink-0 stroke-[2.5]" />
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t-2 border-ink/15 flex items-center justify-end gap-3">
                  <button
                    onClick={() => setSelectedTrackDetail(null)}
                    className="btn-paper-secondary !h-[38px] !text-xs !py-0 !px-4"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => {
                      const id = selectedTrackDetail.id;
                      setSelectedTrackDetail(null);
                      onOpenRegister?.(id);
                    }}
                    className="btn-paper-red !h-[38px] !text-xs !py-0 !px-4"
                  >
                    <span>Register for this Track</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
