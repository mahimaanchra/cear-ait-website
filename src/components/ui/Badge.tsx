import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: "lime" | "dark" | "outline" | "cyan" | "teal" | "gold" | "purple";
  className?: string;
}

export function Badge({ children, variant = "lime", className, ...props }: BadgeProps) {
  const variants = {
    lime: "bg-white text-ink border-2 border-ink shadow-[2px_2px_0_#14140f]",
    dark: "bg-ink text-paper border-2 border-ink shadow-[2px_2px_0_#14140f]",
    outline: "bg-paper text-ink border-2 border-ink shadow-[2px_2px_0_#14140f]",
    cyan: "bg-white text-ink border-2 border-ink shadow-[2px_2px_0_#14140f]",
    teal: "bg-ink text-white border-2 border-ink shadow-[2px_2px_0_#14140f]",
    purple: "bg-red text-white border-2 border-ink shadow-[2px_2px_0_#14140f]",
    gold: "bg-white text-ink border-2 border-ink shadow-[2px_2px_0_#14140f]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-tech font-bold tracking-tight transition-transform",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export default Badge;
