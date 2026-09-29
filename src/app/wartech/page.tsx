"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BackgroundGrid } from "@/components/ui/BackgroundGrid";
import { Navbar } from "@/components/sections/Navbar";
import { Wartech } from "@/components/sections/Wartech";
import { Footer } from "@/components/sections/Footer";
import { RegistrationModal } from "@/components/ui/RegistrationModal";
import { RulebookModal } from "@/components/ui/RulebookModal";

export default function WartechPage() {
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<string | undefined>(undefined);
  const [rulebookModalOpen, setRulebookModalOpen] = useState(false);

  const handleOpenRegister = (trackId?: string) => {
    setSelectedTrack(trackId);
    setRegisterModalOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#060911] text-slate-100 font-body selection:bg-cyan-500/30 selection:text-cyan-200">
      <BackgroundGrid />
      <Navbar onOpenRegister={() => handleOpenRegister()} />
      <main className="relative z-10 pt-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <Link
            href="/"
            className="cyber-btn-secondary inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase px-4 py-2 rounded-lg border border-slate-700 bg-slate-900/80 backdrop-blur-md text-slate-300 hover:text-cyan-300 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(0,240,255,0.2)] transition-all"
          >
            <ArrowLeft className="w-4 h-4 text-cyan-400" />
            <span>Return to CEAR Home</span>
          </Link>
        </div>
        <Wartech
          onOpenRegister={handleOpenRegister}
          onOpenRulebook={() => setRulebookModalOpen(true)}
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
      />
    </div>
  );
}
