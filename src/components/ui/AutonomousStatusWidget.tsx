"use client";

import React, { useState, useEffect, useRef } from "react";
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
  Maximize2,
  Minimize2,
  Compass,
  Crosshair,
  Play,
  Pause,
  RotateCcw,
  Sliders,
  Download,
  Wifi,
  Navigation,
  Send,
  Eye,
  AlertCircle,
} from "lucide-react";

type SubsystemTab = "overview" | "radar" | "nodes" | "rf" | "power";

interface Waypoint {
  id: string;
  name: string;
  x: number; // percentage in arena
  y: number;
  label: string;
  type: "depot" | "checkpoint" | "target" | "dock";
}

const ARENA_WAYPOINTS: Waypoint[] = [
  { id: "WP-01", name: "AIT Central Quad", x: 28, y: 72, label: "Origin / Ingress", type: "depot" },
  { id: "WP-02", name: "Lab 104 Robotics Wing", x: 68, y: 28, label: "Active Waypoint", type: "target" },
  { id: "WP-03", name: "Proving Ground Obstacles", x: 74, y: 65, label: "Slalom Checkpoint", type: "checkpoint" },
  { id: "WP-04", name: "Rapid Recharge Dock", x: 32, y: 35, label: "Autonomous Dock", type: "dock" },
];

const INITIAL_LOGS = [
  { time: "23:14:02", level: "INFO", source: "ros2_daemon", msg: "Micro-XRCE-DDS agent handshake verified across /dev/ttyACM0" },
  { time: "23:14:05", level: "INFO", source: "nav2_planner", msg: "Global costmap updated via RPLIDAR S2 360° point cloud" },
  { time: "23:14:08", level: "INFO", source: "yolov8_edge", msg: "Edge TensorRT engine running at 12.8ms / 78.1 FPS on Orin Nano" },
  { time: "23:14:12", level: "INFO", source: "ekf_filter", msg: "Dual-EKF IMU/Wheel odometry fusion covariance converged (drift < 1.8cm)" },
  { time: "23:14:18", level: "SUCCESS", source: "mission_ctrl", msg: "Patrol objective active: Ingress vector locked on WP-02" },
];

export function AutonomousStatusWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCockpitOpen, setIsCockpitOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<SubsystemTab>("overview");
  const [fps, setFps] = useState(60);
  const [pingMs, setPingMs] = useState(19);
  const [copiedLog, setCopiedLog] = useState(false);
  const [copiedCockpitLog, setCopiedCockpitLog] = useState(false);

  // Proving Ground Radar & Vehicle Simulation State
  const [missionState, setMissionState] = useState<"patrol" | "holding" | "rth">("patrol");
  const [roverPos, setRoverPos] = useState({ x: 42, y: 52 });
  const [headingDeg, setHeadingDeg] = useState(48);
  const [activeWpIndex, setActiveWpIndex] = useState(1);
  const [radarSweepAngle, setRadarSweepAngle] = useState(0);
  const [terminalLogs, setTerminalLogs] = useState(INITIAL_LOGS);
  const [cliInput, setCliInput] = useState("");
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Global event listener to open cockpit from Command Palette or external buttons
  useEffect(() => {
    const handleOpenCockpitEvent = () => {
      setIsCockpitOpen(true);
      setIsOpen(false);
    };
    window.addEventListener("cear-open-mission-cockpit", handleOpenCockpitEvent);
    return () => window.removeEventListener("cear-open-mission-cockpit", handleOpenCockpitEvent);
  }, []);

  // Dynamic FPS, Ping & Radar Sweep Animation
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
      setRadarSweepAngle((prev) => (prev + 3) % 360);
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

  // Rover Autonomous Waypoint Navigation Simulation
  useEffect(() => {
    if (missionState === "holding") return;

    const navInterval = setInterval(() => {
      const targetWp = ARENA_WAYPOINTS[activeWpIndex];
      setRoverPos((prev) => {
        const dx = targetWp.x - prev.x;
        const dy = targetWp.y - prev.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 3) {
          // Reached target waypoint, transition to next
          const nextIndex = (activeWpIndex + 1) % ARENA_WAYPOINTS.length;
          setActiveWpIndex(nextIndex);
          setTerminalLogs((logs) => [
            ...logs.slice(-14),
            {
              time: new Date().toLocaleTimeString("en-GB", { hour12: false }),
              level: "SUCCESS",
              source: "nav2_controller",
              msg: `Waypoint reached: ${targetWp.name} (${targetWp.id}) // Heading to ${ARENA_WAYPOINTS[nextIndex].id}`,
            },
          ]);
          return prev;
        }

        // Steer towards target
        const angle = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
        setHeadingDeg(Math.round((angle + 360) % 360));

        const speed = missionState === "rth" ? 1.8 : 0.9;
        return {
          x: Number((prev.x + (dx / dist) * speed).toFixed(2)),
          y: Number((prev.y + (dy / dist) * speed).toFixed(2)),
        };
      });
    }, 400);

    return () => clearInterval(navInterval);
  }, [activeWpIndex, missionState]);

  // Scroll terminal logs to bottom
  useEffect(() => {
    if (isCockpitOpen) {
      terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [terminalLogs, isCockpitOpen]);

  const handleCopyTelemetry = () => {
    const report = `[CEAR LAB 104 AUTONOMOUS TELEMETRY REPORT]
Timestamp: ${new Date().toISOString()}
Node Status: 14 Active // 0 Errors // ROS2 Humble
Mission State: ${missionState.toUpperCase()} // Target: ${ARENA_WAYPOINTS[activeWpIndex].name}
Rover Position: X=${roverPos.x}% Y=${roverPos.y}% // Heading: ${headingDeg}°
RF Uplink: 915 MHz (Ch 04) // RSSI: -68 dBm // Packet Loss: 0.0%
Fleet Battery: 4S LiPo 16.42V // Draw: 2.84A Nominal
Perception: Intel RealSense D435i + RPLIDAR S2 // YOLOv8 TensorRT Latency: 12.8ms
Link Latency: ${pingMs}ms to Ground Station
Facility: Army Institute of Technology, Pune (Lab 104 Robotics Wing)`;

    navigator.clipboard?.writeText(report);
    setCopiedLog(true);
    setCopiedCockpitLog(true);
    setTimeout(() => {
      setCopiedLog(false);
      setCopiedCockpitLog(false);
    }, 2400);
  };

  const handleExecuteCli = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cliInput.trim()) return;

    const cmd = cliInput.trim();
    setCliInput("");

    let replyMsg = `Command executed: "${cmd}"`;
    let level = "INFO";

    if (cmd.includes("topic echo")) {
      replyMsg = `[ROS2] Subscribed to topic. Odometry delta: x=${(roverPos.x * 0.1).toFixed(3)}m, y=${(roverPos.y * 0.1).toFixed(3)}m, yaw=${headingDeg}°`;
    } else if (cmd.includes("param set")) {
      replyMsg = `[ROS2] Parameter updated successfully across /nav2_controller node.`;
      level = "SUCCESS";
    } else if (cmd.includes("stop") || cmd.includes("halt")) {
      setMissionState("holding");
      replyMsg = `[SAFETY] Emergency velocity override applied: Rover halted.`;
      level = "WARN";
    } else if (cmd.includes("resume") || cmd.includes("patrol")) {
      setMissionState("patrol");
      replyMsg = `[MISSION] Autonomous waypoint patrol resumed.`;
      level = "SUCCESS";
    }

    setTerminalLogs((prev) => [
      ...prev.slice(-14),
      {
        time: new Date().toLocaleTimeString("en-GB", { hour12: false }),
        level: "CMD",
        source: "cadet_cli",
        msg: `$ ${cmd}`,
      },
      {
        time: new Date().toLocaleTimeString("en-GB", { hour12: false }),
        level,
        source: "ros2_kernel",
        msg: replyMsg,
      },
    ]);
  };

  const handleExportTelemetryJson = () => {
    const data = {
      facility: "CEAR Lab 104 Robotics Wing, AIT Pune",
      generated_at: new Date().toISOString(),
      rover_id: "CEAR-UGV-04-JALPARI-L",
      state: missionState,
      coordinates: roverPos,
      heading_deg: headingDeg,
      active_waypoint: ARENA_WAYPOINTS[activeWpIndex],
      all_waypoints: ARENA_WAYPOINTS,
      diagnostics: {
        ros2_nodes: 14,
        rf_carrier_mhz: 915.0,
        rssi_dbm: -68,
        packet_loss_pct: 0.0,
        battery_pack_volts: 16.42,
        current_draw_amps: 2.84,
        inference_latency_ms: 12.8,
        fps_render: fps,
        ping_latency_ms: pingMs,
      },
      terminal_log_history: terminalLogs,
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cear_mission_telemetry_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      {/* Mini Floating Telemetry Dock */}
      <div className="fixed bottom-5 left-5 z-40 font-mono text-xs select-none">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.95 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="mb-3 w-88 sm:w-96 bg-white/90 backdrop-blur-2xl text-[#240d2b] border border-white/95 rounded-3xl shadow-[0_20px_50px_-10px_rgba(36,13,43,0.18)] p-5 space-y-4 relative overflow-hidden"
            >
              {/* Specular Top Bevel Highlight */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />

              {/* Header with Live Ping & Maximize Action */}
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
                      AIT Lab 104 &bull; {pingMs}ms Ping &bull; {fps} FPS
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      setIsCockpitOpen(true);
                      setIsOpen(false);
                    }}
                    className="p-1.5 rounded-lg text-[#240d2b]/60 hover:text-[#ff6b35] hover:bg-[#ff6b35]/10 transition-colors cursor-pointer"
                    title="Maximize to Operations Cockpit"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
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
                  { id: "radar", label: "2D Radar" },
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
                        <Navigation className="w-3.5 h-3.5 text-[#ff6b35]" />
                        <span>Mission Mode:</span>
                      </span>
                      <span className="font-bold text-emerald-600 uppercase">
                        {missionState} &bull; {ARENA_WAYPOINTS[activeWpIndex].id}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[#240d2b]/75 p-2 rounded-xl bg-white/70 border border-white/80 shadow-xs">
                      <span className="flex items-center gap-2">
                        <BatteryCharging className="w-3.5 h-3.5 text-[#ff6b35]" />
                        <span>Fleet Battery:</span>
                      </span>
                      <span className="font-bold text-[#240d2b]">4S LiPo 16.42V</span>
                    </div>
                  </>
                )}

                {activeTab === "radar" && (
                  <div className="p-3 rounded-2xl bg-[#180a1c] text-white border border-[#240d2b]/30 space-y-2 relative overflow-hidden">
                    {/* Radar SVG Visualizer */}
                    <div className="relative w-full h-36 bg-[#130717] rounded-xl border border-white/10 flex items-center justify-center overflow-hidden">
                      {/* Range Rings */}
                      <div className="absolute w-28 h-28 rounded-full border border-dashed border-[#ff6b35]/25" />
                      <div className="absolute w-20 h-20 rounded-full border border-[#ff6b35]/30" />
                      <div className="absolute w-12 h-12 rounded-full border border-[#ff6b35]/40" />

                      {/* Crosshairs */}
                      <div className="absolute inset-x-0 h-px bg-white/10" />
                      <div className="absolute inset-y-0 w-px bg-white/10" />

                      {/* 360° Rotating Radar Sweep Line */}
                      <div
                        className="absolute w-full h-full pointer-events-none"
                        style={{
                          transform: `rotate(${radarSweepAngle}deg)`,
                          transformOrigin: "center center",
                          background:
                            "conic-gradient(from 0deg, rgba(255, 107, 53, 0.4) 0deg, rgba(255, 107, 53, 0) 60deg)",
                        }}
                      />

                      {/* Plotted Waypoints */}
                      {ARENA_WAYPOINTS.map((wp, i) => (
                        <div
                          key={wp.id}
                          className={`absolute w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2 transition-all ${
                            i === activeWpIndex
                              ? "bg-[#ff6b35] ring-4 ring-[#ff6b35]/40 animate-pulse"
                              : "bg-white/40"
                          }`}
                          style={{ left: `${wp.x}%`, top: `${wp.y}%` }}
                          title={`${wp.id}: ${wp.name}`}
                        />
                      ))}

                      {/* Simulated Autonomous Rover Blip with Heading Arrow */}
                      <div
                        className="absolute w-3.5 h-3.5 bg-emerald-400 rounded-full -translate-x-1/2 -translate-y-1/2 flex items-center justify-center shadow-[0_0_12px_#34d399] transition-all duration-300"
                        style={{ left: `${roverPos.x}%`, top: `${roverPos.y}%` }}
                      >
                        <div
                          className="w-1.5 h-2.5 bg-emerald-100 rounded-xs"
                          style={{ transform: `rotate(${headingDeg}deg)` }}
                        />
                      </div>

                      {/* Range Ring Distance Markers */}
                      <span className="absolute bottom-1 right-2 text-[8px] font-mono text-white/40">
                        RNG: 20m // RPLIDAR S2
                      </span>
                    </div>

                    {/* Telemetry metrics strip */}
                    <div className="flex items-center justify-between text-[10px] text-white/80 pt-1">
                      <span>Target: <strong className="text-[#ff6b35]">{ARENA_WAYPOINTS[activeWpIndex].id}</strong></span>
                      <span>Heading: <strong className="text-emerald-400">{headingDeg}°</strong></span>
                      <span>Pos: <strong className="text-white/90">X:{roverPos.x} Y:{roverPos.y}</strong></span>
                    </div>
                  </div>
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
                  <span>AIT LAB 104 &bull; PUNE</span>
                </span>
                <button
                  onClick={() => {
                    setIsCockpitOpen(true);
                    setIsOpen(false);
                  }}
                  className="font-bold text-[#ff6b35] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>OPEN COCKPIT</span>
                  <Maximize2 className="w-2.5 h-2.5" />
                </button>
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

      {/* FULL-SCREEN AUTONOMOUS OPERATIONS CENTER (AOC) COCKPIT MODAL */}
      <AnimatePresence>
        {isCockpitOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-xl animate-fade-in font-mono select-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-6xl max-h-[92vh] flex flex-col bg-[#140618] border border-white/15 rounded-3xl text-white shadow-[0_25px_80px_rgba(0,0,0,0.8)] overflow-hidden"
            >
              {/* Cockpit Top Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-white/10 bg-[#1e0a24]/60">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#ff6b35]/20 border border-[#ff6b35]/40 flex items-center justify-center text-[#ff6b35]">
                    <Crosshair className="w-5 h-5 animate-spin-slow" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-display font-black text-sm sm:text-base tracking-tight text-white">
                        CEAR TACTICAL AUTONOMOUS OPERATIONS CENTER
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                        LIVE TELEMETRY
                      </span>
                    </div>
                    <p className="text-[11px] text-white/50">
                      Platform: CEAR-UGV-04 [JALPARI-L] &bull; Lab 104 Robotics Wing, Army Institute of Technology, Pune
                    </p>
                  </div>
                </div>

                {/* Top Action Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleExportTelemetryJson}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs text-white transition-all cursor-pointer border border-white/10"
                    title="Export Telemetry JSON"
                  >
                    <Download className="w-3.5 h-3.5 text-[#ff6b35]" />
                    <span className="hidden sm:inline">Export JSON</span>
                  </button>
                  <button
                    onClick={handleCopyTelemetry}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs text-white transition-all cursor-pointer border border-white/10"
                    title="Copy Report"
                  >
                    {copiedCockpitLog ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span className="hidden sm:inline">Copy Report</span>
                  </button>
                  <button
                    onClick={() => setIsCockpitOpen(false)}
                    className="p-2 rounded-xl bg-white/10 hover:bg-[#ff6b35] hover:text-white transition-colors cursor-pointer"
                    aria-label="Close Cockpit"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Cockpit 3-Panel Grid Body */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-5 overflow-y-auto flex-1">
                {/* PANEL 1: Fleet Kinematics & Electrical Health (3 Cols) */}
                <div className="lg:col-span-3 space-y-4">
                  {/* Artificial Horizon / Gyro Angle */}
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                    <div className="flex items-center justify-between text-xs text-white/70">
                      <span className="flex items-center gap-1.5">
                        <Compass className="w-4 h-4 text-[#ff6b35]" />
                        <span className="font-bold">Attitude &amp; Gyro</span>
                      </span>
                      <span className="text-emerald-400 font-bold">BNO085 9-DOF</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="p-2 rounded-xl bg-white/[0.04] border border-white/5">
                        <div className="text-[10px] text-white/40">ROLL</div>
                        <div className="text-sm font-bold text-white">+1.2°</div>
                      </div>
                      <div className="p-2 rounded-xl bg-white/[0.04] border border-white/5">
                        <div className="text-[10px] text-white/40">PITCH</div>
                        <div className="text-sm font-bold text-white">-0.8°</div>
                      </div>
                      <div className="p-2 rounded-xl bg-white/[0.04] border border-white/5">
                        <div className="text-[10px] text-white/40">YAW</div>
                        <div className="text-sm font-bold text-[#ff6b35]">{headingDeg}°</div>
                      </div>
                    </div>
                  </div>

                  {/* 4S LiPo Power & BMS Metrics */}
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                    <div className="flex items-center justify-between text-xs text-white/70">
                      <span className="flex items-center gap-1.5">
                        <BatteryCharging className="w-4 h-4 text-[#ff6b35]" />
                        <span className="font-bold">4S LiPo Battery</span>
                      </span>
                      <span className="text-emerald-400 font-bold">16.42 V</span>
                    </div>

                    <div className="grid grid-cols-4 gap-1.5 text-center text-[10px]">
                      <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                        <div>C1</div>
                        <div className="font-bold">4.11V</div>
                      </div>
                      <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                        <div>C2</div>
                        <div className="font-bold">4.10V</div>
                      </div>
                      <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                        <div>C3</div>
                        <div className="font-bold">4.11V</div>
                      </div>
                      <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                        <div>C4</div>
                        <div className="font-bold">4.10V</div>
                      </div>
                    </div>

                    <div className="space-y-1 text-[11px] text-white/60 pt-1">
                      <div className="flex justify-between">
                        <span>Current Draw:</span>
                        <span className="text-white font-bold">2.84 A</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Pack Temp:</span>
                        <span className="text-emerald-400 font-bold">28.4°C</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Est. Runtime:</span>
                        <span className="text-[#ff6b35] font-bold">~24 mins</span>
                      </div>
                    </div>
                  </div>

                  {/* FOC Motor Drive Telemetry */}
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2 text-[11px]">
                    <div className="flex items-center justify-between text-xs text-white/70">
                      <span className="flex items-center gap-1.5">
                        <Zap className="w-4 h-4 text-[#ff6b35]" />
                        <span className="font-bold">4-Wheel FOC ESCs</span>
                      </span>
                      <span className="text-white/40">CAN-FD</span>
                    </div>
                    <div className="space-y-1.5 pt-1 text-white/60">
                      <div className="flex justify-between">
                        <span>M1 (Front Left):</span>
                        <span className="text-white">38°C &bull; 820 RPM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>M2 (Front Right):</span>
                        <span className="text-white">41°C &bull; 818 RPM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>M3 (Rear Left):</span>
                        <span className="text-white">39°C &bull; 824 RPM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>M4 (Rear Right):</span>
                        <span className="text-white">42°C &bull; 820 RPM</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* PANEL 2: Tactical 2D Proving Ground Radar Map & Mission Controls (5 Cols) */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                    {/* Map Header */}
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <Navigation className="w-4 h-4 text-[#ff6b35]" />
                        <span className="font-bold text-white">Lab 104 Proving Ground Radar</span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px]">
                        <span className="text-white/50">Grid: 1:1 Scale</span>
                        <span className="px-2 py-0.5 rounded-full bg-white/10 text-[#ff6b35]">
                          RPLIDAR S2
                        </span>
                      </div>
                    </div>

                    {/* High-Resolution Interactive Radar Display */}
                    <div className="relative w-full h-72 sm:h-80 bg-[#0d0410] rounded-2xl border border-white/10 overflow-hidden">
                      {/* Radar Range Rings */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-64 h-64 rounded-full border border-dashed border-[#ff6b35]/20" />
                        <div className="absolute w-48 h-48 rounded-full border border-[#ff6b35]/25" />
                        <div className="absolute w-32 h-32 rounded-full border border-[#ff6b35]/30" />
                        <div className="absolute w-16 h-16 rounded-full border border-[#ff6b35]/40" />
                        <div className="absolute inset-x-0 h-px bg-white/10" />
                        <div className="absolute inset-y-0 w-px bg-white/10" />
                      </div>

                      {/* Rotating Radar Sweep Cone */}
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          transform: `rotate(${radarSweepAngle}deg)`,
                          transformOrigin: "center center",
                          background:
                            "conic-gradient(from 0deg, rgba(255, 107, 53, 0.45) 0deg, rgba(255, 107, 53, 0) 55deg)",
                        }}
                      />

                      {/* Arena Boundary Label */}
                      <div className="absolute top-2 left-3 text-[9px] text-white/40 tracking-wider">
                        AIT CAMPUS // GRID SECTOR 104-N
                      </div>

                      {/* Waypoint Markers */}
                      {ARENA_WAYPOINTS.map((wp, i) => {
                        const isTarget = i === activeWpIndex;
                        return (
                          <button
                            key={wp.id}
                            onClick={() => {
                              setActiveWpIndex(i);
                              setTerminalLogs((l) => [
                                ...l.slice(-14),
                                {
                                  time: new Date().toLocaleTimeString("en-GB", { hour12: false }),
                                  level: "CMD",
                                  source: "operator",
                                  msg: `Manual waypoint redirection: Set target to ${wp.id} (${wp.name})`,
                                },
                              ]);
                            }}
                            className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                            style={{ left: `${wp.x}%`, top: `${wp.y}%` }}
                          >
                            <div
                              className={`w-4 h-4 rounded-full flex items-center justify-center transition-all ${
                                isTarget
                                  ? "bg-[#ff6b35] text-white shadow-[0_0_15px_#ff6b35] ring-4 ring-[#ff6b35]/30"
                                  : "bg-white/20 text-white/70 group-hover:bg-white/40"
                              }`}
                            >
                              <span className="text-[8px] font-bold">{i + 1}</span>
                            </div>
                            <span className="absolute top-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] px-1.5 py-0.5 rounded-md bg-black/80 text-white/80 border border-white/10 opacity-70 group-hover:opacity-100 transition-opacity">
                              {wp.id}
                            </span>
                          </button>
                        );
                      })}

                      {/* Autonomous Rover Position & Attitude Blip */}
                      <div
                        className="absolute w-5 h-5 bg-emerald-400 rounded-full -translate-x-1/2 -translate-y-1/2 flex items-center justify-center shadow-[0_0_20px_#34d399] transition-all duration-300"
                        style={{ left: `${roverPos.x}%`, top: `${roverPos.y}%` }}
                      >
                        <div
                          className="w-2 h-3.5 bg-white rounded-xs"
                          style={{ transform: `rotate(${headingDeg}deg)` }}
                        />
                      </div>

                      {/* Bottom Legend */}
                      <div className="absolute bottom-2 inset-x-3 flex items-center justify-between text-[9px] text-white/50 bg-black/60 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-white/10">
                        <span>Current Target: <strong className="text-[#ff6b35]">{ARENA_WAYPOINTS[activeWpIndex].name}</strong></span>
                        <span>Velocity: <strong className="text-emerald-400">{missionState === "holding" ? "0.00" : "1.24"} m/s</strong></span>
                      </div>
                    </div>

                    {/* Mission Command Buttons */}
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => {
                          setMissionState("patrol");
                          setTerminalLogs((l) => [
                            ...l.slice(-14),
                            {
                              time: new Date().toLocaleTimeString("en-GB", { hour12: false }),
                              level: "SUCCESS",
                              source: "mission_ctrl",
                              msg: "Autonomous patrol trajectory re-engaged",
                            },
                          ]);
                        }}
                        className={`py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          missionState === "patrol"
                            ? "bg-[#ff6b35] text-white shadow-[0_4px_16px_rgba(255,107,53,0.4)]"
                            : "bg-white/10 hover:bg-white/15 text-white/80"
                        }`}
                      >
                        <Play className="w-3.5 h-3.5" />
                        <span>Auto Patrol</span>
                      </button>

                      <button
                        onClick={() => {
                          setMissionState("holding");
                          setTerminalLogs((l) => [
                            ...l.slice(-14),
                            {
                              time: new Date().toLocaleTimeString("en-GB", { hour12: false }),
                              level: "WARN",
                              source: "mission_ctrl",
                              msg: "Station hold engaged. Position locked via EKF drift hold.",
                            },
                          ]);
                        }}
                        className={`py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          missionState === "holding"
                            ? "bg-amber-500 text-white shadow-[0_4px_16px_rgba(245,158,11,0.4)]"
                            : "bg-white/10 hover:bg-white/15 text-white/80"
                        }`}
                      >
                        <Pause className="w-3.5 h-3.5" />
                        <span>Hold Pos</span>
                      </button>

                      <button
                        onClick={() => {
                          setMissionState("rth");
                          setActiveWpIndex(3); // Return to Dock
                          setTerminalLogs((l) => [
                            ...l.slice(-14),
                            {
                              time: new Date().toLocaleTimeString("en-GB", { hour12: false }),
                              level: "WARN",
                              source: "mission_ctrl",
                              msg: "Return-to-Home (RTH) protocol initiated: Navigating to WP-04 Dock",
                            },
                          ]);
                        }}
                        className={`py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          missionState === "rth"
                            ? "bg-rose-500 text-white shadow-[0_4px_16px_rgba(244,63,94,0.4)]"
                            : "bg-white/10 hover:bg-white/15 text-white/80"
                        }`}
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Return Dock</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* PANEL 3: Live ROS2 Interactive Terminal & Log Stream (4 Cols) */}
                <div className="lg:col-span-4 flex flex-col space-y-4">
                  <div className="flex-1 flex flex-col p-4 rounded-2xl bg-black/60 border border-white/10 overflow-hidden">
                    {/* Terminal Header */}
                    <div className="flex items-center justify-between pb-2 border-b border-white/10 text-xs">
                      <div className="flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-[#ff6b35]" />
                        <span className="font-bold text-white">ROS2 Humble Daemon</span>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-semibold">14 / 14 ACTIVE</span>
                    </div>

                    {/* Scrolling Log Output */}
                    <div className="flex-1 min-h-[220px] max-h-[280px] overflow-y-auto space-y-2 py-3 text-[11px]">
                      {terminalLogs.map((log, i) => (
                        <div key={i} className="leading-tight font-mono">
                          <span className="text-white/40">[{log.time}] </span>
                          <span
                            className={
                              log.level === "SUCCESS"
                                ? "text-emerald-400 font-bold"
                                : log.level === "WARN"
                                ? "text-amber-400 font-bold"
                                : log.level === "CMD"
                                ? "text-[#ff6b35] font-bold"
                                : "text-sky-400"
                            }
                          >
                            [{log.level}]
                          </span>{" "}
                          <span className="text-white/60">[{log.source}]</span>:{" "}
                          <span className="text-white/90">{log.msg}</span>
                        </div>
                      ))}
                      <div ref={terminalEndRef} />
                    </div>

                    {/* Quick Command Chips */}
                    <div className="flex flex-wrap gap-1.5 py-2 border-t border-white/10">
                      {[
                        "ros2 topic echo /odom",
                        "ros2 node list",
                        "ros2 param set /nav2 max_speed 1.5",
                        "ros2 launch cear_bringup",
                      ].map((cmd) => (
                        <button
                          key={cmd}
                          onClick={() => {
                            setCliInput(cmd);
                          }}
                          className="px-2 py-0.5 rounded-md bg-white/[0.06] hover:bg-white/[0.12] text-[9px] text-white/70 hover:text-white transition-colors cursor-pointer"
                        >
                          {cmd}
                        </button>
                      ))}
                    </div>

                    {/* Interactive CLI Form */}
                    <form onSubmit={handleExecuteCli} className="flex gap-2 pt-2">
                      <input
                        type="text"
                        value={cliInput}
                        onChange={(e) => setCliInput(e.target.value)}
                        placeholder="Type ros2 command (e.g. ros2 topic echo /odom)..."
                        className="flex-1 bg-white/[0.06] border border-white/15 rounded-xl px-3 py-1.5 text-xs text-white placeholder-white/40 focus:outline-hidden focus:ring-1 focus:ring-[#ff6b35]"
                      />
                      <button
                        type="submit"
                        className="px-3 py-1.5 rounded-xl bg-[#ff6b35] hover:bg-[#ff8c5a] text-white text-xs font-bold transition-all cursor-pointer flex items-center justify-center"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </form>
                  </div>

                  {/* Uplink Telemetry Metric Strip */}
                  <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between text-[11px] text-white/70">
                    <span className="flex items-center gap-2">
                      <Wifi className="w-4 h-4 text-emerald-400" />
                      <span>Telemetry Uplink: 915 MHz</span>
                    </span>
                    <span className="text-emerald-400 font-bold">-68 dBm // 0.0% Loss</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default AutonomousStatusWidget;

