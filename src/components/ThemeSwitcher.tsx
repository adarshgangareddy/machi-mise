"use client";

import React from "react";
import { useTheme } from "@/context/ThemeContext";

interface ThemeSwitcherProps {
  variant?: "pill" | "icon" | "floating";
}

export default function ThemeSwitcher({ variant = "pill" }: ThemeSwitcherProps) {
  const { theme, toggleTheme, setTheme } = useTheme();

  if (variant === "floating") {
    return (
      <div className="fixed bottom-20 right-4 z-40 hidden sm:flex items-center gap-1 p-1 rounded-full bg-zinc-900/90 dark:bg-zinc-900/90 backdrop-blur-xl border border-white/10 dark:border-white/10 shadow-2xl">
        <button
          type="button"
          onClick={() => setTheme("dark")}
          className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1 ${
            theme === "dark"
              ? "bg-red-600 text-white shadow glow-red"
              : "text-zinc-400 hover:text-white"
          }`}
          title="Switch to Dark Mode"
        >
          <span>🌙</span>
          <span>Dark</span>
        </button>
        <button
          type="button"
          onClick={() => setTheme("light")}
          className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1 ${
            theme === "light"
              ? "bg-amber-500 text-zinc-950 font-black shadow"
              : "text-zinc-400 hover:text-white"
          }`}
          title="Switch to Light Mode"
        >
          <span>☀️</span>
          <span>Light</span>
        </button>
      </div>
    );
  }

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        className="w-8 h-8 rounded-full flex items-center justify-center bg-zinc-800/80 hover:bg-zinc-700 text-white border border-white/10 transition-colors shadow-sm"
        title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
        aria-label="Toggle Theme"
      >
        <span className="text-sm">{theme === "dark" ? "☀️" : "🌙"}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900/90 hover:bg-zinc-800 border border-white/10 text-xs font-bold transition-all shadow"
      title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      <span className="text-xs">{theme === "dark" ? "☀️" : "🌙"}</span>
      <span className="text-[11px] font-mono">
        {theme === "dark" ? "Light" : "Dark"}
      </span>
    </button>
  );
}
