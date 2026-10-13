"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export interface CearLogoProps {
  className?: string;
  size?: number;
  priority?: boolean;
  variant?: "glass" | "minimal" | "emblem" | "pulse";
  animated?: boolean;
  src?: string;
  ariaLabel?: string;
}

export function CearLogo({
  className = "w-9 h-9",
  size = 48,
  priority = false,
  variant = "glass",
  animated = true,
  src = "/cear-logo.svg",
  ariaLabel = "CEAR - Centre of Excellence for AI and Robotics, AIT Pune",
}: CearLogoProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImgSrc(src);
    setHasError(false);
  }, [src]);

  const containerVariants = {
    glass:
      "p-1.5 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-[0_4px_16px_rgba(36,13,43,0.06)] group-hover:shadow-[0_8px_24px_rgba(255,107,53,0.2)] group-hover:border-[#ff6b35]/40 transition-all duration-300",
    emblem:
      "p-2.5 rounded-3xl bg-white/50 backdrop-blur-2xl border border-white/80 shadow-[0_12px_32px_rgba(36,13,43,0.1)] group-hover:shadow-[0_16px_40px_rgba(255,107,53,0.25)] transition-all duration-300",
    pulse:
      "p-1.5 rounded-2xl bg-white/80 backdrop-blur-xl border border-[#ff6b35]/30 shadow-[0_0_20px_rgba(255,107,53,0.2)] group-hover:shadow-[0_0_30px_rgba(255,107,53,0.4)] transition-all duration-300",
    minimal: "transition-transform duration-300",
  };

  const handleImageError = () => {
    if (imgSrc !== "/cear-logo.png") {
      setImgSrc("/cear-logo.png");
    } else {
      setHasError(true);
    }
  };

  const Content = (
    <div
      role="img"
      aria-label={ariaLabel}
      className={`relative inline-flex items-center justify-center shrink-0 ${containerVariants[variant]} ${className}`}
    >
      {/* Specular inner top highlight for glass, emblem, and pulse */}
      {variant !== "minimal" && (
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
      )}

      {/* Radiant beacon for pulse variant */}
      {variant === "pulse" && (
        <span className="absolute -inset-1 rounded-2xl bg-[#ff6b35]/15 blur-sm animate-pulse pointer-events-none" />
      )}

      <div className="relative w-full h-full flex items-center justify-center">
        {!hasError ? (
          <Image
            src={imgSrc}
            alt={ariaLabel}
            fill
            sizes={`${size}px`}
            priority={priority}
            onError={handleImageError}
            className="object-contain drop-shadow-[0_2px_8px_rgba(36,13,43,0.12)] transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          /* High-Tech Vector Circuit Fallback Emblem */
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full text-[#ff6b35]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon
              points="50,6 90,28 90,72 50,94 10,72 10,28"
              stroke="#240d2b"
              strokeWidth="4"
              fill="rgba(36,13,43,0.05)"
            />
            <polygon
              points="50,18 80,35 80,65 50,82 20,65 20,35"
              stroke="#ff6b35"
              strokeWidth="3"
              strokeDasharray="4 2"
            />
            <circle cx="50" cy="50" r="12" fill="#ff6b35" fillOpacity="0.2" stroke="#ff6b35" strokeWidth="2.5" />
            <circle cx="50" cy="50" r="5" fill="#ff6b35" />
            <path d="M50 20 L50 38 M50 62 L50 80 M24 36 L39 44 M61 56 L76 64" stroke="#240d2b" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}
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
