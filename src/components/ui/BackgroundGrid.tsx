"use client";

import React from "react";
import { CyberMatrixBackground } from "@/components/ui/CyberMatrixBackground";

export function BackgroundGrid() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Deep Obsidian Canvas Backdrop */}
      <div className="absolute inset-0 bg-[#060911]" />

      {/* Cyber Matrix Background with Telemetry & Laser Grid */}
      <CyberMatrixBackground />
    </div>
  );
}

export default BackgroundGrid;

