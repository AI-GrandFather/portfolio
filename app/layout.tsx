import type { Metadata } from "next";
import { Outfit, Work_Sans } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Athar | AI Strategy & Product Engineering",
  description:
    "Athar: Bridging the gap between complex AI and business ROI. Specialized in AI Agents, MCP Servers, and scalable software architecture.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${workSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
