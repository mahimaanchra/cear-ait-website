"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
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
    <section id="hero" className="relative pt-28 sm:pt-36 pb-0 overflow-hidden bg-transparent border-b-[2.5px] border-ink">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Hero 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Focused, Clean, Punchy Typography */}
          <div className="lg:col-span-7 space-y-6">
            {/* Status indicator + Companion mascot */}
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border-2 border-ink shadow-[2px_2px_0_#14140f] text-xs font-mono text-ink font-bold">
                <span className="w-2 h-2 rounded-full bg-alarm animate-ping" />
                <span>AIT PUNE • LAB 104</span>
              </div>

              {/* Animated Chibi Companion Mascot */}
              <div className="flex items-center gap-2 animate-float-slow">
                <div className="w-8 h-8 bg-white rounded-xl border-2 border-ink shadow-[1.5px_1.5px_0_#14140f] flex items-center justify-center hover-wiggle cursor-pointer">
                  <svg viewBox="0 0 60 60" className="w-6 h-6" fill="none">
                    <rect x="8" y="14" width="44" height="34" rx="10" fill="#ffffff" stroke="#14140f" strokeWidth="2.5" />
                    <rect x="13" y="19" width="34" height="22" rx="7" fill="#14140f" />
                    <circle cx="23" cy="30" r="3" fill="#ffffff" className="animate-blink" />
                    <circle cx="37" cy="30" r="3" fill="#ffffff" className="animate-blink" />
                    <line x1="30" y1="14" x2="30" y2="6" stroke="#14140f" strokeWidth="2.5" />
                    <circle cx="30" cy="5" r="3" fill="#c0342a" stroke="#14140f" strokeWidth="2" />
                  </svg>
                </div>
                <span className="text-[11px] font-mono font-bold text-ink/70 hidden sm:inline-block">
                  SYSTEMS ONLINE
                </span>
              </div>
            </div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight font-tech text-ink leading-[1.08]">
                Centre of Excellence for{" "}
                <span className="underline decoration-ink decoration-[3.5px] underline-offset-6">
                  AI &amp; Robotics
                </span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-base sm:text-lg text-ink/80 font-body leading-relaxed max-w-xl font-semibold"
            >
              Autonomous defense robotics, embedded intelligence, and hardware craft at Army Institute of Technology, Pune.
            </motion.p>

            {/* Clean CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <Link href="#projects" className="btn-paper-primary hover-wiggle">
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </Link>

              <Link href="#wartech" className="btn-paper-secondary hover-wiggle">
                <span className="w-2 h-2 rounded-full bg-alarm animate-pulse" />
                <span>Wartech Fest 2026</span>
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

        {/* Airy, Minimal Horizontal Metrics Strip */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.25 }}
          className="mt-14 pt-8 pb-10 border-t-2 border-ink/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
        >
          <div className="space-y-1">
            <span className="block text-3xl sm:text-4xl font-black font-tech text-ink">50+</span>
            <span className="text-xs font-mono text-ink/65 font-bold uppercase tracking-wider">Robots Built</span>
          </div>

          <div className="space-y-1">
            <span className="block text-3xl sm:text-4xl font-black font-tech text-ink">15+</span>
            <span className="text-xs font-mono text-ink/65 font-bold uppercase tracking-wider">National Podiums</span>
          </div>

          <div className="space-y-1">
            <span className="block text-3xl sm:text-4xl font-black font-tech text-ink">120+</span>
            <span className="text-xs font-mono text-ink/65 font-bold uppercase tracking-wider">Innovators</span>
          </div>

          <div className="space-y-1">
            <span className="block text-3xl sm:text-4xl font-black font-tech text-alarm">100%</span>
            <span className="text-xs font-mono text-ink/65 font-bold uppercase tracking-wider">In-House Hardware</span>
          </div>
        </motion.div>
      </div>

      {/* Clean Dual Ticker Marquee */}
      <div className="bg-ink text-paper py-3 overflow-hidden border-t-2 border-ink">
        <div className="animate-marquee-infinite flex items-center gap-8 whitespace-nowrap text-xs font-mono font-bold tracking-wider">
          {[...tickerItems, ...tickerItems].map((item, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <span className="text-alarm">✦</span>
              <span className="hover:text-white transition-colors">{item}</span>
              <span className="text-paper/30">•</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
