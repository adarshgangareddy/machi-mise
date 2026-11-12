"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Restaurant } from "@/data/restaurants";
import { useLanguage } from "@/context/LanguageContext";

interface InteractiveDiningMapProps {
  restaurants: Restaurant[];
  selectedRestaurant: Restaurant | null;
  onSelectRestaurant: (r: Restaurant) => void;
  onBookRestaurant: (r: Restaurant) => void;
}

export default function InteractiveDiningMap({
  restaurants,
  selectedRestaurant,
  onSelectRestaurant,
  onBookRestaurant,
}: InteractiveDiningMapProps) {
  const { lang } = useLanguage();
  const [zoomLevel, setZoomLevel] = useState(1);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Default coordinate anchor around Minato / Shibakoen / Ginza Tokyo
  // lat range ~ 35.6500 to 35.6750 (height ~ 0.025)
  // lng range ~ 35.7100 to 139.7750 (width ~ 0.065)
  const minLat = 35.6480;
  const maxLat = 35.6780;
  const minLng = 139.7100;
  const maxLng = 139.7780;

  // Convert lat/lng to percentage in SVG viewBox (800x650)
  const getCoordinates = (r: Restaurant, idx: number) => {
    if (r.coordinates) {
      const xPercent = ((r.coordinates.lng - minLng) / (maxLng - minLng)) * 100;
      const yPercent = (1 - (r.coordinates.lat - minLat) / (maxLat - minLat)) * 100;
      return {
        x: Math.max(10, Math.min(90, xPercent)),
        y: Math.max(10, Math.min(90, yPercent)),
      };
    }
    // Fallback spread
    const fallbackPositions = [
      { x: 48, y: 55 },
      { x: 52, y: 68 },
      { x: 68, y: 35 },
      { x: 28, y: 42 },
      { x: 74, y: 22 },
      { x: 38, y: 78 },
    ];
    return fallbackPositions[idx % fallbackPositions.length];
  };

  const activeShop = selectedRestaurant || (hoveredId ? restaurants.find((r) => r.id === hoveredId) : null);

  return (
    <div className="relative w-full h-[580px] sm:h-[680px] rounded-3xl overflow-hidden border border-white/10 bg-[#e5ece8] dark:bg-[#1a2128] shadow-2xl transition-all">
      
      {/* 1. MAP BACKGROUND ROADS & PARKS CANVAS (Stylized vector map matching Image 2) */}
      <svg
        className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none opacity-85"
        viewBox="0 0 800 650"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background land */}
        <rect width="800" height="650" fill="#eef3f0" className="dark:fill-[#1b2228]" />

        {/* Parks & Greenery (Shiba Park, Imperial Palace gardens, Hamarikyu) */}
        <path
          d="M320 320 C360 300, 420 340, 440 400 C430 460, 360 480, 310 440 Z"
          fill="#cde5d3"
          className="dark:fill-[#213327]"
        />
        <path
          d="M600 420 C640 410, 680 430, 700 480 C680 540, 610 550, 580 500 Z"
          fill="#cde5d3"
          className="dark:fill-[#213327]"
        />
        <path
          d="M200 120 C240 100, 300 120, 320 180 C300 220, 220 220, 190 180 Z"
          fill="#cde5d3"
          className="dark:fill-[#213327]"
        />

        {/* Waterway / Tokyo Bay Canal edge */}
        <path
          d="M660 0 C640 150, 690 320, 720 460 C750 560, 800 620, 800 650 L800 0 Z"
          fill="#b7daf0"
          className="dark:fill-[#152a3a]"
        />

        {/* Major Expressways (Orange & Yellow double lines matching user's Image 2) */}
        <path
          d="M0 240 Q380 280, 480 480 T800 520"
          stroke="#f89c42"
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.9"
        />
        <path
          d="M0 240 Q380 280, 480 480 T800 520"
          stroke="#ffffff"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        <path
          d="M480 0 Q460 260, 390 420 T360 650"
          stroke="#f9bc48"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M480 0 Q460 260, 390 420 T360 650"
          stroke="#ffffff"
          strokeWidth="2"
        />

        {/* Secondary Street Network Grid */}
        <path
          d="M50 80 L750 80 M50 180 L750 180 M50 360 L750 360 M50 520 L750 520"
          stroke="#cfded5"
          strokeWidth="2"
          className="dark:stroke-[#293640]"
        />
        <path
          d="M120 20 L120 620 M260 20 L260 620 M420 20 L420 620 M580 20 L580 620 M700 20 L700 620"
          stroke="#cfded5"
          strokeWidth="2"
          className="dark:stroke-[#293640]"
        />

        {/* Major District Labels in Tokyo (Minato, Shibakoen, Roppongi, Akasaka) */}
        <text x="360" y="470" fill="#5a7065" className="dark:fill-[#8fa397] font-black text-2xl tracking-widest opacity-40">
          MINATO
        </text>
        <text x="210" y="270" fill="#5a7065" className="dark:fill-[#8fa397] font-bold text-lg tracking-wider opacity-35">
          Akasaka
        </text>
        <text x="540" y="210" fill="#5a7065" className="dark:fill-[#8fa397] font-bold text-lg tracking-wider opacity-35">
          Ginza
        </text>
        <text x="370" y="380" fill="#3b7a57" className="dark:fill-[#5fb384] font-bold text-sm tracking-wide opacity-50">
          Shiba Park 🌲
        </text>
        <text x="140" y="340" fill="#5a7065" className="dark:fill-[#8fa397] font-bold text-sm tracking-wider opacity-35">
          Roppongi
        </text>
      </svg>

      {/* 2. Top Map Controls & Location Bar */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20 pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 dark:bg-zinc-950/90 shadow-md border border-black/10 dark:border-white/10 backdrop-blur text-xs font-bold text-zinc-800 dark:text-zinc-200">
          <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
          <span>📍 Minato-ku & Ginza, Tokyo</span>
          <span className="text-zinc-400 font-mono text-[10px]">({restaurants.length} spots)</span>
        </div>

        {/* Zoom Stepper */}
        <div className="pointer-events-auto flex items-center rounded-xl bg-white/95 dark:bg-zinc-950/90 border border-black/10 dark:border-white/10 shadow-md overflow-hidden text-xs font-bold text-zinc-800 dark:text-zinc-200">
          <button
            type="button"
            onClick={() => setZoomLevel((z) => Math.min(1.4, z + 0.1))}
            className="px-2.5 py-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            +
          </button>
          <button
            type="button"
            onClick={() => setZoomLevel((z) => Math.max(0.8, z - 0.1))}
            className="px-2.5 py-1.5 border-l border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            -
          </button>
        </div>
      </div>

      {/* 3. INTERACTIVE PINS (Circular restaurant photos matching Image 2 pins!) */}
      <div className="absolute inset-0 z-10">
        {restaurants.map((shop, idx) => {
          const coords = getCoordinates(shop, idx);
          const isSelected = selectedRestaurant?.id === shop.id;
          const isHovered = hoveredId === shop.id;

          return (
            <div
              key={shop.id}
              style={{
                left: `${coords.x}%`,
                top: `${coords.y}%`,
                transform: "translate(-50%, -50%)",
              }}
              className="absolute z-20 cursor-pointer group"
              onClick={() => onSelectRestaurant(shop)}
              onMouseEnter={() => setHoveredId(shop.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Outer pulsing ring */}
              <div
                className={`relative flex items-center justify-center transition-all duration-300 ${
                  isSelected || isHovered
                    ? "scale-125 z-30"
                    : "scale-100 hover:scale-115"
                }`}
              >
                {/* Pin shadow */}
                <div className="absolute -bottom-1.5 w-6 h-2 bg-black/40 rounded-full blur-[2px]" />

                {/* Circular image pin with red/gold border (Exact pin look in Image 2) */}
                <div
                  className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden p-0.5 shadow-xl transition-all ${
                    isSelected
                      ? "ring-4 ring-red-600 bg-red-600 scale-110 shadow-red-600/50"
                      : "ring-2 ring-white dark:ring-zinc-900 bg-white dark:bg-zinc-900 group-hover:ring-red-500"
                  }`}
                >
                  <div className="relative w-full h-full rounded-full overflow-hidden bg-zinc-800">
                    <Image
                      src={shop.image}
                      alt={shop.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Rating Badge on top right of pin */}
                <span className="absolute -top-1 -right-1 px-1.5 py-0.2 rounded-full bg-amber-400 text-black text-[9px] font-black shadow-md">
                  ★{shop.rating}
                </span>

                {/* Tooltip on hover */}
                {(isHovered || isSelected) && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 rounded-xl bg-zinc-950 text-white border border-white/10 shadow-2xl z-40 text-left pointer-events-none animate-fade-in-up">
                    <p className="text-[11px] font-black truncate">{lang === "ja" ? shop.nameJa : shop.name}</p>
                    <div className="flex justify-between items-center text-[9px] text-zinc-400 mt-0.5">
                      <span>{shop.distanceStation || shop.nearestStationJa}</span>
                      <span className="text-amber-400 font-bold">{shop.priceTier}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. BOTTOM FLOATING RESTAURANT PREVIEW CARD (When a pin is active) */}
      {activeShop && (
        <div className="absolute bottom-3 left-3 right-3 z-30 p-3 sm:p-4 rounded-2xl bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-2xl animate-fade-in-up">
          <div className="flex items-center gap-3">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 bg-zinc-900">
              <Image
                src={activeShop.image}
                alt={activeShop.name}
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-red-600 text-white">
                  {activeShop.badge || "Verified"}
                </span>
                <span className="text-[10px] text-zinc-500 font-mono truncate">
                  {activeShop.distanceStation || activeShop.nearestStationJa}
                </span>
              </div>
              <h4 className="text-xs sm:text-sm font-black text-zinc-900 dark:text-white truncate mt-0.5">
                {lang === "ja" ? activeShop.nameJa : activeShop.name}
              </h4>
              <p className="text-[10px] text-zinc-600 dark:text-zinc-400 truncate">
                🌙 {activeShop.dinnerSpend || activeShop.averageSpend} · ☀️ {activeShop.lunchSpend || "¥4,000"}
              </p>
            </div>
            <div className="flex flex-col gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => onBookRestaurant(activeShop)}
                className="px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-[11px] shadow glow-red transition-all"
              >
                {lang === "ja" ? "今すぐ予約" : "Book Table"}
              </button>
              <Link
                href={`/shop/${activeShop.id}`}
                className="px-3 py-1 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-center font-bold text-[10px] hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
              >
                {lang === "ja" ? "詳細を見る ↗" : "View Shop ↗"}
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
