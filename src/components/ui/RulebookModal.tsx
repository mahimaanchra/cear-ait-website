"use client";

import React from "react";
import { motion } from "framer-motion";
import { X, Download, ShieldCheck } from "lucide-react";
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
- Open to undergraduate engineering students from all accredited technical institutions across India.
- Teams may consist of 1 to 4 members. Cross-college teams are permitted.

2. COMBAT & ELECTRICAL REGULATIONS
- Max Operating Voltage: 16.8V DC (4S LiPo max).
- Weapon Limits: Spring, pneumatic, and passive mechanical wedges permitted. No active explosives, untethered projectiles, or chemical hazards.
- Kill-Switch: All robots must feature an externally accessible mechanical or wireless Emergency Stop.

3. TRACK HIGHLIGHTS:
${wartechTracks.map((t) => `- [${t.id}] ${t.title}: Team ${t.teamSize}, Prize ${t.prizePool}`).join("\n")}

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#240d2b]/70 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="relative w-full max-w-2xl bg-white border border-[#240d2b]/[0.1] rounded-3xl p-6 sm:p-10 shadow-2xl my-8 overflow-hidden max-h-[85vh] flex flex-col justify-between"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-[#240d2b]/50 hover:text-[#240d2b] hover:bg-[#240d2b]/[0.05] transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto pr-2 space-y-6">
          <div className="space-y-1">
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#ff6b35] font-semibold">
              Official Directive Manual
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-[#240d2b]">
              Wartech 2026 Regulations
            </h3>
          </div>

          <div className="space-y-4 text-xs font-body text-[#240d2b]/80 leading-relaxed">
            <div className="p-5 rounded-2xl bg-[#f6f3ee] border border-[#240d2b]/[0.06] space-y-1.5">
              <span className="font-bold text-[#240d2b] block font-display text-sm">
                1. General Participation Directives
              </span>
              <p className="text-xs text-[#240d2b]/70">
                All tracks are open to undergraduate college students. Valid student ID card is mandatory at the AIT campus gate. Teams can register up to 4 members per entry.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#f6f3ee] border border-[#240d2b]/[0.06] space-y-1.5">
              <span className="font-bold text-[#240d2b] block font-display text-sm">
                2. Power &amp; Mechanical Constraints
              </span>
              <p className="text-xs text-[#240d2b]/70">
                Maximum battery rating permitted is 4S LiPo (16.8V max fully charged). All fighting and racing robots must feature an easily accessible physical master power kill-switch.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#f6f3ee] border border-[#240d2b]/[0.06] space-y-1.5">
              <span className="font-bold text-[#240d2b] block font-display text-sm">
                3. Safety &amp; Disqualification
              </span>
              <p className="text-xs text-[#240d2b]/70">
                Any weapon releasing untethered projectiles, flammable liquids, or hazardous chemicals will cause immediate disqualification and forfeiture.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-6 mt-6 border-t border-[#240d2b]/[0.08] flex items-center justify-between">
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-2 text-xs font-mono font-medium text-[#240d2b] hover:text-[#ff6b35] transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[#ff6b35]" />
            <span>Download Full TXT Rulebook</span>
          </button>

          <button
            onClick={onClose}
            className="py-2.5 px-6 rounded-full text-xs font-medium bg-[#ff6b35] text-white hover:bg-[#fa5519] transition-colors cursor-pointer shadow-[0_2px_10px_rgba(255,107,53,0.3)]"
          >
            Acknowledge &amp; Close
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default RulebookModal;
