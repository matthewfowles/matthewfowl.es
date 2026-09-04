import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Matt Fowles",
  description: "AI-powered product engineer shipping agentic applications",
  keywords: ["AI engineering", "product engineering", "agentic systems", "autonomous applications"],
  authors: [{ name: "Matt Fowles", url: "https://mattfowl.es" }],
  metadataBase: new URL("https://mattfowl.es"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Matt Fowles",
    description: "AI-powered product engineer shipping agentic applications",
    url: "https://mattfowl.es",
    siteName: "Matt Fowles",
    locale: "en_US",
    type: "profile",
    images: [
      {
        url: "/avatar.png",
        width: 210,
        height: 210,
        alt: "Matt Fowles",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Matt Fowles",
    description: "AI-powered product engineer shipping agentic applications",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Matt Fowles",
              "url": "https://mattfowl.es",
              "email": "matt@matthewfowles.io",
              "jobTitle": "AI-Powered Product Engineer",
              "description": "Product engineer specializing in agentic applications and autonomous systems",
              "knowsAbout": ["AI Engineering", "Product Engineering", "Agentic Systems", "Autonomous Applications"],
              "sameAs": [
                "https://www.linkedin.com/in/matt-fowles",
                "https://github.com/matthewfowles",
                "https://x.com/matthewfowles",
                "https://www.instagram.com/mattfowlesnomad/"
              ],
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "AL",
                "addressRegion": "Europe"
              }
            })
          }}
        />
      </head>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
