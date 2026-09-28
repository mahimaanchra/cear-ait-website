"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Linkedin, Github, ShieldCheck } from "lucide-react";
import { useSiteContent } from "@/context/SiteContentContext";

export function Team() {
  const { facultyIncharge, secretaries, jointSecretaries, coreContributors } = useSiteContent();
  return (
    <section id="team" className="relative py-24 sm:py-32 bg-transparent border-b-[2.5px] border-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-paper border-2 border-ink shadow-[2px_2px_0_#14140f] text-xs font-mono font-black text-ink mb-1 -rotate-1">
            <span>COMMAND CADRE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-tech text-ink tracking-tight">
            Team Leadership
          </h2>
          <p className="text-sm sm:text-base text-ink/80 font-body font-semibold leading-relaxed">
            Student robotics engineers, domain specialists, and academic mentorship.
          </p>
        </div>

        {/* 1. Faculty In-Charge */}
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-3">
            <span className="h-[2px] bg-ink/20 w-12" />
            <span className="text-xs font-mono font-black uppercase tracking-wider text-ink bg-white px-3 py-0.5 rounded-full border-2 border-ink shadow-[2px_2px_0_#14140f] -rotate-1">
              Faculty In-Charge
            </span>
            <span className="h-[2px] bg-ink/20 w-12" />
          </div>

          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, rotate: -1 }}
              transition={{ type: "spring", stiffness: 350, damping: 20 }}
              className="bg-white rounded-[22px_27px_20px_25px_/_27px_20px_25px_22px] border-[2.5px] border-ink shadow-[5px_6px_0_#14140f] p-6 sm:p-7 relative overflow-hidden -rotate-0.5 cursor-default"
            >
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl aspect-square bg-ink border-2 border-ink shadow-[3px_3px_0_#14140f] flex flex-col items-center justify-center text-paper shrink-0 relative overflow-hidden">
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
                  <div className="absolute bottom-2 right-2 z-10 bg-white p-0.5 rounded-full border border-ink shadow-[1px_1px_0_#14140f]">
                    <ShieldCheck className="w-4 h-4 text-ink" />
                  </div>
                </div>

                <div className="space-y-2 text-center sm:text-left flex-1">
                  <div>
                    <h3 className="text-2xl font-black font-tech text-ink">
                      {facultyIncharge.name}
                    </h3>
                    <p className="font-tech text-sm font-bold text-ink">
                      {facultyIncharge.role}
                    </p>
                    <p className="text-xs font-mono text-ink/70 font-bold">
                      {facultyIncharge.subRole}
                    </p>
                  </div>

                  {facultyIncharge.specialization && (
                    <p className="text-xs text-ink/80 font-mono pt-1">
                      <span className="font-bold text-ink">Focus:</span> {facultyIncharge.specialization}
                    </p>
                  )}

                  {facultyIncharge.linkedin && (
                    <div className="pt-2 flex justify-center sm:justify-start">
                      <a
                        href={facultyIncharge.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-ink bg-paper hover:bg-ink hover:text-white px-3.5 py-1 rounded-full border-2 border-ink shadow-[2px_2px_0_#14140f] transition-all"
                      >
                        <Linkedin className="w-3.5 h-3.5" />
                        <span>Profile</span>
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
            <span className="h-[2px] bg-ink/20 w-12" />
            <span className="text-xs font-mono font-black uppercase tracking-wider text-ink bg-white px-3 py-0.5 rounded-full border-2 border-ink shadow-[2px_2px_0_#14140f] rotate-1">
              Secretaries
            </span>
            <span className="h-[2px] bg-ink/20 w-12" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {secretaries.map((sec, idx) => (
              <motion.div
                key={sec.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -6, rotate: idx === 0 ? -1.5 : 1.5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 350, damping: 18 }}
                className="bg-white rounded-[20px_24px_18px_22px_/_24px_18px_22px_20px] border-[2.5px] border-ink shadow-[4px_5px_0_#14140f] p-5 flex flex-col justify-between cursor-default"
              >
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-xl aspect-square bg-ink text-white flex items-center justify-center shrink-0 border-2 border-ink shadow-[2px_2px_0_#14140f] relative overflow-hidden">
                    {sec.imageUrl ? (
                      <Image src={sec.imageUrl} alt={sec.name} fill className="object-cover" />
                    ) : (
                      <span className="font-tech text-lg font-black">{sec.avatarInitials || sec.name.slice(0, 2).toUpperCase()}</span>
                    )}
                  </div>

                  <div className="space-y-0.5 flex-1">
                    <h4 className="text-lg font-black font-tech text-ink">
                      {sec.name}
                    </h4>
                    <p className="text-xs font-tech font-bold text-ink">
                      {sec.role}
                    </p>
                    <p className="text-[11px] font-mono text-ink/70 font-bold">
                      {sec.subRole}
                    </p>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t-2 border-ink/10 flex items-center justify-end gap-2">
                  {sec.linkedin && (
                    <a href={sec.linkedin} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg border border-ink bg-paper hover:bg-white text-ink transition-transform hover:scale-110 shadow-[1.5px_1.5px_0_#14140f]">
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {sec.github && (
                    <a href={sec.github} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg border border-ink bg-paper hover:bg-white text-ink transition-transform hover:scale-110 shadow-[1.5px_1.5px_0_#14140f]">
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
            <span className="h-[2px] bg-ink/20 w-12" />
            <span className="text-xs font-mono font-black uppercase tracking-wider text-ink bg-white px-3 py-0.5 rounded-full border-2 border-ink shadow-[2px_2px_0_#14140f] -rotate-1">
              Joint Secretaries
            </span>
            <span className="h-[2px] bg-ink/20 w-12" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {jointSecretaries.map((js, idx) => (
              <motion.div
                key={js.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -6, rotate: idx % 2 === 0 ? -1.5 : 1.5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 350, damping: 18 }}
                className="bg-white rounded-2xl border-2 border-ink shadow-[3px_4px_0_#14140f] p-4 flex flex-col justify-between cursor-default"
              >
                <div>
                  <div className="w-full aspect-square rounded-xl mb-3 bg-paper border-2 border-ink shadow-[2px_2px_0_#14140f] flex items-center justify-center relative overflow-hidden">
                    {js.imageUrl ? (
                      <Image src={js.imageUrl} alt={js.name} fill className="object-cover" />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-ink text-white flex items-center justify-center font-tech font-black text-base border border-ink shadow-[1px_1px_0_#14140f]">
                        {js.avatarInitials || js.name.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                  </div>

                  <h4 className="font-tech text-base font-black text-ink">
                    {js.name}
                  </h4>
                  <p className="font-tech text-xs font-bold text-ink mt-0.5">
                    {js.role}
                  </p>
                  <p className="font-mono text-[11px] text-ink/70 font-bold mt-0.5">
                    {js.subRole}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t-2 border-ink/10 flex items-center justify-end gap-2">
                  {js.linkedin && (
                    <a href={js.linkedin} target="_blank" rel="noopener noreferrer" className="p-1 rounded-lg border border-ink bg-paper hover:bg-white text-ink transition-transform hover:scale-110 shadow-[1px_1px_0_#14140f]">
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {js.github && (
                    <a href={js.github} target="_blank" rel="noopener noreferrer" className="p-1 rounded-lg border border-ink bg-paper hover:bg-white text-ink transition-transform hover:scale-110 shadow-[1px_1px_0_#14140f]">
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
            <span className="h-[2px] bg-ink/20 w-12" />
            <span className="text-xs font-mono font-black uppercase tracking-wider text-ink bg-white px-3 py-0.5 rounded-full border-2 border-ink shadow-[2px_2px_0_#14140f] rotate-1">
              Core Contributors
            </span>
            <span className="h-[2px] bg-ink/20 w-12" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {coreContributors.map((cc, idx) => (
              <motion.div
                key={cc.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 350, damping: 18 }}
                className="bg-white rounded-xl border-2 border-ink shadow-[2.5px_3px_0_#14140f] p-3 flex items-center justify-between gap-3 cursor-default"
              >
                <div className="flex items-center gap-3 truncate">
                  <div className="w-10 h-10 rounded-lg aspect-square bg-ink text-white flex items-center justify-center font-tech font-black text-xs shrink-0 border border-ink relative overflow-hidden">
                    {cc.imageUrl ? (
                      <Image src={cc.imageUrl} alt={cc.name} fill className="object-cover" />
                    ) : (
                      <span>{cc.avatarInitials || cc.name.slice(0, 2).toUpperCase()}</span>
                    )}
                  </div>
                  <div className="truncate">
                    <h4 className="font-tech text-sm font-black text-ink truncate">
                      {cc.name}
                    </h4>
                    <p className="text-[11px] font-mono text-ink/70 font-bold truncate">
                      {cc.role}
                    </p>
                  </div>
                </div>

                {cc.linkedin && (
                  <a
                    href={cc.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 rounded-md border border-ink bg-paper hover:bg-white text-ink transition-transform hover:scale-110 shrink-0 shadow-[1px_1px_0_#14140f]"
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
