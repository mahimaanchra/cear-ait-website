"use client";

import React from "react";
import { motion } from "framer-motion";
import { Brain, Cpu, Eye, Navigation, Shield, Compass, Binary } from "lucide-react";
import { siteConfig, focusAreas } from "@/data/siteData";
import { PerceptionCard } from "@/components/ui/PerceptionCard";

const iconMap: Record<string, React.ReactNode> = {
  ai: <Brain className="w-6 h-6 text-cyan-400" />,
  robotics: <Cpu className="w-6 h-6 text-emerald-400" />,
  vision: <Eye className="w-6 h-6 text-cyan-400" />,
  autonomous: <Navigation className="w-6 h-6 text-cyan-400" />,
};

export function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32 bg-transparent border-b border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0a101d] border border-cyan-500/35 text-xs font-mono font-bold text-cyan-300">
            <Binary className="w-3.5 h-3.5 text-cyan-400" />
            <span>ORGANIZATIONAL DOSSIER</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-tech text-slate-100 tracking-tight">
            Autonomous Systems &amp; Robotics Research
          </h2>
          <p className="text-base text-slate-300 font-body font-normal leading-relaxed">
            The premier autonomous robotics laboratory and defense technology engineering cadre at Army Institute of Technology, Pune.
          </p>
        </div>

        {/* Vision & Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="p-6 sm:p-8 rounded-xl bg-[#0b101e]/85 border border-cyan-500/25 shadow-[0_10px_35px_rgba(0,0,0,0.6)] backdrop-blur-xl relative overflow-hidden"
          >
            <div className="cyber-bracket-top-left" />
            <div className="inline-block px-2.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/40 text-cyan-400 text-[10px] font-mono font-bold uppercase tracking-wider mb-3">
              STRATEGIC VISION
            </div>
            <h3 className="font-tech text-xl font-bold text-slate-100 uppercase tracking-wide mb-2">
              National Robotics Leadership
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed font-body">
              {siteConfig.vision}
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="p-6 sm:p-8 rounded-xl bg-[#0b101e]/85 border border-emerald-500/25 shadow-[0_10px_35px_rgba(0,0,0,0.6)] backdrop-blur-xl relative overflow-hidden"
          >
            <div className="cyber-bracket-top-left !border-emerald-400" />
            <div className="inline-block px-2.5 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-[10px] font-mono font-bold uppercase tracking-wider mb-3">
              OPERATIONAL MISSION
            </div>
            <h3 className="font-tech text-xl font-bold text-slate-100 uppercase tracking-wide mb-2">
              Mission &amp; Hardware Craft
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed font-body">
              {siteConfig.mission}
            </p>
          </motion.div>
        </div>

        {/* Core Domains Grid */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-cyan-400" />
            <h3 className="text-2xl font-black font-tech text-slate-100">
              Core Technical Pillars
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {focusAreas.map((domain) => (
              <motion.div
                key={domain.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="h-full cursor-default"
              >
                <PerceptionCard className="p-5 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2.5 rounded-lg bg-[#070b14] border border-cyan-500/30 shadow-[0_0_10px_rgba(0,240,255,0.15)] group-hover:border-cyan-400 transition-colors">
                        {iconMap[domain.id]}
                      </div>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-950/40 text-cyan-400 border border-cyan-500/30">
                        {domain.tag}
                      </span>
                    </div>

                    <h4 className="font-tech text-base font-bold text-slate-100 mb-1.5 group-hover:text-cyan-300 transition-colors">
                      {domain.title}
                    </h4>

                    <p className="text-xs text-slate-400 font-body leading-relaxed">
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
