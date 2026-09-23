"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Zap, Trophy, Shield, ArrowRight, CheckCircle2, Award } from "lucide-react";
import { wartechTracks, WartechTrack } from "@/data/siteData";

export function Wartech() {
  const [selectedTrack, setSelectedTrack] = useState<WartechTrack | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    teamName: "",
    college: "",
    email: "",
    phone: "",
    trackId: "robowars",
  });

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        firstName: "",
        lastName: "",
        teamName: "",
        college: "",
        email: "",
        phone: "",
        trackId: "robowars",
      });
    }, 3000);
  };

  return (
    <section id="wartech" className="relative py-12 sm:py-20 px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* 1. Wartech Festival Overview & Tracks Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-[28px] sm:rounded-[36px] bg-white border border-black/[0.08] p-6 sm:p-12 md:p-14 shadow-sm"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-zinc-500 font-semibold block mb-3">
                [FLAGSHIP COMBAT FESTIVAL]
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold font-cartoon tracking-tight text-zinc-900 leading-tight">
                Wartech 2026
              </h2>
              <p className="text-sm sm:text-base text-zinc-600 mt-2 max-w-xl font-sans">
                The premier inter-collegiate combat and autonomous robotics festival at Army Institute of Technology, Pune. ₹1,50,000+ prize pool.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="#registration-card"
                className="btn-lime text-xs"
              >
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>REGISTER TEAM</span>
              </a>
            </div>
          </div>

          {/* Tracks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {wartechTracks.map((track, idx) => (
              <div
                key={track.id}
                className="p-6 rounded-2xl bg-zinc-50/60 border border-zinc-200/80 hover:bg-white hover:border-zinc-300 hover:shadow-sm transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-zinc-500 group-hover:text-black">
                      [0{idx + 1}]
                    </span>
                    <span className="font-mono text-[11px] font-bold text-black bg-[#d4f933] px-2 py-0.5 rounded">
                      {track.prizePool}
                    </span>
                  </div>

                  <h3 className="font-mono text-base font-bold text-zinc-900 mb-2">
                    {track.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans mb-4">
                    {track.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-200/60 text-xs font-mono text-zinc-500">
                  <div className="flex justify-between items-center">
                    <span>TEAM SIZE:</span>
                    <span className="font-bold text-zinc-900">{track.teamSize}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 2. Floating "Save your seat" Card (Matching the Right Screenshot in Dribbble!) */}
        <div id="registration-card" className="rounded-[28px] sm:rounded-[36px] pixel-mesh-card p-6 sm:p-12 md:p-16 border border-black/[0.08] relative overflow-hidden shadow-sm">
          {/* Subtle grid pattern inside */}
          <div className="absolute inset-0 pixel-grid-pattern opacity-50 pointer-events-none" />

          {/* Centered Floating Registration Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-xl mx-auto bg-white rounded-3xl p-7 sm:p-10 border border-black/[0.09] shadow-md relative z-10"
          >
            <div className="mb-6">
              <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-400 font-semibold block mb-2">
                [REGISTRATION]
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-cartoon tracking-tight text-zinc-900 mb-2">
                Save your seat
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans">
                Join us for Wartech 2026 and explore hands-on robotics combat, line traversal, and autonomous navigation. Registration is open to all engineering institutes.
              </p>
            </div>

            {isSubmitted ? (
              <div className="text-center py-12 space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#d4f933] text-black mx-auto flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="font-cartoon text-xl text-zinc-900 font-bold">
                  Seat Saved!
                </h4>
                <p className="text-xs sm:text-sm text-zinc-600 font-sans">
                  We have received your registration for {formData.teamName || "your team"}. Event rulebook sent to your email.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-4 font-sans text-xs">
                {/* First Name & Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-mono text-[11px] text-zinc-500 block mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-zinc-50 border border-zinc-200 text-zinc-900 focus:bg-white focus:border-black focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[11px] text-zinc-500 block mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-zinc-50 border border-zinc-200 text-zinc-900 focus:bg-white focus:border-black focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Team Name & College */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-mono text-[11px] text-zinc-500 block mb-1">
                      Team Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. MechWarriors"
                      value={formData.teamName}
                      onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-zinc-50 border border-zinc-200 text-zinc-900 focus:bg-white focus:border-black focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[11px] text-zinc-500 block mb-1">
                      College / Institute *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. AIT Pune"
                      value={formData.college}
                      onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-zinc-50 border border-zinc-200 text-zinc-900 focus:bg-white focus:border-black focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Email Address & Phone Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-mono text-[11px] text-zinc-500 block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="leader@college.edu"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-zinc-50 border border-zinc-200 text-zinc-900 focus:bg-white focus:border-black focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[11px] text-zinc-500 block mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-zinc-50 border border-zinc-200 text-zinc-900 focus:bg-white focus:border-black focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Competition Track Select */}
                <div>
                  <label className="font-mono text-[11px] text-zinc-500 block mb-1">
                    Select Track *
                  </label>
                  <select
                    value={formData.trackId}
                    onChange={(e) => setFormData({ ...formData, trackId: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-50 border border-zinc-200 text-zinc-900 focus:bg-white focus:border-black focus:outline-none transition-colors font-mono"
                  >
                    {wartechTracks.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.title} ({t.prizePool})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Marketing Preferences Checkbox */}
                <div className="pt-2">
                  <label className="flex items-start gap-2 cursor-pointer text-zinc-600 text-[11px]">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="mt-0.5 rounded border-zinc-300 text-black focus:ring-0"
                    />
                    <span>
                      I agree that the organizing team can send schedule updates and rulebooks in relation to Wartech events.
                    </span>
                  </label>
                </div>

                {/* Save my seat Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-lg text-xs font-mono font-bold tracking-wider uppercase text-black bg-[#d4f933] hover:bg-[#c4ec18] shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>SAVE MY SEAT</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-center text-[10px] font-mono text-zinc-400 mt-2">
                    Free to attend • Hosted at AIT Pune Arena
                  </p>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
