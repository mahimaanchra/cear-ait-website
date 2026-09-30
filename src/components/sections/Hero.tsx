"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface HeroProps {
  onOpenRegister?: (trackId?: string) => void;
}

export function Hero({ onOpenRegister }: HeroProps = {}) {
  const scrollToContent = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] sm:min-h-[96vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 pb-12 overflow-hidden"
    >
      {/* 
        CELVIA-STYLE HERO CARD CONTAINER
        Luminous volt-lime gradient fading smoothly to pure off-white with large rounded corners
      */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-6xl aspect-[4/3] sm:aspect-[16/10] md:min-h-[640px] rounded-[32px] sm:rounded-[48px] overflow-hidden border border-[#0d1321]/[0.08] shadow-[0_30px_90px_-20px_rgba(13,19,33,0.08)] flex flex-col items-center justify-between p-8 sm:p-14 select-none"
        style={{
          background: `linear-gradient(180deg, #dcf836 0%, #e9fc6d 22%, #f5fec2 46%, #ffffff 82%, #fafaf9 100%)`,
        }}
      >
        {/* Subtle Ambient Grain Texture Layer */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none mix-blend-multiply"
          style={{
            backgroundImage: `radial-gradient(#0d1321 0.75px, transparent 0.75px)`,
            backgroundSize: "20px 20px",
          }}
        />

        {/* Top Space / Edition Pill (inFaces & Celvia inspired) */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 flex items-center gap-3 text-xs sm:text-sm font-mono tracking-widest text-[#0d1321]/80 uppercase"
        >
          <span className="inline-block w-2 h-2 rounded-full bg-[#0d1321]" />
          <span>AIT PUNE // EST. 2020</span>
        </motion.div>

        {/* CENTERPIECE: CEAR LOGO + "CEAR" TYPOGRAPHY (EXACT CELVIA REPLICA) */}
        <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.92, filter: "blur(12px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="flex items-center justify-center gap-4 sm:gap-6 lg:gap-8 group"
          >
            {/* CEAR Geometric Monogram Emblem (Clean Vector Mark) */}
            <div className="relative w-14 h-14 sm:w-20 sm:h-20 lg:w-24 lg:h-24 shrink-0 transition-transform duration-500 ease-out group-hover:scale-105">
              <Image
                src="/cear-logo.svg"
                alt="CEAR Emblem"
                fill
                priority
                className="object-contain drop-shadow-[0_8px_16px_rgba(13,19,33,0.12)]"
              />
            </div>

            {/* Clean Bold Typography: "CEAR" with ™ Superscript */}
            <div className="flex items-start">
              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-[-0.04em] text-[#0d1321] font-display leading-none">
                CEAR
              </h1>
              <span className="text-xs sm:text-sm lg:text-base font-bold font-mono text-[#0d1321]/70 ml-1.5 sm:ml-2.5 mt-1 sm:mt-2 select-none">
                TM
              </span>
            </div>
          </motion.div>

          {/* Minimalist Narrative Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 0.35 }}
            className="mt-6 sm:mt-8 max-w-xl text-xs sm:text-base md:text-lg text-[#0d1321]/75 font-body font-medium leading-relaxed tracking-tight px-4"
          >
            Centre of Excellence for AI &amp; Autonomous Robotics.
            <span className="block text-[#0d1321]/50 text-xs sm:text-sm font-mono mt-1">
              Army Institute of Technology, Pune
            </span>
          </motion.p>
        </div>

        {/* BOTTOM: Minimalist Scroll Cue */}
        <motion.button
          onClick={scrollToContent}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative z-10 inline-flex items-center gap-2 text-xs font-mono tracking-wider text-[#0d1321]/70 hover:text-[#0d1321] transition-colors py-2 px-4 rounded-full hover:bg-white/40 cursor-pointer"
        >
          <span>Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-3.5 h-3.5 text-[#0d1321]" />
          </motion.div>
        </motion.button>
      </motion.div>
    </section>
  );
}

export default Hero;
