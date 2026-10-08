"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { X, CheckCircle2, ArrowRight, Loader2, AlertCircle, ShieldCheck, Sparkles, Copy, Check, FileCheck } from "lucide-react";
import { wartechTracks } from "@/data/siteData";

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTrack?: string;
}

export function RegistrationModal({ isOpen, onClose, initialTrack }: RegistrationModalProps) {
  const [activeTab, setActiveTab] = useState<"inductions" | "wartech">("inductions");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [regId, setRegId] = useState("");

  // Inductions Form State
  const [inductionData, setInductionData] = useState({
    fullName: "",
    email: "",
    yearBranch: "FE - Computer",
    domain: "AI & Neural Edge",
    statement: "",
  });

  // Wartech Form State
  const [wartechData, setWartechData] = useState({
    teamName: "",
    college: "",
    trackId: initialTrack || "robo-soccer",
    leadName: "",
    email: "",
    phone: "",
    teamSize: "3 Members",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [copiedPass, setCopiedPass] = useState(false);

  const handleQuickFill = () => {
    if (activeTab === "inductions") {
      setInductionData({
        fullName: "Cadet Aryan Varma",
        email: "aryan.varma@aitpune.edu.in",
        yearBranch: "FE - Computer",
        domain: "AI & Neural Edge",
        statement: "Interested in edge perception on NVIDIA Jetson and ROS2 autonomous navigation pipelines.",
      });
    } else {
      setWartechData({
        teamName: "AIT Vortex Robotics",
        college: "Army Institute of Technology, Pune",
        trackId: "robo-soccer",
        leadName: "Captain R. Shekhawat",
        email: "vortex.lead@aitpune.edu.in",
        phone: "+91 98765 43210",
        teamSize: "3 Members",
      });
    }
  };

  const handleCopyPass = () => {
    if (!regId) return;
    navigator.clipboard?.writeText(regId);
    setCopiedPass(true);
    setTimeout(() => setCopiedPass(false), 3000);
  };

  useEffect(() => {
    if (initialTrack) {
      setActiveTab("wartech");
      setWartechData((prev) => ({ ...prev, trackId: initialTrack }));
    }
  }, [initialTrack]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const payload =
      activeTab === "wartech"
        ? {
            registration_type: "wartech",
            applicant_name: wartechData.leadName,
            email: wartechData.email,
            phone: wartechData.phone,
            track_or_domain: wartechData.trackId,
            team_name: wartechData.teamName,
            team_size: wartechData.teamSize,
            college: wartechData.college,
            meta: { trackId: wartechData.trackId },
          }
        : {
            registration_type: "inductions",
            applicant_name: inductionData.fullName,
            email: inductionData.email,
            track_or_domain: inductionData.domain,
            statement: inductionData.statement,
            meta: { yearBranch: inductionData.yearBranch },
          };

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit registration");
      }

      setRegId(data.id);
      setIsSubmitted(true);

      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
        });
      } catch {
        // safe fallback
      }
    } catch (err: any) {
      setSubmitError(err?.message || "An error occurred while submitting. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setSubmitError(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#240d2b]/80 backdrop-blur-xl overflow-y-auto">
          {/* Backdrop Click */}
          <div className="fixed inset-0" onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-xl bg-white/95 backdrop-blur-2xl border border-white/90 rounded-[32px] p-6 sm:p-10 shadow-[0_30px_90px_rgba(36,13,43,0.3)] my-8 overflow-hidden"
          >
            {/* Top Specular Inner Bevel Highlight */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full text-[#240d2b]/50 hover:text-[#240d2b] hover:bg-black/[0.05] transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {!isSubmitted ? (
              <div>
                {/* Header & Tabs */}
                <div className="mb-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono tracking-widest uppercase text-[#240d2b]/50 bg-white/80 border border-[#240d2b]/[0.08] px-2.5 py-0.5 rounded-full">
                        Official Entry Portal
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-bold font-display text-[#240d2b] mt-1">
                        CEAR Registry
                      </h3>
                    </div>

                    <button
                      type="button"
                      onClick={handleQuickFill}
                      className="text-[11px] font-mono text-[#ff6b35] hover:text-[#e05a36] bg-[#ff6b35]/10 border border-[#ff6b35]/20 hover:bg-[#ff6b35]/15 px-3 py-1 rounded-full transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>Auto-fill Sample</span>
                    </button>
                  </div>

                  {/* Glassmorphic Tabs */}
                  <div className="grid grid-cols-2 p-1.5 rounded-full bg-[#f6f3ee] border border-[#240d2b]/[0.08] relative">
                    <button
                      type="button"
                      onClick={() => setActiveTab("inductions")}
                      className={`relative py-2 text-xs font-medium rounded-full transition-all cursor-pointer ${
                        activeTab === "inductions"
                          ? "text-[#f6f3ee] font-semibold"
                          : "text-[#240d2b]/60 hover:text-[#240d2b]"
                      }`}
                    >
                      {activeTab === "inductions" && (
                        <motion.div
                          layoutId="modalTabIndicator"
                          className="absolute inset-0 bg-[#240d2b] rounded-full -z-10 shadow-xs"
                          transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        />
                      )}
                      Club Inductions 2026
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab("wartech")}
                      className={`relative py-2 text-xs font-medium rounded-full transition-all cursor-pointer ${
                        activeTab === "wartech"
                          ? "text-[#f6f3ee] font-semibold"
                          : "text-[#240d2b]/60 hover:text-[#240d2b]"
                      }`}
                    >
                      {activeTab === "wartech" && (
                        <motion.div
                          layoutId="modalTabIndicator"
                          className="absolute inset-0 bg-[#240d2b] rounded-full -z-10 shadow-xs"
                          transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        />
                      )}
                      Wartech Arena Entry
                    </button>
                  </div>
                </div>

                {/* TAB 1: INDUCTIONS FORM */}
                {activeTab === "inductions" && (
                  <form onSubmit={handleSubmit} className="space-y-4 text-xs font-body">
                    <div>
                      <label className="block text-xs font-mono font-bold text-[#240d2b] mb-1 uppercase">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={inductionData.fullName}
                        onChange={(e) => setInductionData({ ...inductionData, fullName: e.target.value })}
                        placeholder="Your full name"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/70 backdrop-blur-md border border-[#240d2b]/[0.1] text-[#240d2b] text-sm focus:border-[#ff6b35] focus:bg-white focus:ring-2 focus:ring-[#ff6b35]/20 focus:outline-none transition-all placeholder:text-[#240d2b]/30 shadow-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold text-[#240d2b] mb-1 uppercase">
                        College Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={inductionData.email}
                        onChange={(e) => setInductionData({ ...inductionData, email: e.target.value })}
                        placeholder="your.email@aitpune.edu.in"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/70 backdrop-blur-md border border-[#240d2b]/[0.1] text-[#240d2b] text-sm focus:border-[#ff6b35] focus:bg-white focus:ring-2 focus:ring-[#ff6b35]/20 focus:outline-none transition-all placeholder:text-[#240d2b]/30 shadow-xs"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-mono font-bold text-[#240d2b] mb-1 uppercase">
                          Year &amp; Branch
                        </label>
                        <select
                          value={inductionData.yearBranch}
                          onChange={(e) => setInductionData({ ...inductionData, yearBranch: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-white/70 backdrop-blur-md border border-[#240d2b]/[0.1] text-[#240d2b] text-sm focus:border-[#ff6b35] focus:bg-white focus:ring-2 focus:ring-[#ff6b35]/20 focus:outline-none transition-all shadow-xs"
                        >
                          <option value="FE - Computer">FE - Computer</option>
                          <option value="FE - IT">FE - IT</option>
                          <option value="FE - E&TC">FE - E&amp;TC</option>
                          <option value="FE - Mechanical">FE - Mechanical</option>
                          <option value="SE - Computer">SE - Computer</option>
                          <option value="SE - IT">SE - IT</option>
                          <option value="SE - E&TC">SE - E&amp;TC</option>
                          <option value="SE - Mechanical">SE - Mechanical</option>
                          <option value="TE/BE Student">TE/BE Student</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-bold text-[#240d2b] mb-1 uppercase">
                          Preferred Domain
                        </label>
                        <select
                          value={inductionData.domain}
                          onChange={(e) => setInductionData({ ...inductionData, domain: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-white/70 backdrop-blur-md border border-[#240d2b]/[0.1] text-[#240d2b] text-sm focus:border-[#ff6b35] focus:bg-white focus:ring-2 focus:ring-[#ff6b35]/20 focus:outline-none transition-all shadow-xs"
                        >
                          <option value="AI & Neural Edge">AI &amp; Neural Edge Perception</option>
                          <option value="Autonomous Navigation">Autonomous Navigation &amp; ROS2</option>
                          <option value="CAD & Mechatronics">CAD, 3D Print &amp; Mechatronics</option>
                          <option value="Embedded Systems">Embedded &amp; PCB Hardware</option>
                          <option value="Swarm Aerial & Drone">Swarm Aerial &amp; Drone Craft</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold text-[#240d2b] mb-1 uppercase">
                        Why CEAR? Brief Statement
                      </label>
                      <textarea
                        rows={3}
                        value={inductionData.statement}
                        onChange={(e) => setInductionData({ ...inductionData, statement: e.target.value })}
                        placeholder="Briefly state your technical interests, projects, or background..."
                        className="w-full px-4 py-2.5 rounded-xl bg-white/70 backdrop-blur-md border border-[#240d2b]/[0.1] text-[#240d2b] text-sm focus:border-[#ff6b35] focus:bg-white focus:ring-2 focus:ring-[#ff6b35]/20 focus:outline-none transition-all resize-none placeholder:text-[#240d2b]/30 shadow-xs"
                      />
                    </div>

                    {submitError && activeTab === "inductions" && (
                      <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                        <span>{submitError}</span>
                      </div>
                    )}

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 px-6 rounded-full text-sm font-medium bg-[#ff6b35] text-white hover:bg-[#fa5519] disabled:opacity-60 disabled:cursor-not-allowed transition-all cursor-pointer shadow-[0_4px_14px_rgba(255,107,53,0.3)] hover:shadow-[0_6px_20px_rgba(255,107,53,0.45)] flex items-center justify-center gap-2 hover:scale-101 active:scale-99"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Submitting Application...</span>
                          </>
                        ) : (
                          <span>Submit Induction Application</span>
                        )}
                      </button>
                    </div>
                  </form>
                )}

                {/* TAB 2: WARTECH REGISTRATION FORM */}
                {activeTab === "wartech" && (
                  <form onSubmit={handleSubmit} className="space-y-4 text-xs font-body">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-mono font-bold text-[#240d2b] mb-1 uppercase">
                          Team Name
                        </label>
                        <input
                          type="text"
                          required
                          value={wartechData.teamName}
                          onChange={(e) => setWartechData({ ...wartechData, teamName: e.target.value })}
                          placeholder="Enter team name"
                          className="w-full px-4 py-2.5 rounded-xl bg-white/70 backdrop-blur-md border border-[#240d2b]/[0.1] text-[#240d2b] text-sm focus:border-[#ff6b35] focus:bg-white focus:ring-2 focus:ring-[#ff6b35]/20 focus:outline-none transition-all placeholder:text-[#240d2b]/30 shadow-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-bold text-[#240d2b] mb-1 uppercase">
                          College / Institution
                        </label>
                        <input
                          type="text"
                          required
                          value={wartechData.college}
                          onChange={(e) => setWartechData({ ...wartechData, college: e.target.value })}
                          placeholder="College / Institution"
                          className="w-full px-4 py-2.5 rounded-xl bg-white/70 backdrop-blur-md border border-[#240d2b]/[0.1] text-[#240d2b] text-sm focus:border-[#ff6b35] focus:bg-white focus:ring-2 focus:ring-[#ff6b35]/20 focus:outline-none transition-all placeholder:text-[#240d2b]/30 shadow-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold text-[#240d2b] mb-1 uppercase">
                        Select Combat Arena / Track
                      </label>
                      <select
                        value={wartechData.trackId}
                        onChange={(e) => setWartechData({ ...wartechData, trackId: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/70 backdrop-blur-md border border-[#240d2b]/[0.1] text-[#240d2b] text-sm focus:border-[#ff6b35] focus:bg-white focus:ring-2 focus:ring-[#ff6b35]/20 focus:outline-none transition-all shadow-xs"
                      >
                        {wartechTracks.map((t) => (
                          <option key={t.id} value={t.id}>
                            {t.title} (Prize: {t.prizePool})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-mono font-bold text-[#240d2b] mb-1 uppercase">
                          Team Leader Name
                        </label>
                        <input
                          type="text"
                          required
                          value={wartechData.leadName}
                          onChange={(e) => setWartechData({ ...wartechData, leadName: e.target.value })}
                          placeholder="Full name"
                          className="w-full px-4 py-2.5 rounded-xl bg-white/70 backdrop-blur-md border border-[#240d2b]/[0.1] text-[#240d2b] text-sm focus:border-[#ff6b35] focus:bg-white focus:ring-2 focus:ring-[#ff6b35]/20 focus:outline-none transition-all placeholder:text-[#240d2b]/30 shadow-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-bold text-[#240d2b] mb-1 uppercase">
                          Contact Phone
                        </label>
                        <input
                          type="tel"
                          required
                          value={wartechData.phone}
                          onChange={(e) => setWartechData({ ...wartechData, phone: e.target.value })}
                          placeholder="+91 Phone number"
                          className="w-full px-4 py-2.5 rounded-xl bg-white/70 backdrop-blur-md border border-[#240d2b]/[0.1] text-[#240d2b] text-sm focus:border-[#ff6b35] focus:bg-white focus:ring-2 focus:ring-[#ff6b35]/20 focus:outline-none transition-all placeholder:text-[#240d2b]/30 shadow-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold text-[#240d2b] mb-1 uppercase">
                        Leader Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={wartechData.email}
                        onChange={(e) => setWartechData({ ...wartechData, email: e.target.value })}
                        placeholder="leader.email@example.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/70 backdrop-blur-md border border-[#240d2b]/[0.1] text-[#240d2b] text-sm focus:border-[#ff6b35] focus:bg-white focus:ring-2 focus:ring-[#ff6b35]/20 focus:outline-none transition-all placeholder:text-[#240d2b]/30 shadow-xs"
                      />
                    </div>

                    {submitError && activeTab === "wartech" && (
                      <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                        <span>{submitError}</span>
                      </div>
                    )}

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 px-6 rounded-full text-sm font-medium bg-[#ff6b35] text-white hover:bg-[#fa5519] disabled:opacity-60 disabled:cursor-not-allowed transition-all cursor-pointer shadow-[0_4px_14px_rgba(255,107,53,0.3)] hover:shadow-[0_6px_20px_rgba(255,107,53,0.45)] flex items-center justify-center gap-2 hover:scale-101 active:scale-99"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Confirming Registration...</span>
                          </>
                        ) : (
                          <span>Confirm Registration</span>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            ) : (
              /* SUCCESS SCREEN WITH OFFICIAL PASS CARD */
              <div className="text-center py-6 space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-[#ff6b35]/12 border border-[#ff6b35]/25 text-[#ff6b35] mx-auto flex items-center justify-center shadow-xs">
                  <CheckCircle2 className="w-8 h-8 text-[#ff6b35]" />
                </div>

                <div>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#ff6b35] font-semibold bg-[#ff6b35]/10 px-3 py-1 rounded-full border border-[#ff6b35]/20">
                    Registration Verified
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold font-display text-[#240d2b] mt-2">
                    Welcome to CEAR Cadre
                  </h3>
                  <p className="text-xs sm:text-sm text-[#240d2b]/70 font-body max-w-sm mx-auto mt-1.5">
                    Your credentials have been securely stored in Lab 104 registry. Retain your admission code for orientation &amp; pit admittance.
                  </p>
                </div>

                {/* Official Glass Admission Pass */}
                <div className="w-full bg-[#f6f3ee] border border-[#240d2b]/[0.1] rounded-2xl p-5 text-left font-mono space-y-3 relative overflow-hidden shadow-inner">
                  {/* Decorative corner tag */}
                  <div className="flex items-center justify-between pb-3 border-b border-[#240d2b]/[0.08]">
                    <div className="flex items-center gap-2 text-xs">
                      <ShieldCheck className="w-4 h-4 text-[#ff6b35]" />
                      <span className="font-bold text-[#240d2b] uppercase">CEAR ADMISSION PASS</span>
                    </div>
                    <span className="text-[10px] text-[#240d2b]/50">AIT LAB 104 • PUNE</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-[10px] text-[#240d2b]/50 block">PARTICIPANT / TEAM:</span>
                      <span className="font-bold text-[#240d2b] truncate block">
                        {activeTab === "wartech" ? wartechData.teamName || wartechData.leadName : inductionData.fullName || "Cadet"}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#240d2b]/50 block">TRACK / DOMAIN:</span>
                      <span className="font-bold text-[#ff6b35] truncate block">
                        {activeTab === "wartech" ? wartechData.trackId : inductionData.domain}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between bg-white/80 p-3 rounded-xl border border-white/80">
                    <div>
                      <span className="text-[10px] text-[#240d2b]/50 block">PASSCODE ID:</span>
                      <span className="font-bold text-base text-[#240d2b] tracking-wider">{regId}</span>
                    </div>

                    <button
                      type="button"
                      onClick={handleCopyPass}
                      className="px-3.5 py-1.5 rounded-lg bg-[#240d2b] hover:bg-[#3b1646] text-white text-xs font-mono font-medium transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      {copiedPass ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-white/80" />
                          <span>Copy Pass</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <button
                    onClick={handleReset}
                    className="py-3 px-8 rounded-full text-xs font-medium bg-[#240d2b] text-white hover:bg-[#3b1646] transition-all cursor-pointer shadow-md hover:scale-102"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default RegistrationModal;
