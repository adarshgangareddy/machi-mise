"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { REAL_RESTAURANTS, CATEGORIES, Restaurant } from "@/data/restaurants";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { useFilter, PREFECTURES } from "@/context/FilterContext";
import RestaurantDetailModal from "@/components/RestaurantDetailModal";
import InteractiveDiningMap from "@/components/InteractiveDiningMap";

export default function DirectorySection() {
  const { lang, t } = useLanguage();
  const { isBookmarked, toggleBookmark, bookmarks, isAuthenticated } = useAuth();
  const { selectedKen, setSelectedKen, selectedFoodType, setSelectedFoodType, setRequireLoginModalOpen } = useFilter();

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"recommended" | "nearest" | "priceAsc" | "priceDesc">("recommended");
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"split" | "grid">("split");
  const [mobileMapToggle, setMobileMapToggle] = useState<"list" | "map">("list");
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);
  const [activeRestaurant, setActiveRestaurant] = useState<Restaurant | null>(null);
  const [mapSelectedRestaurant, setMapSelectedRestaurant] = useState<Restaurant | null>(null);

  const activePrefecture = PREFECTURES.find((p) => p.id === selectedKen) || PREFECTURES[1];

  // Feature filter tags matching user's Image 2
  const featureTags = [
    { id: "all", label: "Refine", ja: "絞り込み解除" },
    { id: "Counter", label: "Counter", ja: "カウンター席" },
    { id: "Lunch", label: "Lunch", ja: "ランチ営業" },
    { id: "Kid Friendly", label: "Kid Friendly", ja: "お子様連れOK" },
    { id: "Private room", label: "Private room", ja: "完全個室" },
    { id: "Smoke-Free Venue", label: "Smoke-Free Venue", ja: "全席禁煙" },
    { id: "All You Can Drink", label: "All You Can Drink", ja: "飲み放題あり" },
    { id: "Birthdays & Parties", label: "Birthdays & Parties", ja: "記念日・お祝い" },
    { id: "Scenic Views", label: "Scenic Views", ja: "夜景・庭園眺望" },
    { id: "Friends & Groups", label: "Friends & Groups", ja: "会食・グループ" },
  ];

  // Filtering by prefecture (Ken), food category, and feature tags
  const filteredRestaurants = useMemo(() => {
    return REAL_RESTAURANTS.filter((r) => {
      // 1. Strict Ken (Prefecture) filter
      if (selectedKen !== "all") {
        if (r.ken !== selectedKen) return false;
      }

      // 2. Food category filter (e.g. Tempura, Sushi, Ramen...)
      if (selectedFoodType !== "all") {
        const catObj = CATEGORIES.find((c) => c.id === selectedFoodType);
        if (catObj) {
          const catKeyword = catObj.label.toLowerCase().split(" ")[0];
          const matchesCategory =
            r.category.toLowerCase().includes(catKeyword) ||
            r.categoryJa.includes(catObj.ja) ||
            r.name.toLowerCase().includes(catKeyword) ||
            r.description.toLowerCase().includes(catKeyword);
          if (!matchesCategory) return false;
        }
      }

      // 3. Feature Tag filter (Counter, Lunch, Private room, etc.)
      if (selectedTag !== "all") {
        const hasFeature = r.features.some((f) => f.toLowerCase().includes(selectedTag.toLowerCase()));
        if (!hasFeature) return false;
      }

      // 4. Search query filter
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase().trim();
        const matchesName = r.name.toLowerCase().includes(query) || r.nameJa.includes(query);
        const matchesArea = r.area.toLowerCase().includes(query) || r.areaJa.includes(query);
        const matchesCity = r.city.toLowerCase().includes(query) || r.cityJa.includes(query);
        const matchesTag = r.category.toLowerCase().includes(query) || r.categoryJa.includes(query);
        const matchesDesc = r.description.toLowerCase().includes(query) || r.descriptionJa.includes(query);
        if (!matchesName && !matchesArea && !matchesCity && !matchesTag && !matchesDesc) {
          return false;
        }
      }

      // 5. Bookmarks only filter
      if (showBookmarksOnly && !bookmarks.includes(r.id)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "recommended") return b.rating - a.rating;
      if (sortBy === "nearest") {
        const distA = parseInt(a.distanceStation?.replace(/[^0-9]/g, "") || "999");
        const distB = parseInt(b.distanceStation?.replace(/[^0-9]/g, "") || "999");
        return distA - distB;
      }
      if (sortBy === "priceAsc") return a.priceTier.length - b.priceTier.length;
      if (sortBy === "priceDesc") return b.priceTier.length - a.priceTier.length;
      return 0;
    });
  }, [selectedKen, selectedFoodType, selectedTag, searchTerm, showBookmarksOnly, bookmarks, sortBy]);

  const resetAllFilters = () => {
    setSearchTerm("");
    setSelectedFoodType("all");
    setSelectedTag("all");
    setShowBookmarksOnly(false);
  };

  return (
    <section id="browse" className="max-w-7xl mx-auto px-3 sm:px-6 py-10 sm:py-16 scroll-mt-20 space-y-6">
      
      {/* ══════════════════════════════════════════════════════════════════════
          1. TOP FEATURE FILTER TAGS CHIPS (Exact layout from user's Image 2)
          Refine, Counter, Lunch, Kid Friendly, Private room, Smoke-Free...
         ══════════════════════════════════════════════════════════════════════ */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 pt-1">
        {featureTags.map((tag) => {
          const isActive = selectedTag === tag.id;
          return (
            <button
              key={tag.id}
              type="button"
              onClick={() => setSelectedTag(tag.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 border ${
                isActive
                  ? "bg-red-600 text-white border-red-500 shadow-md glow-red"
                  : "bg-zinc-900/80 text-zinc-300 hover:text-white border-white/10 hover:border-white/20"
              }`}
            >
              {lang === "ja" ? tag.ja : tag.label}
            </button>
          );
        })}
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          2. SORT TABS & VIEW TOGGLE (Exact layout from user's Image 2)
          Showing count | Recommended, Nearest, Price | Split / Grid Toggle
         ══════════════════════════════════════════════════════════════════════ */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        
        {/* Count & Active Filter Indicator */}
        <div className="flex items-center gap-3">
          <span className="text-xs sm:text-sm text-zinc-400 font-medium">
            {lang === "ja"
              ? `全 ${filteredRestaurants.length} 件中 1〜${filteredRestaurants.length} 件を表示`
              : `Showing 1–${filteredRestaurants.length} of ${filteredRestaurants.length}`}
          </span>
          {selectedFoodType !== "all" && (
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-red-600 text-white shadow glow-red uppercase">
              {selectedFoodType}
            </span>
          )}
          {selectedKen !== "all" && (
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-zinc-800 text-zinc-300 border border-white/10">
              📍 {activePrefecture.label}
            </span>
          )}
        </div>

        {/* Sort Tabs & View Modes */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center rounded-xl bg-zinc-900/90 border border-white/10 p-1 text-xs">
            <button
              type="button"
              onClick={() => setSortBy("recommended")}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                sortBy === "recommended"
                  ? "bg-red-600 text-white shadow glow-red"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              ⭐ {lang === "ja" ? "おすすめ順" : "Recommended"}
            </button>
            <button
              type="button"
              onClick={() => setSortBy("nearest")}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                sortBy === "nearest"
                  ? "bg-red-600 text-white shadow glow-red"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              📍 {lang === "ja" ? "駅近順" : "Nearest"}
            </button>
            <button
              type="button"
              onClick={() => setSortBy("priceAsc")}
              className={`px-2.5 py-1.5 rounded-lg font-bold transition-all hidden md:inline ${
                sortBy === "priceAsc"
                  ? "bg-red-600 text-white shadow glow-red"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {lang === "ja" ? "価格が安い順" : "Price: low to high"}
            </button>
            <button
              type="button"
              onClick={() => setSortBy("priceDesc")}
              className={`px-2.5 py-1.5 rounded-lg font-bold transition-all hidden md:inline ${
                sortBy === "priceDesc"
                  ? "bg-red-600 text-white shadow glow-red"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {lang === "ja" ? "価格が高い順" : "Price: high to low"}
            </button>
          </div>

          {/* View Mode Toggle (Map Split vs Grid) */}
          <div className="flex items-center rounded-xl bg-zinc-900 border border-white/10 p-1 text-xs">
            <button
              type="button"
              onClick={() => setViewMode("split")}
              className={`px-2.5 py-1.5 rounded-lg font-bold flex items-center gap-1 transition-all ${
                viewMode === "split"
                  ? "bg-zinc-800 text-white border border-white/10"
                  : "text-zinc-400 hover:text-white"
              }`}
              title="Split View with Map"
            >
              <span>🗺️</span>
              <span className="hidden sm:inline">Map</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`px-2.5 py-1.5 rounded-lg font-bold flex items-center gap-1 transition-all ${
                viewMode === "grid"
                  ? "bg-zinc-800 text-white border border-white/10"
                  : "text-zinc-400 hover:text-white"
              }`}
              title="2-Column Mobile Grid View"
            >
              <span>▦</span>
              <span className="hidden sm:inline">Grid</span>
            </button>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          3. MAIN CONTENT: SPLIT VIEW (IMAGE 2) OR 2-BOX MOBILE GRID
         ══════════════════════════════════════════════════════════════════════ */}
      {filteredRestaurants.length === 0 ? (
        <div className="text-center py-20 rounded-3xl bg-zinc-900/40 border border-white/5 space-y-4 p-6">
          <div className="text-5xl mb-2">🏮</div>
          <h3 className="text-lg font-bold text-white">{t.noResultsTitle}</h3>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto">{t.noResultsSub}</p>
          <button
            type="button"
            onClick={resetAllFilters}
            className="px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-xs glow-red transition-all"
          >
            {t.clearFilters}
          </button>
        </div>
      ) : viewMode === "split" ? (
        /* ════════════════════════════════════════════════════════════════════
           SPLIT VIEW (Matching user's Image 2):
           Left: Horizontal cards with image collage + Japanese taglines
           Right: Interactive live map with pins
           ════════════════════════════════════════════════════════════════════ */
        <div>
          {/* Mobile-Only List vs Map Toggle Pill Bar */}
          <div className="flex sm:hidden w-full rounded-2xl bg-zinc-900 border border-white/10 p-1 text-xs mb-4">
            <button
              type="button"
              onClick={() => setMobileMapToggle("list")}
              className={`flex-1 py-2 rounded-xl font-bold text-center transition-all flex items-center justify-center gap-1.5 ${
                mobileMapToggle === "list"
                  ? "bg-red-600 text-white shadow glow-red"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <span>📋</span>
              <span>{lang === "ja" ? `一覧 (${filteredRestaurants.length})` : `List (${filteredRestaurants.length})`}</span>
            </button>
            <button
              type="button"
              onClick={() => setMobileMapToggle("map")}
              className={`flex-1 py-2 rounded-xl font-bold text-center transition-all flex items-center justify-center gap-1.5 ${
                mobileMapToggle === "map"
                  ? "bg-red-600 text-white shadow glow-red"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <span>🗺️</span>
              <span>{lang === "ja" ? "インタラクティブ地図" : "Live Map"}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Horizontal Restaurant Cards */}
            <div className={`lg:col-span-7 xl:col-span-7 space-y-4 ${mobileMapToggle === "map" ? "hidden lg:block" : "block"}`}>
            {filteredRestaurants.map((shop) => {
              const bookmarked = isBookmarked(shop.id);
              const isMapSelected = mapSelectedRestaurant?.id === shop.id;

              return (
                <div
                  key={shop.id}
                  onClick={() => setMapSelectedRestaurant(shop)}
                  className={`group relative rounded-3xl overflow-hidden bg-zinc-900/80 border transition-all duration-300 p-3.5 sm:p-5 flex flex-col sm:flex-row gap-4 glass-panel cursor-pointer ${
                    isMapSelected
                      ? "border-red-500 shadow-xl glow-red ring-1 ring-red-500/50"
                      : "border-white/10 hover:border-red-500/40 hover:bg-zinc-900"
                  }`}
                >
                  {/* Photo Collage Area (Matching Image 2: 1 Large Photo + 2 Thumbnails) */}
                  <div className="relative w-full sm:w-56 h-48 sm:h-auto shrink-0 flex gap-1.5 overflow-hidden rounded-2xl bg-zinc-950">
                    {/* Primary Large Dish Image */}
                    <div className="relative w-2/3 h-full overflow-hidden">
                      <Image
                        src={shop.image}
                        alt={shop.name}
                        fill
                        sizes="240px"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    {/* Secondary Stacked Thumbnails */}
                    <div className="flex flex-col w-1/3 gap-1.5 h-full">
                      <div className="relative w-full h-1/2 overflow-hidden bg-zinc-900">
                        <Image
                          src={shop.gallery[0] || shop.image}
                          alt={`${shop.name} photo 1`}
                          fill
                          sizes="100px"
                          className="object-cover"
                        />
                      </div>
                      <div className="relative w-full h-1/2 overflow-hidden bg-zinc-900">
                        <Image
                          src={shop.gallery[1] || shop.image}
                          alt={`${shop.name} photo 2`}
                          fill
                          sizes="100px"
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Card Content (Matching user's Image 2 details) */}
                  <div className="flex-1 flex flex-col justify-between space-y-2 min-w-0">
                    <div>
                      {/* Title & Link */}
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/shop/${shop.id}`}
                          className="text-base sm:text-lg font-black text-white hover:text-red-400 transition-colors line-clamp-1"
                        >
                          {lang === "ja" ? shop.nameJa : shop.name}
                        </Link>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleBookmark(shop.id);
                          }}
                          className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                            bookmarked ? "text-amber-400 bg-amber-400/20" : "text-zinc-500 hover:text-white"
                          }`}
                        >
                          {bookmarked ? "★" : "☆"}
                        </button>
                      </div>

                      {/* Distance / Nearest Station Badge (e.g. Onarimon 357m ℹ️, Shibakoen 289m ℹ️) */}
                      <div className="flex items-center gap-1.5 text-xs text-sky-400 font-semibold mt-0.5">
                        <span className="font-mono">{shop.distanceStation || shop.nearestStationJa}</span>
                        <span className="text-[10px] w-3.5 h-3.5 rounded-full bg-sky-950 border border-sky-600/50 flex items-center justify-center text-sky-300 font-bold">
                          i
                        </span>
                      </div>

                      {/* Japanese Tagline (Exact line from Image 2) */}
                      <p className="text-xs text-zinc-300 font-medium line-clamp-2 mt-1.5 leading-relaxed">
                        {lang === "ja" ? shop.taglineJa : shop.tagline}
                      </p>

                      {/* Cuisine, Lunch & Dinner Prices (🏷️ Japanese, Tempura 🌙 ¥12,500 ☀️ ¥6,000) */}
                      <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-300 font-mono mt-2">
                        <span className="flex items-center gap-1 text-zinc-400 font-sans">
                          🏷️ {shop.categoryEmoji} {lang === "ja" ? shop.categoryJa : shop.category}
                        </span>
                        <span>
                          🌙 <strong className="text-white font-bold">{shop.dinnerSpend || shop.averageSpend}</strong>
                        </span>
                        <span>
                          ☀️ <strong className="text-white font-bold">{shop.lunchSpend || "¥4,000"}</strong>
                        </span>
                      </div>

                      {/* Feature Badges ([Private room] [Counter] [All You Can Drink]) */}
                      <div className="flex flex-wrap gap-1.5 mt-2.5">
                        {shop.features.slice(0, 4).map((feat, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-zinc-800 text-zinc-300 border border-white/5"
                          >
                            {feat}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Find Availability Button (Matching Image 2 CTA) */}
                    <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveRestaurant(shop);
                        }}
                        className="w-full sm:w-auto px-4 py-2 rounded-xl bg-zinc-800 hover:bg-red-600 text-white font-black text-xs transition-all flex items-center justify-center gap-1.5 shadow"
                      >
                        <span>{lang === "ja" ? "空席確認・予約" : "Find availability"}</span>
                        <span>↗</span>
                      </button>

                      <Link
                        href={`/shop/${shop.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs font-bold text-red-400 hover:text-red-300 hidden sm:inline"
                      >
                        {lang === "ja" ? "詳細ページへ" : "Full Shop"} →
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

            {/* Right Column: Sticky Interactive Live Map */}
            <div className={`lg:col-span-5 xl:col-span-5 sticky top-20 ${mobileMapToggle === "list" ? "hidden lg:block" : "block"}`}>
              <InteractiveDiningMap
                restaurants={filteredRestaurants}
                selectedRestaurant={mapSelectedRestaurant}
                onSelectRestaurant={(shop) => {
                  setMapSelectedRestaurant(shop);
                }}
                onBookRestaurant={(shop) => {
                  setActiveRestaurant(shop);
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        /* ════════════════════════════════════════════════════════════════════
           2-BOX MOBILE & DESKTOP GRID VIEW
           ════════════════════════════════════════════════════════════════════ */
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6">
          {filteredRestaurants.map((shop) => {
            const bookmarked = isBookmarked(shop.id);
            return (
              <div
                key={shop.id}
                className="group relative flex flex-col overflow-hidden rounded-2xl sm:rounded-3xl bg-zinc-900/90 border border-white/10 hover:border-red-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl cursor-pointer glass-panel"
                onClick={() => setActiveRestaurant(shop)}
              >
                {/* Photo Area */}
                <div className="relative h-36 sm:h-48 md:h-52 w-full overflow-hidden bg-zinc-950 shrink-0">
                  <Image
                    src={shop.image}
                    alt={shop.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-black/40" />

                  {/* Top Badge */}
                  <div className="absolute top-2 left-2 flex flex-wrap gap-1 max-w-[70%]">
                    {shop.badge && (
                      <span className="px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-black bg-red-600 text-white shadow-md glow-red truncate">
                        {lang === "ja" ? shop.badgeJa || shop.badge : shop.badge}
                      </span>
                    )}
                  </div>

                  {/* Bookmark Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBookmark(shop.id);
                    }}
                    className={`absolute top-2 right-2 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full backdrop-blur-md transition-all ${
                      bookmarked ? "bg-red-600 text-white glow-red shadow" : "bg-black/60 text-white hover:bg-black/80"
                    }`}
                  >
                    <span className="text-xs leading-none">{bookmarked ? "★" : "☆"}</span>
                  </button>

                  {/* Bottom Rating and Category Pill */}
                  <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center text-[10px] sm:text-xs">
                    <span className="px-2 py-0.5 rounded-md bg-black/75 backdrop-blur text-zinc-300 font-bold truncate max-w-[55%]">
                      {shop.categoryEmoji} {lang === "ja" ? shop.categoryJa : shop.category}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-black/75 backdrop-blur font-black text-amber-400">
                      ★ {shop.rating}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="flex-1 p-3 sm:p-4 flex flex-col justify-between space-y-2.5">
                  <div>
                    <div className="flex items-center gap-1 text-[9px] sm:text-[11px] text-red-400 font-extrabold uppercase tracking-wider mb-0.5 truncate">
                      <span>{lang === "ja" ? shop.areaJa : shop.area}</span>
                      <span>·</span>
                      <span className="text-zinc-500 font-normal">{lang === "ja" ? shop.kenJa : shop.city}</span>
                    </div>

                    <h3 className="text-xs sm:text-base font-black text-white group-hover:text-red-400 transition-colors line-clamp-1 leading-snug">
                      {lang === "ja" ? shop.nameJa : shop.name}
                    </h3>

                    <p className="text-[10px] sm:text-xs text-zinc-300 mt-1.5 line-clamp-2 leading-relaxed">
                      {lang === "ja" ? shop.taglineJa : shop.tagline}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/5 space-y-1">
                    <div className="flex justify-between items-center text-[10px] sm:text-xs font-mono">
                      <span className="text-zinc-400 truncate max-w-[70%]">
                        {shop.dinnerSpend || shop.averageSpend}
                      </span>
                      <span className="text-zinc-200 font-bold">{shop.priceTier}</span>
                    </div>

                    <div className="flex justify-between items-center pt-1 text-[10px] sm:text-xs">
                      <Link
                        href={`/shop/${shop.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="text-red-400 hover:text-red-300 font-extrabold flex items-center gap-0.5 hover:underline"
                      >
                        <span>{lang === "ja" ? "予約・詳細" : "Book / Menu"}</span>
                        <span>→</span>
                      </Link>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveRestaurant(shop);
                        }}
                        className="text-[9px] text-zinc-400 hover:text-white px-2 py-0.5 rounded bg-zinc-800/80 border border-white/5"
                      >
                        {lang === "ja" ? "簡易表示" : "Quick View"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal Popup with Full Details & Booking System */}
      <RestaurantDetailModal
        restaurant={activeRestaurant}
        onClose={() => setActiveRestaurant(null)}
      />
    </section>
  );
}
