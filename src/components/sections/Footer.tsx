"use client";

import React from "react";
import Link from "next/link";
import { Linkedin, Github, Instagram, Mail, MapPin, ArrowUp, ShieldCheck, Shield } from "lucide-react";
import { siteConfig } from "@/data/siteData";
import { CearLogo } from "@/components/ui/CearLogo";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-ink text-paper pt-16 pb-12 border-t-[3px] border-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1 & 2: Branding & Affiliation */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-1 rounded-xl bg-white border-2 border-paper shadow-[2px_2px_0_#000]">
                <CearLogo className="w-9 h-9" size={36} />
              </div>
              <div>
                <span className="font-tech text-xl font-black tracking-tight text-paper">CEAR</span>
                <span className="block text-[10px] font-mono text-coin-y1 font-bold tracking-wider">
                  AI &amp; ROBOTICS EXCELLENCE
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-paper/80 font-body font-semibold leading-relaxed max-w-sm">
              {siteConfig.heroSubtitle}
            </p>

            <div className="p-3.5 rounded-xl bg-ink-soft border-2 border-paper/20 space-y-1 text-xs font-mono text-paper">
              <div className="flex items-center gap-2 font-bold text-white">
                <ShieldCheck className="w-4 h-4 text-white" />
                <span>{siteConfig.college}</span>
              </div>
              <p className="text-[11px] text-paper/70 font-semibold">
                {siteConfig.affiliation}
              </p>
            </div>
          </div>

          {/* Col 3: Quick Navigation Links */}
          <div className="space-y-3">
            <span className="text-xs font-mono font-black uppercase tracking-wider text-paper/90 block">
              Navigation
            </span>
            <ul className="space-y-2 text-xs font-tech font-bold text-paper/85">
              <li>
                <Link href="#about" className="hover:text-red transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#team" className="hover:text-red transition-colors">
                  Team
                </Link>
              </li>
              <li>
                <Link href="#projects" className="hover:text-red transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="#events" className="hover:text-red transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link href="#wartech" className="hover:text-red transition-colors">
                  Wartech 2026
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Lab Coordinates */}
          <div className="space-y-3">
            <span className="text-xs font-mono font-black uppercase tracking-wider text-paper/90 block">
              Location
            </span>
            <div className="space-y-2 text-xs font-mono text-paper/80 leading-relaxed">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red shrink-0 mt-0.5" />
                <span>{siteConfig.labLocation}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-paper/70 shrink-0" />
                <a href={`mailto:${siteConfig.contactEmail}`} className="hover:text-white transition-colors">
                  {siteConfig.contactEmail}
                </a>
              </div>
              <p className="text-[11px] text-paper/60 pt-1">
                {siteConfig.address}
              </p>
            </div>
          </div>

          {/* Col 5: Social Channels & Back to Top */}
          <div className="space-y-3">
            <span className="text-xs font-mono font-black uppercase tracking-wider text-paper/90 block">
              Connect
            </span>
            <div className="flex items-center gap-2">
              <a
                href={siteConfig.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white text-ink border-2 border-paper flex items-center justify-center transition-all hover:-translate-y-1 hover:rotate-3 shadow-[2px_2px_0_#000]"
                aria-label="CEAR LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white text-ink border-2 border-paper flex items-center justify-center transition-all hover:-translate-y-1 hover:-rotate-3 shadow-[2px_2px_0_#000]"
                aria-label="CEAR GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white text-ink border-2 border-paper flex items-center justify-center transition-all hover:-translate-y-1 hover:rotate-3 shadow-[2px_2px_0_#000]"
                aria-label="CEAR Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-4">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-paper text-ink font-mono font-black text-xs border-2 border-paper hover:bg-white hover:border-white transition-all shadow-[2px_2px_0_#000] cursor-pointer hover-wiggle"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>Return to Top</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Defense Tech Note & Admin Access */}
        <div className="pt-8 border-t-2 border-paper/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-paper/70">
          <div>
            &copy; {new Date().getFullYear()} Centre of Excellence for AI &amp; Robotics (CEAR), AIT Pune. All rights reserved.
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="text-paper/80 hover:text-white transition-colors flex items-center gap-1.5 font-bold"
              title="Admin & Content Portal"
            >
              <Shield className="w-3.5 h-3.5 text-paper/80" />
              <span>Admin Portal</span>
            </Link>
            <span className="text-paper/30">•</span>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red border border-paper/40 animate-pulse" />
              <span>ARMY INSTITUTE OF TECHNOLOGY • PUNE</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
