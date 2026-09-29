import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { HexagonBackground } from "@/components/hexagon-background";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { ThemeProvider } from "@/components/theme-provider";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#454545" },
  ],
};

export const metadata: Metadata = {
  title: "Matt Fowles | Product creator and builder: web, apps and AI",
  description:
    "I design, build and launch websites, mobile and desktop apps, internal tools and AI-powered products for businesses. Fintech and martech background. Based in Albania, working across Continental Europe in English.",
  keywords: [
    "product strategy",
    "product design",
    "web development",
    "mobile apps",
    "desktop apps",
    "internal tools",
    "AI products",
    "fintech",
    "martech",
    "Matt Fowles",
  ],
  authors: [{ name: "Matt Fowles", url: "https://mattfowl.es" }],
  metadataBase: new URL("https://mattfowl.es"),
  openGraph: {
    title: "Matt Fowles | Product creator and builder: web, apps and AI",
    description:
      "I design, build and launch websites, mobile and desktop apps, internal tools and AI-powered products for businesses. Fintech and martech background. Based in Albania, working across Continental Europe in English.",
    url: "https://mattfowl.es",
    siteName: "Matt Fowles",
    type: "profile",
    locale: "en_GB",
    firstName: "Matt",
    lastName: "Fowles",
    images: [
      { url: "/og.png", width: 1200, height: 630, alt: "Matt Fowles" },
      { url: "/og-dark.png", width: 1200, height: 630, alt: "Matt Fowles" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Matt Fowles | Product creator and builder: web, apps and AI",
    description:
      "I design, build and launch websites, mobile and desktop apps, internal tools and AI-powered products for businesses. Fintech and martech background. Based in Albania, working across Continental Europe in English.",
    creator: "@matthewfowles",
    images: ["/og.png", "/og-dark.png"],
  },
  icons: {
    icon: [
      { url: "/icon/light", type: "image/png", media: "(prefers-color-scheme: light)" },
      { url: "/icon/dark", type: "image/png", media: "(prefers-color-scheme: dark)" },
    ],
    apple: [
      { url: "/icon/light", media: "(prefers-color-scheme: light)" },
      { url: "/icon/dark", media: "(prefers-color-scheme: dark)" },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerList = await headers();
  const localeHeader = headerList.get("x-locale");
  const locale: Locale = localeHeader && isLocale(localeHeader) ? localeHeader : defaultLocale;
  const pathname = headerList.get("x-pathname") || "/";
  const t = getDictionary(locale);

  return (
    <html lang={locale} className={geist.variable} suppressHydrationWarning>
      <head>
        <link rel="alternate" type="text/plain" href="/llms.txt" title="llms.txt" />
        <meta property="og:image" content="https://mattfowl.es/og.png" media="(prefers-color-scheme: light)" />
        <meta property="og:image" content="https://mattfowl.es/og-dark.png" media="(prefers-color-scheme: dark)" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Teko:wght@300;400;500&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "@id": "https://mattfowl.es/#person",
              "name": "Matt Fowles",
              "givenName": "Matt",
              "familyName": "Fowles",
              "url": "https://mattfowl.es",
              "image": "https://mattfowl.es/avatar.png",
              "email": "matt@matthewfowles.io",
              "jobTitle": t.meta.jobTitle,
              "description": t.meta.description,
              "knowsAbout": t.meta.knowsAbout,
              "knowsLanguage": ["en"],
              "homeLocation": {
                "@type": "Place",
                "name": "Albania"
              },
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "AL"
              },
              "areaServed": [
                {
                  "@type": "Place",
                  "name": "Europe"
                }
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "New projects",
                "email": "matt@matthewfowles.io",
                "url": "https://mattfowl.es/api/contact",
                "availableLanguage": ["English"]
              },
              "sameAs": [
                "https://www.linkedin.com/in/matt-fowles",
                "https://x.com/matthewfowles",
                "https://github.com/matthewfowles",
                "https://www.instagram.com/mattfowlesnomad/"
              ]
            }).replace(/</g, "\\u003c")
          }}
        />
      </head>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var stored=localStorage.getItem("theme");if(stored!=="light"&&stored!=="dark")return;var href=stored==="dark"?"/icon/dark":"/icon/light";document.querySelectorAll('link[rel="icon"],link[rel="apple-touch-icon"]').forEach(function(link){link.href=href;link.removeAttribute("media")})}catch(e){}})();`,
          }}
        />
        <ThemeProvider>
          <HexagonBackground />
          <div className="relative z-10">
            <div className="absolute top-4 left-4 z-20">
              <LocaleSwitcher
                locale={locale}
                pathname={pathname}
                label={t.locale.label}
                english={t.locale.en}
                albanian={t.locale.sq}
              />
            </div>
            {children}
          </div>
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
