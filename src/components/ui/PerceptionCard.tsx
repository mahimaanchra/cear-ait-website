"use client";

import React from "react";

interface PerceptionCardProps {
  children: React.ReactNode;
  className?: string;
  enableScan?: boolean;
}

export function PerceptionCard({
  children,
  className = "",
}: PerceptionCardProps) {
  return (
    <div
      className={`relative group bg-white rounded-2xl border border-[#0d1321]/[0.08] shadow-[0_10px_30px_-10px_rgba(13,19,33,0.04)] hover:border-[#0d1321]/25 hover:shadow-[0_20px_40px_-15px_rgba(13,19,33,0.08)] hover:-translate-y-1 transition-all duration-300 overflow-hidden ${className}`}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default PerceptionCard;
