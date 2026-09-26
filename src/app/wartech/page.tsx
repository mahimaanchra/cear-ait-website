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
    <div className="relative min-h-screen bg-paper text-ink font-body selection:bg-ink selection:text-paper">
      <BackgroundGrid />
      <Navbar onOpenRegister={() => handleOpenRegister()} />
      <main className="relative z-10 pt-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-tech font-bold text-ink bg-white border-2 border-ink px-3.5 py-1.5 rounded-full shadow-[2px_2px_0_#14140f] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_#14140f] transition-all -rotate-1"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
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
