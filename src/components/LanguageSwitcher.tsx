"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLanguage();

  return (
    <div
      className={`inline-flex items-center p-1 rounded-full bg-zinc-900 border border-white/10 ${className}`}
      role="group"
      aria-label="Language switcher"
    >
      <button
        type="button"
        onClick={() => setLang("en")}
        className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
          lang === "en"
            ? "bg-red-600 text-white shadow-sm glow-red"
            : "text-zinc-400 hover:text-white"
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLang("ja")}
        className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
          lang === "ja"
            ? "bg-red-600 text-white shadow-sm glow-red"
            : "text-zinc-400 hover:text-white"
        }`}
      >
        日本語
      </button>
    </div>
  );
}
