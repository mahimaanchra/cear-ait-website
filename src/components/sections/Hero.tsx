"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Terminal, Shield } from "lucide-react";
import { siteConfig } from "@/data/siteData";

export function Hero() {
  return (
    <section id="hero" className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Split Hero: Left Typography & Actions, Right { / } CIDC/CEAR Boxed Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Stacked Industrial Headline */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Red Accent Dash */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="w-10 h-1 bg-red-600 rounded-sm mb-4"
            />

            {/* Stacked Industrial Bold Headline with Trailing Underscore */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-0 mb-6"
            >
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight uppercase leading-[0.95] font-industrial text-zinc-900">
                INNOVATION <br />
                THROUGH <br />
                <span className="text-[#0d5c58]">DEVELOPMENT_</span>
              </h1>
            </motion.div>

            {/* Subtext Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm sm:text-base text-zinc-600 leading-relaxed max-w-xl mb-8 font-sans"
            >
              The Centre of Excellence for AI and Robotics at Army Institute of Technology, Pune. Spearheading defense automation, autonomous navigation, underwater exploration craft, and multi-axis manipulator robotics.
            </motion.p>

            {/* Dual Action Buttons: Dark Teal Pill + Outline Pill */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3 sm:gap-4"
            >
              <Link href="#projects" className="btn-teal-pill">
                <span>GET STARTED</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <Link href="#about" className="btn-outline-pill">
                <span>LAB MANIFESTO</span>
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Framed Boxed Card with { / } CEAR */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full max-w-sm aspect-[4/3] rounded-2xl bg-white border border-zinc-200/90 p-8 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow"
            >
              {/* Corner Red Accent Marks */}
              <div className="absolute top-0 right-0 w-8 h-8 overflow-hidden">
                <div className="w-12 h-12 bg-red-600 rotate-45 transform origin-bottom-left translate-x-2 -translate-y-6" />
              </div>
              <div className="absolute bottom-3 right-3 w-4 h-1 bg-red-600" />

              {/* Top Meta */}
              <div className="flex items-center justify-between font-mono text-xs text-zinc-400">
                <span>ESTD. AIT PUNE</span>
                <span className="text-[10px] bg-zinc-100 text-zinc-700 px-2 py-0.5 rounded font-bold">
                  DEPT OF E&amp;TC
                </span>
              </div>

              {/* Central Boxed Logo */}
              <div className="text-center py-4">
                <div className="font-mono text-base text-red-600 font-bold tracking-widest mb-1">
                  {`{ / }`}
                </div>
                <h2 className="text-5xl sm:text-6xl font-black font-industrial tracking-tighter text-zinc-900">
                  CEAR
                </h2>
                <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 mt-2">
                  AI &amp; ROBOTICS EXCELLENCE
                </p>
              </div>

              {/* Bottom Meta */}
              <div className="pt-4 border-t border-zinc-100 flex items-center justify-between font-mono text-[11px] text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0d5c58]" />
                  <span>LAB 104 • ACTIVE</span>
                </span>
                <span>SYS.V2.6</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
