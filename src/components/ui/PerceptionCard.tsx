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
      className={`relative group bg-white rounded-[20px_24px_18px_22px_/_24px_18px_22px_20px] border-[2.5px] border-ink shadow-[4px_5px_0_#14140f] hover:shadow-[6px_7px_0_#14140f] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-150 overflow-hidden ${className}`}
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
          className="pointer-events-none absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-alarm to-transparent z-20"
        />
      )}

      {/* Tactile Corner Registration Ticks */}
      <div className="pointer-events-none absolute top-2 left-2 w-2 h-2 border-t-2 border-l-2 border-ink/40 group-hover:border-ink transition-colors z-10" />
      <div className="pointer-events-none absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 border-ink/40 group-hover:border-ink transition-colors z-10" />
      <div className="pointer-events-none absolute bottom-2 left-2 w-2 h-2 border-b-2 border-l-2 border-ink/40 group-hover:border-ink transition-colors z-10" />
      <div className="pointer-events-none absolute bottom-2 right-2 w-2 h-2 border-b-2 border-r-2 border-ink/40 group-hover:border-ink transition-colors z-10" />

      {/* Card Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default PerceptionCard;
