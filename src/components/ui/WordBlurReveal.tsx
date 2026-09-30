"use client";

import React from "react";
import { motion } from "framer-motion";

interface WordBlurRevealProps {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  highlightWords?: string[];
  highlightClassName?: string;
}

export function WordBlurReveal({
  text,
  className = "",
  wordClassName = "",
  delay = 0,
  highlightWords = [],
  highlightClassName = "text-[#0d1321] underline decoration-[#d4f933] decoration-wavy decoration-2 underline-offset-4",
}: WordBlurRevealProps) {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: delay },
    }),
  };

  const child = {
    hidden: {
      opacity: 0,
      filter: "blur(18px)",
      y: 8,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 18,
        stiffness: 120,
      },
    },
  };

  return (
    <motion.span
      className={`inline-block flex-wrap ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
    >
      {words.map((word, index) => {
        const cleanWord = word.replace(/[^\w]/g, "");
        const isHighlight = highlightWords.some(
          (hw) => hw.toLowerCase() === cleanWord.toLowerCase()
        );

        return (
          <motion.span
            key={index}
            variants={child}
            className={`inline-block mr-[0.25em] ${wordClassName} ${
              isHighlight ? highlightClassName : ""
            }`}
          >
            {word}
          </motion.span>
        );
      })}
    </motion.span>
  );
}

export default WordBlurReveal;
