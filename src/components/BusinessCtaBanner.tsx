"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function BusinessCtaBanner() {
  const { lang, t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-red-950 via-zinc-950 to-zinc-950 border-y border-red-900/40 py-20 px-4 sm:px-6">
      {/* Decorative Kanji */}
      <div className="absolute left-8 bottom-0 text-[18vw] font-black text-white/[0.02] pointer-events-none select-none leading-none">
        商
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-600/20 border border-red-500/40 text-3xl shadow-lg glow-red">
          🏮
        </div>

        <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
          {t.ctaTitle}
        </h2>

        <p className="text-zinc-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          {t.ctaSub}
        </p>

        <div className="pt-2">
          <Link
            href="/login"
            className="inline-block px-8 py-4 rounded-full bg-red-600 hover:bg-red-500 text-white font-extrabold text-sm tracking-wide shadow-xl glow-red-lg hover:scale-105 transition-all"
          >
            {t.ctaButton}
          </Link>
        </div>
      </div>
    </section>
  );
}
