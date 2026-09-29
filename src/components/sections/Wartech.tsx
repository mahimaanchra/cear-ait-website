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
  Radio,
  Crosshair,
} from "lucide-react";
import { wartechTracks, WartechTrack } from "@/data/siteData";

interface WartechProps {
  onOpenRegister?: (trackId?: string) => void;
  onOpenRulebook?: () => void;
}

const iconMap: Record<string, React.ReactNode> = {
  Trophy: <Trophy className="w-5 h-5 text-cyan-400" />,
  Flame: <Flame className="w-5 h-5 text-rose-500" />,
  Compass: <Compass className="w-5 h-5 text-cyan-400" />,
  ShieldAlert: <ShieldAlert className="w-5 h-5 text-rose-500" />,
  Route: <Route className="w-5 h-5 text-cyan-400" />,
  Grab: <Grab className="w-5 h-5 text-cyan-400" />,
  Layers: <Layers className="w-5 h-5 text-cyan-400" />,
  Zap: <Zap className="w-5 h-5 text-amber-400" />,
};

export function Wartech({ onOpenRegister, onOpenRulebook }: WartechProps) {
  const [selectedTrackDetail, setSelectedTrackDetail] = useState<WartechTrack | null>(null);

  return (
    <section id="wartech" className="relative py-24 sm:py-32 bg-transparent border-b border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Prominent Tactical Flagship Command Center Banner */}
        <div className="rounded-2xl bg-[#090e1c]/90 border border-rose-500/35 p-8 sm:p-12 shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_25px_rgba(255,51,102,0.18)] relative overflow-hidden backdrop-blur-xl">
          {/* Top Animated Hazard Laser Strip */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 via-amber-400 to-cyan-400 shadow-[0_0_12px_#ff3366]" />

          {/* Corner HUD Brackets */}
          <div className="cyber-bracket-top-left !border-rose-500" />
          <div className="cyber-bracket-bottom-right !border-rose-500" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 pt-2">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/15 text-rose-400 text-xs font-mono font-bold uppercase tracking-wider border border-rose-500/40">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                <span>NATIONAL ROBOTICS CHAMPIONSHIP</span>
              </div>

              <h2 className="text-4xl sm:text-6xl font-black font-tech tracking-tight text-slate-100 leading-tight">
                WARTECH{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-amber-400 to-cyan-400">
                  2026
                </span>
              </h2>

              <p className="text-sm sm:text-base text-slate-300 font-body font-normal leading-relaxed">
                8 battle-hardened arenas spanning autonomous combat robotics, high-speed circuit racing, autonomous aerial drone navigation, and algorithmic maze solving.
              </p>

              {/* Quick Stat Indicators */}
              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono">
                <div className="px-3.5 py-1.5 rounded-lg bg-[#070b14] border border-rose-500/30 text-slate-200 font-bold flex items-center gap-2">
                  <span className="text-slate-400">PRIZE:</span>
                  <span className="font-black text-rose-400">₹1,50,000+</span>
                </div>

                <div className="px-3.5 py-1.5 rounded-lg bg-[#070b14] border border-cyan-500/30 text-slate-200 font-bold flex items-center gap-2">
                  <span className="text-slate-400">TEAMS:</span>
                  <span className="font-black text-cyan-300">120+ SQUADS</span>
                </div>

                <div className="px-3.5 py-1.5 rounded-lg bg-[#070b14] border border-emerald-500/30 text-slate-200 font-bold flex items-center gap-2">
                  <span className="text-slate-400">ARENAS:</span>
                  <span className="font-black text-emerald-400">8 COMBAT TRACKS</span>
                </div>
              </div>
            </div>

            {/* Direct CTAs */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3.5 shrink-0">
              <button
                onClick={() => onOpenRegister?.("robo-soccer")}
                className="cyber-btn-crimson !h-[46px] !text-sm !px-6"
              >
                <span>Register for Wartech</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenRulebook}
                className="cyber-btn-secondary !h-[46px] !text-sm !px-6"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>Official Rulebook</span>
              </button>
            </div>
          </div>
        </div>

        {/* Detailed Event Sub-Tracks Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Crosshair className="w-5 h-5 text-cyan-400" />
              <h3 className="text-2xl font-black font-tech text-slate-100">
                Combat &amp; Autonomous Arenas (8 Tracks)
              </h3>
            </div>
            <span className="text-xs font-mono font-bold text-slate-400 hidden sm:inline-block">
              [SELECT ARENA TO INSPECT TELEMETRY &amp; RULES]
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {wartechTracks.map((track) => {
              return (
                <motion.div
                  key={track.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="bg-[#0c1222]/85 rounded-xl border border-cyan-500/20 hover:border-cyan-400/50 shadow-[0_8px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_0_20px_rgba(0,240,255,0.18)] p-5 flex flex-col justify-between group cursor-default backdrop-blur-xl transition-all"
                >
                  <div className="space-y-3">
                    {/* Track Header */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/40 px-2.5 py-0.5 rounded border border-cyan-500/30">
                        {track.trackCode}
                      </span>
                      <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-rose-500/15 text-rose-400 border border-rose-500/30">
                        {track.prizePool}
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5 pt-1">
                      <div className="p-2 rounded-lg bg-[#070b14] border border-cyan-500/30 shadow-[0_0_8px_rgba(0,240,255,0.15)] group-hover:border-cyan-400 transition-colors">
                        {iconMap[track.iconName] || <Trophy className="w-5 h-5 text-cyan-400" />}
                      </div>
                      <h4 className="font-tech text-base font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                        {track.title}
                      </h4>
                    </div>

                    <p className="text-xs text-slate-400 font-body leading-relaxed line-clamp-3">
                      {track.tagline}
                    </p>

                    <div className="pt-2 space-y-1 text-[11px] font-mono text-slate-400">
                      <div>
                        <span className="text-slate-300 font-semibold">Arena:</span> {track.arenaType}
                      </div>
                      <div>
                        <span className="text-slate-300 font-semibold">Team Cap:</span> {track.teamSize}
                      </div>
                    </div>
                  </div>

                  {/* Track Actions */}
                  <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setSelectedTrackDetail(track)}
                      className="text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
                    >
                      View Specs
                    </button>

                    <button
                      onClick={() => onOpenRegister?.(track.id)}
                      className="text-xs font-tech font-bold text-rose-400 hover:text-rose-300 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span>Register</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Track Details Modal */}
      <AnimatePresence>
        {selectedTrackDetail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0c1322] rounded-2xl border border-cyan-500/40 max-w-lg w-full p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(0,240,255,0.2)] relative max-h-[90vh] overflow-y-auto"
            >
              <div className="cyber-bracket-top-left" />
              <div className="cyber-bracket-bottom-right" />

              <button
                onClick={() => setSelectedTrackDetail(null)}
                className="absolute top-4 right-4 p-1.5 rounded-lg border border-slate-800 bg-[#070b14] hover:bg-slate-800 text-slate-300 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/40 px-2.5 py-0.5 rounded border border-cyan-500/30">
                    {selectedTrackDetail.trackCode}
                  </span>
                  <span className="text-xs font-mono font-bold text-rose-400 bg-rose-950/40 px-2.5 py-0.5 rounded border border-rose-500/30">
                    PRIZE: {selectedTrackDetail.prizePool}
                  </span>
                </div>

                <h3 className="text-2xl font-black font-tech text-slate-100">
                  {selectedTrackDetail.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 font-body leading-relaxed">
                  {selectedTrackDetail.description}
                </p>

                <div className="p-3.5 rounded-xl bg-[#070b14] border border-slate-800 space-y-1.5 text-xs font-mono">
                  <div>
                    <span className="text-slate-400">Arena:</span>{" "}
                    <span className="text-slate-100 font-bold">{selectedTrackDetail.arenaType}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Team Cap:</span>{" "}
                    <span className="text-slate-100 font-bold">{selectedTrackDetail.teamSize}</span>
                  </div>
                </div>

                {/* Rules Highlights */}
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                    REGULATION HIGHLIGHTS
                  </span>
                  <ul className="space-y-1.5">
                    {selectedTrackDetail.rulesHighlight.map((rule, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs font-mono text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                  <button
                    onClick={() => setSelectedTrackDetail(null)}
                    className="cyber-btn-secondary !h-[38px] !text-xs !py-0 !px-4"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => {
                      const id = selectedTrackDetail.id;
                      setSelectedTrackDetail(null);
                      onOpenRegister?.(id);
                    }}
                    className="cyber-btn-crimson !h-[38px] !text-xs !py-0 !px-4"
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

export default Wartech;
