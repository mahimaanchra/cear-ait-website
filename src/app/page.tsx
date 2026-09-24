"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Team } from "@/components/sections/Team";
import { ProjectsShowcase } from "@/components/sections/ProjectsShowcase";
import { UpcomingEvents } from "@/components/sections/UpcomingEvents";
import { Wartech } from "@/components/sections/Wartech";
import { Achievements } from "@/components/sections/Achievements";
import { ContactAndFAQ } from "@/components/sections/ContactAndFAQ";
import { Footer } from "@/components/sections/Footer";
import { RegistrationModal } from "@/components/ui/RegistrationModal";
import { RulebookModal } from "@/components/ui/RulebookModal";

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
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      {/* 1. Sticky Navigation Bar */}
      <Navbar onOpenRegister={() => handleOpenRegister()} />

      {/* Main Single-Page Sections */}
      <main className="relative">
        {/* 2. Hero Section (Modern grid layout, meta bar, primary CTAs, bottom scrolling ticker) */}
        <Hero />

        {/* 3. About & Core Domains Section */}
        <About />

        {/* 4. Team Hierarchy Section (Strict 4-Level Order) */}
        <Team />

        {/* 5. Projects Showcase Section (Grid layout with Tech Stack tags & Spec Modals) */}
        <ProjectsShowcase />

        {/* 6. Key Events & Workshops Section (Status Badges: Upcoming, Ongoing, Completed) */}
        <UpcomingEvents onOpenRegister={() => handleOpenRegister()} />

        {/* 7. Wartech Flagship Highlight Section (8 Sub-tracks, Direct CTAs, Rulebook) */}
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
