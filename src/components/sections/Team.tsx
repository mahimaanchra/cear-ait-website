"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Linkedin, Github, ShieldCheck } from "lucide-react";
import { useSiteContent } from "@/context/SiteContentContext";

export function Team() {
  const { facultyIncharge, secretaries, jointSecretaries, coreContributors } = useSiteContent();

  return (
    <section id="team" className="relative py-28 sm:py-36 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#0d1321]/[0.08] pb-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-mono tracking-widest uppercase text-[#0d1321]/50">
              03 // Personnel Directory
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-display text-[#0d1321] tracking-tight">
              Engineering Leadership &amp; Cadre
            </h2>
            <p className="text-sm sm:text-base text-[#0d1321]/70 font-body leading-relaxed">
              Faculty mentorship, student domain leads, and autonomous systems research contributors at AIT Pune.
            </p>
          </div>

          <div className="text-xs font-mono text-[#0d1321]/60 px-4 py-2 rounded-full bg-white border border-[#0d1321]/[0.08] shadow-xs shrink-0">
            <span>Faculty &amp; Engineering Cadre</span>
          </div>
        </div>

        {/* 1. Faculty In-Charge Spotlight */}
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            className="bg-white rounded-3xl border border-[#0d1321]/[0.08] p-8 sm:p-10 shadow-[0_20px_50px_-15px_rgba(13,19,33,0.05)] hover:border-[#0d1321]/25 transition-all flex flex-col sm:flex-row items-center sm:items-start gap-8"
          >
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl bg-[#fafaf9] border border-[#0d1321]/[0.08] flex items-center justify-center text-[#0d1321] shrink-0 relative overflow-hidden">
              {facultyIncharge.imageUrl ? (
                <Image
                  src={facultyIncharge.imageUrl}
                  alt={facultyIncharge.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <span className="font-display text-3xl font-black tracking-tight text-[#0d1321]">
                  {facultyIncharge.avatarInitials || "AP"}
                </span>
              )}
            </div>

            <div className="space-y-3 text-center sm:text-left flex-1">
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#0d1321]/50 bg-[#fafaf9] px-2.5 py-1 rounded-full">
                  Faculty Leadership
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-display text-[#0d1321] mt-2">
                  {facultyIncharge.name}
                </h3>
                <p className="text-xs sm:text-sm font-medium font-body text-[#0d1321]/70">
                  {facultyIncharge.role} • {facultyIncharge.subRole}
                </p>
              </div>

              {facultyIncharge.specialization && (
                <p className="text-xs text-[#0d1321]/60 font-mono">
                  Domain: {facultyIncharge.specialization}
                </p>
              )}

              {facultyIncharge.quote && (
                <p className="text-xs sm:text-sm text-[#0d1321]/75 italic font-body pt-1 border-t border-[#0d1321]/[0.06]">
                  &ldquo;{facultyIncharge.quote}&rdquo;
                </p>
              )}

              {facultyIncharge.linkedin && (
                <div className="pt-2">
                  <a
                    href={facultyIncharge.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[#0d1321] hover:underline"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                    <span>LinkedIn Profile</span>
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* 2. Secretaries & Student Leadership */}
        <div className="space-y-8">
          <div className="border-b border-[#0d1321]/[0.08] pb-3">
            <h3 className="text-xl sm:text-2xl font-bold font-display text-[#0d1321]">
              Secretaries &amp; Student Executive
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...secretaries, ...jointSecretaries].map((member, i) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ y: -5 }}
                className="p-6 rounded-2xl bg-white border border-[#0d1321]/[0.08] shadow-[0_10px_30px_-10px_rgba(13,19,33,0.03)] hover:shadow-[0_20px_40px_-15px_rgba(13,19,33,0.06)] hover:border-[#0d1321]/20 transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-[#fafaf9] border border-[#0d1321]/[0.08] flex items-center justify-center text-[#0d1321] font-display font-bold text-lg shrink-0 relative overflow-hidden">
                      {member.imageUrl ? (
                        <Image
                          src={member.imageUrl}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <span>{member.avatarInitials || member.name.slice(0, 2).toUpperCase()}</span>
                      )}
                    </div>

                    <div>
                      <h4 className="font-display text-lg font-bold text-[#0d1321] tracking-tight">
                        {member.name}
                      </h4>
                      <p className="text-xs font-medium text-[#0d1321]/70 font-body">
                        {member.role}
                      </p>
                      <span className="text-[10px] font-mono text-[#0d1321]/40 uppercase">
                        {member.tier.replace("_", " ")}
                      </span>
                    </div>
                  </div>

                  {member.specialization && (
                    <p className="text-xs text-[#0d1321]/60 font-mono">
                      {member.specialization}
                    </p>
                  )}

                  {member.quote && (
                    <p className="text-xs text-[#0d1321]/70 italic line-clamp-2">
                      &ldquo;{member.quote}&rdquo;
                    </p>
                  )}
                </div>

                <div className="pt-4 mt-4 border-t border-[#0d1321]/[0.06] flex items-center gap-3">
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#0d1321]/50 hover:text-[#0d1321] transition-colors flex items-center gap-1 font-mono"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                      <span>LinkedIn</span>
                    </a>
                  )}
                  {member.github && (
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#0d1321]/50 hover:text-[#0d1321] transition-colors flex items-center gap-1 font-mono"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>GitHub</span>
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 3. Core Contributors */}
        {coreContributors.length > 0 && (
          <div className="space-y-6">
            <div className="border-b border-[#0d1321]/[0.08] pb-3">
              <h3 className="text-xl font-bold font-display text-[#0d1321]">
                Core Technical Contributors
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {coreContributors.map((c) => (
                <div
                  key={c.id}
                  className="p-4 rounded-xl bg-white border border-[#0d1321]/[0.08] hover:border-[#0d1321]/20 transition-all flex items-center gap-3"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#fafaf9] border border-[#0d1321]/[0.08] flex items-center justify-center font-mono font-bold text-xs text-[#0d1321] shrink-0">
                    {c.avatarInitials || c.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="font-display text-sm font-bold text-[#0d1321] truncate">
                      {c.name}
                    </p>
                    <p className="text-[11px] font-mono text-[#0d1321]/60 truncate">
                      {c.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Team;
