"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Download,
  ShieldCheck,
  FileText,
  Search,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Copy,
  Check,
  ChevronRight,
  Zap,
  Users,
  Trophy,
} from "lucide-react";
import { wartechTracks } from "@/data/siteData";

interface RulebookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTrack?: (trackId: string) => void;
}

type TabType = "tracks" | "general" | "safety" | "faq";

export function RulebookModal({ isOpen, onClose, onSelectTrack }: RulebookModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>("tracks");
  const [selectedTrackId, setSelectedTrackId] = useState<string>(wartechTracks[0]?.id || "robo-soccer");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedCitation, setCopiedCitation] = useState<string | null>(null);

  const selectedTrack = useMemo(
    () => wartechTracks.find((t) => t.id === selectedTrackId) || wartechTracks[0],
    [selectedTrackId]
  );

  const handleCopyCitation = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCitation(id);
    setTimeout(() => setCopiedCitation(null), 2000);
  };

  const handleDownload = () => {
    const textContent = `=====================================================================
WARTECH 2026 OFFICIAL RULEBOOK & REGULATION GUIDELINES
ARMY INSTITUTE OF TECHNOLOGY, PUNE
CENTRE OF EXCELLENCE FOR AI & ROBOTICS (CEAR)
=====================================================================

1. GENERAL ELIGIBILITY DIRECTIVES
- Open to bona fide undergraduate engineering students from all accredited technical institutions across India.
- Valid collegiate photo ID card must be presented during check-in at AIT campus security.
- Teams may consist of 1 to 4 members. Inter-college and inter-disciplinary teams are fully permitted.
- A single team may register multiple robots across distinct competition arenas.

2. COMBAT & ELECTRICAL REGULATIONS
- Max Operating Voltage: 16.8V DC (4S LiPo max fully charged).
- Master Kill-Switch: All fighting, racing, and climbing platforms MUST incorporate an externally accessible, brightly labeled physical or mechanical Emergency Stop / Kill-Switch.
- Weapon Envelope: Pneumatic, mechanical wedges, spinning flywheels, and lifting arms permitted.
- Strictly Prohibited: Active pyrotechnics, explosives, chemical hazards, untethered projectiles, and RF signal jammers.

3. ARENA TRACK DIRECTIVES & SPECIFICATIONS:
${wartechTracks
  .map(
    (t, idx) => `
[${idx + 1}] ${t.title.toUpperCase()} (Code: ${t.trackCode})
---------------------------------------------------------------
- Arena Type: ${t.arenaType}
- Team Envelope: ${t.teamSize}
- Total Prize Allocation: ${t.prizePool}
- Key Regulations:
${t.rulesHighlight.map((r) => `  * ${r}`).join("\n")}
`
  )
  .join("\n")}

4. DISQUALIFICATION & PENALTY CONDITIONS:
- Exceeding dimensional envelope or weight tolerance by >2% during pre-fight technical inspection.
- Transmitting on unapproved RF bands without frequency coordination.
- Manual human intervention inside active arena without referee authorization.
- Unsportsmanlike conduct or violation of military cantonment discipline.

5. OFFICIAL CONTACTS & REGISTRATION:
- Centre of Excellence for AI & Robotics (CEAR), Lab 104, AIT Pune
- Email: cear@aitpune.edu.in
- Website: https://cear-ait.vercel.app/wartech
=====================================================================`;

    const element = document.createElement("a");
    const file = new Blob([textContent], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "WARTECH_2026_OFFICIAL_RULEBOOK.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#240d2b]/80 backdrop-blur-xl overflow-y-auto">
          {/* Backdrop Click */}
          <div className="fixed inset-0" onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-4xl bg-white/95 backdrop-blur-2xl border border-white/90 rounded-[32px] p-5 sm:p-8 shadow-[0_30px_90px_rgba(36,13,43,0.3)] my-6 overflow-hidden max-h-[92vh] flex flex-col justify-between"
          >
            {/* Top Specular Inner Bevel Highlight */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />

            {/* Header & Close Button */}
            <div className="flex items-start justify-between pb-4 border-b border-[#240d2b]/[0.08] relative z-10">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#ff6b35] font-semibold bg-[#ff6b35]/10 px-3 py-1 rounded-full border border-[#ff6b35]/20">
                    Official Directive Manual // Rev 2026.4
                  </span>
                  <span className="hidden sm:inline-block text-xs font-mono text-[#240d2b]/50">
                    AIT Pune CEAR
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold font-display text-[#240d2b] pt-0.5">
                  Wartech 2026 Regulations &amp; Rulebook
                </h3>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-full text-[#240d2b]/50 hover:text-[#240d2b] hover:bg-black/[0.05] transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Tabs & Search */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 pb-3 border-b border-[#240d2b]/[0.06]">
              {/* Tab Switcher */}
              <div className="flex items-center gap-1.5 p-1 rounded-full bg-[#f6f3ee] border border-[#240d2b]/[0.06] overflow-x-auto">
                <button
                  onClick={() => setActiveTab("tracks")}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === "tracks"
                      ? "bg-[#240d2b] text-white font-medium shadow-xs"
                      : "text-[#240d2b]/70 hover:text-[#240d2b]"
                  }`}
                >
                  8 Track Arenas
                </button>
                <button
                  onClick={() => setActiveTab("general")}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === "general"
                      ? "bg-[#240d2b] text-white font-medium shadow-xs"
                      : "text-[#240d2b]/70 hover:text-[#240d2b]"
                  }`}
                >
                  General Directives
                </button>
                <button
                  onClick={() => setActiveTab("safety")}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === "safety"
                      ? "bg-[#240d2b] text-white font-medium shadow-xs"
                      : "text-[#240d2b]/70 hover:text-[#240d2b]"
                  }`}
                >
                  Safety &amp; Kill-Switch
                </button>
                <button
                  onClick={() => setActiveTab("faq")}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === "faq"
                      ? "bg-[#240d2b] text-white font-medium shadow-xs"
                      : "text-[#240d2b]/70 hover:text-[#240d2b]"
                  }`}
                >
                  Protests &amp; Scoring
                </button>
              </div>

              {/* Quick Keyword Search */}
              <div className="relative min-w-[200px]">
                <Search className="w-3.5 h-3.5 text-[#240d2b]/40 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter rules by keyword..."
                  className="w-full pl-8 pr-7 py-1.5 rounded-full bg-[#f6f3ee] border border-[#240d2b]/[0.08] text-xs font-mono text-[#240d2b] placeholder:text-[#240d2b]/40 focus:outline-none focus:border-[#ff6b35]"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-2 text-[#240d2b]/40 hover:text-[#240d2b]"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            {/* Scrollable Tab Content Body */}
            <div className="overflow-y-auto pr-1 my-4 space-y-4 max-h-[50vh]">
              {/* TAB 1: 8 TRACK ARENAS */}
              {activeTab === "tracks" && (
                <div className="space-y-4">
                  {/* Track Selector Pill Strip */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                    {wartechTracks.map((t) => {
                      const isSelected = t.id === selectedTrackId;
                      return (
                        <button
                          key={t.id}
                          onClick={() => setSelectedTrackId(t.id)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all shrink-0 cursor-pointer border ${
                            isSelected
                              ? "bg-[#ff6b35] text-white border-[#ff6b35] font-semibold shadow-xs"
                              : "bg-[#f6f3ee] text-[#240d2b]/70 border-[#240d2b]/[0.06] hover:border-[#ff6b35]/40 hover:text-[#240d2b]"
                          }`}
                        >
                          <span className="font-bold mr-1">{t.trackCode}</span>
                          <span>{t.title.split("(")[0].trim()}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Selected Track Deep Detail Card */}
                  {selectedTrack && (
                    <div className="p-5 sm:p-6 rounded-2xl bg-[#f6f3ee] border border-[#240d2b]/[0.08] space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#240d2b]/[0.08] pb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono font-bold text-[#ff6b35] bg-[#ff6b35]/10 px-2 py-0.5 rounded-md">
                              {selectedTrack.trackCode}
                            </span>
                            <span className="text-xs font-mono text-[#240d2b]/60">
                              {selectedTrack.arenaType}
                            </span>
                          </div>
                          <h4 className="text-xl sm:text-2xl font-bold font-display text-[#240d2b] mt-1">
                            {selectedTrack.title}
                          </h4>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="px-3 py-1 rounded-full bg-white border border-[#240d2b]/[0.08] text-xs font-mono text-[#240d2b]/80 shadow-2xs">
                            <span className="text-[#240d2b]/50 mr-1">Prize:</span>
                            <span className="font-bold text-[#ff6b35]">{selectedTrack.prizePool}</span>
                          </div>
                          <div className="px-3 py-1 rounded-full bg-white border border-[#240d2b]/[0.08] text-xs font-mono text-[#240d2b]/80 shadow-2xs">
                            <span className="text-[#240d2b]/50 mr-1">Team:</span>
                            <span className="font-bold text-[#240d2b]">{selectedTrack.teamSize}</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-[#240d2b]/80 font-body leading-relaxed">
                        {selectedTrack.description}
                      </p>

                      {/* Rule Highlights */}
                      <div className="space-y-2 pt-1">
                        <span className="text-xs font-mono font-bold text-[#240d2b] uppercase tracking-wider block">
                          Technical &amp; Combat Directives:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {selectedTrack.rulesHighlight.map((rule, idx) => (
                            <div
                              key={idx}
                              className="p-3 rounded-xl bg-white border border-[#240d2b]/[0.06] flex items-start gap-2 shadow-2xs"
                            >
                              <CheckCircle2 className="w-4 h-4 text-[#ff6b35] shrink-0 mt-0.5" />
                              <span className="text-xs text-[#240d2b]/80 font-mono leading-relaxed">
                                {rule}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Direct Register Action */}
                      {onSelectTrack && (
                        <div className="pt-3 border-t border-[#240d2b]/[0.08] flex items-center justify-between">
                          <span className="text-xs font-mono text-[#240d2b]/60">
                            Ready to battle in {selectedTrack.title}?
                          </span>
                          <button
                            onClick={() => {
                              onSelectTrack(selectedTrack.id);
                              onClose();
                            }}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium text-white bg-[#ff6b35] hover:bg-[#fa5519] transition-all cursor-pointer shadow-xs hover:scale-102"
                          >
                            <span>Register for this Arena</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: GENERAL DIRECTIVES */}
              {activeTab === "general" && (
                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-[#f6f3ee] border border-[#240d2b]/[0.06] space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#240d2b] font-display text-sm">
                        Directive 1.0: Collegiate Eligibility &amp; Identification
                      </span>
                      <button
                        onClick={() =>
                          handleCopyCitation(
                            "Directive 1.0: All tracks are open to undergraduate engineering college students. Valid student ID is mandatory.",
                            "dir1"
                          )
                        }
                        className="text-[#240d2b]/40 hover:text-[#ff6b35] p-1 transition-colors cursor-pointer"
                        title="Copy Directive"
                      >
                        {copiedCitation === "dir1" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    <p className="text-xs text-[#240d2b]/75 font-body leading-relaxed">
                      All tracks are open to undergraduate engineering students from recognized technical universities and institutes. Valid collegiate identity cards and bona fide certificates must be shown at the AIT campus gate. Teams can register up to 4 members. Inter-college and inter-branch teams are permitted without restriction.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#f6f3ee] border border-[#240d2b]/[0.06] space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#240d2b] font-display text-sm">
                        Directive 2.0: Dimensional Envelopes &amp; Weigh-In Checks
                      </span>
                      <button
                        onClick={() =>
                          handleCopyCitation(
                            "Directive 2.0: Pre-match technical inspection is mandatory. Dimensional envelope must not exceed arena bounds.",
                            "dir2"
                          )
                        }
                        className="text-[#240d2b]/40 hover:text-[#ff6b35] p-1 transition-colors cursor-pointer"
                        title="Copy Directive"
                      >
                        {copiedCitation === "dir2" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    <p className="text-xs text-[#240d2b]/75 font-body leading-relaxed">
                      All combatants and rovers must undergo official weighing and dimensional sizing inside Lab 104 prior to qualifying rounds. A tolerance of maximum 2% is allowed. Any expansion mechanisms (such as wedge deployment or wings) must remain within the active match rules.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#f6f3ee] border border-[#240d2b]/[0.06] space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#240d2b] font-display text-sm">
                        Directive 3.0: RF Spectrum &amp; Failsafe Telemetry
                      </span>
                      <button
                        onClick={() =>
                          handleCopyCitation(
                            "Directive 3.0: Standard 2.4GHz DSMX/AFHDS protocol. Auto throttle zero on packet loss required.",
                            "dir3"
                          )
                        }
                        className="text-[#240d2b]/40 hover:text-[#ff6b35] p-1 transition-colors cursor-pointer"
                        title="Copy Directive"
                      >
                        {copiedCitation === "dir3" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    <p className="text-xs text-[#240d2b]/75 font-body leading-relaxed">
                      All wireless transmitters must operate in the 2.4GHz frequency hopping band (e.g. FlySky, FrSky, RadioMaster). Failsafe must be actively configured such that loss of signal immediately cuts drive motor throttle to zero. Unapproved RF jammers or transmitters outside designated bands will result in disqualification.
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 3: SAFETY & KILL SWITCH */}
              {activeTab === "safety" && (
                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-2">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      <span className="font-bold text-[#240d2b] font-display text-sm">
                        Mandatory Emergency Stop / Kill-Switch Architecture
                      </span>
                    </div>
                    <p className="text-xs text-[#240d2b]/80 font-body leading-relaxed">
                      Every combat, sumo, and racing robot MUST have an externally accessible physical master power switch or removable key links clearly marked with high-visibility yellow/orange hazard tape. Referees must be able to disconnect all power within 3 seconds without lifting or touching moving mechanisms.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#f6f3ee] border border-[#240d2b]/[0.06] space-y-1.5">
                    <span className="font-bold text-[#240d2b] font-display text-sm block">
                      Battery Chemistry &amp; Maximum Voltage
                    </span>
                    <p className="text-xs text-[#240d2b]/75 font-body leading-relaxed">
                      Maximum battery voltage permitted on any drive or weapon bus is 16.8V DC (nominal 4S Lithium-Polymer). Batteries must be housed in rigid protective enclosures with no exposed soft pouch cells. Damaged, puffed, or leaking cells will be confiscated by range safety officers.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#f6f3ee] border border-[#240d2b]/[0.06] space-y-1.5">
                    <span className="font-bold text-[#240d2b] font-display text-sm block">
                      Banned Weapons &amp; Hazardous Materials
                    </span>
                    <p className="text-xs text-[#240d2b]/75 font-body leading-relaxed">
                      Strictly banned: liquids, oils, foams, pyrotechnic ignition, chemicals, untethered projectiles, radio frequency jamming, high-voltage tasers, and blinding lasers above Class 1.
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 4: FAQ & DISPUTES */}
              {activeTab === "faq" && (
                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-[#f6f3ee] border border-[#240d2b]/[0.06] space-y-1.5">
                    <span className="font-bold text-[#240d2b] font-display text-sm block">
                      How are ties resolved in time trials?
                    </span>
                    <p className="text-xs text-[#240d2b]/75 font-body leading-relaxed">
                      In the event of a tied lap time or track score, secondary tie-breakers apply: lowest weight of the platform, followed by a head-to-head sudden-death re-run.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#f6f3ee] border border-[#240d2b]/[0.06] space-y-1.5">
                    <span className="font-bold text-[#240d2b] font-display text-sm block">
                      What is the formal protest procedure?
                    </span>
                    <p className="text-xs text-[#240d2b]/75 font-body leading-relaxed">
                      Any dispute regarding referee calls must be submitted in writing by the Team Captain to the Chief Technical Jury within 15 minutes of match completion. Video evidence captured by the official CEAR arena camera feed will be reviewed.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#f6f3ee] border border-[#240d2b]/[0.06] space-y-1.5">
                    <span className="font-bold text-[#240d2b] font-display text-sm block">
                      Can we swap motor controllers or batteries between heats?
                    </span>
                    <p className="text-xs text-[#240d2b]/75 font-body leading-relaxed">
                      Yes. Teams have a standard 10-minute pit turnaround time between knockout rounds to swap pre-inspected batteries or damaged parts.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-[#240d2b]/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 text-xs font-mono font-medium text-[#240d2b] hover:text-[#ff6b35] transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-[#ff6b35]" />
                <span>Download Official Rulebook (.TXT)</span>
              </button>

              <div className="flex items-center gap-3">
                <button
                  onClick={onClose}
                  className="py-2 px-5 rounded-full text-xs font-mono text-[#240d2b]/70 hover:text-[#240d2b] border border-[#240d2b]/[0.1] hover:bg-[#f6f3ee] transition-all cursor-pointer"
                >
                  Dismiss
                </button>
                <button
                  onClick={onClose}
                  className="py-2 px-6 rounded-full text-xs font-medium bg-[#ff6b35] text-white hover:bg-[#fa5519] transition-all cursor-pointer shadow-[0_2px_10px_rgba(255,107,53,0.3)] hover:scale-102"
                >
                  Acknowledge &amp; Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default RulebookModal;
