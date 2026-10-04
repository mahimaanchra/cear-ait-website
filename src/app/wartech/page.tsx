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
    <div className="relative min-h-screen bg-[#f6f3ee] text-[#240d2b] font-body selection:bg-[#ff6b35] selection:text-white">
      <BackgroundGrid />
      <Navbar onOpenRegister={() => handleOpenRegister()} />
      <main className="relative z-10 pt-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono font-medium text-[#240d2b] bg-white border border-[#240d2b]/[0.1] px-4 py-2 rounded-full shadow-xs hover:border-[#ff6b35]/40 hover:text-[#ff6b35] transition-all"
          >
            <ArrowLeft className="w-4 h-4 text-[#ff6b35]" />
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
