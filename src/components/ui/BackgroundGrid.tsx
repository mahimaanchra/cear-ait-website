"use client";

import React from "react";
import { ArchitecturalCleanBackground } from "@/components/ui/ArchitecturalCleanBackground";

export function BackgroundGrid() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Warm Oat Linen Backdrop */}
      <div className="absolute inset-0 bg-[#f6f3ee]" />

      {/* Architectural Clean Vector Blueprint & Glow Background */}
      <ArchitecturalCleanBackground />
    </div>
  );
}

export default BackgroundGrid;

