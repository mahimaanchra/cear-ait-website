"use client";

import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-[60] pointer-events-none bg-black/5">
      <motion.div
        className="h-full bg-gradient-to-r from-[#ff6b35] via-[#fa5519] to-[#240d2b] origin-left shadow-[0_0_12px_rgba(255,107,53,0.8)]"
        style={{ scaleX }}
      />
    </div>
  );
}

export default ScrollProgressBar;
