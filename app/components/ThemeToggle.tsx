"use client";

import { useSyncExternalStore } from "react";
import { Sun, Moon } from "lucide-react";

function subscribe(callback: () => void) {
  window.addEventListener("themechange", callback);
  const observer = new MutationObserver(() => callback());
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => {
    window.removeEventListener("themechange", callback);
    observer.disconnect();
  };
}

function getSnapshot(): "light" | "dark" {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function getServerSnapshot(): "light" | "dark" {
  return "dark";
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";

    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }

    // Notify any canvas or dynamic listeners
    window.dispatchEvent(new CustomEvent("themechange", { detail: { theme: nextTheme } }));
  };

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="group relative inline-flex items-center justify-center w-9 h-9 rounded-full border border-neutral-300/80 dark:border-white/10 bg-white/80 dark:bg-zinc-900/80 text-neutral-700 dark:text-neutral-300 hover:text-red-500 dark:hover:text-red-400 hover:border-red-500/40 dark:hover:border-red-500/40 shadow-xs backdrop-blur-md transition-all duration-200 cursor-pointer"
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4 transition-transform group-hover:rotate-45 text-amber-400" />
      ) : (
        <Moon className="w-4 h-4 transition-transform group-hover:-rotate-12 text-neutral-800" />
      )}
    </button>
  );
}
