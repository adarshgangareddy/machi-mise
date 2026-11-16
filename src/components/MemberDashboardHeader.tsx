"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { useFilter, PREFECTURES } from "@/context/FilterContext";

export default function MemberDashboardHeader() {
  const { user, bookmarks } = useAuth();
  const { lang } = useLanguage();
  const { selectedKen, setSelectedKen } = useFilter();

  const activePrefecture = PREFECTURES.find((p) => p.id === selectedKen) || PREFECTURES[1];

  return (
    <div className="relative border-b border-white/5 bg-zinc-950/60 dark:bg-zinc-950/60 backdrop-blur-xl px-4 sm:px-6 py-6 sm:py-8 animate-fade-in-up">
      {/* Subtle ambient glow */}
      <div className="absolute top-0 right-1/4 w-96 h-28 bg-red-600/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Left: User Welcome & VIP Status */}
        <div className="flex items-center gap-4">
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-red-600 to-red-800 p-0.5 shadow-xl glow-red shrink-0 flex items-center justify-center">
            <div className="w-full h-full rounded-2xl bg-zinc-900 flex items-center justify-center text-2xl sm:text-3xl">
              👤
            </div>
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-zinc-950 animate-pulse" />
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-red-950/80 text-red-300 border border-red-800/40 glow-red">
                ● Verified Member
              </span>
              <span className="text-xs text-zinc-400 font-mono hidden sm:inline">
                {user?.phone || "+81 090-1234-5678"}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1">
              {lang === "ja"
                ? `おかえりなさい、${user?.name || "探索者"} 様`
                : `Welcome back, ${user?.name || "Explorer"}!`}
            </h1>

            <p className="text-xs text-zinc-400 mt-0.5">
              {lang === "ja"
                ? `${activePrefecture.labelJa}の特選レストランと会員専用予約枠`
                : `VIP access to verified tables & private omakase bookings in ${activePrefecture.label}`}
            </p>
          </div>
        </div>

        {/* Right: Quick Member Metric Stats & Filter Pills */}
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1">
          {/* Saved Spots Shortcut */}
          <Link
            href="#browse"
            className="flex items-center gap-3 p-3 rounded-2xl bg-zinc-900/80 border border-white/10 hover:border-red-500/50 transition-all group shrink-0 glass-panel shadow-md"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-lg text-amber-400">
              ★
            </div>
            <div className="text-left pr-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">
                {lang === "ja" ? "お気に入り保存" : "Saved Venues"}
              </span>
              <span className="text-sm font-black text-white group-hover:text-red-400 transition-colors">
                {bookmarks.length} {lang === "ja" ? "店舗" : "Shops"}
              </span>
            </div>
          </Link>

          {/* Active Appointments */}
          <Link
            href="#browse"
            className="flex items-center gap-3 p-3 rounded-2xl bg-zinc-900/80 border border-white/10 hover:border-red-500/50 transition-all group shrink-0 glass-panel shadow-md"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-lg text-emerald-400">
              ⚡️
            </div>
            <div className="text-left pr-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">
                {lang === "ja" ? "予約ステータス" : "Appointments"}
              </span>
              <span className="text-sm font-black text-white group-hover:text-emerald-400 transition-colors">
                {lang === "ja" ? "1件 確定済み" : "1 Confirmed"}
              </span>
            </div>
          </Link>

          {/* Quick Prefecture Changer */}
          <div className="p-3 rounded-2xl bg-zinc-900/80 border border-white/10 shrink-0 glass-panel shadow-md hidden lg:flex flex-col justify-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">
              {lang === "ja" ? "現在地 (Ken)" : "Active City"}
            </span>
            <div className="flex gap-1.5 mt-1">
              {PREFECTURES.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedKen(p.id)}
                  className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition-all ${
                    selectedKen === p.id
                      ? "bg-red-600 text-white shadow glow-red"
                      : "bg-zinc-800 text-zinc-400 hover:text-white"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
