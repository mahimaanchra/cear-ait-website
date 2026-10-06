"use client";

import React from "react";
import { motion } from "framer-motion";
import { Brain, Cpu, Eye, Navigation, ArrowUpRight, Sparkles } from "lucide-react";
import { siteConfig, focusAreas } from "@/data/siteData";
import { WordBlurReveal } from "@/components/ui/WordBlurReveal";
import { GlassCard } from "@/components/ui/GlassCard";

const iconMap: Record<string, React.ReactNode> = {
  ai: <Brain className="w-5 h-5 text-[#240d2b] group-hover:text-white transition-colors" />,
  robotics: <Cpu className="w-5 h-5 text-[#240d2b] group-hover:text-white transition-colors" />,
  vision: <Eye className="w-5 h-5 text-[#240d2b] group-hover:text-white transition-colors" />,
  autonomous: <Navigation className="w-5 h-5 text-[#240d2b] group-hover:text-white transition-colors" />,
};

export function About() {
  return (
    <section id="about" className="relative py-28 sm:py-36 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Editorial Focus-Pull Headline */}
        <div className="max-w-4xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#240d2b]/60">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b35]" />
            <span>01 // Overview &amp; Vision</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#240d2b] font-display leading-[1.12]">
            <WordBlurReveal
              text="Pioneering autonomous robotics, embedded intelligence, and hardware craft."
              highlightWords={["autonomous", "intelligence", "craft."]}
              highlightClassName="text-[#240d2b] underline decoration-[#ff6b35] decoration-4 underline-offset-6"
            />
          </h2>

          <p className="text-base sm:text-lg text-[#240d2b]/70 font-body leading-relaxed max-w-2xl pt-2">
            The Centre of Excellence for AI &amp; Robotics is Army Institute of Technology’s primary innovation hub—engineering unmanned rovers, tactical drones, sub-surface platforms, and high-performance actuation for tomorrow’s frontiers.
          </p>
        </div>

        {/* Vision & Mission: Glassmorphic Split Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <GlassCard
            className="p-8 sm:p-10 flex flex-col justify-between"
            spotlightColor="rgba(255, 107, 53, 0.12)"
          >
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#240d2b]/70 bg-white/80 border border-white/80 px-3 py-1 rounded-full shadow-xs">
                Strategic Vision
              </span>
              <h3 className="font-display text-2xl font-bold text-[#240d2b] mt-5 mb-3 tracking-tight">
                National Leadership in Autonomous Defense
              </h3>
              <p className="text-sm sm:text-base text-[#240d2b]/75 leading-relaxed font-body">
                {siteConfig.vision}
              </p>
            </div>
            <div className="pt-8 mt-6 border-t border-[#240d2b]/[0.08] flex items-center justify-between text-xs font-mono text-[#240d2b]/50">
              <span>EST. 2020</span>
              <span className="text-[#ff6b35] font-semibold">AIT PUNE</span>
            </div>
          </GlassCard>

          <GlassCard
            className="p-8 sm:p-10 flex flex-col justify-between"
            spotlightColor="rgba(36, 13, 43, 0.08)"
          >
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#240d2b]/70 bg-white/80 border border-white/80 px-3 py-1 rounded-full shadow-xs">
                Core Mission
              </span>
              <h3 className="font-display text-2xl font-bold text-[#240d2b] mt-5 mb-3 tracking-tight">
                Engineering from First Principles
              </h3>
              <p className="text-sm sm:text-base text-[#240d2b]/75 leading-relaxed font-body">
                {siteConfig.mission}
              </p>
            </div>
            <div className="pt-8 mt-6 border-t border-[#240d2b]/[0.08] flex items-center justify-between text-xs font-mono text-[#240d2b]/50">
              <span>CEAR // LAB 104</span>
              <span className="text-[#ff6b35] font-semibold">DEFENSE TECH</span>
            </div>
          </GlassCard>
        </div>

        {/* Technical Domains Section with Glass Cards */}
        <div id="domains" className="space-y-8 pt-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#240d2b]/[0.08] pb-6">
            <div>
              <span className="text-xs font-mono tracking-widest uppercase text-[#240d2b]/50">
                Disciplines
              </span>
              <h3 className="text-2xl sm:text-3xl font-black font-display text-[#240d2b] tracking-tight mt-1">
                Core Technical Pillars
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#240d2b]/60 font-mono">
              ROS2 • PyTorch • RTOS • Edge Neural Accelerators
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {focusAreas.map((domain, index) => (
              <GlassCard
                key={domain.id}
                className="group p-6 flex flex-col justify-between"
                spotlightColor="rgba(255, 107, 53, 0.16)"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-10 h-10 rounded-xl bg-white/90 border border-[#240d2b]/[0.08] flex items-center justify-center group-hover:bg-[#ff6b35] shadow-xs transition-colors">
                      {iconMap[domain.id]}
                    </div>
                    <span className="text-[10px] font-mono tracking-wider text-[#240d2b]/60 uppercase bg-white/60 px-2 py-0.5 rounded-full border border-white/60">
                      {domain.tag}
                    </span>
                  </div>

                  <h4 className="font-display text-lg font-bold text-[#240d2b] tracking-tight mb-2 group-hover:text-[#ff6b35] transition-colors">
                    {domain.title}
                  </h4>

                  <p className="text-xs text-[#240d2b]/70 font-body leading-relaxed">
                    {domain.description}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-[#240d2b]/[0.06] flex items-center justify-between text-xs text-[#240d2b]/40 group-hover:text-[#ff6b35] transition-colors font-mono">
                  <span>Explore domain</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
