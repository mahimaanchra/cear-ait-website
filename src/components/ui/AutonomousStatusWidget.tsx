"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Radio, Cpu, BatteryCharging, X, ChevronUp, ChevronDown, Activity } from "lucide-react";

export function AutonomousStatusWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-40 font-mono text-xs select-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="mb-3 w-72 bg-white text-[#240d2b] border border-[#240d2b]/[0.1] rounded-2xl shadow-[0_15px_40px_-10px_rgba(36,13,43,0.12)] p-5 space-y-4 backdrop-blur-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#240d2b]/[0.06]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#ff6b35]" />
                <span className="font-display font-bold text-xs tracking-tight text-[#240d2b]">
                  Telemetry Diagnostics
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#240d2b]/50 hover:text-[#240d2b] transition-colors p-1 cursor-pointer"
                aria-label="Close widget"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Subsystem rows */}
            <div className="space-y-2.5 text-xs font-mono">
              <div className="flex items-center justify-between text-[#240d2b]/70">
                <span className="flex items-center gap-2">
                  <Radio className="w-3.5 h-3.5 text-[#ff6b35]" />
                  <span>Telemetry RF:</span>
                </span>
                <span className="font-bold text-[#240d2b]">915 MHz (Ch 04)</span>
              </div>

              <div className="flex items-center justify-between text-[#240d2b]/70">
                <span className="flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5 text-[#ff6b35]" />
                  <span>ROS2 Nodes:</span>
                </span>
                <span className="font-bold text-[#240d2b]">14 Active // 0 Err</span>
              </div>

              <div className="flex items-center justify-between text-[#240d2b]/70">
                <span className="flex items-center gap-2">
                  <BatteryCharging className="w-3.5 h-3.5 text-[#ff6b35]" />
                  <span>Battery Link:</span>
                </span>
                <span className="font-bold text-[#240d2b]">4S LiPo 16.4V</span>
              </div>

              <div className="flex items-center justify-between text-[#240d2b]/70">
                <span className="flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-[#ff6b35]" />
                  <span>Wartech 2026:</span>
                </span>
                <span className="font-bold text-[#ff6b35]">Armed &amp; Ready</span>
              </div>
            </div>

            {/* Micro coordinate status */}
            <div className="pt-3 border-t border-[#240d2b]/[0.06] flex items-center justify-between text-[10px] text-[#240d2b]/50">
              <span>AIT LAB 104 • PUNE</span>
              <span className="font-bold text-[#ff6b35]">ONLINE</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collapsed Pill Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-white text-[#240d2b] border border-[#240d2b]/[0.1] shadow-md hover:shadow-lg hover:border-[#ff6b35]/30 transition-all text-xs font-mono font-medium cursor-pointer"
      >
        <span className="w-2 h-2 rounded-full bg-[#ff6b35]" />
        <span>Fleet Active (6)</span>
        {isOpen ? <ChevronDown className="w-3 h-3 text-[#240d2b]/60" /> : <ChevronUp className="w-3 h-3 text-[#240d2b]/60" />}
      </button>
    </div>
  );
}

export default AutonomousStatusWidget;
