"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { ChevronDown, ArrowUpRight, Cpu, Radio, Sparkles, Shield } from "lucide-react";

interface HeroProps {
  onOpenRegister?: (trackId?: string) => void;
}

export function Hero({ onOpenRegister }: HeroProps = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Scroll-driven Parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yCard = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const yEmblem = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const yBadgeLeft = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const yBadgeRight = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const yBackgroundOrbs = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.85], [1, 0.2]);

  // Mouse-driven 3D Tilt & Specular Spotlight
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [spotlightPos, setSpotlightPos] = useState({ x: -400, y: -400 });
  const [isHovered, setIsHovered] = useState(false);

  const springConfig = { damping: 25, stiffness: 180, mass: 0.6 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPos = e.clientX - rect.left;
    const yPos = e.clientY - rect.top;

    setSpotlightPos({ x: xPos, y: yPos });
    mouseX.set(xPos / rect.width - 0.5);
    mouseY.set(yPos / rect.height - 0.5);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
    setSpotlightPos({ x: -400, y: -400 });
  };

  const scrollToContent = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[96vh] sm:min-h-[100vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-16 overflow-hidden"
    >
      {/* Parallax Floating Ambient Glow Orbs */}
      <motion.div
        style={{ y: yBackgroundOrbs }}
        className="absolute inset-0 pointer-events-none overflow-hidden z-0"
      >
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#ff6b35]/20 via-[#ff8c5a]/10 to-transparent blur-[100px] animate-pulse-subtle" />
        <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] rounded-full bg-gradient-to-bl from-[#240d2b]/10 via-[#3b1646]/05 to-transparent blur-[90px]" />
      </motion.div>

      {/* Floating Parallax Glassmorphic Telemetry Chips */}
      <motion.div
        style={{ y: yBadgeLeft }}
        className="hidden xl:flex absolute left-8 top-1/3 z-20 animate-float-slow"
      >
        <div className="px-4 py-3 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-[0_15px_35px_-10px_rgba(36,13,43,0.08)] flex items-center gap-3 font-mono text-xs text-[#240d2b]">
          <div className="w-8 h-8 rounded-xl bg-[#ff6b35]/15 flex items-center justify-center text-[#ff6b35]">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold tracking-tight">ROS2 &bull; EDGE AI</div>
            <div className="text-[10px] text-[#240d2b]/60">Lab 104 Robotics Wing</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        style={{ y: yBadgeRight }}
        className="hidden xl:flex absolute right-8 top-1/3 z-20 animate-float-reverse"
      >
        <div className="px-4 py-3 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-[0_15px_35px_-10px_rgba(36,13,43,0.08)] flex items-center gap-3 font-mono text-xs text-[#240d2b]">
          <div className="w-8 h-8 rounded-xl bg-[#240d2b]/10 flex items-center justify-center text-[#240d2b]">
            <Radio className="w-4 h-4 text-[#ff6b35]" />
          </div>
          <div>
            <div className="font-bold tracking-tight">WARTECH 2026</div>
            <div className="text-[10px] text-[#240d2b]/60">₹1,50,000+ Prize Pool</div>
          </div>
        </div>
      </motion.div>

      {/* MAIN HERO CARD CONTAINER WITH 3D TILT & PARALLAX */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          y: yCard,
          opacity: opacityFade,
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          background: `linear-gradient(180deg, rgba(255,107,53,0.92) 0%, rgba(255,140,90,0.85) 24%, rgba(254,216,197,0.7) 48%, rgba(255,255,255,0.85) 82%, rgba(246,243,238,0.9) 100%)`,
        }}
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-6xl aspect-[4/3] sm:aspect-[16/10] md:min-h-[640px] rounded-[36px] sm:rounded-[52px] overflow-hidden backdrop-blur-2xl border border-white/80 shadow-[0_35px_100px_-20px_rgba(36,13,43,0.14)] flex flex-col items-center justify-between p-8 sm:p-14 select-none group"
      >
        {/* Dynamic Cursor Spotlight Glare Sheen */}
        <div
          className="pointer-events-none absolute -inset-px rounded-[inherit] transition-opacity duration-300 z-10"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(550px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(255, 255, 255, 0.45), transparent 70%)`,
          }}
        />

        {/* Top Specular Inner Bevel Highlight */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent z-10" />

        {/* Ambient Subtle Geometric Blueprint Texture */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none mix-blend-multiply"
          style={{
            backgroundImage: `radial-gradient(#240d2b 0.75px, transparent 0.75px)`,
            backgroundSize: "22px 22px",
          }}
        />

        {/* Top Space / Edition Pill (Frosted Glass) */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-20 flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/35 backdrop-blur-xl border border-white/50 text-xs sm:text-sm font-mono tracking-widest text-[#240d2b]/85 uppercase shadow-xs"
        >
          <span className="inline-block w-2 h-2 rounded-full bg-[#240d2b] animate-ping" />
          <span>AIT PUNE // EST. 2020 // LAB 104</span>
        </motion.div>

        {/* CENTERPIECE: CEAR LOGO + "CEAR" TYPOGRAPHY WITH PARALLAX LIFT */}
        <motion.div
          style={{ y: yEmblem }}
          className="relative z-20 my-auto flex flex-col items-center justify-center text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, filter: "blur(12px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="flex items-center justify-center gap-4 sm:gap-6 lg:gap-8 group/emblem"
          >
            {/* CEAR Geometric Monogram Emblem with Glass Backing */}
            <div className="relative w-16 h-16 sm:w-22 sm:h-22 lg:w-28 lg:h-28 shrink-0 transition-transform duration-500 ease-out group-hover/emblem:scale-108 p-2 rounded-3xl bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_10px_25px_rgba(36,13,43,0.12)]">
              <div className="relative w-full h-full">
                <Image
                  src="/cear-logo.svg"
                  alt="CEAR Emblem"
                  fill
                  priority
                  className="object-contain drop-shadow-[0_6px_14px_rgba(36,13,43,0.18)]"
                />
              </div>
            </div>

            {/* Clean Bold Typography: "CEAR" with ™ Superscript */}
            <div className="flex items-start">
              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-[-0.04em] text-[#240d2b] font-display leading-none drop-shadow-xs">
                CEAR
              </h1>
              <span className="text-xs sm:text-sm lg:text-base font-bold font-mono text-[#240d2b]/70 ml-1.5 sm:ml-2.5 mt-1 sm:mt-2 select-none">
                TM
              </span>
            </div>
          </motion.div>

          {/* Minimalist Narrative Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 0.35 }}
            className="mt-6 sm:mt-8 max-w-xl text-xs sm:text-base md:text-lg text-[#240d2b]/85 font-body font-medium leading-relaxed tracking-tight px-4"
          >
            Centre of Excellence for AI &amp; Autonomous Robotics.
            <span className="block text-[#240d2b]/65 text-xs sm:text-sm font-mono mt-1">
              Army Institute of Technology, Pune
            </span>
          </motion.p>

          {/* Quick Action Buttons in Hero */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-3"
          >
            <button
              onClick={() => onOpenRegister?.()}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#240d2b] text-white hover:bg-[#3b1646] font-body text-xs sm:text-sm font-medium shadow-[0_4px_16px_rgba(36,13,43,0.25)] hover:shadow-[0_6px_20px_rgba(36,13,43,0.35)] transition-all cursor-pointer hover:scale-103 active:scale-98"
            >
              <span>Wartech &apos;26 Registration</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#ff6b35]" />
            </button>

            <button
              onClick={scrollToContent}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/70 hover:bg-white/90 backdrop-blur-md border border-white/90 text-[#240d2b] font-body text-xs sm:text-sm font-medium shadow-xs transition-all cursor-pointer hover:scale-103 active:scale-98"
            >
              <span>Explore Platforms</span>
            </button>
          </motion.div>
        </motion.div>

        {/* BOTTOM: Minimalist Scroll Cue */}
        <motion.button
          onClick={scrollToContent}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="relative z-20 inline-flex items-center gap-2 text-xs font-mono tracking-wider text-[#240d2b]/70 hover:text-[#240d2b] transition-colors py-2 px-4 rounded-full hover:bg-white/50 backdrop-blur-sm cursor-pointer"
        >
          <span>Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-3.5 h-3.5 text-[#240d2b]" />
          </motion.div>
        </motion.button>
      </motion.div>
    </section>
  );
}

export default Hero;
