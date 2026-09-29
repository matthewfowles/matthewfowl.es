"use client";

import { useEffect } from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";

function ThemeFavicon() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (resolvedTheme !== "light" && resolvedTheme !== "dark") return;
    const href = resolvedTheme === "dark" ? "/icon/dark" : "/icon/light";

    const apply = () => {
      document.querySelectorAll<HTMLLinkElement>('link[rel="icon"], link[rel="apple-touch-icon"]').forEach((link) => {
        if (link.getAttribute("href") === href && !link.hasAttribute("media")) return;
        link.setAttribute("href", href);
        link.removeAttribute("media");
      });
    };

    apply();
    const observer = new MutationObserver(apply);
    observer.observe(document.head, { childList: true, subtree: true, attributes: true, attributeFilter: ["href", "media"] });
    return () => observer.disconnect();
  }, [resolvedTheme]);

  return null;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.documentElement.style.colorScheme = "";
  }, []);

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      enableColorScheme={false}
      storageKey="theme"
    >
      <ThemeFavicon />
      {children}
    </NextThemesProvider>
  );
}
