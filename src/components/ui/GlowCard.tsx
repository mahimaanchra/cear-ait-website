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
  glowColor = "rgba(212, 249, 51, 0.12)",
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
    light: "bg-white text-ink border-[2.5px] border-ink rounded-[22px_27px_20px_25px_/_27px_20px_25px_22px] shadow-[4px_5px_0_#14140f] hover:shadow-[2px_3px_0_#14140f] hover:translate-x-[2px] hover:translate-y-[2px]",
    dark: "bg-ink text-paper border-[2.5px] border-ink rounded-[22px_27px_20px_25px_/_27px_20px_25px_22px] shadow-[4px_5px_0_#14140f]",
    lime: "bg-coin-y1/20 text-ink border-[2.5px] border-ink rounded-[22px_27px_20px_25px_/_27px_20px_25px_22px] shadow-[4px_5px_0_#14140f]",
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
