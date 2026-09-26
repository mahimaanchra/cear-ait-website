"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, Sparkles } from "lucide-react";
import { siteConfig } from "@/data/siteData";
import { CearLogo } from "@/components/ui/CearLogo";

interface NavbarProps {
  onOpenRegister?: () => void;
}

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Team", href: "#team" },
  { name: "Projects", href: "#projects" },
  { name: "Events", href: "#events" },
  { name: "Wartech", href: "#wartech" },
];

export function Navbar({ onOpenRegister }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ["hero", "about", "team", "projects", "events", "wartech"];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          scrolled
            ? "bg-[#f4f3ef]/95 backdrop-blur-md border-b-[2.5px] border-ink shadow-[0_3px_0_rgba(20,20,15,0.06)] py-2.5"
            : "bg-[#f4f3ef]/90 backdrop-blur-sm border-b-2 border-ink/80 py-3.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: CEAR Logo + CEAR text branding with active dot */}
          <Link href="#hero" className="flex items-center gap-2.5 group">
            <div className="relative p-0.5 rounded-lg border-2 border-ink bg-white shadow-[2px_2px_0_#14140f] group-hover:rotate-[-4deg] transition-transform">
              <CearLogo className="w-8 h-8" size={32} priority />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-tech text-lg font-black tracking-tight text-ink group-hover:text-alarm transition-colors">
                  CEAR
                </span>
                <span
                  className="w-2.5 h-2.5 rounded-full bg-alarm border border-ink shadow-[1px_1px_0_#14140f] animate-ping"
                  title="Systems Operational"
                />
              </div>
              <span className="text-[10px] font-mono text-ink/60 font-bold tracking-wider uppercase">
                AIT PUNE • LAB 104
              </span>
            </div>
          </Link>

          {/* Middle/Right: Quick links */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-1.5">
            {navLinks.map((link) => {
              const targetId = link.href.replace("#", "");
              const isActive = activeSection === targetId;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-1 text-xs font-black font-tech transition-all relative rounded-full ${
                    isActive
                      ? "text-white bg-ink border-2 border-ink shadow-[2px_2px_0_#14140f] -rotate-1"
                      : "text-ink/80 hover:text-ink hover:bg-white border-2 border-transparent hover:border-ink/30"
                  }`}
                >
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right: CTA Button with dontlookup.app Tactile Physics */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenRegister}
              className="btn-paper-primary !h-[38px] !text-xs !py-0 !px-4 hover-wiggle"
            >
              <span>Register</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl border-2 border-ink bg-white shadow-[2px_2px_0_#14140f] text-ink transition-transform active:translate-x-0.5 active:translate-y-0.5"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[60px] z-40 bg-paper border-b-[2.5px] border-ink p-4 shadow-[0_5px_0_#14140f] md:hidden"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-xl border-2 border-ink bg-white shadow-[2px_2px_0_#14140f] text-sm font-bold font-tech text-ink flex items-center justify-between"
                >
                  <span>{link.name}</span>
                </Link>
              ))}

              <div className="pt-3 border-t-2 border-ink/10 mt-1">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenRegister?.();
                  }}
                  className="w-full btn-paper-primary !h-[42px] text-sm"
                >
                  <span>Register</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
