"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileCode2,
  Cpu,
  Layers,
  Zap,
  Activity,
  ArrowUpRight,
  Download,
  Share2,
  Check,
  X,
  Search,
  BookOpen,
  Sparkles,
  BarChart2,
  Microchip,
  GitBranch,
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

export interface ResearchPaper {
  id: string;
  bulletinId: string;
  title: string;
  shortTitle: string;
  authors: string[];
  department: string;
  domain: "Edge AI" | "Marine Systems" | "SLAM & Navigation" | "Power Electronics";
  abstract: string;
  metrics: { label: string; value: string; highlight?: boolean }[];
  hardwareStack: string[];
  firmwareStack: string[];
  keyFindings: string[];
  benchmarkComparison: { parameter: string; standardBaseline: string; cearAchievement: string }[];
  date: string;
  status: "Peer Reviewed" | "Lab Tested" | "Deployed in Field";
}

const researchPapers: ResearchPaper[] = [
  {
    id: "tb-26-01",
    bulletinId: "TB-26-01",
    title: "Sub-14ms Real-Time YOLOv8 Edge Inference for Tactical Target Classification on NVIDIA Jetson Orin Nano",
    shortTitle: "YOLOv8 Edge Inference on Jetson",
    authors: ["CEAR Vision Cadre", "Dept. of Computer Engineering"],
    department: "Army Institute of Technology, Pune",
    domain: "Edge AI",
    date: "August 2026",
    status: "Deployed in Field",
    abstract:
      "This technical bulletin establishes an ultra-low latency vision inference pipeline tailored for resource-constrained edge platforms. By leveraging TensorRT FP16 post-training quantization, zero-copy pinned host-device memory mapping, and asynchronous GStreamer CUDA pipelines, our system achieves sustained 72.4 FPS target detection under 15W TDP constraints.",
    metrics: [
      { label: "INFERENCE TIME", value: "11.8 ms", highlight: true },
      { label: "THROUGHPUT", value: "72.4 FPS", highlight: true },
      { label: "ACCURACY (mAP50)", value: "94.2%" },
      { label: "TDP POWER DRAW", value: "14.2 W" },
    ],
    hardwareStack: [
      "NVIDIA Jetson Orin Nano 8GB (40 TOPS INT8)",
      "Sony IMX477 MIPI-CSI Camera Module with IR-Cut Filter",
      "Custom 12V-to-5V 6A High-Efficiency Buck Regulator",
    ],
    firmwareStack: [
      "TensorRT 8.6 with FP16 Execution Providers",
      "PyTorch 2.3 with CUDA 12.2 Stream Queues",
      "GStreamer Hardware NVMM Acceleration Pipeline",
    ],
    keyFindings: [
      "TensorRT FP16 quantization reduced latency by 3.4x compared to vanilla PyTorch with negligible 0.8% loss in mean average precision.",
      "Asynchronous DMA pinned memory transfers decoupled frame capture latency from model execution, preventing frame tearing at high vehicle velocities.",
      "Sub-14ms response enables direct hardware PID steering loops for autonomous interceptors without trajectory overshoot.",
    ],
    benchmarkComparison: [
      { parameter: "Frame Latency", standardBaseline: "38.5 ms (CPU PyTorch)", cearAchievement: "11.8 ms (TensorRT FP16)" },
      { parameter: "Memory Footprint", standardBaseline: "2.4 GB VRAM", cearAchievement: "820 MB Pinned VRAM" },
      { parameter: "Sustained FPS", standardBaseline: "26.0 FPS", cearAchievement: "72.4 FPS" },
    ],
  },
  {
    id: "tb-26-02",
    bulletinId: "TB-26-02",
    title: "Hydrodynamic Stabilization & Active Compressed-Air Ballast Architecture for Jalpari Autonomous Underwater Vehicle",
    shortTitle: "Jalpari Hydrodynamics & Ballast",
    authors: ["CEAR Marine Systems Cadre", "Dept. of Mechanical Engineering"],
    department: "Army Institute of Technology, Pune",
    domain: "Marine Systems",
    date: "September 2026",
    status: "Lab Tested",
    abstract:
      "Autonomous underwater operations demand rapid hydrostatic ballast correction in variable-salinity waters. This bulletin presents Jalpari's dual-chamber variable buoyancy system (VBS), combining a micro-compressor with differential pressure sensing to achieve neutral buoyancy retention within ±0.05m and pitch recovery in under 1.2 seconds.",
    metrics: [
      { label: "DEPTH RATING", value: "45 Meters", highlight: true },
      { label: "BUOYANCY DRIFT", value: "±0.05 m", highlight: true },
      { label: "PITCH RECOVERY", value: "<1.2 sec" },
      { label: "SURFACE PURGE", value: "3.4 sec" },
    ],
    hardwareStack: [
      "Anodized 6061-T6 Aluminum Pressure Vessel with Viton O-Rings",
      "Honeywell 150 PSI High-Precision Pressure Transducer Array",
      "12V High-Pressure Diaphragm Micro-Pneumatic Compressor",
      "Brushless Magnetic-Coupled Thrusters (BlueRobotics T200)",
    ],
    firmwareStack: [
      "FreeRTOS Dual-Core ESP32-S3 Depth Regulation Task",
      "PID Hydrostatic Ballast Equilibrium Loop (50 Hz)",
      "Failsafe Overpressure Valve Trigger with Hardware Interlock",
    ],
    keyFindings: [
      "Dual-chamber design prevents single-point seal failure and isolates pneumatic high-pressure circuits from avionics bays.",
      "Variable ballast trim allows the vehicle to rest neutrally buoyant at depth without thruster power consumption, extending mission runtime by 42%.",
      "Active pitching thrusters coupled with ballast weight shifting enables emergency ascent even in total propulsion failure scenarios.",
    ],
    benchmarkComparison: [
      { parameter: "Depth Regulation", standardBaseline: "±0.35 m", cearAchievement: "±0.05 m" },
      { parameter: "Standby Power at Depth", standardBaseline: "45 W (Thruster Station-Keep)", cearAchievement: "3.2 W (Neutral Ballast)" },
      { parameter: "Emergency Ascent Speed", standardBaseline: "0.4 m/s", cearAchievement: "1.2 m/s (Fast Purge)" },
    ],
  },
  {
    id: "tb-26-03",
    bulletinId: "TB-26-03",
    title: "Distributed Micro-RTPS ROS2 Humble SLAM & Dual-EKF Sensor Fusion for GPS-Denied Subterranean Mapping",
    shortTitle: "ROS2 Distributed SLAM & Odometry",
    authors: ["CEAR Navigation Cadre", "Dept. of Electronics & Telecommunication"],
    department: "Army Institute of Technology, Pune",
    domain: "SLAM & Navigation",
    date: "October 2026",
    status: "Peer Reviewed",
    abstract:
      "Navigation across subterranean passages and reinforced bunkers prohibits satellite positioning. We demonstrate a distributed ROS2 Humble mapping framework employing dual Extended Kalman Filter (EKF) sensor fusion between high-rate IMU wheel odometry and 3D LiDAR point clouds, achieving sub-3.5cm trajectory loop closure drift across a 200m underground course.",
    metrics: [
      { label: "LOOP CLOSURE DRIFT", value: "<3.2 cm / 100m", highlight: true },
      { label: "EKF UPDATE RATE", value: "100 Hz", highlight: true },
      { label: "OCTOMAP RESOLUTION", value: "2.5 cm" },
      { label: "NETWORK LATENCY", value: "1.4 ms (DDS)" },
    ],
    hardwareStack: [
      "Livox Mid-360 Solid-State 3D LiDAR",
      "RPLiDAR S2 360-Degree 2D Planar Scanner",
      "Microstrain 3DM-GX5 Tactical Grade AHRS 9-DOF IMU",
      "Raspberry Pi Compute Module 4 with Carrier Board",
    ],
    firmwareStack: [
      "ROS2 Humble Hawksbill with FastDDS Micro-RTPS",
      "Robot Localization Dual-EKF State Estimator",
      "RTAB-Map 3D Loop Closure & Point Cloud Octree Pipeline",
    ],
    keyFindings: [
      "Decoupling high-frequency IMU integration (100Hz) from low-frequency scan matching (10Hz) eliminated trajectory oscillation during abrupt turns.",
      "Micro-RTPS message serialization over serial CAN bus reduced inter-process latency to 1.4ms without Ethernet switch overhead.",
      "Real-time Octomap compression allowed full 3D subterranean terrain point clouds to fit within 45MB onboard cache.",
    ],
    benchmarkComparison: [
      { parameter: "Drift Error / 100m", standardBaseline: "14.2 cm (Standard Gmapping)", cearAchievement: "3.2 cm (Dual EKF + RTAB)" },
      { parameter: "Update Frequency", standardBaseline: "20 Hz", cearAchievement: "100 Hz Continuous EKF" },
      { parameter: "Recovery after Slip", standardBaseline: "Loss of Tracking", cearAchievement: "Instant Covariance Reset" },
    ],
  },
  {
    id: "tb-26-04",
    bulletinId: "TB-26-04",
    title: "High-Density 48V/60A Field-Oriented Control (FOC) BLDC Motor Driver for High-Impact Combat Robotics",
    shortTitle: "48V/60A FOC Combat Driver",
    authors: ["CEAR Hardware Craft Cadre", "Dept. of Mechanical & Electrical"],
    department: "Army Institute of Technology, Pune",
    domain: "Power Electronics",
    date: "October 2026",
    status: "Lab Tested",
    abstract:
      "Combat robotics weapon systems experience violent deceleration shocks upon weapon impact, inducing extreme back-EMF voltage spikes and rotor desynchronization. This bulletin details CEAR's proprietary 48V/60A discrete FOC motor driver incorporating active phase shunts, TVS clamp banks, and STM32G4 hardware CORDIC acceleration for sub-25μs current loop response.",
    metrics: [
      { label: "BURST CURRENT", value: "95 A Peak", highlight: true },
      { label: "PWM FREQUENCY", value: "40 kHz FOC", highlight: true },
      { label: "MAX VOLTAGE", value: "60 VDC (14S LiPo)" },
      { label: "MOSFET RDS(ON)", value: "1.4 mΩ" },
    ],
    hardwareStack: [
      "Infineon OptiMOS 5 80V N-Channel MOSFETs (BSC014N08NS5)",
      "Texas Instruments DRV8323 3-Phase Smart Gate Driver",
      "STM32G474 Microcontroller with Hardware Math Coprocessor",
      "4-Layer 2oz Copper PCB with Heavy Thermal Vias",
    ],
    firmwareStack: [
      "Custom Space Vector PWM (SVPWM) FOC Firmware",
      "Cycle-by-Cycle Hardware Current Limit Interlock",
      "Isolated CAN 2.0B / CAN-FD Command Interface",
    ],
    keyFindings: [
      "Space vector modulation yielded 15% higher bus voltage utilization compared to traditional sinusoidal trapezoidal commutation.",
      "Hardware CORDIC coprocessor resolved Clark/Park transformations in 18 clock cycles, unlocking 40kHz PWM carrier frequency without CPU throttling.",
      "TVS protection absorbed 85V weapon stall inductive discharge with zero MOSFET gate puncture over 50 consecutive impact tests.",
    ],
    benchmarkComparison: [
      { parameter: "Torque Ripple", standardBaseline: "18.5% (Trapezoidal)", cearAchievement: "2.1% (Field-Oriented Control)" },
      { parameter: "Thermal Dissipation @ 40A", standardBaseline: "78°C Case Temp", cearAchievement: "43°C (OptiMOS 5 + Al Heatsink)" },
      { parameter: "Stall Recovery Time", standardBaseline: "Trip / Shutdown", cearAchievement: "<25 μs Current Squeeze" },
    ],
  },
];

export function ResearchWhitepapers() {
  const [selectedPaper, setSelectedPaper] = useState<ResearchPaper | null>(null);
  const [selectedDomain, setSelectedDomain] = useState<string>("all");
  const [copiedPaperId, setCopiedPaperId] = useState<string | null>(null);

  const filteredPapers = researchPapers.filter((paper) => {
    if (selectedDomain === "all") return true;
    return paper.domain === selectedDomain;
  });

  const handleCopyCitation = (paper: ResearchPaper, e: React.MouseEvent) => {
    e.stopPropagation();
    const citation = `CEAR AIT Engineering Cadre. (${paper.date}). ${paper.title}. Technical Bulletin ${paper.bulletinId}, Centre of Excellence for AI & Robotics, Army Institute of Technology, Pune.`;
    navigator.clipboard?.writeText(citation);
    setCopiedPaperId(paper.id);
    setTimeout(() => setCopiedPaperId(null), 2500);
  };

  return (
    <section id="research" className="relative py-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#240d2b]/[0.08] pb-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff6b35]/12 border border-[#ff6b35]/25 text-[#ff6b35] text-xs font-mono uppercase tracking-wider font-semibold shadow-xs">
              <BookOpen className="w-3.5 h-3.5" />
              <span>LAB 104 ENGINEERING REPOSITORY</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-[#240d2b]">
              Technical Bulletins &amp; Whitepapers
            </h2>
            <p className="text-sm sm:text-base text-[#240d2b]/75 font-body leading-relaxed">
              Open engineering reports, mathematical formulations, and hardware benchmarks developed by the CEAR undergraduate research cadre at AIT Pune.
            </p>
          </div>

          {/* Domain Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-full bg-white/70 border border-white/80 shadow-xs self-start md:self-auto">
            {[
              { id: "all", label: "All Papers (4)" },
              { id: "Edge AI", label: "Edge AI" },
              { id: "Marine Systems", label: "Marine" },
              { id: "SLAM & Navigation", label: "SLAM" },
              { id: "Power Electronics", label: "Power FOC" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedDomain(tab.id)}
                className={`px-3 py-1 rounded-full text-xs font-mono transition-all cursor-pointer ${
                  selectedDomain === tab.id
                    ? "bg-[#240d2b] text-white shadow-xs font-bold"
                    : "text-[#240d2b]/70 hover:text-[#240d2b] hover:bg-black/5"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Papers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPapers.map((paper) => (
            <GlassCard
              key={paper.id}
              spotlightColor="rgba(255, 107, 53, 0.15)"
              className="p-6 sm:p-7 flex flex-col justify-between group cursor-pointer"
              onClick={() => setSelectedPaper(paper)}
            >
              <div className="space-y-5">
                {/* Top Badge & Code */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-[#240d2b] text-white font-mono text-[10px] font-bold">
                      {paper.bulletinId}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#ff6b35]/10 text-[#ff6b35] border border-[#ff6b35]/20 font-mono text-[10px] font-semibold">
                      {paper.domain}
                    </span>
                  </div>

                  <span className="font-mono text-[11px] text-[#240d2b]/50">
                    {paper.date}
                  </span>
                </div>

                {/* Title */}
                <div>
                  <h3 className="text-lg sm:text-xl font-black font-display text-[#240d2b] group-hover:text-[#ff6b35] transition-colors leading-snug">
                    {paper.title}
                  </h3>
                  <p className="text-xs font-mono text-[#240d2b]/60 mt-1">
                    {paper.authors.join(" • ")}
                  </p>
                </div>

                {/* Abstract Preview */}
                <p className="text-xs sm:text-sm text-[#240d2b]/75 font-body leading-relaxed line-clamp-3">
                  {paper.abstract}
                </p>

                {/* Key Benchmark Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                  {paper.metrics.map((m, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-xl bg-white/70 border border-white/90 shadow-2xs"
                    >
                      <span className="text-[9px] font-mono uppercase text-[#240d2b]/50 block truncate">
                        {m.label}
                      </span>
                      <span
                        className={`text-xs sm:text-sm font-black font-mono mt-0.5 block ${
                          m.highlight ? "text-[#ff6b35]" : "text-[#240d2b]"
                        }`}
                      >
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-6 mt-6 border-t border-[#240d2b]/[0.08] flex items-center justify-between">
                <button
                  onClick={(e) => handleCopyCitation(paper, e)}
                  className="flex items-center gap-1.5 text-xs font-mono text-[#240d2b]/70 hover:text-[#240d2b] cursor-pointer"
                >
                  {copiedPaperId === paper.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-600 font-bold">Citation Copied</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Cite Report</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#ff6b35] group-hover:translate-x-1 transition-transform">
                  <span>Inspect Full Dossier</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Full Technical Whitepaper Inspection Modal */}
      <AnimatePresence>
        {selectedPaper && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPaper(null)}
              className="fixed inset-0 bg-[#240d2b]/65 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-3xl bg-white/95 backdrop-blur-2xl rounded-3xl border border-white/80 p-6 sm:p-10 shadow-2xl overflow-hidden max-h-[88vh] overflow-y-auto space-y-7"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between border-b border-[#240d2b]/[0.08] pb-5">
                <div className="space-y-1.5 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-[#240d2b] text-white font-mono text-[10px] font-bold">
                      {selectedPaper.bulletinId}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#ff6b35]/10 text-[#ff6b35] font-mono text-[10px] font-bold">
                      {selectedPaper.domain}
                    </span>
                    <span className="text-xs font-mono text-[#240d2b]/50">
                      {selectedPaper.date} &bull; {selectedPaper.status}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black font-display text-[#240d2b] leading-tight">
                    {selectedPaper.title}
                  </h3>
                  <p className="text-xs font-mono text-[#240d2b]/60">
                    Authors: {selectedPaper.authors.join(", ")} &bull; {selectedPaper.department}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedPaper(null)}
                  className="p-1.5 rounded-full text-[#240d2b]/40 hover:text-[#240d2b] hover:bg-black/5 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Abstract */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#ff6b35]">
                  Executive Abstract &amp; Problem Statement
                </h4>
                <p className="text-sm font-body text-[#240d2b]/80 leading-relaxed bg-[#f6f3ee]/80 p-4 rounded-2xl border border-[#240d2b]/[0.06]">
                  {selectedPaper.abstract}
                </p>
              </div>

              {/* Benchmark Telemetry Comparison */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#240d2b]">
                  Empirical Benchmark &amp; Telemetry Differential
                </h4>
                <div className="rounded-2xl border border-[#240d2b]/10 overflow-hidden bg-white">
                  <table className="w-full text-left border-collapse text-xs font-mono">
                    <thead>
                      <tr className="bg-[#f6f3ee] border-b border-[#240d2b]/10 text-[#240d2b]/60 uppercase text-[10px]">
                        <th className="py-2.5 px-3.5">Parameter</th>
                        <th className="py-2.5 px-3.5">Standard Industry Baseline</th>
                        <th className="py-2.5 px-3.5 font-bold text-[#ff6b35]">CEAR Custom Architecture</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#240d2b]/[0.06]">
                      {selectedPaper.benchmarkComparison.map((bm, idx) => (
                        <tr key={idx} className="hover:bg-black/[0.02]">
                          <td className="py-2.5 px-3.5 font-bold text-[#240d2b]">{bm.parameter}</td>
                          <td className="py-2.5 px-3.5 text-[#240d2b]/60">{bm.standardBaseline}</td>
                          <td className="py-2.5 px-3.5 font-bold text-emerald-600 bg-emerald-500/[0.04]">
                            {bm.cearAchievement}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Hardware & Firmware Specifications */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[#f6f3ee]/80 border border-[#240d2b]/[0.06] space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#240d2b]">
                    <Cpu className="w-4 h-4 text-[#ff6b35]" />
                    <span>Hardware BOM &amp; Silicon</span>
                  </div>
                  <ul className="space-y-1.5 text-xs font-mono text-[#240d2b]/70">
                    {selectedPaper.hardwareStack.map((h, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-[#ff6b35] mt-0.5">&bull;</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-[#f6f3ee]/80 border border-[#240d2b]/[0.06] space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#240d2b]">
                    <FileCode2 className="w-4 h-4 text-[#240d2b]" />
                    <span>Firmware &amp; Software Stack</span>
                  </div>
                  <ul className="space-y-1.5 text-xs font-mono text-[#240d2b]/70">
                    {selectedPaper.firmwareStack.map((f, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-[#240d2b] mt-0.5">&bull;</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Key Architectural Findings */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#240d2b]">
                  Key Cadre Engineering Discoveries
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm font-body text-[#240d2b]/80">
                  {selectedPaper.keyFindings.map((finding, idx) => (
                    <li
                      key={idx}
                      className="p-3 rounded-xl bg-white border border-[#240d2b]/[0.08] flex items-start gap-2.5 shadow-2xs"
                    >
                      <Sparkles className="w-4 h-4 text-[#ff6b35] shrink-0 mt-0.5" />
                      <span>{finding}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Modal Footer Actions */}
              <div className="pt-5 border-t border-[#240d2b]/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  onClick={(e) => handleCopyCitation(selectedPaper, e)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs font-mono bg-white border border-[#240d2b]/15 text-[#240d2b] hover:bg-[#f6f3ee] transition-all cursor-pointer shadow-xs"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Copy BibTeX / APA Citation</span>
                </button>

                <button
                  onClick={() => {
                    const text = `[Technical Bulletin ${selectedPaper.bulletinId}] ${selectedPaper.title}\n\nAbstract:\n${selectedPaper.abstract}\n\nHardware Stack:\n${selectedPaper.hardwareStack.join("\n")}\n\nCEAR AIT Pune.`;
                    const blob = new Blob([text], { type: "text/plain" });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = `${selectedPaper.bulletinId}-CEAR-Technical-Dossier.txt`;
                    a.click();
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-bold text-white bg-[#ff6b35] hover:bg-[#fa5519] transition-all cursor-pointer shadow-[0_2px_12px_rgba(255,107,53,0.35)]"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Technical Dossier</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default ResearchWhitepapers;
