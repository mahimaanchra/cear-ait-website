"use client";

import React, { useRef, useState } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  enableSpotlight?: boolean;
  theme?: "light" | "dark" | "lime";
}

export function GlowCard({
  children,
  className,
  glowColor = "rgba(255, 107, 53, 0.15)",
  enableSpotlight = true,
  theme = "light",
  ...props
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: -200, y: -200 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !enableSpotlight) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const themeClasses = {
    light: "bg-white/80 backdrop-blur-xl border border-white/80 shadow-[0_12px_35px_-10px_rgba(36,13,43,0.05)] text-[#240d2b]",
    dark: "bg-[#240d2b]/85 backdrop-blur-2xl border border-white/10 shadow-[0_20px_45px_-10px_rgba(0,0,0,0.3)] text-white",
    lime: "bg-gradient-to-br from-[#ff6b35]/10 to-white/80 backdrop-blur-xl border border-[#ff6b35]/20 text-[#240d2b]",
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        setMousePosition({ x: -200, y: -200 });
      }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn(
        "relative rounded-3xl p-6 transition-all duration-300 overflow-hidden group",
        themeClasses[theme],
        className
      )}
      {...props}
    >
      {/* Interactive mouse spotlight glow */}
      {enableSpotlight && (
        <div
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(350px circle at ${mousePosition.x}px ${mousePosition.y}px, ${glowColor}, transparent 70%)`,
          }}
        />
      )}

      {/* Card Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

export default GlowCard;
