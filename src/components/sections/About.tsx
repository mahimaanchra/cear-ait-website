"use client";

import React from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/data/siteData";

export function About() {
  return (
    <section id="about" className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Section Heading: Red Dash + WANT TO KNOW ABOUT US?_ */}
        <div>
          <div className="w-10 h-1 bg-red-600 rounded-sm mb-3" />
          <h2 className="text-3xl sm:text-5xl font-extrabold uppercase font-industrial tracking-tight text-zinc-900 leading-[0.95] mb-6">
            WANT TO <br />
            <span className="text-[#0d5c58]">KNOW ABOUT US?_</span>
          </h2>

          {/* 2-Column Overview Text from AIT_CIDC style */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm sm:text-base text-zinc-600 font-sans leading-relaxed">
            <p>
              The Centre of Excellence for AI and Robotics (CEAR) is a premier technology incubator established within the Army Institute of Technology, Pune. We bridge the critical gap between rigorous tactical defense applications and rapid academic technological progress.
            </p>
            <p>
              From designing autonomous underwater vehicles to constructing high-payload multi-axis robotic manipulators, CEAR cultivates hands-on engineering instincts, precision hardware fabrication, and cutting-edge machine intelligence.
            </p>
          </div>
        </div>

        {/* Layered Floating White Cards: Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Mission */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl bg-white border border-zinc-200/90 p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-red-600" />
              <span className="font-mono text-xs font-bold text-red-600 tracking-wider">
                01. OUR MISSION
              </span>
            </div>

            <h3 className="font-industrial text-xl sm:text-2xl font-bold text-zinc-900 mb-3">
              Hands-On Engineering &amp; Tactical Systems
            </h3>

            <p className="font-sans text-xs sm:text-sm text-zinc-600 leading-relaxed">
              {siteConfig.mission}
            </p>

            <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center gap-4 text-xs font-mono text-zinc-400">
              <span className="text-[#0d5c58] font-bold">TACTICAL FOCUS</span>
              <span>•</span>
              <span>R&amp;D DEFENSE</span>
            </div>
          </motion.div>

          {/* Card 2: Vision */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl bg-white border border-zinc-200/90 p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#0d5c58]" />
              <span className="font-mono text-xs font-bold text-[#0d5c58] tracking-wider">
                02. OUR VISION
              </span>
            </div>

            <h3 className="font-industrial text-xl sm:text-2xl font-bold text-zinc-900 mb-3">
              Fostering Next-Gen Robotics Leadership
            </h3>

            <p className="font-sans text-xs sm:text-sm text-zinc-600 leading-relaxed">
              {siteConfig.vision}
            </p>

            <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center gap-4 text-xs font-mono text-zinc-400">
              <span className="text-[#0d5c58] font-bold">INTERDISCIPLINARY</span>
              <span>•</span>
              <span>INNOVATION CULTURE</span>
            </div>
          </motion.div>
        </div>

        {/* Stats Strip - Directly matching the AIT_CIDC style */}
        <div className="rounded-2xl bg-zinc-50 border border-zinc-200/80 p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {siteConfig.stats.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <div className="font-industrial text-3xl sm:text-4xl font-extrabold text-zinc-900">
                {stat.value}
              </div>
              <div className="font-mono text-xs text-[#0d5c58] uppercase font-bold tracking-tight">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
