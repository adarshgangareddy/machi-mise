"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { REAL_RESTAURANTS, CATEGORIES, Restaurant } from "@/data/restaurants";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { useFilter, PREFECTURES } from "@/context/FilterContext";
import RestaurantDetailModal from "@/components/RestaurantDetailModal";

export default function DirectorySection() {
  const { lang, t } = useLanguage();
  const { isBookmarked, toggleBookmark, bookmarks, isAuthenticated } = useAuth();
  const { selectedKen, setSelectedKen, selectedFoodType, setSelectedFoodType, setRequireLoginModalOpen } = useFilter();

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"rating" | "reviews" | "priceAsc" | "priceDesc">("rating");
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);
  const [activeRestaurant, setActiveRestaurant] = useState<Restaurant | null>(null);

  const activePrefecture = PREFECTURES.find((p) => p.id === selectedKen) || PREFECTURES[1];

  // Strict filtering by prefecture (Ken) and food category
  const filteredRestaurants = useMemo(() => {
    return REAL_RESTAURANTS.filter((r) => {
      // 1. Strict Ken (Prefecture) filter: Tokyo shops never show in Osaka, Osaka shops never in Tokyo
      if (selectedKen !== "all") {
        if (r.ken !== selectedKen) return false;
      }

      // 2. Food category filter
      if (selectedFoodType !== "all") {
        const catObj = CATEGORIES.find((c) => c.id === selectedFoodType);
        if (catObj && !r.category.toLowerCase().includes(catObj.label.toLowerCase().split(" ")[0])) {
          return false;
        }
      }

      // 3. Search query filter
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

      // 4. Bookmarks only filter
      if (showBookmarksOnly && !bookmarks.includes(r.id)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "reviews") return b.reviewsCount - a.reviewsCount;
      if (sortBy === "priceAsc") return a.priceTier.length - b.priceTier.length;
      if (sortBy === "priceDesc") return b.priceTier.length - a.priceTier.length;
      return 0;
    });
  }, [selectedKen, selectedFoodType, searchTerm, showBookmarksOnly, bookmarks, sortBy]);

  const handleViewAllClick = () => {
    if (!isAuthenticated) {
      setRequireLoginModalOpen(true);
    } else {
      setSelectedFoodType("all");
      setSearchTerm("");
    }
  };

  const resetAllFilters = () => {
    setSearchTerm("");
    setSelectedFoodType("all");
    setShowBookmarksOnly(false);
  };

  return (
    <section id="browse" className="max-w-7xl mx-auto px-3 sm:px-6 py-12 sm:py-16 scroll-mt-20">
      {/* Prefecture Banner & Section Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-black uppercase tracking-widest text-red-500 bg-red-950/60 px-3 py-1 rounded-full border border-red-700/60 shadow glow-red">
              📍 {lang === "ja" ? activePrefecture.labelJa : activePrefecture.label} · {lang === "ja" ? "厳選名店リスト" : "Top Verified Spots"}
            </span>
            <span className="text-xs text-zinc-400 font-bold hidden sm:inline">
              ({filteredRestaurants.length} {lang === "ja" ? "店舗掲載中" : "Available"})
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            {lang === "ja"
              ? `${activePrefecture.labelJa}の至高の名店・味処`
              : `Best Establishments in ${activePrefecture.label}`}
          </h2>

          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            {lang === "ja"
              ? `※ ${activePrefecture.labelJa}内のみの店舗を厳選表示しています (他府県の店舗は混ざりません)`
              : `Curated exclusively within ${activePrefecture.label} (No other prefecture overlap)`}
          </p>
        </div>

        {/* View All & Filter Reset Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <button
            type="button"
            onClick={handleViewAllClick}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-black bg-zinc-900 hover:bg-zinc-800 border border-red-500/40 text-red-400 hover:text-white transition-all shadow glow-red"
          >
            <span>{t.viewAll}</span>
            <span>({filteredRestaurants.length}店)</span>
            {!isAuthenticated && <span className="text-[10px] text-zinc-400">🔒</span>}
          </button>

          <button
            type="button"
            onClick={() => setShowBookmarksOnly((v) => !v)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold transition-all ${
              showBookmarksOnly
                ? "bg-red-600 text-white glow-red"
                : "bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-white/10"
            }`}
          >
            <span>★</span>
            <span className="hidden xs:inline">{t.onlyBookmarked}</span>
            <span className="w-4 h-4 rounded-full bg-white/20 text-white flex items-center justify-center text-[9px] font-bold">
              {bookmarks.length}
            </span>
          </button>
        </div>
      </div>

      {/* Glassmorphism Control Panel */}
      <div className="bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-3.5 sm:p-6 mb-8 space-y-4 shadow-2xl glass-panel">
        {/* Search input with live clear */}
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 text-sm">
            🔍
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={
              lang === "ja"
                ? `${activePrefecture.labelJa}内の店舗名、ラーメン、寿司、エリアで検索…`
                : `Search in ${activePrefecture.label} by restaurant name, sushi, ramen, area…`
            }
            className="w-full pl-11 pr-10 py-3 rounded-2xl bg-zinc-950/80 border border-white/10 text-white placeholder:text-zinc-500 text-xs sm:text-sm focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all font-medium"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white text-xs"
            >
              ✕
            </button>
          )}
        </div>

        {/* Ken Selector Quick Pills & Food Filter Quick Button */}
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          {/* Ken Switcher Buttons */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {PREFECTURES.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelectedKen(p.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                  selectedKen === p.id
                    ? "bg-red-600 text-white glow-red shadow-md"
                    : "bg-zinc-800/80 text-zinc-400 hover:text-white border border-white/5"
                }`}
              >
                {lang === "ja" ? p.labelJa : p.label}
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-zinc-500 text-[11px]">{t.searchFilterSort}:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-zinc-800 text-zinc-200 border border-white/10 rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-red-500 text-xs font-medium"
            >
              <option value="rating">{t.sortTopRated}</option>
              <option value="reviews">{t.sortMostReviewed}</option>
              <option value="priceAsc">{t.sortPriceAsc}</option>
              <option value="priceDesc">{t.sortPriceDesc}</option>
            </select>
          </div>
        </div>

        {/* Food Type Quick Row (Synchronized with Navbar Food Filter) */}
        <div className="pt-2 border-t border-white/5 flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedFoodType === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedFoodType(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
                  isSelected
                    ? "bg-red-950/70 border border-red-500 text-red-300 shadow glow-red"
                    : "bg-zinc-950/70 text-zinc-400 hover:text-white border border-white/5"
                }`}
              >
                <span>{cat.emoji}</span>
                <span>{lang === "ja" ? cat.ja : cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* RESTAURANT GRID — 2 BOXES PER ROW ON MOBILE, 3-4 ON DESKTOP */}
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
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6">
          {filteredRestaurants.map((shop) => {
            const bookmarked = isBookmarked(shop.id);
            return (
              <div
                key={shop.id}
                className="group relative flex flex-col overflow-hidden rounded-2xl sm:rounded-3xl bg-zinc-900/90 border border-white/10 hover:border-red-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-red-950/40 cursor-pointer glass-panel"
                onClick={() => setActiveRestaurant(shop)}
              >
                {/* Photo Area (Tightly proportioned for 2-column mobile viewing) */}
                <div className="relative h-36 sm:h-48 md:h-52 w-full overflow-hidden bg-zinc-950 shrink-0">
                  <Image
                    src={shop.image}
                    alt={shop.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-black/40" />

                  {/* Top Badge (Compact on mobile) */}
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
                      bookmarked
                        ? "bg-red-600 text-white glow-red shadow"
                        : "bg-black/60 text-white hover:bg-black/80"
                    }`}
                    aria-label="Bookmark"
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

                {/* Card Content Body (Exquisite spacing for 2-column mobile) */}
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

                    <p className="text-[10px] sm:text-xs text-zinc-400 line-clamp-1 mt-0.5">
                      {lang === "ja" ? shop.name : shop.nameJa}
                    </p>

                    <p className="text-[10px] sm:text-xs text-zinc-300 mt-1.5 line-clamp-2 leading-relaxed">
                      {lang === "ja" ? shop.taglineJa : shop.tagline}
                    </p>
                  </div>

                  {/* Price & Action Footer */}
                  <div className="pt-2 border-t border-white/5 space-y-1">
                    <div className="flex justify-between items-center text-[10px] sm:text-xs font-mono">
                      <span className="text-zinc-400 truncate max-w-[70%]">
                        {shop.averageSpend}
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

      {/* Modal Popup with Full Glassmorphic Details & Booking System */}
      <RestaurantDetailModal
        restaurant={activeRestaurant}
        onClose={() => setActiveRestaurant(null)}
      />
    </section>
  );
}
