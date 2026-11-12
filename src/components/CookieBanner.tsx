"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function CookieBanner() {
  const { lang } = useLanguage();
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setDismissed(false);
    }
  }, []);

  if (dismissed) return null;

  const handleConsent = () => {
    localStorage.setItem("cookie-consent", "true");
    setDismissed(true);
  };

  return (
    <div className="fixed bottom-24 sm:bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-sm z-50 animate-slide-up">
      <div className="bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl p-4">
        <p className="font-bold text-white text-sm mb-1">
          {lang === "ja" ? "クッキー利用について 🍪" : "We use cookies 🍪"}
        </p>
        <p className="text-xs text-zinc-400 leading-relaxed mb-4">
          {lang === "ja"
            ? "快適な閲覧体験とトラフィック分析のためにクッキーを使用しています。続行することで同意したものとみなされます。"
            : "We use cookies to improve your experience and analyze site traffic. By continuing, you agree to our use of cookies."}
        </p>
        <div className="flex gap-2">
          <button
            onClick={handleConsent}
            className="bg-red-600 text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-red-500 transition-colors shadow glow-red"
          >
            {lang === "ja" ? "同意する" : "Accept"}
          </button>
          <button
            onClick={handleConsent}
            className="text-zinc-400 text-xs px-4 py-2 hover:text-white transition-colors"
          >
            {lang === "ja" ? "拒否" : "Decline"}
          </button>
        </div>
      </div>
    </div>
  );
}
