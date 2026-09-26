"use client";

import React from "react";
import { NeuralCanvas } from "@/components/ui/NeuralCanvas";

export function BackgroundGrid() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Warm Paper Canvas Backdrop */}
      <div className="absolute inset-0 bg-paper paper-canvas" />

      {/* Fine Technical Grid in Charcoal Ink */}
      <div 
        className="absolute inset-0 opacity-40" 
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(20, 20, 15, 0.035) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(20, 20, 15, 0.035) 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Neural AI & Robotics Mesh Background */}
      <NeuralCanvas className="opacity-60" nodeCount={24} interactive={true} />
    </div>
  );
}

export default BackgroundGrid;
