"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Bot,
  Trophy,
  Users,
  Wrench,
  Zap,
  ArrowRight,
  ExternalLink,
  X,
  CornerDownLeft,
  Command,
  FileText,
  Mail,
  MapPin,
  Check,
  Compass,
  BookOpen,
} from "lucide-react";
import {
  projects,
  wartechTracks,
  facultyIncharge,
  secretaries,
  jointSecretaries,
  coreContributors,
  workshopGallery,
  siteConfig,
  TeamMember,
  WorkshopMediaItem,
} from "@/data/siteData";

export type CommandCategory = "all" | "fleet" | "wartech" | "research" | "cadre" | "facility" | "actions";

export interface CommandItem {
  id: string;
  title: string;
  subtitle: string;
  category: CommandCategory;
  categoryLabel: string;
  icon: React.ReactNode;
  badge?: string;
  keywords?: string[];
  actionType: "navigate" | "register" | "rulebook" | "copy" | "action";
  target?: string;
}

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenRegister?: (trackId?: string) => void;
  onOpenRulebook?: (trackId?: string) => void;
}

export function useCommandPaletteShortcut(onOpen: () => void) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpen();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onOpen]);
}

export function CommandPaletteModal({
  isOpen,
  onClose,
  onOpenRegister,
  onOpenRulebook,
}: CommandPaletteModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CommandCategory>("all");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedActionId, setCopiedActionId] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Focus input whenever opened
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedCategory("all");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Construct comprehensive command palette items registry
  const allItems: CommandItem[] = useMemo(() => {
    const list: CommandItem[] = [];

    // 1. High Priority Quick Actions
    list.push(
      {
        id: "action-register-wartech",
        title: "Register for Wartech 2026",
        subtitle: "Open official registration portal for all 8 battle arenas",
        category: "actions",
        categoryLabel: "Quick Action",
        icon: <Trophy className="w-4 h-4 text-[#ff6b35]" />,
        badge: "Flagship",
        keywords: ["wartech", "register", "championship", "robowars", "signup"],
        actionType: "register",
      },
      {
        id: "action-view-rulebook",
        title: "Official Wartech 2026 Rulebook",
        subtitle: "Inspect weight categories, safety mandates, and arena parameters",
        category: "actions",
        categoryLabel: "Handbook",
        icon: <FileText className="w-4 h-4 text-[#240d2b]" />,
        badge: "Handbook",
        keywords: ["rules", "rulebook", "regulations", "dimensions", "weight", "criteria"],
        actionType: "rulebook",
      },
      {
        id: "action-lab-coordinates",
        title: "Locate Lab 104 Robotics Wing",
        subtitle: siteConfig.labLocation + " — " + siteConfig.college,
        category: "actions",
        categoryLabel: "Facility",
        icon: <MapPin className="w-4 h-4 text-[#ff6b35]" />,
        badge: "Coordinates",
        keywords: ["lab", "location", "room 104", "campus", "dighi", "pune", "address"],
        actionType: "navigate",
        target: "/#contact",
      },
      {
        id: "action-copy-email",
        title: `Copy Contact Email: ${siteConfig.contactEmail}`,
        subtitle: "Direct outreach to faculty mentors & secretary cadre",
        category: "actions",
        categoryLabel: "Outreach",
        icon: <Mail className="w-4 h-4 text-[#240d2b]" />,
        badge: "Clipboard",
        keywords: ["email", "contact", "support", "collaborate", "mail"],
        actionType: "copy",
        target: siteConfig.contactEmail,
      },
      {
        id: "action-open-admin",
        title: "Admin Command Center",
        subtitle: "Manage inquiries, registrations, team roster, and event schedules",
        category: "actions",
        categoryLabel: "Portal",
        icon: <Zap className="w-4 h-4 text-[#ff6b35]" />,
        badge: "Admin",
        keywords: ["admin", "dashboard", "inquiries", "inbox", "manage", "registrations"],
        actionType: "navigate",
        target: "/admin",
      }
    );

    // 2. Autonomous Fleet & Robotics Projects
    projects.forEach((p) => {
      list.push({
        id: `project-${p.id}`,
        title: p.title,
        subtitle: `${p.category} // ${p.tagline}`,
        category: "fleet",
        categoryLabel: "Autonomous Fleet",
        icon: <Bot className="w-4 h-4 text-[#ff6b35]" />,
        badge: p.status,
        keywords: [
          p.title,
          p.category,
          p.tagline,
          p.description,
          ...p.tags,
          ...p.specs.map((s) => s.value),
        ],
        actionType: "navigate",
        target: "/#projects",
      });
    });

    // 3. Wartech Arenas & Tracks
    wartechTracks.forEach((t) => {
      list.push({
        id: `track-${t.id}`,
        title: `${t.title} (${t.trackCode})`,
        subtitle: `Prize: ${t.prizePool} • Arena: ${t.arenaType} • Team: ${t.teamSize}`,
        category: "wartech",
        categoryLabel: "Wartech Track",
        icon: <Trophy className="w-4 h-4 text-[#240d2b]" />,
        badge: t.status,
        keywords: [
          t.title,
          t.trackCode,
          t.description,
          t.arenaType,
          ...t.rulesHighlight,
        ],
        actionType: "register",
        target: t.id,
      });
    });

    // 4. Lab 104 Research Whitepapers
    const whitepapers = [
      {
        id: "paper-tb-26-01",
        title: "TB-26-01: YOLOv8 Edge Inference on Jetson Orin Nano",
        subtitle: "72.4 FPS • 11.8ms Latency • TensorRT FP16 Quantization • Edge AI",
        keywords: ["yolo", "yolov8", "jetson", "tensorrt", "edge", "ai", "vision", "cuda", "latency"],
      },
      {
        id: "paper-tb-26-02",
        title: "TB-26-02: Jalpari AUV Hydrodynamics & Active Ballast",
        subtitle: "45m Depth • ±0.05m Neutral Buoyancy • Marine Autonomous Systems",
        keywords: ["jalpari", "auv", "underwater", "ballast", "marine", "hydrodynamics", "depth"],
      },
      {
        id: "paper-tb-26-03",
        title: "TB-26-03: Distributed Micro-RTPS ROS2 SLAM & Dual-EKF",
        subtitle: "Sub-3.2cm Drift • 100Hz EKF Pose • GPS-Denied Subterranean Mapping",
        keywords: ["ros2", "slam", "ekf", "lidar", "rtps", "mapping", "navigation", "odometry"],
      },
      {
        id: "paper-tb-26-04",
        title: "TB-26-04: High-Density 48V/60A FOC BLDC Motor Driver",
        subtitle: "95A Peak Burst • 40kHz PWM FOC • Combat Robotics Mechatronics",
        keywords: ["foc", "bldc", "motor", "driver", "48v", "mosfet", "combat", "inverter"],
      },
    ];

    whitepapers.forEach((wp) => {
      list.push({
        id: wp.id,
        title: wp.title,
        subtitle: wp.subtitle,
        category: "research",
        categoryLabel: "Research Whitepaper",
        icon: <BookOpen className="w-4 h-4 text-[#ff6b35]" />,
        badge: "Lab 104",
        keywords: [...wp.keywords, wp.title, wp.subtitle],
        actionType: "navigate",
        target: "/#research",
      });
    });

    // 5. Cadre & Leadership
    const allCadre: TeamMember[] = [
      facultyIncharge,
      ...secretaries,
      ...jointSecretaries,
      ...coreContributors,
    ];
    allCadre.forEach((m) => {
      list.push({
        id: `member-${m.id}`,
        title: m.name,
        subtitle: `${m.role} ${m.subRole ? `(${m.subRole})` : ""} • ${m.specialization || "Robotics Engineering"}`,
        category: "cadre",
        categoryLabel: "Cadre Roster",
        icon: <Users className="w-4 h-4 text-[#240d2b]" />,
        badge: m.tier.replace("_", " "),
        keywords: [m.name, m.role, m.subRole || "", m.specialization || ""],
        actionType: "navigate",
        target: "/#team",
      });
    });

    // 6. Facilities & Lab 104
    workshopGallery.forEach((f: WorkshopMediaItem) => {
      list.push({
        id: `facility-${f.id}`,
        title: f.title,
        subtitle: f.description,
        category: "facility",
        categoryLabel: "Lab 104 Infrastructure",
        icon: <Wrench className="w-4 h-4 text-[#ff6b35]" />,
        badge: f.badge,
        keywords: [f.title, f.category, f.description, ...(f.specs || [])],
        actionType: "navigate",
        target: "/#workshop",
      });
    });

    return list;
  }, []);

  // Filter items based on active category and query
  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();

    return allItems.filter((item) => {
      if (selectedCategory !== "all" && item.category !== selectedCategory) {
        return false;
      }
      if (!q) return true;

      const titleMatch = item.title.toLowerCase().includes(q);
      const subtitleMatch = item.subtitle.toLowerCase().includes(q);
      const categoryMatch = item.categoryLabel.toLowerCase().includes(q);
      const keywordMatch = item.keywords?.some((k) => k.toLowerCase().includes(q));

      return titleMatch || subtitleMatch || categoryMatch || keywordMatch;
    });
  }, [allItems, query, selectedCategory]);

  // Keep selected index within bounds
  useEffect(() => {
    setSelectedIndex(0);
  }, [query, selectedCategory]);

  const handleExecuteItem = useCallback(
    (item: CommandItem) => {
      if (item.actionType === "register") {
        onClose();
        onOpenRegister?.(item.target);
      } else if (item.actionType === "rulebook") {
        onClose();
        onOpenRulebook?.(item.target);
      } else if (item.actionType === "copy" && item.target) {
        navigator.clipboard?.writeText(item.target);
        setCopiedActionId(item.id);
        setTimeout(() => {
          setCopiedActionId(null);
          onClose();
        }, 1200);
      } else if (item.actionType === "navigate" && item.target) {
        onClose();
        if (item.target.startsWith("/#") && window.location.pathname === "/") {
          const id = item.target.replace("/#", "");
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        } else {
          router.push(item.target);
        }
      }
    },
    [onClose, onOpenRegister, onOpenRulebook, router]
  );

  // Keyboard navigation inside modal
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          handleExecuteItem(filteredItems[selectedIndex]);
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onClose, handleExecuteItem]);

  // Scroll active item into view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.querySelector(`[data-index="${selectedIndex}"]`);
      if (activeEl) {
        activeEl.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    }
  }, [selectedIndex]);

  const categories: { id: CommandCategory; label: string; count: number }[] = useMemo(() => {
    const counts: Record<CommandCategory, number> = {
      all: allItems.length,
      fleet: allItems.filter((i) => i.category === "fleet").length,
      wartech: allItems.filter((i) => i.category === "wartech").length,
      research: allItems.filter((i) => i.category === "research").length,
      cadre: allItems.filter((i) => i.category === "cadre").length,
      facility: allItems.filter((i) => i.category === "facility").length,
      actions: allItems.filter((i) => i.category === "actions").length,
    };

    return [
      { id: "all", label: "All Telemetry", count: counts.all },
      { id: "fleet", label: "Fleet & Robots", count: counts.fleet },
      { id: "wartech", label: "Wartech Arenas", count: counts.wartech },
      { id: "research", label: "Research Bulletins", count: counts.research },
      { id: "cadre", label: "Cadre Roster", count: counts.cadre },
      { id: "facility", label: "Lab 104", count: counts.facility },
      { id: "actions", label: "Quick Actions", count: counts.actions },
    ];
  }, [allItems]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 sm:px-6">
          {/* Frosted Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#240d2b]/60 backdrop-blur-md transition-opacity"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -15 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="relative w-full max-w-2xl bg-white/90 backdrop-blur-2xl rounded-3xl border border-white/80 shadow-[0_25px_80px_-15px_rgba(36,13,43,0.35)] overflow-hidden flex flex-col max-h-[82vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Accent Gradient Bar */}
            <div className="h-1.5 bg-gradient-to-r from-[#ff6b35] via-[#240d2b] to-[#00e5ff]" />

            {/* Omnibar Search Header */}
            <div className="p-4 sm:p-5 border-b border-[#240d2b]/[0.08] flex items-center gap-3 relative">
              <Search className="w-5 h-5 text-[#ff6b35] shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search robots, arenas, cadre members, rulebooks, Lab 104..."
                className="w-full bg-transparent text-sm sm:text-base font-body text-[#240d2b] placeholder-[#240d2b]/40 focus:outline-hidden font-medium"
              />

              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="p-1 rounded-full text-[#240d2b]/40 hover:text-[#240d2b] transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              <div className="hidden sm:flex items-center gap-1 font-mono text-[10px] text-[#240d2b]/50 bg-black/5 px-2 py-1 rounded-md border border-[#240d2b]/10">
                <span>ESC</span>
              </div>
            </div>

            {/* Category Filter Pills Bar */}
            <div className="px-4 py-2.5 bg-[#f6f3ee]/60 border-b border-[#240d2b]/[0.06] flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1 rounded-full text-xs font-mono whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? "bg-[#240d2b] text-white shadow-xs font-bold"
                      : "text-[#240d2b]/70 hover:text-[#240d2b] hover:bg-black/5"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className="ml-1.5 opacity-60 text-[10px]">({cat.count})</span>
                </button>
              ))}
            </div>

            {/* Results List */}
            <div
              ref={listRef}
              className="overflow-y-auto p-2 sm:p-3 divide-y divide-[#240d2b]/[0.04] max-h-[50vh]"
            >
              {filteredItems.length === 0 ? (
                <div className="py-12 text-center space-y-2">
                  <Compass className="w-8 h-8 text-[#240d2b]/30 mx-auto animate-pulse" />
                  <p className="text-sm font-body font-semibold text-[#240d2b]">
                    No telemetry records found
                  </p>
                  <p className="text-xs font-mono text-[#240d2b]/50">
                    No matching results for &ldquo;{query}&rdquo; in {selectedCategory} category.
                  </p>
                </div>
              ) : (
                filteredItems.map((item, idx) => {
                  const isSelected = idx === selectedIndex;
                  const isCopied = copiedActionId === item.id;

                  return (
                    <div
                      key={item.id}
                      data-index={idx}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      onClick={() => handleExecuteItem(item)}
                      className={`group flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-all ${
                        isSelected
                          ? "bg-[#240d2b] text-white shadow-md scale-[0.99]"
                          : "hover:bg-[#240d2b]/[0.04] text-[#240d2b]"
                      }`}
                    >
                      <div className="flex items-center gap-3.5 min-w-0 pr-3">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border transition-colors ${
                            isSelected
                              ? "bg-white/10 border-white/20 text-white"
                              : "bg-white border-[#240d2b]/10 text-[#240d2b] shadow-xs"
                          }`}
                        >
                          {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : item.icon}
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-sm font-semibold truncate font-display ${
                                isSelected ? "text-white" : "text-[#240d2b]"
                              }`}
                            >
                              {item.title}
                            </span>
                            {item.badge && (
                              <span
                                className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full font-medium shrink-0 ${
                                  isSelected
                                    ? "bg-white/20 text-white"
                                    : "bg-[#ff6b35]/10 text-[#ff6b35] border border-[#ff6b35]/20"
                                }`}
                              >
                                {item.badge}
                              </span>
                            )}
                          </div>

                          <p
                            className={`text-xs truncate font-body mt-0.5 ${
                              isSelected ? "text-white/70" : "text-[#240d2b]/60"
                            }`}
                          >
                            {isCopied ? "Copied to clipboard!" : item.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span
                          className={`text-[10px] font-mono uppercase hidden sm:inline ${
                            isSelected ? "text-white/50" : "text-[#240d2b]/40"
                          }`}
                        >
                          {item.categoryLabel}
                        </span>

                        <div
                          className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all ${
                            isSelected ? "bg-white/20 text-white" : "text-[#240d2b]/40"
                          }`}
                        >
                          <CornerDownLeft className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer Shortcuts Dossier */}
            <div className="p-3 bg-[#f6f3ee]/80 border-t border-[#240d2b]/[0.08] flex items-center justify-between text-[11px] font-mono text-[#240d2b]/60">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded-md bg-white border border-[#240d2b]/15 text-[10px]">
                    ↑
                  </kbd>
                  <kbd className="px-1.5 py-0.5 rounded-md bg-white border border-[#240d2b]/15 text-[10px]">
                    ↓
                  </kbd>
                  <span>navigate</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded-md bg-white border border-[#240d2b]/15 text-[10px]">
                    ↵
                  </kbd>
                  <span>select</span>
                </span>
                <span className="hidden sm:flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded-md bg-white border border-[#240d2b]/15 text-[10px]">
                    esc
                  </kbd>
                  <span>dismiss</span>
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-[10px]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>CEAR TELEMETRY v2.6</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default CommandPaletteModal;
