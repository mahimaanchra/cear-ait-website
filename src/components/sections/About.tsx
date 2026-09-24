"use client";

import React from "react";
import { motion } from "framer-motion";
import { Brain, Cpu, Eye, Navigation, CheckCircle2, ShieldCheck, Compass, Award } from "lucide-react";
import { siteConfig, focusAreas } from "@/data/siteData";

const iconMap: Record<string, React.ReactNode> = {
  ai: <Brain className="w-6 h-6 text-blue-600" />,
  robotics: <Cpu className="w-6 h-6 text-emerald-600" />,
  vision: <Eye className="w-6 h-6 text-amber-500" />,
  autonomous: <Navigation className="w-6 h-6 text-red-500" />,
};

const badgeStyles: Record<string, string> = {
  blue: "bg-blue-50 text-blue-700 border-blue-200",
  green: "bg-emerald-50 text-emerald-700 border-emerald-200",
  yellow: "bg-amber-50 text-amber-700 border-amber-200",
  red: "bg-red-50 text-red-700 border-red-200",
};

export function About() {
  return (
    <section id="about" className="relative py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-logo-navy text-white text-xs font-mono font-bold uppercase tracking-wider mb-3 border border-slate-800 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>DISCIPLINE • INNOVATION • FIELD EXCELLENCE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-tech text-slate-900 tracking-tight">
            About the Centre of Excellence
          </h2>
          <p className="mt-3 text-base text-slate-600 font-sans leading-relaxed">
            CEAR is the specialized robotics and artificial intelligence research wing at Army Institute of Technology, Pune. We bridge theoretical engineering algorithms with robust physical defense mechatronics through project-driven hardware research.
          </p>
        </div>

        {/* Vision & Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl bg-slate-50 border border-slate-200/90 border-t-4 border-t-logo-navy hover:border-slate-300 transition-colors shadow-xs">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-logo-navy" />
              <h3 className="font-tech text-lg font-bold text-slate-900 uppercase tracking-wide">
                Our Strategic Vision
              </h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed font-sans">
              {siteConfig.vision}
            </p>
          </div>

          <div className="p-6 rounded-xl bg-slate-50 border border-slate-200/90 hover:border-emerald-200 transition-colors">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              <h3 className="font-tech text-lg font-bold text-slate-900 uppercase tracking-wide">
                Our Mission &amp; Approach
              </h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed font-sans">
              {siteConfig.mission}
            </p>
          </div>
        </div>

        {/* Core Domains Grid */}
        <div className="space-y-6">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
              CORE TECHNICAL DOMAINS
            </span>
            <h3 className="text-2xl font-bold font-tech text-slate-900 mt-1">
              Four Pillars of CEAR Engineering
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {focusAreas.map((domain, idx) => (
              <motion.div
                key={domain.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="p-6 rounded-xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                      {iconMap[domain.id]}
                    </div>
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                        badgeStyles[domain.accent]
                      }`}
                    >
                      {domain.tag}
                    </span>
                  </div>

                  <h4 className="font-tech text-lg font-bold text-slate-900 mb-2">
                    {domain.title}
                  </h4>

                  <p className="text-xs text-slate-600 font-sans leading-relaxed mb-4">
                    {domain.description}
                  </p>
                </div>

                <div className="space-y-1.5 pt-4 border-t border-slate-100">
                  {domain.bullets.map((bullet, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-mono text-slate-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                      <span className="truncate">{bullet}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
