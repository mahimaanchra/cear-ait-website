"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Radio, Cpu, BatteryCharging, X, ChevronUp, ChevronDown, Activity, Sparkles, ShieldCheck } from "lucide-react";

export function AutonomousStatusWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-5 left-5 z-40 font-mono text-xs select-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="mb-3 w-80 bg-white/80 backdrop-blur-2xl text-[#240d2b] border border-white/80 rounded-3xl shadow-[0_20px_50px_-10px_rgba(36,13,43,0.18)] p-5 space-y-4 relative overflow-hidden"
          >
            {/* Specular Top Bevel Highlight */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />

            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#240d2b]/[0.08]">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff6b35] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#ff6b35]" />
                </span>
                <span className="font-display font-bold text-xs tracking-tight text-[#240d2b]">
                  Telemetry &amp; Lab Status
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#240d2b]/50 hover:text-[#240d2b] transition-colors p-1 rounded-full hover:bg-black/5 cursor-pointer"
                aria-label="Close widget"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Subsystem telemetry rows */}
            <div className="space-y-2.5 text-xs font-mono">
              <div className="flex items-center justify-between text-[#240d2b]/75 p-2 rounded-xl bg-white/60 border border-white/60">
                <span className="flex items-center gap-2">
                  <Radio className="w-3.5 h-3.5 text-[#ff6b35]" />
                  <span>Telemetry RF:</span>
                </span>
                <span className="font-bold text-[#240d2b]">915 MHz (Ch 04)</span>
              </div>

              <div className="flex items-center justify-between text-[#240d2b]/75 p-2 rounded-xl bg-white/60 border border-white/60">
                <span className="flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5 text-[#ff6b35]" />
                  <span>ROS2 Nodes:</span>
                </span>
                <span className="font-bold text-[#240d2b]">14 Active // 0 Err</span>
              </div>

              <div className="flex items-center justify-between text-[#240d2b]/75 p-2 rounded-xl bg-white/60 border border-white/60">
                <span className="flex items-center gap-2">
                  <BatteryCharging className="w-3.5 h-3.5 text-[#ff6b35]" />
                  <span>Fleet Power:</span>
                </span>
                <span className="font-bold text-[#240d2b]">4S LiPo 16.4V // Nominal</span>
              </div>

              <div className="flex items-center justify-between text-[#240d2b]/75 p-2 rounded-xl bg-white/60 border border-white/60">
                <span className="flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-[#ff6b35]" />
                  <span>Wartech 2026:</span>
                </span>
                <span className="font-bold text-[#ff6b35]">Armed &amp; Ready</span>
              </div>
            </div>

            {/* Coordinates status */}
            <div className="pt-2 border-t border-[#240d2b]/[0.08] flex items-center justify-between text-[10px] text-[#240d2b]/60">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#ff6b35]" />
                <span>AIT LAB 104 • PUNE</span>
              </span>
              <span className="font-bold text-[#ff6b35] bg-[#ff6b35]/10 px-2 py-0.5 rounded-full">
                ONLINE
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collapsed Glass Dock Pill Button */}
      <motion.button
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/80 backdrop-blur-xl text-[#240d2b] border border-white/90 shadow-[0_8px_24px_rgba(36,13,43,0.1)] hover:shadow-[0_12px_30px_rgba(255,107,53,0.2)] hover:border-[#ff6b35]/40 transition-all text-xs font-mono font-medium cursor-pointer"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff6b35] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff6b35]" />
        </span>
        <span className="tracking-tight">Telemetry HUD (Lab 104)</span>
        {isOpen ? (
          <ChevronDown className="w-3.5 h-3.5 text-[#240d2b]/60" />
        ) : (
          <ChevronUp className="w-3.5 h-3.5 text-[#240d2b]/60" />
        )}
      </motion.button>
    </div>
  );
}

export default AutonomousStatusWidget;
