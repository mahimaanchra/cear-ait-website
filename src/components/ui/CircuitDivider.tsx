"use client";

import React from "react";
import { motion } from "framer-motion";

interface CircuitDividerProps {
  label?: string;
  className?: string;
}

export function CircuitDivider({
  label = "CEAR // SYS.NODE.LINK",
  className = "",
}: CircuitDividerProps) {
  return (
    <div className={`relative w-full py-4 flex items-center justify-center overflow-hidden ${className}`}>
      {/* Background Line */}
      <div className="absolute inset-x-0 h-px bg-slate-200" />

      {/* Traveling Data Pulse */}
      <motion.div
        animate={{
          left: ["-10%", "110%"],
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 3.5,
          ease: "easeInOut",
          repeatDelay: 1.5,
        }}
        className="absolute h-[2px] w-28 bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-[0_0_8px_#3b82f6]"
      />

      {/* Center Technical Node Chip */}
      {label && (
        <div className="relative z-10 px-3 py-0.5 rounded-full bg-slate-50 border border-slate-200/90 text-[10px] font-mono font-bold text-slate-500 tracking-wider flex items-center gap-1.5 shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          <span>{label}</span>
        </div>
      )}
    </div>
  );
}

export default CircuitDivider;
