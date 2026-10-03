"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, ArrowRight, X, ArrowUpRight } from "lucide-react";
import { Project } from "@/data/siteData";
import { useSiteContent } from "@/context/SiteContentContext";

export function ProjectsShowcase() {
  const { projects } = useSiteContent();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative py-28 sm:py-36 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#0d1321]/[0.08] pb-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-mono tracking-widest uppercase text-[#0d1321]/50">
              02 // Research &amp; Platforms
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-display text-[#0d1321] tracking-tight">
              Robotics Platforms &amp; R&amp;D
            </h2>
            <p className="text-sm sm:text-base text-[#0d1321]/70 font-body leading-relaxed">
              Autonomous unmanned rovers, sub-surface submarines, tactical drone swarms, and embedded perception systems.
            </p>
          </div>

          <div className="text-xs font-mono text-[#0d1321]/60 px-4 py-2 rounded-full bg-white border border-[#0d1321]/[0.08] shadow-xs shrink-0">
            <span className="font-bold text-[#0d1321]">{projects.length}</span> Active Platforms
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              whileHover={{ y: -6 }}
              className="group p-8 rounded-3xl bg-white border border-[#0d1321]/[0.08] shadow-[0_15px_40px_-15px_rgba(13,19,33,0.04)] hover:shadow-[0_25px_60px_-15px_rgba(13,19,33,0.08)] hover:border-[#0d1321]/25 transition-all flex flex-col justify-between"
            >
              <div className="space-y-5">
                {project.imageUrl && (
                  <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-slate-100 border border-[#0d1321]/[0.08] mb-2">
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
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#0d1321]/60 bg-[#fafaf9] border border-[#0d1321]/[0.08] px-3 py-1 rounded-full">
                    {project.category}
                  </span>
                  <span className="text-[10px] font-mono font-medium text-[#0d1321]/50">
                    {project.status}
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-bold font-display text-[#0d1321] tracking-tight group-hover:text-[#1a2640] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#0d1321]/65 font-body leading-relaxed mt-2.5">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-[#fafaf9] border border-[#0d1321]/[0.06] text-[#0d1321]/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[#0d1321]/[0.06] flex items-center justify-between">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="text-xs font-mono font-medium text-[#0d1321] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>View Specifications</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-full text-[#0d1321]/50 hover:text-[#0d1321] hover:bg-[#0d1321]/[0.05] transition-colors"
                    title="Source Repository"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Spec Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0d1321]/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-10 border border-[#0d1321]/[0.1] shadow-2xl space-y-6"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#0d1321]/50">
                    {selectedProject.category} • {selectedProject.status}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#0d1321] mt-1 tracking-tight">
                    {selectedProject.title}
                  </h3>
                </div>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 rounded-full text-[#0d1321]/60 hover:text-[#0d1321] hover:bg-[#0d1321]/[0.05] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {selectedProject.imageUrl && (
                <div className="relative w-full h-56 rounded-2xl overflow-hidden bg-slate-100 border border-[#0d1321]/[0.08]">
                  <Image
                    src={selectedProject.imageUrl}
                    alt={selectedProject.title}
                    fill
                    className="object-cover"
                    unoptimized={selectedProject.imageUrl.startsWith("http")}
                  />
                </div>
              )}

              <p className="text-sm text-[#0d1321]/75 leading-relaxed font-body">
                {selectedProject.description}
              </p>

              {selectedProject.specs && selectedProject.specs.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0d1321]">
                    Hardware &amp; Computational Specs:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedProject.specs.map((spec, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl bg-[#fafaf9] border border-[#0d1321]/[0.06] text-xs font-mono text-[#0d1321]/80"
                      >
                        <span className="text-[#0d1321]/50">{spec.label}: </span>
                        <span className="font-bold text-[#0d1321]">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-[#0d1321]/[0.08] flex items-center justify-between">
                <span className="text-xs font-mono text-[#0d1321]/50">
                  AIT Pune Autonomous Lab
                </span>

                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium text-white bg-[#0d1321] hover:bg-[#1a2640] transition-colors"
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
