import type { Metadata } from "next";
import { Nunito, Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import { SiteContentProvider } from "@/context/SiteContentContext";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cear-ait-website.vercel.app"),
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
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "CEAR | Centre of Excellence for AI & Robotics – AIT Pune",
    description:
      "Autonomous Robotics, Intelligent Control & Hardware Craft. Explore our fleet, leadership cadre, and Wartech 2026.",
    url: "https://cear-ait-website.vercel.app",
    type: "website",
    locale: "en_US",
    siteName: "CEAR AIT",
    images: [
      {
        url: "/cear-logo.png",
        width: 1200,
        height: 630,
        alt: "CEAR - Centre of Excellence for AI & Robotics, AIT Pune",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CEAR | Centre of Excellence for AI & Robotics – AIT Pune",
    description:
      "Autonomous Robotics, Intelligent Control & Hardware Craft. Explore our fleet, leadership cadre, and Wartech 2026.",
    images: ["/cear-logo.png"],
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
        className={`${nunito.variable} ${spaceGrotesk.variable} ${spaceMono.variable} font-body bg-[#fafaf9] text-[#0d1321] antialiased min-h-screen selection:bg-[#dcf836] selection:text-[#0d1321]`}
      >
        <SiteContentProvider>
          {children}
        </SiteContentProvider>
      </body>
    </html>
  );
}
