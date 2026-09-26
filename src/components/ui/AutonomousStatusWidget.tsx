"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Radio, Cpu, BatteryCharging, ShieldCheck, X, ChevronUp, ChevronDown } from "lucide-react";

export function AutonomousStatusWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-5 left-5 z-40 font-mono text-xs select-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-2 w-72 bg-white text-ink border-[2.5px] border-ink rounded-[20px_24px_18px_22px_/_24px_18px_22px_20px] shadow-[5px_6px_0_#14140f] p-4 space-y-3 -rotate-0.5"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-2 border-b-2 border-ink/10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-alarm border border-ink animate-ping" />
                <span className="font-tech font-extrabold text-ink text-xs tracking-wider">
                  CEAR LAB BEACON
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-ink/60 hover:text-ink transition-colors p-0.5 cursor-pointer"
                aria-label="Close telemetry widget"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Subsystem rows */}
            <div className="space-y-2 text-[11px] font-mono">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-ink/70">
                  <Radio className="w-3.5 h-3.5 text-ink" />
                  <span>RF Mesh Network:</span>
                </span>
                <span className="font-bold text-ink">915 MHz (Ch 04)</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-ink/70">
                  <Cpu className="w-3.5 h-3.5 text-ink" />
                  <span>ROS2 Nodes:</span>
                </span>
                <span className="font-bold text-ink">14 Active / 0 Error</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-ink/70">
                  <BatteryCharging className="w-3.5 h-3.5 text-ink" />
                  <span>Fleet Power:</span>
                </span>
                <span className="font-bold text-ink">4S LiPo 16.4V</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-ink/70">
                  <ShieldCheck className="w-3.5 h-3.5 text-alarm" />
                  <span>Wartech 2026:</span>
                </span>
                <span className="font-bold text-alarm">Cadre Ready</span>
              </div>
            </div>

            {/* Micro coordinate status */}
            <div className="pt-2 border-t-2 border-ink/10 flex items-center justify-between text-[10px] text-ink/60">
              <span className="font-bold">AIT LAB 104 • PUNE</span>
              <span className="paper-badge bg-ink text-white text-[9px] py-0.5 px-2">ALL OK</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collapsed Pill Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border-2 border-ink text-ink shadow-[2.5px_2.5px_0_#14140f] hover:shadow-[1px_1px_0_#14140f] hover:translate-x-[1.5px] hover:translate-y-[1.5px] transition-all font-tech font-bold text-xs -rotate-1 cursor-pointer hover-wiggle"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-alarm opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-alarm" />
        </span>

        <span className="tracking-tight">
          Fleet Active (6)
        </span>

        {isOpen ? (
          <ChevronDown className="w-3.5 h-3.5 text-ink/70" />
        ) : (
          <ChevronUp className="w-3.5 h-3.5 text-ink/70" />
        )}
      </button>
    </div>
  );
}

export default AutonomousStatusWidget;
