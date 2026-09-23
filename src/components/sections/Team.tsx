"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Linkedin, Github, UserCheck, ArrowRight } from "lucide-react";
import { facultyIncharge, secretaries, coreTeam } from "@/data/siteData";

const categories = ["ALL", "SECRETARIES", "DOMAIN LEADS"];

export function Team() {
  const [activeCategory, setActiveCategory] = useState("ALL");

  const allMembers = [
    ...secretaries.map((s) => ({ ...s, tabCategory: "SECRETARIES" })),
    ...coreTeam.map((c) => ({ ...c, tabCategory: "DOMAIN LEADS" })),
  ];

  const filteredMembers =
    activeCategory === "ALL"
      ? allMembers
      : allMembers.filter((m) => m.tabCategory === activeCategory);

  return (
    <section id="team" className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-14">
        {/* Section Heading: Red Dash + TEAM MODULES_ */}
        <div>
          <div className="w-10 h-1 bg-red-600 rounded-sm mb-3" />
          <h2 className="text-3xl sm:text-5xl font-extrabold uppercase font-industrial tracking-tight text-zinc-900 leading-[0.95] mb-3">
            TEAM <br />
            <span className="text-[#0d5c58]">MODULES_</span>
          </h2>
          <p className="text-sm text-zinc-600 font-sans max-w-xl">
            Distinguished faculty mentorship and dedicated student engineering cohorts powering defense automation and research.
          </p>
        </div>

        {/* 1. Faculty Incharge Section - Centered Cards */}
        <div className="space-y-6">
          <div className="flex justify-center">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-3.5 py-1 rounded-full bg-red-100 text-red-700 border border-red-200">
              FACULTY INCHARGE
            </span>
          </div>

          <div className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="w-full max-w-sm bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm flex flex-col items-center text-center relative overflow-hidden"
            >
              {/* Window dots at top */}
              <div className="w-full flex items-center gap-1.5 pb-4 mb-4 border-b border-zinc-100">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span className="font-mono text-[10px] text-zinc-400 ml-auto">HEAD_MODULE</span>
              </div>

              {/* Portrait */}
              <div className="w-28 h-28 rounded-xl bg-zinc-100 border border-zinc-200 mb-4 flex items-center justify-center overflow-hidden">
                <UserCheck className="w-14 h-14 text-zinc-600" />
              </div>

              {/* Name & Title */}
              <h3 className="font-industrial text-xl font-bold text-zinc-900">
                {facultyIncharge.name}
              </h3>
              <p className="font-mono text-xs text-[#0d5c58] font-bold mt-1">
                {facultyIncharge.role}
              </p>
              <p className="font-sans text-xs text-zinc-500 mt-2 leading-relaxed">
                {facultyIncharge.specialization}
              </p>

              {/* Status indicator dots */}
              <div className="flex items-center gap-2 mt-4 pt-3 border-t border-zinc-100 w-full justify-center text-[10px] font-mono text-zinc-400">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                <span>AIT PUNE</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#0d5c58]" />
                <span>E&amp;TC DEPT</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* 2. Filter Pills: ALL / SECRETARIES / DOMAIN LEADS */}
        <div className="flex justify-center gap-2 sm:gap-3 font-mono text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 sm:px-6 py-2 rounded-full font-bold transition-all cursor-pointer ${
                activeCategory === cat
                  ? "bg-[#0d5c58] text-white shadow-sm"
                  : "bg-white text-zinc-600 hover:text-zinc-900 border border-zinc-200 hover:border-zinc-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 3. Grid of Student Leaders in macOS Window Card format */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMembers.map((member, idx) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="window-card p-4 flex flex-col justify-between"
            >
              <div>
                {/* macOS Window Controls */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-100">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <span className="font-mono text-[9px] text-zinc-400">
                    ID.0{idx + 1}
                  </span>
                </div>

                {/* Member Avatar / Box */}
                <div className="w-full aspect-[4/3] rounded-lg bg-zinc-100 border border-zinc-200 mb-3 flex items-center justify-center font-mono text-zinc-400 text-xs">
                  <div className="text-center">
                    <span className="font-bold text-zinc-700 block text-sm">
                      {member.name.split(" ")[0]}
                    </span>
                    <span className="text-[10px] text-zinc-500 uppercase">
                      {member.category}
                    </span>
                  </div>
                </div>

                {/* Member Details */}
                <h4 className="font-industrial text-base font-bold text-zinc-900 leading-tight">
                  {member.name}
                </h4>

                <p className="font-mono text-[11px] text-[#0d5c58] font-bold mt-1">
                  {member.role}
                </p>

                {member.subRole && (
                  <p className="font-mono text-[10px] text-zinc-500 mt-0.5">
                    {member.subRole}
                  </p>
                )}

                <p className="font-sans text-xs text-zinc-600 mt-2 line-clamp-2 leading-relaxed">
                  {member.bio || member.specialization}
                </p>
              </div>

              {/* Card Footer: Social / Details */}
              <div className="pt-3 mt-3 border-t border-zinc-100 flex items-center justify-between text-xs font-mono text-zinc-400">
                <span className="text-[10px] uppercase font-bold text-zinc-500">
                  {member.category}
                </span>

                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0d5c58] hover:text-black font-bold flex items-center gap-1"
                  >
                    <Linkedin className="w-3 h-3" />
                    <span>Bio</span>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* 4. Bottom Induction Banner - AIT_CIDC Style */}
        <div className="flex justify-center pt-4">
          <Link
            href="#events"
            className="w-full max-w-xl py-3 px-6 rounded-full bg-[#0d5c58] hover:bg-[#073a37] text-white font-mono text-xs font-bold tracking-wider flex items-center justify-between transition-colors shadow-md"
          >
            <span>BECOME A CADET • INDUCTIONS 2026-27</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
