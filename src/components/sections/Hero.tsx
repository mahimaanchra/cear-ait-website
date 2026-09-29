"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Terminal, Cpu, Shield, Activity, Zap } from "lucide-react";
import { EventSpotlightCard } from "@/components/ui/EventSpotlightCard";

interface HeroProps {
  onOpenRegister?: (trackId?: string) => void;
}

export function Hero({ onOpenRegister }: HeroProps = {}) {
  const tickerItems = [
    "AUTONOMOUS DEFENSE SYSTEMS",
    "THE ROBOTICS STACK",
    "WARTECH 2026",
    "EDGE AI ACCELERATION",
    "ROS2 KINEMATICS",
    "MECHATRONICS & PCB",
    "3D LIDAR SLAM",
    "HIGH-TORQUE ACTUATION",
    "TACTICAL SWARM PROTOCOLS",
  ];

  return (
    <section id="hero" className="relative pt-28 sm:pt-36 pb-0 overflow-hidden bg-transparent border-b border-cyan-500/20">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Hero 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Command & Perception Telemetry */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Telemetry Status Badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0a101d] border border-cyan-500/35 shadow-[0_0_12px_rgba(0,240,255,0.2)] text-xs font-mono text-cyan-300">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>AIT PUNE // DEFENSE LAB 104</span>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#071318] border border-emerald-500/35 text-xs font-mono text-emerald-400">
                <Cpu className="w-3.5 h-3.5" />
                <span>AUTONOMY: LEVEL 4</span>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18080f] border border-rose-500/35 text-xs font-mono text-rose-400 hidden sm:inline-flex">
                <Activity className="w-3.5 h-3.5 animate-pulse" />
                <span>WARTECH 2026 // NOMINAL</span>
              </div>
            </div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight font-tech text-slate-100 leading-[1.08]">
                Centre of Excellence for{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-400 drop-shadow-[0_0_20px_rgba(0,240,255,0.4)]">
                  AI &amp; Autonomous Robotics
                </span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-base sm:text-lg text-slate-300 font-body leading-relaxed max-w-xl font-normal"
            >
              Autonomous defense rovers, sub-surface robotics, tactical drone swarms, and embedded perception systems engineered at Army Institute of Technology, Pune.
            </motion.p>

            {/* High-Tech Action CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <Link href="#projects" className="cyber-btn-primary">
                <span>Explore Fleet</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link href="#wartech" className="cyber-btn-crimson">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span>Wartech Championship</span>
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Event Spotlight Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, delay: 0.15 }}
              className="w-full flex justify-center lg:justify-end"
            >
              <EventSpotlightCard onOpenRegister={onOpenRegister} />
            </motion.div>
          </div>
        </div>

        {/* High-Tech Telemetry Metrics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.25 }}
          className="mt-14 pt-8 pb-10 border-t border-cyan-500/15 grid grid-cols-2 md:grid-cols-4 gap-4 text-center"
        >
          <div className="p-4 rounded-xl bg-[#090e1c]/80 border border-cyan-500/20 backdrop-blur-md">
            <span className="block text-3xl sm:text-4xl font-black font-tech text-cyan-400 drop-shadow-[0_0_12px_rgba(0,240,255,0.4)]">
              50+
            </span>
            <span className="text-[11px] font-mono text-slate-400 font-bold uppercase tracking-wider">
              Autonomous Systems
            </span>
          </div>

          <div className="p-4 rounded-xl bg-[#090e1c]/80 border border-cyan-500/20 backdrop-blur-md">
            <span className="block text-3xl sm:text-4xl font-black font-tech text-emerald-400 drop-shadow-[0_0_12px_rgba(0,255,157,0.4)]">
              15+
            </span>
            <span className="text-[11px] font-mono text-slate-400 font-bold uppercase tracking-wider">
              National Podiums
            </span>
          </div>

          <div className="p-4 rounded-xl bg-[#090e1c]/80 border border-cyan-500/20 backdrop-blur-md">
            <span className="block text-3xl sm:text-4xl font-black font-tech text-slate-100">
              120+
            </span>
            <span className="text-[11px] font-mono text-slate-400 font-bold uppercase tracking-wider">
              Engineering Cadets
            </span>
          </div>

          <div className="p-4 rounded-xl bg-[#090e1c]/80 border border-rose-500/25 backdrop-blur-md">
            <span className="block text-3xl sm:text-4xl font-black font-tech text-rose-400 drop-shadow-[0_0_12px_rgba(255,51,102,0.4)]">
              100%
            </span>
            <span className="text-[11px] font-mono text-slate-400 font-bold uppercase tracking-wider">
              In-House Hardware
            </span>
          </div>
        </motion.div>
      </div>

      {/* Cyber Laser Ticker Marquee */}
      <div className="bg-[#05070e] text-slate-300 py-3 overflow-hidden border-t border-b border-cyan-500/20">
        <div className="animate-marquee flex items-center gap-8 whitespace-nowrap text-xs font-mono font-bold tracking-widest uppercase">
          {[...tickerItems, ...tickerItems].map((item, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <span className="text-cyan-400 drop-shadow-[0_0_6px_#00f0ff]">✦</span>
              <span className="hover:text-cyan-300 transition-colors">{item}</span>
              <span className="text-cyan-500/30">::</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
