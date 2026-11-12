"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function HeroSection() {
  const { lang, t } = useLanguage();

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-zinc-950 px-4 sm:px-6 py-24 sm:py-32">
      {/* Background Radial & Gradient Overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-950/40 via-zinc-950 to-zinc-950 pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Decorative Kanji in background */}
      <div
        className="absolute right-4 sm:right-16 top-1/2 -translate-y-1/2 text-[30vw] font-black text-white/[0.025] select-none pointer-events-none leading-none animate-float hidden md:block"
        aria-hidden="true"
      >
        店
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up">
        {/* Live Pill Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-red-950/60 border border-red-700/60 text-red-400 text-xs font-bold tracking-wider uppercase shadow-lg glow-red">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse-dot" />
          <span>{t.heroBadge}</span>
        </div>

        {/* H1 Heading with Glowing Red Accent */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-[1.08]">
          {t.heroHeading1}{" "}
          <span className="text-red-500 text-glow-red">{t.heroHeadingAccent}</span>
          <br />
          {t.heroHeading2}
        </h1>

        {/* Subtitle */}
        <p className="text-zinc-400 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed">
          {t.heroSubtext}
        </p>

        {/* Hero Quick Search Shortcut */}
        <div className="max-w-xl mx-auto pt-2">
          <Link
            href="#browse"
            className="flex items-center justify-between p-2 pl-5 rounded-2xl bg-zinc-900/90 border border-white/10 hover:border-red-500/50 shadow-2xl transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-3 text-zinc-400 text-sm">
              <span className="text-base">🔍</span>
              <span className="group-hover:text-zinc-200 transition-colors">
                {t.heroSearchPlaceholder}
              </span>
            </div>
            <span className="px-5 py-3 rounded-xl bg-red-600 group-hover:bg-red-500 text-white font-bold text-xs tracking-wider uppercase transition-colors shrink-0 shadow glow-red">
              {t.heroSearchButton}
            </span>
          </Link>
        </div>

        {/* CTA Buttons Row */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            href="#browse"
            className="px-8 py-4 rounded-full bg-red-600 hover:bg-red-500 text-white font-extrabold text-sm tracking-wide shadow-xl glow-red-lg hover:scale-105 transition-all"
          >
            {t.heroBrowseBtn}
          </Link>
          <Link
            href="/login"
            className="px-8 py-4 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-white/15 font-bold text-sm transition-all"
          >
            {t.heroListBtn}
          </Link>
        </div>

        {/* Stats Row */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 pt-8 text-xs sm:text-sm text-zinc-500 border-t border-white/5">
          <div className="flex items-center gap-2">
            <span className="text-lg font-black text-white">12+</span>
            <span>{t.heroStatListings}</span>
          </div>
          <span className="text-zinc-800">·</span>
          <div className="flex items-center gap-2">
            <span className="text-lg font-black text-white">4</span>
            <span>{t.heroStatCities}</span>
          </div>
          <span className="text-zinc-800">·</span>
          <div className="flex items-center gap-2">
            <span className="text-lg font-black text-white">50K+</span>
            <span>{t.heroStatReviews}</span>
          </div>
        </div>
      </div>

      {/* Floating Scroll Down Prompt */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-zinc-500 text-xs animate-float">
        <span>{t.heroScrollDown}</span>
        <span className="text-red-500">↓</span>
      </div>
    </section>
  );
}

