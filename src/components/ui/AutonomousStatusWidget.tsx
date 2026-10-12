"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Radio,
  Cpu,
  BatteryCharging,
  X,
  ChevronUp,
  ChevronDown,
  Activity,
  Sparkles,
  ShieldCheck,
  Copy,
  Check,
  Zap,
  Terminal,
} from "lucide-react";

type SubsystemTab = "overview" | "nodes" | "rf" | "power";

export function AutonomousStatusWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<SubsystemTab>("overview");
  const [fps, setFps] = useState(60);
  const [pingMs, setPingMs] = useState(19);
  const [copiedLog, setCopiedLog] = useState(false);

  // Dynamic FPS & Ping Jitter Simulation
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animId: number;

    const measureFps = (now: number) => {
      frameCount++;
      if (now - lastTime >= 1000) {
        setFps(Math.min(60, Math.max(54, frameCount)));
        frameCount = 0;
        lastTime = now;
      }
      animId = requestAnimationFrame(measureFps);
    };

    animId = requestAnimationFrame(measureFps);

    const pingInterval = setInterval(() => {
      setPingMs(Math.floor(18 + Math.random() * 6));
    }, 3000);

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(pingInterval);
    };
  }, []);

  const handleCopyTelemetry = () => {
    const report = `[CEAR LAB 104 AUTONOMOUS TELEMETRY REPORT]
Timestamp: ${new Date().toISOString()}
Node Status: 14 Active // 0 Errors // ROS2 Humble
RF Uplink: 915 MHz (Ch 04) // RSSI: -68 dBm // Packet Loss: 0.0%
Fleet Battery: 4S LiPo 16.4V // Draw: 2.8A Nominal
Perception: Intel RealSense D435i @ 60 FPS // YOLOv8 TensorRT Latency: 12.8ms
Link Latency: ${pingMs}ms to Ground Station
Facility: Army Institute of Technology, Pune (Lab 104 Robotics Wing)`;

    navigator.clipboard?.writeText(report);
    setCopiedLog(true);
    setTimeout(() => setCopiedLog(false), 2400);
  };

  return (
    <div className="fixed bottom-5 left-5 z-40 font-mono text-xs select-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="mb-3 w-84 sm:w-92 bg-white/85 backdrop-blur-2xl text-[#240d2b] border border-white/90 rounded-3xl shadow-[0_20px_50px_-10px_rgba(36,13,43,0.18)] p-5 space-y-4 relative overflow-hidden"
          >
            {/* Specular Top Bevel Highlight */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />

            {/* Header with Live Ping Indicator */}
            <div className="flex items-center justify-between pb-3 border-b border-[#240d2b]/[0.08]">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff6b35] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#ff6b35]" />
                </span>
                <div>
                  <span className="font-display font-bold text-xs tracking-tight text-[#240d2b] block">
                    Telemetry &amp; Lab HUD
                  </span>
                  <span className="text-[10px] text-[#240d2b]/50">
                    AIT Lab 104 &bull; {pingMs}ms Ping
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleCopyTelemetry}
                  className="p-1.5 rounded-lg text-[#240d2b]/60 hover:text-[#240d2b] hover:bg-black/5 transition-colors cursor-pointer"
                  title="Copy Telemetry Log"
                >
                  {copiedLog ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-[#240d2b]/50 hover:text-[#240d2b] transition-colors p-1 rounded-full hover:bg-black/5 cursor-pointer"
                  aria-label="Close widget"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Subsystem Tabs */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-black/[0.04]">
              {[
                { id: "overview", label: "Overview" },
                { id: "nodes", label: "ROS2" },
                { id: "rf", label: "RF Link" },
                { id: "power", label: "Power" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as SubsystemTab)}
                  className={`flex-1 py-1 rounded-lg text-[10px] font-mono transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-white text-[#240d2b] font-bold shadow-xs"
                      : "text-[#240d2b]/60 hover:text-[#240d2b]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Subsystem Telemetry Content */}
            <div className="space-y-2 text-xs font-mono">
              {activeTab === "overview" && (
                <>
                  <div className="flex items-center justify-between text-[#240d2b]/75 p-2 rounded-xl bg-white/70 border border-white/80 shadow-xs">
                    <span className="flex items-center gap-2">
                      <Radio className="w-3.5 h-3.5 text-[#ff6b35]" />
                      <span>Telemetry RF:</span>
                    </span>
                    <span className="font-bold text-[#240d2b]">915 MHz (Ch 04)</span>
                  </div>

                  <div className="flex items-center justify-between text-[#240d2b]/75 p-2 rounded-xl bg-white/70 border border-white/80 shadow-xs">
                    <span className="flex items-center gap-2">
                      <Cpu className="w-3.5 h-3.5 text-[#ff6b35]" />
                      <span>ROS2 Daemon:</span>
                    </span>
                    <span className="font-bold text-[#240d2b]">14 Nodes // 0 Err</span>
                  </div>

                  <div className="flex items-center justify-between text-[#240d2b]/75 p-2 rounded-xl bg-white/70 border border-white/80 shadow-xs">
                    <span className="flex items-center gap-2">
                      <BatteryCharging className="w-3.5 h-3.5 text-[#ff6b35]" />
                      <span>Fleet Battery:</span>
                    </span>
                    <span className="font-bold text-[#240d2b]">4S LiPo 16.4V</span>
                  </div>

                  <div className="flex items-center justify-between text-[#240d2b]/75 p-2 rounded-xl bg-white/70 border border-white/80 shadow-xs">
                    <span className="flex items-center gap-2">
                      <Activity className="w-3.5 h-3.5 text-[#ff6b35]" />
                      <span>Frame Render:</span>
                    </span>
                    <span className="font-bold text-[#ff6b35]">{fps} FPS &bull; Stable</span>
                  </div>
                </>
              )}

              {activeTab === "nodes" && (
                <div className="p-2.5 rounded-xl bg-white/70 border border-white/80 space-y-1.5 text-[11px] shadow-xs">
                  <div className="flex justify-between">
                    <span className="text-[#240d2b]/60">nav2_waypoint_follower:</span>
                    <span className="text-emerald-600 font-bold">active</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#240d2b]/60">rtabmap_visual_slam:</span>
                    <span className="text-emerald-600 font-bold">tracking</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#240d2b]/60">yolov8_edge_inference:</span>
                    <span className="text-[#ff6b35] font-bold">12.8ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#240d2b]/60">micro_xrce_dds_bridge:</span>
                    <span className="text-emerald-600 font-bold">synced</span>
                  </div>
                </div>
              )}

              {activeTab === "rf" && (
                <div className="p-2.5 rounded-xl bg-white/70 border border-white/80 space-y-1.5 text-[11px] shadow-xs">
                  <div className="flex justify-between">
                    <span className="text-[#240d2b]/60">Carrier Band:</span>
                    <span className="font-bold">915.000 MHz</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#240d2b]/60">Signal RSSI:</span>
                    <span className="text-emerald-600 font-bold">-68 dBm (Strong)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#240d2b]/60">Packet Loss:</span>
                    <span className="font-bold">0.00%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#240d2b]/60">MAVLink Stream:</span>
                    <span className="font-bold text-[#ff6b35]">50 Hz</span>
                  </div>
                </div>
              )}

              {activeTab === "power" && (
                <div className="p-2.5 rounded-xl bg-white/70 border border-white/80 space-y-1.5 text-[11px] shadow-xs">
                  <div className="flex justify-between">
                    <span className="text-[#240d2b]/60">Pack Voltage:</span>
                    <span className="font-bold">16.42 V (4.10V / cell)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#240d2b]/60">Current Draw:</span>
                    <span className="font-bold">2.84 A Nominal</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#240d2b]/60">BMS Thermal:</span>
                    <span className="text-emerald-600 font-bold">28.4°C (Normal)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#240d2b]/60">Flight Autonomy:</span>
                    <span className="font-bold text-[#ff6b35]">~24 mins</span>
                  </div>
                </div>
              )}
            </div>

            {/* Coordinates & Online Status Footer */}
            <div className="pt-2 border-t border-[#240d2b]/[0.08] flex items-center justify-between text-[10px] text-[#240d2b]/60">
              <span className="flex items-center gap-1 font-semibold">
                <ShieldCheck className="w-3 h-3 text-[#ff6b35]" />
                <span>AIT LAB 104 • PUNE</span>
              </span>
              <span className="font-bold text-[#ff6b35] bg-[#ff6b35]/10 px-2 py-0.5 rounded-full">
                SYSTEM ONLINE
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
        className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/85 backdrop-blur-xl text-[#240d2b] border border-white/90 shadow-[0_8px_24px_rgba(36,13,43,0.1)] hover:shadow-[0_12px_30px_rgba(255,107,53,0.2)] hover:border-[#ff6b35]/40 transition-all text-xs font-mono font-medium cursor-pointer"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff6b35] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff6b35]" />
        </span>
        <span className="tracking-tight">Telemetry HUD</span>
        <span className="text-[10px] text-[#240d2b]/50 px-1.5 py-0.2 rounded-full bg-black/5">
          {fps} FPS
        </span>
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
