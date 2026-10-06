"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, ArrowRight, X, ArrowUpRight, Cpu } from "lucide-react";
import { Project } from "@/data/siteData";
import { useSiteContent } from "@/context/SiteContentContext";
import { GlassCard } from "@/components/ui/GlassCard";

const categories = ["All Platforms", "Autonomous", "Manipulation", "Aquatics", "Robotics", "Aerial"];

export function ProjectsShowcase() {
  const { projects } = useSiteContent();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState("All Platforms");

  const filteredProjects =
    activeCategory === "All Platforms"
      ? projects
      : projects.filter(
          (p) => p.category.toLowerCase() === activeCategory.toLowerCase()
        );

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
              Autonomous unmanned rovers, sub-surface submarines, tactical drone swarms, and embedded perception systems.
            </p>
          </div>

          <div className="text-xs font-mono text-[#240d2b]/60 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-white/80 shadow-xs shrink-0">
            <span className="font-bold text-[#ff6b35]">{filteredProjects.length}</span> of {projects.length} Platforms
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
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

        {/* Projects Grid or Empty State */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/80 space-y-3">
            <p className="font-display text-lg font-bold text-[#240d2b]">No platforms found in this domain.</p>
            <p className="text-xs font-mono text-[#240d2b]/60">Select another filter or view all platforms.</p>
            <button
              onClick={() => setActiveCategory("All Platforms")}
              className="text-xs font-mono font-semibold text-[#ff6b35] hover:underline cursor-pointer"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
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
              </GlassCard>
            ))}
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
              className="relative w-full max-w-xl bg-white/95 backdrop-blur-2xl rounded-3xl p-6 sm:p-10 border border-white/80 shadow-2xl space-y-6"
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
                {selectedProject.description}
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
                <span className="text-xs font-mono text-[#240d2b]/50">
                  AIT Pune Autonomous Lab
                </span>

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
