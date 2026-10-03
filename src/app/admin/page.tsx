"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  ShieldCheck,
  Lock,
  Unlock,
  Key,
  Users,
  Calendar,
  Cpu,
  Camera,
  Plus,
  Pencil,
  Trash2,
  Save,
  RotateCcw,
  Download,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  X,
  Search,
  ChevronRight,
  LogOut,
  Sparkles,
  Layers,
  ArrowRight,
  Cloud,
  Database,
  UploadCloud,
  Copy,
  Check,
  Settings,
  Eye,
  EyeOff,
  Filter,
  FileJson,
  Upload,
  MapPin,
} from "lucide-react";
import { useSiteContent } from "@/context/SiteContentContext";
import { TeamMember, EventItem, Project, WorkshopMediaItem } from "@/data/siteData";
import {
  MemberModal,
  EventModal,
  ProjectModal,
  GalleryModal,
  CloudSetupModal,
} from "@/components/admin/AdminModals";

const DEFAULT_PASSCODE = "cear@2026";
const AUTH_STORAGE_KEY = "cear_admin_auth";
const CUSTOM_PASSCODE_KEY = "cear_admin_passcode";

export default function AdminPage() {
  const {
    facultyIncharge,
    secretaries,
    jointSecretaries,
    coreContributors,
    upcomingEvents,
    projects,
    workshopGallery,
    addMember,
    updateMember,
    deleteMember,
    addEvent,
    updateEvent,
    deleteEvent,
    addProject,
    updateProject,
    deleteProject,
    addGalleryItem,
    updateGalleryItem,
    deleteGalleryItem,
    saveChanges,
    resetToDefaults,
    importFullBackup,
    isSaving,
    lastSaved,
    cloudConnected,
    hasUnsavedChanges,
  } = useSiteContent();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [showPasscode, setShowPasscode] = useState(false);
  const [authError, setAuthError] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  // Tabs: 'team' | 'events' | 'projects' | 'gallery' | 'settings'
  const [activeTab, setActiveTab] = useState<"team" | "events" | "projects" | "gallery" | "settings">("team");

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [teamFilter, setTeamFilter] = useState<"all" | "faculty" | "secretary" | "joint_secretary" | "contributor">("all");
  const [eventFilter, setEventFilter] = useState<"all" | "Upcoming" | "Ongoing" | "Completed">("all");
  const [projectFilter, setProjectFilter] = useState<string>("all");
  const [galleryFilter, setGalleryFilter] = useState<string>("all");

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<{ text: string; type: "success" | "info" | "warning" } | null>(null);

  // Modals
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);

  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);

  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [editingGalleryItem, setEditingGalleryItem] = useState<WorkshopMediaItem | null>(null);

  const [isCloudHelpModalOpen, setIsCloudHelpModalOpen] = useState(false);

  // New Passcode settings
  const [newPasscode, setNewPasscode] = useState("");

  // Check stored auth on mount
  useEffect(() => {
    const isAuthStored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (isAuthStored === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const showToast = (text: string, type: "success" | "info" | "warning" = "success") => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 3800);
  };

  const handleManualSave = useCallback(async () => {
    const success = await saveChanges();
    if (success) {
      showToast("✓ All content successfully synchronized to storage!", "success");
    } else {
      showToast("Saved locally. Changes cached on this device.", "info");
    }
  }, [saveChanges]);

  // Global Keyboard Shortcuts (Cmd+S to save, Esc to close modals)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        handleManualSave();
      }
      if (e.key === "Escape") {
        setIsMemberModalOpen(false);
        setIsEventModalOpen(false);
        setIsProjectModalOpen(false);
        setIsGalleryModalOpen(false);
        setIsCloudHelpModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleManualSave]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const storedCustomPasscode = localStorage.getItem(CUSTOM_PASSCODE_KEY) || DEFAULT_PASSCODE;
    if (passcode === storedCustomPasscode || passcode === DEFAULT_PASSCODE) {
      setIsAuthenticated(true);
      setAuthError("");
      if (rememberMe) {
        localStorage.setItem(AUTH_STORAGE_KEY, "true");
      }
      showToast("Access Granted: Welcome to CEAR Mission Control", "success");
    } else {
      setAuthError("Invalid access key. Try default: cear@2026");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setPasscode("");
    showToast("Session Terminated: Logged out", "info");
  };

  const handleExportBackup = () => {
    const backupData = {
      facultyIncharge,
      secretaries,
      jointSecretaries,
      coreContributors,
      upcomingEvents,
      projects,
      workshopGallery,
      exportedAt: new Date().toISOString(),
      system: "CEAR Mission Control CMS v2.0",
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cear-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    showToast("Downloaded site data snapshot JSON", "success");
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        const ok = await importFullBackup(json);
        if (ok) {
          showToast("✓ Backup snapshot imported! Click 'Save Changes' to push.", "warning");
        } else {
          showToast("Invalid backup JSON structure.", "warning");
        }
      } catch (err) {
        showToast("Error parsing JSON file.", "warning");
      }
    };
    reader.readAsText(file);
  };

  const handleUpdatePasscode = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPasscode.trim().length < 6) {
      showToast("Passcode must be at least 6 characters.", "warning");
      return;
    }
    localStorage.setItem(CUSTOM_PASSCODE_KEY, newPasscode.trim());
    setNewPasscode("");
    showToast("Passcode updated for this device!", "success");
  };

  const handleResetData = async () => {
    if (window.confirm("CAUTION: Restore all cadre, events, projects and workshop media back to factory defaults? Any custom additions will be discarded.")) {
      await resetToDefaults();
      showToast("Reset all site content back to initial defaults.", "info");
    }
  };

  // Aggregated team list
  const allMembers: TeamMember[] = [
    facultyIncharge,
    ...secretaries,
    ...jointSecretaries,
    ...coreContributors,
  ];

  // Filtered Lists
  const filteredMembers = allMembers.filter((m) => {
    const matchesTier = teamFilter === "all" || m.tier === teamFilter;
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.subRole && m.subRole.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (m.specialization && m.specialization.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTier && matchesSearch;
  });

  const filteredEvents = upcomingEvents.filter((e) => {
    const matchesStatus = eventFilter === "all" || e.status === eventFilter;
    const matchesSearch =
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const filteredProjects = projects.filter((p) => {
    const matchesCategory = projectFilter === "all" || p.category === projectFilter;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const filteredGallery = (workshopGallery || []).filter((g) => {
    const matchesCategory = galleryFilter === "all" || g.category === galleryFilter;
    const matchesSearch =
      g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.badge.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // =========================================================================
  // 1. GATEKEEPER / MISSION ACCESS AUTH SCREEN
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="relative min-h-screen bg-[#070b12] text-white flex flex-col items-center justify-center p-4 selection:bg-cyan-500 selection:text-black overflow-hidden font-sans">
        {/* Background Grid & Radar Beams */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00f0ff08_1px,transparent_1px),linear-gradient(to_bottom,#00f0ff08_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        <div className="absolute w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35 }}
          className="relative z-10 w-full max-w-md bg-[#0c121e]/90 backdrop-blur-2xl border border-cyan-500/30 rounded-2xl p-8 shadow-[0_0_60px_rgba(0,240,255,0.15)] space-y-6"
        >
          {/* Header Badge */}
          <div className="text-center space-y-2.5">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-[0_0_30px_rgba(0,240,255,0.4)] border border-cyan-300/40">
              <Shield className="w-8 h-8 text-[#070b12]" />
            </div>
            <div>
              <h2 className="font-tech text-2xl font-black tracking-wider uppercase text-white">
                CEAR MISSION CONTROL
              </h2>
              <p className="font-mono text-xs text-cyan-400/80 tracking-widest mt-0.5">
                {"// AUTHENTICATED ACCESS ONLY //"}
              </p>
            </div>
            <p className="text-xs text-slate-400 font-sans">
              Centre of Excellence for AI &amp; Robotics • AIT Pune
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono text-slate-300 uppercase tracking-wider mb-1.5 font-bold">
                COMMAND ACCESS KEY
              </label>
              <div className="relative">
                <input
                  type={showPasscode ? "text" : "password"}
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter passcode (default: cear@2026)"
                  className="w-full bg-[#131b2c] border border-slate-700 focus:border-cyan-400 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all font-mono pr-11"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPasscode(!showPasscode)}
                  className="absolute right-3.5 top-3.5 text-slate-400 hover:text-cyan-400 transition-colors"
                  tabIndex={-1}
                >
                  {showPasscode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {authError && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-3 rounded-xl bg-red-950/60 border border-red-800 text-red-300 text-xs font-mono"
              >
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{authError}</span>
              </motion.div>
            )}

            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-800 text-cyan-500 focus:ring-0"
                />
                <span>Remember Session</span>
              </label>
              <span className="text-[11px] text-cyan-400/80 font-bold">Key: cear@2026</span>
            </div>

            <button
              type="submit"
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-[#070b12] font-tech font-bold py-3.5 px-4 rounded-xl shadow-[0_0_25px_rgba(0,240,255,0.4)] hover:shadow-[0_0_35px_rgba(0,240,255,0.6)] transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider text-sm"
            >
              <Unlock className="w-4 h-4" />
              <span>Initialize Command Link</span>
            </button>
          </form>

          <div className="pt-3 border-t border-slate-800 text-center">
            <Link
              href="/"
              className="text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors inline-flex items-center gap-1.5"
            >
              <span>← Return to Public Website</span>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // =========================================================================
  // 2. MAIN TACTICAL ADMIN DASHBOARD
  // =========================================================================
  return (
    <div className="min-h-screen bg-[#070b12] text-white font-sans selection:bg-cyan-500 selection:text-black">
      {/* Toast Notification Alert */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -25, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -25, scale: 0.95 }}
            className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 font-mono text-xs border ${
              toastMessage.type === "success"
                ? "bg-[#0b1b1f] text-cyan-300 border-cyan-500/40 shadow-[0_0_30px_rgba(0,240,255,0.3)]"
                : toastMessage.type === "warning"
                ? "bg-[#1f1a0b] text-amber-300 border-amber-500/40 shadow-[0_0_30px_rgba(245,158,11,0.3)]"
                : "bg-slate-900 text-slate-200 border-slate-700"
            }`}
          >
            <CheckCircle2 className="w-4 h-4 shrink-0 text-cyan-400" />
            <span className="font-semibold">{toastMessage.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Command Bar */}
      <header className="sticky top-0 z-30 bg-[#080d16]/90 backdrop-blur-xl border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo & Status Beacon */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 text-[#070b12] flex items-center justify-center font-black font-tech text-base shadow-[0_0_20px_rgba(0,240,255,0.4)] border border-cyan-300/40">
              C
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-tech text-base sm:text-lg font-black text-white uppercase tracking-wider">
                  CEAR Mission Control
                </h1>
                <span className="text-[10px] font-mono font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded-full flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>CMS v2.0</span>
                </span>
                {cloudConnected ? (
                  <span className="hidden md:inline-flex text-[10px] font-mono font-bold bg-cyan-950/80 text-cyan-400 border border-cyan-500/40 px-2 py-0.5 rounded-full items-center gap-1">
                    <Cloud className="w-3 h-3 text-cyan-400" />
                    <span>SUPABASE CLOUD LIVE</span>
                  </span>
                ) : (
                  <button
                    onClick={() => setIsCloudHelpModalOpen(true)}
                    className="hidden md:inline-flex text-[10px] font-mono font-bold bg-amber-950/80 hover:bg-amber-900/80 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-full items-center gap-1 transition-colors cursor-pointer"
                    title="Click for Supabase Cloud setup guide"
                  >
                    <Database className="w-3 h-3 text-amber-400" />
                    <span>LOCAL PERSISTENCE • CONNECT CLOUD</span>
                  </button>
                )}
              </div>
              <p className="text-[10px] font-mono text-slate-400">
                AIT Pune • Mechatronics, Defense Robotics &amp; Autonomous AI
              </p>
            </div>
          </div>

          {/* Actions Bar */}
          <div className="flex items-center gap-2">
            {/* Unsaved indicator */}
            {hasUnsavedChanges && (
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono font-bold text-amber-400 bg-amber-950/60 border border-amber-500/40 px-2.5 py-1 rounded-lg animate-pulse">
                <span>● Unsaved Edits</span>
              </span>
            )}

            <button
              onClick={handleManualSave}
              disabled={isSaving}
              className={`font-tech font-bold text-xs px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50 uppercase tracking-wider ${
                hasUnsavedChanges
                  ? "bg-amber-500 hover:bg-amber-400 text-black shadow-[0_0_20px_rgba(245,158,11,0.5)]"
                  : "bg-cyan-500 hover:bg-cyan-400 text-black shadow-[0_0_15px_rgba(0,240,255,0.3)]"
              }`}
              title="Keyboard shortcut: Cmd + S"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSaving ? "Syncing..." : "Publish (⌘S)"}</span>
            </button>

            <Link
              href="/"
              target="_blank"
              className="bg-[#131b2c] hover:bg-[#1a253c] text-cyan-300 border border-slate-700 font-mono text-xs font-semibold px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <span>Live Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={handleLogout}
              className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-950/40 transition-colors"
              title="Terminate Session"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Command Dashboard */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-7">
        {/* Mission Telemetry Metrics Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#0c121e] p-4 rounded-xl border border-slate-800 hover:border-cyan-500/40 transition-colors shadow-lg">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
              <span className="uppercase tracking-wider">Cadre Cadets</span>
              <Users className="w-4 h-4 text-cyan-400" />
            </div>
            <span className="text-3xl font-black font-tech text-white mt-1 block">
              {allMembers.length}
            </span>
            <span className="text-[11px] font-mono text-cyan-400/80">
              {secretaries.length} Sec • {jointSecretaries.length} Jt Sec • {coreContributors.length} Contrib
            </span>
          </div>

          <div className="bg-[#0c121e] p-4 rounded-xl border border-slate-800 hover:border-amber-500/40 transition-colors shadow-lg">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
              <span className="uppercase tracking-wider">Active Timeline</span>
              <Calendar className="w-4 h-4 text-amber-400" />
            </div>
            <span className="text-3xl font-black font-tech text-white mt-1 block">
              {upcomingEvents.length}
            </span>
            <span className="text-[11px] font-mono text-amber-400/80">
              Workshops &amp; Hackathons
            </span>
          </div>

          <div className="bg-[#0c121e] p-4 rounded-xl border border-slate-800 hover:border-emerald-500/40 transition-colors shadow-lg">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
              <span className="uppercase tracking-wider">Robotic Fleet</span>
              <Cpu className="w-4 h-4 text-emerald-400" />
            </div>
            <span className="text-3xl font-black font-tech text-white mt-1 block">
              {projects.length}
            </span>
            <span className="text-[11px] font-mono text-emerald-400/80">
              UGVs, UAVs, Arm &amp; AUVs
            </span>
          </div>

          <div className="bg-[#0c121e] p-4 rounded-xl border border-slate-800 hover:border-blue-500/40 transition-colors shadow-lg">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
              <span className="uppercase tracking-wider">Lab 104 Media</span>
              <Camera className="w-4 h-4 text-blue-400" />
            </div>
            <span className="text-3xl font-black font-tech text-white mt-1 block">
              {workshopGallery.length}
            </span>
            <span className="text-[11px] font-mono text-blue-400/80">
              High-Res Lab Captures
            </span>
          </div>
        </div>

        {/* Tactical Search & Action Bar */}
        <div className="bg-[#0c121e] border border-slate-800 rounded-xl p-3 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
          {/* Universal Search Input */}
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter names, titles, categories, or tech stack..."
              className="w-full bg-[#131b2c] border border-slate-700 focus:border-cyan-400 rounded-lg pl-9 pr-8 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors font-mono"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-2 text-slate-500 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Create Action depending on activeTab */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            {activeTab === "team" && (
              <button
                onClick={() => {
                  setEditingMember(null);
                  setIsMemberModalOpen(true);
                }}
                className="bg-cyan-500 hover:bg-cyan-400 text-[#070b12] font-tech font-bold text-xs px-3.5 py-1.5 rounded-lg shadow-[0_0_15px_rgba(0,240,255,0.3)] flex items-center gap-1.5 cursor-pointer uppercase tracking-wider"
              >
                <Plus className="w-4 h-4" />
                <span>Add Member</span>
              </button>
            )}
            {activeTab === "events" && (
              <button
                onClick={() => {
                  setEditingEvent(null);
                  setIsEventModalOpen(true);
                }}
                className="bg-amber-500 hover:bg-amber-400 text-[#070b12] font-tech font-bold text-xs px-3.5 py-1.5 rounded-lg shadow-[0_0_15px_rgba(245,158,11,0.3)] flex items-center gap-1.5 cursor-pointer uppercase tracking-wider"
              >
                <Plus className="w-4 h-4" />
                <span>Schedule Event</span>
              </button>
            )}
            {activeTab === "projects" && (
              <button
                onClick={() => {
                  setEditingProject(null);
                  setIsProjectModalOpen(true);
                }}
                className="bg-emerald-500 hover:bg-emerald-400 text-[#070b12] font-tech font-bold text-xs px-3.5 py-1.5 rounded-lg shadow-[0_0_15px_rgba(16,185,129,0.3)] flex items-center gap-1.5 cursor-pointer uppercase tracking-wider"
              >
                <Plus className="w-4 h-4" />
                <span>Deploy Platform</span>
              </button>
            )}
            {activeTab === "gallery" && (
              <button
                onClick={() => {
                  setEditingGalleryItem(null);
                  setIsGalleryModalOpen(true);
                }}
                className="bg-blue-500 hover:bg-blue-400 text-white font-tech font-bold text-xs px-3.5 py-1.5 rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.3)] flex items-center gap-1.5 cursor-pointer uppercase tracking-wider"
              >
                <Plus className="w-4 h-4" />
                <span>Upload Lab Photo</span>
              </button>
            )}
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center border-b border-slate-800 gap-1 overflow-x-auto pb-px">
          <button
            onClick={() => setActiveTab("team")}
            className={`py-3 px-4 text-xs font-tech font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer uppercase tracking-wider shrink-0 ${
              activeTab === "team"
                ? "border-cyan-400 text-cyan-400 bg-cyan-950/20"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Cadre Cadets ({allMembers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("events")}
            className={`py-3 px-4 text-xs font-tech font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer uppercase tracking-wider shrink-0 ${
              activeTab === "events"
                ? "border-amber-400 text-amber-400 bg-amber-950/20"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Timeline &amp; Events ({upcomingEvents.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("projects")}
            className={`py-3 px-4 text-xs font-tech font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer uppercase tracking-wider shrink-0 ${
              activeTab === "projects"
                ? "border-emerald-400 text-emerald-400 bg-emerald-950/20"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>Robotics Fleet ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("gallery")}
            className={`py-3 px-4 text-xs font-tech font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer uppercase tracking-wider shrink-0 ${
              activeTab === "gallery"
                ? "border-blue-400 text-blue-400 bg-blue-950/20"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>Lab 104 Media ({workshopGallery.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`py-3 px-4 text-xs font-tech font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer uppercase tracking-wider shrink-0 ${
              activeTab === "settings"
                ? "border-slate-300 text-white bg-slate-800/40"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>System &amp; Backups</span>
          </button>
        </div>

        {/* ================================================================= */}
        {/* TAB 1: CADRE DIRECTORY                                            */}
        {/* ================================================================= */}
        {activeTab === "team" && (
          <div className="space-y-4">
            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2 text-[11px] font-mono">
              {[
                { id: "all", label: `All Cadre (${allMembers.length})` },
                { id: "faculty", label: "Faculty In-Charge" },
                { id: "secretary", label: `Secretaries (${secretaries.length})` },
                { id: "joint_secretary", label: `Joint Secretaries (${jointSecretaries.length})` },
                { id: "contributor", label: `Contributors (${coreContributors.length})` },
              ].map((pill) => (
                <button
                  key={pill.id}
                  onClick={() => setTeamFilter(pill.id as any)}
                  className={`px-3 py-1 rounded-full border transition-all cursor-pointer ${
                    teamFilter === pill.id
                      ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50 font-bold"
                      : "bg-[#0c121e] text-slate-400 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMembers.map((member) => (
                <div
                  key={member.id}
                  className="bg-[#0c121e] border border-slate-800 hover:border-cyan-500/40 rounded-xl p-4 transition-all flex flex-col justify-between space-y-4 shadow-md"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        {member.imageUrl ? (
                          <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-900 border border-slate-700 shrink-0">
                            <Image
                              src={member.imageUrl}
                              alt={member.name}
                              fill
                              className="object-cover"
                              unoptimized={member.imageUrl.startsWith("http")}
                            />
                          </div>
                        ) : (
                          <div
                            className={`w-12 h-12 rounded-xl flex items-center justify-center font-tech font-bold text-base shrink-0 ${
                              member.avatarBg || "bg-slate-800 text-cyan-400"
                            }`}
                          >
                            {member.avatarInitials || "CR"}
                          </div>
                        )}
                        <div>
                          <h4 className="font-tech text-base font-bold text-white leading-tight">
                            {member.name}
                          </h4>
                          <span
                            className={`inline-block text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase mt-1 ${
                              member.tier === "faculty"
                                ? "bg-amber-950/80 text-amber-300 border border-amber-600/40"
                                : member.tier === "secretary"
                                ? "bg-cyan-950/80 text-cyan-300 border border-cyan-600/40"
                                : member.tier === "joint_secretary"
                                ? "bg-emerald-950/80 text-emerald-300 border border-emerald-600/40"
                                : "bg-slate-800 text-slate-300 border border-slate-700"
                            }`}
                          >
                            {member.tier.replace("_", " ")}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            setEditingMember(member);
                            setIsMemberModalOpen(true);
                          }}
                          className="p-1.5 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                          title="Edit Cadre"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        {member.tier !== "faculty" && (
                          <button
                            onClick={() => {
                              if (confirm(`Remove ${member.name} from cadre?`)) {
                                deleteMember(member.id);
                                showToast(`Removed ${member.name}`, "info");
                              }
                            }}
                            className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                            title="Remove Cadre"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="text-xs font-mono space-y-1">
                      <p className="text-cyan-400 font-semibold">{member.role}</p>
                      {member.subRole && (
                        <p className="text-slate-400 text-[11px]">{member.subRole}</p>
                      )}
                      {member.specialization && (
                        <p className="text-[11px] text-slate-400 bg-[#131b2c] p-2 rounded-lg border border-slate-800">
                          <span className="text-slate-500 font-bold uppercase">Focus: </span>
                          {member.specialization}
                        </p>
                      )}
                    </div>

                    {member.quote && (
                      <p className="text-[11px] text-slate-400 font-sans italic border-l-2 border-cyan-500/40 pl-2">
                        &ldquo;{member.quote}&rdquo;
                      </p>
                    )}
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-500">
                    <span>ID: {member.id}</span>
                    <div className="flex items-center gap-2">
                      {member.linkedin && <span className="text-cyan-400">LinkedIn ✓</span>}
                      {member.github && <span className="text-slate-400">GitHub ✓</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 2: TIMELINE & EVENTS                                          */}
        {/* ================================================================= */}
        {activeTab === "events" && (
          <div className="space-y-4">
            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2 text-[11px] font-mono">
              {["all", "Upcoming", "Ongoing", "Completed"].map((status) => (
                <button
                  key={status}
                  onClick={() => setEventFilter(status as any)}
                  className={`px-3 py-1 rounded-full border transition-all cursor-pointer ${
                    eventFilter === status
                      ? "bg-amber-500/20 text-amber-300 border-amber-500/50 font-bold"
                      : "bg-[#0c121e] text-slate-400 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  {status === "all" ? `All Events (${upcomingEvents.length})` : status}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredEvents.map((evt) => (
                <div
                  key={evt.id}
                  className="bg-[#0c121e] border border-slate-800 hover:border-amber-500/40 rounded-xl p-4 transition-all flex flex-col justify-between space-y-3 shadow-md"
                >
                  <div className="space-y-3">
                    {evt.imageUrl && (
                      <div className="relative w-full h-36 rounded-lg overflow-hidden bg-slate-900 border border-slate-800">
                        <Image
                          src={evt.imageUrl}
                          alt={evt.title}
                          fill
                          className="object-cover"
                          unoptimized={evt.imageUrl.startsWith("http")}
                        />
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase bg-[#131b2c] text-slate-300 px-2.5 py-0.5 rounded font-bold border border-slate-700">
                        {evt.category}
                      </span>
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                          evt.status === "Upcoming"
                            ? "bg-amber-950/80 text-amber-300 border border-amber-600/40"
                            : evt.status === "Ongoing"
                            ? "bg-emerald-950/80 text-emerald-300 border border-emerald-600/40 animate-pulse"
                            : "bg-slate-800 text-slate-400"
                        }`}
                      >
                        {evt.status}
                      </span>
                    </div>

                    <h4 className="font-tech text-base font-bold text-white leading-snug">
                      {evt.title}
                    </h4>

                    <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-amber-400" />
                        <span>{evt.date}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 truncate max-w-[150px]">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" />
                        <span>{evt.location}</span>
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 font-sans line-clamp-3">
                      {evt.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-500 uppercase">
                      CTA: {evt.ctaText}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          setEditingEvent(evt);
                          setIsEventModalOpen(true);
                        }}
                        className="p-1.5 text-slate-400 hover:text-amber-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                        title="Edit Event"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete event "${evt.title}"?`)) {
                            deleteEvent(evt.id);
                            showToast(`Deleted ${evt.title}`, "info");
                          }
                        }}
                        className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                        title="Delete Event"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 3: ROBOTICS FLEET                                             */}
        {/* ================================================================= */}
        {activeTab === "projects" && (
          <div className="space-y-4">
            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2 text-[11px] font-mono">
              {["all", "Robotics", "Autonomous", "Aquatics", "Manipulation", "Aerial"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setProjectFilter(cat)}
                  className={`px-3 py-1 rounded-full border transition-all cursor-pointer ${
                    projectFilter === cat
                      ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50 font-bold"
                      : "bg-[#0c121e] text-slate-400 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  {cat === "all" ? `All Platforms (${projects.length})` : cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProjects.map((proj) => (
                <div
                  key={proj.id}
                  className="bg-[#0c121e] border border-slate-800 hover:border-emerald-500/40 rounded-xl p-4 transition-all flex flex-col justify-between space-y-3 shadow-md"
                >
                  <div className="space-y-3">
                    {proj.imageUrl && (
                      <div className="relative w-full h-36 rounded-lg overflow-hidden bg-slate-900 border border-slate-800">
                        <Image
                          src={proj.imageUrl}
                          alt={proj.title}
                          fill
                          className="object-cover"
                          unoptimized={proj.imageUrl.startsWith("http")}
                        />
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase bg-[#131b2c] text-emerald-300 px-2 py-0.5 rounded font-bold border border-emerald-600/30">
                        {proj.category}
                      </span>
                      <span className="text-[10px] font-mono font-bold text-slate-300 bg-slate-800 px-2 py-0.5 rounded">
                        {proj.status}
                      </span>
                    </div>

                    <h4 className="font-tech text-base font-bold text-white leading-snug">
                      {proj.title}
                    </h4>

                    {proj.tagline && (
                      <p className="text-[11px] font-mono text-cyan-400">
                        {proj.tagline}
                      </p>
                    )}

                    <p className="text-xs text-slate-400 font-sans line-clamp-3">
                      {proj.description}
                    </p>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {proj.tags.slice(0, 4).map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#131b2c] text-slate-300 border border-slate-800"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-500">
                    <span>{proj.specs?.length || 0} Hardware Specs</span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          setEditingProject(proj);
                          setIsProjectModalOpen(true);
                        }}
                        className="p-1.5 text-slate-400 hover:text-emerald-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                        title="Edit Platform"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Retire platform "${proj.title}"?`)) {
                            deleteProject(proj.id);
                            showToast(`Deleted ${proj.title}`, "info");
                          }
                        }}
                        className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                        title="Delete Platform"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 4: LAB 104 & WORKSHOP MEDIA                                   */}
        {/* ================================================================= */}
        {activeTab === "gallery" && (
          <div className="space-y-4">
            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2 text-[11px] font-mono">
              {[
                "all",
                "Club Room & Workbenches",
                "Fabrication Bay",
                "Bootcamps & Cadets",
                "Testing Arena",
              ].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setGalleryFilter(cat)}
                  className={`px-3 py-1 rounded-full border transition-all cursor-pointer ${
                    galleryFilter === cat
                      ? "bg-blue-500/20 text-blue-300 border-blue-500/50 font-bold"
                      : "bg-[#0c121e] text-slate-400 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  {cat === "all" ? `All Media (${workshopGallery.length})` : cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredGallery.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#0c121e] border border-slate-800 hover:border-blue-500/40 rounded-xl p-4 transition-all flex flex-col justify-between space-y-3 shadow-md"
                >
                  <div className="space-y-3">
                    <div className="relative w-full h-44 rounded-lg overflow-hidden bg-slate-900 border border-slate-800">
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        className="object-cover"
                        unoptimized={item.imageUrl.startsWith("http")}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase bg-blue-950/80 text-blue-300 px-2 py-0.5 rounded font-bold border border-blue-600/30">
                        {item.badge}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 truncate max-w-[150px]">
                        {item.category}
                      </span>
                    </div>

                    <h4 className="font-tech text-base font-bold text-white leading-snug">
                      {item.title}
                    </h4>

                    <p className="text-xs text-slate-400 font-sans line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-1">
                    <button
                      onClick={() => {
                        setEditingGalleryItem(item);
                        setIsGalleryModalOpen(true);
                      }}
                      className="p-1.5 text-slate-400 hover:text-blue-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                      title="Edit Photo Info"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Remove photo "${item.title}"?`)) {
                          deleteGalleryItem(item.id);
                          showToast(`Removed photo ${item.title}`, "info");
                        }
                      }}
                      className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                      title="Delete Photo"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 5: SYSTEM TELEMETRY, PASSCODE & BACKUPS                       */}
        {/* ================================================================= */}
        {activeTab === "settings" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Backup & Snapshot Controls */}
            <div className="bg-[#0c121e] border border-slate-800 rounded-2xl p-6 space-y-5">
              <div>
                <h3 className="font-tech text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Download className="w-5 h-5 text-cyan-400" />
                  <span>Data Backups &amp; Snapshots</span>
                </h3>
                <p className="text-xs font-mono text-slate-400 mt-1">
                  Export or restore full JSON snapshot archives of the entire site.
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-[#131b2c] border border-slate-800 space-y-2">
                  <h4 className="text-xs font-mono font-bold text-white uppercase">
                    1-Click Export Site Snapshot
                  </h4>
                  <p className="text-xs text-slate-400">
                    Generates a timestamped JSON file containing all active cadre, upcoming events, robotics fleet, and lab 104 media.
                  </p>
                  <button
                    onClick={handleExportBackup}
                    className="bg-cyan-500 hover:bg-cyan-400 text-[#070b12] font-mono text-xs font-bold px-4 py-2 rounded-lg transition-all cursor-pointer uppercase tracking-wider shadow-[0_0_15px_rgba(0,240,255,0.3)] mt-1"
                  >
                    Download site-backup.json
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-[#131b2c] border border-slate-800 space-y-2">
                  <h4 className="text-xs font-mono font-bold text-white uppercase">
                    Restore from JSON Archive
                  </h4>
                  <p className="text-xs text-slate-400">
                    Upload a previously exported backup file to restore complete site data.
                  </p>
                  <label className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs font-bold px-4 py-2 rounded-lg transition-colors cursor-pointer mt-1">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Snapshot File</span>
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImportBackup}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Cloud & Passcode Settings */}
            <div className="space-y-6">
              {/* Cloud Database Guide */}
              <div className="bg-[#0c121e] border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-tech text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Cloud className="w-5 h-5 text-cyan-400" />
                    <span>Cloud Persistence (Supabase)</span>
                  </h3>
                  <span
                    className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full ${
                      cloudConnected
                        ? "bg-cyan-950 text-cyan-400 border border-cyan-500/40"
                        : "bg-amber-950 text-amber-300 border border-amber-500/40"
                    }`}
                  >
                    {cloudConnected ? "CONNECTED" : "LOCAL CACHE"}
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-sans">
                  Persists all events, cadre additions, and uploaded media directly in a free PostgreSQL database &amp; Edge Storage.
                </p>
                <button
                  onClick={() => setIsCloudHelpModalOpen(true)}
                  className="bg-[#131b2c] hover:bg-[#1a253c] text-cyan-400 border border-cyan-500/30 font-mono text-xs font-bold px-4 py-2 rounded-lg transition-colors cursor-pointer w-full text-center"
                >
                  View 2-Minute Supabase Setup Instructions →
                </button>
              </div>

              {/* Passcode update */}
              <div className="bg-[#0c121e] border border-slate-800 rounded-2xl p-6 space-y-4">
                <h3 className="font-tech text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Key className="w-5 h-5 text-cyan-400" />
                  <span>Update Admin Passcode</span>
                </h3>
                <form onSubmit={handleUpdatePasscode} className="space-y-3">
                  <input
                    type="password"
                    value={newPasscode}
                    onChange={(e) => setNewPasscode(e.target.value)}
                    placeholder="Enter new secret passcode (min 6 chars)"
                    className="w-full bg-[#131b2c] border border-slate-700 focus:border-cyan-400 rounded-lg px-3 py-2 text-white placeholder-slate-500 text-xs font-mono focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs font-bold px-4 py-2 rounded-lg transition-colors cursor-pointer"
                  >
                    Save New Passcode
                  </button>
                </form>
              </div>

              {/* Factory Reset */}
              <div className="bg-red-950/20 border border-red-900/40 rounded-2xl p-6 space-y-3">
                <h3 className="font-tech text-lg font-bold text-red-400 uppercase tracking-wider flex items-center gap-2">
                  <RotateCcw className="w-5 h-5 text-red-400" />
                  <span>Factory Reset</span>
                </h3>
                <p className="text-xs text-red-300/80">
                  Restores all default cadre, timeline events, and platforms back to initial repository state.
                </p>
                <button
                  onClick={handleResetData}
                  className="bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold px-4 py-2 rounded-lg transition-colors cursor-pointer uppercase"
                >
                  Reset All to Factory Defaults
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ========================================================================= */}
      {/* MODALS WITH LIVE CARD PREVIEW SIMULATOR                                    */}
      {/* ========================================================================= */}
      <MemberModal
        isOpen={isMemberModalOpen}
        initialData={editingMember}
        onClose={() => setIsMemberModalOpen(false)}
        onSave={(saved) => {
          if (editingMember) {
            updateMember(saved.id, saved);
            showToast(`Updated ${saved.name}`, "success");
          } else {
            addMember(saved);
            showToast(`Commissioned ${saved.name} to Cadre!`, "success");
          }
          setIsMemberModalOpen(false);
        }}
      />

      <EventModal
        isOpen={isEventModalOpen}
        initialData={editingEvent}
        onClose={() => setIsEventModalOpen(false)}
        onSave={(saved) => {
          if (editingEvent) {
            updateEvent(saved.id, saved);
            showToast(`Updated ${saved.title}`, "success");
          } else {
            addEvent(saved);
            showToast(`Scheduled event: ${saved.title}!`, "success");
          }
          setIsEventModalOpen(false);
        }}
      />

      <ProjectModal
        isOpen={isProjectModalOpen}
        initialData={editingProject}
        onClose={() => setIsProjectModalOpen(false)}
        onSave={(saved) => {
          if (editingProject) {
            updateProject(saved.id, saved);
            showToast(`Updated platform: ${saved.title}`, "success");
          } else {
            addProject(saved);
            showToast(`Deployed platform: ${saved.title}!`, "success");
          }
          setIsProjectModalOpen(false);
        }}
      />

      <GalleryModal
        isOpen={isGalleryModalOpen}
        initialData={editingGalleryItem}
        onClose={() => setIsGalleryModalOpen(false)}
        onSave={(saved) => {
          if (editingGalleryItem) {
            updateGalleryItem(saved.id, saved);
            showToast(`Updated photo: ${saved.title}`, "success");
          } else {
            addGalleryItem(saved);
            showToast(`Added ${saved.title} to Lab 104 Media!`, "success");
          }
          setIsGalleryModalOpen(false);
        }}
      />

      <CloudSetupModal
        isOpen={isCloudHelpModalOpen}
        onClose={() => setIsCloudHelpModalOpen(false)}
      />
    </div>
  );
}
