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
        industrial: {
          teal: "#0d5c58",
          "teal-dark": "#073a37",
          red: "#dc2626",
          black: "#111827",
          canvas: "#f9f9f8",
        },
        teal: {
          industrial: "#0d5c58",
          dark: "#073a37",
          400: "#2dd4bf",
          500: "#14b8a6",
          600: "#0d9488",
          700: "#0f766e",
          800: "#0d5c58",
          900: "#073a37",
        },
        red: {
          industrial: "#dc2626",
          600: "#dc2626",
          700: "#b91c1c",
        },
      },
      fontFamily: {
        industrial: ["Space Grotesk", "-apple-system", "sans-serif"],
        display: ["Space Grotesk", "-apple-system", "sans-serif"],
        syne: ["Syne", "sans-serif"],
        mono: ["Space Mono", "JetBrains Mono", "monospace"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "window": "0 4px 20px -2px rgba(0, 0, 0, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.03)",
        "pill": "0 2px 8px rgba(13, 92, 88, 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
