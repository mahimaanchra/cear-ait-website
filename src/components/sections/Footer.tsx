"use client";

import React from "react";
import Link from "next/link";
import { Linkedin, Github, Instagram, Mail, MapPin, ArrowUp, ShieldCheck, Shield, Radio } from "lucide-react";
import { siteConfig } from "@/data/siteData";
import { CearLogo } from "@/components/ui/CearLogo";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#04060a] text-slate-300 pt-16 pb-12 border-t border-cyan-500/20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1 & 2: Branding & Affiliation */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-1 rounded-lg bg-[#0a101d] border border-cyan-500/40 shadow-[0_0_12px_rgba(0,240,255,0.25)]">
                <CearLogo className="w-9 h-9" size={36} />
              </div>
              <div>
                <span className="font-tech text-xl font-black tracking-wider text-slate-100">CEAR</span>
                <span className="block text-[10px] font-mono text-cyan-400 font-bold tracking-wider">
                  AI &amp; ROBOTICS EXCELLENCE
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 font-body leading-relaxed max-w-sm">
              {siteConfig.heroSubtitle}
            </p>

            <div className="p-3.5 rounded-lg bg-[#080d1a] border border-cyan-500/20 space-y-1 text-xs font-mono">
              <div className="flex items-center gap-2 font-bold text-slate-100">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>{siteConfig.college}</span>
              </div>
              <p className="text-[11px] text-slate-400">
                {siteConfig.affiliation}
              </p>
            </div>
          </div>

          {/* Col 3: Quick Navigation Links */}
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200 block">
              Navigation
            </span>
            <ul className="space-y-2 text-xs font-tech font-medium text-slate-400">
              <li>
                <Link href="#about" className="hover:text-cyan-400 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#team" className="hover:text-cyan-400 transition-colors">
                  Team
                </Link>
              </li>
              <li>
                <Link href="#projects" className="hover:text-cyan-400 transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="#events" className="hover:text-cyan-400 transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link href="#wartech" className="hover:text-rose-400 transition-colors">
                  Wartech 2026
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Lab Coordinates */}
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200 block">
              Location
            </span>
            <div className="space-y-2 text-xs font-mono text-slate-400 leading-relaxed">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>{siteConfig.labLocation}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href={`mailto:${siteConfig.contactEmail}`} className="hover:text-cyan-300 transition-colors">
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
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200 block">
              Connect
            </span>
            <div className="flex items-center gap-2">
              <a
                href={siteConfig.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#0a101d] text-slate-300 border border-slate-800 hover:border-cyan-500/50 hover:text-cyan-400 flex items-center justify-center transition-all shadow-sm"
                aria-label="CEAR LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#0a101d] text-slate-300 border border-slate-800 hover:border-cyan-500/50 hover:text-cyan-400 flex items-center justify-center transition-all shadow-sm"
                aria-label="CEAR GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#0a101d] text-slate-300 border border-slate-800 hover:border-cyan-500/50 hover:text-cyan-400 flex items-center justify-center transition-all shadow-sm"
                aria-label="CEAR Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-4">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0a101d] text-slate-300 font-mono font-bold text-xs border border-cyan-500/30 hover:border-cyan-400 hover:text-cyan-300 transition-all cursor-pointer"
              >
                <ArrowUp className="w-3.5 h-3.5 text-cyan-400" />
                <span>Return to Top</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Admin Portal */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} Centre of Excellence for AI &amp; Robotics (CEAR), AIT Pune. All rights reserved.
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1.5 font-bold"
              title="Admin & Content Portal"
            >
              <Shield className="w-3.5 h-3.5 text-cyan-400" />
              <span>Admin Portal</span>
            </Link>
            <span className="text-slate-700">•</span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#00ff9d]" />
              <span>ARMY INSTITUTE OF TECHNOLOGY • PUNE</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
