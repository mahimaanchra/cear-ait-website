"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ChevronRight, Compass } from "lucide-react";

interface SubpageBreadcrumbProps {
  currentPage: "About" | "Projects" | "Team" | "Wartech";
}

const subpages = [
  { name: "About", href: "/about" },
  { name: "Platforms", href: "/projects" },
  { name: "Team Cadre", href: "/team" },
  { name: "Wartech '26", href: "/wartech" },
];

export function SubpageBreadcrumb({ currentPage }: SubpageBreadcrumbProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-2 sm:p-2.5 rounded-3xl bg-white/75 backdrop-blur-2xl border border-white/90 shadow-[0_8px_30px_rgba(36,13,43,0.04)] font-mono text-xs">
        {/* Left: Home Return & Current Breadcrumb */}
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-white text-[#240d2b] font-medium hover:text-[#ff6b35] hover:border-[#ff6b35]/40 transition-all shadow-xs cursor-pointer group"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#ff6b35] group-hover:-translate-x-0.5 transition-transform" />
            <span>Home</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#240d2b]/30" />
          <span className="font-bold text-[#240d2b] px-2 py-1 rounded-full bg-[#240d2b]/[0.05]">
            {currentPage}
          </span>
        </div>

        {/* Right: Subpage quick-switchers */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-[10px] text-[#240d2b]/40 uppercase tracking-widest hidden md:inline mr-1">
            Jump to:
          </span>
          {subpages.map((page) => {
            const isCurrent =
              page.name.toLowerCase().includes(currentPage.toLowerCase()) ||
              (currentPage === "Projects" && page.name === "Platforms") ||
              (currentPage === "Team" && page.name === "Team Cadre");

            return (
              <Link
                key={page.name}
                href={page.href}
                className={`px-3 py-1 rounded-full transition-all text-[11px] font-medium shrink-0 ${
                  isCurrent
                    ? "bg-[#240d2b] text-[#f6f3ee] shadow-xs font-semibold"
                    : "text-[#240d2b]/70 hover:text-[#240d2b] hover:bg-black/[0.04]"
                }`}
              >
                {page.name}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SubpageBreadcrumb;
