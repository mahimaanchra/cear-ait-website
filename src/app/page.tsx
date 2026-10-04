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
import { Footer } from "@/components/sections/Footer";
import { RegistrationModal } from "@/components/ui/RegistrationModal";
import { RulebookModal } from "@/components/ui/RulebookModal";
import { ArchitecturalCleanBackground } from "@/components/ui/ArchitecturalCleanBackground";

export default function Home() {
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [selectedWartechTrack, setSelectedWartechTrack] = useState<string | undefined>(undefined);
  const [rulebookModalOpen, setRulebookModalOpen] = useState(false);

  const handleOpenRegister = (trackId?: string) => {
    setSelectedWartechTrack(trackId);
    setRegisterModalOpen(true);
  };

  const handleOpenRulebook = () => {
    setRulebookModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f6f3ee] text-[#240d2b] font-body selection:bg-[#ff6b35] selection:text-white relative overflow-hidden">
      {/* Architectural Clean Vector Blueprint & Ambient Glow Background */}
      <ArchitecturalCleanBackground />

      {/* 1. Sticky Navigation Bar */}
      <Navbar onOpenRegister={() => handleOpenRegister()} />

      {/* Main Single-Page Sections */}
      <main className="relative">
        {/* 2. Hero Section */}
        <Hero onOpenRegister={handleOpenRegister} />

        {/* 3. About & Core Domains Section */}
        <About />

        {/* 4. Club Room & Workshop Facilities (Photos & Video Showcase) */}
        <WorkshopAndLab />

        {/* 5. Projects Showcase Section */}
        <ProjectsShowcase />

        {/* 6. Team Leadership & Cadre */}
        <Team />

        {/* 6. Key Events & Workshops Section */}
        <UpcomingEvents onOpenRegister={() => handleOpenRegister()} />

        {/* 7. Wartech Flagship Highlight Section */}
        <Wartech
          onOpenRegister={(trackId) => handleOpenRegister(trackId)}
          onOpenRulebook={handleOpenRulebook}
        />

        {/* 8. Track Record & Achievements */}
        <Achievements />

        {/* 9. Communications & FAQ */}
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
      />
    </div>
  );
}
