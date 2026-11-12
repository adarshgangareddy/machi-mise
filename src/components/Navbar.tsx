"use client";

import React, { useState } from "react";
import Link from "next/link";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { lang, t } = useLanguage();
  const { user, isAuthenticated, logout, bookmarks } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-zinc-950/85 backdrop-blur-xl border-b border-white/5 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-red-800 text-white font-black text-xl shadow-lg glow-red group-hover:scale-105 transition-all">
            店
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-base font-black tracking-wider text-white uppercase group-hover:text-red-400 transition-colors">
              {t.brandName}
            </span>
            <span className="text-[10px] font-semibold text-zinc-500 tracking-widest">
              {t.brandSub}
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-400">
          <Link href="#browse" className="hover:text-white transition-colors">
            {t.navBrowse}
          </Link>
          <Link href="#categories" className="hover:text-white transition-colors">
            {t.navCategories}
          </Link>
          <Link href="#featured" className="hover:text-white transition-colors">
            {t.navTopRated}
          </Link>
          <Link href="#about" className="hover:text-white transition-colors">
            {t.navAbout}
          </Link>
        </nav>

        {/* Right Section: Language Switcher + Auth / Profile */}
        <div className="hidden sm:flex items-center gap-3">
          <LanguageSwitcher />

          {/* Bookmarks Counter */}
          <Link
            href="#browse"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-xs font-semibold text-zinc-300 transition-colors"
            title={t.navMyList}
          >
            <span className="text-amber-400">★</span>
            <span className="hidden lg:inline">{t.navMyList}</span>
            <span className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center text-[10px] font-bold">
              {bookmarks.length}
            </span>
          </Link>

          {/* User Auth State */}
          {isAuthenticated && user ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setUserDropdownOpen((v) => !v)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-white/10 hover:border-red-500/50 transition-all text-xs font-semibold text-white"
              >
                <span className="w-6 h-6 rounded-full bg-red-600/30 border border-red-500/50 flex items-center justify-center text-xs">
                  👤
                </span>
                <span className="max-w-[100px] truncate">{user.phone}</span>
                <span className="text-zinc-500 text-[10px]">▼</span>
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-zinc-900 border border-white/10 shadow-2xl p-2 z-50 animate-fade-in-up">
                  <div className="p-3 border-b border-white/5">
                    <p className="text-xs font-bold text-white">{user.name}</p>
                    <p className="text-[11px] text-zinc-400">{user.phone}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-medium bg-red-950/60 text-red-300 border border-red-800/40">
                      Verified Member
                    </span>
                  </div>
                  <div className="py-1">
                    <Link
                      href="/onboarding"
                      onClick={() => setUserDropdownOpen(false)}
                      className="block w-full text-left px-3 py-2 text-xs text-zinc-300 hover:bg-white/5 rounded-lg transition-colors"
                    >
                      ⚙️ Onboarding Preferences
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-red-400 hover:bg-red-950/30 rounded-lg transition-colors flex items-center justify-between"
                    >
                      <span>{t.navLogOut}</span>
                      <span>🚪</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="text-xs font-semibold text-zinc-300 hover:text-white px-3 py-2 transition-colors"
              >
                {t.navLogIn}
              </Link>
              <Link
                href="/login"
                className="text-xs font-bold px-4 py-2 rounded-full bg-red-600 hover:bg-red-500 text-white transition-all shadow-md glow-red"
              >
                {t.navListBusiness}
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center gap-2">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="p-2 rounded-xl bg-zinc-900 border border-white/10 text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-white/5 bg-zinc-950/95 backdrop-blur-xl px-4 py-6 space-y-4 animate-fade-in-up">
          <nav className="flex flex-col gap-3 text-sm font-semibold text-zinc-300">
            <Link
              href="#browse"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl bg-zinc-900/60 hover:bg-zinc-800"
            >
              🔍 {t.navBrowse}
            </Link>
            <Link
              href="#categories"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl bg-zinc-900/60 hover:bg-zinc-800"
            >
              🍱 {t.navCategories}
            </Link>
            <Link
              href="#featured"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl bg-zinc-900/60 hover:bg-zinc-800"
            >
              ⭐ {t.navTopRated}
            </Link>
            <Link
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl bg-zinc-900/60 hover:bg-zinc-800"
            >
              🏯 {t.navAbout}
            </Link>
          </nav>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            {isAuthenticated && user ? (
              <div className="p-3 rounded-2xl bg-zinc-900 border border-white/10 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-white">{user.name}</span>
                  <span className="text-xs text-zinc-400">{user.phone}</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2 text-center text-xs font-bold text-red-400 bg-red-950/30 rounded-xl"
                >
                  {t.navLogOut}
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 py-3 rounded-xl bg-zinc-900 border border-white/10 text-center text-xs font-bold text-white"
                >
                  {t.navLogIn}
                </Link>
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 py-3 rounded-xl bg-red-600 text-center text-xs font-bold text-white glow-red"
                >
                  {t.navListBusiness}
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
