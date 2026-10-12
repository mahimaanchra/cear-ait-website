"use client";

import React from "react";
import { motion } from "framer-motion";

interface CircuitDividerProps {
  label?: string;
  className?: string;
}

export function CircuitDivider({
  label,
  className = "",
}: CircuitDividerProps) {
  return (
    <div
      className={`relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-center overflow-hidden select-none ${className}`}
    >
      {/* Background Architectural Vector Datum Line */}
      <div className="absolute inset-x-8 h-px bg-gradient-to-r from-transparent via-[#240d2b]/15 to-transparent" />

      {/* Dynamic Animated Laser Pulse Beam */}
      <motion.div
        animate={{
          x: ["-100%", "200%"],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          repeatDelay: 1.5,
        }}
        className="absolute top-1/2 -translate-y-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-[#ff6b35] to-transparent blur-[1px] pointer-events-none"
      />

      {/* Center Tactical Node Stamp */}
      {label ? (
        <div className="relative z-10 px-4 py-1 rounded-full bg-white/90 backdrop-blur-xl border border-white/90 text-[10px] font-mono tracking-widest uppercase text-[#240d2b]/70 flex items-center gap-2 shadow-[0_4px_16px_rgba(36,13,43,0.04)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff6b35] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff6b35]" />
          </span>
          <span className="font-semibold text-[#240d2b]">{label}</span>
        </div>
      ) : (
        <div className="relative z-10 w-2.5 h-2.5 rotate-45 bg-[#240d2b] border border-white/80 shadow-xs" />
      )}
    </div>
  );
}

export default CircuitDivider;
