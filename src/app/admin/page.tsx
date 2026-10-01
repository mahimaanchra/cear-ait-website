"use client";

import React, { useState, useEffect } from "react";
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
} from "lucide-react";
import { useSiteContent } from "@/context/SiteContentContext";
import { TeamMember, EventItem, Project } from "@/data/siteData";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

const DEFAULT_PASSCODE = "cear@2026";
const AUTH_STORAGE_KEY = "cear_admin_auth";

export default function AdminPage() {
  const {
    facultyIncharge,
    secretaries,
    jointSecretaries,
    coreContributors,
    upcomingEvents,
    projects,
    addMember,
    updateMember,
    deleteMember,
    addEvent,
    updateEvent,
    deleteEvent,
    addProject,
    updateProject,
    deleteProject,
    saveChanges,
    resetToDefaults,
    isSaving,
    lastSaved,
    cloudConnected,
  } = useSiteContent();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  // Active Tab: 'team' | 'events' | 'projects' | 'settings'
  const [activeTab, setActiveTab] = useState<"team" | "events" | "projects" | "settings">("team");
  const [teamFilter, setTeamFilter] = useState<"all" | "faculty" | "secretary" | "joint_secretary" | "contributor">("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals State
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);

  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);

  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const [isCloudHelpModalOpen, setIsCloudHelpModalOpen] = useState(false);

  // Check stored auth on mount
  useEffect(() => {
    const isAuthStored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (isAuthStored === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === DEFAULT_PASSCODE) {
      setIsAuthenticated(true);
      setAuthError("");
      if (rememberMe) {
        localStorage.setItem(AUTH_STORAGE_KEY, "true");
      }
      showToast("Access Granted: Welcome to CEAR Admin Portal");
    } else {
      setAuthError("Incorrect passcode. Try default: cear@2026");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setPasscode("");
    showToast("Logged out successfully");
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleManualSave = async () => {
    const success = await saveChanges();
    if (success) {
      showToast("✓ All changes successfully saved to server & storage!");
    } else {
      showToast("Saved locally. Changes will persist on this browser.");
    }
  };

  const handleExportJSON = () => {
    const data = {
      facultyIncharge,
      secretaries,
      jointSecretaries,
      coreContributors,
      upcomingEvents,
      projects,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cear-siteData-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    showToast("Downloaded site data backup JSON!");
  };

  const handleResetData = async () => {
    if (window.confirm("Are you sure you want to reset all content back to factory defaults? Any custom added members or events will be restored to initial defaults.")) {
      await resetToDefaults();
      showToast("Reset all site content to original defaults.");
    }
  };

  // Aggregated team list
  const allMembers: TeamMember[] = [
    facultyIncharge,
    ...secretaries,
    ...jointSecretaries,
    ...coreContributors,
  ];

  const filteredMembers = allMembers.filter((m) => {
    const matchesTier = teamFilter === "all" || m.tier === teamFilter;
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.subRole && m.subRole.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTier && matchesSearch;
  });

  // ==========================================
  // 1. GATEKEEPER / AUTH SCREEN
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4 selection:bg-blue-600 selection:text-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md bg-slate-950 border border-slate-800 rounded-2xl p-8 shadow-2xl space-y-6"
        >
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-3 shadow-inner">
              <Shield className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-black font-tech tracking-tight text-white">
              CEAR Admin Portal
            </h1>
            <p className="text-xs font-mono text-slate-400">
              Centre of Excellence for AI &amp; Robotics • AIT Pune
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase font-bold">
                Admin Passcode
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter passcode (cear@2026)"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors font-mono"
                  autoFocus
                />
                <Key className="w-4 h-4 text-slate-500 absolute right-3.5 top-3.5" />
              </div>
            </div>

            {authError && (
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-red-950/50 border border-red-800 text-red-300 text-xs font-mono">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-800 text-blue-600 focus:ring-0"
                />
                <span>Remember this device</span>
              </label>
              <span className="text-[11px] text-slate-500">Key: cear@2026</span>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-tech font-bold py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Unlock className="w-4 h-4" />
              <span>Enter Management Portal</span>
            </button>
          </form>

          <div className="pt-4 border-t border-slate-800 text-center">
            <Link
              href="/"
              className="text-xs font-mono text-slate-400 hover:text-white transition-colors flex items-center justify-center gap-1.5"
            >
              <span>← Return to Public Website</span>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // ==========================================
  // 2. MAIN ADMIN DASHBOARD
  // ==========================================
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      {/* Toast Alert */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-5 right-5 z-50 bg-slate-900 text-white border border-slate-700 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 font-mono text-xs"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Admin Navbar */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-logo-navy text-white flex items-center justify-center font-black font-tech text-base">
              C
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-tech text-lg font-black text-slate-900">
                  CEAR Control Panel
                </h1>
                <span className="text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>ONLINE</span>
                </span>
                {cloudConnected ? (
                  <span className="hidden sm:inline-flex text-[10px] font-mono font-bold bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full items-center gap-1">
                    <Cloud className="w-3 h-3 text-blue-600" />
                    <span>CLOUD SYNC ACTIVE</span>
                  </span>
                ) : (
                  <button
                    onClick={() => setIsCloudHelpModalOpen(true)}
                    className="hidden sm:inline-flex text-[10px] font-mono font-bold bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 px-2 py-0.5 rounded-full items-center gap-1 transition-colors cursor-pointer"
                    title="Click for Cloud Database & Storage setup guide"
                  >
                    <Database className="w-3 h-3 text-amber-600" />
                    <span>LOCAL MODE • CONNECT CLOUD</span>
                  </button>
                )}
              </div>
              <p className="text-[11px] font-mono text-slate-500">
                AIT Pune • CMS &amp; Cadre Management
              </p>
            </div>
          </div>

          {/* Quick Actions Bar */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={handleManualSave}
              disabled={isSaving}
              className="bg-blue-600 hover:bg-blue-700 text-white font-tech font-bold text-xs px-3.5 py-2 rounded-lg shadow-sm hover:shadow transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSaving ? "Saving..." : "Save Changes"}</span>
            </button>

            <Link
              href="/"
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono text-xs font-semibold px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <span>View Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={handleLogout}
              className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Quick Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 text-xs font-mono">
              <span>TOTAL CADRE</span>
              <Users className="w-4 h-4 text-blue-600" />
            </div>
            <span className="text-3xl font-black font-tech text-slate-900 mt-1 block">
              {allMembers.length}
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              {secretaries.length} Sec • {jointSecretaries.length} Joint Sec
            </span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 text-xs font-mono">
              <span>UPCOMING EVENTS</span>
              <Calendar className="w-4 h-4 text-amber-500" />
            </div>
            <span className="text-3xl font-black font-tech text-slate-900 mt-1 block">
              {upcomingEvents.length}
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              Active in Event Stream
            </span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 text-xs font-mono">
              <span>ROBOTIC PLATFORMS</span>
              <Cpu className="w-4 h-4 text-emerald-600" />
            </div>
            <span className="text-3xl font-black font-tech text-slate-900 mt-1 block">
              {projects.length}
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              R&amp;D + Operational Fleet
            </span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 text-xs font-mono">
              <span>LAST PUBLISHED</span>
              <ShieldCheck className="w-4 h-4 text-blue-600" />
            </div>
            <span className="text-sm font-bold font-mono text-slate-800 mt-2 block truncate">
              {lastSaved ? lastSaved : "Initial Defaults"}
            </span>
            <span className="text-[11px] font-mono text-emerald-600 font-semibold">
              Live &amp; Synchronized
            </span>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-px gap-2 overflow-x-auto">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("team")}
              className={`py-3 px-4 text-sm font-tech font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "team"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Team &amp; Secretaries ({allMembers.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("events")}
              className={`py-3 px-4 text-sm font-tech font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "events"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Events &amp; Workshops ({upcomingEvents.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("projects")}
              className={`py-3 px-4 text-sm font-tech font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "projects"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>Projects Showcase ({projects.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("settings")}
              className={`py-3 px-4 text-sm font-tech font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "settings"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Backup &amp; Sync</span>
            </button>
          </div>
        </div>

        {/* ==================================================== */}
        {/* TAB 1: TEAM & LEADERSHIP CADRE                       */}
        {/* ==================================================== */}
        {activeTab === "team" && (
          <div className="space-y-6">
            {/* Toolbar: Filters, Search, Add Member CTA */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
                {(["all", "faculty", "secretary", "joint_secretary", "contributor"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTeamFilter(t)}
                    className={`px-3 py-1.5 rounded-lg font-bold capitalize transition-colors cursor-pointer ${
                      teamFilter === t
                        ? "bg-logo-navy text-white"
                        : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                    }`}
                  >
                    {t.replace("_", " ")}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2.5">
                <div className="relative flex-1 sm:w-64">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search member by name..."
                    className="w-full bg-white border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                </div>

                <button
                  onClick={() => {
                    setEditingMember(null);
                    setIsMemberModalOpen(true);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-tech font-bold text-xs py-2 px-3.5 rounded-lg flex items-center gap-1.5 shadow-sm transition-all cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Member</span>
                </button>
              </div>
            </div>

            {/* Members Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredMembers.map((member) => (
                <div
                  key={member.id}
                  className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-blue-300 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        {/* Avatar */}
                        <div
                          className={`w-14 h-14 rounded-xl aspect-square ${
                            member.avatarBg || "bg-blue-600 text-white"
                          } flex items-center justify-center font-tech font-bold text-base shrink-0 border border-slate-200 relative overflow-hidden`}
                        >
                          {member.imageUrl ? (
                            <Image
                              src={member.imageUrl}
                              alt={member.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <span>{member.avatarInitials || member.name.slice(0, 2).toUpperCase()}</span>
                          )}
                        </div>

                        <div>
                          <h4 className="font-tech text-base font-bold text-slate-900">
                            {member.name}
                          </h4>
                          <p className="text-xs font-tech font-bold text-blue-600">
                            {member.role}
                          </p>
                          <span className="inline-block mt-0.5 text-[9px] font-mono uppercase px-2 py-0.2 rounded bg-slate-100 text-slate-600 font-bold border border-slate-200">
                            {member.tier.replace("_", " ")}
                          </span>
                        </div>
                      </div>

                      {/* Edit/Delete Actions */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            setEditingMember(member);
                            setIsMemberModalOpen(true);
                          }}
                          className="p-1.5 rounded text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                          title="Edit member"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        {member.tier !== "faculty" && (
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete ${member.name} from website?`)) {
                                deleteMember(member.id);
                                showToast(`Removed ${member.name}`);
                              }
                            }}
                            className="p-1.5 rounded text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                            title="Delete member"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    {member.subRole && (
                      <p className="text-xs font-mono text-slate-500">
                        {member.subRole}
                      </p>
                    )}

                    {member.quote && (
                      <p className="text-xs font-sans text-slate-600 italic bg-slate-50 p-2 rounded border border-slate-100 line-clamp-2">
                        &ldquo;{member.quote}&rdquo;
                      </p>
                    )}

                    {member.specialization && (
                      <div className="text-[11px] font-mono text-slate-500">
                        <span className="font-bold text-slate-400">FOCUS: </span>
                        <span>{member.specialization}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>ID: {member.id}</span>
                    <div className="flex items-center gap-2">
                      {member.linkedin && <span className="text-blue-600 font-bold">LinkedIn</span>}
                      {member.github && <span className="text-slate-800 font-bold">GitHub</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 2: EVENTS & WORKSHOPS                           */}
        {/* ==================================================== */}
        {activeTab === "events" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-tech text-xl font-bold text-slate-900">
                  Event Stream &amp; Competitions
                </h3>
                <p className="text-xs font-mono text-slate-500">
                  Manage featured announcements and workshop registrations
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingEvent(null);
                  setIsEventModalOpen(true);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-tech font-bold text-xs py-2 px-3.5 rounded-lg flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Event</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {upcomingEvents.map((evt) => (
                <div
                  key={evt.id}
                  className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span
                          className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${
                            evt.status === "Ongoing"
                              ? "bg-amber-50 text-amber-800 border-amber-200"
                              : evt.status === "Upcoming"
                              ? "bg-blue-50 text-blue-700 border-blue-200"
                              : "bg-slate-100 text-slate-700 border-slate-200"
                          }`}
                        >
                          {evt.status}
                        </span>
                        <h4 className="font-tech text-lg font-bold text-slate-900 mt-2">
                          {evt.title}
                        </h4>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            setEditingEvent(evt);
                            setIsEventModalOpen(true);
                          }}
                          className="p-1.5 rounded text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                          title="Edit event"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete event "${evt.title}"?`)) {
                              deleteEvent(evt.id);
                              showToast(`Deleted ${evt.title}`);
                            }
                          }}
                          className="p-1.5 rounded text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete event"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-mono text-slate-600">
                      <span>📅 {evt.date}</span>
                      <span>📍 {evt.location}</span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed font-sans">
                      {evt.description}
                    </p>
                  </div>

                  <div className="pt-3 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500">
                    <span className="uppercase text-[10px] font-bold text-slate-400">
                      CTA: {evt.ctaText}
                    </span>
                    <span className="text-[10px] text-blue-600 font-bold">
                      Category: {evt.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 3: PROJECTS SHOWCASE                            */}
        {/* ==================================================== */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-tech text-xl font-bold text-slate-900">
                  Projects &amp; Robotic Platforms
                </h3>
                <p className="text-xs font-mono text-slate-500">
                  Currently {projects.length} platforms registered in fleet showcase
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingProject(null);
                  setIsProjectModalOpen(true);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-tech font-bold text-xs px-3.5 py-2 rounded-lg shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Platform</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between"
                >
                  <div className="space-y-2.5">
                    {proj.imageUrl && (
                      <div className="relative w-full h-36 rounded-lg overflow-hidden bg-slate-100 mb-2 border border-slate-200">
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
                      <span className="text-[10px] font-mono font-bold uppercase text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {proj.category}
                      </span>
                      <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {proj.status}
                      </span>
                    </div>

                    <h4 className="font-tech text-lg font-bold text-slate-900">
                      {proj.title}
                    </h4>

                    <p className="text-xs text-slate-600 font-sans line-clamp-3">
                      {proj.description}
                    </p>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {proj.tags.slice(0, 4).map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-50 text-slate-600 border border-slate-200"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500">
                    <span className="text-[10px] text-slate-400">
                      {proj.specs?.length || 0} Specs
                      {proj.githubUrl && " • GitHub"}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          setEditingProject(proj);
                          setIsProjectModalOpen(true);
                        }}
                        className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                        title="Edit Platform"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete project "${proj.title}"?`)) {
                            deleteProject(proj.id);
                            showToast(`Deleted ${proj.title}`);
                            handleManualSave();
                          }
                        }}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
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

        {/* ==================================================== */}
        {/* TAB 4: SETTINGS & EXPORT                            */}
        {/* ==================================================== */}
        {activeTab === "settings" && (
          <div className="max-w-2xl bg-white rounded-xl border border-slate-200 p-6 space-y-6">
            <div>
              <h3 className="font-tech text-xl font-bold text-slate-900">
                Backup, Sync &amp; Site Defaults
              </h3>
              <p className="text-xs font-mono text-slate-500">
                Manage data persistence and export complete JSON snapshots
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="font-tech font-bold text-sm text-slate-900 flex items-center gap-2">
                  <Download className="w-4 h-4 text-blue-600" />
                  <span>Export Site Data JSON</span>
                </h4>
                <p className="text-xs text-slate-600">
                  Download a timestamped JSON file containing all active team members, upcoming events, and projects. You can check this into Git or use it to seed production.
                </p>
                <button
                  onClick={handleExportJSON}
                  className="bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-mono text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer mt-1"
                >
                  Download siteData.json
                </button>
              </div>

              <div className="p-4 rounded-xl bg-red-50 border border-red-200 space-y-2">
                <h4 className="font-tech font-bold text-sm text-red-900 flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-red-600" />
                  <span>Factory Reset Content</span>
                </h4>
                <p className="text-xs text-red-700">
                  Restore all team members, events, and projects back to initial factory defaults. This discards any custom edits made in this admin session.
                </p>
                <button
                  onClick={handleResetData}
                  className="bg-red-600 hover:bg-red-700 text-white font-mono text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer mt-1"
                >
                  Reset All to Defaults
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ==================================================== */}
      {/* MODAL: ADD / EDIT TEAM MEMBER                        */}
      {/* ==================================================== */}
      {isMemberModalOpen && (
        <MemberFormModal
          isOpen={isMemberModalOpen}
          initialData={editingMember}
          onClose={() => setIsMemberModalOpen(false)}
          onSave={(savedMember) => {
            if (editingMember) {
              updateMember(savedMember.id, savedMember);
              showToast(`Updated ${savedMember.name}`);
            } else {
              addMember(savedMember);
              showToast(`Added ${savedMember.name} to team cadre!`);
            }
            setIsMemberModalOpen(false);
            handleManualSave();
          }}
        />
      )}

      {/* ==================================================== */}
      {/* MODAL: ADD / EDIT EVENT                              */}
      {/* ==================================================== */}
      {isEventModalOpen && (
        <EventFormModal
          isOpen={isEventModalOpen}
          initialData={editingEvent}
          onClose={() => setIsEventModalOpen(false)}
          onSave={(savedEvent) => {
            if (editingEvent) {
              updateEvent(savedEvent.id, savedEvent);
              showToast(`Updated ${savedEvent.title}`);
            } else {
              addEvent(savedEvent);
              showToast(`Added event: ${savedEvent.title}!`);
            }
            setIsEventModalOpen(false);
            handleManualSave();
          }}
        />
      )}
      {/* ==================================================== */}
      {/* MODAL: ADD / EDIT PROJECT                            */}
      {/* ==================================================== */}
      {isProjectModalOpen && (
        <ProjectFormModal
          isOpen={isProjectModalOpen}
          initialData={editingProject}
          onClose={() => setIsProjectModalOpen(false)}
          onSave={(savedProject) => {
            if (editingProject) {
              updateProject(savedProject.id, savedProject);
              showToast(`Updated ${savedProject.title}`);
            } else {
              addProject(savedProject);
              showToast(`Added platform: ${savedProject.title}!`);
            }
            setIsProjectModalOpen(false);
            handleManualSave();
          }}
        />
      )}

      {/* ==================================================== */}
      {/* MODAL: CLOUD DATABASE SETUP GUIDE                    */}
      {/* ==================================================== */}
      {isCloudHelpModalOpen && (
        <CloudSetupModal
          isOpen={isCloudHelpModalOpen}
          onClose={() => setIsCloudHelpModalOpen(false)}
        />
      )}
    </div>
  );
}

// ==========================================
// MEMBER FORM MODAL COMPONENT
// ==========================================
function MemberFormModal({
  isOpen,
  initialData,
  onClose,
  onSave,
}: {
  isOpen: boolean;
  initialData: TeamMember | null;
  onClose: () => void;
  onSave: (member: TeamMember) => void;
}) {
  const [name, setName] = useState(initialData?.name || "");
  const [role, setRole] = useState(initialData?.role || "");
  const [subRole, setSubRole] = useState(initialData?.subRole || "");
  const [tier, setTier] = useState<TeamMember["tier"]>(initialData?.tier || "secretary");
  const [quote, setQuote] = useState(initialData?.quote || "");
  const [specialization, setSpecialization] = useState(initialData?.specialization || "");
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || "");
  const [avatarInitials, setAvatarInitials] = useState(initialData?.avatarInitials || "");
  const [linkedin, setLinkedin] = useState(initialData?.linkedin || "");
  const [github, setGithub] = useState(initialData?.github || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const initials =
      avatarInitials.trim() ||
      name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    const member: TeamMember = {
      id: initialData?.id || `member-${Date.now()}`,
      name: name.trim(),
      role: role.trim() || "Member, CEAR",
      subRole: subRole.trim(),
      tier,
      quote: quote.trim() || "Pushing the frontiers of defense robotics and autonomous systems.",
      specialization: specialization.trim(),
      avatarInitials: initials,
      avatarBg:
        tier === "secretary"
          ? "bg-blue-600 text-white"
          : tier === "joint_secretary"
          ? "bg-emerald-600 text-white"
          : "bg-slate-700 text-white",
      imageUrl: imageUrl.trim() || undefined,
      linkedin: linkedin.trim() || undefined,
      github: github.trim() || undefined,
    };

    onSave(member);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-xl bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden font-sans my-8"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <h3 className="font-tech text-lg font-bold text-slate-900">
            {initialData ? `Edit Member: ${initialData.name}` : "Add New Team Member"}
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs font-mono">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 font-bold mb-1">FULL NAME *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rahul Sharma"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 text-xs focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">TIER / HIERARCHY *</label>
              <select
                value={tier}
                onChange={(e) => setTier(e.target.value as TeamMember["tier"])}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 text-xs focus:outline-none focus:border-blue-500"
              >
                <option value="secretary">Secretary (Core Lead)</option>
                <option value="joint_secretary">Joint Secretary (Domain Lead)</option>
                <option value="contributor">Core Contributor / 1st Year</option>
                <option value="faculty">Faculty In-Charge</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 font-bold mb-1">PRIMARY ROLE</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Secretary, CEAR or Tech Lead"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 text-xs focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">SUB-ROLE / DOMAIN</label>
              <input
                type="text"
                value={subRole}
                onChange={(e) => setSubRole(e.target.value)}
                placeholder="e.g. Executive Lead • Hardware Craft"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 text-xs focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <ImageUploadField
            label="PROFILE PHOTO (OPTIONAL)"
            value={imageUrl}
            onChange={setImageUrl}
            folder="team"
            helperText="Upload a profile picture or paste an image URL. Leave blank for initials badge."
          />

          <div>
            <label className="block text-slate-700 font-bold mb-1">SPECIALIZATION / FOCUS</label>
            <input
              type="text"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              placeholder="e.g. ROS2 Nav2, PCB Design, BLDC Actuation"
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 text-xs focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">1-LINE QUOTE / BIO</label>
            <textarea
              rows={2}
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              placeholder="A short motto or role focus..."
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 text-xs focus:outline-none focus:border-blue-500 font-sans"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 font-bold mb-1">LINKEDIN URL</label>
              <input
                type="url"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                placeholder="https://linkedin.com/in/..."
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 text-xs focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">GITHUB URL</label>
              <input
                type="url"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                placeholder="https://github.com/..."
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 text-xs focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 font-bold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-tech font-bold text-xs px-5 py-2.5 rounded-lg shadow-sm transition-all cursor-pointer"
            >
              {initialData ? "Update Member" : "Add to Team"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

// ==========================================
// EVENT FORM MODAL COMPONENT
// ==========================================
function EventFormModal({
  isOpen,
  initialData,
  onClose,
  onSave,
}: {
  isOpen: boolean;
  initialData: EventItem | null;
  onClose: () => void;
  onSave: (event: EventItem) => void;
}) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [date, setDate] = useState(initialData?.date || "");
  const [category, setCategory] = useState(initialData?.category || "Workshop");
  const [status, setStatus] = useState<EventItem["status"]>(initialData?.status || "Upcoming");
  const [location, setLocation] = useState(initialData?.location || "CEAR Robotics Lab, AIT");
  const [description, setDescription] = useState(initialData?.description || "");
  const [ctaText, setCtaText] = useState(initialData?.ctaText || "Register Now");
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const event: EventItem = {
      id: initialData?.id || `evt-${Date.now()}`,
      title: title.trim(),
      date: date.trim() || "Coming Soon",
      category: category.trim(),
      status,
      location: location.trim(),
      description: description.trim(),
      ctaText: ctaText.trim() || "View Details",
      imageUrl: imageUrl.trim() || undefined,
    };

    onSave(event);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-xl bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden font-sans my-8"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <h3 className="font-tech text-lg font-bold text-slate-900">
            {initialData ? `Edit Event: ${initialData.title}` : "Add New Event"}
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs font-mono">
          <div>
            <label className="block text-slate-700 font-bold mb-1">EVENT TITLE *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Autonomous Drone Racing Workshop"
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 text-xs focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 font-bold mb-1">DATE / SCHEDULE *</label>
              <input
                type="text"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="e.g. November 2026 or Oct 14–16"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 text-xs focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">STATUS *</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as EventItem["status"])}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 text-xs focus:outline-none focus:border-blue-500"
              >
                <option value="Upcoming">Upcoming</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 font-bold mb-1">CATEGORY</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. Hands-on Workshop or Flagship Fest"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 text-xs focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">LOCATION / VENUE</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Manekshaw Hall & CEAR Lab 104"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 text-xs focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">DESCRIPTION</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What will participants learn or build? Eligibility..."
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 text-xs focus:outline-none focus:border-blue-500 font-sans"
            />
          </div>

          <ImageUploadField
            label="EVENT BANNER / POSTER (OPTIONAL)"
            value={imageUrl}
            onChange={setImageUrl}
            folder="events"
            helperText="Upload event poster or flyer from device, or paste image URL."
          />

          <div>
            <label className="block text-slate-700 font-bold mb-1">CTA BUTTON TEXT</label>
            <input
              type="text"
              value={ctaText}
              onChange={(e) => setCtaText(e.target.value)}
              placeholder="e.g. Register for Workshop"
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 text-xs focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 font-bold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-tech font-bold text-xs px-5 py-2.5 rounded-lg shadow-sm transition-all cursor-pointer"
            >
              {initialData ? "Update Event" : "Publish Event"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

// ==========================================
// PROJECT FORM MODAL COMPONENT
// ==========================================
function ProjectFormModal({
  isOpen,
  initialData,
  onClose,
  onSave,
}: {
  isOpen: boolean;
  initialData: Project | null;
  onClose: () => void;
  onSave: (project: Project) => void;
}) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [category, setCategory] = useState<Project["category"]>(
    initialData?.category || "Robotics"
  );
  const [tagline, setTagline] = useState(initialData?.tagline || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [status, setStatus] = useState<Project["status"]>(
    initialData?.status || "Active R&D"
  );
  const [tagsStr, setTagsStr] = useState(
    initialData?.tags?.join(", ") || "Robotics, Hardware, ROS2"
  );
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || "");
  const [githubUrl, setGithubUrl] = useState(initialData?.githubUrl || "");
  const [demoUrl, setDemoUrl] = useState(initialData?.demoUrl || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const tags = tagsStr
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const project: Project = {
      id: initialData?.id || `proj-${Date.now()}`,
      title: title.trim(),
      category,
      tagline: tagline.trim() || title.trim(),
      description: description.trim(),
      longDescription: initialData?.longDescription || description.trim(),
      status,
      tags: tags.length > 0 ? tags : ["Robotics", "Hardware"],
      specs: initialData?.specs || [
        { label: "Category", value: category },
        { label: "Status", value: status },
      ],
      imageUrl: imageUrl.trim() || undefined,
      githubUrl: githubUrl.trim() || undefined,
      demoUrl: demoUrl.trim() || undefined,
    };

    onSave(project);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-xl bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden font-sans my-8"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <h3 className="font-tech text-lg font-bold text-slate-900">
            {initialData ? `Edit Platform: ${initialData.title}` : "Add New Robotic Platform"}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs font-mono">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 font-bold mb-1">PLATFORM TITLE *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Cerberus UGV"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 text-xs focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">CATEGORY *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Project["category"])}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 text-xs focus:outline-none focus:border-blue-500"
              >
                <option value="Robotics">Robotics</option>
                <option value="Autonomous">Autonomous</option>
                <option value="Aquatics">Aquatics</option>
                <option value="Manipulation">Manipulation</option>
                <option value="Aerial">Aerial</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 font-bold mb-1">STATUS</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as Project["status"])}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 text-xs focus:outline-none focus:border-blue-500"
              >
                <option value="Active R&D">Active R&D</option>
                <option value="Operational">Operational</option>
                <option value="Completed">Completed</option>
                <option value="Podium Winner">Podium Winner</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">TAGLINE / ONE-LINER</label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="e.g. All-Terrain Autonomous Reconnaissance UGV"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 text-xs focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">SHORT DESCRIPTION</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe platform mission, navigation stack, and sensors..."
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 text-xs focus:outline-none focus:border-blue-500 font-sans"
            />
          </div>

          <ImageUploadField
            label="PLATFORM HARDWARE PHOTO"
            value={imageUrl}
            onChange={setImageUrl}
            folder="projects"
            helperText="Upload a photo of the bot/hardware, or paste an image URL."
          />

          <div>
            <label className="block text-slate-700 font-bold mb-1">
              TECH TAGS (COMMA SEPARATED)
            </label>
            <input
              type="text"
              value={tagsStr}
              onChange={(e) => setTagsStr(e.target.value)}
              placeholder="ROS2, Nav2, Jetson Orin, LiDAR, BLDC"
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 text-xs focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 font-bold mb-1">GITHUB REPO URL</label>
              <input
                type="url"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/cear-ait/..."
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 text-xs focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">DEMO / VIDEO URL</label>
              <input
                type="url"
                value={demoUrl}
                onChange={(e) => setDemoUrl(e.target.value)}
                placeholder="https://youtube.com/watch?v=..."
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 text-xs focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 font-bold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-tech font-bold text-xs px-5 py-2.5 rounded-lg shadow-sm transition-all cursor-pointer"
            >
              {initialData ? "Update Platform" : "Add Platform"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

// ==========================================
// CLOUD DATABASE & STORAGE SETUP GUIDE MODAL
// ==========================================
function CloudSetupModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);

  const sqlCode = `-- 1. Create table for persisting dynamic site content
CREATE TABLE IF NOT EXISTS public.site_content (
  id TEXT PRIMARY KEY,
  payload JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. Enable row level security (RLS)
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- 3. Allow anonymous public read
CREATE POLICY "Public Read Access" 
ON public.site_content FOR SELECT USING (true);

-- 4. Allow anonymous write/update for admin sync
CREATE POLICY "Public Write Access" 
ON public.site_content FOR ALL USING (true);

-- 5. Create public media bucket for image uploads
INSERT INTO storage.buckets (id, name, public) 
VALUES ('cear-media', 'cear-media', true)
ON CONFLICT (id) DO NOTHING;

-- 6. Storage bucket policy: public read & write
CREATE POLICY "Public Media Access" 
ON storage.objects FOR ALL USING (bucket_id = 'cear-media');`;

  const copySql = () => {
    navigator.clipboard.writeText(sqlCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-2xl bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden font-sans my-8"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Cloud className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-tech text-base font-bold text-slate-900">
                Connect Free Supabase Cloud Database &amp; Storage
              </h3>
              <p className="text-[11px] font-mono text-slate-500">
                2-minute setup to persist updates &amp; image uploads live on Vercel
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5 text-xs font-sans text-slate-700 max-h-[75vh] overflow-y-auto">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono font-bold text-slate-900">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[11px]">
                1
              </span>
              <span>Create a Free Supabase Project</span>
            </div>
            <p className="text-slate-600 text-xs pl-7">
              Go to{" "}
              <a
                href="https://supabase.com"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 font-bold underline"
              >
                supabase.com
              </a>{" "}
              and click <strong>New project</strong> (100% free forever for hobby/club usage).
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between font-mono font-bold text-slate-900">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[11px]">
                  2
                </span>
                <span>Run SQL Script in Supabase SQL Editor</span>
              </div>
              <button
                onClick={copySql}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono text-[11px] font-semibold transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                    <span>Copy SQL</span>
                  </>
                )}
              </button>
            </div>
            <div className="pl-7">
              <pre className="p-3 bg-slate-900 text-slate-200 rounded-xl font-mono text-[11px] overflow-x-auto leading-relaxed">
                {sqlCode}
              </pre>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono font-bold text-slate-900">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[11px]">
                3
              </span>
              <span>Add Keys to .env.local (or Vercel Environment Variables)</span>
            </div>
            <div className="pl-7 space-y-2">
              <p className="text-slate-600 text-xs">
                In Supabase, go to <strong>Project Settings → API</strong> and copy your Project URL and anon public key into your <code>.env.local</code> file:
              </p>
              <pre className="p-3 bg-slate-900 text-emerald-400 rounded-xl font-mono text-[11px] overflow-x-auto leading-relaxed">
{`NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`}
              </pre>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs">
            💡 <strong>Note:</strong> Until you add the Supabase keys, your website works smoothly in <strong>Local Mode</strong>, saving images to <code>public/uploads/</code> and data to local storage.
          </div>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-mono text-xs font-bold rounded-lg cursor-pointer transition-colors"
          >
            Close Guide
          </button>
        </div>
      </motion.div>
    </div>
  );
}
