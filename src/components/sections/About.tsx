"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Cpu,
  Eye,
  Navigation,
  ArrowUpRight,
  X,
  Check,
  Copy,
  Calendar,
  Sparkles,
  Zap,
  Activity,
  Layers,
  Radio,
  ArrowRight,
  CheckCircle2,
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
  missionObjective: string;
  fieldDeployment: string;
  telemetryMetric: string;
}

export interface ArchitectureNode {
  id: string;
  step: string;
  title: string;
  subsystem: string;
  chipset: string;
  protocol: string;
  latencyBudget: string;
  rosTopic: string;
  description: string;
  verifiedMetric: string;
}

export const ARCHITECTURE_PIPELINE: ArchitectureNode[] = [
  {
    id: "sensing",
    step: "01",
    title: "Tactical Sensor Rig",
    subsystem: "Perception & Spatial Mapping",
    chipset: "Slamtec RPLIDAR S2 + RealSense D435i",
    protocol: "USB 3.0 / UART 1Mbaud",
    latencyBudget: "< 11ms acquisition",
    rosTopic: "/scan & /camera/depth/image_rect_raw",
    description:
      "360° laser time-of-flight ranging up to 30m paired with stereo infrared depth streaming at 90 FPS.",
    verifiedMetric: "32,000 range points/s @ 0.05m accuracy",
  },
  {
    id: "neural",
    step: "02",
    title: "Edge Neural Inference",
    subsystem: "AI Vision Clustering",
    chipset: "NVIDIA Jetson Orin Nano (40 TOPS)",
    protocol: "PCIe Gen4 / TensorRT Engine",
    latencyBudget: "12.8ms / 78.1 FPS",
    rosTopic: "/yolo/detections & /target_poses",
    description:
      "Hardware-accelerated YOLOv8 FP16 model detecting arena obstacles, adversary bots, and gate waypoints.",
    verifiedMetric: "Sub-14ms YOLOv8 edge inference at 14.2W TDP",
  },
  {
    id: "fusion",
    step: "03",
    title: "Dual-EKF Sensor Fusion",
    subsystem: "Localization & State Estimation",
    chipset: "BNO085 9-DOF IMU + Optical Flow",
    protocol: "SPI 40MHz / I2C Fast-Mode+",
    latencyBudget: "< 2.0ms filter loop",
    rosTopic: "/odometry/filtered & /tf",
    description:
      "Extended Kalman Filter fusing wheel tick counts, high-G accelerometer drift correction, and visual odometry.",
    verifiedMetric: "Sub-1.8cm cumulative position drift per 10m",
  },
  {
    id: "planning",
    step: "04",
    title: "Nav2 Trajectory Planner",
    subsystem: "Autonomous Navigation",
    chipset: "Quad-Core ARM Cortex-A78AE",
    protocol: "Micro-XRCE-DDS / ROS2 Humble",
    latencyBudget: "18ms replan cycle",
    rosTopic: "/cmd_vel & /plan",
    description:
      "TEB local planner computing smooth dynamic velocity vectors with active non-holonomic obstacle inflation.",
    verifiedMetric: "Real-time obstacle avoidance at 2.4 m/s",
  },
  {
    id: "actuation",
    step: "05",
    title: "40kHz Field-Oriented Control",
    subsystem: "Power & Motor Drive",
    chipset: "STM32H7 + TI DRV8301 Gate Drivers",
    protocol: "CAN-FD 5Mbps / Space Vector PWM",
    latencyBudget: "< 25μs current loop",
    rosTopic: "/motor_status/telemetry",
    description:
      "Closed-loop 48V FOC BLDC commutating high-torque drive motors with active regenerative braking.",
    verifiedMetric: "95A peak burst current with 40kHz PWM ripple",
  },
];

const cearMilestones: Milestone[] = [
  {
    year: "2020",
    phase: "Genesis",
    title: "Inception & Lab 104 Robotics Wing",
    description:
      "Founded by visionaries at Army Institute of Technology, Pune to build an indigenous hands-on hardware incubator for combat mechatronics and control circuits.",
    achievements: ["Established Lab 104", "First Combat Cadre", "Custom STM32 Motor Drives"],
    techStack: ["FreeRTOS", "STM32", "Altium", "FDM 3D"],
    missionObjective: "Establish indigenous rapid prototyping test cell and dual-motor combat drive systems.",
    fieldDeployment: "Lab 104 Hardware Incubator, AIT Pune",
    telemetryMetric: "100% in-house power distribution and firmware verification",
  },
  {
    year: "2022",
    phase: "Expansion",
    title: "Aquatic Robotics & Aerial Test Cells",
    description:
      "Pioneered aquatic underwater robotics, designing the award-winning Jalpari AUV platform which secured 3rd Position and Unique Design honours at IIT Guwahati Techniche.",
    achievements: ["IIT Guwahati Podium", "Sub-surface Telemetry", "FPV Drone Racing Team"],
    techStack: ["T200 Thrusters", "Hydrodynamics", "Pixhawk", "MAVLink"],
    missionObjective: "Sub-surface autonomous navigation, depth control loop, and buoyancy stabilization.",
    fieldDeployment: "Techniche National Arena, IIT Guwahati & AIT Testing Tank",
    telemetryMetric: "3m hydrostatic depth seal rating and acoustic ping telemetry",
  },
  {
    year: "2024",
    phase: "National Arena",
    title: "Wartech Flagship Championship Inauguration",
    description:
      "Created the premier national robotics battleground in Western India, hosting 8 competition disciplines ranging from Robo Soccer and 15kg Robowar to Micromouse mazes.",
    achievements: ["50+ Inter-Collegiate Teams", "₹1.5L+ Prize Pool", "8 Battle Arenas"],
    techStack: ["RF 2.4GHz", "High-Voltage LiPo", "Autonomous Dohyo"],
    missionObjective: "Scale Western India's largest robotics proving ground with high-voltage combat safety specs.",
    fieldDeployment: "AIT Central Grounds & Manekshaw Arena",
    telemetryMetric: "50+ competing teams across 8 simultaneous engineering arenas",
  },
  {
    year: "2026",
    phase: "Frontier",
    title: "Swarm Autonomy & Edge Neural Compute",
    description:
      "Deploying decentralized robotic swarms, multi-agent SLAM, and TensorRT neural networks on Jetson Orin Nano accelerators for next-generation defense applications.",
    achievements: ["Sub-14ms YOLOv8 Inference", "GPS-Denied Visual SLAM", "Swarm Coordination"],
    techStack: ["ROS2 Humble", "Jetson Orin", "YOLOv8", "RealSense Depth"],
    missionObjective: "Decentralized tactical edge perception, vision-inertial odometry, and swarm mesh relays.",
    fieldDeployment: "CEAR Tactical Proving Grounds, Lab 104 Robotics Wing",
    telemetryMetric: "< 14ms edge inference latency at 1080p stream resolution",
  },
  {
    year: "2027+",
    phase: "Horizon",
    title: "Autonomous Tactical Swarms & Defense Quadruped Platforms",
    description:
      "Next-frontier defense R&D targeting heterogeneous multi-agent swarm coordination across land, air, and aquatic battle domains, featuring bio-inspired quadruped scout robots.",
    achievements: ["Heterogeneous Swarm Relays", "Bio-inspired Quadruped Actuation", "Sub-Surface UUV Swarm Mesh"],
    techStack: ["Micro-RTPS Swarms", "Direct Drive BLDC", "Reinforcement Learning", "Ultra-Wideband Mesh"],
    missionObjective: "Decentralized autonomous search-and-recon swarms operational in GPS-denied contested environments.",
    fieldDeployment: "AIT Advanced Proving Ground & Defense Incubation Cell",
    telemetryMetric: "16-node swarm mesh coordination with sub-10ms inter-agent sync",
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
  const [milestonePhaseFilter, setMilestonePhaseFilter] = useState<string>("ALL");
  const [copiedMilestone, setCopiedMilestone] = useState(false);

  // Subsystem Signal-Flow Architecture State
  const [activeArchNodeId, setActiveArchNodeId] = useState<string>("sensing");
  const [copiedArchSpecs, setCopiedArchSpecs] = useState(false);

  // Close domain modal with Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedDomain) {
        setSelectedDomain(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedDomain]);

  const filteredMilestones = useMemo(() => {
    if (milestonePhaseFilter === "ALL") return cearMilestones;
    return cearMilestones.filter((m) => m.phase.toUpperCase() === milestonePhaseFilter.toUpperCase());
  }, [milestonePhaseFilter]);

  const selectedMilestone = useMemo(
    () => cearMilestones.find((m) => m.year === activeMilestoneYear) || cearMilestones[3],
    [activeMilestoneYear]
  );

  const activeArchNode = useMemo(
    () => ARCHITECTURE_PIPELINE.find((n) => n.id === activeArchNodeId) || ARCHITECTURE_PIPELINE[0],
    [activeArchNodeId]
  );

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

  const handleCopyMilestoneDossier = () => {
    if (!selectedMilestone) return;
    const dossierText = `CEAR STRATEGIC MILESTONE // ${selectedMilestone.year} (${selectedMilestone.phase})
Title: ${selectedMilestone.title}
Deployment: ${selectedMilestone.fieldDeployment}
Mission Objective: ${selectedMilestone.missionObjective}
Telemetry Benchmark: ${selectedMilestone.telemetryMetric}
Key Breakthroughs:
${selectedMilestone.achievements.map((a) => `- ${a}`).join("\n")}
Tech Stacks: ${selectedMilestone.techStack.join(", ")}`;
    navigator.clipboard.writeText(dossierText);
    setCopiedMilestone(true);
    setTimeout(() => setCopiedMilestone(false), 2000);
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
              2020 Foundation &bull; 2026 Swarms &bull; 2027+ Defense Horizon
            </p>
          </div>

          {/* Strategic Milestone Phase Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {["ALL", "Genesis", "Expansion", "National Arena", "Frontier", "Horizon"].map((phase) => {
              const isActive = milestonePhaseFilter === phase;
              return (
                <button
                  key={phase}
                  onClick={() => setMilestonePhaseFilter(phase)}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#ff6b35] text-white font-bold shadow-xs"
                      : "bg-white/80 hover:bg-white text-[#240d2b]/70 border border-white/90"
                  }`}
                >
                  {phase === "ALL" ? "All Strategic Phases" : phase}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {filteredMilestones.map((m) => {
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

          {/* Active Milestone Deep-Dive Dossier Telemetry Panel */}
          {selectedMilestone && (
            <motion.div
              key={selectedMilestone.year}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="p-6 sm:p-8 rounded-3xl bg-white/80 backdrop-blur-2xl border border-white/90 shadow-[0_15px_40px_rgba(36,13,43,0.06)] space-y-5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#240d2b]/[0.08] pb-4">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-[#ff6b35] font-semibold bg-[#ff6b35]/10 px-2.5 py-0.5 rounded-full border border-[#ff6b35]/20">
                      {selectedMilestone.phase} Phase &bull; {selectedMilestone.year}
                    </span>
                    <span className="text-xs font-mono text-[#240d2b]/50">
                      Deployment: {selectedMilestone.fieldDeployment}
                    </span>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold font-display text-[#240d2b] mt-1.5">
                    {selectedMilestone.title}
                  </h4>
                </div>

                <button
                  onClick={handleCopyMilestoneDossier}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono text-[#240d2b]/70 hover:text-[#ff6b35] border border-[#240d2b]/[0.1] bg-white hover:bg-[#f6f3ee] transition-all cursor-pointer shadow-2xs shrink-0 self-start sm:self-center"
                >
                  {copiedMilestone ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Copied Dossier</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Milestone Dossier</span>
                    </>
                  )}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
                <div className="p-4 rounded-2xl bg-[#f6f3ee] border border-[#240d2b]/[0.06] space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-[#240d2b]/50 block">
                    Strategic Objective
                  </span>
                  <p className="font-body text-[#240d2b]/80 leading-relaxed">
                    {selectedMilestone.missionObjective}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#f6f3ee] border border-[#240d2b]/[0.06] space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-[#240d2b]/50 block">
                    Telemetry Benchmark
                  </span>
                  <p className="font-semibold text-[#ff6b35] font-mono leading-relaxed">
                    {selectedMilestone.telemetryMetric}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#f6f3ee] border border-[#240d2b]/[0.06] space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-[#240d2b]/50 block">
                    Verified Breakthroughs
                  </span>
                  <div className="space-y-1">
                    {selectedMilestone.achievements.map((ach, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-[#240d2b]/80">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b35]" />
                        <span>{ach}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
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

        {/* ================= INTERACTIVE EMBEDDED AUTONOMY PIPELINE ================= */}
        <div className="space-y-8 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#240d2b]/[0.08] pb-6">
            <div>
              <span className="text-xs font-mono tracking-widest uppercase text-[#ff6b35] font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>02 // Signal-Flow Architecture</span>
              </span>
              <h3 className="text-2xl sm:text-3xl font-black font-display text-[#240d2b] tracking-tight mt-1">
                End-to-End Embedded Autonomy Pipeline
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#240d2b]/60 font-mono">
              From Raw Photons &bull; Dual-EKF Fusion &bull; 40kHz FOC Actuation
            </p>
          </div>

          {/* 5-Step Pipeline Flow Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {ARCHITECTURE_PIPELINE.map((node) => {
              const isSelected = activeArchNodeId === node.id;
              return (
                <button
                  key={node.id}
                  onClick={() => setActiveArchNodeId(node.id)}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden group ${
                    isSelected
                      ? "bg-[#240d2b] text-white border-[#240d2b] shadow-md ring-2 ring-[#ff6b35]"
                      : "bg-white/80 hover:bg-white text-[#240d2b] border-white/90 hover:border-[#ff6b35]/40"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-md font-bold ${
                        isSelected
                          ? "bg-[#ff6b35] text-white"
                          : "bg-[#240d2b]/10 text-[#240d2b] group-hover:bg-[#ff6b35]/15 group-hover:text-[#ff6b35]"
                      }`}
                    >
                      STAGE {node.step}
                    </span>
                    <span
                      className={`text-[9px] font-mono ${
                        isSelected ? "text-white/60" : "text-[#240d2b]/40"
                      }`}
                    >
                      {node.latencyBudget}
                    </span>
                  </div>

                  <h5 className="font-display font-bold text-sm tracking-tight truncate">
                    {node.title}
                  </h5>
                  <p
                    className={`text-[11px] font-mono truncate mt-0.5 ${
                      isSelected ? "text-white/70" : "text-[#240d2b]/60"
                    }`}
                  >
                    {node.subsystem}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Active Node Detail Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white/85 backdrop-blur-2xl border border-white/90 shadow-[0_15px_40px_rgba(36,13,43,0.06)] space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#240d2b]/[0.08] pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#ff6b35]/15 text-[#ff6b35] font-bold border border-[#ff6b35]/20">
                    Stage {activeArchNode.step} &bull; {activeArchNode.subsystem}
                  </span>
                  <span className="text-xs font-mono text-emerald-700 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    ACTIVE ARCHITECTURE
                  </span>
                </div>
                <h4 className="text-xl sm:text-2xl font-bold font-display text-[#240d2b] tracking-tight mt-1.5">
                  {activeArchNode.title}
                </h4>
              </div>

              <button
                onClick={() => {
                  const archText = `[CEAR EMBEDDED ARCHITECTURE]
Stage: ${activeArchNode.step} - ${activeArchNode.title}
Subsystem: ${activeArchNode.subsystem}
Chipset: ${activeArchNode.chipset}
Bus Protocol: ${activeArchNode.protocol}
Latency Budget: ${activeArchNode.latencyBudget}
ROS2 Topic: ${activeArchNode.rosTopic}
Benchmark: ${activeArchNode.verifiedMetric}
Rationale: ${activeArchNode.description}`;
                  navigator.clipboard?.writeText(archText);
                  setCopiedArchSpecs(true);
                  setTimeout(() => setCopiedArchSpecs(false), 2400);
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono text-[#240d2b]/70 hover:text-[#ff6b35] border border-[#240d2b]/[0.1] bg-white hover:bg-[#f6f3ee] transition-all cursor-pointer shadow-2xs self-start sm:self-center"
              >
                {copiedArchSpecs ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copied Specs</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Architecture Specs</span>
                  </>
                )}
              </button>
            </div>

            {/* Parameter Matrix (4 Boxes) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
              <div className="p-4 rounded-2xl bg-[#f6f3ee] border border-[#240d2b]/[0.06] space-y-1">
                <span className="text-[10px] text-[#240d2b]/50 uppercase font-bold block">
                  Processing Silicon
                </span>
                <span className="font-bold text-[#240d2b] block">{activeArchNode.chipset}</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#f6f3ee] border border-[#240d2b]/[0.06] space-y-1">
                <span className="text-[10px] text-[#240d2b]/50 uppercase font-bold block">
                  Bus / Serial Protocol
                </span>
                <span className="font-bold text-[#ff6b35] block">{activeArchNode.protocol}</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#f6f3ee] border border-[#240d2b]/[0.06] space-y-1">
                <span className="text-[10px] text-[#240d2b]/50 uppercase font-bold block">
                  Loop Latency Budget
                </span>
                <span className="font-bold text-emerald-700 block">{activeArchNode.latencyBudget}</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#f6f3ee] border border-[#240d2b]/[0.06] space-y-1">
                <span className="text-[10px] text-[#240d2b]/50 uppercase font-bold block">
                  Active ROS2 Topic
                </span>
                <span className="font-bold text-[#240d2b] truncate block">{activeArchNode.rosTopic}</span>
              </div>
            </div>

            {/* Description & Benchmark */}
            <div className="p-4 rounded-2xl bg-[#f6f3ee]/60 border border-[#240d2b]/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <p className="font-body text-[#240d2b]/80 leading-relaxed max-w-2xl">
                {activeArchNode.description}
              </p>
              <div className="shrink-0 font-mono text-[11px] text-[#ff6b35] bg-[#ff6b35]/10 px-3 py-1.5 rounded-xl border border-[#ff6b35]/20 font-semibold">
                &bull; {activeArchNode.verifiedMetric}
              </div>
            </div>
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
