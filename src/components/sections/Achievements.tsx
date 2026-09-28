"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
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
    <section id="achievements" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-transparent border-b-[2.5px] border-ink">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-paper border-2 border-ink shadow-[2px_2px_0_#14140f] text-xs font-mono font-black text-ink mb-1 -rotate-1">
              <span>PODIUM RECORD</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-tech tracking-tight text-ink mb-2">
              Achievements
            </h2>
            <p className="text-sm sm:text-base text-ink-soft font-body font-semibold max-w-xl">
              Podiums and showcases across national engineering championships.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 font-mono text-xs">
            {categoryFilters.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3.5 py-1 rounded-full font-black transition-all cursor-pointer border-2 border-ink ${
                  filter === cat
                    ? "bg-ink text-paper shadow-[2px_2px_0_#14140f] -translate-y-0.5 -rotate-1"
                    : "bg-white text-ink hover:bg-paper"
                }`}
              >
                {cat === "ALL" ? "All" : cat === "PODIUM" ? "Podiums" : "Finalists"}
              </button>
            ))}
          </div>
        </div>

        {/* Horizontal Achievement Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.map((item, idx) => {
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -6, rotate: idx % 2 === 0 ? -1.5 : 1.5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 350, damping: 18 }}
                className="rounded-[20px_24px_18px_22px_/_24px_18px_22px_20px] bg-white border-[2.5px] border-ink p-6 shadow-[4px_5px_0_#14140f] flex flex-col justify-between cursor-default group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-black text-ink bg-paper px-2.5 py-0.5 rounded-full border-2 border-ink shadow-[1.5px_1.5px_0_#14140f]">
                      {item.rank}
                    </span>
                    <span className="font-mono text-xs text-ink/60 font-bold">
                      {item.year}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-tech text-lg font-black text-ink leading-tight group-hover:text-alarm transition-colors">
                      {item.event}
                    </h3>
                    <p className="font-mono text-xs text-ink font-bold mt-1">
                      {item.institution}
                    </p>
                  </div>

                  <p className="font-body text-xs text-ink/80 font-semibold leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t-2 border-ink/10 flex items-center justify-between text-xs font-mono text-ink/70 font-bold">
                  <span className="uppercase text-[10px] tracking-wider">{item.category}</span>
                  <Trophy className="w-4 h-4 text-ink stroke-[2.2] group-hover:rotate-12 transition-transform" />
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
