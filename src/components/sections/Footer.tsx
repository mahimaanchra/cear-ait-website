"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Linkedin, Github, Instagram, Mail, MapPin, ArrowUp } from "lucide-react";
import { siteConfig } from "@/data/siteData";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-white text-[#240d2b] pt-20 pb-12 border-t border-[#240d2b]/[0.08] relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1 & 2: Branding & Affiliation */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 shrink-0">
                <Image
                  src="/cear-logo.svg"
                  alt="CEAR"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <span className="font-display text-2xl font-black tracking-tight text-[#240d2b]">
                  CEAR
                </span>
                <span className="block text-[10px] font-mono text-[#ff6b35] uppercase tracking-widest font-semibold">
                  AI &amp; Robotics Lab • AIT Pune
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#240d2b]/70 font-body leading-relaxed max-w-sm">
              Centre of Excellence for AI &amp; Robotics at Army Institute of Technology, Pune. Researching and engineering autonomous defense rovers, intelligent perception stacks, and aerial systems.
            </p>

            <div className="p-4 rounded-2xl bg-[#f6f3ee] border border-[#240d2b]/[0.06] text-xs font-mono text-[#240d2b]/75 space-y-1">
              <p className="font-bold">{siteConfig.college}</p>
              <p className="text-[11px] text-[#240d2b]/50">{siteConfig.affiliation}</p>
            </div>
          </div>

          {/* Col 3: Navigation Links */}
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#240d2b]/50 block">
              Navigation
            </span>
            <ul className="space-y-2 text-xs font-body text-[#240d2b]/70">
              <li>
                <Link href="#about" className="hover:text-[#ff6b35] transition-colors">
                  About CEAR
                </Link>
              </li>
              <li>
                <Link href="#workshop" className="hover:text-[#ff6b35] transition-colors">
                  Workshop &amp; Lab 104
                </Link>
              </li>
              <li>
                <Link href="#projects" className="hover:text-[#ff6b35] transition-colors">
                  Projects &amp; Hardware
                </Link>
              </li>
              <li>
                <Link href="#wartech" className="text-[#ff6b35] font-semibold hover:underline transition-colors">
                  Wartech 2026
                </Link>
              </li>
              <li>
                <Link href="#team" className="hover:text-[#ff6b35] transition-colors">
                  Team &amp; Mentors
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-[#ff6b35] transition-colors">
                  Contact &amp; FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Location & Email */}
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#240d2b]/50 block">
              Laboratory
            </span>
            <div className="space-y-2.5 text-xs font-mono text-[#240d2b]/70 leading-relaxed">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#ff6b35] shrink-0 mt-0.5" />
                <span>{siteConfig.labLocation}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#ff6b35] shrink-0" />
                <a href={`mailto:${siteConfig.contactEmail}`} className="hover:text-[#ff6b35] transition-colors">
                  {siteConfig.contactEmail}
                </a>
              </div>
              <p className="text-[11px] text-[#240d2b]/50 pt-1">
                {siteConfig.address}
              </p>
            </div>
          </div>

          {/* Col 5: Social Channels */}
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#240d2b]/50 block">
              Connect
            </span>
            <div className="flex flex-col space-y-2 text-xs font-mono text-[#240d2b]/70">
              <a
                href={siteConfig.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#ff6b35] flex items-center gap-2 transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5 text-[#ff6b35]" />
                <span>LinkedIn</span>
              </a>
              <a
                href={siteConfig.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#ff6b35] flex items-center gap-2 transition-colors"
              >
                <Github className="w-3.5 h-3.5 text-[#ff6b35]" />
                <span>GitHub</span>
              </a>
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#ff6b35] flex items-center gap-2 transition-colors"
              >
                <Instagram className="w-3.5 h-3.5 text-[#ff6b35]" />
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back-to-Top */}
        <div className="pt-8 border-t border-[#240d2b]/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#240d2b]/50">
          <p>© {new Date().getFullYear()} Centre of Excellence for AI &amp; Robotics (CEAR), AIT Pune. All rights reserved.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-[#ff6b35] transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
