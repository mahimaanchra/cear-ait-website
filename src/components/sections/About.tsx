"use client";

import React from "react";
import { motion } from "framer-motion";
import { Brain, Cpu, Eye, Navigation, Crosshair } from "lucide-react";
import { siteConfig, focusAreas } from "@/data/siteData";
import { PerceptionCard } from "@/components/ui/PerceptionCard";

const iconMap: Record<string, React.ReactNode> = {
  ai: <Brain className="w-6 h-6 text-ink stroke-[2.2]" />,
  robotics: <Cpu className="w-6 h-6 text-ink stroke-[2.2]" />,
  vision: <Eye className="w-6 h-6 text-ink stroke-[2.2]" />,
  autonomous: <Navigation className="w-6 h-6 text-ink stroke-[2.2]" />,
};

export function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32 bg-transparent border-b-[2.5px] border-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-paper border-2 border-ink shadow-[2px_2px_0_#14140f] text-xs font-mono font-black text-ink mb-3 -rotate-1">
            <span>ABOUT THE CADRE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-tech text-ink tracking-tight">
            Autonomous Systems &amp; Robotics Research
          </h2>
          <p className="mt-2 text-base text-ink/75 font-body font-semibold leading-relaxed">
            Robotics research and defense technology engineering wing at Army Institute of Technology, Pune.
          </p>
        </div>

        {/* Vision & Mission Cards (Tactile Sticker Dossiers with spring hover) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            whileHover={{ y: -5, rotate: -1 }}
            transition={{ type: "spring", stiffness: 350, damping: 20 }}
            className="p-6 rounded-[20px_24px_18px_22px_/_24px_18px_22px_20px] bg-white border-[2.5px] border-ink shadow-[4px_5px_0_#14140f] -rotate-0.5 cursor-default"
          >
            <div className="inline-block px-2.5 py-0.5 rounded-full bg-ink text-paper text-[10px] font-mono font-black uppercase tracking-wider mb-2">
              Vision
            </div>
            <h3 className="font-tech text-lg font-black text-ink uppercase tracking-wide mb-1.5">
              Strategic Vision
            </h3>
            <p className="text-sm text-ink/80 leading-relaxed font-body font-semibold">
              {siteConfig.vision}
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5, rotate: 1 }}
            transition={{ type: "spring", stiffness: 350, damping: 20 }}
            className="p-6 rounded-[20px_24px_18px_22px_/_24px_18px_22px_20px] bg-white border-[2.5px] border-ink shadow-[4px_5px_0_#14140f] rotate-0.5 cursor-default"
          >
            <div className="inline-block px-2.5 py-0.5 rounded-full bg-ink text-white text-[10px] font-mono font-black uppercase tracking-wider mb-2">
              Mission
            </div>
            <h3 className="font-tech text-lg font-black text-ink uppercase tracking-wide mb-1.5">
              Mission &amp; Approach
            </h3>
            <p className="text-sm text-ink/80 leading-relaxed font-body font-semibold">
              {siteConfig.mission}
            </p>
          </motion.div>
        </div>

        {/* Core Domains Grid with interactive stamp pop */}
        <div className="space-y-5">
          <h3 className="text-2xl font-black font-tech text-ink">
            Core Domains
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {focusAreas.map((domain, idx) => (
              <motion.div
                key={domain.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -6, rotate: idx % 2 === 0 ? -1.5 : 1.5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 350, damping: 18 }}
                className="h-full cursor-default"
              >
                <PerceptionCard className="p-5 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2.5 rounded-xl bg-paper border-2 border-ink shadow-[2px_2px_0_#14140f] group-hover:rotate-6 transition-transform">
                        {iconMap[domain.id]}
                      </div>
                      <span className="text-[10px] font-mono font-black px-2.5 py-0.5 rounded-full bg-paper text-ink border-2 border-ink shadow-[2px_2px_0_#14140f]">
                        {domain.tag}
                      </span>
                    </div>

                    <h4 className="font-tech text-base font-black text-ink mb-1.5">
                      {domain.title}
                    </h4>

                    <p className="text-xs text-ink/80 font-body font-semibold leading-relaxed">
                      {domain.description}
                    </p>
                  </div>
                </PerceptionCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
