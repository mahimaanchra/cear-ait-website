"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  variant?: "frosted" | "dark" | "tinted" | "minimal";
  enableTilt?: boolean;
  enableSpotlight?: boolean;
  spotlightColor?: string;
  glowOnHover?: boolean;
  tiltMaxAngle?: number;
}

export function GlassCard({
  children,
  className,
  variant = "frosted",
  enableTilt = true,
  enableSpotlight = true,
  spotlightColor = "rgba(255, 107, 53, 0.14)",
  glowOnHover = true,
  tiltMaxAngle = 7,
  ...props
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: -400, y: -400 });
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for smooth 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [tiltMaxAngle, -tiltMaxAngle]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-tiltMaxAngle, tiltMaxAngle]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    setMousePosition({ x: mouseX, y: mouseY });

    if (enableTilt) {
      // Calculate normalized coordinates (-0.5 to 0.5)
      const normalizedX = (mouseX / rect.width) - 0.5;
      const normalizedY = (mouseY / rect.height) - 0.5;
      x.set(normalizedX);
      y.set(normalizedY);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: -400, y: -400 });
    x.set(0);
    y.set(0);
  };

  const variantStyles = {
    frosted:
      "bg-white/75 backdrop-blur-xl border border-white/80 shadow-[0_15px_40px_-15px_rgba(36,13,43,0.05)] shadow-inner-[0_1px_1px_rgba(255,255,255,0.9)] text-[#240d2b]",
    dark:
      "bg-[#240d2b]/85 backdrop-blur-2xl border border-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] text-white",
    tinted:
      "bg-gradient-to-br from-white/85 via-[#fef4ed]/70 to-white/80 backdrop-blur-xl border border-[#ff6b35]/20 shadow-[0_15px_40px_-15px_rgba(255,107,53,0.08)] text-[#240d2b]",
    minimal:
      "bg-white/50 backdrop-blur-md border border-[#240d2b]/[0.06] text-[#240d2b]",
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: enableTilt ? rotateX : 0,
        rotateY: enableTilt ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "relative rounded-3xl overflow-hidden transition-all duration-300",
        variantStyles[variant],
        glowOnHover && isHovered && "border-[#ff6b35]/40 shadow-[0_20px_50px_-10px_rgba(255,107,53,0.12)]",
        className
      )}
      {...props}
    >
      {/* Dynamic Cursor Spotlight Glare Sheen */}
      {enableSpotlight && (
        <div
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 z-10"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, ${spotlightColor}, transparent 65%)`,
          }}
        />
      )}

      {/* Top Specular Inner Bevel Highlight */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent z-10" />

      {/* Card Content with subtle 3D lift */}
      <div
        className="relative z-20 h-full w-full"
        style={{
          transform: enableTilt && isHovered ? "translateZ(8px)" : "translateZ(0px)",
          transition: "transform 0.2s ease-out",
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}

export default GlassCard;
