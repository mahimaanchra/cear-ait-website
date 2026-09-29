"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { X, CheckCircle2, ArrowRight, Terminal, Radio } from "lucide-react";
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
        particleCount: 100,
        spread: 70,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="relative w-full max-w-xl bg-[#0c1322] border border-cyan-500/35 rounded-2xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_25px_rgba(0,240,255,0.18)] my-8 overflow-hidden backdrop-blur-2xl"
      >
        <div className="cyber-bracket-top-left" />
        <div className="cyber-bracket-bottom-right" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg border border-slate-800 bg-[#070b14] hover:bg-slate-800 text-slate-300 hover:text-cyan-400 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {!isSubmitted ? (
          <div>
            {/* Header & Tabs */}
            <div className="mb-6 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#00f0ff] animate-ping" />
                <span className="text-[10px] font-mono font-bold tracking-wider text-cyan-400 bg-cyan-950/40 px-2.5 py-0.5 rounded border border-cyan-500/30">
                  OFFICIAL REGISTRATION PORTAL
                </span>
              </div>
              <h3 className="text-2xl font-black font-tech text-slate-100">
                Join CEAR or Enter Wartech
              </h3>

              {/* Tabs Switcher */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-[#070b14] border border-slate-800 rounded-lg text-xs font-tech font-bold">
                <button
                  type="button"
                  onClick={() => setActiveTab("inductions")}
                  className={`py-2 px-3 rounded-md transition-all cursor-pointer ${
                    activeTab === "inductions"
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_10px_rgba(0,240,255,0.25)]"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  Cadet Inductions (AIT)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("wartech")}
                  className={`py-2 px-3 rounded-md transition-all cursor-pointer ${
                    activeTab === "wartech"
                      ? "bg-rose-500/20 text-rose-400 border border-rose-500/40 shadow-[0_0_10px_rgba(255,51,102,0.25)]"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  Wartech 2026 (All Arenas)
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
              {activeTab === "inductions" ? (
                <>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1 font-tech uppercase text-[11px]">
                      Full Cadet Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Cadet Rahul Sharma"
                      value={inductionData.fullName}
                      onChange={(e) =>
                        setInductionData({ ...inductionData, fullName: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-800 bg-[#070b14] text-slate-100 font-mono focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400/30 transition-all placeholder:text-slate-600"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 font-bold mb-1 font-tech uppercase text-[11px]">
                        Institution Email *
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="yourname_branch@aitpune.edu.in"
                        value={inductionData.email}
                        onChange={(e) =>
                          setInductionData({ ...inductionData, email: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-800 bg-[#070b14] text-slate-100 font-mono focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400/30 transition-all placeholder:text-slate-600"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-bold mb-1 font-tech uppercase text-[11px]">
                        Year &amp; Branch *
                      </label>
                      <select
                        value={inductionData.yearBranch}
                        onChange={(e) =>
                          setInductionData({ ...inductionData, yearBranch: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-800 bg-[#070b14] text-slate-100 font-mono focus:border-cyan-400 focus:outline-none transition-all"
                      >
                        <option value="FE - Computer">FE - Computer Engineering</option>
                        <option value="FE - IT">FE - Information Technology</option>
                        <option value="FE - E&TC">FE - Electronics &amp; Telecom</option>
                        <option value="FE - Mechanical">FE - Mechanical Engineering</option>
                        <option value="SE - Computer">SE - Computer Engineering</option>
                        <option value="SE - E&TC">SE - Electronics &amp; Telecom</option>
                        <option value="SE - Mechanical">SE - Mechanical Engineering</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1 font-tech uppercase text-[11px]">
                      Primary Domain of Interest *
                    </label>
                    <select
                      value={inductionData.domain}
                      onChange={(e) =>
                        setInductionData({ ...inductionData, domain: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-800 bg-[#070b14] text-slate-100 font-mono focus:border-cyan-400 focus:outline-none transition-all"
                    >
                      <option value="AI & Neural Edge">AI, Edge Inference &amp; Reinforcement Learning</option>
                      <option value="Robotics & Embedded">Embedded Systems, ESP32 &amp; Custom PCB Design</option>
                      <option value="Computer Vision & SLAM">Computer Vision, LiDAR Point Clouds &amp; ROS2</option>
                      <option value="Mechanical & Fabrication">Mechanical Fabrication, CAD &amp; Combat Armor</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1 font-tech uppercase text-[11px]">
                      Why CEAR? (Motivation) *
                    </label>
                    <textarea
                      required
                      rows={2}
                      placeholder="Tell us about your enthusiasm for building robotics and what you'd like to engineer..."
                      value={inductionData.statement}
                      onChange={(e) =>
                        setInductionData({ ...inductionData, statement: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-800 bg-[#070b14] text-slate-100 font-mono focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400/30 transition-all placeholder:text-slate-600 resize-none"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 font-bold mb-1 font-tech uppercase text-[11px]">
                        Team Name *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Apex Mechatronics"
                        value={wartechData.teamName}
                        onChange={(e) =>
                          setWartechData({ ...wartechData, teamName: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-800 bg-[#070b14] text-slate-100 font-mono focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400/30 transition-all placeholder:text-slate-600"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-bold mb-1 font-tech uppercase text-[11px]">
                        College / Institution *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. IIT Bombay / COEP"
                        value={wartechData.college}
                        onChange={(e) =>
                          setWartechData({ ...wartechData, college: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-800 bg-[#070b14] text-slate-100 font-mono focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400/30 transition-all placeholder:text-slate-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1 font-tech uppercase text-[11px]">
                      Chosen Wartech Arena *
                    </label>
                    <select
                      value={wartechData.trackId}
                      onChange={(e) =>
                        setWartechData({ ...wartechData, trackId: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-800 bg-[#070b14] text-slate-100 font-mono focus:border-cyan-400 focus:outline-none transition-all"
                    >
                      {wartechTracks.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.trackCode} - {t.title} ({t.prizePool})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 font-bold mb-1 font-tech uppercase text-[11px]">
                        Team Leader Name *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Leader Full Name"
                        value={wartechData.leadName}
                        onChange={(e) =>
                          setWartechData({ ...wartechData, leadName: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-800 bg-[#070b14] text-slate-100 font-mono focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400/30 transition-all placeholder:text-slate-600"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-bold mb-1 font-tech uppercase text-[11px]">
                        Team Size *
                      </label>
                      <select
                        value={wartechData.teamSize}
                        onChange={(e) =>
                          setWartechData({ ...wartechData, teamSize: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-800 bg-[#070b14] text-slate-100 font-mono focus:border-cyan-400 focus:outline-none transition-all"
                      >
                        <option value="1 Member">1 Member (Solo Driver)</option>
                        <option value="2 Members">2 Members</option>
                        <option value="3 Members">3 Members</option>
                        <option value="4 Members">4 Members (Full Squad)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 font-bold mb-1 font-tech uppercase text-[11px]">
                        Contact Email *
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="leader@college.edu"
                        value={wartechData.email}
                        onChange={(e) =>
                          setWartechData({ ...wartechData, email: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-800 bg-[#070b14] text-slate-100 font-mono focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400/30 transition-all placeholder:text-slate-600"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-bold mb-1 font-tech uppercase text-[11px]">
                        WhatsApp Phone *
                      </label>
                      <input
                        required
                        type="tel"
                        placeholder="+91 9876543210"
                        value={wartechData.phone}
                        onChange={(e) =>
                          setWartechData({ ...wartechData, phone: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-800 bg-[#070b14] text-slate-100 font-mono focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400/30 transition-all placeholder:text-slate-600"
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 font-mono text-xs text-slate-400 hover:text-slate-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={
                    activeTab === "wartech"
                      ? "cyber-btn-crimson !h-[40px] text-xs !px-5"
                      : "cyber-btn-primary !h-[40px] text-xs !px-5"
                  }
                >
                  <span>Submit Registration</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(0,255,157,0.3)]">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-1">
              <h4 className="text-2xl font-black font-tech text-slate-100">
                Registration Confirmed!
              </h4>
              <p className="text-xs font-mono text-slate-400">
                REGISTRATION TOKEN:{" "}
                <span className="font-bold text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30 font-mono">
                  {regId}
                </span>
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#070b14] border border-slate-800 text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
              {activeTab === "inductions"
                ? "Your induction application has been queued for the 2026-27 batch. Orientation details and screening schedules will be sent to your student email."
                : "Your squad slot has been reserved for Wartech 2026. The official arena schedule and reporting instructions have been transmitted to your squad leader."}
            </div>

            <button
              onClick={handleReset}
              className="cyber-btn-primary text-xs mt-2"
            >
              <span>Done</span>
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default RegistrationModal;
