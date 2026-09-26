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
      className={`relative group bg-white rounded-xl border border-slate-200/90 transition-all duration-300 hover:border-blue-400 hover:shadow-lg overflow-hidden ${className}`}
    >
      {/* Laser Perception Scanline */}
      {enableScan && (
        <motion.div
          animate={
            isHovered
              ? {
                  top: ["-10%", "110%"],
                  opacity: [0, 0.8, 0.8, 0],
                }
              : { top: "-10%", opacity: 0 }
          }
          transition={{
            duration: 1.1,
            ease: "easeInOut",
            repeat: isHovered ? Infinity : 0,
            repeatDelay: 0.6,
          }}
          className="pointer-events-none absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_10px_#38bdf8] z-20"
        />
      )}

      {/* High-tech Corner Brackets */}
      <div className="pointer-events-none absolute top-1.5 left-1.5 w-2 h-2 border-t-2 border-l-2 border-slate-300 group-hover:border-blue-500 transition-colors z-10" />
      <div className="pointer-events-none absolute top-1.5 right-1.5 w-2 h-2 border-t-2 border-r-2 border-slate-300 group-hover:border-blue-500 transition-colors z-10" />
      <div className="pointer-events-none absolute bottom-1.5 left-1.5 w-2 h-2 border-b-2 border-l-2 border-slate-300 group-hover:border-blue-500 transition-colors z-10" />
      <div className="pointer-events-none absolute bottom-1.5 right-1.5 w-2 h-2 border-b-2 border-r-2 border-slate-300 group-hover:border-blue-500 transition-colors z-10" />

      {/* Card Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default PerceptionCard;
