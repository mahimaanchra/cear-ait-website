"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Cpu,
  Eye,
  Navigation,
  ArrowUpRight,
  Sparkles,
  X,
  Layers,
  Cpu as Chip,
  ShieldCheck,
  Calendar,
  Compass,
  Check,
  Copy,
  Gauge,
  Sliders,
} from "lucide-react";
import { siteConfig, focusAreas } from "@/data/siteData";
import { WordBlurReveal } from "@/components/ui/WordBlurReveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { NeuralCanvas } from "@/components/ui/NeuralCanvas";

const iconMap: Record<string, React.ReactNode> = {
  ai: <Brain className="w-5 h-5 text-[#240d2b] group-hover:text-white transition-colors" />,
  robotics: <Cpu className="w-5 h-5 text-[#240d2b] group-hover:text-white transition-colors" />,
  vision: <Eye className="w-5 h-5 text-[#240d2b] group-hover:text-white transition-colors" />,
  autonomous: <Navigation className="w-5 h-5 text-[#240d2b] group-hover:text-white transition-colors" />,
};

interface Milestone {
  year: string;
  phase: string;
  title: string;
  description: string;
  achievements: string[];
  techStack: string[];
}

const cearMilestones: Milestone[] = [
  {
    year: "2020",
    phase: "Genesis",
    title: "Inception & Lab 104 Robotics Wing",
    description:
      "Founded by visionaries at Army Institute of Technology, Pune to build an indigenous hands-on hardware incubator for combat mechatronics and control circuits.",
    achievements: ["Established Lab 104", "First Combat Cadre", "Custom STM32 Motor Drives"],
    techStack: ["FreeRTOS", "STM32", "Altium", "FDM 3D"],
  },
  {
    year: "2022",
    phase: "Expansion",
    title: "Aquatic Robotics & Aerial Test Cells",
    description:
      "Pioneered aquatic underwater robotics, designing the award-winning Jalpari AUV platform which secured 3rd Position and Unique Design honours at IIT Guwahati Techniche.",
    achievements: ["IIT Guwahati Podium", "Sub-surface Telemetry", "FPV Drone Racing Team"],
    techStack: ["T200 Thrusters", "Hydrodynamics", "Pixhawk", "MAVLink"],
  },
  {
    year: "2024",
    phase: "National Arena",
    title: "Wartech Flagship Championship Inauguration",
    description:
      "Created the premier national robotics battleground in Western India, hosting 8 competition disciplines ranging from Robo Soccer and 15kg Robowar to Micromouse mazes.",
    achievements: ["50+ Inter-Collegiate Teams", "₹1.5L+ Prize Pool", "8 Battle Arenas"],
    techStack: ["RF 2.4GHz", "High-Voltage LiPo", "Autonomous Dohyo"],
  },
  {
    year: "2026",
    phase: "Frontier",
    title: "Swarm Autonomy & Edge Neural Compute",
    description:
      "Deploying decentralized robotic swarms, multi-agent SLAM, and TensorRT neural networks on Jetson Orin Nano accelerators for next-generation defense applications.",
    achievements: ["Sub-14ms YOLOv8 Inference", "GPS-Denied Visual SLAM", "Swarm Coordination"],
    techStack: ["ROS2 Humble", "Jetson Orin", "YOLOv8", "RealSense Depth"],
  },
];

const domainDetails: Record<
  string,
  {
    hardware: string[];
    software: string[];
    platforms: string[];
    benchmarks: string;
  }
> = {
  ai: {
    hardware: ["NVIDIA Jetson Orin Nano 8GB", "Coral Edge TPU Accelerator", "Raspberry Pi 5 Compute Modules"],
    software: ["PyTorch Mobile", "TensorRT Engine", "YOLOv8 Edge Perception", "DeepStream Pipeline"],
    platforms: ["Tactical Rover Cadre", "Autonomous Jalpari Sub-surface AUV", "High-FPS Ball-Tracking Turrets"],
    benchmarks: "< 14ms edge inference latency at 1080p stream resolution",
  },
  robotics: {
    hardware: ["Custom STM32H7 Motor Drives", "High-Torque Planetary DC Motors", "SLA/FDM 3D Carbon Linkages"],
    software: ["FreeRTOS Kernel", "CAN Bus / CANopen Protocols", "Inverse Kinematics Solvers", "UART Telemetry"],
    platforms: ["Wartech 2026 Combat Arena Bots", "6-DOF Robotic Articulation Arm", "Rough-Terrain Suspension Rover"],
    benchmarks: "Zero-backlash transmission with sub-millimeter repeatable positioning",
  },
  vision: {
    hardware: ["Intel RealSense D435i Depth Sensor", "Sony IMX477 Global Shutter Sensor", "RPLIDAR S2 Laser Scanners"],
    software: ["OpenCV / OpenVINO", "Visual SLAM (RTAB-Map)", "OctoMap 3D Occupancy", "Point Cloud Library (PCL)"],
    platforms: ["Jalshakti USV Autonomous Surface Vessel", "Indoor GPS-Denied Aerial Quadcopter", "Obstacle Avoidance Rover"],
    benchmarks: "60 FPS real-time depth mapping with dynamic spatial clustering",
  },
  autonomous: {
    hardware: ["Pixhawk 6C Flight Controllers", "Neo-M9N Dual-Band GNSS", "Holybro SiK 433MHz Telemetry Radios"],
    software: ["ROS2 Humble Hawksbill", "Nav2 Waypoint Navigation", "Micro-XRCE-DDS Agent", "MAVLink Ground Station"],
    platforms: ["Autonomous Jalpari AUV", "Swarm Quadcopter Cadre", "Waypoint GPS Navigation Ground Vehicle"],
    benchmarks: "Autonomous waypoint tracking within 5cm positional envelope",
  },
};

export function About() {
  const [selectedDomain, setSelectedDomain] = useState<typeof focusAreas[0] | null>(null);
  const [neuralActive, setNeuralActive] = useState(true);
  const [meshSpeed, setMeshSpeed] = useState<number>(0.9);
  const [nodeCount, setNodeCount] = useState<number>(36);
  const [copiedStack, setCopiedStack] = useState(false);
  const [activeMilestoneYear, setActiveMilestoneYear] = useState<string>("2026");

  const handleCopyStack = () => {
    if (!selectedDomain) return;
    const details = domainDetails[selectedDomain.id];
    if (!details) return;
    const stackText = `CEAR Domain: ${selectedDomain.title}
Hardware: ${details.hardware.join(", ")}
Software: ${details.software.join(", ")}
Platforms: ${details.platforms.join(", ")}
Operational Target: ${details.benchmarks}`;
    navigator.clipboard.writeText(stackText);
    setCopiedStack(true);
    setTimeout(() => setCopiedStack(false), 2000);
  };

  return (
    <section id="about" className="relative py-28 sm:py-36 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Editorial Focus-Pull Headline */}
        <div className="max-w-4xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#240d2b]/60">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b35]" />
            <span>01 // Overview &amp; Vision</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#240d2b] font-display leading-[1.12]">
            <WordBlurReveal
              text="Pioneering autonomous robotics, embedded intelligence, and hardware craft."
              highlightWords={["autonomous", "intelligence", "craft."]}
              highlightClassName="text-[#240d2b] underline decoration-[#ff6b35] decoration-4 underline-offset-6"
            />
          </h2>

          <p className="text-base sm:text-lg text-[#240d2b]/70 font-body leading-relaxed max-w-2xl pt-2">
            The Centre of Excellence for AI &amp; Robotics is Army Institute of Technology’s primary innovation hub—engineering unmanned rovers, tactical drones, sub-surface platforms, and high-performance actuation for tomorrow’s frontiers.
          </p>
        </div>

        {/* Vision & Mission: Glassmorphic Split Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <GlassCard
            className="p-8 sm:p-10 flex flex-col justify-between"
            spotlightColor="rgba(255, 107, 53, 0.12)"
          >
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#240d2b]/70 bg-white/80 border border-white/80 px-3 py-1 rounded-full shadow-xs">
                Strategic Vision
              </span>
              <h3 className="font-display text-2xl font-bold text-[#240d2b] mt-5 mb-3 tracking-tight">
                National Leadership in Autonomous Defense
              </h3>
              <p className="text-sm sm:text-base text-[#240d2b]/75 leading-relaxed font-body">
                {siteConfig.vision}
              </p>
            </div>
            <div className="pt-8 mt-6 border-t border-[#240d2b]/[0.08] flex items-center justify-between text-xs font-mono text-[#240d2b]/50">
              <span>EST. 2020</span>
              <span className="text-[#ff6b35] font-semibold">AIT PUNE</span>
            </div>
          </GlassCard>

          <GlassCard
            className="p-8 sm:p-10 flex flex-col justify-between"
            spotlightColor="rgba(36, 13, 43, 0.08)"
          >
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#240d2b]/70 bg-white/80 border border-white/80 px-3 py-1 rounded-full shadow-xs">
                Core Mission
              </span>
              <h3 className="font-display text-2xl font-bold text-[#240d2b] mt-5 mb-3 tracking-tight">
                Engineering from First Principles
              </h3>
              <p className="text-sm sm:text-base text-[#240d2b]/75 leading-relaxed font-body">
                {siteConfig.mission}
              </p>
            </div>
            <div className="pt-8 mt-6 border-t border-[#240d2b]/[0.08] flex items-center justify-between text-xs font-mono text-[#240d2b]/50">
              <span>CEAR // LAB 104</span>
              <span className="text-[#ff6b35] font-semibold">DEFENSE TECH</span>
            </div>
          </GlassCard>
        </div>

        {/* Interactive Swarm & Neural Mesh Simulation Showcase */}
        <div className="relative rounded-[32px] overflow-hidden bg-white/70 backdrop-blur-2xl border border-white/80 p-6 sm:p-8 shadow-[0_20px_60px_-15px_rgba(36,13,43,0.08)]">
          {neuralActive && (
            <NeuralCanvas
              className="opacity-70"
              nodeCount={nodeCount}
              speed={meshSpeed}
              interactive={true}
            />
          )}

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff6b35] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff6b35]" />
                </span>
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#ff6b35] font-semibold">
                  Interactive Edge Simulation
                </span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-[#240d2b] tracking-tight">
                Live Swarm &amp; Neural Graph Telemetry
              </h3>
              <p className="text-xs sm:text-sm text-[#240d2b]/70 font-body">
                Move your cursor across this surface to engage proximity radar locks. Simulates edge inference node clustering across tactical rovers and autonomous swarms.
              </p>
            </div>

            {/* Interactive Telemetry Tuning Controls */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 border border-[#240d2b]/[0.08] text-xs font-mono text-[#240d2b]/80 shadow-xs">
                <span className="text-[#240d2b]/50">Nodes:</span>
                <button
                  onClick={() => setNodeCount((n) => (n === 24 ? 36 : n === 36 ? 48 : 24))}
                  className="font-bold text-[#ff6b35] hover:underline cursor-pointer"
                  title="Cycle Node Count"
                >
                  {nodeCount}
                </button>
                <span className="text-[#240d2b]/30">•</span>
                <span className="text-[#240d2b]/50">Speed:</span>
                <button
                  onClick={() => setMeshSpeed((s) => (s === 0.6 ? 1.0 : s === 1.0 ? 1.6 : 0.6))}
                  className="font-bold text-[#240d2b] hover:text-[#ff6b35] cursor-pointer"
                  title="Cycle Simulation Speed"
                >
                  {meshSpeed === 0.6 ? "0.6x" : meshSpeed === 1.0 ? "1.0x" : "1.6x"}
                </button>
                <span className="text-[#240d2b]/30">•</span>
                <span className="text-[#240d2b]/50">Ping:</span>
                <span className="font-bold text-emerald-600">12ms</span>
              </div>

              <button
                type="button"
                onClick={() => setNeuralActive(!neuralActive)}
                className="px-4 py-1.5 rounded-full text-xs font-mono font-medium transition-all cursor-pointer bg-[#240d2b] text-white hover:bg-[#3b1646] shadow-xs active:scale-95"
              >
                {neuralActive ? "Pause Mesh" : "Run Mesh"}
              </button>
            </div>
          </div>
        </div>

        {/* ================= CEAR STRATEGIC EVOLUTION & MILESTONES ================= */}
        <div className="space-y-8 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#240d2b]/[0.08] pb-6">
            <div>
              <span className="text-xs font-mono tracking-widest uppercase text-[#ff6b35] font-semibold">
                Strategic Roadmap &amp; History
              </span>
              <h3 className="text-2xl sm:text-3xl font-black font-display text-[#240d2b] tracking-tight mt-1">
                From Lab 104 to National Arenas
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#240d2b]/60 font-mono">
              2020 Foundation • 2026 Frontier Autonomous Swarms
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cearMilestones.map((m) => {
              const isSelected = activeMilestoneYear === m.year;
              return (
                <GlassCard
                  key={m.year}
                  onClick={() => setActiveMilestoneYear(m.year)}
                  spotlightColor={isSelected ? "rgba(255, 107, 53, 0.2)" : "rgba(36, 13, 43, 0.08)"}
                  className={`p-6 flex flex-col justify-between cursor-pointer transition-all ${
                    isSelected ? "ring-2 ring-[#ff6b35] shadow-lg" : "hover:border-[#ff6b35]/40"
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-display font-black text-2xl text-[#240d2b] tracking-tight">
                        {m.year}
                      </span>
                      <span className="text-[10px] font-mono tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-[#ff6b35]/10 text-[#ff6b35] font-bold border border-[#ff6b35]/20">
                        {m.phase}
                      </span>
                    </div>

                    <h4 className="font-display text-base font-bold text-[#240d2b] tracking-tight">
                      {m.title}
                    </h4>

                    <p className="text-xs text-[#240d2b]/75 font-body leading-relaxed line-clamp-3">
                      {m.description}
                    </p>

                    <div className="space-y-1.5 pt-1">
                      {m.achievements.map((ach, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-[11px] font-mono text-[#240d2b]/80">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b35]" />
                          <span>{ach}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 mt-5 border-t border-[#240d2b]/[0.06] flex flex-wrap gap-1">
                    {m.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white border border-[#240d2b]/[0.08] text-[#240d2b]/70"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>

        {/* Technical Domains Section with Glass Cards */}
        <div id="domains" className="space-y-8 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#240d2b]/[0.08] pb-6">
            <div>
              <span className="text-xs font-mono tracking-widest uppercase text-[#240d2b]/50">
                Disciplines
              </span>
              <h3 className="text-2xl sm:text-3xl font-black font-display text-[#240d2b] tracking-tight mt-1">
                Core Technical Pillars
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#240d2b]/60 font-mono">
              ROS2 • PyTorch • RTOS • Edge Neural Accelerators
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {focusAreas.map((domain) => (
              <GlassCard
                key={domain.id}
                onClick={() => setSelectedDomain(domain)}
                className="group p-6 flex flex-col justify-between cursor-pointer hover:border-[#ff6b35]/40 transition-all"
                spotlightColor="rgba(255, 107, 53, 0.16)"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-10 h-10 rounded-xl bg-white/90 border border-[#240d2b]/[0.08] flex items-center justify-center group-hover:bg-[#ff6b35] shadow-xs transition-colors">
                      {iconMap[domain.id]}
                    </div>
                    <span className="text-[10px] font-mono tracking-wider text-[#240d2b]/60 uppercase bg-white/60 px-2 py-0.5 rounded-full border border-white/60">
                      {domain.tag}
                    </span>
                  </div>

                  <h4 className="font-display text-lg font-bold text-[#240d2b] tracking-tight mb-2 group-hover:text-[#ff6b35] transition-colors">
                    {domain.title}
                  </h4>

                  <p className="text-xs text-[#240d2b]/70 font-body leading-relaxed">
                    {domain.description}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-[#240d2b]/[0.06] flex items-center justify-between text-xs text-[#240d2b]/40 group-hover:text-[#ff6b35] transition-colors font-mono">
                  <span>Explore stack</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>

      {/* INTERACTIVE DOMAIN EXPLORATION MODAL */}
      <AnimatePresence>
        {selectedDomain && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#240d2b]/80 backdrop-blur-xl overflow-y-auto">
            <div className="fixed inset-0" onClick={() => setSelectedDomain(null)} />

            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full max-w-2xl bg-white/95 backdrop-blur-2xl border border-white/90 rounded-[32px] p-6 sm:p-10 shadow-[0_30px_90px_rgba(36,13,43,0.3)] my-8 overflow-hidden space-y-6"
            >
              {/* Live ambient neural backdrop */}
              <NeuralCanvas className="opacity-15" nodeCount={24} speed={0.6} />

              {/* Top Specular Inner Bevel Highlight */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />

              <button
                onClick={() => setSelectedDomain(null)}
                className="absolute top-6 right-6 p-2 rounded-full text-[#240d2b]/50 hover:text-[#240d2b] hover:bg-black/[0.05] transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#ff6b35] font-semibold bg-[#ff6b35]/10 px-3 py-1 rounded-full border border-[#ff6b35]/20">
                    {selectedDomain.tag}
                  </span>
                  <span className="text-xs font-mono text-[#240d2b]/50">Lab 104 Robotics Wing</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold font-display text-[#240d2b]">
                  {selectedDomain.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#240d2b]/75 font-body">
                  {selectedDomain.description}
                </p>
              </div>

              {domainDetails[selectedDomain.id] && (
                <div className="space-y-5 text-xs font-mono">
                  {/* Hardware Stacks */}
                  <div className="p-4 rounded-2xl bg-[#f6f3ee] border border-[#240d2b]/[0.06] space-y-2">
                    <span className="font-bold text-[#240d2b] uppercase tracking-wider block text-[11px]">
                      Embedded Hardware &amp; Sensors
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {domainDetails[selectedDomain.id].hardware.map((hw, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-lg bg-white border border-[#240d2b]/[0.08] text-[#240d2b]/80 shadow-2xs"
                        >
                          {hw}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Software Stacks */}
                  <div className="p-4 rounded-2xl bg-[#f6f3ee] border border-[#240d2b]/[0.06] space-y-2">
                    <span className="font-bold text-[#240d2b] uppercase tracking-wider block text-[11px]">
                      Software &amp; Neural Compute Stacks
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {domainDetails[selectedDomain.id].software.map((sw, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-lg bg-white border border-[#240d2b]/[0.08] text-[#240d2b]/80 shadow-2xs"
                        >
                          {sw}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Representative Platforms */}
                  <div className="p-4 rounded-2xl bg-[#f6f3ee] border border-[#240d2b]/[0.06] space-y-2">
                    <span className="font-bold text-[#240d2b] uppercase tracking-wider block text-[11px]">
                      Active Platforms &amp; R&amp;D
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {domainDetails[selectedDomain.id].platforms.map((p, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-lg bg-[#240d2b] text-[#f6f3ee] font-medium"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Performance Metric */}
                  <div className="p-3 rounded-xl bg-[#ff6b35]/10 border border-[#ff6b35]/20 flex items-center justify-between text-[11px]">
                    <span className="text-[#240d2b]/60">Operational Target:</span>
                    <span className="font-bold text-[#ff6b35]">
                      {domainDetails[selectedDomain.id].benchmarks}
                    </span>
                  </div>
                </div>
              )}

              {/* Action Buttons: Copy Stack & Done */}
              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={handleCopyStack}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-[#240d2b]/70 hover:text-[#ff6b35] cursor-pointer"
                >
                  {copiedStack ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Copied Stack to Clipboard</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Technical Stack</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => setSelectedDomain(null)}
                  className="py-2.5 px-6 rounded-full text-xs font-medium bg-[#240d2b] text-white hover:bg-[#3b1646] transition-all cursor-pointer shadow-md hover:scale-102"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default About;
