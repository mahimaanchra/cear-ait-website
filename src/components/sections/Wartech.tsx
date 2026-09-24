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
  Trophy: <Trophy className="w-5 h-5 text-blue-600" />,
  Flame: <Flame className="w-5 h-5 text-red-500" />,
  Compass: <Compass className="w-5 h-5 text-emerald-600" />,
  ShieldAlert: <ShieldAlert className="w-5 h-5 text-amber-500" />,
  Route: <Route className="w-5 h-5 text-blue-600" />,
  Grab: <Grab className="w-5 h-5 text-emerald-600" />,
  Layers: <Layers className="w-5 h-5 text-amber-500" />,
  Zap: <Zap className="w-5 h-5 text-red-500" />,
};

const accentStyles: Record<string, { bg: string; text: string; border: string }> = {
  blue: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  red: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200" },
  green: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  yellow: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
};

export function Wartech({ onOpenRegister, onOpenRulebook }: WartechProps) {
  const [selectedTrackDetail, setSelectedTrackDetail] = useState<WartechTrack | null>(null);

  return (
    <section id="wartech" className="relative py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Prominent Flagship Feature Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-8 sm:p-12 shadow-xl relative overflow-hidden">
          {/* Subtle Grid overlay */}
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 text-red-300 text-xs font-mono font-bold uppercase tracking-wider border border-red-500/30">
                <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                <span>INTER-COLLEGE FLAGSHIP CHAMPIONSHIP</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black font-tech tracking-tight text-white leading-tight">
                WARTECH 2026
              </h2>

              <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
                The ultimate battleground for collegiate robotics. 8 high-octane competitive tracks spanning tactical 2v2 soccer, multi-terrain high-speed racing, FPV drone cages, circular sumo rings, and autonomous SLAM mazes.
              </p>

              {/* Quick Stat Indicators */}
              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono">
                <div className="px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span className="text-slate-300">PRIZE POOL:</span>
                  <span className="font-bold text-amber-400">₹1,50,000+</span>
                </div>

                <div className="px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-400" />
                  <span className="text-slate-300">TEAMS:</span>
                  <span className="font-bold text-blue-400">120+ SQUADS</span>
                </div>

                <div className="px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-emerald-400" />
                  <span className="text-slate-300">TRACKS:</span>
                  <span className="font-bold text-emerald-400">8 ARENAS</span>
                </div>
              </div>
            </div>

            {/* Direct CTAs */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <button
                onClick={() => onOpenRegister?.("robo-soccer")}
                className="bg-blue-600 hover:bg-blue-500 text-white font-tech font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Register for Wartech</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenRulebook}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 font-tech font-bold text-sm px-6 py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4 text-slate-300" />
                <span>Rules &amp; Guidelines</span>
              </button>
            </div>
          </div>
        </div>

        {/* Detailed Event Sub-Tracks Section */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                OFFICIAL COMPETITION BRACKETS
              </span>
              <h3 className="text-2xl font-bold font-tech text-slate-900 mt-1">
                Explore Event Sub-Tracks
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-500">
              CLICK ANY TRACK TO VIEW RULES &amp; SPECS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {wartechTracks.map((track, idx) => {
              const style = accentStyles[track.accentColor] || accentStyles.blue;

              return (
                <motion.div
                  key={track.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                  className="bg-white rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all p-5 flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    {/* Track Header */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-slate-500">
                        {track.trackCode}
                      </span>
                      <span
                        className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded border ${style.bg} ${style.text} ${style.border}`}
                      >
                        {track.prizePool}
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5 pt-1">
                      <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 group-hover:scale-105 transition-transform">
                        {iconMap[track.iconName] || <Trophy className="w-5 h-5 text-blue-600" />}
                      </div>
                      <h4 className="font-tech text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {track.title}
                      </h4>
                    </div>

                    <p className="text-xs text-slate-600 font-sans leading-relaxed line-clamp-3">
                      {track.tagline}
                    </p>

                    <div className="pt-2 space-y-1 text-[11px] font-mono text-slate-500">
                      <div>
                        <span className="font-bold text-slate-700">Arena:</span> {track.arenaType}
                      </div>
                      <div>
                        <span className="font-bold text-slate-700">Team:</span> {track.teamSize}
                      </div>
                    </div>
                  </div>

                  {/* Track Actions */}
                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setSelectedTrackDetail(track)}
                      className="text-xs font-mono font-semibold text-slate-600 hover:text-blue-600 transition-colors cursor-pointer"
                    >
                      View Specs
                    </button>

                    <button
                      onClick={() => onOpenRegister?.(track.id)}
                      className="text-xs font-tech font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span>Register</span>
                      <ArrowRight className="w-3 h-3" />
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl border border-slate-200 max-w-lg w-full p-6 sm:p-8 shadow-2xl relative"
            >
              <button
                onClick={() => setSelectedTrackDetail(null)}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {selectedTrackDetail.trackCode}
                  </span>
                  <span className="text-xs font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    PRIZE: {selectedTrackDetail.prizePool}
                  </span>
                </div>

                <h3 className="text-2xl font-bold font-tech text-slate-900">
                  {selectedTrackDetail.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                  {selectedTrackDetail.description}
                </p>

                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 space-y-1.5 text-xs font-mono">
                  <div>
                    <span className="text-slate-500 font-bold">Arena:</span> {selectedTrackDetail.arenaType}
                  </div>
                  <div>
                    <span className="text-slate-500 font-bold">Team Cap:</span> {selectedTrackDetail.teamSize}
                  </div>
                </div>

                {/* Rules Highlights */}
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                    REGULATION HIGHLIGHTS
                  </span>
                  <ul className="space-y-1.5">
                    {selectedTrackDetail.rulesHighlight.map((rule, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs font-mono text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                  <button
                    onClick={() => setSelectedTrackDetail(null)}
                    className="px-4 py-2 rounded-lg font-tech font-bold text-xs text-slate-600 hover:bg-slate-100"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => {
                      const id = selectedTrackDetail.id;
                      setSelectedTrackDetail(null);
                      onOpenRegister?.(id);
                    }}
                    className="btn-primary-tech text-xs"
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
