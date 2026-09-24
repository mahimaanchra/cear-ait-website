"use client";

import React from "react";

export function BackgroundGrid() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Clean Light Slate Backdrop */}
      <div className="absolute inset-0 bg-slate-50" />

      {/* Fine Technical Grid */}
      <div 
        className="absolute inset-0 opacity-30" 
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(15, 23, 42, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(15, 23, 42, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Clean Subtle Tech Blue Accent Glow in Top Corner */}
      <div className="absolute top-0 right-0 w-[35vw] h-[35vw] max-w-[450px] max-h-[450px] bg-blue-500/5 blur-[100px]" />
    </div>
  );
}

export default BackgroundGrid;
