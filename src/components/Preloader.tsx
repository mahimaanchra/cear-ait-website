"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  /** Display time in milliseconds (default: 1800ms) */
  duration?: number;
  /** Optional callback fired when preloader finishes exit animation */
  onComplete?: () => void;
}

export function Preloader({ duration = 1800, onComplete }: PreloaderProps) {
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isWinking, setIsWinking] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Prevent background scrolling while preloader is active
    document.body.classList.add("overflow-hidden");
    document.documentElement.classList.add("overflow-hidden");
    const originalBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Playful wink gestures during loading intro
    const winkTimer1 = setTimeout(() => {
      setIsWinking(true);
      setTimeout(() => setIsWinking(false), 550);
    }, 600);

    const winkTimer2 = setTimeout(() => {
      setIsWinking(true);
      setTimeout(() => setIsWinking(false), 550);
    }, 1300);

    // Smooth line progress over duration
    const startTime = performance.now();
    let animationFrameId: number;

    const updateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const rawProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(rawProgress);

      if (elapsed < duration) {
        animationFrameId = requestAnimationFrame(updateProgress);
      } else {
        setProgress(100);
        setTimeout(() => {
          setIsLoading(false);
        }, 180);
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    return () => {
      clearTimeout(winkTimer1);
      clearTimeout(winkTimer2);
      cancelAnimationFrame(animationFrameId);
      document.body.classList.remove("overflow-hidden");
      document.documentElement.classList.remove("overflow-hidden");
      document.body.style.overflow = originalBodyOverflow;
    };
  }, [duration]);

  const handleAnimationComplete = () => {
    document.body.classList.remove("overflow-hidden");
    document.documentElement.classList.remove("overflow-hidden");
    document.body.style.overflow = "";
    if (onComplete) {
      onComplete();
    }
  };

  if (!mounted) {
    return (
      <div
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white overflow-hidden"
        role="status"
        aria-label="Loading"
      />
    );
  }

  return (
    <AnimatePresence onExitComplete={handleAnimationComplete}>
      {isLoading && (
        <motion.div
          key="cear-preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white select-none overflow-hidden"
          role="status"
          aria-live="polite"
          aria-label="Loading"
        >
          {/* Main Container */}
          <div className="flex flex-col items-center justify-center">
            {/* Cute Chibi Robot */}
            <div className="flex flex-col items-center">
              {/* Gentle Floating Bob & Subtle Head Tilt */}
              <motion.div
                animate={{
                  y: [-4, 4, -4],
                  rotate: [-1.5, 1.5, -1.5],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2.2,
                  ease: "easeInOut",
                }}
                className="relative"
              >
                <svg
                  viewBox="0 0 160 160"
                  className="w-28 h-28 sm:w-32 sm:h-32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* 1. Antenna */}
                  <rect
                    x="78"
                    y="10"
                    width="4"
                    height="12"
                    rx="2"
                    fill="#94a3b8"
                  />
                  <circle cx="80" cy="8" r="5" fill="#2563eb" />
                  <circle cx="78.5" cy="6.5" r="1.6" fill="#93c5fd" />

                  {/* 2. Cute Little Ear Pods */}
                  <rect
                    x="27"
                    y="40"
                    width="6"
                    height="20"
                    rx="3"
                    fill="#2563eb"
                  />
                  <rect
                    x="127"
                    y="40"
                    width="6"
                    height="20"
                    rx="3"
                    fill="#2563eb"
                  />

                  {/* 3. Big Plump Rounded Head (Chibi style) */}
                  <rect
                    x="31"
                    y="20"
                    width="98"
                    height="68"
                    rx="26"
                    fill="#ffffff"
                    stroke="#e2e8f0"
                    strokeWidth="2.5"
                  />

                  {/* 4. Rounded Dark Visor Screen */}
                  <rect
                    x="39"
                    y="28"
                    width="82"
                    height="52"
                    rx="18"
                    fill="#0f172a"
                  />

                  {/* Visor Specular Glass Arc */}
                  <path
                    d="M 45 36 Q 80 30 115 36 C 109 42 51 42 45 36 Z"
                    fill="#ffffff"
                    fillOpacity="0.09"
                  />

                  {/* 5. Big Expressive Anime-style Eyes */}
                  <g>
                    {/* Left Eye */}
                    <motion.g
                      animate={{
                        scaleY: [1, 1, 0.1, 1, 1],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 3.2,
                        times: [0, 0.88, 0.92, 0.96, 1],
                      }}
                      style={{ transformOrigin: "62px 52px" }}
                    >
                      <circle cx="62" cy="52" r="7.5" fill="#38bdf8" />
                      <circle cx="60" cy="50" r="2.8" fill="#ffffff" />
                      <circle cx="64.5" cy="54.5" r="1.2" fill="#ffffff" />
                    </motion.g>

                    {/* Right Eye: Switches between round eye and playful winking arc */}
                    {isWinking ? (
                      <g>
                        <path
                          d="M 91 54 Q 98 46 105 54"
                          fill="none"
                          stroke="#38bdf8"
                          strokeWidth="2.8"
                          strokeLinecap="round"
                        />
                        {/* Tiny playful sparkle */}
                        <circle cx="106" cy="46" r="1.5" fill="#93c5fd" />
                      </g>
                    ) : (
                      <motion.g
                        animate={{
                          scaleY: [1, 1, 0.1, 1, 1],
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 3.2,
                          times: [0, 0.88, 0.92, 0.96, 1],
                        }}
                        style={{ transformOrigin: "98px 52px" }}
                      >
                        <circle cx="98" cy="52" r="7.5" fill="#38bdf8" />
                        <circle cx="96" cy="50" r="2.8" fill="#ffffff" />
                        <circle cx="100.5" cy="54.5" r="1.2" fill="#ffffff" />
                      </motion.g>
                    )}
                  </g>

                  {/* Cute Soft Cheek Blush */}
                  <ellipse
                    cx="53"
                    cy="61"
                    rx="4.5"
                    ry="2.2"
                    fill="#f472b6"
                    opacity="0.35"
                  />
                  <ellipse
                    cx="107"
                    cy="61"
                    rx="4.5"
                    ry="2.2"
                    fill="#f472b6"
                    opacity="0.35"
                  />

                  {/* Cute Little Digital Smile */}
                  <path
                    d="M 76 60 Q 80 64 84 60"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />

                  {/* 6. Neck Joint */}
                  <rect
                    x="74"
                    y="86"
                    width="12"
                    height="6"
                    rx="2"
                    fill="#64748b"
                  />

                  {/* 7. Cute Chubby Body */}
                  <rect
                    x="48"
                    y="90"
                    width="64"
                    height="44"
                    rx="17"
                    fill="#ffffff"
                    stroke="#e2e8f0"
                    strokeWidth="2.5"
                  />

                  {/* Belly Button / Blue Heart Badge */}
                  <circle
                    cx="80"
                    cy="111"
                    r="5"
                    fill="#eff6ff"
                    stroke="#bfdbfe"
                    strokeWidth="1.5"
                  />
                  <circle cx="80" cy="111" r="2.2" fill="#2563eb" />

                  {/* 8. Left Arm (Cute Resting) */}
                  <circle cx="45" cy="99" r="4" fill="#94a3b8" />
                  <path
                    d="M 43 102 Q 35 110 38 120"
                    fill="none"
                    stroke="#cbd5e1"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                  <circle cx="38" cy="121" r="3.2" fill="#2563eb" />

                  {/* 9. Right Arm (Cute Enthusiastic Waving Arm!) */}
                  <motion.g
                    animate={{
                      rotate: [-20, 22, -20],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.7,
                      ease: "easeInOut",
                    }}
                    style={{
                      transformOrigin: "115px 99px",
                    }}
                  >
                    {/* Shoulder */}
                    <circle cx="115" cy="99" r="4" fill="#94a3b8" />

                    {/* Arm forearm angled up */}
                    <path
                      d="M 117 99 Q 130 90 132 76"
                      fill="none"
                      stroke="#cbd5e1"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />

                    {/* Cute Round Waving Mitten Hand */}
                    <circle cx="132" cy="74" r="4.5" fill="#2563eb" />
                    <circle cx="129" cy="70" r="2" fill="#3b82f6" />
                    <circle cx="134" cy="70" r="2" fill="#3b82f6" />
                  </motion.g>

                  {/* 10. Tiny Chubby Feet */}
                  <rect
                    x="62"
                    y="132"
                    width="11"
                    height="9"
                    rx="4.5"
                    fill="#64748b"
                  />
                  <rect
                    x="87"
                    y="132"
                    width="11"
                    height="9"
                    rx="4.5"
                    fill="#64748b"
                  />
                </svg>
              </motion.div>

              {/* Soft Ground Shadow */}
              <motion.div
                animate={{
                  scale: [1, 0.85, 1],
                  opacity: [0.25, 0.15, 0.25],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2.2,
                  ease: "easeInOut",
                }}
                className="w-18 h-1.5 bg-slate-300/70 rounded-full blur-[1px] mt-0.5"
              />
            </div>

            {/* Clean Minimal Progress Line */}
            <div className="w-28 sm:w-32 h-1 bg-slate-100 rounded-full overflow-hidden mt-6">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-75 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Preloader;
