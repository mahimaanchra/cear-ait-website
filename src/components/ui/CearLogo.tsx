"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export interface CearLogoProps {
  className?: string;
  size?: number;
  priority?: boolean;
  variant?: "glass" | "minimal" | "emblem";
  animated?: boolean;
  src?: string;
}

export function CearLogo({
  className = "w-9 h-9",
  size = 48,
  priority = false,
  variant = "glass",
  animated = true,
  src = "/cear-logo.svg",
}: CearLogoProps) {
  const [imgSrc, setImgSrc] = useState(src);

  const containerVariants = {
    glass:
      "p-1.5 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-[0_4px_16px_rgba(36,13,43,0.06)] group-hover:shadow-[0_8px_24px_rgba(255,107,53,0.2)] group-hover:border-[#ff6b35]/40 transition-all duration-300",
    emblem:
      "p-2.5 rounded-3xl bg-white/50 backdrop-blur-2xl border border-white/80 shadow-[0_12px_32px_rgba(36,13,43,0.1)] group-hover:shadow-[0_16px_40px_rgba(255,107,53,0.25)] transition-all duration-300",
    minimal: "transition-transform duration-300",
  };

  const Content = (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${containerVariants[variant]} ${className}`}
    >
      {/* Specular inner top highlight for glass and emblem */}
      {variant !== "minimal" && (
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
      )}

      <div className="relative w-full h-full">
        <Image
          src={imgSrc}
          alt="CEAR - Centre of Excellence for AI and Robotics"
          fill
          sizes={`${size}px`}
          priority={priority}
          onError={() => setImgSrc("/cear-logo.png")}
          className="object-contain drop-shadow-[0_2px_8px_rgba(36,13,43,0.12)] transition-transform duration-300 group-hover:scale-105"
        />
      </div>
    </div>
  );

  if (animated) {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="inline-flex items-center justify-center cursor-pointer"
      >
        {Content}
      </motion.div>
    );
  }

  return Content;
}

export default CearLogo;
