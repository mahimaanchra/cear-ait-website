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
    <div className="relative min-h-screen bg-[#fafaf9] text-[#0d1321] font-body selection:bg-[#dcf836] selection:text-[#0d1321]">
      <BackgroundGrid />
      <Navbar onOpenRegister={() => handleOpenRegister()} />
      <main className="relative z-10 pt-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono font-medium text-[#0d1321] bg-white border border-[#0d1321]/[0.1] px-4 py-2 rounded-full shadow-xs hover:border-[#0d1321]/30 transition-all"
          >
            <ArrowLeft className="w-4 h-4 text-[#0d1321]" />
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
