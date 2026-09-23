"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/data/siteData";

const navLinks = [
  { name: "Home", href: "#hero" },
  { name: "Team", href: "#team" },
  { name: "Projects", href: "#projects" },
  { name: "About", href: "#about" },
  { name: "Operations", href: "#events" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "team", "projects", "about", "events", "contact"];
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 160 && rect.bottom >= 160) {
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
      {/* Floating Dark Pill Navbar - AIT_CIDC Style */}
      <header className="fixed top-4 left-0 right-0 z-40 px-4 flex justify-center pointer-events-none">
        <div className="w-full max-w-4xl bg-[#111827] text-white px-5 sm:px-6 py-2.5 rounded-full shadow-xl border border-zinc-800 flex items-center justify-between pointer-events-auto backdrop-blur-md">
          {/* Logo Badge */}
          <Link href="#hero" className="flex items-center gap-2 group">
            <span className="font-mono text-xs text-red-500 font-bold">{`{ / }`}</span>
            <span className="font-industrial text-sm sm:text-base font-bold tracking-tight text-white group-hover:text-teal-400 transition-colors">
              AIT_CEAR
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-5 text-xs font-mono">
            {navLinks.map((link) => {
              const targetId = link.href.replace("#", "");
              const isActive = activeSection === targetId;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`transition-colors py-1 ${
                    isActive
                      ? "text-teal-400 font-bold border-b-2 border-teal-400"
                      : "text-zinc-300 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Wartech Subpage Link (Kept aside cleanly) */}
          <div className="hidden sm:flex items-center gap-2">
            <Link
              href="/wartech"
              className="text-[11px] font-mono font-bold text-zinc-300 hover:text-white bg-zinc-800/80 hover:bg-zinc-800 px-3 py-1.5 rounded-full border border-zinc-700 flex items-center gap-1 transition-colors"
            >
              <span>Wartech Fest</span>
              <ArrowUpRight className="w-3 h-3 text-red-400" />
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-full bg-zinc-800 text-zinc-300 hover:text-white"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-20 z-50 bg-[#111827] text-white border border-zinc-800 rounded-3xl p-6 shadow-2xl md:hidden"
          >
            <div className="flex flex-col gap-3 font-mono text-sm">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 px-3 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-800 flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <span className="text-zinc-500 text-xs">→</span>
                </Link>
              ))}

              <div className="pt-3 border-t border-zinc-800">
                <Link
                  href="/wartech"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 rounded-full text-center text-xs font-bold text-white bg-[#0d5c58] flex items-center justify-center gap-1.5"
                >
                  <span>Wartech 2026 Arena</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-teal-300" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
