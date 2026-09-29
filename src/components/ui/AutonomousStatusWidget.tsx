"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Radio, Cpu, BatteryCharging, ShieldCheck, X, ChevronUp, ChevronDown, Activity } from "lucide-react";

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
            className="mb-2 w-72 bg-[#0c1322]/95 text-slate-100 border border-cyan-500/40 rounded-xl shadow-[0_15px_40px_rgba(0,0,0,0.9),0_0_20px_rgba(0,240,255,0.2)] p-4 space-y-3 backdrop-blur-2xl relative overflow-hidden"
          >
            <div className="cyber-bracket-top-left" />
            <div className="cyber-bracket-bottom-right" />

            {/* Header */}
            <div className="flex items-center justify-between pb-2 border-b border-cyan-500/20">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#00f0ff] animate-ping" />
                <span className="font-tech font-bold text-cyan-300 text-xs tracking-wider">
                  CEAR TELEMETRY BEACON
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-100 transition-colors p-0.5 cursor-pointer"
                aria-label="Close telemetry widget"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Subsystem rows */}
            <div className="space-y-2 text-[11px] font-mono">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <Radio className="w-3.5 h-3.5 text-cyan-400" />
                  <span>RF Mesh:</span>
                </span>
                <span className="font-bold text-slate-200">915 MHz (Ch 04)</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                  <span>ROS2 Nodes:</span>
                </span>
                <span className="font-bold text-emerald-400">14 Active // 0 Err</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <BatteryCharging className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Fleet Power:</span>
                </span>
                <span className="font-bold text-slate-200">4S LiPo 16.4V</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <Activity className="w-3.5 h-3.5 text-rose-500" />
                  <span>Wartech 2026:</span>
                </span>
                <span className="font-bold text-rose-400">Armed &amp; Ready</span>
              </div>
            </div>

            {/* Micro coordinate status */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
              <span className="font-bold">AIT LAB 104 • PUNE</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold">
                SYS: NOMINAL
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collapsed Pill Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0a101d]/90 border border-cyan-500/40 text-slate-200 shadow-[0_0_15px_rgba(0,240,255,0.25)] hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all font-tech font-bold text-xs cursor-pointer backdrop-blur-md"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_6px_#00ff9d]" />
        </span>

        <span className="tracking-tight text-cyan-300">
          FLEET ACTIVE (6)
        </span>

        {isOpen ? (
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        ) : (
          <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
        )}
      </button>
    </div>
  );
}

export default AutonomousStatusWidget;
