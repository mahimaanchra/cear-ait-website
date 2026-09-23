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
          className={cn("flex mb-3", isCenter ? "justify-center" : "justify-start")}
        >
          <span
            className={cn(
              "font-mono text-xs uppercase tracking-wider font-semibold",
              isDark ? "text-lime-bright" : "text-zinc-600"
            )}
          >
            [{badge}]
          </span>
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className={cn(
          "text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight font-cartoon",
          isDark ? "text-white" : "text-zinc-900"
        )}
      >
        {title}{" "}
        {highlightText && (
          <span
            className={cn(
              "inline-block",
              isDark
                ? "text-lime-bright"
                : "text-zinc-900 underline decoration-[#d4f933] decoration-4 underline-offset-8"
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
            "text-sm sm:text-base font-normal leading-relaxed mt-4",
            isDark ? "text-zinc-400" : "text-zinc-600",
            isCenter && "max-w-2xl mx-auto"
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
