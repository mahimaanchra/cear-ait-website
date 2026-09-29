"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface PerceptionCardProps {
  children: React.ReactNode;
  className?: string;
  enableScan?: boolean;
}

export function PerceptionCard({
  children,
  className = "",
  enableScan = true,
}: PerceptionCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative group bg-[#0c1222]/85 rounded-xl border border-cyan-500/20 hover:border-cyan-400/50 shadow-[0_8px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_0_22px_rgba(0,240,255,0.2)] hover:-translate-y-1 transition-all duration-200 overflow-hidden backdrop-blur-xl ${className}`}
    >
      {/* Laser Perception Scanline */}
      {enableScan && (
        <motion.div
          animate={
            isHovered
              ? {
                  top: ["-10%", "110%"],
                  opacity: [0, 0.9, 0.9, 0],
                }
              : { top: "-10%", opacity: 0 }
          }
          transition={{
            duration: 1.0,
            ease: "easeInOut",
            repeat: isHovered ? Infinity : 0,
            repeatDelay: 0.5,
          }}
          className="pointer-events-none absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent z-20 shadow-[0_0_8px_#00f0ff]"
        />
      )}

      {/* Cyber Corner HUD Ticks */}
      <div className="pointer-events-none absolute top-2 left-2 w-2 h-2 border-t-2 border-l-2 border-cyan-500/40 group-hover:border-cyan-400 transition-colors z-10" />
      <div className="pointer-events-none absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 border-cyan-500/40 group-hover:border-cyan-400 transition-colors z-10" />
      <div className="pointer-events-none absolute bottom-2 left-2 w-2 h-2 border-b-2 border-l-2 border-cyan-500/40 group-hover:border-cyan-400 transition-colors z-10" />
      <div className="pointer-events-none absolute bottom-2 right-2 w-2 h-2 border-b-2 border-r-2 border-cyan-500/40 group-hover:border-cyan-400 transition-colors z-10" />

      {/* Card Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default PerceptionCard;
