"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Info, ArrowRight, X } from "lucide-react";
import { Project } from "@/data/siteData";
import { useSiteContent } from "@/context/SiteContentContext";
import { PerceptionCard } from "@/components/ui/PerceptionCard";

export function ProjectsShowcase() {
  const { projects } = useSiteContent();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const getStatusBadge = (status: Project["status"]) => {
    switch (status) {
      case "Podium Winner":
        return "bg-alarm text-white border-2 border-ink shadow-[2px_2px_0_#14140f] animate-pulse";
      case "Active R&D":
        return "bg-ink text-white border-2 border-ink shadow-[2px_2px_0_#14140f]";
      case "Operational":
        return "bg-paper text-ink border-2 border-ink shadow-[2px_2px_0_#14140f]";
      default:
        return "bg-paper text-ink border-2 border-ink shadow-[2px_2px_0_#14140f]";
    }
  };

  return (
    <section id="projects" className="relative py-24 sm:py-32 bg-transparent border-b-[2.5px] border-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-paper border-2 border-ink shadow-[2px_2px_0_#14140f] text-xs font-mono font-black text-ink mb-1 -rotate-1">
              <span>ACTIVE FLEET</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-tech text-ink tracking-tight">
              Projects Showcase
            </h2>
            <p className="text-sm sm:text-base text-ink/80 font-body font-semibold leading-relaxed">
              Autonomous robotics, mechatronics craft, and edge intelligent platforms.
            </p>
          </div>

          <div className="text-xs font-mono font-black text-ink bg-white px-3.5 py-1.5 rounded-full border-2 border-ink shadow-[2px_2px_0_#14140f] shrink-0 rotate-1">
            <span className="text-alarm">{projects.length}</span> ACTIVE PLATFORMS
          </div>
        </div>

        {/* Grid Layout of Key Developments */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -6, scale: 1.02, rotate: idx % 2 === 0 ? -1.5 : 1.5 }}
              transition={{ type: "spring", stiffness: 350, damping: 18 }}
              className="h-full cursor-default"
            >
              <PerceptionCard className="h-full p-6 flex flex-col justify-between">
                <div className="space-y-4">
                  {/* Card Top: Category & Status Badge */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-black uppercase tracking-wider text-ink bg-paper px-2.5 py-0.5 rounded-full border-2 border-ink shadow-[1.5px_1.5px_0_#14140f]">
                      {project.category}
                    </span>
                    <span
                      className={`text-[10px] font-mono font-black px-2.5 py-0.5 rounded-full ${getStatusBadge(
                        project.status
                      )}`}
                    >
                      {project.status}
                    </span>
                  </div>

                  {/* Project Title */}
                  <h3 className="text-xl font-black font-tech text-ink group-hover:text-alarm transition-colors">
                    {project.title}
                  </h3>

                  {/* Short Description */}
                  <p className="text-xs sm:text-sm text-ink/80 font-body font-semibold leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-paper border border-ink text-ink shadow-[1px_1px_0_#14140f]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer: Links & Spec Modal Trigger */}
                <div className="pt-5 mt-5 border-t-2 border-ink/10 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-black text-ink hover:text-alarm transition-colors cursor-pointer"
                  >
                    <Info className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Inspect Specs</span>
                  </button>

                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg border-2 border-ink bg-paper hover:bg-white text-ink transition-transform hover:scale-110 shadow-[1.5px_1.5px_0_#14140f]"
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
                        className="p-1.5 rounded-lg border-2 border-ink bg-paper hover:bg-white text-ink transition-transform hover:scale-110 shadow-[1.5px_1.5px_0_#14140f]"
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

      {/* Project Specs Detail Modal (Tactile Paper Dossier) */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-[24px_30px_22px_28px_/_30px_22px_28px_24px] border-[3px] border-ink max-w-xl w-full p-6 sm:p-8 shadow-[8px_9px_0_#14140f] relative max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-1.5 rounded-xl border-2 border-ink bg-paper hover:bg-white text-ink shadow-[2px_2px_0_#14140f] transition-transform active:translate-x-0.5 active:translate-y-0.5"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-black text-ink uppercase bg-paper px-2.5 py-0.5 rounded-full border-2 border-ink shadow-[1.5px_1.5px_0_#14140f]">
                    {selectedProject.category}
                  </span>
                  <span
                    className={`text-xs font-mono font-black px-2.5 py-0.5 rounded-full ${getStatusBadge(
                      selectedProject.status
                    )}`}
                  >
                    {selectedProject.status}
                  </span>
                </div>

                <h3 className="text-2xl font-black font-tech text-ink">
                  {selectedProject.title}
                </h3>

                <p className="text-xs sm:text-sm text-ink-soft font-body font-semibold leading-relaxed">
                  {selectedProject.longDescription}
                </p>

                {/* Technical Specifications Table */}
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-mono font-black uppercase tracking-wider text-ink-muted">
                    TECHNICAL PARAMETERS &amp; ARCHITECTURE
                  </span>
                  <div className="rounded-xl border-2 border-ink divide-y-2 divide-ink overflow-hidden text-xs font-mono">
                    {selectedProject.specs.map((spec, i) => (
                      <div key={i} className="flex items-center justify-between p-2.5 bg-paper">
                        <span className="text-ink-muted font-bold">{spec.label}</span>
                        <span className="text-ink font-black">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack List */}
                <div className="pt-2">
                  <span className="text-xs font-mono font-black uppercase tracking-wider text-ink-muted block mb-2">
                    TECHNOLOGY STACK
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-coin-y1 text-ink border-2 border-ink shadow-[2px_2px_0_#14140f]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t-2 border-ink/15 flex items-center justify-end gap-3">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="btn-paper-secondary !h-[38px] !text-xs !py-0 !px-4"
                  >
                    Close
                  </button>
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-paper-primary !h-[38px] !text-xs !py-0 !px-4"
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
