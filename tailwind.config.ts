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
        // Dark Sci-Fi Autonomous Theme Tokens (Aliased to seamlessly transition existing components)
        paper: {
          DEFAULT: "#060911", // Deep obsidian background
          card: "#0d1424",    // Translucent dark glass
          subtle: "#111a2e",  // Elevated dark surface
          muted: "#17233d",   // Border/divider tone
        },
        ink: {
          DEFAULT: "#f1f5f9", // Crisp bright slate/white
          pure: "#ffffff",
          soft: "#cbd5e1",
          muted: "#94a3b8",
          border: "rgba(56, 189, 248, 0.22)", // Subtle cyan tech border
        },
        // Neon Telemetry & Alert Accents
        alarm: {
          DEFAULT: "#ff3366", // Combat Crimson
          hover: "#e62e5c",
          light: "rgba(255, 51, 102, 0.15)",
        },
        cyber: {
          void: "#04060a",
          bg: "#060911",
          surface: "#0a0f1d",
          card: "#0e1628",
          cardHover: "#142038",
          border: "rgba(56, 189, 248, 0.18)",
          cyan: "#00f0ff",
          cyanGlow: "rgba(0, 240, 255, 0.35)",
          emerald: "#00ff9d",
          emeraldGlow: "rgba(0, 255, 157, 0.3)",
          crimson: "#ff3366",
          amber: "#f59e0b",
          purple: "#a855f7",
        },
        follow: {
          DEFAULT: "#00f0ff",
          light: "#38bdf8",
          soft: "rgba(56, 189, 248, 0.15)",
        },
        coin: {
          y1: "#f59e0b",
          y2: "#fbbf24",
          y3: "#d97706",
        },
        brand: {
          50: "#0b1329",
          100: "#101d3f",
          200: "#172a5c",
          300: "#1e3779",
          400: "#2563eb",
          500: "#38bdf8",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
        },
        logo: {
          navy: "#f1f5f9",
          dark: "#060911",
          surface: "#0e1628",
          blue: "#00f0ff",
        },
        accent: {
          green: "#00ff9d",
          yellow: "#f59e0b",
          red: "#ff3366",
          emerald: "#10b981",
          amber: "#f59e0b",
        },
        tech: {
          canvas: "#060911",
          dark: "#f1f5f9",
          card: "#0d1424",
          border: "rgba(56, 189, 248, 0.22)",
          muted: "#94a3b8",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "system-ui", "-apple-system", "sans-serif"],
        cartoon: ["'Space Grotesk'", "system-ui", "sans-serif"],
        body: ["'Space Grotesk'", "'Inter'", "system-ui", "sans-serif"],
        tech: ["'Space Grotesk'", "system-ui", "sans-serif"],
        mono: ["'Space Mono'", "'JetBrains Mono'", "monospace"],
        sans: ["'Space Grotesk'", "'Inter'", "system-ui", "sans-serif"],
      },
      animation: {
        "marquee": "marquee 26s linear infinite",
        "marquee-fast": "marquee 16s linear infinite",
        "pulse-subtle": "pulseSubtle 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "bob": "bob 2.8s ease-in-out infinite",
        "laser-sweep": "laserSweep 4s ease-in-out infinite",
        "radar-spin": "radarSpin 6s linear infinite",
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
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
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-4px)" },
        },
        laserSweep: {
          "0%": { top: "0%", opacity: "0.8" },
          "50%": { top: "100%", opacity: "0.4" },
          "100%": { top: "0%", opacity: "0.8" },
        },
        radarSpin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        glowPulse: {
          "0%, 100%": { filter: "drop-shadow(0 0 8px rgba(0, 240, 255, 0.4))" },
          "50%": { filter: "drop-shadow(0 0 16px rgba(0, 240, 255, 0.7))" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
