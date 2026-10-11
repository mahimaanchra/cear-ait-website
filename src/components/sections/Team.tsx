"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Linkedin,
  Github,
  ShieldCheck,
  Search,
  X,
  Sparkles,
  ArrowRight,
  UserCheck,
  Award,
  Cpu,
  GraduationCap,
} from "lucide-react";
import { useSiteContent } from "@/context/SiteContentContext";
import { TeamMember } from "@/data/siteData";
import { GlassCard } from "@/components/ui/GlassCard";

interface TeamProps {
  onOpenRegister?: () => void;
}

type CadreFilter = "all" | "leadership" | "contributors";

export function Team({ onOpenRegister }: TeamProps) {
  const { facultyIncharge, secretaries, jointSecretaries, coreContributors } = useSiteContent();
  const [activeTier, setActiveTier] = useState<CadreFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const allLeadership = [facultyIncharge, ...secretaries, ...jointSecretaries];
  const allMembers = [facultyIncharge, ...secretaries, ...jointSecretaries, ...coreContributors];

  const filteredMembers = allMembers.filter((m) => {
    const matchesTier =
      activeTier === "all"
        ? true
        : activeTier === "leadership"
        ? m.tier === "faculty" || m.tier === "secretary" || m.tier === "joint_secretary"
        : m.tier === "contributor";

    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesTier;

    const matchesQuery =
      m.name.toLowerCase().includes(q) ||
      m.role.toLowerCase().includes(q) ||
      (m.subRole && m.subRole.toLowerCase().includes(q)) ||
      (m.specialization && m.specialization.toLowerCase().includes(q));

    return matchesTier && matchesQuery;
  });

  return (
    <section id="team" className="relative py-28 sm:py-36 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#240d2b]/[0.08] pb-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff6b35]/10 border border-[#ff6b35]/20 text-[#ff6b35] text-[11px] font-mono uppercase tracking-wider font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>04 // Team &amp; Leadership</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-display text-[#240d2b] tracking-tight">
              Team &amp; Research Cadre
            </h2>
            <p className="text-sm sm:text-base text-[#240d2b]/70 font-body leading-relaxed">
              Faculty mentorship, student domain leads, and robotics researchers at Army Institute of Technology, Pune.
            </p>
          </div>

          {/* Search & Tier Filter Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#240d2b]/40 pointer-events-none" />
              <input
                type="text"
                placeholder="Search cadets, roles, AI..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-8 py-2 rounded-full bg-white/80 border border-white/90 text-xs font-mono text-[#240d2b] placeholder-[#240d2b]/40 focus:outline-hidden focus:ring-2 focus:ring-[#ff6b35]/30 focus:border-[#ff6b35] transition-all shadow-xs w-full sm:w-56"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#240d2b]/40 hover:text-[#240d2b] cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Tier Pills */}
            <div className="flex items-center gap-1.5 p-1 rounded-full bg-white/70 border border-white/80 shadow-xs">
              {[
                { id: "all", label: `All (${allMembers.length})` },
                { id: "leadership", label: `Leads (${allLeadership.length})` },
                { id: "contributors", label: `Cadets (${coreContributors.length})` },
              ].map((pill) => (
                <button
                  key={pill.id}
                  onClick={() => setActiveTier(pill.id as CadreFilter)}
                  className={`px-3 py-1 rounded-full text-xs font-mono transition-all cursor-pointer ${
                    activeTier === pill.id
                      ? "bg-[#240d2b] text-white shadow-xs font-bold"
                      : "text-[#240d2b]/70 hover:text-[#240d2b] hover:bg-black/5"
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 1. Faculty In-Charge Spotlight (shown when Tier is all or leadership and no search, or when matched) */}
        {(activeTier === "all" || activeTier === "leadership") &&
          (!searchQuery ||
            facultyIncharge.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            facultyIncharge.role.toLowerCase().includes(searchQuery.toLowerCase())) && (
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
                      Faculty Mentorship &amp; Patron
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold font-display text-[#240d2b] mt-2">
                      {facultyIncharge.name}
                    </h3>
                    <p className="text-xs sm:text-sm font-medium font-body text-[#240d2b]/75">
                      {facultyIncharge.role} &bull; {facultyIncharge.subRole}
                    </p>
                  </div>

                  {facultyIncharge.specialization && (
                    <p className="text-xs text-[#240d2b]/65 font-mono">
                      Domain: {facultyIncharge.specialization}
                    </p>
                  )}

                  <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-3">
                    {facultyIncharge.linkedin && facultyIncharge.linkedin !== "https://linkedin.com" && (
                      <a
                        href={facultyIncharge.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[#240d2b] hover:text-[#ff6b35] transition-colors"
                      >
                        <Linkedin className="w-3.5 h-3.5 text-[#ff6b35]" />
                        <span>LinkedIn Profile</span>
                      </a>
                    )}
                    <button
                      onClick={() => setSelectedMember(facultyIncharge)}
                      className="text-xs font-mono text-[#ff6b35] hover:underline cursor-pointer"
                    >
                      View Details &rarr;
                    </button>
                  </div>
                </div>
              </GlassCard>
            </div>
          )}

        {/* 2. Secretaries & Student Executive */}
        {(activeTier === "all" || activeTier === "leadership") && (
          <div className="space-y-6">
            <div className="border-b border-[#240d2b]/[0.08] pb-3 flex items-center justify-between">
              <h3 className="text-xl sm:text-2xl font-bold font-display text-[#240d2b]">
                Secretaries &amp; Student Executive
              </h3>
              <span className="text-xs font-mono text-[#240d2b]/50">
                Core Domain Captains
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...secretaries, ...jointSecretaries]
                .filter((m) => {
                  const q = searchQuery.toLowerCase().trim();
                  if (!q) return true;
                  return (
                    m.name.toLowerCase().includes(q) ||
                    m.role.toLowerCase().includes(q) ||
                    (m.specialization && m.specialization.toLowerCase().includes(q))
                  );
                })
                .map((member) => {
                  const hasValidSocials =
                    (member.linkedin && member.linkedin !== "https://linkedin.com") ||
                    (member.github && member.github !== "https://github.com");

                  return (
                    <GlassCard
                      key={member.id}
                      spotlightColor="rgba(255, 107, 53, 0.12)"
                      className="p-6 flex flex-col justify-between group cursor-pointer"
                      onClick={() => setSelectedMember(member)}
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
                            <h4 className="font-display text-lg font-bold text-[#240d2b] tracking-tight group-hover:text-[#ff6b35] transition-colors">
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
                          <p className="text-xs text-[#240d2b]/65 font-mono line-clamp-2">
                            {member.specialization}
                          </p>
                        )}
                      </div>

                      <div className="pt-4 mt-4 border-t border-[#240d2b]/[0.08] flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {member.linkedin && member.linkedin !== "https://linkedin.com" && (
                            <a
                              href={member.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-xs text-[#240d2b]/60 hover:text-[#ff6b35] transition-colors font-mono"
                              title="LinkedIn"
                            >
                              <Linkedin className="w-3.5 h-3.5" />
                            </a>
                          )}
                          {member.github && member.github !== "https://github.com" && (
                            <a
                              href={member.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-xs text-[#240d2b]/60 hover:text-[#ff6b35] transition-colors font-mono"
                              title="GitHub"
                            >
                              <Github className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>

                        <span className="text-[11px] font-mono text-[#240d2b]/50 group-hover:text-[#ff6b35] transition-colors">
                          Profile &rarr;
                        </span>
                      </div>
                    </GlassCard>
                  );
                })}
            </div>
          </div>
        )}

        {/* 3. Core Contributors */}
        {(activeTier === "all" || activeTier === "contributors") && coreContributors.length > 0 && (
          <div className="space-y-6">
            <div className="border-b border-[#240d2b]/[0.08] pb-3 flex items-center justify-between">
              <h3 className="text-xl font-bold font-display text-[#240d2b]">
                Core Technical Contributors &amp; Research Cadre
              </h3>
              <span className="text-xs font-mono text-[#240d2b]/50">
                FE &bull; SE Engineers
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {coreContributors
                .filter((c) => {
                  const q = searchQuery.toLowerCase().trim();
                  if (!q) return true;
                  return (
                    c.name.toLowerCase().includes(q) ||
                    c.role.toLowerCase().includes(q) ||
                    (c.specialization && c.specialization.toLowerCase().includes(q))
                  );
                })
                .map((c) => (
                  <div
                    key={c.id}
                    onClick={() => setSelectedMember(c)}
                    className="p-4 rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 hover:border-[#ff6b35]/40 hover:bg-white/95 shadow-xs transition-all flex items-center justify-between gap-3 cursor-pointer group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-white border border-white/80 flex items-center justify-center font-mono font-bold text-xs text-[#240d2b] shrink-0 shadow-inner group-hover:bg-[#ff6b35] group-hover:text-white transition-colors">
                        {c.avatarInitials || c.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="font-display text-sm font-bold text-[#240d2b] truncate group-hover:text-[#ff6b35] transition-colors">
                          {c.name}
                        </p>
                        <p className="text-[11px] font-mono text-[#240d2b]/65 truncate">
                          {c.role}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-[#240d2b]/30 group-hover:text-[#ff6b35] transition-colors">
                      &rarr;
                    </span>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* 4. Join Cadre CTA Banner */}
        <div className="rounded-[32px] sm:rounded-[36px] bg-gradient-to-r from-[#240d2b] via-[#3b1646] to-[#240d2b] p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl relative z-10">
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#ff6b35] bg-white/10 px-3 py-1 rounded-full border border-white/10">
              CADET SELECTION DRIVE &bull; 2026
            </span>
            <h3 className="text-2xl sm:text-4xl font-black font-display tracking-tight text-white">
              Ready to Build Autonomous Systems?
            </h3>
            <p className="text-xs sm:text-sm text-white/75 font-body leading-relaxed">
              First-year and second-year engineering students from AIT Pune are invited to apply for the CEAR Research Cadre. Access Lab 104 equipment, ROS2 clusters, and national competition teams.
            </p>
          </div>

          <div className="shrink-0 relative z-10">
            <button
              onClick={() => onOpenRegister?.()}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-medium font-body bg-[#ff6b35] text-white hover:bg-[#fa5519] transition-all shadow-[0_4px_16px_rgba(255,107,53,0.4)] cursor-pointer hover:scale-102 active:scale-98"
            >
              <span>Apply for Inductions</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Cadet Profile Inspection Glass Modal */}
      <AnimatePresence>
        {selectedMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#240d2b]/75 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-white/95 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 border border-white/80 shadow-2xl space-y-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-[#f6f3ee] border border-black/5 flex items-center justify-center font-display font-black text-xl text-[#240d2b] shadow-inner overflow-hidden relative">
                    {selectedMember.imageUrl ? (
                      <Image
                        src={selectedMember.imageUrl}
                        alt={selectedMember.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <span>{selectedMember.avatarInitials || selectedMember.name.slice(0, 2).toUpperCase()}</span>
                    )}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-[#ff6b35] font-semibold">
                      {selectedMember.tier.replace("_", " ")}
                    </span>
                    <h3 className="font-display text-xl font-bold text-[#240d2b]">
                      {selectedMember.name}
                    </h3>
                    <p className="text-xs text-[#240d2b]/70 font-mono">
                      {selectedMember.role}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedMember(null)}
                  className="p-1.5 rounded-full text-[#240d2b]/60 hover:text-[#240d2b] hover:bg-black/5 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {selectedMember.specialization && (
                <div className="p-3.5 rounded-2xl bg-[#240d2b]/[0.03] border border-[#240d2b]/[0.06] text-xs font-mono space-y-1">
                  <span className="text-[#240d2b]/50 text-[10px] uppercase block">
                    RESEARCH FOCUS &amp; HARDWARE:
                  </span>
                  <span className="font-bold text-[#240d2b] block">
                    {selectedMember.specialization}
                  </span>
                </div>
              )}

              {selectedMember.quote && (
                <div className="italic text-xs text-[#240d2b]/75 font-body border-l-2 border-[#ff6b35] pl-3 py-1">
                  &ldquo;{selectedMember.quote}&rdquo;
                </div>
              )}

              <div className="pt-4 border-t border-[#240d2b]/[0.08] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {selectedMember.linkedin && selectedMember.linkedin !== "https://linkedin.com" && (
                    <a
                      href={selectedMember.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-white border border-black/10 text-[#240d2b] hover:text-[#ff6b35] transition-colors"
                      title="LinkedIn"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {selectedMember.github && selectedMember.github !== "https://github.com" && (
                    <a
                      href={selectedMember.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-white border border-black/10 text-[#240d2b] hover:text-[#ff6b35] transition-colors"
                      title="GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>

                <button
                  onClick={() => setSelectedMember(null)}
                  className="px-5 py-2 rounded-full text-xs font-medium text-white bg-[#240d2b] hover:bg-[#3b1646] transition-colors cursor-pointer"
                >
                  Close Profile
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Team;
