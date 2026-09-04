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
      <button
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        {theme === "dark" ? (
          <MoonIcon className="w-6 h-6" />
        ) : (
          <SunIcon className="w-6 h-6" />
        )}
      </button>

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
          
          <h1 className="text-4xl font-bold text-center">Matt Fowles</h1>
          
          <div className="space-y-2 text-center">
            <h2 className="text-xl text-gray-600 dark:text-gray-400">
              AI-Assisted Product Engineer
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Shipping production apps with autonomous systems
            </p>
            <p className="text-base text-gray-500 dark:text-gray-500">
              Building{" "}
              <a 
                href="https://flumin.io" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                Flumin
              </a>
              {" "}— legal-tech platform where AI removes real admin
            </p>
            <p className="text-base text-gray-500 dark:text-gray-500">
              UK citizen in Albania, remote Europe 🌍
            </p>
          </div>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <a
            href="mailto:matt@matthewfowles.io"
            className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Email
          </a>
          <a
            href="https://www.linkedin.com/in/matt-fowles"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/matthewfowles"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://x.com/matthewfowles"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            X
          </a>
          <a
            href="https://www.instagram.com/mattfowlesnomad/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Instagram
          </a>
        </nav>
      </div>
    </main>
  );
}
