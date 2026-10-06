"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function ArchitecturalCleanBackground() {
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();

  // Gentle parallax transforms
  const yParallaxGrid = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const yParallaxCircles = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const rotateRing = useTransform(scrollYProgress, [0, 1], [0, 30]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#f6f3ee]">
      {/* 1. Ambient radiant glow with subtle scroll parallax */}
      <motion.div
        style={{ y: yParallaxGrid }}
        className="absolute top-0 inset-x-0 h-[50vh] bg-gradient-to-b from-[#ff6b35]/14 via-[#ffa278]/05 to-transparent opacity-80 pointer-events-none"
      />

      {/* 2. Architectural Blueprint Vector Lines (Royal Plum) with scroll parallax */}
      {mounted && (
        <svg
          className="absolute inset-0 w-full h-full text-[#240d2b]/[0.05]"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle 50% Horizontal Datum Line */}
          <motion.line
            x1="0"
            y1="50%"
            x2="100%"
            y2="50%"
            stroke="currentColor"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
          />

          {/* Subtle 50% Vertical Center Line */}
          <motion.line
            x1="50%"
            y1="0"
            x2="50%"
            y2="100%"
            stroke="currentColor"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
          />

          {/* Diagonal Architectural Line */}
          <motion.line
            x1="0"
            y1="0"
            x2="100%"
            y2="100%"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="4 8"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut", delay: 0.2 }}
          />

          {/* Parallax Focal Center Rings */}
          <motion.g style={{ y: yParallaxCircles, rotate: rotateRing, transformOrigin: "50% 50%" }}>
            <motion.circle
              cx="50%"
              cy="50%"
              r="340"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut", delay: 0.3 }}
            />
            <motion.circle
              cx="50%"
              cy="50%"
              r="190"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="3 7"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.8, ease: "easeInOut", delay: 0.4 }}
            />
            <motion.circle
              cx="50%"
              cy="50%"
              r="80"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="1 5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
            />
          </motion.g>
        </svg>
      )}

      {/* 3. Subtle micro-grain texture */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#240d2b 0.75px, transparent 0.75px)`,
          backgroundSize: "24px 24px",
        }}
      />
    </div>
  );
}

export default ArchitecturalCleanBackground;
