"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  highlightText?: string;
  subtitle?: string;
  align?: "left" | "center";
  theme?: "light" | "dark";
  className?: string;
}

export function SectionHeading({
  badge,
  title,
  highlightText,
  subtitle,
  align = "center",
  theme = "light",
  className,
}: SectionHeadingProps) {
  const isCenter = align === "center";
  const isDark = theme === "dark";

  return (
    <div
      className={cn(
        "mb-12 sm:mb-16",
        isCenter ? "text-center mx-auto max-w-3xl" : "text-left max-w-3xl",
        className
      )}
    >
      {badge && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className={cn("flex mb-3.5", isCenter ? "justify-center" : "justify-start")}
        >
          <span
            className={cn(
              "paper-badge text-xs font-tech font-extrabold uppercase tracking-wider py-1 px-3 -rotate-1",
              isDark
                ? "bg-paper text-ink shadow-[2px_2px_0_#ffffff]"
                : "bg-ink text-paper shadow-[2px_2px_0_#14140f]"
            )}
          >
            {badge}
          </span>
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className={cn(
          "text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight font-display",
          isDark ? "text-paper" : "text-ink"
        )}
      >
        {title}{" "}
        {highlightText && (
          <span
            className={cn(
              "inline-block underline decoration-red decoration-[3.5px] underline-offset-6 text-red"
            )}
          >
            {highlightText}
          </span>
        )}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className={cn(
            "text-sm sm:text-base font-body font-medium leading-relaxed mt-3.5",
            isDark ? "text-paper/75" : "text-ink/75",
            isCenter && "max-w-2xl mx-auto"
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

export default SectionHeading;
