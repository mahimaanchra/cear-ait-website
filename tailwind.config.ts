import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: "#f4f3ef",
          card: "#ffffff",
          subtle: "#eae8e1",
          muted: "#dfddd6",
        },
        ink: {
          DEFAULT: "#14140f",
          pure: "#000000",
          soft: "#26261f",
          muted: "#5a5a50",
          border: "#14140f",
        },
        alarm: {
          DEFAULT: "#c0342a",
          hover: "#a32920",
          light: "#fee2e2",
        },
        follow: {
          DEFAULT: "#2b5a9b",
          light: "#9abeef",
          soft: "#dbeafe",
        },
        coin: {
          y1: "#f8e08a",
          y2: "#f2c31a",
          y3: "#c98f06",
        },
        brand: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
        logo: {
          navy: "#14140f",
          dark: "#0a0a07",
          surface: "#1f1f1a",
          blue: "#2b5a9b",
        },
        accent: {
          green: "#10b981",
          yellow: "#f2c31a",
          red: "#c0342a",
          emerald: "#059669",
          amber: "#c98f06",
        },
        tech: {
          canvas: "#f4f3ef",
          dark: "#14140f",
          card: "#ffffff",
          border: "#14140f",
          muted: "#5a5a50",
        },
      },
      fontFamily: {
        display: ["'Luckiest Guy'", "'Space Grotesk'", "ui-rounded", "sans-serif"],
        cartoon: ["'Luckiest Guy'", "'Space Grotesk'", "sans-serif"],
        body: ["'Nunito'", "'Space Grotesk'", "system-ui", "sans-serif"],
        tech: ["'Space Grotesk'", "'Nunito'", "sans-serif"],
        mono: ["'Space Mono'", "'JetBrains Mono'", "monospace"],
        sans: ["'Nunito'", "'Inter'", "system-ui", "sans-serif"],
      },
      animation: {
        "marquee": "marquee 26s linear infinite",
        "marquee-fast": "marquee 16s linear infinite",
        "pulse-subtle": "pulseSubtle 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "bob": "bob 2.8s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
        bob: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-4px) rotate(0.5deg)" },
        },
      },
      boxShadow: {
        "sticker-xs": "2px 2px 0 #14140f",
        "sticker-sm": "3px 3px 0 #14140f",
        "sticker": "4px 5px 0 #14140f",
        "sticker-lg": "5px 6px 0 #14140f",
        "sticker-xl": "7px 8px 0 #14140f",
        "sticker-alarm": "4px 5px 0 #c0342a",
        "sticker-follow": "4px 5px 0 #2b5a9b",
      },
    },
  },
  plugins: [],
};

export default config;
