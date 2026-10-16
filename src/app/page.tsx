"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { WorkshopAndLab } from "@/components/sections/WorkshopAndLab";
import { Team } from "@/components/sections/Team";
import { ProjectsShowcase } from "@/components/sections/ProjectsShowcase";
import { UpcomingEvents } from "@/components/sections/UpcomingEvents";
import { Wartech } from "@/components/sections/Wartech";
import { Achievements } from "@/components/sections/Achievements";
import { ContactAndFAQ } from "@/components/sections/ContactAndFAQ";
import { ResearchWhitepapers } from "@/components/sections/ResearchWhitepapers";
import { Footer } from "@/components/sections/Footer";
import { RegistrationModal } from "@/components/ui/RegistrationModal";
import { RulebookModal } from "@/components/ui/RulebookModal";
import { CommandPaletteModal, useCommandPaletteShortcut } from "@/components/ui/CommandPaletteModal";
import { ArchitecturalCleanBackground } from "@/components/ui/ArchitecturalCleanBackground";
import { ScrollProgressBar } from "@/components/ui/ScrollProgressBar";
import { AutonomousStatusWidget } from "@/components/ui/AutonomousStatusWidget";
import { CircuitDivider } from "@/components/ui/CircuitDivider";

export default function Home() {
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [selectedWartechTrack, setSelectedWartechTrack] = useState<string | undefined>(undefined);
  const [rulebookModalOpen, setRulebookModalOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  // Global keyboard shortcut: Cmd+K / Ctrl+K
  useCommandPaletteShortcut(() => setCommandPaletteOpen(true));

  const handleOpenRegister = (trackId?: string) => {
    setSelectedWartechTrack(trackId);
    setRegisterModalOpen(true);
  };

  const handleOpenRulebook = (trackId?: string) => {
    if (trackId) setSelectedWartechTrack(trackId);
    setRulebookModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f6f3ee] text-[#240d2b] font-body selection:bg-[#ff6b35] selection:text-white relative overflow-hidden">
      {/* Radiant Top Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Architectural Clean Vector Blueprint & Ambient Glow Background */}
      <ArchitecturalCleanBackground />

      {/* Floating Autonomous Telemetry Diagnostics Dock */}
      <AutonomousStatusWidget />

      {/* 1. Sticky Navigation Bar */}
      <Navbar
        onOpenRegister={() => handleOpenRegister()}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
      />

      {/* Main Single-Page Sections */}
      <main className="relative">
        {/* 2. Hero Section */}
        <Hero onOpenRegister={handleOpenRegister} />

        <CircuitDivider label="RESEARCH & DOMAIN ARCHITECTURE" />

        {/* 3. About & Core Domains Section */}
        <About />

        <CircuitDivider label="FACILITY INFRASTRUCTURE & LAB 104" />

        {/* 4. Club Room & Workshop Facilities (Photos & Video Showcase) */}
        <WorkshopAndLab />

        <CircuitDivider label="AUTONOMOUS FLEET & PLATFORMS" />

        {/* 5. Projects Showcase Section */}
        <ProjectsShowcase />

        {/* 6. Team Leadership & Cadre */}
        <Team onOpenRegister={() => handleOpenRegister()} />

        {/* 6. Key Events & Workshops Section */}
        <UpcomingEvents onOpenRegister={(trackId) => handleOpenRegister(trackId)} />

        <CircuitDivider label="FLAGSHIP NATIONAL CHAMPIONSHIP" />

        {/* 7. Wartech Flagship Highlight Section */}
        <Wartech
          onOpenRegister={(trackId) => handleOpenRegister(trackId)}
          onOpenRulebook={handleOpenRulebook}
        />

        <CircuitDivider label="ENGINEERING WHITEPAPERS & TECHNICAL BULLETINS" />

        {/* 8. Lab 104 Research Whitepapers */}
        <ResearchWhitepapers />

        {/* 9. Track Record & Achievements */}
        <Achievements />

        {/* 10. Communications & FAQ */}
        <ContactAndFAQ />
      </main>

      {/* 10. Footer (AIT Pune branding, socials, coordinates, copyright) */}
      <Footer />

      {/* Interactive Modals */}
      <RegistrationModal
        isOpen={registerModalOpen}
        onClose={() => setRegisterModalOpen(false)}
        initialTrack={selectedWartechTrack}
      />

      <RulebookModal
        isOpen={rulebookModalOpen}
        onClose={() => setRulebookModalOpen(false)}
        onSelectTrack={(trackId) => {
          setRulebookModalOpen(false);
          handleOpenRegister(trackId);
        }}
      />

      {/* Omnibar Tactical Command Palette */}
      <CommandPaletteModal
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onOpenRegister={handleOpenRegister}
        onOpenRulebook={handleOpenRulebook}
      />
    </div>
  );
}
