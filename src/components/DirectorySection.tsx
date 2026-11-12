"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { REAL_RESTAURANTS, CATEGORIES, CITIES, Restaurant } from "@/data/restaurants";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import RestaurantDetailModal from "@/components/RestaurantDetailModal";

export default function DirectorySection() {
  const { lang, t } = useLanguage();
  const { isBookmarked, toggleBookmark, bookmarks } = useAuth();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCity, setSelectedCity] = useState("all");
  const [sortBy, setSortBy] = useState<"rating" | "reviews" | "priceAsc" | "priceDesc">("rating");
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);
  const [activeRestaurant, setActiveRestaurant] = useState<Restaurant | null>(null);

  // Filter and sort logic
  const filteredRestaurants = useMemo(() => {
    return REAL_RESTAURANTS.filter((r) => {
      // Search query filter (matches English or Japanese name, description, area, city)
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

      // Category filter
      if (selectedCategory !== "all") {
        const catObj = CATEGORIES.find((c) => c.id === selectedCategory);
        if (catObj && !r.category.toLowerCase().includes(catObj.label.toLowerCase().split(" ")[0])) {
          return false;
        }
      }

      // City filter
      if (selectedCity !== "all") {
        if (r.city.toLowerCase() !== selectedCity.toLowerCase()) {
          return false;
        }
      }

      // Bookmarks only filter
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
  }, [searchTerm, selectedCategory, selectedCity, sortBy, showBookmarksOnly, bookmarks]);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedCity("all");
    setShowBookmarksOnly(false);
  };

  return (
    <section id="browse" className="max-w-7xl mx-auto px-4 sm:px-6 py-16 scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-red-500 mb-1 block">
            {lang === "ja" ? "実名掲載・厳選ディレクトリ" : "Verified Real Places"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            {t.searchTitle}
          </h2>
          <p className="text-sm text-zinc-400 mt-1">
            {filteredRestaurants.length} {t.searchResultsCount}
          </p>
        </div>

        {/* Saved List Toggle & Clear Filters */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowBookmarksOnly((v) => !v)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${
              showBookmarksOnly
                ? "bg-red-600 text-white glow-red"
                : "bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-white/10"
            }`}
          >
            <span>{showBookmarksOnly ? "★" : "☆"}</span>
            <span>{t.onlyBookmarked}</span>
            <span className="w-4 h-4 rounded-full bg-white/20 text-white flex items-center justify-center text-[10px]">
              {bookmarks.length}
            </span>
          </button>

          {(searchTerm || selectedCategory !== "all" || selectedCity !== "all" || showBookmarksOnly) && (
            <button
              type="button"
              onClick={resetFilters}
              className="text-xs text-red-400 hover:text-red-300 underline"
            >
              {t.clearFilters}
            </button>
          )}
        </div>
      </div>

      {/* Filter Controls Bar */}
      <div className="bg-zinc-900/80 backdrop-blur border border-white/10 rounded-3xl p-4 sm:p-6 mb-8 space-y-4 shadow-xl">
        {/* Search Input Row */}
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 text-base">
            🔍
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t.heroSearchPlaceholder}
            className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-zinc-950/80 border border-white/10 text-white placeholder:text-zinc-500 text-sm focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white text-sm"
            >
              ✕
            </button>
          )}
        </div>

        {/* City Filter & Sort Dropdown Row */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* City Chips */}
          <div className="flex flex-wrap gap-2">
            {CITIES.map((city) => (
              <button
                key={city.id}
                type="button"
                onClick={() => setSelectedCity(city.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedCity === city.id
                    ? "bg-red-600 text-white glow-red"
                    : "bg-zinc-800 text-zinc-400 hover:text-white border border-white/5"
                }`}
              >
                {lang === "ja" ? city.ja : city.label}
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-zinc-500">{t.searchFilterSort}:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-zinc-800 text-zinc-200 border border-white/10 rounded-xl px-3 py-1.5 focus:outline-none focus:border-red-500"
            >
              <option value="rating">{t.sortTopRated}</option>
              <option value="reviews">{t.sortMostReviewed}</option>
              <option value="priceAsc">{t.sortPriceAsc}</option>
              <option value="priceDesc">{t.sortPriceDesc}</option>
            </select>
          </div>
        </div>

        {/* Category Filter Horizontal Scroll */}
        <div className="pt-2 border-t border-white/5 flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                selectedCategory === cat.id
                  ? "bg-red-950/60 text-red-300 border border-red-700/60"
                  : "bg-zinc-950/60 text-zinc-400 hover:text-white border border-white/5"
              }`}
            >
              <span>{cat.emoji}</span>
              <span>{lang === "ja" ? cat.ja : cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Restaurant Grid or Empty State */}
      {filteredRestaurants.length === 0 ? (
        <div className="text-center py-24 rounded-3xl bg-zinc-900/40 border border-white/5 space-y-4 p-6">
          <div className="text-6xl mb-2">🏮</div>
          <h3 className="text-xl font-bold text-white">{t.noResultsTitle}</h3>
          <p className="text-sm text-zinc-400 max-w-md mx-auto">{t.noResultsSub}</p>
          <button
            type="button"
            onClick={resetFilters}
            className="px-6 py-2.5 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-sm glow-red transition-all"
          >
            {t.clearFilters}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map((shop) => {
            const bookmarked = isBookmarked(shop.id);
            return (
              <div
                key={shop.id}
                className="group relative flex flex-col overflow-hidden rounded-3xl bg-zinc-900 border border-white/10 hover:border-red-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-red-950/30 cursor-pointer"
                onClick={() => setActiveRestaurant(shop)}
              >
                {/* Photo Thumbnail */}
                <div className="relative h-56 w-full overflow-hidden bg-zinc-950">
                  <Image
                    src={shop.image}
                    alt={shop.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-black/30" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    {shop.badge && (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-red-600 text-white shadow-md glow-red">
                        {lang === "ja" ? shop.badgeJa || shop.badge : shop.badge}
                      </span>
                    )}
                  </div>

                  {/* Bookmark Button (Stop propagation so modal doesn't open immediately) */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBookmark(shop.id);
                    }}
                    className={`absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur transition-all ${
                      bookmarked
                        ? "bg-red-600 text-white glow-red"
                        : "bg-black/60 text-white hover:bg-black/90"
                    }`}
                    aria-label="Bookmark"
                  >
                    {bookmarked ? "★" : "☆"}
                  </button>

                  {/* Bottom Image Overlay Details */}
                  <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end text-xs">
                    <span className="px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur text-zinc-300 font-medium">
                      {shop.categoryEmoji} {lang === "ja" ? shop.categoryJa : shop.category}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur font-bold text-amber-400">
                      ★ {shop.rating} <span className="text-zinc-400 font-normal">({shop.reviewsCount.toLocaleString()})</span>
                    </span>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="flex-1 p-5 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="text-xs text-red-400 font-semibold uppercase tracking-wider mb-1">
                      {lang === "ja" ? shop.areaJa : shop.area} · {lang === "ja" ? shop.cityJa : shop.city}
                    </div>
                    <h3 className="text-lg font-black text-white group-hover:text-red-400 transition-colors line-clamp-1">
                      {lang === "ja" ? shop.nameJa : shop.name}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-0.5 line-clamp-1">
                      {lang === "ja" ? shop.name : shop.nameJa}
                    </p>
                    <p className="text-xs text-zinc-300 mt-2 line-clamp-2 leading-relaxed">
                      {lang === "ja" ? shop.taglineJa : shop.tagline}
                    </p>
                  </div>

                  {/* Price Tier & Signature Highlight */}
                  <div className="pt-3 border-t border-white/5 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-zinc-500 font-mono">
                        Spend: <strong className="text-zinc-200">{shop.averageSpend}</strong>
                      </span>
                      <span className="text-zinc-400 font-bold">{shop.priceTier}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1">
                      <span className="text-red-400 font-bold hover:underline flex items-center gap-1">
                        <span>{t.detailsBtn}</span>
                        <span>→</span>
                      </span>
                      <span className="text-[11px] text-zinc-500">
                        {lang === "ja" ? shop.closedDayJa : shop.closedDay}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal Popup for Details */}
      <RestaurantDetailModal
        restaurant={activeRestaurant}
        onClose={() => setActiveRestaurant(null)}
      />
    </section>
  );
}

