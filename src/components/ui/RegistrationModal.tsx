"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { X, CheckCircle2, Trophy, Users, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-xl bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-2xl my-8 overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            {/* Header & Tabs */}
            <div className="mb-6 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                  OFFICIAL PORTAL REGISTRATION
                </span>
              </div>
              <h3 className="text-2xl font-extrabold font-tech text-slate-900">
                Join CEAR or Enter Wartech
              </h3>

              {/* Tabs Switcher with Logo Dark Navy Active Pill */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-lg text-xs font-tech font-bold pt-1">
                <button
                  type="button"
                  onClick={() => setActiveTab("inductions")}
                  className={`py-2 px-3 rounded-md transition-all ${
                    activeTab === "inductions"
                      ? "bg-logo-navy text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Cadet Inductions (AIT)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("wartech")}
                  className={`py-2 px-3 rounded-md transition-all ${
                    activeTab === "wartech"
                      ? "bg-logo-navy text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Wartech 2026 (All Colleges)
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
              {activeTab === "inductions" ? (
                <>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      FULL CADET NAME *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Cadet Rahul Sharma"
                      value={inductionData.fullName}
                      onChange={(e) =>
                        setInductionData({ ...inductionData, fullName: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-500 bg-slate-50 focus:bg-white text-slate-800"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">
                        INSTITUTION EMAIL *
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="yourname_branch@aitpune.edu.in"
                        value={inductionData.email}
                        onChange={(e) =>
                          setInductionData({ ...inductionData, email: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-500 bg-slate-50 focus:bg-white text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">
                        YEAR &amp; BRANCH *
                      </label>
                      <select
                        value={inductionData.yearBranch}
                        onChange={(e) =>
                          setInductionData({ ...inductionData, yearBranch: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-500 bg-slate-50 focus:bg-white text-slate-800"
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
                    <label className="block text-slate-700 font-bold mb-1">
                      PRIMARY DOMAIN OF INTEREST *
                    </label>
                    <select
                      value={inductionData.domain}
                      onChange={(e) =>
                        setInductionData({ ...inductionData, domain: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-500 bg-slate-50 focus:bg-white text-slate-800"
                    >
                      <option value="AI & Neural Edge">AI, Edge Inference &amp; Reinforcement Learning</option>
                      <option value="Robotics & Embedded">Embedded Systems, ESP32 &amp; Custom PCB Design</option>
                      <option value="Computer Vision & SLAM">Computer Vision, LiDAR Point Clouds &amp; ROS2</option>
                      <option value="Mechanical & Fabrication">Mechanical Fabrication, CAD &amp; Combat Armor</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      WHY CEAR? (SHORT MOTIVATION) *
                    </label>
                    <textarea
                      required
                      rows={2}
                      placeholder="Tell us about your enthusiasm for building robotics and what you'd like to engineer..."
                      value={inductionData.statement}
                      onChange={(e) =>
                        setInductionData({ ...inductionData, statement: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-500 bg-slate-50 focus:bg-white text-slate-800"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">
                        TEAM NAME *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Apex Mechatronics"
                        value={wartechData.teamName}
                        onChange={(e) =>
                          setWartechData({ ...wartechData, teamName: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-500 bg-slate-50 focus:bg-white text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">
                        COLLEGE / INSTITUTION *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. IIT Bombay / COEP"
                        value={wartechData.college}
                        onChange={(e) =>
                          setWartechData({ ...wartechData, college: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-500 bg-slate-50 focus:bg-white text-slate-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      CHOSEN WARTECH TRACK *
                    </label>
                    <select
                      value={wartechData.trackId}
                      onChange={(e) =>
                        setWartechData({ ...wartechData, trackId: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-500 bg-slate-50 focus:bg-white text-slate-800"
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
                      <label className="block text-slate-700 font-bold mb-1">
                        TEAM LEADER NAME *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Leader Full Name"
                        value={wartechData.leadName}
                        onChange={(e) =>
                          setWartechData({ ...wartechData, leadName: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-500 bg-slate-50 focus:bg-white text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">
                        TEAM SIZE *
                      </label>
                      <select
                        value={wartechData.teamSize}
                        onChange={(e) =>
                          setWartechData({ ...wartechData, teamSize: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-500 bg-slate-50 focus:bg-white text-slate-800"
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
                      <label className="block text-slate-700 font-bold mb-1">
                        CONTACT EMAIL *
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="leader@college.edu"
                        value={wartechData.email}
                        onChange={(e) =>
                          setWartechData({ ...wartechData, email: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-500 bg-slate-50 focus:bg-white text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">
                        WHATSAPP PHONE *
                      </label>
                      <input
                        required
                        type="tel"
                        placeholder="+91 9876543210"
                        value={wartechData.phone}
                        onChange={(e) =>
                          setWartechData({ ...wartechData, phone: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-500 bg-slate-50 focus:bg-white text-slate-800"
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg font-tech font-bold text-xs text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-logo-navy hover:bg-slate-800 text-white font-tech font-bold text-xs px-5 py-2.5 rounded-lg shadow-sm border border-slate-800 flex items-center gap-1.5 cursor-pointer transition-all"
                >
                  <span>Submit Registration</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <h4 className="text-2xl font-bold font-tech text-slate-900">
                Registration Confirmed!
              </h4>
              <p className="text-xs font-mono text-slate-500">
                TRANSMISSION TOKEN: <span className="font-bold text-blue-600">{regId}</span>
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs font-sans text-slate-600 max-w-md mx-auto leading-relaxed">
              {activeTab === "inductions"
                ? "Your induction application has been queued for the 2026-27 batch. Orientation details and screening schedules will be sent to your student email."
                : "Your squad slot has been reserved for Wartech 2026. The official track rulebook and reporting instructions have been logged to your squad leader."}
            </div>

            <button
              onClick={handleReset}
              className="btn-primary-tech text-xs mt-2"
            >
              <span>Done</span>
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
