"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Linkedin, Github, ShieldCheck } from "lucide-react";
import { useSiteContent } from "@/context/SiteContentContext";
import { GlassCard } from "@/components/ui/GlassCard";

export function Team() {
  const { facultyIncharge, secretaries, jointSecretaries, coreContributors } = useSiteContent();

  return (
    <section id="team" className="relative py-28 sm:py-36 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#240d2b]/[0.08] pb-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-mono tracking-widest uppercase text-[#240d2b]/50">
              04 // Team &amp; Leadership
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-display text-[#240d2b] tracking-tight">
              Team &amp; Research Cadre
            </h2>
            <p className="text-sm sm:text-base text-[#240d2b]/70 font-body leading-relaxed">
              Faculty mentorship, student domain leads, and robotics researchers at Army Institute of Technology, Pune.
            </p>
          </div>

          <div className="text-xs font-mono text-[#240d2b]/60 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-white/80 shadow-xs shrink-0">
            <span className="text-[#ff6b35] font-semibold">AIT Pune</span>
          </div>
        </div>

        {/* 1. Faculty In-Charge Spotlight */}
        <div className="max-w-3xl mx-auto">
          <GlassCard
            className="p-8 sm:p-10 flex flex-col sm:flex-row items-center sm:items-start gap-8"
            spotlightColor="rgba(255, 107, 53, 0.16)"
          >
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl bg-white/80 border border-white/80 flex items-center justify-center text-[#240d2b] shrink-0 relative overflow-hidden shadow-inner">
              {facultyIncharge.imageUrl ? (
                <Image
                  src={facultyIncharge.imageUrl}
                  alt={facultyIncharge.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <span className="font-display text-3xl font-black tracking-tight text-[#240d2b]">
                  {facultyIncharge.avatarInitials || "AP"}
                </span>
              )}
            </div>

            <div className="space-y-3 text-center sm:text-left flex-1">
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#ff6b35] bg-[#ff6b35]/12 border border-[#ff6b35]/25 px-2.5 py-1 rounded-full font-semibold">
                  Faculty Leadership
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-display text-[#240d2b] mt-2">
                  {facultyIncharge.name}
                </h3>
                <p className="text-xs sm:text-sm font-medium font-body text-[#240d2b]/75">
                  {facultyIncharge.role} • {facultyIncharge.subRole}
                </p>
              </div>

              {facultyIncharge.specialization && (
                <p className="text-xs text-[#240d2b]/65 font-mono">
                  Domain: {facultyIncharge.specialization}
                </p>
              )}

              {facultyIncharge.linkedin && facultyIncharge.linkedin !== "https://linkedin.com" && (
                <div className="pt-2">
                  <a
                    href={facultyIncharge.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[#240d2b] hover:text-[#ff6b35] transition-colors"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-[#ff6b35]" />
                    <span>LinkedIn Profile</span>
                  </a>
                </div>
              )}
            </div>
          </GlassCard>
        </div>

        {/* 2. Secretaries & Student Leadership */}
        <div className="space-y-8">
          <div className="border-b border-[#240d2b]/[0.08] pb-3">
            <h3 className="text-xl sm:text-2xl font-bold font-display text-[#240d2b]">
              Secretaries &amp; Student Executive
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...secretaries, ...jointSecretaries].map((member) => {
              const hasValidSocials =
                (member.linkedin && member.linkedin !== "https://linkedin.com") ||
                (member.github && member.github !== "https://github.com");

              return (
                <GlassCard
                  key={member.id}
                  spotlightColor="rgba(255, 107, 53, 0.12)"
                  className="p-6 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-white/80 border border-white/80 flex items-center justify-center text-[#240d2b] font-display font-bold text-lg shrink-0 relative overflow-hidden shadow-inner">
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
                        <h4 className="font-display text-lg font-bold text-[#240d2b] tracking-tight">
                          {member.name}
                        </h4>
                        <p className="text-xs font-medium text-[#240d2b]/70 font-body">
                          {member.role}
                        </p>
                        <span className="text-[10px] font-mono text-[#ff6b35] uppercase font-semibold">
                          {member.tier.replace("_", " ")}
                        </span>
                      </div>
                    </div>

                    {member.specialization && (
                      <p className="text-xs text-[#240d2b]/65 font-mono">
                        {member.specialization}
                      </p>
                    )}
                  </div>

                  {hasValidSocials && (
                    <div className="pt-4 mt-4 border-t border-[#240d2b]/[0.08] flex items-center gap-3">
                      {member.linkedin && member.linkedin !== "https://linkedin.com" && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-[#240d2b]/60 hover:text-[#ff6b35] transition-colors flex items-center gap-1 font-mono"
                        >
                          <Linkedin className="w-3.5 h-3.5" />
                          <span>LinkedIn</span>
                        </a>
                      )}
                      {member.github && member.github !== "https://github.com" && (
                        <a
                          href={member.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-[#240d2b]/60 hover:text-[#ff6b35] transition-colors flex items-center gap-1 font-mono"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>GitHub</span>
                        </a>
                      )}
                    </div>
                  )}
                </GlassCard>
              );
            })}
          </div>
        </div>

        {/* 3. Core Contributors */}
        {coreContributors.length > 0 && (
          <div className="space-y-6">
            <div className="border-b border-[#240d2b]/[0.08] pb-3">
              <h3 className="text-xl font-bold font-display text-[#240d2b]">
                Core Technical Contributors
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {coreContributors.map((c) => (
                <div
                  key={c.id}
                  className="p-4 rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 hover:border-[#ff6b35]/40 hover:bg-white/90 shadow-xs transition-all flex items-center gap-3"
                >
                  <div className="w-9 h-9 rounded-lg bg-white border border-white/80 flex items-center justify-center font-mono font-bold text-xs text-[#240d2b] shrink-0 shadow-inner">
                    {c.avatarInitials || c.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="font-display text-sm font-bold text-[#240d2b] truncate">
                      {c.name}
                    </p>
                    <p className="text-[11px] font-mono text-[#240d2b]/65 truncate">
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
