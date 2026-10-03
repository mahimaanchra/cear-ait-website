"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  X,
  Plus,
  Trash2,
  ExternalLink,
  Github,
  Calendar,
  MapPin,
  Sparkles,
  Eye,
  Copy,
  Check,
  Cloud,
  Layers,
  Upload,
} from "lucide-react";
import { TeamMember, EventItem, Project, WorkshopMediaItem } from "@/data/siteData";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

// =========================================================================
// 1. TEAM MEMBER MODAL WITH LIVE CARD SIMULATOR
// =========================================================================
export function MemberModal({
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
  const [linkedin, setLinkedin] = useState(initialData?.linkedin || "");
  const [github, setGithub] = useState(initialData?.github || "");

  if (!isOpen) return null;

  const initials =
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "CR";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const member: TeamMember = {
      id: initialData?.id || `member-${Date.now()}`,
      name: name.trim(),
      role: role.trim() || "Member, CEAR",
      subRole: subRole.trim(),
      tier,
      quote: quote.trim() || "Pushing frontiers of autonomous defense robotics.",
      specialization: specialization.trim(),
      avatarInitials: initials,
      avatarBg:
        tier === "faculty"
          ? "bg-amber-600 text-white"
          : tier === "secretary"
          ? "bg-cyan-600 text-white"
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="w-full max-w-4xl bg-[#0c121e] border border-cyan-500/30 rounded-2xl shadow-[0_0_50px_rgba(0,240,255,0.15)] overflow-hidden font-sans my-8"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#080d16]">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <h3 className="font-tech text-base sm:text-lg font-bold text-white tracking-wide uppercase">
              {initialData ? `Edit Cadre: ${initialData.name}` : "Commission New Cadre Member"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[80vh] overflow-y-auto">
          {/* Left Form: 7 cols */}
          <form onSubmit={handleSubmit} className="lg:col-span-7 p-6 space-y-4 text-xs font-mono border-b lg:border-b-0 lg:border-r border-slate-800">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-slate-300 font-bold mb-1 tracking-wider uppercase">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full bg-[#131b2c] border border-slate-700 focus:border-cyan-400 rounded-lg px-3 py-2 text-white placeholder-slate-500 text-xs focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1 tracking-wider uppercase">
                  Cadre Tier *
                </label>
                <select
                  value={tier}
                  onChange={(e) => setTier(e.target.value as TeamMember["tier"])}
                  className="w-full bg-[#131b2c] border border-slate-700 focus:border-cyan-400 rounded-lg px-3 py-2 text-white text-xs focus:outline-none transition-colors cursor-pointer"
                >
                  <option value="secretary">Secretary (Core Lead)</option>
                  <option value="joint_secretary">Joint Secretary (Domain Lead)</option>
                  <option value="contributor">Core Contributor / Cadet</option>
                  <option value="faculty">Faculty In-Charge</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-slate-300 font-bold mb-1 tracking-wider uppercase">
                  Primary Title / Role
                </label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. Secretary, CEAR"
                  className="w-full bg-[#131b2c] border border-slate-700 focus:border-cyan-400 rounded-lg px-3 py-2 text-white placeholder-slate-500 text-xs focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1 tracking-wider uppercase">
                  Sub-Role / Domain Focus
                </label>
                <input
                  type="text"
                  value={subRole}
                  onChange={(e) => setSubRole(e.target.value)}
                  placeholder="e.g. Autonomous Hardware"
                  className="w-full bg-[#131b2c] border border-slate-700 focus:border-cyan-400 rounded-lg px-3 py-2 text-white placeholder-slate-500 text-xs focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="p-3 bg-[#111827] rounded-xl border border-slate-800">
              <ImageUploadField
                label="PROFILE PHOTOGRAPHY"
                value={imageUrl}
                onChange={setImageUrl}
                folder="team"
                helperText="Upload official cadet/faculty photo or paste an HTTPS URL."
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1 tracking-wider uppercase">
                Specialization / Stack
              </label>
              <input
                type="text"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                placeholder="e.g. ROS2 Nav2, PCB Design, BLDC Actuation"
                className="w-full bg-[#131b2c] border border-slate-700 focus:border-cyan-400 rounded-lg px-3 py-2 text-white placeholder-slate-500 text-xs focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1 tracking-wider uppercase">
                1-Line Motto / Tactical Bio
              </label>
              <textarea
                rows={2}
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                placeholder="Short role quote..."
                className="w-full bg-[#131b2c] border border-slate-700 focus:border-cyan-400 rounded-lg px-3 py-2 text-white placeholder-slate-500 text-xs focus:outline-none font-sans transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-slate-300 font-bold mb-1 tracking-wider uppercase">
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  placeholder="https://linkedin.com/in/..."
                  className="w-full bg-[#131b2c] border border-slate-700 focus:border-cyan-400 rounded-lg px-3 py-2 text-white placeholder-slate-500 text-xs focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1 tracking-wider uppercase">
                  GitHub Profile URL
                </label>
                <input
                  type="url"
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                  placeholder="https://github.com/..."
                  className="w-full bg-[#131b2c] border border-slate-700 focus:border-cyan-400 rounded-lg px-3 py-2 text-white placeholder-slate-500 text-xs focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="pt-4 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-cyan-500 hover:bg-cyan-400 text-[#09101d] font-tech font-bold text-xs px-5 py-2.5 rounded-lg shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all cursor-pointer uppercase"
              >
                {initialData ? "Update Member" : "Commit to Cadre"}
              </button>
            </div>
          </form>

          {/* Right: Live Preview: 5 cols */}
          <div className="lg:col-span-5 p-6 bg-[#080d16] flex flex-col justify-center items-center space-y-3">
            <div className="w-full flex items-center justify-between text-[10px] font-mono text-cyan-400 uppercase tracking-widest border-b border-slate-800 pb-2">
              <span className="flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5" /> Live Card Preview
              </span>
              <span className="text-slate-500">Public View</span>
            </div>

            {/* Simulated Public Card */}
            <div className="w-full max-w-sm rounded-2xl bg-white text-[#0d1321] p-5 shadow-2xl border border-slate-200 space-y-4">
              <div className="flex items-center gap-3.5">
                {imageUrl ? (
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                    <Image
                      src={imageUrl}
                      alt={name || "Preview"}
                      fill
                      className="object-cover"
                      unoptimized={imageUrl.startsWith("http")}
                    />
                  </div>
                ) : (
                  <div className="w-14 h-14 rounded-xl bg-slate-900 text-cyan-400 font-tech font-bold text-lg flex items-center justify-center border border-slate-800 shrink-0">
                    {initials}
                  </div>
                )}
                <div>
                  <h4 className="font-tech text-base font-bold text-slate-900 leading-tight">
                    {name || "Cadre Member Name"}
                  </h4>
                  <p className="text-[11px] font-mono text-blue-600 font-semibold mt-0.5">
                    {role || "Role in CEAR"}
                  </p>
                  {subRole && (
                    <p className="text-[10px] font-mono text-slate-500">
                      {subRole}
                    </p>
                  )}
                </div>
              </div>

              {specialization && (
                <div className="text-[10px] font-mono bg-slate-50 border border-slate-200 px-2.5 py-1 rounded text-slate-700">
                  <span className="font-bold text-blue-600">Focus: </span>
                  {specialization}
                </div>
              )}

              <p className="text-xs text-slate-600 italic font-sans border-l-2 border-blue-500 pl-2 py-0.5">
                &ldquo;{quote || "Pushing frontiers of autonomous defense robotics."}&rdquo;
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[10px] font-mono text-slate-400">
                <span className="uppercase font-bold text-slate-500 tracking-wider">
                  Tier: {tier}
                </span>
                <div className="flex items-center gap-2 text-slate-600">
                  {linkedin && <span>LinkedIn ✓</span>}
                  {github && <span>GitHub ✓</span>}
                </div>
              </div>
            </div>

            <p className="text-[10px] font-mono text-slate-500 text-center">
              Changes reflect immediately on CEAR Team Cadre page.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// =========================================================================
// 2. EVENT MODAL WITH LIVE CARD SIMULATOR
// =========================================================================
export function EventModal({
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
  const [location, setLocation] = useState(initialData?.location || "CEAR Robotics Lab 104, AIT");
  const [description, setDescription] = useState(initialData?.description || "");
  const [ctaText, setCtaText] = useState(initialData?.ctaText || "Register for Workshop");
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || "");

  if (!isOpen) return null;

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
      ctaText: ctaText.trim() || "Register",
      imageUrl: imageUrl.trim() || undefined,
    };

    onSave(event);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="w-full max-w-4xl bg-[#0c121e] border border-cyan-500/30 rounded-2xl shadow-[0_0_50px_rgba(0,240,255,0.15)] overflow-hidden font-sans my-8"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#080d16]">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <h3 className="font-tech text-base sm:text-lg font-bold text-white tracking-wide uppercase">
              {initialData ? `Edit Event: ${initialData.title}` : "Schedule New Event / Bootcamp"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[80vh] overflow-y-auto">
          {/* Left Form: 7 cols */}
          <form onSubmit={handleSubmit} className="lg:col-span-7 p-6 space-y-4 text-xs font-mono border-b lg:border-b-0 lg:border-r border-slate-800">
            <div>
              <label className="block text-slate-300 font-bold mb-1 tracking-wider uppercase">
                Event Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Autonomous Drone Racing & ROS2 Bootcamp"
                className="w-full bg-[#131b2c] border border-slate-700 focus:border-cyan-400 rounded-lg px-3 py-2 text-white placeholder-slate-500 text-xs focus:outline-none transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-slate-300 font-bold mb-1 tracking-wider uppercase">
                  Schedule / Date *
                </label>
                <input
                  type="text"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="e.g. November 14–16, 2026"
                  className="w-full bg-[#131b2c] border border-slate-700 focus:border-cyan-400 rounded-lg px-3 py-2 text-white placeholder-slate-500 text-xs focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1 tracking-wider uppercase">
                  Timeline Status *
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as EventItem["status"])}
                  className="w-full bg-[#131b2c] border border-slate-700 focus:border-cyan-400 rounded-lg px-3 py-2 text-white text-xs focus:outline-none transition-colors cursor-pointer"
                >
                  <option value="Upcoming">Upcoming</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-slate-300 font-bold mb-1 tracking-wider uppercase">
                  Category
                </label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g. Hands-on Workshop or Flagship Fest"
                  className="w-full bg-[#131b2c] border border-slate-700 focus:border-cyan-400 rounded-lg px-3 py-2 text-white placeholder-slate-500 text-xs focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1 tracking-wider uppercase">
                  Venue / Lab Location
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Manekshaw Hall & CEAR Lab 104"
                  className="w-full bg-[#131b2c] border border-slate-700 focus:border-cyan-400 rounded-lg px-3 py-2 text-white placeholder-slate-500 text-xs focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1 tracking-wider uppercase">
                Detailed Overview
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What will participants build, learn, and test? Prerequisites..."
                className="w-full bg-[#131b2c] border border-slate-700 focus:border-cyan-400 rounded-lg px-3 py-2 text-white placeholder-slate-500 text-xs focus:outline-none font-sans transition-colors"
              />
            </div>

            <div className="p-3 bg-[#111827] rounded-xl border border-slate-800">
              <ImageUploadField
                label="EVENT POSTER / FLYER (OPTIONAL)"
                value={imageUrl}
                onChange={setImageUrl}
                folder="events"
                helperText="Upload official event banner or paste an image URL."
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1 tracking-wider uppercase">
                Call to Action Button Text
              </label>
              <input
                type="text"
                value={ctaText}
                onChange={(e) => setCtaText(e.target.value)}
                placeholder="e.g. Register for Workshop"
                className="w-full bg-[#131b2c] border border-slate-700 focus:border-cyan-400 rounded-lg px-3 py-2 text-white placeholder-slate-500 text-xs focus:outline-none transition-colors"
              />
            </div>

            <div className="pt-4 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-cyan-500 hover:bg-cyan-400 text-[#09101d] font-tech font-bold text-xs px-5 py-2.5 rounded-lg shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all cursor-pointer uppercase"
              >
                {initialData ? "Update Event" : "Publish Event"}
              </button>
            </div>
          </form>

          {/* Right: Live Preview */}
          <div className="lg:col-span-5 p-6 bg-[#080d16] flex flex-col justify-center items-center space-y-3">
            <div className="w-full flex items-center justify-between text-[10px] font-mono text-cyan-400 uppercase tracking-widest border-b border-slate-800 pb-2">
              <span className="flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5" /> Event Stream Simulator
              </span>
              <span className="text-slate-500">Public Preview</span>
            </div>

            <div className="w-full max-w-sm rounded-2xl bg-white text-[#0d1321] p-5 shadow-2xl border border-slate-200 space-y-3.5">
              {imageUrl && (
                <div className="relative w-full h-36 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                  <Image
                    src={imageUrl}
                    alt={title || "Event Poster"}
                    fill
                    className="object-cover"
                    unoptimized={imageUrl.startsWith("http")}
                  />
                </div>
              )}

              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-widest uppercase bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full font-bold">
                  {category || "Workshop"}
                </span>
                <span className="text-[10px] font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {status}
                </span>
              </div>

              <h4 className="font-display text-lg font-bold text-slate-900 leading-tight">
                {title || "Event Title Preview"}
              </h4>

              <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono text-slate-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-slate-700" />
                  <span>{date || "Schedule TBD"}</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 truncate max-w-[150px]">
                  <MapPin className="w-3 h-3 text-slate-700" />
                  <span>{location || "AIT Campus"}</span>
                </span>
              </div>

              <p className="text-xs text-slate-600 font-sans line-clamp-2">
                {description || "Join cadets and domain leads for intense hands-on prototyping."}
              </p>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-400">
                  All Cadets
                </span>
                <span className="text-xs font-mono font-bold text-white bg-slate-900 px-3 py-1 rounded-full">
                  {ctaText || "Register"} →
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// =========================================================================
// 3. ROBOTIC PLATFORM / PROJECT MODAL WITH LIVE CARD SIMULATOR
// =========================================================================
export function ProjectModal({
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
  const [category, setCategory] = useState<Project["category"]>(initialData?.category || "Robotics");
  const [tagline, setTagline] = useState(initialData?.tagline || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [status, setStatus] = useState<Project["status"]>(initialData?.status || "Active R&D");
  const [tagsStr, setTagsStr] = useState(initialData?.tags?.join(", ") || "ROS2, Nav2, BLDC");
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || "");
  const [githubUrl, setGithubUrl] = useState(initialData?.githubUrl || "");
  const [demoUrl, setDemoUrl] = useState(initialData?.demoUrl || "");

  if (!isOpen) return null;

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="w-full max-w-4xl bg-[#0c121e] border border-cyan-500/30 rounded-2xl shadow-[0_0_50px_rgba(0,240,255,0.15)] overflow-hidden font-sans my-8"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#080d16]">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <h3 className="font-tech text-base sm:text-lg font-bold text-white tracking-wide uppercase">
              {initialData ? `Edit Platform: ${initialData.title}` : "Deploy New Robotic Platform"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[80vh] overflow-y-auto">
          {/* Left Form: 7 cols */}
          <form onSubmit={handleSubmit} className="lg:col-span-7 p-6 space-y-4 text-xs font-mono border-b lg:border-b-0 lg:border-r border-slate-800">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-slate-300 font-bold mb-1 tracking-wider uppercase">
                  Platform Designation *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Cerberus UGV"
                  className="w-full bg-[#131b2c] border border-slate-700 focus:border-cyan-400 rounded-lg px-3 py-2 text-white placeholder-slate-500 text-xs focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1 tracking-wider uppercase">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Project["category"])}
                  className="w-full bg-[#131b2c] border border-slate-700 focus:border-cyan-400 rounded-lg px-3 py-2 text-white text-xs focus:outline-none transition-colors cursor-pointer"
                >
                  <option value="Robotics">Robotics</option>
                  <option value="Autonomous">Autonomous</option>
                  <option value="Aquatics">Aquatics</option>
                  <option value="Manipulation">Manipulation</option>
                  <option value="Aerial">Aerial</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-slate-300 font-bold mb-1 tracking-wider uppercase">
                  Operational Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as Project["status"])}
                  className="w-full bg-[#131b2c] border border-slate-700 focus:border-cyan-400 rounded-lg px-3 py-2 text-white text-xs focus:outline-none transition-colors cursor-pointer"
                >
                  <option value="Active R&D">Active R&D</option>
                  <option value="Operational">Operational</option>
                  <option value="Completed">Completed</option>
                  <option value="Podium Winner">Podium Winner</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1 tracking-wider uppercase">
                  Tagline / Tactical Mission
                </label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="e.g. All-Terrain Reconnaissance Bot"
                  className="w-full bg-[#131b2c] border border-slate-700 focus:border-cyan-400 rounded-lg px-3 py-2 text-white placeholder-slate-500 text-xs focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1 tracking-wider uppercase">
                Hardware Architecture &amp; Mission Overview
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Kinematics, sensors, computer stack, compute load..."
                className="w-full bg-[#131b2c] border border-slate-700 focus:border-cyan-400 rounded-lg px-3 py-2 text-white placeholder-slate-500 text-xs focus:outline-none font-sans transition-colors"
              />
            </div>

            <div className="p-3 bg-[#111827] rounded-xl border border-slate-800">
              <ImageUploadField
                label="HARDWARE ROBOT PHOTOGRAPHY"
                value={imageUrl}
                onChange={setImageUrl}
                folder="projects"
                helperText="Upload robot image or chassis photo."
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1 tracking-wider uppercase">
                Tech Stack Tags (Comma Separated)
              </label>
              <input
                type="text"
                value={tagsStr}
                onChange={(e) => setTagsStr(e.target.value)}
                placeholder="ROS2, Nav2, Jetson Orin, LiDAR, BLDC"
                className="w-full bg-[#131b2c] border border-slate-700 focus:border-cyan-400 rounded-lg px-3 py-2 text-white placeholder-slate-500 text-xs focus:outline-none transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-slate-300 font-bold mb-1 tracking-wider uppercase">
                  GitHub Repository Link
                </label>
                <input
                  type="url"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  placeholder="https://github.com/cear-ait/..."
                  className="w-full bg-[#131b2c] border border-slate-700 focus:border-cyan-400 rounded-lg px-3 py-2 text-white placeholder-slate-500 text-xs focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1 tracking-wider uppercase">
                  Telemetry / Video Demo URL
                </label>
                <input
                  type="url"
                  value={demoUrl}
                  onChange={(e) => setDemoUrl(e.target.value)}
                  placeholder="https://youtube.com/watch?v=..."
                  className="w-full bg-[#131b2c] border border-slate-700 focus:border-cyan-400 rounded-lg px-3 py-2 text-white placeholder-slate-500 text-xs focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="pt-4 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-cyan-500 hover:bg-cyan-400 text-[#09101d] font-tech font-bold text-xs px-5 py-2.5 rounded-lg shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all cursor-pointer uppercase"
              >
                {initialData ? "Update Platform" : "Add to Fleet"}
              </button>
            </div>
          </form>

          {/* Right: Live Preview */}
          <div className="lg:col-span-5 p-6 bg-[#080d16] flex flex-col justify-center items-center space-y-3">
            <div className="w-full flex items-center justify-between text-[10px] font-mono text-cyan-400 uppercase tracking-widest border-b border-slate-800 pb-2">
              <span className="flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5" /> Fleet Showcase Preview
              </span>
              <span className="text-slate-500">Public Card</span>
            </div>

            <div className="w-full max-w-sm rounded-2xl bg-white text-[#0d1321] p-5 shadow-2xl border border-slate-200 space-y-3.5">
              {imageUrl && (
                <div className="relative w-full h-36 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                  <Image
                    src={imageUrl}
                    alt={title || "Robot"}
                    fill
                    className="object-cover"
                    unoptimized={imageUrl.startsWith("http")}
                  />
                </div>
              )}

              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  {category}
                </span>
                <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {status}
                </span>
              </div>

              <h4 className="font-tech text-lg font-bold text-slate-900 leading-tight">
                {title || "Platform Name Preview"}
              </h4>

              <p className="text-xs text-slate-600 font-sans line-clamp-3">
                {description || "Autonomous navigation, custom electronics, and edge acceleration."}
              </p>

              <div className="flex flex-wrap gap-1 pt-1">
                {tagsStr.split(",").slice(0, 3).map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-50 text-slate-700 border border-slate-200"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span>View Hardware Specs →</span>
                {githubUrl && <span className="text-blue-600 font-bold">GitHub Repo ✓</span>}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// =========================================================================
// 4. WORKSHOP & LAB 104 GALLERY MODAL WITH LIVE CARD SIMULATOR
// =========================================================================
export function GalleryModal({
  isOpen,
  initialData,
  onClose,
  onSave,
}: {
  isOpen: boolean;
  initialData: WorkshopMediaItem | null;
  onClose: () => void;
  onSave: (item: WorkshopMediaItem) => void;
}) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [category, setCategory] = useState<WorkshopMediaItem["category"]>(
    initialData?.category || "Club Room & Workbenches"
  );
  const [badge, setBadge] = useState(initialData?.badge || "LAB 104");
  const [description, setDescription] = useState(initialData?.description || "");
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || "");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !imageUrl.trim()) return;

    const item: WorkshopMediaItem = {
      id: initialData?.id || `gallery-${Date.now()}`,
      title: title.trim(),
      category,
      badge: badge.trim().toUpperCase() || "LAB 104",
      description: description.trim(),
      imageUrl: imageUrl.trim(),
      specs: initialData?.specs || ["High-Res Capture", category],
    };

    onSave(item);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="w-full max-w-3xl bg-[#0c121e] border border-cyan-500/30 rounded-2xl shadow-[0_0_50px_rgba(0,240,255,0.15)] overflow-hidden font-sans my-8"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#080d16]">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <h3 className="font-tech text-base sm:text-lg font-bold text-white tracking-wide uppercase">
              {initialData ? `Edit Lab Photo: ${initialData.title}` : "Add Photo to Lab 104 Archive"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs font-mono">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-slate-300 font-bold mb-1 tracking-wider uppercase">
                Photo Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Lab 104 Electronics Workbench"
                className="w-full bg-[#131b2c] border border-slate-700 focus:border-cyan-400 rounded-lg px-3 py-2 text-white placeholder-slate-500 text-xs focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1 tracking-wider uppercase">
                Zone / Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as WorkshopMediaItem["category"])}
                className="w-full bg-[#131b2c] border border-slate-700 focus:border-cyan-400 rounded-lg px-3 py-2 text-white text-xs focus:outline-none transition-colors cursor-pointer"
              >
                <option value="Club Room & Workbenches">Club Room & Workbenches</option>
                <option value="Fabrication Bay">Fabrication Bay</option>
                <option value="Bootcamps & Cadets">Bootcamps & Cadets</option>
                <option value="Testing Arena">Testing Arena</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-slate-300 font-bold mb-1 tracking-wider uppercase">
                Badge / Tag
              </label>
              <input
                type="text"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                placeholder="e.g. FABRICATION BAY or LAB 104"
                className="w-full bg-[#131b2c] border border-slate-700 focus:border-cyan-400 rounded-lg px-3 py-2 text-white placeholder-slate-500 text-xs focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1 tracking-wider uppercase">
                Short Description
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Equipment or session details..."
                className="w-full bg-[#131b2c] border border-slate-700 focus:border-cyan-400 rounded-lg px-3 py-2 text-white placeholder-slate-500 text-xs focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="p-3 bg-[#111827] rounded-xl border border-slate-800">
            <ImageUploadField
              label="WORKSHOP PHOTOGRAPHY *"
              value={imageUrl}
              onChange={setImageUrl}
              folder="general"
              helperText="Upload image file or paste URL."
            />
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!imageUrl}
              className="bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-[#09101d] font-tech font-bold text-xs px-5 py-2.5 rounded-lg shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all cursor-pointer uppercase"
            >
              {initialData ? "Update Photo" : "Add to Gallery"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

// =========================================================================
// 5. CLOUD DATABASE SETUP MODAL
// =========================================================================
export function CloudSetupModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="w-full max-w-2xl bg-[#0c121e] border border-cyan-500/30 rounded-2xl shadow-[0_0_50px_rgba(0,240,255,0.2)] overflow-hidden font-sans my-8"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#080d16]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/30">
              <Cloud className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-tech text-base font-bold text-white uppercase tracking-wide">
                Connect Free Supabase Cloud Persistence
              </h3>
              <p className="text-[11px] font-mono text-cyan-400/70">
                Live Postgres Database &amp; Unlimited Edge Storage
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5 text-xs font-sans text-slate-300 max-h-[75vh] overflow-y-auto">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 font-mono font-bold text-white text-xs">
              <span className="w-5 h-5 rounded-full bg-cyan-500 text-black flex items-center justify-center text-[10px] font-black">
                1
              </span>
              <span>Create Free Project at Supabase.com</span>
            </div>
            <p className="text-slate-400 pl-7">
              Visit{" "}
              <a
                href="https://supabase.com"
                target="_blank"
                rel="noreferrer"
                className="text-cyan-400 hover:underline font-bold"
              >
                supabase.com
              </a>{" "}
              and click <strong>New project</strong> (100% free hobby tier, no credit card needed).
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between font-mono font-bold text-white text-xs">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-cyan-500 text-black flex items-center justify-center text-[10px] font-black">
                  2
                </span>
                <span>Run SQL Setup in Supabase SQL Editor</span>
              </div>
              <button
                onClick={copySql}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-mono text-[11px] font-bold transition-all cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-300">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy SQL</span>
                  </>
                )}
              </button>
            </div>
            <div className="pl-7">
              <pre className="p-3 bg-[#080d16] text-cyan-200/90 rounded-xl font-mono text-[11px] overflow-x-auto border border-slate-800 leading-relaxed">
                {sqlCode}
              </pre>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono font-bold text-white text-xs">
              <span className="w-5 h-5 rounded-full bg-cyan-500 text-black flex items-center justify-center text-[10px] font-black">
                3
              </span>
              <span>Add Keys to .env.local or Vercel Environment Variables</span>
            </div>
            <div className="pl-7 space-y-1.5">
              <p className="text-slate-400">
                In Supabase, open <strong>Project Settings → API</strong> and paste the URL and anon public key:
              </p>
              <pre className="p-3 bg-[#080d16] text-emerald-400 rounded-xl font-mono text-[11px] overflow-x-auto border border-slate-800">
{`NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`}
              </pre>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs">
            💡 <strong>Note:</strong> Until you add your Supabase credentials, the site automatically operates in <strong>Local/Edge Mode</strong> with local storage fallbacks.
          </div>
        </div>

        <div className="p-4 bg-[#080d16] border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs font-bold rounded-lg transition-colors cursor-pointer"
          >
            Close Guide
          </button>
        </div>
      </motion.div>
    </div>
  );
}
