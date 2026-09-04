"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";

export default function Home() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    } else if (savedTheme === "light") {
      setTheme("light");
      document.documentElement.classList.remove("dark");
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 relative">
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="theme-toggle"
        >
          <div className={`theme-toggle-slider ${theme === "dark" ? "dark" : ""}`}>
            {theme === "dark" ? (
              <MoonIcon />
            ) : (
              <SunIcon />
            )}
          </div>
        </button>
      </div>

      <div className="flex flex-col items-center justify-center max-w-2xl w-full space-y-8">
        <div className="flex flex-col items-center space-y-4">
          <Image
            src="/avatar.png"
            alt="Matt Fowles"
            width={210}
            height={210}
            priority
            className="rounded-full"
          />
          
          <h1 className="text-[40px] md:text-[56px] font-medium tracking-[4px] leading-8 md:leading-[4rem] mb-2">
            Matt Fowles
          </h1>
          
          <div className="space-y-2 text-center">
            <h2 className="text-[20px] md:text-[28px] font-light tracking-[2px]">
              Building Production AI Agents
            </h2>
            <h2 className="text-[20px] md:text-[28px] font-light tracking-[2px]">
              Autonomous Systems That Ship Real Value
            </h2>
            <h2 className="text-[20px] md:text-[28px] font-light tracking-[2px]">
              <a 
                href="https://flumin.io" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline hover:opacity-80 transition-opacity"
              >
                Flumin
              </a>
              {" "}→ Legal-Tech Platform Removing Admin via AI
            </h2>
            <h2 className="text-[20px] md:text-[28px] font-light tracking-[2px]">
              Remote Europe 🌍
            </h2>
          </div>
        </div>

        <nav className="flex flex-wrap items-center justify-center pt-4">
          <a
            href="mailto:matt@matthewfowles.io"
            className="social-link"
            aria-label="email"
          >
            Email
          </a>
          <a
            href="https://www.linkedin.com/in/matt-fowles"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            aria-label="LinkedIn"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/matthewfowles"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            aria-label="GitHub"
          >
            Github
          </a>
          <a
            href="https://x.com/matthewfowles"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            aria-label="X"
          >
            X
          </a>
          <a
            href="https://www.instagram.com/mattfowlesnomad/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            aria-label="Instagram"
          >
            Instagram
          </a>
        </nav>
      </div>
    </main>
  );
}
