"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  ExternalLink,
  ArrowRight,
  X,
  ArrowUpRight,
  Cpu,
  Search,
  LayoutGrid,
  List,
  Sparkles,
  Share2,
  Check,
  SlidersHorizontal,
  ChevronDown,
} from "lucide-react";
import { Project } from "@/data/siteData";
import { useSiteContent } from "@/context/SiteContentContext";
import { GlassCard } from "@/components/ui/GlassCard";

const categories = ["All Platforms", "Autonomous", "Manipulation", "Aquatics", "Robotics", "Aerial"];

type SortOption = "featured" | "name" | "status";

export function ProjectsShowcase() {
  const { projects } = useSiteContent();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState("All Platforms");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [copiedShareId, setCopiedShareId] = useState<string | null>(null);

  // Extract top tech stack tags dynamically
  const popularTags = useMemo(() => {
    const counts: Record<string, number> = {};
    projects.forEach((p) => {
      p.tags?.forEach((t) => {
        counts[t] = (counts[t] || 0) + 1;
      });
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(([tag]) => tag)
      .slice(0, 6);
  }, [projects]);

  // Filter & sort platforms
  const filteredProjects = useMemo(() => {
    let result = projects.filter((p) => {
      const matchesCategory =
        activeCategory === "All Platforms" ||
        p.category.toLowerCase() === activeCategory.toLowerCase();

      const matchesTag = !selectedTag || (p.tags && p.tags.includes(selectedTag));

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        (p.tags && p.tags.some((t) => t.toLowerCase().includes(query)));

      return matchesCategory && matchesTag && matchesSearch;
    });

    if (sortBy === "name") {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "status") {
      result = [...result].sort((a, b) => a.status.localeCompare(b.status));
    }

    return result;
  }, [projects, activeCategory, selectedTag, searchQuery, sortBy]);

  const handleShareProject = (p: Project) => {
    const specDetails = p.specs ? p.specs.map((s) => `${s.label}: ${s.value}`).join(" | ") : "";
    const text = `CEAR Platform: ${p.title} (${p.category}) - ${p.description}\nSpecs: ${specDetails}`;
    navigator.clipboard.writeText(text);
    setCopiedShareId(p.id);
    setTimeout(() => setCopiedShareId(null), 2000);
  };

  return (
    <section id="projects" className="relative py-28 sm:py-36 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#240d2b]/[0.08] pb-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-mono tracking-widest uppercase text-[#240d2b]/50">
              03 // Research &amp; Platforms
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-display text-[#240d2b] tracking-tight">
              Robotics Platforms &amp; R&amp;D
            </h2>
            <p className="text-sm sm:text-base text-[#240d2b]/70 font-body leading-relaxed">
              Autonomous unmanned rovers, sub-surface submarines, tactical drone swarms, and embedded perception systems engineered at AIT Pune.
            </p>
          </div>

          {/* Diagnostics Counter & View Switcher */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center p-1 rounded-full bg-white/80 backdrop-blur-md border border-white/80 shadow-xs">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-full text-xs transition-all cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-[#240d2b] text-white shadow-xs"
                    : "text-[#240d2b]/60 hover:text-[#240d2b]"
                }`}
                title="Bento Card Grid"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-full text-xs transition-all cursor-pointer ${
                  viewMode === "list"
                    ? "bg-[#240d2b] text-white shadow-xs"
                    : "text-[#240d2b]/60 hover:text-[#240d2b]"
                }`}
                title="Engineering Spec Table"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs font-mono text-[#240d2b]/60 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-white/80 shadow-xs">
              <span className="font-bold text-[#ff6b35]">{filteredProjects.length}</span> of {projects.length} Platforms
            </div>
          </div>
        </div>

        {/* Filters, Tags, and Search Bar */}
        <div className="space-y-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveCategory(cat);
                      setSelectedTag(null);
                    }}
                    className={`text-xs font-mono px-4 py-2 rounded-full transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#240d2b] text-white shadow-xs font-semibold"
                        : "bg-white/80 backdrop-blur-md text-[#240d2b]/70 border border-white/80 hover:border-[#ff6b35]/40 hover:text-[#ff6b35]"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Search Input & Sort Selector */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-3.5 h-3.5 text-[#240d2b]/40 absolute left-3 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search platforms, tags, specs..."
                  className="w-full pl-8 pr-7 py-2 rounded-full bg-white/80 backdrop-blur-md border border-white/80 text-xs font-mono text-[#240d2b] placeholder:text-[#240d2b]/40 focus:outline-none focus:border-[#ff6b35] transition-all shadow-xs"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-2.5 text-[#240d2b]/40 hover:text-[#240d2b] cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Sort By Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="appearance-none pl-3.5 pr-8 py-2 rounded-full bg-white/80 backdrop-blur-md border border-white/80 text-xs font-mono text-[#240d2b] focus:outline-none focus:border-[#ff6b35] cursor-pointer shadow-xs"
                >
                  <option value="featured">Sort: Featured</option>
                  <option value="name">Sort: A-Z</option>
                  <option value="status">Sort: Status</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-[#240d2b]/50 absolute right-2.5 top-3 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Secondary Tech Stack Tag Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs font-mono">
            <span className="text-[11px] text-[#240d2b]/50 uppercase tracking-wider shrink-0 flex items-center gap-1">
              <SlidersHorizontal className="w-3 h-3 text-[#ff6b35]" />
              <span>Tech Stack:</span>
            </span>
            {popularTags.map((tag) => {
              const isTagSelected = selectedTag === tag;
              return (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(isTagSelected ? null : tag)}
                  className={`px-3 py-1 rounded-lg transition-all shrink-0 cursor-pointer border ${
                    isTagSelected
                      ? "bg-[#ff6b35] text-white border-[#ff6b35] font-semibold shadow-xs"
                      : "bg-white/70 text-[#240d2b]/70 border-white/80 hover:border-[#ff6b35]/40 hover:text-[#240d2b]"
                  }`}
                >
                  {tag}
                </button>
              );
            })}
            {selectedTag && (
              <button
                onClick={() => setSelectedTag(null)}
                className="text-[11px] text-[#ff6b35] hover:underline cursor-pointer shrink-0 ml-1"
              >
                Clear Tag
              </button>
            )}
          </div>
        </div>

        {/* 1. BENTO GRID VIEW */}
        {viewMode === "grid" && (
          <>
            {filteredProjects.length === 0 ? (
              <div className="text-center py-16 px-4 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/80 space-y-3">
                <p className="font-display text-lg font-bold text-[#240d2b]">No platforms found matching your filters.</p>
                <p className="text-xs font-mono text-[#240d2b]/60">Select another filter or reset search query.</p>
                <button
                  onClick={() => {
                    setActiveCategory("All Platforms");
                    setSelectedTag(null);
                    setSearchQuery("");
                  }}
                  className="text-xs font-mono font-semibold text-[#ff6b35] hover:underline cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project) => (
                  <GlassCard
                    key={project.id}
                    spotlightColor="rgba(255, 107, 53, 0.15)"
                    className="group p-8 flex flex-col justify-between"
                  >
                    <div className="space-y-5">
                      {project.imageUrl && (
                        <div className="relative w-full h-48 rounded-2xl overflow-hidden bg-[#240d2b]/5 border border-white/60 mb-2">
                          <Image
                            src={project.imageUrl}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            unoptimized={project.imageUrl.startsWith("http")}
                          />
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono tracking-widest uppercase text-[#240d2b]/70 bg-white/80 border border-white/80 px-3 py-1 rounded-full shadow-xs">
                          {project.category}
                        </span>
                        <span className="text-[10px] font-mono font-medium text-[#240d2b]/60 bg-[#240d2b]/5 px-2.5 py-0.5 rounded-full">
                          {project.status}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-2xl font-bold font-display text-[#240d2b] tracking-tight group-hover:text-[#ff6b35] transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#240d2b]/70 font-body leading-relaxed mt-2.5">
                          {project.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-white/70 border border-white/80 text-[#240d2b]/80 shadow-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 mt-6 border-t border-[#240d2b]/[0.08] flex items-center justify-between">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="text-xs font-mono font-medium text-[#240d2b] hover:text-[#ff6b35] flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <span>View Specifications</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleShareProject(project)}
                          className="p-1.5 rounded-full text-[#240d2b]/40 hover:text-[#ff6b35] hover:bg-white/80 transition-colors cursor-pointer"
                          title="Copy Specs"
                        >
                          {copiedShareId === project.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Share2 className="w-3.5 h-3.5" />
                          )}
                        </button>

                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-full text-[#240d2b]/50 hover:text-[#ff6b35] hover:bg-white/80 transition-colors"
                            title="Source Repository"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </div>
            )}
          </>
        )}

        {/* 2. TECHNICAL SPEC TABLE / LIST VIEW */}
        {viewMode === "list" && (
          <div className="rounded-3xl bg-white/80 backdrop-blur-2xl border border-white/80 overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-[#240d2b]/[0.08] bg-[#f6f3ee]/60 text-[#240d2b]/60 uppercase tracking-wider text-[10px]">
                    <th className="py-4 px-6">Platform Name</th>
                    <th className="py-4 px-4">Domain</th>
                    <th className="py-4 px-4">Status</th>
                    <th className="py-4 px-6">Technical Architecture &amp; Tags</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#240d2b]/[0.06]">
                  {filteredProjects.map((project) => (
                    <tr
                      key={project.id}
                      className="hover:bg-white/90 transition-colors group"
                    >
                      <td className="py-4 px-6">
                        <div className="font-display font-bold text-sm text-[#240d2b] group-hover:text-[#ff6b35] transition-colors">
                          {project.title}
                        </div>
                        <div className="text-[11px] font-body text-[#240d2b]/60 truncate max-w-xs mt-0.5">
                          {project.description}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="px-2.5 py-1 rounded-full bg-white border border-[#240d2b]/[0.08] text-[10px] text-[#240d2b]/80">
                          {project.category}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-[11px] font-semibold text-[#ff6b35]">
                          {project.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex flex-wrap gap-1 max-w-sm">
                          {project.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded-md bg-[#f6f3ee] border border-[#240d2b]/[0.06] text-[10px] text-[#240d2b]/70"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedProject(project)}
                            className="px-3 py-1.5 rounded-full bg-[#240d2b] text-white hover:bg-[#3b1646] transition-all cursor-pointer text-[11px]"
                          >
                            Inspect Specs
                          </button>
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-full text-[#240d2b]/60 hover:text-[#ff6b35]"
                            >
                              <Github className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Project Spec Glass Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#240d2b]/75 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-xl bg-white/95 backdrop-blur-2xl rounded-3xl p-6 sm:p-10 border border-white/80 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#240d2b]/50">
                    {selectedProject.category} • {selectedProject.status}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#240d2b] mt-1 tracking-tight">
                    {selectedProject.title}
                  </h3>
                </div>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 rounded-full text-[#240d2b]/60 hover:text-[#240d2b] hover:bg-black/5 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {selectedProject.imageUrl && (
                <div className="relative w-full h-56 rounded-2xl overflow-hidden bg-[#240d2b]/5 border border-white/80 shadow-inner">
                  <Image
                    src={selectedProject.imageUrl}
                    alt={selectedProject.title}
                    fill
                    className="object-cover"
                    unoptimized={selectedProject.imageUrl.startsWith("http")}
                  />
                </div>
              )}

              <p className="text-sm text-[#240d2b]/80 leading-relaxed font-body">
                {selectedProject.longDescription || selectedProject.description}
              </p>

              {selectedProject.specs && selectedProject.specs.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#240d2b]">
                    Hardware &amp; Computational Specs:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedProject.specs.map((spec, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl bg-white/70 border border-white/80 text-xs font-mono text-[#240d2b]/80 shadow-xs"
                      >
                        <span className="text-[#240d2b]/50">{spec.label}: </span>
                        <span className="font-bold text-[#240d2b]">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-[#240d2b]/[0.08] flex items-center justify-between">
                <button
                  onClick={() => handleShareProject(selectedProject)}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-[#240d2b]/70 hover:text-[#ff6b35] cursor-pointer"
                >
                  {copiedShareId === selectedProject.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Copied Spec to Clipboard</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Copy Spec Summary</span>
                    </>
                  )}
                </button>

                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium text-white bg-[#ff6b35] hover:bg-[#fa5519] transition-colors shadow-[0_2px_12px_rgba(255,107,53,0.35)]"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>View GitHub Repo</span>
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default ProjectsShowcase;
