"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BackgroundGrid } from "@/components/ui/BackgroundGrid";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Team } from "@/components/sections/Team";
import { ProjectsShowcase } from "@/components/sections/ProjectsShowcase";
import { About } from "@/components/sections/About";
import { Achievements } from "@/components/sections/Achievements";
import { UpcomingEvents } from "@/components/sections/UpcomingEvents";
import { ContactAndFAQ } from "@/components/sections/ContactAndFAQ";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#f9f9f8] text-[#111827] selection:bg-[#0d5c58] selection:text-white">
      {/* Light technical ruled paper canvas */}
      <BackgroundGrid />

      {/* Floating dark capsule navbar */}
      <Navbar />

      {/* Main Single-Page Content Sections matching AIT_CIDC layout */}
      <main className="relative z-10 space-y-4">
        {/* 1. Hero: INNOVATION THROUGH DEVELOPMENT_ */}
        <Hero />

        {/* 2. Team Modules */}
        <Team />

        {/* 3. Active Manifesto Projects */}
        <ProjectsShowcase />

        {/* 4. Want to know about us? */}
        <About />

        {/* 5. Wartech Aside Banner Link */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="rounded-2xl bg-zinc-900 text-white p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-zinc-800 shadow-sm">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                <span className="font-mono text-xs text-red-400 font-bold uppercase">
                  ANNUAL COMBAT FESTIVAL
                </span>
              </div>
              <h3 className="font-industrial text-xl sm:text-2xl font-bold">
                Wartech 2026 Arena
              </h3>
              <p className="text-xs text-zinc-400 font-sans max-w-xl">
                Looking for the inter-collegiate combat championship, obstacle maze solver, and drone racing? Explore tracks and rulebooks on the dedicated portal.
              </p>
            </div>

            <Link
              href="/wartech"
              className="btn-teal-pill shrink-0 whitespace-nowrap"
            >
              <span>EXPLORE WARTECH PORTAL</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-teal-300" />
            </Link>
          </div>
        </section>

        {/* 6. Track Record / Achievements */}
        <Achievements />

        {/* 7. Upcoming Operations */}
        <UpcomingEvents />

        {/* 8. Initiate Connection */}
        <ContactAndFAQ />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
