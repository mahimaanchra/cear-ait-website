"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

interface NavbarProps {
  onOpenRegister?: () => void;
}

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Domains", href: "#domains" },
  { name: "Fleet", href: "#projects" },
  { name: "Wartech '26", href: "#wartech", isFlagship: true },
  { name: "Cadre", href: "#team" },
  { name: "Contact", href: "#contact" },
];

export function Navbar({ onOpenRegister }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ["hero", "about", "domains", "team", "projects", "events", "wartech", "contact"];
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
            ? "bg-[#fafaf9]/90 backdrop-blur-xl border-b border-[#0d1321]/[0.08] shadow-[0_10px_30px_-10px_rgba(13,19,33,0.05)] py-3"
            : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: Minimal CEAR Logo & Typography */}
          <Link href="#hero" className="flex items-center gap-3 group">
            <div className="relative w-8 h-8 shrink-0 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/cear-logo.svg"
                alt="CEAR"
                fill
                className="object-contain"
              />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-lg font-black tracking-tight text-[#0d1321]">
                CEAR
              </span>
              <span className="text-[10px] font-mono tracking-widest text-[#0d1321]/50 uppercase hidden sm:inline">
                AIT PUNE
              </span>
            </div>
          </Link>

          {/* Middle: Clean Minimal Links */}
          <nav className="hidden md:flex items-center gap-1 bg-[#ffffff]/80 backdrop-blur-md border border-[#0d1321]/[0.08] rounded-full p-1 shadow-xs">
            {navLinks.map((link) => {
              const targetId = link.href.replace("#", "");
              const isActive = activeSection === targetId;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-1.5 text-xs font-medium font-body tracking-tight rounded-full transition-all ${
                    isActive
                      ? "bg-[#0d1321] text-white shadow-xs"
                      : link.isFlagship
                      ? "text-[#0d1321] font-semibold hover:bg-[#0d1321]/[0.05]"
                      : "text-[#0d1321]/70 hover:text-[#0d1321] hover:bg-[#0d1321]/[0.04]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right: Clean Action Button */}
          <div className="hidden sm:flex items-center gap-3">
            {onOpenRegister ? (
              <button
                onClick={onOpenRegister}
                className="inline-flex items-center gap-1.5 text-xs font-medium font-body text-white bg-[#0d1321] hover:bg-[#1a2640] px-4 py-2 rounded-full transition-all shadow-xs cursor-pointer hover:shadow-md"
              >
                <span>Wartech &apos;26</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <Link
                href="#wartech"
                className="inline-flex items-center gap-1.5 text-xs font-medium font-body text-white bg-[#0d1321] hover:bg-[#1a2640] px-4 py-2 rounded-full transition-all shadow-xs hover:shadow-md"
              >
                <span>Wartech &apos;26</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-[#0d1321] hover:bg-[#0d1321]/[0.06] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 bg-[#fafaf9]/95 backdrop-blur-2xl border-b border-[#0d1321]/[0.08] shadow-2xl p-6 md:hidden"
          >
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-[#0d1321] py-2 border-b border-[#0d1321]/[0.06]"
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
                  className="w-full text-center py-2.5 text-sm font-medium text-white bg-[#0d1321] rounded-xl"
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
