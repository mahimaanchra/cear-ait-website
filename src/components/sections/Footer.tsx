"use client";

import React from "react";
import Link from "next/link";
import { Cpu, Linkedin, Github, Instagram, Mail, MapPin, ArrowUp, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/data/siteData";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-900 text-white pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1 & 2: Branding & Affiliation */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <span className="font-tech text-xl font-extrabold tracking-tight">CEAR</span>
                <span className="block text-[10px] font-mono text-slate-400 tracking-wider">
                  AI &amp; ROBOTICS EXCELLENCE
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 font-sans leading-relaxed max-w-sm">
              {siteConfig.heroSubtitle}
            </p>

            <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700 space-y-1 text-xs font-mono text-slate-300">
              <div className="flex items-center gap-2 font-bold text-white">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span>{siteConfig.college}</span>
              </div>
              <p className="text-[11px] text-slate-400">
                {siteConfig.affiliation}
              </p>
            </div>
          </div>

          {/* Col 3: Quick Navigation Links */}
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 block">
              PORTAL NAVIGATION
            </span>
            <ul className="space-y-2 text-xs font-tech font-semibold text-slate-300">
              <li>
                <Link href="#about" className="hover:text-blue-400 transition-colors">
                  About CEAR
                </Link>
              </li>
              <li>
                <Link href="#team" className="hover:text-blue-400 transition-colors">
                  Leadership Cadre
                </Link>
              </li>
              <li>
                <Link href="#projects" className="hover:text-blue-400 transition-colors">
                  Projects Showcase
                </Link>
              </li>
              <li>
                <Link href="#events" className="hover:text-blue-400 transition-colors">
                  Workshops &amp; Events
                </Link>
              </li>
              <li>
                <Link href="#wartech" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <span>Wartech 2026</span>
                  <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-red-900/60 text-red-300 border border-red-700">
                    FLAGSHIP
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Lab Coordinates */}
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 block">
              CAMPUS COORDINATES
            </span>
            <div className="space-y-2 text-xs font-mono text-slate-400 leading-relaxed">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>{siteConfig.labLocation}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a href={`mailto:${siteConfig.contactEmail}`} className="hover:text-white transition-colors">
                  {siteConfig.contactEmail}
                </a>
              </div>
              <p className="text-[11px] text-slate-500 pt-1">
                {siteConfig.address}
              </p>
            </div>
          </div>

          {/* Col 5: Social Channels & Back to Top */}
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 block">
              CONNECT &amp; SOCIALS
            </span>
            <div className="flex items-center gap-2">
              <a
                href={siteConfig.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="CEAR LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="CEAR GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-pink-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="CEAR Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-4">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>Return to Top</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Defense Tech Note */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} Centre of Excellence for AI &amp; Robotics (CEAR), AIT Pune. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>ARMY INSTITUTE OF TECHNOLOGY • PUNE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
