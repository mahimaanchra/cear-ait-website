"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Instagram,
  Linkedin,
  Github,
  MapPin,
  Mail,
  ArrowUp,
} from "lucide-react";
import { siteConfig } from "@/data/siteData";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#111827] text-white pt-12 pb-10 px-4 sm:px-6 lg:px-8 border-t border-zinc-800">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Logo & Vision */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-red-500 font-bold">{`{ / }`}</span>
              <span className="font-industrial text-lg font-bold text-white tracking-tight">
                AIT_CEAR
              </span>
            </div>

            <p className="text-xs text-zinc-400 font-sans leading-relaxed">
              Centre of Excellence for AI &amp; Robotics at Army Institute of Technology, Pune. Advancing tactical systems, AUVs, and autonomous machines.
            </p>

            <p className="text-[11px] font-mono text-zinc-500">
              BUILD • INNOVATE • AUTOMATE
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-2">
            <p className="font-mono text-xs uppercase tracking-wider text-teal-400 font-bold">
              [INDEX]
            </p>
            <ul className="space-y-1.5 text-xs font-mono text-zinc-400">
              <li>
                <Link href="#hero" className="hover:text-white transition-colors">
                  01. Innovation Manifesto
                </Link>
              </li>
              <li>
                <Link href="#team" className="hover:text-white transition-colors">
                  02. Team Modules
                </Link>
              </li>
              <li>
                <Link href="#projects" className="hover:text-white transition-colors">
                  03. Active Projects
                </Link>
              </li>
              <li>
                <Link href="#about" className="hover:text-white transition-colors">
                  04. About CEAR
                </Link>
              </li>
              <li>
                <Link href="/wartech" className="hover:text-white transition-colors text-red-400 font-bold">
                  05. Wartech Fest Arena →
                </Link>
              </li>
              <li>
                <Link href="#events" className="hover:text-white transition-colors">
                  06. Upcoming Operations
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Base Location */}
          <div className="space-y-2">
            <p className="font-mono text-xs uppercase tracking-wider text-teal-400 font-bold">
              [COORDINATES]
            </p>
            <div className="space-y-2 text-xs font-mono text-zinc-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                <span>
                  Lab 104, Dept of E&amp;TC,<br />
                  Army Institute of Technology,<br />
                  Dighi Hills, Pune 411015
                </span>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <Mail className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>{siteConfig.contactEmail}</span>
              </div>
            </div>
          </div>

          {/* Col 4: Socials & Back to Top */}
          <div className="space-y-4">
            <p className="font-mono text-xs uppercase tracking-wider text-teal-400 font-bold">
              [CHANNELS]
            </p>
            <div className="flex items-center gap-2">
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 flex items-center justify-center transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-700 text-xs font-mono transition-colors cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-zinc-500">
          <p>© {new Date().getFullYear()} CEAR AIT Pune. Industrial Tech format.</p>
          <p>Army Institute of Technology, Pune</p>
        </div>
      </div>
    </footer>
  );
}
