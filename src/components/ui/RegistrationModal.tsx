"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { X, CheckCircle2, ArrowRight } from "lucide-react";
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

  useEffect(() => {
    if (initialTrack) {
      setActiveTab("wartech");
      setWartechData((prev) => ({ ...prev, trackId: initialTrack }));
    }
  }, [initialTrack]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `CEAR-${activeTab === "wartech" ? "WT" : "IND"}-${Math.floor(
      100000 + Math.random() * 900000
    )}`;
    setRegId(generatedId);
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
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0d1321]/60 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="relative w-full max-w-xl bg-white border border-[#0d1321]/[0.1] rounded-3xl p-6 sm:p-10 shadow-2xl my-8 overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-[#0d1321]/50 hover:text-[#0d1321] hover:bg-[#0d1321]/[0.05] transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            {/* Header & Tabs */}
            <div className="mb-6 space-y-4">
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#0d1321]/50">
                  Official Registration
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-display text-[#0d1321] mt-1">
                  CEAR Entry Portal
                </h3>
              </div>

              {/* Tabs */}
              <div className="grid grid-cols-2 p-1 rounded-full bg-[#fafaf9] border border-[#0d1321]/[0.08]">
                <button
                  type="button"
                  onClick={() => setActiveTab("inductions")}
                  className={`py-2 text-xs font-medium rounded-full transition-all cursor-pointer ${
                    activeTab === "inductions"
                      ? "bg-[#0d1321] text-white shadow-xs"
                      : "text-[#0d1321]/60 hover:text-[#0d1321]"
                  }`}
                >
                  Club Inductions 2026
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("wartech")}
                  className={`py-2 text-xs font-medium rounded-full transition-all cursor-pointer ${
                    activeTab === "wartech"
                      ? "bg-[#0d1321] text-white shadow-xs"
                      : "text-[#0d1321]/60 hover:text-[#0d1321]"
                  }`}
                >
                  Wartech Arena Entry
                </button>
              </div>
            </div>

            {/* TAB 1: INDUCTIONS FORM */}
            {activeTab === "inductions" && (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-body">
                <div>
                  <label className="block text-xs font-mono font-bold text-[#0d1321] mb-1 uppercase">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={inductionData.fullName}
                    onChange={(e) => setInductionData({ ...inductionData, fullName: e.target.value })}
                    placeholder="Cadet Name"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#fafaf9] border border-[#0d1321]/[0.08] text-[#0d1321] text-sm focus:border-[#0d1321] focus:bg-white focus:outline-none transition-all placeholder:text-[#0d1321]/30"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-[#0d1321] mb-1 uppercase">
                    College Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={inductionData.email}
                    onChange={(e) => setInductionData({ ...inductionData, email: e.target.value })}
                    placeholder="name.branch@aitpune.edu.in"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#fafaf9] border border-[#0d1321]/[0.08] text-[#0d1321] text-sm focus:border-[#0d1321] focus:bg-white focus:outline-none transition-all placeholder:text-[#0d1321]/30"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono font-bold text-[#0d1321] mb-1 uppercase">
                      Year &amp; Branch
                    </label>
                    <select
                      value={inductionData.yearBranch}
                      onChange={(e) => setInductionData({ ...inductionData, yearBranch: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#fafaf9] border border-[#0d1321]/[0.08] text-[#0d1321] text-sm focus:border-[#0d1321] focus:bg-white focus:outline-none transition-all"
                    >
                      <option value="FE - Computer">FE - Computer</option>
                      <option value="FE - IT">FE - IT</option>
                      <option value="FE - E&TC">FE - E&amp;TC</option>
                      <option value="FE - Mechanical">FE - Mechanical</option>
                      <option value="SE - Computer">SE - Computer</option>
                      <option value="SE - IT">SE - IT</option>
                      <option value="SE - E&TC">SE - E&amp;TC</option>
                      <option value="SE - Mechanical">SE - Mechanical</option>
                      <option value="TE/BE Cadet">TE/BE Cadet</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-[#0d1321] mb-1 uppercase">
                      Preferred Domain
                    </label>
                    <select
                      value={inductionData.domain}
                      onChange={(e) => setInductionData({ ...inductionData, domain: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#fafaf9] border border-[#0d1321]/[0.08] text-[#0d1321] text-sm focus:border-[#0d1321] focus:bg-white focus:outline-none transition-all"
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
                  <label className="block text-xs font-mono font-bold text-[#0d1321] mb-1 uppercase">
                    Why CEAR? Brief Statement
                  </label>
                  <textarea
                    rows={3}
                    value={inductionData.statement}
                    onChange={(e) => setInductionData({ ...inductionData, statement: e.target.value })}
                    placeholder="Briefly state your robotics or coding background..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#fafaf9] border border-[#0d1321]/[0.08] text-[#0d1321] text-sm focus:border-[#0d1321] focus:bg-white focus:outline-none transition-all resize-none placeholder:text-[#0d1321]/30"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-full text-sm font-medium bg-[#0d1321] text-white hover:bg-[#1a2640] transition-all cursor-pointer shadow-sm hover:shadow-md"
                  >
                    Submit Induction Application
                  </button>
                </div>
              </form>
            )}

            {/* TAB 2: WARTECH REGISTRATION FORM */}
            {activeTab === "wartech" && (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-body">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono font-bold text-[#0d1321] mb-1 uppercase">
                      Team Name
                    </label>
                    <input
                      type="text"
                      required
                      value={wartechData.teamName}
                      onChange={(e) => setWartechData({ ...wartechData, teamName: e.target.value })}
                      placeholder="e.g. MechaVanguard"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#fafaf9] border border-[#0d1321]/[0.08] text-[#0d1321] text-sm focus:border-[#0d1321] focus:bg-white focus:outline-none transition-all placeholder:text-[#0d1321]/30"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-[#0d1321] mb-1 uppercase">
                      College / Institution
                    </label>
                    <input
                      type="text"
                      required
                      value={wartechData.college}
                      onChange={(e) => setWartechData({ ...wartechData, college: e.target.value })}
                      placeholder="e.g. AIT Pune / COEP"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#fafaf9] border border-[#0d1321]/[0.08] text-[#0d1321] text-sm focus:border-[#0d1321] focus:bg-white focus:outline-none transition-all placeholder:text-[#0d1321]/30"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-[#0d1321] mb-1 uppercase">
                    Select Combat Arena / Track
                  </label>
                  <select
                    value={wartechData.trackId}
                    onChange={(e) => setWartechData({ ...wartechData, trackId: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#fafaf9] border border-[#0d1321]/[0.08] text-[#0d1321] text-sm focus:border-[#0d1321] focus:bg-white focus:outline-none transition-all"
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
                    <label className="block text-xs font-mono font-bold text-[#0d1321] mb-1 uppercase">
                      Team Leader Name
                    </label>
                    <input
                      type="text"
                      required
                      value={wartechData.leadName}
                      onChange={(e) => setWartechData({ ...wartechData, leadName: e.target.value })}
                      placeholder="Full Name"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#fafaf9] border border-[#0d1321]/[0.08] text-[#0d1321] text-sm focus:border-[#0d1321] focus:bg-white focus:outline-none transition-all placeholder:text-[#0d1321]/30"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-[#0d1321] mb-1 uppercase">
                      Contact Phone
                    </label>
                    <input
                      type="tel"
                      required
                      value={wartechData.phone}
                      onChange={(e) => setWartechData({ ...wartechData, phone: e.target.value })}
                      placeholder="+91 9876543210"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#fafaf9] border border-[#0d1321]/[0.08] text-[#0d1321] text-sm focus:border-[#0d1321] focus:bg-white focus:outline-none transition-all placeholder:text-[#0d1321]/30"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-[#0d1321] mb-1 uppercase">
                    Leader Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={wartechData.email}
                    onChange={(e) => setWartechData({ ...wartechData, email: e.target.value })}
                    placeholder="leader@college.edu.in"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#fafaf9] border border-[#0d1321]/[0.08] text-[#0d1321] text-sm focus:border-[#0d1321] focus:bg-white focus:outline-none transition-all placeholder:text-[#0d1321]/30"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-full text-sm font-medium bg-[#0d1321] text-white hover:bg-[#1a2640] transition-all cursor-pointer shadow-sm hover:shadow-md"
                  >
                    Confirm Squad Registration
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          /* SUCCESS SCREEN */
          <div className="text-center py-10 space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#fafaf9] text-[#0d1321] border border-[#0d1321]/[0.1] mx-auto flex items-center justify-center font-black">
              <CheckCircle2 className="w-8 h-8 text-[#0d1321]" />
            </div>

            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#0d1321]/50">
                Registration Confirmed
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-[#0d1321] mt-1">
                Welcome to CEAR
              </h3>
              <p className="text-xs sm:text-sm text-[#0d1321]/70 font-body max-w-sm mx-auto mt-2">
                Your dossier has been officially recorded in our registry. Check your email for screening schedule and guidelines.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#fafaf9] border border-[#0d1321]/[0.08] inline-block font-mono text-xs">
              <span className="text-[#0d1321]/50 block">Registration Code:</span>
              <span className="font-bold text-base text-[#0d1321]">{regId}</span>
            </div>

            <div>
              <button
                onClick={handleReset}
                className="py-3 px-8 rounded-full text-xs font-medium bg-[#0d1321] text-white hover:bg-[#1a2640] transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default RegistrationModal;
