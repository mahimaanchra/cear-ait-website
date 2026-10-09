"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Camera,
  Layers,
  Play,
  Pause,
  ArrowRight,
  Sparkles,
  Grid3X3,
  SlidersHorizontal,
  Wrench,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  CheckCircle2,
  Cpu,
  ShieldCheck,
} from "lucide-react";
import { workshopGallery as defaultGallery, WorkshopMediaItem } from "@/data/siteData";
import { useSiteContent } from "@/context/SiteContentContext";
import { WordBlurReveal } from "@/components/ui/WordBlurReveal";
import { GlassCard } from "@/components/ui/GlassCard";

const categories = [
  "All Photos",
  "Club Room & Workbenches",
  "Fabrication Bay",
  "Bootcamps & Cadets",
  "Testing Arena",
];

interface EquipmentItem {
  id: string;
  name: string;
  category: "Electronics" | "Fabrication" | "AI Compute" | "Arena & Flight";
  status: "Online & Calibrated" | "Available for Cadets" | "Active R&D";
  bay: string;
  specs: string[];
  description: string;
}

const labEquipment: EquipmentItem[] = [
  {
    id: "eq-scopes",
    name: "Rigol & Keysight 4-Ch Digital Storage Oscilloscopes",
    category: "Electronics",
    status: "Online & Calibrated",
    bay: "Electronics Bench // Lab 104-A",
    specs: ["200 MHz Bandwidth", "1 GSa/s Sample Rate", "CAN / I2C / SPI Decoding"],
    description:
      "Multi-channel signal validation, PWM duty-cycle verification for brushless ESCs, and sensor ripple analysis.",
  },
  {
    id: "eq-soldering",
    name: "JBC High-Precision Micro-Soldering & Hot-Air Rework",
    category: "Electronics",
    status: "Available for Cadets",
    bay: "Electronics Bench // Lab 104-B",
    specs: ["0402 SMD Capable", "PID Thermal Control", "ESD-Safe Station"],
    description:
      "Rapid precision hand-assembly of custom surface-mount flight controller and motor driver boards.",
  },
  {
    id: "eq-3dprinters",
    name: "Bambu Lab X1-Carbon & Multi-Material FDM Array",
    category: "Fabrication",
    status: "Active R&D",
    bay: "Fabrication Bay // Lab 104-C",
    specs: ["Carbon-Fiber Nylon", "Dual-Gear Extruder", "Sub-0.1mm Resolution"],
    description:
      "High-strength mechanical enclosures, lightweight tactical quadcopter arms, and planetary gear housings.",
  },
  {
    id: "eq-pcbmill",
    name: "LPKF Precision Double-Sided PCB Prototype Mill",
    category: "Fabrication",
    status: "Online & Calibrated",
    bay: "Rapid Prototyping // Lab 104-D",
    specs: ["Sub-100um Track Clearance", "High-Speed Spindle (60k RPM)", "Dual-Sided Alignment"],
    description:
      "In-house turnaround of double-sided RF boards, power distribution buses, and sensor interface shields.",
  },
  {
    id: "eq-jetson",
    name: "NVIDIA Jetson Orin Nano & Edge Neural Accelerators",
    category: "AI Compute",
    status: "Active R&D",
    bay: "AI Workstation Cluster",
    specs: ["40 TOPS AI Compute", "TensorRT Engine", "PyTorch Mobile / ROS2"],
    description:
      "Real-time edge neural inference for autonomous obstacle clustering, visual SLAM, and target classification.",
  },
  {
    id: "eq-sensors",
    name: "Intel RealSense D435i Depth & Slamtec RPLIDAR S2",
    category: "AI Compute",
    status: "Available for Cadets",
    bay: "Perception Rigging Stand",
    specs: ["360° Laser SLAM", "90 FPS Stereo Depth", "Integrated 6-DOF IMU"],
    description:
      "Precision spatial mapping, 3D point cloud generation, and obstacle avoidance across indoor GPS-denied environments.",
  },
  {
    id: "eq-arena",
    name: "Enclosed Netted Drone Test Cage & Combat Dohyo",
    category: "Arena & Flight",
    status: "Online & Calibrated",
    bay: "Proving Ground Pit",
    specs: ["Safety-Netted Perimeter", "LED Air Gates", "Impact-Resistant Lexan"],
    description:
      "Indoor test flight envelope for autonomous micro-UAVs, robotic soccer skirmishes, and battle trials.",
  },
];

export function WorkshopAndLab() {
  const { workshopGallery } = useSiteContent();
  const currentGallery = workshopGallery && workshopGallery.length > 0 ? workshopGallery : defaultGallery;

  const [activeMainTab, setActiveMainTab] = useState<"gallery" | "equipment">("gallery");
  const [activeCategory, setActiveCategory] = useState("All Photos");
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<1 | -1>(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [viewMode, setViewMode] = useState<"slider" | "grid">("slider");
  const [isHoveringSlide, setIsHoveringSlide] = useState(false);
  const [lightboxZoom, setLightboxZoom] = useState<number>(1);

  // Filter gallery items
  const filteredPhotos =
    activeCategory === "All Photos"
      ? currentGallery
      : currentGallery.filter((item) => item.category === activeCategory);

  // Calculate count for each category
  const getCategoryCount = (cat: string) => {
    if (cat === "All Photos") return currentGallery.length;
    return currentGallery.filter((item) => item.category === cat).length;
  };

  // Keep slide index within bounds if filter changes
  useEffect(() => {
    setCurrentSlideIndex(0);
  }, [activeCategory]);

  // Reset zoom on photo change
  useEffect(() => {
    setLightboxZoom(1);
  }, [selectedPhotoIndex]);

  // Autoplay functionality for the sliding gallery
  useEffect(() => {
    if (!isAutoPlaying || isHoveringSlide || filteredPhotos.length <= 1 || viewMode !== "slider" || activeMainTab !== "gallery") return;

    const timer = setInterval(() => {
      setSlideDirection(1);
      setCurrentSlideIndex((prev) => (prev + 1) % filteredPhotos.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [isAutoPlaying, isHoveringSlide, filteredPhotos.length, viewMode, activeMainTab]);

  // Next / Prev slide handlers
  const handleNextSlide = useCallback(() => {
    if (filteredPhotos.length === 0) return;
    setSlideDirection(1);
    setCurrentSlideIndex((prev) => (prev + 1) % filteredPhotos.length);
  }, [filteredPhotos.length]);

  const handlePrevSlide = useCallback(() => {
    if (filteredPhotos.length === 0) return;
    setSlideDirection(-1);
    setCurrentSlideIndex((prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length);
  }, [filteredPhotos.length]);

  // Keyboard navigation for Lightbox and Slider
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPhotoIndex !== null) {
        if (e.key === "Escape") {
          setSelectedPhotoIndex(null);
        } else if (e.key === "ArrowLeft") {
          setSelectedPhotoIndex((prev) =>
            prev !== null && prev > 0 ? prev - 1 : filteredPhotos.length - 1
          );
        } else if (e.key === "ArrowRight") {
          setSelectedPhotoIndex((prev) =>
            prev !== null && prev < filteredPhotos.length - 1 ? prev + 1 : 0
          );
        } else if (e.key === "+" || e.key === "=") {
          setLightboxZoom((z) => Math.min(z + 0.5, 2.5));
        } else if (e.key === "-") {
          setLightboxZoom((z) => Math.max(z - 0.5, 1));
        }
      } else if (viewMode === "slider" && activeMainTab === "gallery") {
        if (e.key === "ArrowLeft") {
          handlePrevSlide();
        } else if (e.key === "ArrowRight") {
          handleNextSlide();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPhotoIndex, filteredPhotos.length, viewMode, activeMainTab, handleNextSlide, handlePrevSlide]);

  const activePhoto = filteredPhotos[currentSlideIndex] || filteredPhotos[0];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.96,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.35 },
        scale: { duration: 0.4 },
      },
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.96,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
      },
    }),
  };

  return (
    <section id="workshop" className="relative py-28 sm:py-36 bg-transparent overflow-hidden">
      {/* Background ambient light orbs */}
      <div className="absolute top-1/3 left-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#ff6b35]/10 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-[#240d2b]/05 to-transparent blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#240d2b]/[0.08] pb-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#240d2b]/60">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b35]" />
              <span>02 // Physical Workspace &amp; Facilities</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-[#240d2b] leading-[1.15]">
              <WordBlurReveal
                text="Lab 104, Fabrication Bay &amp; Testing Proving Grounds."
                highlightWords={["Lab", "104,", "Fabrication", "Proving", "Grounds."]}
                highlightClassName="text-[#240d2b] underline decoration-[#ff6b35] decoration-4 underline-offset-6"
              />
            </h2>

            <p className="text-sm sm:text-base text-[#240d2b]/70 font-body leading-relaxed max-w-2xl pt-1">
              Explore the real hardware nursery at Army Institute of Technology, Pune—where cadets solder multi-layer PCBs, 3D print custom robotic linkages, tune ROS2 nodes, and test combat platforms.
            </p>
          </div>

          {/* Section Main Toggle: Gallery Reel vs Equipment Tooling */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
            <div className="flex items-center p-1 rounded-full bg-white/80 backdrop-blur-md border border-[#240d2b]/[0.1] shadow-xs">
              <button
                onClick={() => setActiveMainTab("gallery")}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                  activeMainTab === "gallery"
                    ? "bg-[#240d2b] text-[#f6f3ee] font-medium shadow-xs"
                    : "text-[#240d2b]/60 hover:text-[#240d2b]"
                }`}
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Facilities Reel</span>
              </button>
              <button
                onClick={() => setActiveMainTab("equipment")}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                  activeMainTab === "equipment"
                    ? "bg-[#240d2b] text-[#f6f3ee] font-medium shadow-xs"
                    : "text-[#240d2b]/60 hover:text-[#240d2b]"
                }`}
              >
                <Wrench className="w-3.5 h-3.5" />
                <span>Lab Tooling ({labEquipment.length})</span>
              </button>
            </div>

            <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-[#240d2b]/60">
              <span className="px-3 py-1.5 rounded-full bg-white/70 backdrop-blur-sm border border-[#240d2b]/[0.08]">
                Lab 104 • E&amp;TC Wing
              </span>
            </div>
          </div>
        </div>

        {/* ================= MAIN TAB 1: GALLERY REEL ================= */}
        {activeMainTab === "gallery" && (
          <div className="space-y-8">
            {/* Category Filter Pills & Autoplay Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
              <div className="flex flex-wrap gap-2 font-mono text-xs">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
                      activeCategory === cat
                        ? "bg-[#240d2b] text-[#f6f3ee] shadow-sm font-medium"
                        : "bg-white/80 backdrop-blur-md text-[#240d2b]/70 border border-[#240d2b]/[0.08] hover:border-[#ff6b35]/40 hover:text-[#240d2b]"
                    }`}
                  >
                    <span>{cat}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        activeCategory === cat ? "bg-[#ff6b35] text-white" : "bg-[#240d2b]/10 text-[#240d2b]/70"
                      }`}
                    >
                      {getCategoryCount(cat)}
                    </span>
                  </button>
                ))}
              </div>

              {/* View Mode Toggle: Slider vs Bento Grid */}
              <div className="flex items-center gap-3">
                <div className="flex items-center p-1 rounded-full bg-white/80 backdrop-blur-md border border-[#240d2b]/[0.1] shadow-xs">
                  <button
                    onClick={() => setViewMode("slider")}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono transition-all cursor-pointer ${
                      viewMode === "slider"
                        ? "bg-[#240d2b] text-[#f6f3ee] font-medium shadow-xs"
                        : "text-[#240d2b]/60 hover:text-[#240d2b]"
                    }`}
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    <span>Slider</span>
                  </button>
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono transition-all cursor-pointer ${
                      viewMode === "grid"
                        ? "bg-[#240d2b] text-[#f6f3ee] font-medium shadow-xs"
                        : "text-[#240d2b]/60 hover:text-[#240d2b]"
                    }`}
                  >
                    <Grid3X3 className="w-3.5 h-3.5" />
                    <span>Bento</span>
                  </button>
                </div>

                {viewMode === "slider" && (
                  <button
                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-[#240d2b]/[0.1] text-[#240d2b]/70 hover:text-[#240d2b] transition-all cursor-pointer"
                    title={isAutoPlaying ? "Pause autoplay" : "Start autoplay"}
                  >
                    {isAutoPlaying ? (
                      <>
                        <Pause className="w-3 h-3 text-[#ff6b35]" />
                        <span className="hidden sm:inline">Auto</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3 h-3 text-[#240d2b]/60" />
                        <span className="hidden sm:inline">Play</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* 1. SLIDING GALLERY VIEW */}
            {viewMode === "slider" && activePhoto && (
              <div
                className="space-y-6"
                onMouseEnter={() => setIsHoveringSlide(true)}
                onMouseLeave={() => setIsHoveringSlide(false)}
              >
                {/* Main Interactive Glassmorphic Slider Card */}
                <div className="relative rounded-[32px] sm:rounded-[40px] overflow-hidden bg-white/70 backdrop-blur-2xl border border-white/80 shadow-[0_25px_60px_-15px_rgba(36,13,43,0.08)] p-3 sm:p-5">
                  <div className="relative aspect-[16/10] md:aspect-[21/9] w-full rounded-[24px] sm:rounded-[32px] overflow-hidden bg-[#240d2b] shadow-inner">
                    <AnimatePresence initial={false} custom={slideDirection} mode="wait">
                      <motion.div
                        key={activePhoto.id}
                        custom={slideDirection}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="absolute inset-0 w-full h-full"
                      >
                        <Image
                          src={activePhoto.imageUrl}
                          alt={activePhoto.title}
                          fill
                          priority
                          sizes="(max-width: 1200px) 100vw, 1200px"
                          className="object-cover"
                        />

                        {/* Dark gradient vignette overlays for contrast */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#240d2b]/95 via-[#240d2b]/40 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#240d2b]/70 via-transparent to-[#240d2b]/30" />

                        {/* Top Slide HUD */}
                        <div className="absolute top-4 sm:top-6 inset-x-4 sm:inset-x-8 flex items-center justify-between z-20 pointer-events-none">
                          <div className="flex items-center gap-2">
                            <span className="px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 text-white font-mono text-xs font-bold tracking-wider uppercase drop-shadow-md">
                              {activePhoto.badge}
                            </span>
                            <span className="hidden sm:inline-block px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-xl border border-white/10 text-white/80 font-mono text-xs">
                              {activePhoto.category}
                            </span>
                          </div>

                          <button
                            onClick={() => setSelectedPhotoIndex(currentSlideIndex)}
                            className="pointer-events-auto p-2.5 rounded-full bg-white/20 hover:bg-white/35 backdrop-blur-xl border border-white/40 text-white transition-all cursor-pointer shadow-lg hover:scale-105"
                            title="Expand Fullscreen & Inspect"
                          >
                            <Maximize2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Bottom Slide Content Glass Sheet */}
                        <div className="absolute bottom-4 sm:bottom-8 inset-x-4 sm:inset-x-8 z-20">
                          <div className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-white/15 backdrop-blur-2xl border border-white/25 text-white space-y-3 shadow-2xl max-w-4xl">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                              <h3 className="font-display text-xl sm:text-3xl font-black tracking-tight text-white drop-shadow-md">
                                {activePhoto.title}
                              </h3>
                            </div>

                            <p className="text-xs sm:text-sm text-white/90 font-body leading-relaxed max-w-3xl drop-shadow-sm line-clamp-2 sm:line-clamp-none">
                              {activePhoto.description}
                            </p>

                            {activePhoto.specs && activePhoto.specs.length > 0 && (
                              <div className="pt-2 flex flex-wrap gap-2">
                                {activePhoto.specs.map((spec, i) => (
                                  <span
                                    key={i}
                                    className="text-[11px] font-mono px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white font-medium"
                                  >
                                    {spec}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    {/* Left & Right Slide Controls */}
                    <button
                      onClick={handlePrevSlide}
                      className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-4 rounded-full bg-white/25 hover:bg-white/45 backdrop-blur-xl border border-white/40 text-white transition-all hover:scale-110 active:scale-95 shadow-xl cursor-pointer"
                      aria-label="Previous photo"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    <button
                      onClick={handleNextSlide}
                      className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-4 rounded-full bg-white/25 hover:bg-white/45 backdrop-blur-xl border border-white/40 text-white transition-all hover:scale-110 active:scale-95 shadow-xl cursor-pointer"
                      aria-label="Next photo"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Slider Progress Bar */}
                  {isAutoPlaying && !isHoveringSlide && (
                    <div className="w-full bg-[#240d2b]/[0.08] h-1 mt-3 rounded-full overflow-hidden">
                      <motion.div
                        key={currentSlideIndex}
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 4.5, ease: "linear" }}
                        className="h-full bg-[#ff6b35]"
                      />
                    </div>
                  )}
                </div>

                {/* Interactive Thumbnail Carousel Strip */}
                <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none pt-2">
                  {filteredPhotos.map((photo, idx) => {
                    const isActive = idx === currentSlideIndex;
                    return (
                      <button
                        key={photo.id}
                        onClick={() => {
                          setSlideDirection(idx > currentSlideIndex ? 1 : -1);
                          setCurrentSlideIndex(idx);
                        }}
                        className={`relative shrink-0 rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer ${
                          isActive
                            ? "w-36 sm:w-44 h-20 sm:h-24 ring-2 ring-[#ff6b35] shadow-lg scale-102"
                            : "w-28 sm:w-32 h-16 sm:h-20 opacity-60 hover:opacity-100 hover:scale-102"
                        }`}
                      >
                        <Image
                          src={photo.imageUrl}
                          alt={photo.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2">
                          <span className="text-[10px] font-mono text-white truncate font-medium">
                            {photo.badge}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 2. BENTO GRID VIEW */}
            {viewMode === "grid" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPhotos.map((photo, index) => (
                  <GlassCard
                    key={photo.id}
                    onClick={() => setSelectedPhotoIndex(index)}
                    className="group cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      {/* Photo Thumbnail */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-[#f6f3ee] mb-4">
                        <Image
                          src={photo.imageUrl}
                          alt={photo.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="text-[10px] font-mono tracking-wider uppercase px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-[#240d2b]/[0.08] text-[#240d2b] font-bold">
                            {photo.badge}
                          </span>
                        </div>

                        <div className="absolute inset-0 bg-[#240d2b]/0 group-hover:bg-[#240d2b]/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <div className="w-10 h-10 rounded-full bg-white/90 text-[#240d2b] flex items-center justify-center shadow-lg">
                            <Maximize2 className="w-4 h-4" />
                          </div>
                        </div>
                      </div>

                      {/* Photo Info */}
                      <div className="p-3 space-y-2">
                        <span className="text-[10px] font-mono text-[#240d2b]/50 uppercase tracking-widest">
                          {photo.category}
                        </span>
                        <h4 className="font-display text-lg font-bold text-[#240d2b] tracking-tight group-hover:text-[#ff6b35] transition-colors">
                          {photo.title}
                        </h4>
                        <p className="text-xs text-[#240d2b]/65 font-body leading-relaxed line-clamp-2">
                          {photo.description}
                        </p>
                      </div>
                    </div>

                    {/* Specs / Tags Footer */}
                    {photo.specs && photo.specs.length > 0 && (
                      <div className="p-3 pt-2 border-t border-[#240d2b]/[0.06] flex flex-wrap gap-1.5">
                        {photo.specs.map((spec, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#f6f3ee] border border-[#240d2b]/[0.06] text-[#240d2b]/70"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    )}
                  </GlassCard>
                ))}
              </div>
            )}

            {/* 3. INFINITE SLIDING MARQUEE STREAM */}
            <div className="pt-8 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-[#240d2b]/60 border-b border-[#240d2b]/[0.08] pb-3">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#ff6b35] animate-pulse" />
                  <span>LIVE WORKSHOP SNAPSHOT REEL // CONTINUOUS FEED</span>
                </span>
                <span className="hidden sm:inline">AIT PUNE ROBOTICS WING</span>
              </div>

              <div className="relative overflow-hidden py-3 group">
                <div className="absolute left-0 inset-y-0 w-16 bg-gradient-to-r from-[#f6f3ee] to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 inset-y-0 w-16 bg-gradient-to-l from-[#f6f3ee] to-transparent z-10 pointer-events-none" />

                <div className="flex gap-4 animate-marquee group-hover:[animation-play-state:paused] w-max">
                  {[...defaultGallery, ...defaultGallery].map((item, idx) => (
                    <div
                      key={`${item.id}-${idx}`}
                      onClick={() => setSelectedPhotoIndex(idx % defaultGallery.length)}
                      className="w-72 sm:w-80 shrink-0 rounded-2xl overflow-hidden bg-white/80 backdrop-blur-xl border border-white/80 shadow-[0_10px_25px_-5px_rgba(36,13,43,0.06)] hover:shadow-[0_15px_35px_-5px_rgba(255,107,53,0.18)] hover:border-[#ff6b35]/40 transition-all p-3 cursor-pointer"
                    >
                      <div className="relative h-36 w-full rounded-xl overflow-hidden bg-[#240d2b]">
                        <Image
                          src={item.imageUrl}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute bottom-2 left-2">
                          <span className="text-[10px] font-mono uppercase bg-black/60 backdrop-blur-md text-white px-2 py-0.5 rounded-md font-bold">
                            {item.badge}
                          </span>
                        </div>
                      </div>
                      <div className="pt-2.5">
                        <h5 className="font-display text-sm font-bold text-[#240d2b] truncate">
                          {item.title}
                        </h5>
                        <p className="text-[11px] font-mono text-[#240d2b]/55 mt-0.5 truncate">
                          {item.category}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= MAIN TAB 2: LAB EQUIPMENT & TOOLING ================= */}
        {activeMainTab === "equipment" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#240d2b]/[0.08] pb-4">
              <div>
                <span className="text-xs font-mono tracking-widest uppercase text-[#ff6b35] font-semibold">
                  Lab 104 Tooling &amp; Prototyping Infrastructure
                </span>
                <h3 className="text-2xl font-bold font-display text-[#240d2b] mt-1">
                  Active Engineering Apparatus Roster
                </h3>
              </div>
              <span className="text-xs font-mono text-[#240d2b]/60 bg-white/80 px-3.5 py-1.5 rounded-full border border-white/80">
                Total 7 Certified Hardware Stations
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {labEquipment.map((eq) => (
                <GlassCard
                  key={eq.id}
                  spotlightColor="rgba(255, 107, 53, 0.12)"
                  className="p-6 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono tracking-wider uppercase px-2.5 py-1 rounded-full bg-white/90 border border-[#240d2b]/[0.08] text-[#240d2b] font-bold">
                        {eq.category}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-medium text-emerald-700 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span>{eq.status}</span>
                      </span>
                    </div>

                    <h4 className="font-display text-lg font-bold text-[#240d2b] tracking-tight">
                      {eq.name}
                    </h4>

                    <span className="text-[11px] font-mono text-[#ff6b35] block">
                      {eq.bay}
                    </span>

                    <p className="text-xs text-[#240d2b]/70 font-body leading-relaxed">
                      {eq.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#240d2b]/[0.06] flex flex-wrap gap-1.5">
                    {eq.specs.map((spec, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#f6f3ee] border border-[#240d2b]/[0.06] text-[#240d2b]/80"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* FULL-RESOLUTION LIGHTBOX MODAL WITH ZOOM & PAN CONTROLS */}
      <AnimatePresence>
        {selectedPhotoIndex !== null && filteredPhotos[selectedPhotoIndex] && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-8 bg-[#240d2b]/85 backdrop-blur-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-5xl bg-white/95 backdrop-blur-2xl rounded-3xl overflow-hidden border border-white/80 shadow-2xl flex flex-col max-h-[92vh]"
            >
              {/* Modal Header */}
              <div className="p-4 sm:p-6 border-b border-[#240d2b]/[0.08] flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#240d2b]/50">
                    {filteredPhotos[selectedPhotoIndex].badge} • {selectedPhotoIndex + 1} of{" "}
                    {filteredPhotos.length}
                  </span>
                  <h3 className="font-display text-lg sm:text-2xl font-bold text-[#240d2b] tracking-tight mt-0.5">
                    {filteredPhotos[selectedPhotoIndex].title}
                  </h3>
                </div>

                {/* Inspect Zoom & Navigation Actions */}
                <div className="flex items-center gap-2">
                  <div className="hidden sm:flex items-center gap-1 bg-[#f6f3ee] p-1 rounded-full border border-[#240d2b]/[0.08] mr-2">
                    <button
                      onClick={() => setLightboxZoom((z) => Math.max(z - 0.5, 1))}
                      disabled={lightboxZoom <= 1}
                      className="p-1.5 rounded-full text-[#240d2b]/70 hover:text-[#240d2b] disabled:opacity-30 cursor-pointer"
                      title="Zoom Out"
                    >
                      <ZoomOut className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[10px] font-mono px-2 text-[#240d2b]/70 font-semibold">
                      {lightboxZoom}x
                    </span>
                    <button
                      onClick={() => setLightboxZoom((z) => Math.min(z + 0.5, 2.5))}
                      disabled={lightboxZoom >= 2.5}
                      className="p-1.5 rounded-full text-[#240d2b]/70 hover:text-[#240d2b] disabled:opacity-30 cursor-pointer"
                      title="Zoom In"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                    </button>
                    {lightboxZoom > 1 && (
                      <button
                        onClick={() => setLightboxZoom(1)}
                        className="p-1.5 rounded-full text-[#240d2b]/70 hover:text-[#ff6b35] cursor-pointer"
                        title="Reset Zoom"
                      >
                        <RotateCcw className="w-3 h-3" />
                      </button>
                    )}
                  </div>

                  <button
                    onClick={() =>
                      setSelectedPhotoIndex((prev) =>
                        prev !== null && prev > 0 ? prev - 1 : filteredPhotos.length - 1
                      )
                    }
                    className="p-2 rounded-full border border-[#240d2b]/[0.1] text-[#240d2b] hover:bg-[#f6f3ee] transition-colors cursor-pointer"
                    title="Previous Photo"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() =>
                      setSelectedPhotoIndex((prev) =>
                        prev !== null && prev < filteredPhotos.length - 1 ? prev + 1 : 0
                      )
                    }
                    className="p-2 rounded-full border border-[#240d2b]/[0.1] text-[#240d2b] hover:bg-[#f6f3ee] transition-colors cursor-pointer"
                    title="Next Photo"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setSelectedPhotoIndex(null)}
                    className="p-2 rounded-full bg-[#ff6b35] text-white hover:bg-[#fa5519] transition-colors cursor-pointer ml-2 shadow-[0_2px_8px_rgba(255,107,53,0.3)]"
                    title="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Modal Image Area with Zoom Scale */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-[#240d2b] overflow-hidden flex items-center justify-center">
                <motion.div
                  animate={{ scale: lightboxZoom }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={filteredPhotos[selectedPhotoIndex].imageUrl}
                    alt={filteredPhotos[selectedPhotoIndex].title}
                    fill
                    priority
                    className="object-contain"
                  />
                </motion.div>
              </div>

              {/* Bottom Caption & Technical Details */}
              <div className="p-4 sm:p-6 bg-white/95 border-t border-[#240d2b]/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-xs sm:text-sm text-[#240d2b]/75 font-body max-w-2xl leading-relaxed">
                  {filteredPhotos[selectedPhotoIndex].description}
                </p>

                {filteredPhotos[selectedPhotoIndex].specs && (
                  <div className="flex flex-wrap gap-1.5 shrink-0">
                    {filteredPhotos[selectedPhotoIndex].specs!.map((spec, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-[#f6f3ee] border border-[#240d2b]/[0.08] text-[#240d2b]/80"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default WorkshopAndLab;
