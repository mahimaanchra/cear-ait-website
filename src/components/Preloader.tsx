"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Terminal, Radio } from "lucide-react";

interface PreloaderProps {
  duration?: number;
  onComplete?: () => void;
}

const BOOT_LOGS = [
  "INITIALIZING CEAR KERNEL v4.12...",
  "CONNECTING TO AIT DEFENSE RF MESH...",
  "CALIBRATING 3D LIDAR POINT CLOUD...",
  "SYNCING ROS2 KINEMATIC TOPICS...",
  "WARTECH 2026 ARENAS: ARMED & NOMINAL...",
];

export function Preloader({ duration = 1400, onComplete }: PreloaderProps) {
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);

  useEffect(() => {
    setMounted(true);

    document.body.classList.add("overflow-hidden");
    document.documentElement.classList.add("overflow-hidden");
    const originalBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const startTime = performance.now();
    let animationFrameId: number;

    const updateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const rawProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(rawProgress);

      const nextLog = Math.min(
        Math.floor((rawProgress / 100) * BOOT_LOGS.length),
        BOOT_LOGS.length - 1
      );
      setLogIndex(nextLog);

      if (elapsed < duration) {
        animationFrameId = requestAnimationFrame(updateProgress);
      } else {
        setProgress(100);
        setTimeout(() => {
          setIsLoading(false);
        }, 150);
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.body.classList.remove("overflow-hidden");
      document.documentElement.classList.remove("overflow-hidden");
      document.body.style.overflow = originalBodyOverflow;
    };
  }, [duration]);

  const handleAnimationComplete = () => {
    document.body.classList.remove("overflow-hidden");
    document.documentElement.classList.remove("overflow-hidden");
    document.body.style.overflow = "";
    if (onComplete) {
      onComplete();
    }
  };

  if (!mounted) {
    return (
      <div
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#060911] overflow-hidden"
        role="status"
        aria-label="Loading"
      />
    );
  }

  return (
    <AnimatePresence onExitComplete={handleAnimationComplete}>
      {isLoading && (
        <motion.div
          key="cear-preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.35, ease: "easeInOut" },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#060911] select-none overflow-hidden"
          role="status"
          aria-live="polite"
          aria-label="Loading"
        >
          {/* Subtle Cyber Grid Background in Preloader */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(56,189,248,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

          {/* Central Holographic Radar Boot Interface */}
          <div className="relative z-10 flex flex-col items-center justify-center max-w-sm w-full px-6 space-y-6">
            {/* Spinning LiDAR / Radar Target Ring */}
            <div className="relative w-24 h-24 flex items-center justify-center">
              {/* Outer Pulsing Ring */}
              <div className="absolute inset-0 rounded-full border border-cyan-500/30 animate-ping opacity-30" />
              {/* Spinning Scanner Sweep Ring */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-400/50 animate-radar" />
              {/* Inner Circle */}
              <div className="w-16 h-16 rounded-full border border-cyan-400/60 bg-[#0a101d] flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.3)]">
                <Cpu className="w-7 h-7 text-cyan-400 animate-pulse" />
              </div>
            </div>

            {/* CEAR Telemetry Title */}
            <div className="text-center space-y-1">
              <h2 className="text-xl font-black font-tech tracking-widest text-slate-100 flex items-center justify-center gap-2">
                <span>CEAR</span>
                <span className="text-cyan-400 text-xs font-mono font-bold px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30">
                  BOOT_SYS
                </span>
              </h2>
              <p className="text-[11px] font-mono text-slate-400 tracking-wider">
                CENTRE OF EXCELLENCE FOR AI &amp; ROBOTICS
              </p>
            </div>

            {/* Progress Bar & Telemetry Counter */}
            <div className="w-full space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-cyan-400 flex items-center gap-1.5">
                  <Terminal className="w-3 h-3" />
                  <span>{BOOT_LOGS[logIndex]}</span>
                </span>
                <span className="text-slate-100 font-bold font-mono">
                  {Math.round(progress)}%
                </span>
              </div>

              {/* High-Tech Progress Track */}
              <div className="h-1.5 w-full bg-slate-900 border border-cyan-500/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-400 shadow-[0_0_12px_#00f0ff] transition-all duration-75"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Bottom Status Coordinates */}
            <div className="text-[10px] font-mono text-slate-500 flex items-center gap-3">
              <span>LAT: 18.60° N</span>
              <span>•</span>
              <span>LON: 73.87° E</span>
              <span>•</span>
              <span className="text-emerald-400">AIT LAB 104</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Preloader;
