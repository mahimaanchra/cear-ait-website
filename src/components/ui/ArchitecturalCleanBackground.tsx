"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function ArchitecturalCleanBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#f6f3ee]">
      {/* 1. Very subtle soft top ambient radiant glow (Radiant Tangerine) */}
      <div className="absolute top-0 inset-x-0 h-[45vh] bg-gradient-to-b from-[#ff6b35]/15 via-[#ffa278]/06 to-transparent opacity-75 pointer-events-none" />

      {/* 2. Architectural Blueprint Vector Lines (Royal Plum) */}
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

          {/* Subtle Focal Center Ring */}
          <motion.circle
            cx="50%"
            cy="50%"
            r="320"
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
            r="180"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="2 6"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.8, ease: "easeInOut", delay: 0.4 }}
          />
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
