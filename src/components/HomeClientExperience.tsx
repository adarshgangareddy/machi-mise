"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategoriesSection from "@/components/CategoriesSection";
import DirectorySection from "@/components/DirectorySection";
import CommunityShareAndPlatforms from "@/components/CommunityShareAndPlatforms";
import BusinessCtaBanner from "@/components/BusinessCtaBanner";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import MobileNav from "@/components/MobileNav";
import FoodFilterModal from "@/components/FoodFilterModal";
import RequireLoginModal from "@/components/RequireLoginModal";
import { useFilter, PREFECTURES } from "@/context/FilterContext";
import { CATEGORIES } from "@/data/restaurants";
import { useLanguage } from "@/context/LanguageContext";

export default function HomeClientExperience() {
  const { lang } = useLanguage();
  const { selectedFoodType, setSelectedFoodType, selectedKen } = useFilter();

  const isFoodOpened = selectedFoodType !== "all";
  const activePrefecture = PREFECTURES.find((p) => p.id === selectedKen) || PREFECTURES[1];
  const activeCategory = CATEGORIES.find((c) => c.id === selectedFoodType);

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 selection:bg-red-600 selection:text-white pb-20 sm:pb-0">
      {/* 1. Global Navbar */}
      <Navbar />

      {/* 2. CONDITIONAL VIEW:
          When a food/cuisine like Tempura is opened, HIDE all homepage details
          (Hero section, Register Your Shop, Community Share, etc.)
          and display ONLY the focused cuisine view matching Image 2! */}
      {isFoodOpened ? (
        <div className="flex-1 w-full animate-fade-in-up">
          {/* Focused Cuisine Header Bar */}
          <div className="bg-zinc-900/90 border-b border-white/10 px-4 sm:px-6 py-4 backdrop-blur-md sticky top-16 z-30">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedFoodType("all")}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs border border-white/10 transition-colors shadow"
                >
                  <span>←</span>
                  <span>{lang === "ja" ? "ホームに戻る" : "All Cuisines"}</span>
                </button>

                <div className="flex items-center gap-2">
                  <span className="text-2xl">{activeCategory?.emoji || "🍤"}</span>
                  <div>
                    <h1 className="text-base sm:text-xl font-black text-white">
                      {lang === "ja" ? activeCategory?.ja : activeCategory?.label}{" "}
                      <span className="text-red-500 font-normal text-xs sm:text-sm">
                        · {lang === "ja" ? activePrefecture.labelJa : activePrefecture.label}
                      </span>
                    </h1>
                    <p className="text-[10px] sm:text-xs text-zinc-400">
                      {lang === "ja"
                        ? "厳選された職人名店とリアルタイム空席状況"
                        : "Verified authentic master kitchens with live availability & advance booking"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Reset Pill */}
              <button
                type="button"
                onClick={() => setSelectedFoodType("all")}
                className="text-xs text-red-400 hover:text-red-300 font-bold self-start sm:self-auto"
              >
                {lang === "ja" ? "フィルターをクリア ✕" : "Clear Filter ✕"}
              </button>
            </div>
          </div>

          {/* Directory Section with Split View & Live Map (Image 2) */}
          <DirectorySection />
        </div>
      ) : (
        /* STANDARD HOMEPAGE VIEW (When no specific cuisine is opened) */
        <div className="flex-1 w-full">
          {/* Hero Section */}
          <HeroSection />

          {/* Browse by Cuisine & Popular Areas (Image 1) */}
          <CategoriesSection />

          {/* Main Directory */}
          <DirectorySection />

          {/* Community Share & Available Everywhere Badges */}
          <CommunityShareAndPlatforms />

          {/* Business CTA Banner */}
          <BusinessCtaBanner />
        </div>
      )}

      {/* 3. Global Footer */}
      <Footer />

      {/* 4. Cookie Banner */}
      <CookieBanner />

      {/* 5. Mobile Bottom Navigation Bar (Home, Explore, Cuisines, My List, Account) */}
      <MobileNav />

      {/* 6. Modals */}
      <FoodFilterModal />
      <RequireLoginModal />
    </div>
  );
}
