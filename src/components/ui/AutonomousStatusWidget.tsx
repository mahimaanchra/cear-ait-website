"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, ChevronUp, ChevronDown, Radio, Cpu, BatteryCharging, ShieldCheck, X } from "lucide-react";

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
            className="mb-2 w-72 bg-slate-900/95 backdrop-blur-md text-white border border-slate-700/80 rounded-xl shadow-2xl p-3.5 space-y-3"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-bold text-slate-100 text-[11px] tracking-wider">
                  CEAR TELEMETRY LINK
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition-colors p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Subsystem rows */}
            <div className="space-y-2 text-[11px]">
              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <Radio className="w-3 h-3 text-cyan-400" />
                  <span>RF Mesh Network:</span>
                </span>
                <span className="font-bold text-cyan-300">915 MHz (Ch 04)</span>
              </div>

              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <Cpu className="w-3 h-3 text-emerald-400" />
                  <span>ROS2 Nodes:</span>
                </span>
                <span className="font-bold text-emerald-300">14 Active / 0 Error</span>
              </div>

              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <BatteryCharging className="w-3 h-3 text-amber-400" />
                  <span>Fleet Power:</span>
                </span>
                <span className="font-bold text-amber-300">4S LiPo 16.4V</span>
              </div>

              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <ShieldCheck className="w-3 h-3 text-blue-400" />
                  <span>Wartech 2026:</span>
                </span>
                <span className="font-bold text-blue-400">Cadre Ready</span>
              </div>
            </div>

            {/* Micro coordinate status */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
              <span>AIT LAB 104 • PUNE</span>
              <span className="text-emerald-400 font-bold">ALL OK</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collapsed Pill Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm border border-slate-300 text-slate-800 shadow-md hover:border-blue-400 hover:shadow-lg transition-all group"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>

        <span className="text-[11px] font-bold tracking-tight text-slate-700 group-hover:text-blue-600 transition-colors">
          ROBOTICS FLEET: 6 ACTIVE
        </span>

        {isOpen ? (
          <ChevronDown className="w-3 h-3 text-slate-400" />
        ) : (
          <ChevronUp className="w-3 h-3 text-slate-400 group-hover:text-blue-500 transition-colors" />
        )}
      </motion.button>
    </div>
  );
}

export default AutonomousStatusWidget;
