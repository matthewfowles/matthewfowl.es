import type { Locale } from "./config";

const dictionaries = {
  en: {
    meta: {
      title: "Matt Fowles | Product creator and builder: web, apps and AI",
      description:
        "I design, build and launch websites, mobile and desktop apps, internal tools and AI-powered products for businesses. Fintech and martech background. Based in Albania, working across Continental Europe in English.",
      jobTitle: "Product creator and builder",
      knowsAbout: [
        "Product strategy",
        "Product design",
        "UX and UI design",
        "Web development",
        "Mobile app development",
        "Desktop app development",
        "Internal tools and automation",
        "AI product development",
        "AI agents and workflows",
        "Product launch",
        "Growth",
        "Fintech",
        "Martech",
        "SaaS",
      ],
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
      openGraphLocale: "en_GB",
    },
    locale: {
      label: "Language",
      en: "English",
      sq: "Shqip",
    },
    theme: {
      legend: "Select a display theme:",
      system: "system",
      light: "light",
      dark: "dark",
    },
    home: {
      line1: "I build web, apps, AI, products and tools for businesses.",
      body: "I'm a product creator and builder, with a career spent across finance, marketing and more. I love product (strategy, design, building, launching and growth). Whether web, mobile, desktop or native devices, small or large. I like creating things and solving problems. Let's work together.",
      line2: "Design. Build. Launch.",
      line3: "Based in Continental Europe",
      email: "Email",
      linkedin: "LinkedIn",
      github: "GitHub",
      x: "X",
      instagram: "Instagram",
    },
    notFound: {
      title: "404 - Page Not Found | Matt Fowles",
      heading: "Page Not Found",
      body: "The page you're looking for doesn't exist. Here are some helpful links:",
      home: "Home",
      guide: "AI Agent Guide (llms.txt)",
      sitemap: "Sitemap",
    },
  },
  sq: {
    meta: {
      title: "Matt Fowles | Krijues dhe ndërtues produktesh: web, aplikacione dhe AI",
      description:
        "Dizajnoj, ndërtoj dhe lançoj faqe web, aplikacione celulare dhe desktop, mjete të brendshme dhe produkte me AI për biznese. Sfond në fintech dhe martech. Me bazë në Shqipëri, duke punuar në të gjithë Evropën Kontinentale në anglisht.",
      jobTitle: "Krijues dhe ndërtues produktesh",
      knowsAbout: [
        "Strategji produkti",
        "Dizajn produkti",
        "Dizajn UX dhe UI",
        "Zhvillim web",
        "Zhvillim aplikacionesh celulare",
        "Zhvillim aplikacionesh desktop",
        "Mjete të brendshme dhe automatizim",
        "Zhvillim produktesh me AI",
        "Agjentë AI dhe procese",
        "Lançim produkti",
        "Rritje",
        "Fintech",
        "Martech",
        "SaaS",
      ],
      keywords: [
        "strategji produkti",
        "dizajn produkti",
        "zhvillim web",
        "aplikacione celulare",
        "aplikacione desktop",
        "mjete të brendshme",
        "produkte me AI",
        "fintech",
        "martech",
        "Matt Fowles",
      ],
      openGraphLocale: "sq_AL",
    },
    locale: {
      label: "Gjuha",
      en: "English",
      sq: "Shqip",
    },
    theme: {
      legend: "Zgjidh temën e ekranit:",
      system: "sistemi",
      light: "e ndritshme",
      dark: "e errët",
    },
    home: {
      line1: "Ndërtoj web, aplikacione, AI, produkte dhe mjete për biznese.",
      body: "Jam krijues dhe ndërtues produktesh, me një karrierë në financa, marketing dhe më gjerë. Më pëlqen produkti (strategjia, dizajni, ndërtimi, lançimi dhe rritja). Qoftë web, celular, desktop apo pajisje native, i vogël apo i madh. Më pëlqen të krijoj gjëra dhe të zgjidh probleme. Le të punojmë së bashku.",
      line2: "Dizajno. Ndërto. Lanço.",
      line3: "Me bazë në Evropën Kontinentale",
      email: "Email",
      linkedin: "LinkedIn",
      github: "GitHub",
      x: "X",
      instagram: "Instagram",
    },
    notFound: {
      title: "404 - Faqja nuk u gjet | Matt Fowles",
      heading: "Faqja nuk u gjet",
      body: "Faqja që kërkon nuk ekziston. Ja disa lidhje të dobishme:",
      home: "Ballina",
      guide: "Udhëzues për agjentë AI (llms.txt)",
      sitemap: "Harta e sajtit",
    },
  },
} as const;

export type Dictionary = (typeof dictionaries)[Locale];

export function getDictionary(locale: string): Dictionary {
  if (locale === "sq") return dictionaries.sq;
  return dictionaries.en;
}
