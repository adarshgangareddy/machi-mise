"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useFilter, PREFECTURES } from "@/context/FilterContext";

export default function CommunityShareAndPlatforms() {
  const { lang } = useLanguage();
  const { setSelectedKen } = useFilter();
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const shareText = encodeURIComponent(
    "Discover authentic Japan through its greatest kitchens on machi-mise (まちの店) — Verified directory & food appointments!"
  );

  const platforms = [
    { name: "東京都 Tokyo", kenId: "tokyo", count: "12+ Verified", emoji: "🗼" },
    { name: "大阪府 Osaka", kenId: "osaka", count: "12+ Verified", emoji: "🏯" },
    { name: "京都府 Kyoto", kenId: "kyoto", count: "5+ Historic", emoji: "⛩️" },
    { name: "福岡県 Fukuoka", kenId: "fukuoka", count: "5+ Hakata", emoji: "🍜" },
    { name: "北海道 Sapporo", kenId: "all", count: "Coming Soon", emoji: "❄️" },
    { name: "愛知県 Nagoya", kenId: "all", count: "Coming Soon", emoji: "🍤" },
    { name: "広島県 Hiroshima", kenId: "all", count: "Coming Soon", emoji: "🥞" },
  ];

  const badges = [
    "⭐️ Michelin Starred",
    "🍣 Edomae Mastery",
    "🏮 100-Year Heritage",
    "🇬🇧 English Menus",
    "💳 Card Accepted",
    "⚡️ Advance Deposit",
    "🍵 No Smoking",
    "🌱 Vegetarian Friendly",
    "🥩 A5 Wagyu Certified",
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      
      {/* 1. COMMUNITY SHARE BOX (Inspired by user's reference Image 5: "106,288 PEOPLE HAVE SHARED THIS SITE") */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-zinc-900/90 to-zinc-950/90 border border-white/10 p-6 sm:p-10 text-center space-y-5 shadow-2xl glass-panel">
        
        {/* Glow ambient background dot */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-20 bg-red-600/20 blur-3xl pointer-events-none" />

        <div className="space-y-1 relative z-10">
          <div className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-400 to-amber-300 font-mono tracking-tight drop-shadow">
            128,490
          </div>
          <p className="text-xs sm:text-sm font-black uppercase tracking-widest text-zinc-300">
            {lang === "ja" ? "食通・旅行者が当サイトをシェア中" : "Food Lovers Have Shared This Directory"}
          </p>
          <p className="text-xs text-zinc-400 max-w-md mx-auto pt-1">
            {lang === "ja"
              ? "日本の本物の名店・職人の味を世界へ。お友達や旅仲間にシェアしてください！"
              : "Help others discover genuine Japanese master kitchens & reservation secrets — share with friends!"}
          </p>
        </div>

        {/* Share Buttons (WhatsApp, Telegram, LINE / Facebook, Copy Link) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto relative z-10">
          {/* WhatsApp */}
          <a
            href={`https://api.whatsapp.com/send?text=${shareText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition-all hover:scale-105"
          >
            <span className="text-base">💬</span>
            <span>WhatsApp</span>
          </a>

          {/* Telegram */}
          <a
            href={`https://t.me/share/url?url=https://machi-mise.jp&text=${shareText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs shadow-lg transition-all hover:scale-105"
          >
            <span className="text-base">✈️</span>
            <span>Telegram</span>
          </a>

          {/* LINE / Social */}
          <a
            href={`https://social-plugins.line.me/lineit/share?url=https://machi-mise.jp`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-[#06c755] hover:brightness-110 text-white font-bold text-xs shadow-lg transition-all hover:scale-105"
          >
            <span className="text-base">🟢</span>
            <span>LINE / SNS</span>
          </a>

          {/* Copy Link */}
          <button
            type="button"
            onClick={handleCopyLink}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-white/10 font-bold text-xs transition-all hover:scale-105"
          >
            <span className="text-base">{copied ? "✓" : "🔗"}</span>
            <span>{copied ? (lang === "ja" ? "コピー完了!" : "Copied!") : (lang === "ja" ? "URLコピー" : "Copy Link")}</span>
          </button>
        </div>
      </div>

      {/* 2. AVAILABLE EVERYWHERE / PREFECTURES & BADGES (Inspired by user's reference Image 8) */}
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center justify-center gap-2">
            <span>Available</span>
            <span className="text-red-500">Everywhere</span>
          </h3>
          <div className="w-12 h-1 bg-red-600 rounded-full mx-auto glow-red" />
          <p className="text-xs text-zinc-400">
            {lang === "ja" ? "日本全国の主要都市と食の都を網羅" : "Direct access to top dining capitals across Japan"}
          </p>
        </div>

        {/* Prefectures Pill Cloud */}
        <div className="space-y-3">
          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 block">
            {lang === "ja" ? "対象都道府県・都市" : "COVERED PREFECTURES & REGIONS"}
          </span>
          <div className="flex flex-wrap justify-center gap-2.5 max-w-3xl mx-auto">
            {platforms.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  if (p.kenId !== "all") {
                    setSelectedKen(p.kenId as any);
                    const el = document.getElementById("browse");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all border ${
                  p.kenId !== "all"
                    ? "bg-zinc-900/90 text-zinc-200 border-white/10 hover:border-red-500 hover:text-white hover:bg-red-950/40 glow-red"
                    : "bg-zinc-950/40 text-zinc-600 border-white/5 cursor-not-allowed"
                }`}
              >
                <span>{p.emoji} {p.name}</span>
                <span className="ml-1.5 text-[10px] opacity-60 font-mono">({p.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Quality Badges */}
        <div className="space-y-3 pt-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 block">
            {lang === "ja" ? "厳選基準・サービス対応" : "CURATION STANDARDS & FEATURES"}
          </span>
          <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
            {badges.map((b, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-xl bg-zinc-900/60 border border-white/5 text-zinc-300 text-xs font-medium"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

