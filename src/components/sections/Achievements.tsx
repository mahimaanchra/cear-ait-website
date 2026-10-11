"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Award, Sparkles, Search, X, Copy, Check, Share2, ExternalLink } from "lucide-react";
import { achievements as defaultAchievements, Achievement } from "@/data/siteData";
import { useSiteContent } from "@/context/SiteContentContext";
import { GlassCard } from "@/components/ui/GlassCard";

export function Achievements() {
  const { achievements: dynamicAchievements } = useSiteContent();
  const achievements =
    dynamicAchievements && dynamicAchievements.length > 0
      ? dynamicAchievements
      : defaultAchievements;

  const [filter, setFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Dynamically compute category filters
  const uniqueCategories = Array.from(new Set(achievements.map((a) => a.category)));
  const categoryFilters = [
    { id: "ALL", label: "All Accolades" },
    ...uniqueCategories.map((cat) => ({
      id: cat.toUpperCase(),
      label: cat === "Podium" ? "Podiums & Gold" : cat,
    })),
  ];

  const filteredAchievements = achievements.filter((a) => {
    const matchesCategory =
      filter === "ALL" ||
      a.category.toUpperCase() === filter ||
      (filter === "PODIUM" && a.category === "Podium");

    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesCategory;

    const matchesQuery =
      a.event.toLowerCase().includes(q) ||
      a.institution.toLowerCase().includes(q) ||
      a.rank.toLowerCase().includes(q) ||
      a.highlight.toLowerCase().includes(q) ||
      a.description.toLowerCase().includes(q) ||
      a.year.includes(q);

    return matchesCategory && matchesQuery;
  });

  const getCount = (catId: string) => {
    if (catId === "ALL") return achievements.length;
    return achievements.filter(
      (a) => a.category.toUpperCase() === catId || (catId === "PODIUM" && a.category === "Podium")
    ).length;
  };

  const handleCopyCitation = (item: Achievement, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const citation = `[CEAR Laurels] ${item.rank} at ${item.event} (${item.institution}, ${item.edition || item.year}). Highlight: ${item.highlight}. Description: ${item.description}`;
    navigator.clipboard?.writeText(citation);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <section id="achievements" className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Heading & Filter Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#240d2b]/[0.08] pb-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#240d2b]/60">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b35]" />
              <span>05 // Accolades &amp; Trophies</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-[#240d2b]">
              National Track Record
            </h2>
            <p className="text-sm sm:text-base text-[#240d2b]/70 font-body">
              Championships, podium finishes, and laurels won by CEAR across premier national robotics arenas.
            </p>
          </div>

          {/* Search & Dynamic Filter Chips */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Live Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#240d2b]/40 pointer-events-none" />
              <input
                type="text"
                placeholder="Search accolades, events, IITs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-8 py-2 rounded-full bg-white/80 border border-white/90 text-xs font-mono text-[#240d2b] placeholder-[#240d2b]/40 focus:outline-hidden focus:ring-2 focus:ring-[#ff6b35]/30 focus:border-[#ff6b35] transition-all shadow-xs w-full sm:w-60"
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

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-1.5 font-mono text-xs">
              {categoryFilters.map((cat) => {
                const count = getCount(cat.id);
                const isActive = filter === cat.id;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setFilter(cat.id)}
                    className={`px-3.5 py-1.5 rounded-full font-medium transition-all cursor-pointer flex items-center gap-2 ${
                      isActive
                        ? "bg-[#240d2b] text-[#f6f3ee] shadow-sm font-bold"
                        : "bg-white/80 backdrop-blur-md text-[#240d2b]/70 border border-white/80 hover:border-[#ff6b35]/40 hover:text-[#240d2b]"
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-[#240d2b]/[0.08] text-[#240d2b]/60"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Empty State */}
        {filteredAchievements.length === 0 ? (
          <div className="rounded-3xl bg-white/60 backdrop-blur-md border border-white/80 p-12 text-center space-y-3">
            <Trophy className="w-8 h-8 text-[#240d2b]/30 mx-auto" />
            <p className="font-mono text-sm text-[#240d2b]/60">
              No accolades match your filter &ldquo;{searchQuery}&rdquo;.
            </p>
            <button
              onClick={() => {
                setFilter("ALL");
                setSearchQuery("");
              }}
              className="px-4 py-2 rounded-full bg-[#240d2b] text-white text-xs font-mono hover:bg-[#3b1646] transition-colors cursor-pointer"
            >
              Reset Accolades Filters
            </button>
          </div>
        ) : (
          /* Horizontal Achievement Cards with GlassCard & Smooth Layout */
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredAchievements.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                >
                  <GlassCard
                    spotlightColor="rgba(255, 107, 53, 0.16)"
                    className="p-8 h-full flex flex-col justify-between group"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-[#ff6b35] bg-[#ff6b35]/12 border border-[#ff6b35]/25 px-3 py-1 rounded-full shadow-xs">
                          {item.rank}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-[#240d2b]/40">
                            {item.year}
                          </span>
                          <button
                            onClick={(e) => handleCopyCitation(item, e)}
                            className="p-1 rounded-md text-[#240d2b]/40 hover:text-[#240d2b] hover:bg-black/5 transition-colors cursor-pointer"
                            title="Copy accolade citation"
                          >
                            {copiedId === item.id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Share2 className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-display text-xl font-bold text-[#240d2b] tracking-tight group-hover:text-[#ff6b35] transition-colors">
                          {item.event}
                        </h3>
                        <p className="font-mono text-xs text-[#240d2b]/60 mt-1">
                          {item.institution} {item.edition ? `• ${item.edition}` : ""}
                        </p>
                      </div>

                      {item.highlight && (
                        <div className="p-2.5 rounded-xl bg-white/70 border border-white/90 text-xs font-mono font-semibold text-[#240d2b]/85 shadow-xs">
                          {item.highlight}
                        </div>
                      )}

                      <p className="font-body text-xs sm:text-sm text-[#240d2b]/75 leading-relaxed line-clamp-3">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-6 mt-6 border-t border-[#240d2b]/[0.08] flex items-center justify-between text-xs font-mono">
                      <span className="uppercase text-[10px] tracking-wider font-semibold text-[#240d2b]/50">
                        {item.category}
                      </span>
                      <button
                        onClick={() => setSelectedAchievement(item)}
                        className="text-xs font-mono text-[#ff6b35] hover:underline cursor-pointer flex items-center gap-1"
                      >
                        <span>Details</span>
                        <span>&rarr;</span>
                      </button>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Accolade Citation Details Glass Modal */}
      <AnimatePresence>
        {selectedAchievement && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#240d2b]/75 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-white/95 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 border border-white/80 shadow-2xl space-y-6"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#ff6b35] bg-[#ff6b35]/12 border border-[#ff6b35]/25 px-3 py-1 rounded-full">
                      {selectedAchievement.rank}
                    </span>
                    <span className="text-xs font-mono text-[#240d2b]/50">
                      {selectedAchievement.year}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-[#240d2b] mt-2">
                    {selectedAchievement.event}
                  </h3>
                  <p className="font-mono text-xs text-[#240d2b]/60 mt-0.5">
                    {selectedAchievement.institution} {selectedAchievement.edition ? `• ${selectedAchievement.edition}` : ""}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedAchievement(null)}
                  className="p-1.5 rounded-full text-[#240d2b]/60 hover:text-[#240d2b] hover:bg-black/5 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {selectedAchievement.highlight && (
                <div className="p-3 rounded-2xl bg-[#ff6b35]/10 border border-[#ff6b35]/20 text-xs font-mono text-[#ff6b35] font-bold">
                  {selectedAchievement.highlight}
                </div>
              )}

              <p className="text-sm text-[#240d2b]/80 leading-relaxed font-body">
                {selectedAchievement.description}
              </p>

              <div className="p-3.5 rounded-2xl bg-[#240d2b]/[0.03] border border-[#240d2b]/[0.06] text-xs font-mono space-y-1">
                <div className="text-[#240d2b]/50 text-[10px] uppercase">CATEGORIZATION:</div>
                <div className="font-bold text-[#240d2b]">{selectedAchievement.category} &bull; National Robotics Cadre</div>
              </div>

              <div className="pt-4 border-t border-[#240d2b]/[0.08] flex items-center justify-between">
                <button
                  onClick={() => handleCopyCitation(selectedAchievement)}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-[#240d2b]/70 hover:text-[#240d2b] bg-white border border-black/10 px-3.5 py-2 rounded-full cursor-pointer shadow-xs"
                >
                  {copiedId === selectedAchievement.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600 font-bold">Citation Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Citation</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => setSelectedAchievement(null)}
                  className="px-5 py-2 rounded-full text-xs font-medium text-white bg-[#240d2b] hover:bg-[#3b1646] transition-colors cursor-pointer"
                >
                  Dismiss
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Achievements;
