"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ExternalLink, Github, Sparkles, Check, Globe } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { projects, Project } from "@/data/siteData";

export function ProjectsShowcase() {
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const [modalProject, setModalProject] = useState<Project | null>(null);

  const currentProject = projects[activeProjectIdx] || projects[0];

  return (
    <section id="projects" className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Heading: Red Dash + ACTIVE MANIFESTO PROJECTS_ */}
        <div>
          <div className="w-10 h-1 bg-red-600 rounded-sm mb-3" />
          <h2 className="text-3xl sm:text-5xl font-extrabold uppercase font-industrial tracking-tight text-zinc-900 leading-[0.95] mb-3">
            ACTIVE <br />
            MANIFESTO <br />
            <span className="text-[#0d5c58]">PROJECTS_</span>
          </h2>
          <p className="text-sm text-zinc-600 font-sans max-w-xl">
            Battle-tested robotic platforms, autonomous marine craft, and teleoperated manipulators engineered for defense applications.
          </p>
        </div>

        {/* Phase selector tabs */}
        <div className="flex flex-wrap gap-2 font-mono text-xs">
          {projects.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => setActiveProjectIdx(idx)}
              className={`px-4 py-2 rounded-full font-bold transition-all cursor-pointer ${
                activeProjectIdx === idx
                  ? "bg-[#0d5c58] text-white shadow-sm"
                  : "bg-white text-zinc-600 hover:text-black border border-zinc-200"
              }`}
            >
              PHASE 0{idx + 1}: {p.title}
            </button>
          ))}
        </div>

        {/* Main Project Display Box: Left Specs & Description, Right Browser Window Mockup */}
        <motion.div
          key={currentProject.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl sm:rounded-3xl bg-white border border-zinc-200 p-6 sm:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
        >
          {/* Left Column: Phase details, Specs, Description, Action */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-600" />
              <span className="font-mono text-xs font-bold text-red-600 uppercase tracking-wider">
                PHASE 0{activeProjectIdx + 1}
              </span>
              <span className="text-zinc-300">•</span>
              <span className="font-mono text-xs text-zinc-500 uppercase">
                {currentProject.status}
              </span>
            </div>

            <h3 className="font-industrial text-2xl sm:text-3xl font-bold text-zinc-900 leading-tight">
              {currentProject.title}
            </h3>

            <p className="font-mono text-xs text-[#0d5c58] font-bold">
              {currentProject.tagline}
            </p>

            <p className="font-sans text-xs sm:text-sm text-zinc-600 leading-relaxed">
              {currentProject.description}
            </p>

            {/* Key Specs tags */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {currentProject.tags.slice(0, 4).map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="px-2.5 py-1 rounded bg-zinc-100 text-zinc-700 font-mono text-[10px]"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Action buttons */}
            <div className="pt-4 flex items-center gap-3">
              <button
                onClick={() => setModalProject(currentProject)}
                className="btn-teal-pill text-xs"
              >
                <span>VIEW SPEC SHEET</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {currentProject.githubUrl && (
                <a
                  href={currentProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline-pill text-xs"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>CODE</span>
                </a>
              )}
            </div>
          </div>

          {/* Right Column: Browser Window Mockup (Directly matching AIT_CIDC reference!) */}
          <div className="lg:col-span-7">
            <div className="rounded-xl border border-zinc-300 bg-zinc-50 shadow-md overflow-hidden">
              {/* Browser Header Bar */}
              <div className="bg-sky-500 text-white px-4 py-2.5 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-white/40" />
                    <span className="w-2.5 h-2.5 rounded-full bg-white/40" />
                    <span className="w-2.5 h-2.5 rounded-full bg-white/40" />
                  </div>
                  <span className="text-[11px] text-white/90 truncate ml-2">
                    cear.aitpune.edu/telemetry/{currentProject.id}
                  </span>
                </div>
                <Globe className="w-3.5 h-3.5 text-white/80" />
              </div>

              {/* Browser Content Simulated View */}
              <div className="p-6 bg-white space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                  <div>
                    <h4 className="font-industrial text-base font-bold text-zinc-900">
                      TELEMETRY DASHBOARD // {currentProject.title.toUpperCase()}
                    </h4>
                    <p className="font-mono text-[10px] text-zinc-400">
                      STATUS: ONLINE • SENSORS SYNCED • ROS2 SLAM ACTIVE
                    </p>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono text-[10px] font-bold">
                    HEALTH 99.8%
                  </span>
                </div>

                {/* 3 Metric Cards inside Browser */}
                <div className="grid grid-cols-3 gap-3">
                  {currentProject.specs.slice(0, 3).map((spec, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-2.5 rounded-lg bg-zinc-50 border border-zinc-200 text-center"
                    >
                      <span className="font-mono text-[9px] text-zinc-500 block truncate">
                        {spec.label}
                      </span>
                      <span className="font-mono text-xs font-bold text-zinc-900 block mt-0.5 truncate">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Visual Architecture Representation */}
                <div className="p-4 rounded-xl bg-zinc-900 text-white font-mono text-[11px] space-y-1.5 overflow-hidden">
                  <div className="flex justify-between text-zinc-400 text-[10px]">
                    <span>TERMINAL_OUTPUT</span>
                    <span className="text-teal-400">LIVE CONNECTION</span>
                  </div>
                  <p className="text-teal-300">
                    $ ros2 launch cear_core {currentProject.id}.launch.py
                  </p>
                  <p className="text-zinc-400">
                    [INFO] [cear_nav]: SLAM mapping nodes initialized. 250Hz sample rate.
                  </p>
                  <p className="text-zinc-500">
                    [INFO] [hardware]: Actuator bus stable at 24V 40A. Failsafe armed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Project Spec Modal */}
      <Modal
        isOpen={!!modalProject}
        onClose={() => setModalProject(null)}
        title={modalProject?.title || ""}
        subtitle={modalProject?.tagline}
      >
        {modalProject && (
          <div className="space-y-6">
            <div>
              <div className="w-8 h-1 bg-red-600 rounded-sm mb-2" />
              <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-500 mb-1">
                SYSTEM ARCHITECTURE
              </h4>
              <p className="text-zinc-700 text-sm leading-relaxed font-sans">
                {modalProject.longDescription}
              </p>
            </div>

            {modalProject.highlight && (
              <div className="p-3.5 rounded-xl bg-teal-50 border border-teal-200 flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-[#0d5c58] shrink-0" />
                <span className="text-xs font-bold font-mono text-[#0d5c58]">
                  {modalProject.highlight}
                </span>
              </div>
            )}

            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-500 mb-2">
                TECHNICAL SPECIFICATIONS
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-mono">
                {modalProject.specs.map((spec, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-2.5 rounded-lg bg-zinc-50 border border-zinc-200 flex flex-col"
                  >
                    <span className="text-[10px] text-zinc-500">{spec.label}</span>
                    <span className="text-xs font-bold text-zinc-900 mt-0.5">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {modalProject.githubUrl && (
              <div className="pt-2 flex justify-end">
                <a
                  href={modalProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-teal-pill text-xs"
                >
                  <Github className="w-4 h-4" />
                  <span>VIEW ON GITHUB</span>
                </a>
              </div>
            )}
          </div>
        )}
      </Modal>
    </section>
  );
}
