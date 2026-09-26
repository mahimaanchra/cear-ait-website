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
    <div className={`relative w-full py-4 flex items-center justify-center overflow-hidden ${className}`}>
      {/* Background Ink Line */}
      <div className="absolute inset-x-0 h-[2px] bg-ink/20" />

      {/* Center Tactile Node Stamp */}
      {label ? (
        <div className="relative z-10 px-3.5 py-0.5 rounded-full bg-white border-2 border-ink text-[10px] font-mono font-black text-ink tracking-wider flex items-center gap-1.5 shadow-[2px_2px_0_#14140f] -rotate-1 hover-wiggle">
          <span className="w-2 h-2 rounded-full bg-alarm animate-ping" />
          <span>{label}</span>
        </div>
      ) : (
        <div className="relative z-10 w-2.5 h-2.5 rotate-45 bg-ink border-2 border-ink shadow-[1.5px_1.5px_0_#14140f] animate-pulse" />
      )}
    </div>
  );
}

export default CircuitDivider;
