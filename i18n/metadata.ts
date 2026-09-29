import type { Metadata } from "next";
import { localePath, type Locale } from "./config";

export function pageMetadata(
  locale: Locale,
  path: string,
  title: string,
  description: string,
  keywords: readonly string[],
): Metadata {
  return {
    title,
    description,
    keywords: [...keywords],
    alternates: {
      canonical: localePath(locale, path),
      languages: {
        en: localePath("en", path),
        sq: localePath("sq", path),
        "x-default": localePath("en", path),
      },
    },
    openGraph: {
      title,
      description,
      url: `https://mattfowl.es${localePath(locale, path)}`,
      type: "profile",
      locale: locale === "sq" ? "sq_AL" : "en_GB",
      alternateLocale: locale === "sq" ? ["en_GB"] : ["sq_AL"],
      firstName: "Matt",
      lastName: "Fowles",
      images: [
        { url: "/og.png", width: 1200, height: 630, alt: "Matt Fowles" },
        { url: "/og-dark.png", width: 1200, height: 630, alt: "Matt Fowles" },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@matthewfowles",
      images: ["/og.png", "/og-dark.png"],
    },
  };
}
