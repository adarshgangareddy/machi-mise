"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { CUISINES_WITH_IMAGES, POPULAR_AREAS } from "@/data/restaurants";
import { useLanguage } from "@/context/LanguageContext";
import { useFilter, PREFECTURES } from "@/context/FilterContext";

export default function CategoriesSection() {
  const { lang } = useLanguage();
  const { selectedFoodType, setSelectedFoodType, selectedKen, setSelectedKen } = useFilter();

  const [activeAreaTab, setActiveAreaTab] = useState<string>("tokyo");
  const cuisineScrollRef = useRef<HTMLDivElement>(null);
  const areaScrollRef = useRef<HTMLDivElement>(null);

  const scrollCuisinesRight = () => {
    if (cuisineScrollRef.current) {
      cuisineScrollRef.current.scrollBy({ left: 240, behavior: "smooth" });
    }
  };

  const scrollAreasRight = () => {
    if (areaScrollRef.current) {
      areaScrollRef.current.scrollBy({ left: 280, behavior: "smooth" });
    }
  };

  const handleCuisineClick = (cuisineId: string) => {
    setSelectedFoodType(cuisineId);
    const target = document.getElementById("browse");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleAreaClick = (areaQuery: string, kenId: string) => {
    if (kenId === "tokyo" || kenId === "osaka" || kenId === "kyoto" || kenId === "fukuoka") {
      setSelectedKen(kenId);
    }
    const target = document.getElementById("browse");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const currentAreaGroup = POPULAR_AREAS.find((g) => g.id === activeAreaTab) || POPULAR_AREAS[0];

  return (
    <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12 border-t border-white/5 scroll-mt-20">
      
      {/* ══════════════════════════════════════════════════════════════════════
          1. BROWSE BY CUISINE (Exact layout from user's uploaded Image 1)
          Circular dish imagery with clean labels & scroll arrow
         ══════════════════════════════════════════════════════════════════════ */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🍽️</span>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {lang === "ja" ? "料理ジャンルから探す" : "Browse by cuisine"}
            </h2>
          </div>
          <span className="text-xs text-zinc-400 hidden sm:inline">
            {lang === "ja" ? "天ぷら・寿司・会席など" : "Tempura, Sushi, Kaiseki & more"}
          </span>
        </div>

        {/* Horizontal Circular Carousel */}
        <div className="relative group">
          <div
            ref={cuisineScrollRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar py-2 px-1 scroll-smooth"
          >
            {CUISINES_WITH_IMAGES.map((cat, idx) => {
              const isSelected = selectedFoodType === cat.id;
              return (
                <button
                  key={`${cat.id}-${idx}`}
                  type="button"
                  onClick={() => handleCuisineClick(cat.id)}
                  className="flex flex-col items-center shrink-0 group/item focus:outline-none"
                >
                  {/* Circular dish container with subtle drop shadow and red glow on active */}
                  <div
                    className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden p-1 transition-all duration-300 ${
                      isSelected
                        ? "ring-4 ring-red-500 scale-105 shadow-xl glow-red"
                        : "ring-2 ring-white/10 group-hover/item:ring-red-500/60 group-hover/item:scale-105 bg-white/5"
                    }`}
                  >
                    <div className="relative w-full h-full rounded-full overflow-hidden bg-zinc-900">
                      <Image
                        src={cat.image}
                        alt={cat.label}
                        fill
                        sizes="96px"
                        className="object-cover group-hover/item:scale-110 transition-transform duration-500 brightness-95"
                      />
                    </div>
                  </div>

                  <span
                    className={`text-xs sm:text-sm font-bold mt-2.5 transition-colors ${
                      isSelected
                        ? "text-red-400 font-black"
                        : "text-zinc-300 group-hover/item:text-white"
                    }`}
                  >
                    {lang === "ja" ? cat.ja : cat.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Scroll Arrow Button (matching user's Image 1) */}
          <button
            type="button"
            onClick={scrollCuisinesRight}
            className="absolute -right-2 top-10 sm:top-12 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-zinc-900/90 hover:bg-red-600 text-white border border-white/20 shadow-xl flex items-center justify-center transition-all z-10 backdrop-blur"
            aria-label="Scroll right"
          >
            <span className="text-sm font-black leading-none">›</span>
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          2. BROWSE POPULAR AREAS (Exact layout from user's uploaded Image 1)
          Prefecture tabs + horizontal photo cards with text overlay
         ══════════════════════════════════════════════════════════════════════ */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">📍</span>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {lang === "ja" ? "人気のエリア・街から探す" : "Browse popular areas"}
          </h2>
        </div>

        {/* Area Tabs: Tokyo, Osaka, Kyoto, Nagoya, Yokohama, Fukuoka, Sapporo, Okinawa */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {POPULAR_AREAS.map((tab) => {
            const isActive = activeAreaTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveAreaTab(tab.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                  isActive
                    ? "bg-red-600 text-white shadow-lg glow-red"
                    : "bg-zinc-900/80 text-zinc-400 hover:text-white border border-white/5"
                }`}
              >
                {lang === "ja" ? tab.ja : tab.label}
              </button>
            );
          })}
        </div>

        {/* Area Cards Carousel (Akihabara, Asakusa, Ginza, Harajuku, Roppongi, Shibuya...) */}
        <div className="relative group">
          <div
            ref={areaScrollRef}
            className="flex gap-3 sm:gap-4 overflow-x-auto no-scrollbar py-1 scroll-smooth"
          >
            {currentAreaGroup.areas.map((area, idx) => (
              <button
                key={`${area.name}-${idx}`}
                type="button"
                onClick={() => handleAreaClick(area.query, activeAreaTab)}
                className="relative w-36 h-28 sm:w-48 sm:h-36 rounded-2xl overflow-hidden shrink-0 group/card text-left focus:outline-none border border-white/10 hover:border-red-500/60 transition-all hover:scale-[1.02] shadow-xl"
              >
                <Image
                  src={area.image}
                  alt={area.name}
                  fill
                  sizes="200px"
                  className="object-cover brightness-90 group-hover/card:scale-110 transition-transform duration-700"
                />
                {/* Dark gradient for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                {/* Bottom Title */}
                <div className="absolute bottom-2.5 left-3 right-3 z-10">
                  <h4 className="text-xs sm:text-sm font-black text-white group-hover/card:text-red-400 transition-colors drop-shadow">
                    {lang === "ja" ? area.nameJa : area.name}
                  </h4>
                  <span className="text-[10px] text-zinc-300 opacity-80 block">
                    {lang === "ja" ? area.name : area.nameJa}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Right Scroll Arrow Button */}
          <button
            type="button"
            onClick={scrollAreasRight}
            className="absolute -right-2 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-zinc-900/90 hover:bg-red-600 text-white border border-white/20 shadow-xl flex items-center justify-center transition-all z-10 backdrop-blur"
            aria-label="Scroll right"
          >
            <span className="text-sm font-black leading-none">›</span>
          </button>
        </div>
      </div>
    </section>
  );
}
