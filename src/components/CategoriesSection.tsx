"use client";

import React from "react";
import Link from "next/link";
import { CATEGORIES } from "@/data/restaurants";
import { useLanguage } from "@/context/LanguageContext";
import { useFilter } from "@/context/FilterContext";

export default function CategoriesSection() {
  const { lang, t } = useLanguage();
  const { setSelectedFoodType } = useFilter();

  return (
    <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 py-16 border-t border-white/5 scroll-mt-20">
      {/* Header inspired by MultiMovies Category Section */}
      <div className="text-center mb-10 space-y-2">
        <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          {lang === "ja" ? "ジャンル・料理から探す" : "Browse by Category"}
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400">
          {lang === "ja"
            ? "今食べたい至高の日本料理をセレクト"
            : "Find exactly what you want to savor across Japan"}
        </p>
        <div className="w-12 h-1 bg-red-600 rounded-full mx-auto glow-red" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {CATEGORIES.filter((c) => c.id !== "all").map((cat) => (
          <Link
            key={cat.id}
            href="#browse"
            onClick={() => setSelectedFoodType(cat.id)}
            className="group relative flex flex-col p-4 sm:p-5 rounded-2xl bg-zinc-900/60 border border-white/5 hover:border-red-500/50 hover:bg-zinc-900/90 hover:-translate-y-1 transition-all duration-300 shadow-lg glass-panel"
          >
            {/* MultiMovies red top subtle accent */}
            <div className="absolute top-0 left-6 right-6 h-[2px] bg-red-600/0 group-hover:bg-red-500 rounded-full transition-colors glow-red" />

            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-red-950/60 border border-red-800/40 flex items-center justify-center text-xl group-hover:scale-110 transition-transform shadow-inner">
                {cat.emoji}
              </div>
              <div className="flex-1 truncate">
                <h3 className="text-sm sm:text-base font-black text-white group-hover:text-red-400 transition-colors truncate">
                  {lang === "ja" ? cat.ja : cat.label}
                </h3>
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider block font-medium">
                  {lang === "ja" ? cat.label : cat.ja}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-zinc-400 line-clamp-1 mt-1 group-hover:text-zinc-300 transition-colors">
              {lang === "ja" ? `厳選された${cat.ja}の名店` : `Verified authentic ${cat.label} spots`}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
