"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Terminal, Shield, Zap, Sparkles, Activity, Layers, Disc3 } from "lucide-react";
import { siteConfig } from "@/data/siteData";
import { NeuralCanvas } from "@/components/ui/NeuralCanvas";
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
    <section id="hero" className="relative pt-24 sm:pt-28 pb-12 overflow-hidden bg-slate-50 border-b border-slate-200">
      {/* Subtle Background Grid Pattern */}
      <div className="absolute inset-0 canvas-tech-grid opacity-70 pointer-events-none" />
      <NeuralCanvas className="opacity-80" nodeCount={36} interactive={true} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Meta Info Bar: Date/Lab badges, quick indicators */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-8 text-xs font-mono">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white border border-slate-200 shadow-xs text-slate-700 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>LAB 104 • OPERATIONAL</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-50 border border-blue-200 text-blue-700 font-semibold">
            <Shield className="w-3.5 h-3.5 text-blue-600" />
            <span>ARMY INSTITUTE OF TECHNOLOGY</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-50 border border-amber-200 text-amber-800 font-semibold">
            <Zap className="w-3.5 h-3.5 text-amber-600" />
            <span>WARTECH 2026 COUNTDOWN: 14 DAYS</span>
          </div>

          <div className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-600">
            <span>SYS.REV 4.2</span>
          </div>
        </div>

        {/* Main Hero Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headlines, Tagline & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-3"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-logo-navy text-white text-xs font-mono font-bold uppercase tracking-wider border border-slate-800 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>ARMY INSTITUTE OF TECHNOLOGY • CEAR</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-tech text-slate-900 leading-[1.08]">
                Center of Excellence for{" "}
                <span className="text-blue-600 underline decoration-blue-300 decoration-wavy decoration-2">
                  AI and Robotics
                </span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-base sm:text-lg text-slate-600 font-sans leading-relaxed max-w-2xl"
            >
              The premier defense mechatronics and artificial intelligence club at Army Institute of Technology, Pune. We engineer autonomous ground rovers, synchronized aerial swarms, 6-DOF robotic manipulators, and amphibious combat platforms.
            </motion.p>

            {/* Metric Highlights Strip */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2"
            >
              <div className="p-3 rounded-lg bg-white border border-slate-200 shadow-xs">
                <span className="block text-2xl font-black font-tech text-blue-600">50+</span>
                <span className="text-xs font-mono text-slate-500 uppercase font-semibold">Robots Built</span>
              </div>
              <div className="p-3 rounded-lg bg-white border border-slate-200 shadow-xs">
                <span className="block text-2xl font-black font-tech text-amber-500">15+</span>
                <span className="text-xs font-mono text-slate-500 uppercase font-semibold">Podiums</span>
              </div>
              <div className="p-3 rounded-lg bg-white border border-slate-200 shadow-xs">
                <span className="block text-2xl font-black font-tech text-emerald-600">120+</span>
                <span className="text-xs font-mono text-slate-500 uppercase font-semibold">Innovators</span>
              </div>
              <div className="p-3 rounded-lg bg-white border border-slate-200 shadow-xs">
                <span className="block text-2xl font-black font-tech text-red-500">100%</span>
                <span className="text-xs font-mono text-slate-500 uppercase font-semibold">Hardware</span>
              </div>
            </motion.div>

            {/* Primary CTAs: Explore Projects and Wartech Fest */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <Link
                href="#projects"
                className="bg-logo-navy hover:bg-slate-800 text-white font-tech font-bold text-sm px-6 py-3 rounded-lg shadow-sm hover:shadow transition-all flex items-center gap-2 group cursor-pointer border border-slate-800"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                href="#wartech"
                className="bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 font-tech font-bold text-sm px-6 py-3 rounded-lg shadow-xs transition-all flex items-center gap-2 hover:border-slate-400 group cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-red-500" />
                <span>Wartech Fest 2026</span>
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Live & Upcoming Event Spotlight Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full flex justify-center lg:justify-end"
            >
              <EventSpotlightCard onOpenRegister={onOpenRegister} />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Ticker / Scrolling Marquee at the bottom of Hero */}
      <div className="mt-12 bg-logo-navy text-white py-3 overflow-hidden border-y border-slate-800">
        <div className="animate-marquee-infinite flex items-center gap-8 whitespace-nowrap text-xs sm:text-sm font-mono font-bold tracking-wider">
          {[...tickerItems, ...tickerItems].map((item, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <span className="text-blue-400">⚡</span>
              <span className="hover:text-blue-300 transition-colors">{item}</span>
              <span className="text-slate-600">•</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
