"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Award } from "lucide-react";
import { achievements } from "@/data/siteData";
import { GlassCard } from "@/components/ui/GlassCard";

const categoryFilters = ["ALL", "PODIUM", "NATIONAL FINALIST"];

export function Achievements() {
  const [filter, setFilter] = useState("ALL");

  const filteredAchievements =
    filter === "ALL"
      ? achievements
      : achievements.filter(
          (a) =>
            a.category.toUpperCase() === filter ||
            (filter === "PODIUM" && a.category === "Podium")
        );

  return (
    <section id="achievements" className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-[#240d2b]/[0.08] pb-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-mono tracking-widest uppercase text-[#240d2b]/50">
              05 // Accolades &amp; Trophies
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-[#240d2b]">
              National Track Record
            </h2>
            <p className="text-sm sm:text-base text-[#240d2b]/70 font-body">
              Championships and podium finishes won by CEAR across national robotics arenas.
            </p>
          </div>

          {/* Filter Pills with Glassmorphism */}
          <div className="flex flex-wrap gap-2 font-mono text-xs">
            {categoryFilters.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full font-medium transition-all cursor-pointer ${
                  filter === cat
                    ? "bg-[#240d2b] text-[#f6f3ee] shadow-xs"
                    : "bg-white/80 backdrop-blur-md text-[#240d2b]/70 border border-white/80 hover:border-[#ff6b35]/40 hover:text-[#240d2b]"
                }`}
              >
                {cat === "ALL" ? "All" : cat === "PODIUM" ? "Podiums" : "Finalists"}
              </button>
            ))}
          </div>
        </div>

        {/* Horizontal Achievement Cards with GlassCard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAchievements.map((item, index) => (
            <GlassCard
              key={item.id}
              spotlightColor="rgba(255, 107, 53, 0.14)"
              className="p-8 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#ff6b35] bg-[#ff6b35]/12 border border-[#ff6b35]/25 px-3 py-1 rounded-full shadow-xs">
                    {item.rank}
                  </span>
                  <span className="font-mono text-xs text-[#240d2b]/40">
                    {item.year}
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-xl font-bold text-[#240d2b] tracking-tight">
                    {item.event}
                  </h3>
                  <p className="font-mono text-xs text-[#240d2b]/60 mt-1">
                    {item.institution}
                  </p>
                </div>

                <p className="font-body text-xs sm:text-sm text-[#240d2b]/75 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#240d2b]/[0.08] flex items-center justify-between text-xs font-mono text-[#240d2b]/50">
                <span className="uppercase text-[10px] tracking-wider">{item.category}</span>
                <Trophy className="w-4 h-4 text-[#ff6b35]" />
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Achievements;
