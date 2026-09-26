"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Linkedin, Github, UserCheck, ShieldCheck, Quote, Users, Award } from "lucide-react";
import { TeamMember } from "@/data/siteData";
import { useSiteContent } from "@/context/SiteContentContext";

export function Team() {
  const { facultyIncharge, secretaries, jointSecretaries, coreContributors } = useSiteContent();
  return (
    <section id="team" className="relative py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-logo-navy text-white text-xs font-mono font-bold uppercase tracking-wider border border-slate-800 shadow-xs">
            <Users className="w-3.5 h-3.5 text-blue-400" />
            <span>ORGANIZATIONAL CADRE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-tech text-slate-900 tracking-tight">
            Team Hierarchy &amp; Leadership
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
            The student engineers, domain specialists, and academic mentorship guiding AI &amp; robotics research at Army Institute of Technology.
          </p>
        </div>

        {/* 1. LEVEL 1: Faculty In-Charge (Top Spotlight Card) */}
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2">
            <span className="h-px bg-slate-300 w-12" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-500">
              1. FACULTY IN-CHARGE • TOP SPOTLIGHT
            </span>
            <span className="h-px bg-slate-300 w-12" />
          </div>

          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl border-2 border-slate-200 border-t-4 border-t-logo-navy shadow-md p-6 sm:p-8 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 bg-logo-navy text-white font-mono text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider border-b border-l border-slate-700">
                CHIEF ADVISOR &amp; LAB HEAD
              </div>

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                {/* Square Profile Image / Avatar */}
                <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-xl aspect-square bg-gradient-to-br from-logo-navy to-slate-900 border-2 border-slate-700 flex flex-col items-center justify-center text-white shrink-0 shadow-sm relative overflow-hidden">
                  {facultyIncharge.imageUrl ? (
                    <Image
                      src={facultyIncharge.imageUrl}
                      alt={facultyIncharge.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <>
                      <span className="font-tech text-3xl font-black tracking-tight">
                        {facultyIncharge.avatarInitials || "AP"}
                      </span>
                      <span className="text-[10px] font-mono tracking-widest text-slate-300 mt-1 uppercase">
                        FACULTY
                      </span>
                    </>
                  )}
                  <div className="absolute bottom-2 right-2 z-10">
                    <ShieldCheck className="w-4 h-4 text-emerald-300" />
                  </div>
                </div>

                {/* Member Info */}
                <div className="space-y-2 text-center sm:text-left flex-1">
                  <div>
                    <h3 className="text-2xl font-extrabold font-tech text-slate-900">
                      {facultyIncharge.name}
                    </h3>
                    <p className="font-tech text-sm font-bold text-blue-600">
                      {facultyIncharge.role}
                    </p>
                    <p className="text-xs font-mono text-slate-500">
                      {facultyIncharge.subRole}
                    </p>
                  </div>

                  {/* 1-Line Custom Quote */}
                  <div className="p-3 rounded-lg bg-blue-50/70 border border-blue-100 text-slate-700 text-xs font-sans italic flex items-start gap-2">
                    <Quote className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                    <span>&ldquo;{facultyIncharge.quote}&rdquo;</span>
                  </div>

                  <p className="text-xs text-slate-600 font-mono">
                    <span className="font-bold text-slate-700">Domain Focus:</span> {facultyIncharge.specialization}
                  </p>

                  {facultyIncharge.linkedin && (
                    <div className="pt-2 flex justify-center sm:justify-start">
                      <a
                        href={facultyIncharge.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <Linkedin className="w-3.5 h-3.5" />
                        <span>Faculty Profile</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* 2. LEVEL 2: Secretaries (Core Executive Leads) */}
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2">
            <span className="h-px bg-slate-300 w-12" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-500">
              2. SECRETARIES • CORE EXECUTIVE LEADS
            </span>
            <span className="h-px bg-slate-300 w-12" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {secretaries.map((sec, idx) => (
              <motion.div
                key={sec.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-white rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md p-5 sm:p-6 transition-all flex flex-col justify-between"
              >
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-4">
                  {/* Square Profile Image */}
                  <div className={`w-24 h-24 rounded-lg aspect-square ${sec.avatarBg || "bg-blue-600 text-white"} flex flex-col items-center justify-center shrink-0 border border-slate-200 shadow-xs relative overflow-hidden`}>
                    {sec.imageUrl ? (
                      <Image src={sec.imageUrl} alt={sec.name} fill className="object-cover" />
                    ) : (
                      <>
                        <span className="font-tech text-xl font-bold">{sec.avatarInitials || sec.name.slice(0, 2).toUpperCase()}</span>
                        <span className="text-[9px] font-mono tracking-wider opacity-80 uppercase mt-0.5">SECRETARY</span>
                      </>
                    )}
                  </div>

                  <div className="text-center sm:text-left space-y-1 flex-1">
                    <h4 className="text-lg font-bold font-tech text-slate-900">
                      {sec.name}
                    </h4>
                    <p className="text-xs font-tech font-bold text-blue-600">
                      {sec.role}
                    </p>
                    <p className="text-[11px] font-mono text-slate-500">
                      {sec.subRole}
                    </p>
                  </div>
                </div>

                {/* 1-Line Custom Quote */}
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-slate-600 text-xs font-sans italic mb-3 flex items-start gap-1.5">
                  <Quote className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span className="line-clamp-2">&ldquo;{sec.quote}&rdquo;</span>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500">
                  <span className="text-[10px] uppercase font-bold text-slate-400">EXECUTIVE LEAD</span>
                  <div className="flex items-center gap-2">
                    {sec.linkedin && (
                      <a href={sec.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-600">
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                    {sec.github && (
                      <a href={sec.github} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-900">
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 3. LEVEL 3: Joint Secretaries (Domain Leads) */}
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2">
            <span className="h-px bg-slate-300 w-12" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-500">
              3. JOINT SECRETARIES • DOMAIN LEADS
            </span>
            <span className="h-px bg-slate-300 w-12" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {jointSecretaries.map((js, idx) => (
              <motion.div
                key={js.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bg-white rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md p-5 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Square Profile Image */}
                  <div className="w-full aspect-square rounded-lg mb-4 bg-slate-100 border border-slate-200 flex flex-col items-center justify-center relative overflow-hidden">
                    {js.imageUrl ? (
                      <Image src={js.imageUrl} alt={js.name} fill className="object-cover" />
                    ) : (
                      <>
                        <div className={`w-14 h-14 rounded-md ${js.avatarBg || "bg-blue-600"} text-white flex items-center justify-center font-tech font-bold text-lg`}>
                          {js.avatarInitials || js.name.slice(0, 2).toUpperCase()}
                        </div>
                        <span className="font-mono text-[10px] text-slate-400 font-bold uppercase mt-2">
                          DOMAIN LEAD
                        </span>
                      </>
                    )}
                  </div>

                  <h4 className="font-tech text-base font-bold text-slate-900">
                    {js.name}
                  </h4>
                  <p className="font-tech text-xs font-bold text-blue-600 mt-0.5">
                    {js.role}
                  </p>
                  <p className="font-mono text-[11px] text-slate-500 mt-0.5">
                    {js.subRole}
                  </p>

                  {/* 1-Line Custom Quote / Domain Focus */}
                  <div className="mt-3 p-2 rounded bg-slate-50 border border-slate-100 text-slate-600 text-xs font-sans italic">
                    &ldquo;{js.quote}&rdquo;
                  </div>
                </div>

                <div className="pt-3 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500">
                  <span className="text-[10px] uppercase font-bold text-slate-400">DOMAIN LEAD</span>
                  <div className="flex items-center gap-2">
                    {js.linkedin && (
                      <a href={js.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-600">
                        <Linkedin className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {js.github && (
                      <a href={js.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-900">
                        <Github className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 4. LEVEL 4: First Year Members / Core Contributors */}
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2">
            <span className="h-px bg-slate-300 w-12" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-500">
              4. FIRST YEAR MEMBERS &amp; CORE CONTRIBUTORS
            </span>
            <span className="h-px bg-slate-300 w-12" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {coreContributors.map((cc, idx) => (
              <motion.div
                key={cc.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-xs p-4 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    {/* Square Profile Image */}
                    <div className={`w-12 h-12 rounded-lg aspect-square ${cc.avatarBg || "bg-slate-700 text-white"} flex items-center justify-center font-tech font-bold text-sm shrink-0 border border-slate-200 relative overflow-hidden`}>
                      {cc.imageUrl ? (
                        <Image src={cc.imageUrl} alt={cc.name} fill className="object-cover" />
                      ) : (
                        <span>{cc.avatarInitials || cc.name.slice(0, 2).toUpperCase()}</span>
                      )}
                    </div>
                    <div className="truncate">
                      <h4 className="font-tech text-sm font-bold text-slate-900 truncate">
                        {cc.name}
                      </h4>
                      <p className="text-[11px] font-mono font-bold text-blue-600 truncate">
                        {cc.role}
                      </p>
                      <p className="text-[10px] font-mono text-slate-500 truncate">
                        {cc.subRole}
                      </p>
                    </div>
                  </div>

                  {/* 1-Line Custom Quote */}
                  <p className="text-xs text-slate-600 font-sans italic bg-slate-50 p-2 rounded border border-slate-100 line-clamp-2">
                    &ldquo;{cc.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-2 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span className="uppercase text-[10px] font-semibold text-slate-400">CONTRIBUTOR</span>
                  {cc.linkedin && (
                    <a
                      href={cc.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-bold text-blue-600 hover:text-blue-800 transition-colors"
                      title={`${cc.name} LinkedIn`}
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                      <span>LinkedIn</span>
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
