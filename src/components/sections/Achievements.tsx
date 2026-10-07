"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Award, Sparkles } from "lucide-react";
import { achievements as defaultAchievements } from "@/data/siteData";
import { useSiteContent } from "@/context/SiteContentContext";
import { GlassCard } from "@/components/ui/GlassCard";

const categoryFilters = [
  { id: "ALL", label: "All Accolades" },
  { id: "PODIUM", label: "Podiums & Gold" },
  { id: "NATIONAL FINALIST", label: "National Finalists" },
];

export function Achievements() {
  const { achievements: dynamicAchievements } = useSiteContent();
  const achievements =
    dynamicAchievements && dynamicAchievements.length > 0
      ? dynamicAchievements
      : defaultAchievements;

  const [filter, setFilter] = useState("ALL");

  const filteredAchievements =
    filter === "ALL"
      ? achievements
      : achievements.filter(
          (a) =>
            a.category.toUpperCase() === filter ||
            (filter === "PODIUM" && a.category === "Podium")
        );

  const getCount = (catId: string) => {
    if (catId === "ALL") return achievements.length;
    if (catId === "PODIUM")
      return achievements.filter(
        (a) => a.category.toUpperCase() === "PODIUM" || a.category === "Podium"
      ).length;
    return achievements.filter((a) => a.category.toUpperCase() === catId).length;
  };

  return (
    <section id="achievements" className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-[#240d2b]/[0.08] pb-6">
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

          {/* Filter Pills with Glassmorphism */}
          <div className="flex flex-wrap gap-2 font-mono text-xs">
            {categoryFilters.map((cat) => {
              const count = getCount(cat.id);
              const isActive = filter === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setFilter(cat.id)}
                  className={`px-4 py-2 rounded-full font-medium transition-all cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? "bg-[#240d2b] text-[#f6f3ee] shadow-sm"
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

        {/* Horizontal Achievement Cards with GlassCard & Smooth Layout */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredAchievements.map((item, index) => (
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
                  className="p-8 h-full flex flex-col justify-between"
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
                    <span className="uppercase text-[10px] tracking-wider font-semibold">
                      {item.category}
                    </span>
                    <Trophy className="w-4 h-4 text-[#ff6b35]" />
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

export default Achievements;
