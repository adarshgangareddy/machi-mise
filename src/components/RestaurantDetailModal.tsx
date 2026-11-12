"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Restaurant } from "@/data/restaurants";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";

interface RestaurantDetailModalProps {
  restaurant: Restaurant | null;
  onClose: () => void;
}

export default function RestaurantDetailModal({
  restaurant,
  onClose,
}: RestaurantDetailModalProps) {
  const { lang, t } = useLanguage();
  const { isBookmarked, toggleBookmark } = useAuth();
  const [copied, setCopied] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (restaurant) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [restaurant, onClose]);

  if (!restaurant) return null;

  const bookmarked = isBookmarked(restaurant.id);
  const currentImage = restaurant.gallery[activeImageIndex] || restaurant.image;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(lang === "ja" ? restaurant.addressJa : restaurant.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-fade-in-up">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl my-8 overflow-hidden rounded-3xl bg-zinc-900 border border-white/10 shadow-2xl z-10 max-h-[90vh] flex flex-col">
        {/* Top Image Banner */}
        <div className="relative h-64 sm:h-80 w-full shrink-0 overflow-hidden bg-zinc-950">
          <Image
            src={currentImage}
            alt={restaurant.name}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover transition-all duration-500"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent" />

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur hover:bg-black/80 transition-colors"
            aria-label={t.modalClose}
          >
            ✕
          </button>

          {/* Badge & Category Pill */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-600 text-white shadow-md glow-red">
              {lang === "ja" ? restaurant.badgeJa || restaurant.badge : restaurant.badge}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-black/60 text-zinc-300 backdrop-blur border border-white/10">
              {restaurant.categoryEmoji} {lang === "ja" ? restaurant.categoryJa : restaurant.category}
            </span>
          </div>

          {/* Gallery Thumbnails */}
          {restaurant.gallery.length > 1 && (
            <div className="absolute bottom-4 right-4 flex gap-2 z-10">
              {restaurant.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-12 h-10 rounded-lg overflow-hidden border-2 transition-all relative ${
                    activeImageIndex === idx ? "border-red-500 scale-105" : "border-white/30 opacity-70"
                  }`}
                >
                  <Image src={img} alt="" fill sizes="48px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8 flex-1">
          {/* Header Title & Rating */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-red-500 uppercase tracking-widest mb-1">
                <span>📍 {lang === "ja" ? restaurant.areaJa : restaurant.area}</span>
                <span>·</span>
                <span>{lang === "ja" ? restaurant.cityJa : restaurant.city}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                {lang === "ja" ? restaurant.nameJa : restaurant.name}
              </h2>
              <p className="text-sm text-zinc-400 mt-0.5">
                {lang === "ja" ? restaurant.name : restaurant.nameJa}
              </p>
              <p className="text-sm font-medium text-zinc-300 italic mt-2">
                "{lang === "ja" ? restaurant.taglineJa : restaurant.tagline}"
              </p>
            </div>

            <div className="flex flex-col sm:items-end gap-2 shrink-0">
              <div className="flex items-center gap-2 bg-zinc-800/80 px-3.5 py-1.5 rounded-xl border border-white/10">
                <span className="text-amber-400 font-bold text-lg">★ {restaurant.rating}</span>
                <span className="text-xs text-zinc-400">
                  ({restaurant.reviewsCount.toLocaleString()})
                </span>
              </div>
              <div className="text-xs text-zinc-400">
                <span>{restaurant.priceTier}</span>
                <span className="mx-1.5">·</span>
                <span className="text-zinc-300 font-medium">{restaurant.averageSpend}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions: Save, Map, Copy */}
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => toggleBookmark(restaurant.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                bookmarked
                  ? "bg-red-600 text-white glow-red"
                  : "bg-zinc-800 hover:bg-zinc-700 text-white border border-white/10"
              }`}
            >
              <span>{bookmarked ? "★" : "☆"}</span>
              <span>{bookmarked ? t.savedBtn : t.saveToListBtn}</span>
            </button>

            <a
              href={restaurant.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold bg-white text-zinc-950 hover:bg-zinc-200 transition-colors"
            >
              <span>🗺️</span>
              <span>{t.modalViewMap}</span>
            </a>

            <button
              type="button"
              onClick={handleCopyAddress}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-white/10 transition-colors"
            >
              <span>{copied ? "✓" : "📋"}</span>
              <span>{copied ? t.modalCopied : t.modalCopyAddress}</span>
            </button>
          </div>

          {/* Story & Description */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              {lang === "ja" ? "店舗ストーリー・特徴" : "Story & Philosophy"}
            </h3>
            <p className="text-zinc-300 leading-relaxed text-sm sm:text-base">
              {lang === "ja" ? restaurant.descriptionJa : restaurant.description}
            </p>
          </div>

          {/* Signature Dishes */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              {t.modalSignatures}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {restaurant.signatures.map((dish, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-zinc-950/60 border border-white/5 space-y-1.5"
                >
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="font-bold text-white text-sm">
                      {lang === "ja" ? dish.nameJa : dish.name}
                    </h4>
                    <span className="text-xs font-bold text-red-400 shrink-0 bg-red-950/40 px-2 py-0.5 rounded border border-red-800/40">
                      {dish.price}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">{dish.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Essential Info Grid */}
          <div className="rounded-2xl bg-zinc-950/60 border border-white/5 p-5 space-y-3 text-xs sm:text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-zinc-500 block mb-0.5">{t.modalAddress}</span>
                <span className="text-white font-medium">
                  {lang === "ja" ? restaurant.addressJa : restaurant.address}
                </span>
              </div>
              <div>
                <span className="text-zinc-500 block mb-0.5">{t.modalPhone}</span>
                <a
                  href={`tel:${restaurant.phone}`}
                  className="text-red-400 hover:underline font-mono"
                >
                  {restaurant.phone}
                </a>
              </div>
              <div>
                <span className="text-zinc-500 block mb-0.5">{t.modalHours}</span>
                <span className="text-white">
                  {lang === "ja" ? restaurant.hoursJa : restaurant.hours}
                </span>
              </div>
              <div>
                <span className="text-zinc-500 block mb-0.5">{t.modalClosed}</span>
                <span className="text-white">
                  {lang === "ja" ? restaurant.closedDayJa : restaurant.closedDay}
                </span>
              </div>
            </div>
          </div>

          {/* Features & Atmosphere Tags */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              {t.modalFeatures}
            </h3>
            <div className="flex flex-wrap gap-2">
              {(lang === "ja" ? restaurant.featuresJa : restaurant.features).map((feat, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full text-xs bg-zinc-800 text-zinc-300 border border-white/5"
                >
                  ✓ {feat}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="border-t border-white/10 p-4 sm:p-6 bg-zinc-950/80 flex items-center justify-between">
          <span className="text-xs text-zinc-500">
            {lang === "ja" ? "※ 掲載情報は定期更新されています" : "Verified & updated for 2026"}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-sm transition-colors"
          >
            {t.modalClose}
          </button>
        </div>
      </div>
    </div>
  );
}
