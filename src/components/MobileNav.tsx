"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";

export default function MobileNav() {
  const pathname = usePathname();
  const { lang, t } = useLanguage();
  const { bookmarks, isAuthenticated } = useAuth();

  const NAV_ITEMS = [
    { label: lang === "ja" ? "ホーム" : "Home", href: "/", icon: "🏠" },
    { label: lang === "ja" ? "検索" : "Browse", href: "#browse", icon: "🔍" },
    { label: lang === "ja" ? "ジャンル" : "Categories", href: "#categories", icon: "🍱" },
    {
      label: lang === "ja" ? "保存済み" : "My List",
      href: "#browse",
      icon: "★",
      badge: bookmarks.length,
    },
    {
      label: isAuthenticated ? (lang === "ja" ? "マイページ" : "Account") : (lang === "ja" ? "ログイン" : "Login"),
      href: "/login",
      icon: "👤",
    },
  ];

  return (
    <nav className="fixed bottom-3 left-4 right-4 z-40 sm:hidden">
      <div className="mx-auto max-w-md rounded-full bg-zinc-900/90 backdrop-blur-xl border border-white/15 px-4 py-2.5 shadow-2xl">
        <div className="flex items-center justify-around">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className="relative flex flex-col items-center gap-1 group py-1 px-2"
              >
                <div className="relative">
                  <span className="text-lg transition-transform group-active:scale-90">
                    {item.icon}
                  </span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="absolute -top-1.5 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[9px] font-bold text-white shadow-md glow-red">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span
                  className={`text-[10px] font-medium tracking-tight transition-colors ${
                    isActive ? "text-red-500 font-bold" : "text-zinc-400 group-hover:text-zinc-200"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
