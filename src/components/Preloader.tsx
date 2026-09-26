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
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-paper overflow-hidden"
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
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-paper paper-canvas select-none overflow-hidden"
          role="status"
          aria-live="polite"
          aria-label="Loading"
        >
          {/* Main Container */}
          <div className="flex flex-col items-center justify-center">
            {/* Cute Chibi Robot in Paper & Ink Outline Style */}
            <div className="flex flex-col items-center">
              {/* Gentle Floating Bob & Subtle Head Tilt */}
              <motion.div
                animate={{
                  y: [-5, 5, -5],
                  rotate: [-2, 2, -2],
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
                  className="w-28 h-28 sm:w-32 sm:h-32 drop-shadow-[4px_5px_0_#14140f]"
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
                    fill="#14140f"
                  />
                  <circle cx="80" cy="8" r="5.5" fill="#c0342a" stroke="#14140f" strokeWidth="2" />
                  <circle cx="78.5" cy="6.5" r="1.6" fill="#f8e08a" />

                  {/* 2. Cute Little Ear Pods */}
                  <rect
                    x="26"
                    y="40"
                    width="7"
                    height="20"
                    rx="3.5"
                    fill="#f2c31a"
                    stroke="#14140f"
                    strokeWidth="2.5"
                  />
                  <rect
                    x="127"
                    y="40"
                    width="7"
                    height="20"
                    rx="3.5"
                    fill="#f2c31a"
                    stroke="#14140f"
                    strokeWidth="2.5"
                  />

                  {/* 3. Big Plump Rounded Head */}
                  <rect
                    x="31"
                    y="20"
                    width="98"
                    height="68"
                    rx="26"
                    fill="#ffffff"
                    stroke="#14140f"
                    strokeWidth="3.2"
                  />

                  {/* 4. Rounded Dark Visor Screen */}
                  <rect
                    x="39"
                    y="28"
                    width="82"
                    height="52"
                    rx="18"
                    fill="#14140f"
                  />

                  {/* Visor Specular Glass Arc */}
                  <path
                    d="M 45 36 Q 80 30 115 36 C 109 42 51 42 45 36 Z"
                    fill="#ffffff"
                    fillOpacity="0.12"
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
                      <circle cx="62" cy="52" r="7.5" fill="#f8e08a" />
                      <circle cx="60" cy="50" r="2.8" fill="#ffffff" />
                      <circle cx="64.5" cy="54.5" r="1.2" fill="#ffffff" />
                    </motion.g>

                    {/* Right Eye: Switches between round eye and playful winking arc */}
                    {isWinking ? (
                      <g>
                        <path
                          d="M 91 54 Q 98 46 105 54"
                          fill="none"
                          stroke="#f8e08a"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                        <circle cx="106" cy="46" r="1.8" fill="#f2c31a" />
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
                        <circle cx="98" cy="52" r="7.5" fill="#f8e08a" />
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
                    fill="#c0342a"
                    opacity="0.45"
                  />
                  <ellipse
                    cx="107"
                    cy="61"
                    rx="4.5"
                    ry="2.2"
                    fill="#c0342a"
                    opacity="0.45"
                  />

                  {/* Cute Little Digital Smile */}
                  <path
                    d="M 76 60 Q 80 64 84 60"
                    fill="none"
                    stroke="#f8e08a"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />

                  {/* 6. Neck Joint */}
                  <rect
                    x="73"
                    y="86"
                    width="14"
                    height="6"
                    rx="2"
                    fill="#14140f"
                  />

                  {/* 7. Cute Chubby Body */}
                  <rect
                    x="48"
                    y="90"
                    width="64"
                    height="44"
                    rx="17"
                    fill="#ffffff"
                    stroke="#14140f"
                    strokeWidth="3.2"
                  />

                  {/* Belly Button / Gold Star Badge */}
                  <circle
                    cx="80"
                    cy="111"
                    r="5"
                    fill="#f8e08a"
                    stroke="#14140f"
                    strokeWidth="1.8"
                  />
                  <circle cx="80" cy="111" r="2" fill="#14140f" />

                  {/* 8. Left Arm (Cute Resting) */}
                  <circle cx="45" cy="99" r="4" fill="#14140f" />
                  <path
                    d="M 43 102 Q 35 110 38 120"
                    fill="none"
                    stroke="#14140f"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                  />
                  <circle cx="38" cy="121" r="3.5" fill="#f2c31a" stroke="#14140f" strokeWidth="1.5" />

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
                    <circle cx="115" cy="99" r="4" fill="#14140f" />

                    {/* Arm forearm angled up */}
                    <path
                      d="M 117 99 Q 130 90 132 76"
                      fill="none"
                      stroke="#14140f"
                      strokeWidth="4.5"
                      strokeLinecap="round"
                    />

                    {/* Cute Round Waving Mitten Hand */}
                    <circle cx="132" cy="74" r="5" fill="#f2c31a" stroke="#14140f" strokeWidth="2" />
                  </motion.g>

                  {/* 10. Tiny Chubby Feet */}
                  <rect
                    x="62"
                    y="132"
                    width="11"
                    height="9"
                    rx="4.5"
                    fill="#14140f"
                  />
                  <rect
                    x="87"
                    y="132"
                    width="11"
                    height="9"
                    rx="4.5"
                    fill="#14140f"
                  />
                </svg>
              </motion.div>

              {/* Hard Drop Shadow on Ground */}
              <motion.div
                animate={{
                  scale: [1, 0.85, 1],
                  opacity: [0.35, 0.2, 0.35],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2.2,
                  ease: "easeInOut",
                }}
                className="w-20 h-2 bg-ink rounded-full blur-[0.5px] mt-1"
              />
            </div>

            {/* Tactile Paper Progress Track */}
            <div className="w-36 sm:w-44 h-3.5 bg-white border-2 border-ink rounded-full p-0.5 shadow-[2.5px_2.5px_0_#14140f] overflow-hidden mt-6">
              <div
                className="h-full bg-ink rounded-full transition-all duration-75 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Playful Sticker Badge */}
            <div className="paper-badge bg-coin-y1 text-ink text-[10px] mt-3 py-0.5 px-3 font-tech font-extrabold uppercase tracking-widest shadow-[2px_2px_0_#14140f] -rotate-1">
              INITIALIZING CEAR OS
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Preloader;
