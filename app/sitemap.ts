import { MetadataRoute } from "next";
import { localePath, locales } from "@/i18n/config";

const paths = ["/"];

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `https://mattfowl.es${localePath(locale, path)}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : 0.6,
      alternates: {
        languages: {
          en: `https://mattfowl.es${localePath("en", path)}`,
          sq: `https://mattfowl.es${localePath("sq", path)}`,
          "x-default": `https://mattfowl.es${localePath("en", path)}`,
        },
      },
    })),
  );
}
