"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BackgroundGrid } from "@/components/ui/BackgroundGrid";
import { Navbar } from "@/components/sections/Navbar";
import { ProjectsShowcase } from "@/components/sections/ProjectsShowcase";
import { Footer } from "@/components/sections/Footer";

export default function ProjectsPage() {
  return (
    <div className="relative min-h-screen bg-[#f9f9f8] text-[#111827] selection:bg-[#0d5c58] selection:text-white">
      <BackgroundGrid />
      <Navbar />
      <main className="relative z-10 pt-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-[#0d5c58] hover:text-black transition-colors py-2 font-bold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>← Return to CEAR Home</span>
          </Link>
        </div>
        <ProjectsShowcase />
      </main>
      <Footer />
    </div>
  );
}
