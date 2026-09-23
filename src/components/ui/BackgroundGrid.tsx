"use client";

import React from "react";

export function BackgroundGrid() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Light technical paper backdrop */}
      <div className="absolute inset-0 bg-[#f9f9f8]" />

      {/* Subtle fine technical grid */}
      <div 
        className="absolute inset-0 opacity-40" 
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: "36px 36px",
        }}
      />

      {/* Very subtle ambient warmth in corners */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-gradient-to-bl from-teal-500/5 to-transparent blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-gradient-to-tr from-amber-500/5 to-transparent blur-[120px]" />
    </div>
  );
}
