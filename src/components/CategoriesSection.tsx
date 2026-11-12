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
      <div className="flex justify-between items-end mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-red-500 mb-1 block">
            {t.categoriesSub}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            {t.categoriesTitle}
          </h2>
        </div>
        <Link
          href="#browse"
          className="text-xs font-bold text-red-400 hover:text-red-300 transition-colors flex items-center gap-1"
        >
          <span>{t.viewAll}</span>
          <span>→</span>
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {CATEGORIES.filter((c) => c.id !== "all").map((cat) => (
          <Link
            key={cat.id}
            href="#browse"
            onClick={() => setSelectedFoodType(cat.id)}
            className="flex flex-col items-center justify-center p-5 rounded-3xl bg-zinc-900/60 border border-white/5 hover:border-red-500/40 hover:bg-zinc-800/80 hover:-translate-y-1 hover:shadow-xl transition-all group text-center"
          >
            <span className="text-4xl mb-3 group-hover:scale-110 transition-transform">
              {cat.emoji}
            </span>
            <span className="text-sm font-bold text-white group-hover:text-red-400 transition-colors">
              {lang === "ja" ? cat.ja : cat.label}
            </span>
            <span className="text-[11px] text-zinc-500 mt-0.5">
              {lang === "ja" ? cat.label : cat.ja}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

