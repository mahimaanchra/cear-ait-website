"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Sparkles, Search } from "lucide-react";
import { CearLogo } from "@/components/ui/CearLogo";

interface NavbarProps {
  onOpenRegister?: () => void;
  onOpenCommandPalette?: () => void;
}

const navLinks = [
  { name: "About", href: "/#about" },
  { name: "Workshop", href: "/#workshop" },
  { name: "Projects", href: "/#projects" },
  { name: "Wartech '26", href: "/#wartech", isFlagship: true },
  { name: "Research", href: "/#research" },
  { name: "Team", href: "/#team" },
  { name: "Contact", href: "/#contact" },
];

export function Navbar({ onOpenRegister, onOpenCommandPalette }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = [
        "hero",
        "about",
        "domains",
        "workshop",
        "projects",
        "team",
        "events",
        "wartech",
        "research",
        "contact",
      ];
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
            ? "bg-[#f6f3ee]/80 backdrop-blur-2xl border-b border-white/80 shadow-[0_12px_35px_-10px_rgba(36,13,43,0.06)] py-3"
            : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: Minimal CEAR Logo & Typography with Glass Badge */}
          <Link href="/#hero" className="flex items-center gap-3 group">
            <CearLogo size={36} className="w-9 h-9" variant="glass" animated={false} />
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-lg font-black tracking-tight text-[#240d2b]">
                CEAR
              </span>
              <span className="text-[10px] font-mono tracking-widest text-[#240d2b]/50 uppercase hidden sm:inline">
                AIT PUNE
              </span>
            </div>
          </Link>

          {/* Middle: Frosted Glass Floating Links Dock */}
          <nav className="hidden md:flex items-center gap-1 bg-white/75 backdrop-blur-xl border border-white/90 rounded-full p-1.5 shadow-[0_4px_20px_rgba(36,13,43,0.04)]">
            {navLinks.map((link) => {
              const targetId = link.href.replace("#", "");
              const isActive = activeSection === targetId;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-4 py-1.5 text-xs font-medium font-body tracking-tight rounded-full transition-all ${
                    isActive
                      ? "text-[#f6f3ee] font-semibold"
                      : link.isFlagship
                      ? "text-[#ff6b35] font-semibold hover:bg-[#ff6b35]/[0.08]"
                      : "text-[#240d2b]/70 hover:text-[#240d2b] hover:bg-black/[0.03]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-[#240d2b] rounded-full -z-10 shadow-xs"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right: Search / Command Palette and Tangerine Glass Action Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            {onOpenCommandPalette && (
              <button
                onClick={onOpenCommandPalette}
                className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-mono bg-white/75 hover:bg-white text-[#240d2b]/80 hover:text-[#240d2b] border border-white/90 shadow-[0_2px_10px_rgba(36,13,43,0.04)] transition-all cursor-pointer hover:scale-102 active:scale-98"
                title="Open Command Palette (Cmd + K)"
                aria-label="Open Command Palette"
              >
                <Search className="w-3.5 h-3.5 text-[#ff6b35]" />
                <span className="hidden md:inline text-[#240d2b]/60 text-[11px]">Search</span>
                <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded-md bg-black/5 text-[10px] text-[#240d2b]/70 border border-black/5 font-semibold">
                  ⌘K
                </kbd>
              </button>
            )}

            <div className="hidden sm:flex items-center">
              {onOpenRegister ? (
                <button
                  onClick={onOpenRegister}
                  className="inline-flex items-center gap-1.5 text-xs font-medium font-body text-white bg-[#ff6b35] hover:bg-[#fa5519] px-4 py-2 rounded-full transition-all shadow-[0_2px_14px_rgba(255,107,53,0.35)] hover:shadow-[0_4px_18px_rgba(255,107,53,0.5)] cursor-pointer hover:scale-102 active:scale-98"
                >
                  <span>Wartech &apos;26</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <Link
                  href="#wartech"
                  className="inline-flex items-center gap-1.5 text-xs font-medium font-body text-white bg-[#ff6b35] hover:bg-[#fa5519] px-4 py-2 rounded-full transition-all shadow-[0_2px_14px_rgba(255,107,53,0.35)] hover:shadow-[0_4px_18px_rgba(255,107,53,0.5)]"
                >
                  <span>Wartech &apos;26</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-[#240d2b] hover:bg-white/60 backdrop-blur-md transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu with High Glassmorphism */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 bg-[#f6f3ee]/95 backdrop-blur-2xl border-b border-white/80 shadow-2xl p-6 md:hidden"
          >
            <nav className="flex flex-col space-y-3">
              {onOpenCommandPalette && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCommandPalette();
                  }}
                  className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/90 border border-white/90 text-xs font-mono text-[#240d2b] shadow-xs cursor-pointer text-left"
                >
                  <span className="flex items-center gap-2">
                    <Search className="w-4 h-4 text-[#ff6b35]" />
                    <span>Search Fleet &amp; Arenas</span>
                  </span>
                  <kbd className="px-1.5 py-0.5 rounded-md bg-black/5 text-[10px] text-[#240d2b]/60 border border-black/5">
                    ⌘K
                  </kbd>
                </button>
              )}

              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-[#240d2b] py-2 border-b border-[#240d2b]/[0.06]"
                >
                  {link.name}
                </Link>
              ))}

              <div className="pt-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenRegister?.();
                  }}
                  className="w-full text-center py-2.5 text-sm font-medium text-white bg-[#ff6b35] hover:bg-[#fa5519] rounded-xl shadow-[0_2px_12px_rgba(255,107,53,0.3)]"
                >
                  Wartech 2026 Registration
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
