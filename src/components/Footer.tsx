"use client";

import React from "react";
import Link from "next/link";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { lang, t } = useLanguage();

  return (
    <footer id="about" className="bg-zinc-950 border-t border-white/5 pt-16 pb-28 sm:pb-16 text-zinc-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Col 1: Brand & Bio */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-600 text-white font-black text-lg glow-red">
                店
              </div>
              <span className="text-lg font-black tracking-wider text-white uppercase">
                {t.brandName}
              </span>
              <span className="text-xs font-semibold text-zinc-500">
                {t.brandSub}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-md leading-relaxed">
              {t.footerDesc}
            </p>
            <div className="pt-2">
              <LanguageSwitcher />
            </div>
          </div>

          {/* Col 2: Real Contact & Tokyo HQ */}
          <div className="space-y-3 text-xs">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {t.footerHQ}
            </h4>
            <p className="text-zinc-400 leading-relaxed">
              {t.footerHQAddress}
            </p>
            <div className="space-y-1 pt-1 font-mono text-zinc-300">
              <p>
                <span className="text-zinc-500">Email:</span>{" "}
                <a href="mailto:contact@machi-mise.jp" className="hover:text-red-400 underline">
                  contact@machi-mise.jp
                </a>
              </p>
              <p>
                <span className="text-zinc-500">Tel:</span>{" "}
                <a href="tel:+81355550199" className="hover:text-red-400">
                  +81 3-5555-0199 (Tokyo)
                </a>
              </p>
              <p>
                <span className="text-zinc-500">Hours:</span> Mon–Fri 09:30–18:30 JST
              </p>
            </div>
          </div>

          {/* Col 3: Legal & Directory */}
          <div className="space-y-3 text-xs">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {t.footerLinks}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="#browse" className="hover:text-white transition-colors">
                  {t.navBrowse}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  {t.footerPrivacy}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  {t.footerTerms}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  {t.footerContact}
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-red-400 hover:text-red-300 transition-colors">
                  {t.navListBusiness}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-zinc-500">
          <p>{t.footerRights}</p>
          <p className="flex items-center gap-2">
            <span>{t.footerHandcrafted}</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="System operational" />
          </p>
        </div>
      </div>
    </footer>
  );
}

