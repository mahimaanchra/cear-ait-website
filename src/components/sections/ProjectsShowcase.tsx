"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Cpu, Info, Check, ArrowRight, Shield, Activity, X } from "lucide-react";
import { projects, Project } from "@/data/siteData";

export function ProjectsShowcase() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const getStatusBadge = (status: Project["status"]) => {
    switch (status) {
      case "Podium Winner":
        return "bg-amber-50 text-amber-800 border-amber-200";
      case "Active R&D":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Operational":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <section id="projects" className="relative py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-blue-50 text-blue-700 text-xs font-mono font-bold uppercase tracking-wider border border-blue-100">
              <Cpu className="w-3.5 h-3.5" />
              <span>LAB R&amp;D DEVELOPMENTS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-tech text-slate-900 tracking-tight">
              Projects Showcase
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
              Explore key club developments in autonomous robotics, manipulation systems, amphibious exploration, and multi-agent quadcopter swarms.
            </p>
          </div>

          <div className="text-xs font-mono text-slate-500 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200 shrink-0">
            <span>TOTAL FLEET: </span>
            <span className="font-bold text-slate-900">{projects.length} ACTIVE PLATFORMS</span>
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
              transition={{ duration: 0.4, delay: idx * 0.07 }}
              className="bg-white rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all p-6 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Card Top: Category & Status Badge */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded">
                    {project.category}
                  </span>
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${getStatusBadge(
                      project.status
                    )}`}
                  >
                    {project.status}
                  </span>
                </div>

                {/* Project Title */}
                <h3 className="text-xl font-bold font-tech text-slate-900 group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h3>

                {/* Short Description */}
                <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack Tags */}
                <div className="space-y-1.5 pt-2">
                  <span className="text-[10px] font-mono text-slate-400 font-bold uppercase block">
                    TECH STACK
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-slate-50 border border-slate-200 text-slate-700 group-hover:border-blue-200 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer: Links & Spec Modal Trigger */}
              <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>Inspect Specs</span>
                </button>

                <div className="flex items-center gap-3">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
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
                      className="p-1.5 rounded text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                      title="Live Demo / Telemetry"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Specs Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl border border-slate-200 max-w-xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-blue-600 uppercase bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                    {selectedProject.category}
                  </span>
                  <span
                    className={`text-xs font-mono font-bold px-2 py-0.5 rounded border ${getStatusBadge(
                      selectedProject.status
                    )}`}
                  >
                    {selectedProject.status}
                  </span>
                </div>

                <h3 className="text-2xl font-extrabold font-tech text-slate-900">
                  {selectedProject.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                  {selectedProject.longDescription}
                </p>

                {/* Technical Specifications Table */}
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                    TECHNICAL PARAMETERS &amp; ARCHITECTURE
                  </span>
                  <div className="rounded-lg border border-slate-200 divide-y divide-slate-100 overflow-hidden text-xs font-mono">
                    {selectedProject.specs.map((spec, i) => (
                      <div key={i} className="flex items-center justify-between p-2.5 bg-slate-50/50">
                        <span className="text-slate-500 font-semibold">{spec.label}</span>
                        <span className="text-slate-900 font-bold">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack List */}
                <div className="pt-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 block mb-2">
                    TECHNOLOGY STACK
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-blue-50 text-blue-700 border border-blue-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="px-4 py-2 rounded-lg font-tech font-bold text-xs text-slate-600 hover:bg-slate-100"
                  >
                    Close
                  </button>
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary-tech text-xs"
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
