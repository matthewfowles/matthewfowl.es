import React, { createContext, useContext, useEffect, useState } from "react";
import { darkTheme } from "../styles/themes/darkTheme";

type Theme = { theme: "dark" | "light"; toggle: () => void };
const isBrowser = typeof window !== "undefined";

export const ThemeContext = createContext<Theme>({
  theme:
    isBrowser && window.document.body.classList.contains("dark-theme")
      ? "dark"
      : "light",
  toggle: () => null,
});

export default function ThemeContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<"light" | "dark">(
    isBrowser && window.document.body.classList.contains("dark-theme")
      ? "dark"
      : "light"
  );

  useEffect(() => {
    if (!isBrowser) {
      return;
    }
    const setting = window.localStorage.getItem("theme");
    if (setting) {
      if (setting === "dark") {
        window.document.body.classList.add(darkTheme);
      }
    } else {
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        window.document.body.classList.add(darkTheme);
      }
    }
  }, []);

  const toggle = () => {
    if (!isBrowser) {
      return;
    }
    if (window.document.body.classList.contains("dark-theme")) {
      window.document.body.classList.remove("dark-theme");
      window.localStorage.setItem("theme", "light");
      setTheme("light");
    } else {
      window.document.body.classList.add(darkTheme);
      window.localStorage.setItem("theme", "dark");
      setTheme("dark");
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  return context.theme;
}

export function useToggleTheme() {
  const context = useContext(ThemeContext);
  return context.toggle;
}
