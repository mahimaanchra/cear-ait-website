"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BackgroundGrid } from "@/components/ui/BackgroundGrid";
import { SubpageBreadcrumb } from "@/components/ui/SubpageBreadcrumb";
import { Navbar } from "@/components/sections/Navbar";
import { Wartech } from "@/components/sections/Wartech";
import { Footer } from "@/components/sections/Footer";
import { ScrollProgressBar } from "@/components/ui/ScrollProgressBar";
import { AutonomousStatusWidget } from "@/components/ui/AutonomousStatusWidget";
import { RegistrationModal } from "@/components/ui/RegistrationModal";
import { RulebookModal } from "@/components/ui/RulebookModal";
import { CommandPaletteModal, useCommandPaletteShortcut } from "@/components/ui/CommandPaletteModal";

export default function WartechPage() {
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<string | undefined>(undefined);
  const [rulebookModalOpen, setRulebookModalOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  useCommandPaletteShortcut(() => setCommandPaletteOpen(true));

  const handleOpenRegister = (trackId?: string) => {
    setSelectedTrack(trackId);
    setRegisterModalOpen(true);
  };

  const handleOpenRulebook = (trackId?: string) => {
    if (trackId) setSelectedTrack(trackId);
    setRulebookModalOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#f6f3ee] text-[#240d2b] font-body selection:bg-[#ff6b35] selection:text-white">
      {/* Top Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Architectural Background */}
      <BackgroundGrid />

      {/* Real-time Diagnostics HUD Dock */}
      <AutonomousStatusWidget />

      {/* Floating Glassmorphic Navbar */}
      <Navbar
        onOpenRegister={() => handleOpenRegister()}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
      />

      <main className="relative z-10 pt-28">
        <SubpageBreadcrumb currentPage="Wartech" />
        <Wartech
          onOpenRegister={handleOpenRegister}
          onOpenRulebook={() => handleOpenRulebook()}
        />
      </main>
      <Footer />

      <RegistrationModal
        isOpen={registerModalOpen}
        onClose={() => setRegisterModalOpen(false)}
        initialTrack={selectedTrack}
      />

      <RulebookModal
        isOpen={rulebookModalOpen}
        onClose={() => setRulebookModalOpen(false)}
        onSelectTrack={(trackId) => {
          setRulebookModalOpen(false);
          handleOpenRegister(trackId);
        }}
      />

      <CommandPaletteModal
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onOpenRegister={handleOpenRegister}
        onOpenRulebook={handleOpenRulebook}
      />
    </div>
  );
}
