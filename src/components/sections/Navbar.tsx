"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, Radio, Shield } from "lucide-react";
import { CearLogo } from "@/components/ui/CearLogo";

interface NavbarProps {
  onOpenRegister?: () => void;
}

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Team", href: "#team" },
  { name: "Projects", href: "#projects" },
  { name: "Events", href: "#events" },
  { name: "Wartech '26", href: "#wartech", isFlagship: true },
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#060911]/90 backdrop-blur-xl border-b border-cyan-500/25 shadow-[0_4px_30px_rgba(0,0,0,0.8),0_1px_15px_rgba(0,240,255,0.12)] py-2.5"
            : "bg-[#060911]/70 backdrop-blur-md border-b border-cyan-500/15 py-3.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: CEAR High-Tech Branding */}
          <Link href="#hero" className="flex items-center gap-3 group">
            <div className="relative p-1 rounded-lg border border-cyan-500/40 bg-[#0a0f1d] shadow-[0_0_12px_rgba(0,240,255,0.25)] group-hover:border-cyan-400 group-hover:shadow-[0_0_18px_rgba(0,240,255,0.45)] transition-all">
              <CearLogo className="w-8 h-8" size={32} priority />
              <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#00ff9d]" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-tech text-lg font-black tracking-wider text-slate-100 group-hover:text-cyan-400 transition-colors">
                  CEAR
                </span>
                <span className="px-1.5 py-0.2 text-[9px] font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 rounded">
                  SYS: ONLINE
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400 tracking-wider uppercase">
                AIT PUNE • LAB 104 • LAT: 18.60°N
              </span>
            </div>
          </Link>

          {/* Middle: Futuristic Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 bg-[#0a0f1d]/80 border border-slate-800/80 rounded-full px-2 py-1 shadow-inner">
            {navLinks.map((link) => {
              const targetId = link.href.replace("#", "");
              const isActive = activeSection === targetId;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-1 text-xs font-bold font-tech tracking-wide transition-all relative rounded-full ${
                    isActive
                      ? "text-cyan-300 bg-cyan-500/15 border border-cyan-400/40 shadow-[0_0_12px_rgba(0,240,255,0.25)]"
                      : link.isFlagship
                      ? "text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/30"
                      : "text-slate-300 hover:text-slate-100 hover:bg-slate-800/60 border border-transparent"
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {link.isFlagship && (
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                    )}
                    {link.name}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Right: Telemetry / Action CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenRegister}
              className="cyber-btn-primary !h-[38px] !text-xs !py-0 !px-4.5"
            >
              <span>INITIALIZE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg border border-cyan-500/30 bg-[#0d1424] text-cyan-400 shadow-[0_0_10px_rgba(0,240,255,0.2)]"
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
            className="fixed inset-x-0 top-[60px] z-40 bg-[#080d1a]/95 backdrop-blur-2xl border-b border-cyan-500/30 p-4 shadow-[0_10px_40px_rgba(0,0,0,0.9)] md:hidden"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-lg border border-slate-800 bg-[#0d1424] text-sm font-bold font-tech text-slate-200 hover:text-cyan-400 hover:border-cyan-500/40 flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    {link.isFlagship && <span className="w-2 h-2 rounded-full bg-rose-500" />}
                    {link.name}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-500" />
                </Link>
              ))}

              <div className="pt-3 border-t border-slate-800 mt-1">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenRegister?.();
                  }}
                  className="w-full cyber-btn-primary !h-[42px] text-sm"
                >
                  <span>INITIALIZE REGISTRATION</span>
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
