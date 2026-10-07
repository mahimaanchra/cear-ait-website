"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BackgroundGrid } from "@/components/ui/BackgroundGrid";
import { Navbar } from "@/components/sections/Navbar";
import { ProjectsShowcase } from "@/components/sections/ProjectsShowcase";
import { Footer } from "@/components/sections/Footer";
import { ScrollProgressBar } from "@/components/ui/ScrollProgressBar";
import { AutonomousStatusWidget } from "@/components/ui/AutonomousStatusWidget";
import { RegistrationModal } from "@/components/ui/RegistrationModal";

export default function ProjectsPage() {
  const [registerModalOpen, setRegisterModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#f6f3ee] text-[#240d2b] font-body selection:bg-[#ff6b35] selection:text-white">
      {/* Top Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Architectural Background */}
      <BackgroundGrid />

      {/* Real-time Diagnostics HUD Dock */}
      <AutonomousStatusWidget />

      {/* Floating Glassmorphic Navbar */}
      <Navbar onOpenRegister={() => setRegisterModalOpen(true)} />

      <main className="relative z-10 pt-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono font-medium text-[#240d2b] bg-white/80 backdrop-blur-md border border-white/90 px-4 py-2 rounded-full shadow-xs hover:border-[#ff6b35]/40 hover:text-[#ff6b35] hover:scale-102 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#ff6b35]" />
            <span>Return to CEAR Home</span>
          </Link>
        </div>
        <ProjectsShowcase />
      </main>

      <Footer />

      <RegistrationModal
        isOpen={registerModalOpen}
        onClose={() => setRegisterModalOpen(false)}
      />
    </div>
  );
}
