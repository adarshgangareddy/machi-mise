"use client";

import React from "react";
import Link from "next/link";
import { useFilter } from "@/context/FilterContext";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";

export default function RequireLoginModal() {
  const { requireLoginModalOpen, setRequireLoginModalOpen } = useFilter();
  const { login } = useAuth();
  const { lang } = useLanguage();

  if (!requireLoginModalOpen) return null;

  const handleQuickDemoLogin = () => {
    login("+81 90-7788-9900", "demo@machi-mise.jp");
    setRequireLoginModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in-up">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={() => setRequireLoginModalOpen(false)} aria-hidden="true" />

      {/* Modal Container */}
      <div className="relative w-full max-w-md rounded-3xl bg-zinc-900 border border-white/10 shadow-2xl p-6 sm:p-8 z-10 text-center space-y-5">
        <div className="w-16 h-16 rounded-full bg-red-600/20 border border-red-500/40 flex items-center justify-center text-3xl mx-auto shadow-lg glow-red">
          🔒
        </div>

        <div>
          <h3 className="text-xl font-black text-white">
            {lang === "ja" ? "無料ログインで全店舗を閲覧" : "Sign in to View All Establishments"}
          </h3>
          <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
            {lang === "ja"
              ? "会員登録またはログインすると、厳選されたすべての名店情報、詳細コース料金、事前予約・決済機能をご利用いただけます。"
              : "Create a free account or sign in to browse all verified culinary gems, private course menus, and advance table reservations."}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          {/* Quick Demo Login */}
          <button
            type="button"
            onClick={handleQuickDemoLogin}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-sm tracking-wide shadow-xl glow-red transition-all flex items-center justify-center gap-2"
          >
            <span>⚡</span>
            <span>{lang === "ja" ? "ワンクリック無料お試しログイン" : "Quick 1-Click Demo Sign-In"}</span>
          </button>

          {/* Regular Login Link */}
          <Link
            href="/login"
            onClick={() => setRequireLoginModalOpen(false)}
            className="block w-full py-3 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white font-bold text-xs border border-white/10 transition-colors"
          >
            {lang === "ja" ? "電話番号・メールでログイン" : "Sign In via Phone / Email"}
          </Link>
        </div>

        {/* Cancel */}
        <button
          type="button"
          onClick={() => setRequireLoginModalOpen(false)}
          className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          {lang === "ja" ? "閉じる" : "Continue as Guest"}
        </button>
      </div>
    </div>
  );
}
