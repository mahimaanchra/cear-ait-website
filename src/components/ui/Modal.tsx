"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, subtitle, children }: ModalProps) {
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

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-ink/65 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 320 }}
            className="relative w-full max-w-2xl bg-white border-[3px] border-ink rounded-[24px_30px_22px_28px_/_30px_22px_28px_24px] p-6 sm:p-8 shadow-[8px_10px_0_#14140f] z-10 max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-6 pb-4 border-b-2 border-ink/10">
              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-ink font-tech">
                  {title}
                </h3>
                {subtitle && (
                  <div className="mt-2">
                    <span className="paper-badge bg-coin-y1 text-ink text-[11px] font-mono py-0.5 px-2">
                      {subtitle}
                    </span>
                  </div>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full border-2 border-ink bg-paper hover:bg-coin-y1 text-ink shadow-[2px_2px_0_#14140f] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_#14140f] transition-all cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>

            {/* Content Body */}
            <div className="relative text-ink font-body">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
