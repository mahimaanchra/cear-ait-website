"use client";

import React from "react";
import { motion } from "framer-motion";
import { X, Download, ShieldCheck, AlertTriangle, FileText, CheckCircle2 } from "lucide-react";
import { wartechTracks } from "@/data/siteData";

interface RulebookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RulebookModal({ isOpen, onClose }: RulebookModalProps) {
  if (!isOpen) return null;

  const handleDownload = () => {
    // Generate a simple text file or trigger browser download
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-2xl my-8 overflow-hidden max-h-[85vh] flex flex-col justify-between"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto pr-2 space-y-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-600 uppercase">
              <ShieldCheck className="w-4 h-4" />
              <span>OFFICIAL COMPETITION MANUAL</span>
            </div>
            <h3 className="text-2xl font-black font-tech text-slate-900">
              Wartech 2026 Rulebook &amp; Safety Guidelines
            </h3>
            <p className="text-xs font-mono text-slate-500">
              DOCUMENT ID: AIT-CEAR-WT26-REG-V1.4
            </p>
          </div>

          <div className="space-y-4 text-xs font-sans text-slate-600 leading-relaxed">
            <div className="p-3 rounded-lg bg-blue-50 border border-blue-100 space-y-1">
              <span className="font-bold text-blue-900 block font-tech text-sm">
                1. General Participation Directives
              </span>
              <p>
                All tracks are open to undergraduate students. Valid college student ID is mandatory at the AIT campus gate. Teams can register up to 4 members per entry.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
              <span className="font-bold text-slate-900 block font-tech text-sm">
                2. Power &amp; Mechanical Constraints
              </span>
              <ul className="space-y-1 font-mono text-[11px] text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Maximum battery voltage capped at 16.8V (4S LiPo max).</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Manual master kill-switch must be prominently accessible on top deck.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Standard 2.4GHz FHSS wireless or Bluetooth/WiFi telemetry only.</span>
                </li>
              </ul>
            </div>

            <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 space-y-1">
              <div className="flex items-center gap-1.5 text-amber-800 font-bold font-tech text-sm">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>3. Disqualification &amp; Safety Protocol</span>
              </div>
              <p className="text-[11px] font-mono text-amber-900">
                Deliberate damage outside designated arena bounds, hazardous chemical release, or unshielded propellers in pits leads to immediate disqualification without refund.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] font-mono text-slate-400">
            AIT PUNE ROBOTICS WING
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg font-tech font-bold text-xs text-slate-600 hover:bg-slate-100"
            >
              Close
            </button>
            <button
              onClick={handleDownload}
              className="bg-logo-navy hover:bg-slate-800 text-white font-tech font-bold text-xs px-4 py-2.5 rounded-lg shadow-sm border border-slate-800 flex items-center gap-1.5 cursor-pointer transition-all"
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
