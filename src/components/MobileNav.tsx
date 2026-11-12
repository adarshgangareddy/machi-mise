"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { useFilter } from "@/context/FilterContext";

export default function MobileNav() {
  const pathname = usePathname();
  const { lang } = useLanguage();
  const { bookmarks, isAuthenticated } = useAuth();
  const { setFoodModalOpen, setSelectedFoodType } = useFilter();

  return (
    <nav className="fixed bottom-3 left-3 right-3 z-40 sm:hidden">
      <div className="mx-auto max-w-md rounded-full bg-zinc-950/95 backdrop-blur-2xl border border-white/15 px-3 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.8)] glass-panel">
        <div className="flex items-center justify-around">
          {/* Home */}
          <button
            type="button"
            onClick={() => {
              setSelectedFoodType("all");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex flex-col items-center gap-0.5 group py-1 px-2"
          >
            <span className="text-base transition-transform group-active:scale-90">🏠</span>
            <span
              className={`text-[9px] font-bold ${
                pathname === "/" ? "text-red-500 font-extrabold" : "text-zinc-400"
              }`}
            >
              {lang === "ja" ? "ホーム" : "Home"}
            </span>
          </button>

          {/* Browse */}
          <Link
            href="#browse"
            className="flex flex-col items-center gap-0.5 group py-1 px-2"
          >
            <span className="text-base transition-transform group-active:scale-90">🔍</span>
            <span className="text-[9px] font-bold text-zinc-400">
              {lang === "ja" ? "店舗探す" : "Explore"}
            </span>
          </Link>

          {/* Food Filter Modal Trigger */}
          <button
            type="button"
            onClick={() => setFoodModalOpen(true)}
            className="flex flex-col items-center gap-0.5 group py-1 px-2"
          >
            <span className="text-base transition-transform group-active:scale-90">🍜</span>
            <span className="text-[9px] font-bold text-red-400">
              {lang === "ja" ? "料理絞込" : "Cuisines"}
            </span>
          </button>

          {/* Saved Bookmarks */}
          <Link
            href="#browse"
            className="relative flex flex-col items-center gap-0.5 group py-1 px-2"
          >
            <div className="relative">
              <span className="text-base transition-transform group-active:scale-90">★</span>
              {bookmarks.length > 0 && (
                <span className="absolute -top-1 -right-2 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-red-600 text-[8px] font-bold text-white shadow-md glow-red">
                  {bookmarks.length}
                </span>
              )}
            </div>
            <span className="text-[9px] font-bold text-zinc-400">
              {lang === "ja" ? "保存済み" : "My List"}
            </span>
          </Link>

          {/* Account / Login */}
          <Link
            href="/login"
            className="flex flex-col items-center gap-0.5 group py-1 px-2"
          >
            <span className="text-base transition-transform group-active:scale-90">👤</span>
            <span className="text-[9px] font-bold text-zinc-400">
              {isAuthenticated
                ? lang === "ja" ? "マイ会員" : "Account"
                : lang === "ja" ? "ログイン" : "Login"}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
