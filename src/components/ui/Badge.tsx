import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: "lime" | "dark" | "outline" | "cyan" | "teal" | "gold" | "purple";
  className?: string;
}

export function Badge({ children, variant = "lime", className, ...props }: BadgeProps) {
  const variants = {
    lime: "bg-[#d4f933] text-black border border-[#bef264] font-bold shadow-sm",
    dark: "bg-[#09090c] text-white border border-zinc-700",
    outline: "bg-white text-zinc-800 border border-zinc-300",
    cyan: "bg-sky-100 text-sky-900 border border-sky-300",
    teal: "bg-emerald-100 text-emerald-900 border border-emerald-300",
    purple: "bg-purple-100 text-purple-900 border border-purple-300",
    gold: "bg-amber-100 text-amber-900 border border-amber-300",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-mono tracking-tight transition-colors",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
