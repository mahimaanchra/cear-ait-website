"use client";

import React from "react";
import { CearRoboticsBackground } from "@/components/ui/CearRoboticsBackground";

export function BackgroundGrid() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Warm Paper Canvas Backdrop */}
      <div className="absolute inset-0 bg-paper" />

      {/* Creative CEAR (AI & Robotics) Blueprint Background Animations */}
      <CearRoboticsBackground />
    </div>
  );
}

export default BackgroundGrid;
