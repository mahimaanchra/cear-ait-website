"use client";

import React from "react";
import { motion } from "framer-motion";
import { X, Download, ShieldCheck, AlertTriangle, CheckCircle2 } from "lucide-react";
import { wartechTracks } from "@/data/siteData";

interface RulebookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RulebookModal({ isOpen, onClose }: RulebookModalProps) {
  if (!isOpen) return null;

  const handleDownload = () => {
    const textContent = `WARTECH 2026 OFFICIAL RULEBOOK & REGULATION GUIDELINES
ARMY INSTITUTE OF TECHNOLOGY, PUNE
CENTRE OF EXCELLENCE FOR AI & ROBOTICS (CEAR)
=====================================================

1. GENERAL ELIGIBILITY
- Open to undergraduate engineering cadets and students from all accredited technical institutions across India.
- Teams may consist of 1 to 4 members. Cross-college teams are permitted.

2. COMBAT & ELECTRICAL REGULATIONS
- Max Operating Voltage: 16.8V DC (4S LiPo max).
- Weapon Limits: Spring, pneumatic, and passive mechanical wedges permitted. No active explosives, untethered projectiles, or chemical hazards.
- Kill-Switch: All robots must feature an externally accessible mechanical or wireless Emergency Stop.

3. TRACK HIGHLIGHTS:
${wartechTracks.map((t) => `- [${t.trackCode}] ${t.title}: Team ${t.teamSize}, Prize ${t.prizePool}. Arena: ${t.arenaType}`).join("\n")}

4. DISQUALIFICATION CONDITIONS:
- Exceeding weight or dimensional envelope during pre-match inspection.
- RF spectrum interference or unapproved transmitters.
- Intentional physical intervention inside active arena.

Official Queries: cear@aitpune.edu.in
`;
    const element = document.createElement("a");
    const file = new Blob([textContent], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "WARTECH_2026_OFFICIAL_RULEBOOK.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="relative w-full max-w-2xl bg-[#0c1322] border border-rose-500/35 rounded-2xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_25px_rgba(255,51,102,0.18)] my-8 overflow-hidden max-h-[85vh] flex flex-col justify-between backdrop-blur-2xl"
      >
        <div className="cyber-bracket-top-left !border-rose-500" />
        <div className="cyber-bracket-bottom-right !border-rose-500" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg border border-slate-800 bg-[#070b14] hover:bg-slate-800 text-slate-300 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="overflow-y-auto pr-2 space-y-5">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold tracking-wider text-rose-400 bg-rose-950/40 px-2.5 py-0.5 rounded border border-rose-500/30 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>OFFICIAL DIRECTIVE MANUAL</span>
              </span>
              <span className="text-xs font-mono font-bold text-slate-400">
                AIT-CEAR-WT26-REG-V1.4
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black font-tech text-slate-100">
              Wartech 2026 Rulebook &amp; Safety Protocols
            </h3>
          </div>

          <div className="space-y-4 text-xs font-body text-slate-300 leading-relaxed">
            {/* Directive */}
            <div className="p-4 rounded-xl bg-[#070b14] border border-slate-800 space-y-1">
              <span className="font-bold text-cyan-400 block font-tech text-sm uppercase tracking-wide">
                1. General Participation Directives
              </span>
              <p className="font-mono text-slate-400 text-[11px]">
                All tracks are open to undergraduate students. Valid college student ID is mandatory at the AIT campus gate. Teams can register up to 4 members per entry.
              </p>
            </div>

            {/* Power Constraints */}
            <div className="p-4 rounded-xl bg-[#070b14] border border-slate-800 space-y-2">
              <span className="font-bold text-emerald-400 block font-tech text-sm uppercase tracking-wide">
                2. Power &amp; Mechanical Constraints
              </span>
              <ul className="space-y-1.5 font-mono text-[11px] text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Maximum battery voltage capped at 16.8V (4S LiPo max).</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Manual master kill-switch must be prominently accessible on top deck.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Standard 2.4GHz FHSS wireless or Bluetooth/WiFi telemetry only.</span>
                </li>
              </ul>
            </div>

            {/* Disqualification */}
            <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-1">
              <div className="flex items-center gap-1.5 text-rose-400 font-bold font-tech text-sm uppercase tracking-wide">
                <AlertTriangle className="w-4 h-4" />
                <span>3. Disqualification &amp; Safety Protocol</span>
              </div>
              <p className="text-[11px] font-mono text-slate-300">
                Deliberate damage outside designated arena bounds, hazardous chemical release, or unshielded propellers in pits leads to immediate disqualification without refund.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between">
          <span className="text-[11px] font-mono font-bold text-slate-500">
            AIT PUNE ROBOTICS WING
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 font-mono font-bold text-xs text-slate-400 hover:text-slate-200 cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={handleDownload}
              className="cyber-btn-crimson !h-[38px] text-xs !px-4"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Rulebook (.txt)</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default RulebookModal;
