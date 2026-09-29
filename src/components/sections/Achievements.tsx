"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Award, Medal } from "lucide-react";
import { achievements } from "@/data/siteData";

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
    <section id="achievements" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-transparent border-b border-cyan-500/20">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0a101d] border border-cyan-500/35 text-xs font-mono font-bold text-cyan-300 mb-2">
              <Trophy className="w-3.5 h-3.5 text-cyan-400" />
              <span>PODIUM RECORD &amp; ACCOLADES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-tech tracking-tight text-slate-100 mb-2">
              Track Record
            </h2>
            <p className="text-sm sm:text-base text-slate-300 font-body max-w-xl">
              Podiums and championships clinched across national robotics tournaments.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 font-mono text-xs">
            {categoryFilters.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer border ${
                  filter === cat
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-[0_0_12px_rgba(0,240,255,0.3)]"
                    : "bg-[#0c1222] text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200"
                }`}
              >
                {cat === "ALL" ? "All" : cat === "PODIUM" ? "Podiums" : "Finalists"}
              </button>
            ))}
          </div>
        </div>

        {/* Horizontal Achievement Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.map((item) => {
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="rounded-xl bg-[#0c1222]/85 border border-cyan-500/20 hover:border-cyan-400/50 p-6 shadow-[0_8px_30px_rgba(0,0,0,0.6)] flex flex-col justify-between cursor-default group backdrop-blur-xl transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-amber-400 bg-amber-950/40 px-2.5 py-0.5 rounded border border-amber-500/30">
                      {item.rank}
                    </span>
                    <span className="font-mono text-xs text-slate-500 font-bold">
                      {item.year}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-tech text-lg font-bold text-slate-100 leading-tight group-hover:text-cyan-300 transition-colors">
                      {item.event}
                    </h3>
                    <p className="font-mono text-xs text-cyan-400 font-bold mt-1">
                      {item.institution}
                    </p>
                  </div>

                  <p className="font-body text-xs text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400 font-bold">
                  <span className="uppercase text-[10px] tracking-wider text-slate-500">{item.category}</span>
                  <Trophy className="w-4 h-4 text-amber-400" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Achievements;
