"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Info, ArrowRight, X, Cpu, Layers } from "lucide-react";
import { Project } from "@/data/siteData";
import { useSiteContent } from "@/context/SiteContentContext";
import { PerceptionCard } from "@/components/ui/PerceptionCard";

export function ProjectsShowcase() {
  const { projects } = useSiteContent();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const getStatusBadge = (status: Project["status"]) => {
    switch (status) {
      case "Podium Winner":
        return "bg-rose-500/15 text-rose-400 border border-rose-500/40 shadow-[0_0_8px_rgba(255,51,102,0.3)]";
      case "Active R&D":
        return "bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-[0_0_8px_rgba(0,240,255,0.2)]";
      case "Operational":
        return "bg-emerald-500/15 text-emerald-400 border border-emerald-500/40 shadow-[0_0_8px_rgba(0,255,157,0.2)]";
      default:
        return "bg-slate-800 text-slate-300 border border-slate-700";
    }
  };

  return (
    <section id="projects" className="relative py-24 sm:py-32 bg-transparent border-b border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0a101d] border border-cyan-500/35 text-xs font-mono font-bold text-cyan-300">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>AUTONOMOUS FLEET SPECIFICATIONS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-tech text-slate-100 tracking-tight">
              Flagship Robotics &amp; Platforms
            </h2>
            <p className="text-sm sm:text-base text-slate-300 font-body leading-relaxed">
              Autonomous ground rovers, sub-surface submarines, aerial swarms, and high-torque robotic arms.
            </p>
          </div>

          <div className="text-xs font-mono font-bold text-slate-300 bg-[#0a101d] px-3.5 py-1.5 rounded-lg border border-cyan-500/30 shadow-[0_0_10px_rgba(0,240,255,0.15)] shrink-0">
            <span className="text-cyan-400 font-black">{projects.length}</span> DEPLOYED SYSTEMS
          </div>
        </div>

        {/* Grid Layout of Key Developments */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="h-full cursor-default"
            >
              <PerceptionCard className="h-full p-6 flex flex-col justify-between">
                <div className="space-y-4">
                  {/* Card Top: Category & Status Badge */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/40 px-2.5 py-0.5 rounded border border-cyan-500/30">
                      {project.category}
                    </span>
                    <span
                      className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded ${getStatusBadge(
                        project.status
                      )}`}
                    >
                      {project.status}
                    </span>
                  </div>

                  {/* Project Title */}
                  <h3 className="text-xl font-bold font-tech text-slate-100 group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>

                  {/* Short Description */}
                  <p className="text-xs sm:text-sm text-slate-400 font-body leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-[#070b14] border border-slate-800 text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer: Links & Spec Modal Trigger */}
                <div className="pt-5 mt-5 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>Inspect Specs</span>
                  </button>

                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg border border-slate-800 bg-[#070b14] hover:bg-slate-800 text-slate-300 hover:text-cyan-400 transition-colors"
                        title="GitHub Repository"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}

                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg border border-slate-800 bg-[#070b14] hover:bg-slate-800 text-slate-300 hover:text-cyan-400 transition-colors"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </PerceptionCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Specs Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0c1322] rounded-2xl border border-cyan-500/40 max-w-xl w-full p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(0,240,255,0.2)] relative max-h-[90vh] overflow-y-auto"
            >
              <div className="cyber-bracket-top-left" />
              <div className="cyber-bracket-bottom-right" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-1.5 rounded-lg border border-slate-800 bg-[#070b14] hover:bg-slate-800 text-slate-300 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-cyan-400 uppercase bg-cyan-950/40 px-2.5 py-0.5 rounded border border-cyan-500/30">
                    {selectedProject.category}
                  </span>
                  <span
                    className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded ${getStatusBadge(
                      selectedProject.status
                    )}`}
                  >
                    {selectedProject.status}
                  </span>
                </div>

                <h3 className="text-2xl font-black font-tech text-slate-100">
                  {selectedProject.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 font-body leading-relaxed">
                  {selectedProject.longDescription}
                </p>

                {/* Technical Specifications Table */}
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                    TECHNICAL PARAMETERS &amp; ARCHITECTURE
                  </span>
                  <div className="rounded-lg border border-slate-800 divide-y divide-slate-800 overflow-hidden text-xs font-mono bg-[#070b14]">
                    {selectedProject.specs.map((spec, i) => (
                      <div key={i} className="flex items-center justify-between p-2.5">
                        <span className="text-slate-400">{spec.label}</span>
                        <span className="text-slate-100 font-bold">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack List */}
                <div className="pt-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 block mb-2">
                    TECHNOLOGY STACK
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-mono font-medium px-2.5 py-0.5 rounded bg-cyan-950/30 text-cyan-300 border border-cyan-500/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="cyber-btn-secondary !h-[38px] !text-xs !py-0 !px-4"
                  >
                    Close
                  </button>
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cyber-btn-primary !h-[38px] !text-xs !py-0 !px-4"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>View GitHub Code</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default ProjectsShowcase;
