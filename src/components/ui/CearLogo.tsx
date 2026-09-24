"use client";

import React from "react";
import Image from "next/image";

interface CearLogoProps {
  className?: string;
  size?: number;
  priority?: boolean;
}

export function CearLogo({ className = "w-9 h-9", size = 48, priority = false }: CearLogoProps) {
  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 rounded-full overflow-hidden ${className}`}>
      <Image
        src="/cear-logo.png"
        alt="CEAR - Centre of Excellence for AI and Robotics"
        width={size}
        height={size}
        priority={priority}
        className="w-full h-full object-contain"
      />
    </div>
  );
}

export default CearLogo;
