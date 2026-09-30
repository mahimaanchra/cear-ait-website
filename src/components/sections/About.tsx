"use client";

import React from "react";
import { motion } from "framer-motion";
import { Brain, Cpu, Eye, Navigation, ArrowUpRight } from "lucide-react";
import { siteConfig, focusAreas } from "@/data/siteData";
import { WordBlurReveal } from "@/components/ui/WordBlurReveal";

const iconMap: Record<string, React.ReactNode> = {
  ai: <Brain className="w-5 h-5 text-[#0d1321]" />,
  robotics: <Cpu className="w-5 h-5 text-[#0d1321]" />,
  vision: <Eye className="w-5 h-5 text-[#0d1321]" />,
  autonomous: <Navigation className="w-5 h-5 text-[#0d1321]" />,
};

export function About() {
  return (
    <section id="about" className="relative py-28 sm:py-36 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Editorial Focus-Pull Headline (inFaces inspired) */}
        <div className="max-w-4xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#0d1321]/60">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0d1321]" />
            <span>01 // Dossier &amp; Philosophy</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#0d1321] font-display leading-[1.12]">
            <WordBlurReveal
              text="Pioneering autonomous robotics, embedded intelligence, and hardware craft."
              highlightWords={["autonomous", "intelligence", "craft."]}
              highlightClassName="text-[#0d1321] underline decoration-[#dcf836] decoration-4 underline-offset-6"
            />
          </h2>

          <p className="text-base sm:text-lg text-[#0d1321]/70 font-body leading-relaxed max-w-2xl pt-2">
            The Centre of Excellence for AI &amp; Robotics is Army Institute of Technology’s primary innovation hub—engineering unmanned rovers, tactical drones, sub-surface platforms, and high-performance actuation for tomorrow’s frontiers.
          </p>
        </div>

        {/* Vision & Mission: Clean Editorial Split Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 sm:p-10 rounded-3xl bg-white border border-[#0d1321]/[0.08] shadow-[0_20px_50px_-15px_rgba(13,19,33,0.04)] hover:border-[#0d1321]/20 transition-all flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#0d1321]/50 bg-[#0d1321]/[0.04] px-3 py-1 rounded-full">
                Strategic Vision
              </span>
              <h3 className="font-display text-2xl font-bold text-[#0d1321] mt-5 mb-3 tracking-tight">
                National Leadership in Autonomous Defense
              </h3>
              <p className="text-sm sm:text-base text-[#0d1321]/70 leading-relaxed font-body">
                {siteConfig.vision}
              </p>
            </div>
            <div className="pt-8 mt-6 border-t border-[#0d1321]/[0.06] flex items-center justify-between text-xs font-mono text-[#0d1321]/50">
              <span>EST. 2020</span>
              <span>AIT PUNE</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="p-8 sm:p-10 rounded-3xl bg-white border border-[#0d1321]/[0.08] shadow-[0_20px_50px_-15px_rgba(13,19,33,0.04)] hover:border-[#0d1321]/20 transition-all flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#0d1321]/50 bg-[#0d1321]/[0.04] px-3 py-1 rounded-full">
                Core Mission
              </span>
              <h3 className="font-display text-2xl font-bold text-[#0d1321] mt-5 mb-3 tracking-tight">
                Engineering from First Principles
              </h3>
              <p className="text-sm sm:text-base text-[#0d1321]/70 leading-relaxed font-body">
                {siteConfig.mission}
              </p>
            </div>
            <div className="pt-8 mt-6 border-t border-[#0d1321]/[0.06] flex items-center justify-between text-xs font-mono text-[#0d1321]/50">
              <span>CADRE // LAB 104</span>
              <span>DEFENSE TECH</span>
            </div>
          </motion.div>
        </div>

        {/* Technical Domains Section */}
        <div id="domains" className="space-y-8 pt-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#0d1321]/[0.08] pb-6">
            <div>
              <span className="text-xs font-mono tracking-widest uppercase text-[#0d1321]/50">
                Disciplines
              </span>
              <h3 className="text-2xl sm:text-3xl font-black font-display text-[#0d1321] tracking-tight mt-1">
                Core Technical Pillars
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#0d1321]/60 font-mono">
              ROS2 • PyTorch • RTOS • Edge Neural Accelerators
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {focusAreas.map((domain, index) => (
              <motion.div
                key={domain.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -6 }}
                className="group p-6 rounded-2xl bg-white border border-[#0d1321]/[0.08] shadow-[0_10px_30px_-10px_rgba(13,19,33,0.03)] hover:shadow-[0_20px_40px_-15px_rgba(13,19,33,0.08)] hover:border-[#0d1321]/25 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-10 h-10 rounded-xl bg-[#fafaf9] border border-[#0d1321]/[0.08] flex items-center justify-center group-hover:bg-[#dcf836] transition-colors">
                      {iconMap[domain.id]}
                    </div>
                    <span className="text-[10px] font-mono tracking-wider text-[#0d1321]/50 uppercase">
                      {domain.tag}
                    </span>
                  </div>

                  <h4 className="font-display text-lg font-bold text-[#0d1321] tracking-tight mb-2">
                    {domain.title}
                  </h4>

                  <p className="text-xs text-[#0d1321]/65 font-body leading-relaxed">
                    {domain.description}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-[#0d1321]/[0.06] flex items-center justify-between text-xs text-[#0d1321]/40 group-hover:text-[#0d1321] transition-colors font-mono">
                  <span>Explore research</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
