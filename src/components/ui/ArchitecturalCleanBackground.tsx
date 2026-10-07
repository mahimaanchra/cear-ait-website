"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function ArchitecturalCleanBackground() {
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();

  // Subtle scroll parallax transforms
  const yParallaxGrid = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const yParallaxCircles = useTransform(scrollYProgress, [0, 1], [0, 80]);

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

      {/* 2. Architectural Blueprint Vector Lines (Royal Plum) with continuous rotation & scroll parallax */}
      {mounted && (
        <svg
          className="absolute inset-0 w-full h-full text-[#240d2b]/[0.05]"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle Horizontal Datum Line */}
          <motion.line
            x1="0"
            y1="500"
            x2="1000"
            y2="500"
            stroke="currentColor"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
          />

          {/* Subtle Vertical Center Line */}
          <motion.line
            x1="500"
            y1="0"
            x2="500"
            y2="1000"
            stroke="currentColor"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
          />

          {/* Diagonal Architectural Guide Line */}
          <motion.line
            x1="0"
            y1="0"
            x2="1000"
            y2="1000"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="4 8"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut", delay: 0.2 }}
          />

          {/* PRIMARY CENTER ROTATING RADAR ASSEMBLY */}
          <motion.g style={{ y: yParallaxCircles }}>
            <g transform="translate(500, 500)">
              {/* Outer Compass Ring - Rotating Clockwise */}
              <motion.g
                animate={{ rotate: 360 }}
                transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
              >
                <circle
                  r="360"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="8 12"
                />
                <circle
                  r="330"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.8"
                />
                {/* Precision Cardinal & Ordinal Degree Ticks */}
                {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                  <line
                    key={deg}
                    x1="0"
                    y1="-360"
                    x2="0"
                    y2="-344"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    transform={`rotate(${deg})`}
                  />
                ))}
              </motion.g>

              {/* Middle Segmented Ring - Rotating Counter-Clockwise */}
              <motion.g
                animate={{ rotate: -360 }}
                transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
              >
                <circle
                  r="210"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeDasharray="16 8 3 8"
                />
                <circle
                  r="175"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.8"
                  strokeDasharray="2 6"
                />
                {/* Orbiting Telemetry Indicator Node */}
                <circle
                  cx="0"
                  cy="-210"
                  r="3"
                  fill="#ff6b35"
                  opacity="0.5"
                />
              </motion.g>

              {/* Inner Core Reticle - Fast Clockwise Orbit */}
              <motion.g
                animate={{ rotate: 360 }}
                transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
              >
                <circle
                  r="85"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="4 6"
                />
                <circle
                  r="42"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.8"
                />
                {/* Inner Orbiting Telemetry Dot */}
                <circle
                  cx="0"
                  cy="-85"
                  r="2"
                  fill="#ff6b35"
                  opacity="0.65"
                />
              </motion.g>

              {/* Static Center Crosshairs */}
              <line x1="-12" y1="0" x2="12" y2="0" stroke="currentColor" strokeWidth="1" />
              <line x1="0" y1="-12" x2="0" y2="12" stroke="currentColor" strokeWidth="1" />
              <circle r="3" fill="none" stroke="currentColor" strokeWidth="1" />
            </g>
          </motion.g>

          {/* SECONDARY ROTATING RADAR (TOP RIGHT OFF-AXIS) */}
          <g transform="translate(860, 160)" className="opacity-60 hidden md:block">
            <motion.g
              animate={{ rotate: -360 }}
              transition={{ duration: 95, repeat: Infinity, ease: "linear" }}
            >
              <circle
                r="130"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="4 8"
              />
              <circle
                r="70"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.8"
                strokeDasharray="2 5"
              />
              <line x1="-15" y1="0" x2="15" y2="0" stroke="currentColor" strokeWidth="1" />
              <line x1="0" y1="-15" x2="0" y2="15" stroke="currentColor" strokeWidth="1" />
            </motion.g>
          </g>

          {/* TERTIARY ROTATING RADAR (BOTTOM LEFT OFF-AXIS) */}
          <g transform="translate(140, 840)" className="opacity-60 hidden md:block">
            <motion.g
              animate={{ rotate: 360 }}
              transition={{ duration: 110, repeat: Infinity, ease: "linear" }}
            >
              <circle
                r="150"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="6 10"
              />
              <circle
                r="80"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.8"
              />
              <circle
                cx="0"
                cy="-150"
                r="2.5"
                fill="#ff6b35"
                opacity="0.4"
              />
            </motion.g>
          </g>
        </svg>
      )}

      {/* 3. Subtle micro-grain texture with gentle continuous drift */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none animate-pattern-drift"
        style={{
          backgroundImage: `radial-gradient(#240d2b 0.85px, transparent 0.85px)`,
          backgroundSize: "28px 28px",
        }}
      />
    </div>
  );
}

export default ArchitecturalCleanBackground;
