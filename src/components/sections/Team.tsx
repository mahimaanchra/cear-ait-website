"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Linkedin, Github, ShieldCheck, Users, Terminal } from "lucide-react";
import { useSiteContent } from "@/context/SiteContentContext";

export function Team() {
  const { facultyIncharge, secretaries, jointSecretaries, coreContributors } = useSiteContent();

  return (
    <section id="team" className="relative py-24 sm:py-32 bg-transparent border-b border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0a101d] border border-cyan-500/35 text-xs font-mono font-bold text-cyan-300">
            <Users className="w-3.5 h-3.5 text-cyan-400" />
            <span>COMMAND CADRE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-tech text-slate-100 tracking-tight">
            Engineering Leadership
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-body leading-relaxed">
            Faculty mentorship, student domain leads, and autonomous systems specialists at AIT Pune.
          </p>
        </div>

        {/* 1. Faculty In-Charge */}
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-3">
            <span className="h-[1px] bg-cyan-500/20 w-16" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/40 px-3.5 py-0.5 rounded border border-cyan-500/30">
              FACULTY COMMAND
            </span>
            <span className="h-[1px] bg-cyan-500/20 w-16" />
          </div>

          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="bg-[#0c1222]/90 rounded-2xl border border-cyan-500/30 shadow-[0_10px_35px_rgba(0,0,0,0.7),0_0_20px_rgba(0,240,255,0.12)] p-6 sm:p-7 relative overflow-hidden backdrop-blur-xl"
            >
              <div className="cyber-bracket-top-left" />
              <div className="cyber-bracket-bottom-right" />

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-xl aspect-square bg-[#070b14] border border-cyan-500/40 shadow-[0_0_15px_rgba(0,240,255,0.2)] flex flex-col items-center justify-center text-cyan-300 shrink-0 relative overflow-hidden">
                  {facultyIncharge.imageUrl ? (
                    <Image
                      src={facultyIncharge.imageUrl}
                      alt={facultyIncharge.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <span className="font-tech text-2xl font-black tracking-tight">
                      {facultyIncharge.avatarInitials || "AP"}
                    </span>
                  )}
                  <div className="absolute bottom-2 right-2 z-10 bg-cyan-950 p-1 rounded-full border border-cyan-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  </div>
                </div>

                <div className="space-y-2 text-center sm:text-left flex-1">
                  <div>
                    <h3 className="text-2xl font-black font-tech text-slate-100">
                      {facultyIncharge.name}
                    </h3>
                    <p className="font-tech text-sm font-bold text-cyan-400">
                      {facultyIncharge.role}
                    </p>
                    <p className="text-xs font-mono text-slate-400">
                      {facultyIncharge.subRole}
                    </p>
                  </div>

                  {facultyIncharge.specialization && (
                    <p className="text-xs text-slate-300 font-mono pt-1">
                      <span className="text-cyan-400 font-bold">Domain:</span> {facultyIncharge.specialization}
                    </p>
                  )}

                  {facultyIncharge.linkedin && (
                    <div className="pt-2 flex justify-center sm:justify-start">
                      <a
                        href={facultyIncharge.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-slate-200 bg-[#070b14] hover:bg-cyan-500/20 hover:text-cyan-300 px-3.5 py-1 rounded border border-cyan-500/30 transition-all"
                      >
                        <Linkedin className="w-3.5 h-3.5" />
                        <span>Dossier</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* 2. Secretaries */}
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-3">
            <span className="h-[1px] bg-cyan-500/20 w-16" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/40 px-3.5 py-0.5 rounded border border-cyan-500/30">
              SECRETARIES
            </span>
            <span className="h-[1px] bg-cyan-500/20 w-16" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {secretaries.map((sec) => (
              <motion.div
                key={sec.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="bg-[#0c1222]/85 rounded-xl border border-cyan-500/20 hover:border-cyan-400/50 shadow-[0_8px_30px_rgba(0,0,0,0.6)] p-5 flex flex-col justify-between backdrop-blur-xl"
              >
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-xl aspect-square bg-[#070b14] border border-cyan-500/30 text-cyan-300 flex items-center justify-center shrink-0 relative overflow-hidden">
                    {sec.imageUrl ? (
                      <Image src={sec.imageUrl} alt={sec.name} fill className="object-cover" />
                    ) : (
                      <span className="font-tech text-lg font-black">{sec.avatarInitials || sec.name.slice(0, 2).toUpperCase()}</span>
                    )}
                  </div>

                  <div className="space-y-0.5 flex-1">
                    <h4 className="text-lg font-bold font-tech text-slate-100">
                      {sec.name}
                    </h4>
                    <p className="text-xs font-tech font-bold text-cyan-400">
                      {sec.role}
                    </p>
                    <p className="text-[11px] font-mono text-slate-400">
                      {sec.subRole}
                    </p>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-800 flex items-center justify-end gap-2">
                  {sec.linkedin && (
                    <a href={sec.linkedin} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg border border-slate-800 bg-[#070b14] hover:bg-slate-800 text-slate-300 hover:text-cyan-400 transition-colors">
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {sec.github && (
                    <a href={sec.github} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg border border-slate-800 bg-[#070b14] hover:bg-slate-800 text-slate-300 hover:text-cyan-400 transition-colors">
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 3. Joint Secretaries */}
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-3">
            <span className="h-[1px] bg-cyan-500/20 w-16" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/40 px-3.5 py-0.5 rounded border border-cyan-500/30">
              JOINT SECRETARIES
            </span>
            <span className="h-[1px] bg-cyan-500/20 w-16" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {jointSecretaries.map((js) => (
              <motion.div
                key={js.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="bg-[#0c1222]/85 rounded-xl border border-cyan-500/20 hover:border-cyan-400/50 shadow-[0_8px_25px_rgba(0,0,0,0.6)] p-4 flex flex-col justify-between backdrop-blur-xl"
              >
                <div>
                  <div className="w-full aspect-square rounded-lg mb-3 bg-[#070b14] border border-cyan-500/25 flex items-center justify-center relative overflow-hidden">
                    {js.imageUrl ? (
                      <Image src={js.imageUrl} alt={js.name} fill className="object-cover" />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-cyan-950/40 text-cyan-300 flex items-center justify-center font-tech font-bold text-base border border-cyan-500/30">
                        {js.avatarInitials || js.name.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                  </div>

                  <h4 className="font-tech text-base font-bold text-slate-100">
                    {js.name}
                  </h4>
                  <p className="font-tech text-xs font-bold text-cyan-400 mt-0.5">
                    {js.role}
                  </p>
                  <p className="font-mono text-[11px] text-slate-400 mt-0.5">
                    {js.subRole}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-800 flex items-center justify-end gap-2">
                  {js.linkedin && (
                    <a href={js.linkedin} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg border border-slate-800 bg-[#070b14] hover:bg-slate-800 text-slate-300 hover:text-cyan-400 transition-colors">
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {js.github && (
                    <a href={js.github} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg border border-slate-800 bg-[#070b14] hover:bg-slate-800 text-slate-300 hover:text-cyan-400 transition-colors">
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 4. Core Contributors */}
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-3">
            <span className="h-[1px] bg-cyan-500/20 w-16" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 bg-slate-900/60 px-3.5 py-0.5 rounded border border-slate-800">
              CORE CONTRIBUTORS
            </span>
            <span className="h-[1px] bg-cyan-500/20 w-16" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {coreContributors.map((cc) => (
              <motion.div
                key={cc.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.15 }}
                className="bg-[#0b101e]/80 rounded-lg border border-slate-800 hover:border-cyan-500/30 p-3 flex items-center justify-between gap-3 backdrop-blur-md"
              >
                <div className="flex items-center gap-3 truncate">
                  <div className="w-10 h-10 rounded-lg aspect-square bg-[#070b14] border border-cyan-500/30 text-cyan-300 flex items-center justify-center font-tech font-bold text-xs shrink-0 relative overflow-hidden">
                    {cc.imageUrl ? (
                      <Image src={cc.imageUrl} alt={cc.name} fill className="object-cover" />
                    ) : (
                      <span>{cc.avatarInitials || cc.name.slice(0, 2).toUpperCase()}</span>
                    )}
                  </div>
                  <div className="truncate">
                    <h4 className="font-tech text-sm font-bold text-slate-100 truncate">
                      {cc.name}
                    </h4>
                    <p className="text-[11px] font-mono text-slate-400 truncate">
                      {cc.role}
                    </p>
                  </div>
                </div>

                {cc.linkedin && (
                  <a
                    href={cc.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 rounded border border-slate-800 bg-[#070b14] hover:bg-slate-800 text-slate-300 hover:text-cyan-400 transition-colors shrink-0"
                    title={`${cc.name} LinkedIn`}
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Team;
