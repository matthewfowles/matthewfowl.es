import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Matt Fowles",
  description: "Product engineer building AI-powered applications",
  keywords: ["AI engineering", "product engineering", "agentic systems", "autonomous applications"],
  authors: [{ name: "Matt Fowles", url: "https://mattfowl.es" }],
  openGraph: {
    title: "Matt Fowles",
    description: "AI-assisted product engineer shipping production apps with autonomous systems",
    url: "https://mattfowl.es",
    siteName: "Matt Fowles",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Matt Fowles",
    description: "AI-assisted product engineer shipping production apps with autonomous systems",
    creator: "@matthewfowles",
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Teko:wght@300;400;500&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
