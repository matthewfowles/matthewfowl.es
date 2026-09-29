import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Matt Fowles",
    short_name: "Matt Fowles",
    description:
      "I design, build and launch websites, mobile and desktop apps, internal tools and AI-powered products for businesses. Fintech and martech background. Based in Albania, working across Continental Europe in English.",
    id: "/",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    lang: "en",
    icons: [
      {
        src: "/icon/light",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon/dark",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
