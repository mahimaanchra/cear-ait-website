"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BackgroundGrid } from "@/components/ui/BackgroundGrid";
import { SubpageBreadcrumb } from "@/components/ui/SubpageBreadcrumb";
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
        <SubpageBreadcrumb currentPage="Projects" />
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
