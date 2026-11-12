"use client";

import React from "react";
import { CATEGORIES, REAL_RESTAURANTS } from "@/data/restaurants";
import { useFilter } from "@/context/FilterContext";
import { useLanguage } from "@/context/LanguageContext";

export default function FoodFilterModal() {
  const { foodModalOpen, setFoodModalOpen, selectedFoodType, setSelectedFoodType, selectedKen } = useFilter();
  const { lang } = useLanguage();

  if (!foodModalOpen) return null;

  // Calculate counts for the currently selected prefecture
  const getCategoryCount = (categoryId: string) => {
    return REAL_RESTAURANTS.filter((r) => {
      const matchKen = selectedKen === "all" || r.ken === selectedKen;
      if (!matchKen) return false;
      if (categoryId === "all") return true;
      const catObj = CATEGORIES.find((c) => c.id === categoryId);
      if (!catObj) return true;
      return r.category.toLowerCase().includes(catObj.label.toLowerCase().split(" ")[0]);
    }).length;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in-up">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={() => setFoodModalOpen(false)} aria-hidden="true" />

      {/* Modal Container */}
      <div className="relative w-full max-w-lg rounded-3xl bg-zinc-900 border border-white/10 shadow-2xl p-6 sm:p-8 z-10 space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🍜</span>
            <div>
              <h3 className="text-lg font-black text-white">
                {lang === "ja" ? "料理・ジャンルで絞り込む" : "Filter Cuisine & Food Type"}
              </h3>
              <p className="text-xs text-zinc-400">
                {lang === "ja"
                  ? "お好みの料理を選択するとホームの店舗一覧が更新されます"
                  : "Select a cuisine to immediately filter matching restaurants"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setFoodModalOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[60vh] overflow-y-auto no-scrollbar py-1">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedFoodType === cat.id;
            const count = getCategoryCount(cat.id);
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedFoodType(cat.id);
                  setFoodModalOpen(false);
                  const el = document.getElementById("browse");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className={`flex flex-col items-start p-3.5 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? "bg-red-950/70 border-red-500 text-white shadow-lg glow-red"
                    : "bg-zinc-950/70 border-white/5 text-zinc-300 hover:bg-zinc-800 hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="text-2xl">{cat.emoji}</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">
                    {count}
                  </span>
                </div>
                <span className="text-xs font-bold text-white">
                  {lang === "ja" ? cat.ja : cat.label}
                </span>
                <span className="text-[10px] text-zinc-500">
                  {lang === "ja" ? cat.label : cat.ja}
                </span>
              </button>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="flex justify-between items-center pt-2 border-t border-white/10 text-xs">
          <button
            type="button"
            onClick={() => {
              setSelectedFoodType("all");
              setFoodModalOpen(false);
            }}
            className="text-zinc-400 hover:text-white underline"
          >
            {lang === "ja" ? "フィルターを解除" : "Reset food filter"}
          </button>
          <button
            type="button"
            onClick={() => setFoodModalOpen(false)}
            className="px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold transition-colors glow-red"
          >
            {lang === "ja" ? "この条件で見る" : "Apply Filter"}
          </button>
        </div>
      </div>
    </div>
  );
}
