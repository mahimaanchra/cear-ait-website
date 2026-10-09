"use client";

import React, { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  badge?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  children: React.ReactNode;
  footerActions?: React.ReactNode;
  className?: string;
}

const sizeClasses: Record<NonNullable<ModalProps["size"]>, string> = {
  sm: "max-w-md",
  md: "max-w-xl",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
  full: "max-w-6xl",
};

export function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  badge,
  size = "lg",
  children,
  footerActions,
  className = "",
}: ModalProps) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle ESC key press
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#240d2b]/80 backdrop-blur-xl overflow-y-auto"
        >
          {/* Backdrop Click */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className={`relative z-10 w-full ${sizeClasses[size]} bg-white/95 backdrop-blur-2xl border border-white/90 rounded-[32px] p-6 sm:p-9 shadow-[0_30px_90px_rgba(36,13,43,0.3)] my-8 overflow-hidden max-h-[90vh] flex flex-col justify-between ${className}`}
          >
            {/* Top Specular Inner Bevel Highlight */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />

            {/* Ambient Corner Accent */}
            <div className="pointer-events-none absolute -top-20 -right-20 w-44 h-44 rounded-full bg-[#ff6b35]/10 blur-2xl" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full text-[#240d2b]/50 hover:text-[#240d2b] hover:bg-black/[0.05] transition-all cursor-pointer z-20 hover:scale-105 active:scale-95"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="mb-6 pb-4 border-b border-[#240d2b]/[0.08] relative z-10 pr-10">
              {badge && (
                <div className="mb-2">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#ff6b35] font-semibold bg-[#ff6b35]/10 px-3 py-1 rounded-full border border-[#ff6b35]/20">
                    {badge}
                  </span>
                </div>
              )}
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-[#240d2b] tracking-tight">
                {title}
              </h3>
              {subtitle && (
                <p className="text-xs sm:text-sm text-[#240d2b]/65 font-body mt-1">
                  {subtitle}
                </p>
              )}
            </div>

            {/* Modal Body */}
            <div className="relative z-10 overflow-y-auto pr-1 space-y-4 text-xs font-body text-[#240d2b]/80 leading-relaxed max-h-[calc(90vh-210px)]">
              {children}
            </div>

            {/* Footer Actions (Optional) */}
            {footerActions && (
              <div className="relative z-10 pt-5 mt-6 border-t border-[#240d2b]/[0.08] flex items-center justify-between">
                {footerActions}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default Modal;
