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
        brand: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb", // Primary tech-blue
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
        accent: {
          green: "#10b981",
          yellow: "#f59e0b",
          red: "#ef4444",
          emerald: "#059669",
          amber: "#d97706",
        },
        tech: {
          canvas: "#f8fafc",
          dark: "#0f172a",
          card: "#ffffff",
          border: "#e2e8f0",
          muted: "#64748b",
        },
      },
      fontFamily: {
        tech: ["Space Grotesk", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        display: ["Space Grotesk", "-apple-system", "sans-serif"],
        mono: ["Space Mono", "JetBrains Mono", "monospace"],
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      animation: {
        "marquee": "marquee 28s linear infinite",
        "marquee-fast": "marquee 16s linear infinite",
        "pulse-subtle": "pulseSubtle 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
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
      },
      boxShadow: {
        "tech": "0 1px 3px 0 rgba(15, 23, 42, 0.05), 0 1px 2px -1px rgba(15, 23, 42, 0.05)",
        "tech-hover": "0 10px 25px -5px rgba(37, 99, 235, 0.1), 0 8px 10px -6px rgba(15, 23, 42, 0.05)",
        "tech-card": "0 4px 20px -2px rgba(15, 23, 42, 0.06)",
        "glow-blue": "0 0 20px -3px rgba(37, 99, 235, 0.35)",
        "glow-green": "0 0 20px -3px rgba(16, 185, 129, 0.35)",
        "glow-red": "0 0 20px -3px rgba(239, 68, 68, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
