import type { Metadata } from "next";
import { Inter, Space_Mono } from "next/font/google";
import "./globals.css";

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
    "Centre of Excellence for AI and Robotics (CEAR) at Army Institute of Technology, Pune. Innovation through development, tactical defense robotics, and autonomous systems.",
  keywords: [
    "CEAR",
    "Centre of Excellence for AI and Robotics",
    "AIT Pune",
    "Army Institute of Technology",
    "Robotics Club",
    "Autonomous Systems",
    "Jalpari",
    "Robotic Arm",
    "AI",
  ],
  authors: [{ name: "CEAR Team, AIT Pune" }],
  openGraph: {
    title: "CEAR | Centre of Excellence for AI & Robotics",
    description:
      "INNOVATION THROUGH DEVELOPMENT_. Discover pioneering robotics research and autonomous systems at AIT Pune.",
    type: "website",
    locale: "en_US",
    siteName: "CEAR AIT",
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
        className={`${inter.variable} ${spaceMono.variable} font-sans bg-[#f9f9f8] text-[#111827] antialiased min-h-screen selection:bg-[#0d5c58] selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
