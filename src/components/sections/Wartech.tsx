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
  ArrowUpRight,
} from "lucide-react";
import { wartechTracks, WartechTrack } from "@/data/siteData";

interface WartechProps {
  onOpenRegister?: (trackId?: string) => void;
  onOpenRulebook?: () => void;
}

const iconMap: Record<string, React.ReactNode> = {
  Trophy: <Trophy className="w-5 h-5 text-[#0d1321]" />,
  Flame: <Flame className="w-5 h-5 text-[#0d1321]" />,
  Compass: <Compass className="w-5 h-5 text-[#0d1321]" />,
  ShieldAlert: <ShieldAlert className="w-5 h-5 text-[#0d1321]" />,
  Route: <Route className="w-5 h-5 text-[#0d1321]" />,
  Grab: <Grab className="w-5 h-5 text-[#0d1321]" />,
  Layers: <Layers className="w-5 h-5 text-[#0d1321]" />,
  Zap: <Zap className="w-5 h-5 text-[#0d1321]" />,
};

export function Wartech({ onOpenRegister, onOpenRulebook }: WartechProps) {
  const [selectedTrackDetail, setSelectedTrackDetail] = useState<WartechTrack | null>(null);

  return (
    <section id="wartech" className="relative py-28 sm:py-36 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Flagship Hero Card (Celvia / inFaces inspired) */}
        <div className="rounded-3xl bg-white border border-[#0d1321]/[0.08] p-8 sm:p-14 shadow-[0_20px_60px_-15px_rgba(13,19,33,0.06)] relative overflow-hidden">
          {/* Subtle top accent gradient */}
          <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-[#dcf836] via-[#0d1321] to-[#dcf836]" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0d1321]/[0.05] text-[#0d1321] text-xs font-mono uppercase tracking-wider font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#0d1321]" />
                <span>Flagship Championship // 2026 Edition</span>
              </div>

              <h2 className="text-4xl sm:text-6xl font-black font-display tracking-tight text-[#0d1321] leading-tight">
                WARTECH 2026
              </h2>

              <p className="text-base sm:text-lg text-[#0d1321]/70 font-body leading-relaxed">
                National inter-collegiate robotics tournament hosted at Army Institute of Technology, Pune. 8 technical battlegrounds across combat mechanics, autonomous drone navigation, and algorithm obstacle circuits.
              </p>

              {/* Clean Metric Indicators */}
              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono">
                <div className="px-4 py-2 rounded-full bg-[#fafaf9] border border-[#0d1321]/[0.08] text-[#0d1321] font-medium">
                  <span className="text-[#0d1321]/50 mr-1.5">PRIZE POOL:</span>
                  <span className="font-bold">₹1,50,000+</span>
                </div>

                <div className="px-4 py-2 rounded-full bg-[#fafaf9] border border-[#0d1321]/[0.08] text-[#0d1321] font-medium">
                  <span className="text-[#0d1321]/50 mr-1.5">ARENAS:</span>
                  <span className="font-bold">8 TRACKS</span>
                </div>

                <div className="px-4 py-2 rounded-full bg-[#fafaf9] border border-[#0d1321]/[0.08] text-[#0d1321] font-medium">
                  <span className="text-[#0d1321]/50 mr-1.5">LOCATION:</span>
                  <span className="font-bold">AIT PUNE CAMPUS</span>
                </div>
              </div>
            </div>

            {/* Clean Action Buttons */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <button
                onClick={() => onOpenRegister?.("robo-soccer")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-medium font-body bg-[#0d1321] text-white hover:bg-[#1a2640] transition-all shadow-sm hover:shadow-md cursor-pointer"
              >
                <span>Register for Wartech</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenRulebook}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-medium font-body bg-[#fafaf9] text-[#0d1321] border border-[#0d1321]/[0.15] hover:bg-white hover:border-[#0d1321]/30 transition-all cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>View Rulebook &amp; Handbook</span>
              </button>
            </div>
          </div>
        </div>

        {/* Arenas Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#0d1321]/[0.08] pb-4">
            <h3 className="text-xl sm:text-2xl font-black font-display text-[#0d1321] tracking-tight">
              Competition Arenas &amp; Tracks
            </h3>
            <span className="text-xs font-mono text-[#0d1321]/50">
              8 Competition Tracks
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {wartechTracks.map((track) => (
              <motion.div
                key={track.id}
                whileHover={{ y: -6 }}
                className="group p-6 rounded-2xl bg-white border border-[#0d1321]/[0.08] shadow-[0_10px_30px_-10px_rgba(13,19,33,0.03)] hover:shadow-[0_20px_40px_-15px_rgba(13,19,33,0.08)] hover:border-[#0d1321]/25 transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#fafaf9] border border-[#0d1321]/[0.08] flex items-center justify-center group-hover:bg-[#dcf836] transition-colors">
                      {iconMap[track.iconName] || <Trophy className="w-5 h-5 text-[#0d1321]" />}
                    </div>
                    <span className="text-xs font-mono font-bold text-[#0d1321]">
                      {track.prizePool}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-display text-lg font-bold text-[#0d1321] tracking-tight">
                      {track.title}
                    </h4>
                    <p className="text-xs text-[#0d1321]/60 font-body leading-relaxed mt-1.5 line-clamp-3">
                      {track.description}
                    </p>
                  </div>

                  <div className="pt-2 flex items-center gap-3 text-xs font-mono text-[#0d1321]/50">
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      <span>{track.teamSize}</span>
                    </span>
                  </div>
                </div>

                <div className="pt-4 mt-5 border-t border-[#0d1321]/[0.06] flex items-center justify-between">
                  <button
                    onClick={() => setSelectedTrackDetail(track)}
                    className="text-xs font-mono text-[#0d1321]/60 hover:text-[#0d1321] transition-colors cursor-pointer"
                  >
                    Details
                  </button>

                  <button
                    onClick={() => onOpenRegister?.(track.id)}
                    className="inline-flex items-center gap-1 text-xs font-medium font-body text-[#0d1321] hover:underline cursor-pointer"
                  >
                    <span>Register</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Track Details Modal */}
      <AnimatePresence>
        {selectedTrackDetail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0d1321]/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 border border-[#0d1321]/[0.1] shadow-2xl space-y-6"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#0d1321]/50">
                    Arena Specification
                  </span>
                  <h3 className="font-display text-2xl font-bold text-[#0d1321] mt-1">
                    {selectedTrackDetail.title}
                  </h3>
                </div>

                <button
                  onClick={() => setSelectedTrackDetail(null)}
                  className="p-1.5 rounded-full text-[#0d1321]/60 hover:text-[#0d1321] hover:bg-[#0d1321]/[0.05] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-sm text-[#0d1321]/75 leading-relaxed font-body">
                {selectedTrackDetail.description}
              </p>

              {selectedTrackDetail.rulesHighlight && selectedTrackDetail.rulesHighlight.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold text-[#0d1321] uppercase">
                    Key Regulations:
                  </span>
                  <ul className="space-y-1.5">
                    {selectedTrackDetail.rulesHighlight.map((rule, i) => (
                      <li key={i} className="text-xs text-[#0d1321]/70 flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0d1321] shrink-0 mt-0.5" />
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-4 border-t border-[#0d1321]/[0.08] flex items-center justify-between">
                <div className="text-xs font-mono">
                  <span className="text-[#0d1321]/50">Prize Pool: </span>
                  <span className="font-bold text-[#0d1321]">{selectedTrackDetail.prizePool}</span>
                </div>

                <button
                  onClick={() => {
                    const trackId = selectedTrackDetail.id;
                    setSelectedTrackDetail(null);
                    onOpenRegister?.(trackId);
                  }}
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-medium text-white bg-[#0d1321] hover:bg-[#1a2640] transition-colors cursor-pointer"
                >
                  <span>Register Team</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Wartech;
