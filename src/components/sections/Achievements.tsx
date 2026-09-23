"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Award } from "lucide-react";
import { achievements } from "@/data/siteData";

const categoryFilters = ["ALL", "PODIUM", "NATIONAL FINALIST", "DEFENSE SHOWCASE"];

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
    <section id="achievements" className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Heading: Red Dash + TRACK RECORD */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <div className="w-10 h-1 bg-red-600 rounded-sm mb-3" />
            <h2 className="text-3xl sm:text-5xl font-extrabold uppercase font-industrial tracking-tight text-zinc-900 leading-[0.95] mb-3">
              TRACK <br />
              <span className="text-[#0d5c58]">RECORD_</span>
            </h2>
            <p className="text-sm text-zinc-600 font-sans max-w-xl">
              Competitive podiums and defense showcases across national engineering championships.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 font-mono text-xs">
            {categoryFilters.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3.5 py-1.5 rounded-full font-bold transition-all cursor-pointer ${
                  filter === cat
                    ? "bg-[#0d5c58] text-white shadow-sm"
                    : "bg-white text-zinc-600 hover:text-black border border-zinc-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Horizontal Achievement Cards - AIT_CIDC Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.map((item, idx) => {
            const isPodium = item.category === "Podium";

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="rounded-2xl bg-white border border-zinc-200/90 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200/60">
                      {item.rank}
                    </span>
                    <span className="font-mono text-xs text-zinc-400">
                      {item.year}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-industrial text-lg font-bold text-zinc-900 leading-tight">
                      {item.event}
                    </h3>
                    <p className="font-mono text-xs text-[#0d5c58] font-bold mt-1">
                      {item.institution}
                    </p>
                  </div>

                  <p className="font-sans text-xs text-zinc-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-zinc-100 flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span className="uppercase text-[10px]">{item.category}</span>
                  <Trophy className="w-3.5 h-3.5 text-[#0d5c58]" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
