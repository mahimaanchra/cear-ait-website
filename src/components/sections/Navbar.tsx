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
  { name: "Wartech", href: "#wartech", badge: "FLAGSHIP" },
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
            ? "bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm py-3"
            : "bg-white/80 backdrop-blur-sm border-b border-slate-200/40 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: CEAR Logo + CEAR text branding with tiny green active dot */}
          <Link href="#hero" className="flex items-center gap-2.5 group">
            <CearLogo className="w-9 h-9 shadow-xs group-hover:scale-105 transition-transform" size={36} priority />
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-tech text-lg font-extrabold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                  CEAR
                </span>
                <span
                  className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"
                  title="Systems Operational"
                />
              </div>
              <span className="text-[10px] font-mono text-slate-500 font-semibold tracking-wider uppercase">
                AIT PUNE
              </span>
            </div>
          </Link>

          {/* Middle/Right: Quick links */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-2">
            {navLinks.map((link) => {
              const targetId = link.href.replace("#", "");
              const isActive = activeSection === targetId;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-md text-xs font-semibold font-tech transition-colors relative flex items-center gap-1.5 ${
                    isActive
                      ? "text-logo-navy bg-slate-100 font-bold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 border border-amber-200">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: CTA Button with Logo Dark Navy Touch */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenRegister}
              className="bg-logo-navy hover:bg-slate-800 text-white px-4 py-2 rounded-lg font-tech font-bold text-xs shadow-sm hover:shadow transition-all flex items-center gap-1.5 cursor-pointer border border-slate-800"
            >
              <span>Register Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
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
            className="fixed inset-x-0 top-[60px] z-40 bg-white border-b border-slate-200 p-4 shadow-lg md:hidden"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-sm font-semibold font-tech text-slate-800 hover:bg-slate-100 flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">
                      {link.badge}
                    </span>
                  )}
                </Link>
              ))}

              <div className="pt-3 border-t border-slate-100 mt-1">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenRegister?.();
                  }}
                  className="w-full bg-logo-navy hover:bg-slate-800 text-white py-2.5 rounded-lg font-tech font-bold text-sm shadow-sm flex items-center justify-center gap-2 border border-slate-800"
                >
                  <span>Register Now / Join Club</span>
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
