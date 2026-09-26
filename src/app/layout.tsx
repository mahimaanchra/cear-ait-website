import type { Metadata } from "next";
import { Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";
import { SiteContentProvider } from "@/context/SiteContentContext";

const Preloader = dynamic(() => import("@/components/Preloader"), {
  ssr: false,
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CEAR | Centre of Excellence for AI & Robotics – AIT Pune",
  description:
    "Official portal for CEAR (Centre of Excellence for AI & Robotics) at Army Institute of Technology, Pune. Autonomous defense robotics, hardware craft, intelligent control architectures, and Wartech 2026.",
  keywords: [
    "CEAR",
    "Centre of Excellence for AI and Robotics",
    "AIT Pune",
    "Army Institute of Technology",
    "Robotics Club",
    "Autonomous Systems",
    "Wartech 2026",
    "RoboSoccer",
    "RoboRace",
    "Drone Racing",
    "Jalpari",
    "Robotic Arm",
    "Edge AI",
  ],
  authors: [{ name: "CEAR Engineering Cadre, AIT Pune" }],
  openGraph: {
    title: "CEAR | Centre of Excellence for AI & Robotics – AIT Pune",
    description:
      "Autonomous Robotics, Intelligent Control & Hardware Craft. Explore our fleet, leadership cadre, and Wartech 2026.",
    type: "website",
    locale: "en_US",
    siteName: "CEAR AIT",
  },
  icons: {
    icon: [
      { url: "/cear-logo.svg", type: "image/svg+xml" },
      { url: "/cear-logo.png", type: "image/png" },
    ],
    shortcut: "/cear-logo.png",
    apple: "/cear-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${spaceMono.variable} font-sans bg-slate-50 text-slate-900 antialiased min-h-screen selection:bg-blue-600 selection:text-white`}
      >
        <SiteContentProvider>
          <Preloader />
          {children}
        </SiteContentProvider>
      </body>
    </html>
  );
}
