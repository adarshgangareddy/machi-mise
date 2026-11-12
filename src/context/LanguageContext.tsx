"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Language = "en" | "ja";

interface Translations {
  // Brand
  brandName: string;
  brandSub: string;
  brandTagline: string;

  // Nav
  navBrowse: string;
  navCategories: string;
  navTopRated: string;
  navAbout: string;
  navMyList: string;
  navLogIn: string;
  navSignUp: string;
  navLogOut: string;
  navListBusiness: string;

  // Hero
  heroBadge: string;
  heroHeading1: string;
  heroHeadingAccent: string;
  heroHeading2: string;
  heroSubtext: string;
  heroSearchPlaceholder: string;
  heroSearchButton: string;
  heroBrowseBtn: string;
  heroListBtn: string;
  heroStatListings: string;
  heroStatCities: string;
  heroStatReviews: string;
  heroScrollDown: string;

  // Search & Filter
  searchTitle: string;
  searchFilterAllCities: string;
  searchFilterAllCategories: string;
  searchFilterSort: string;
  sortTopRated: string;
  sortMostReviewed: string;
  sortPriceAsc: string;
  sortPriceDesc: string;
  searchResultsCount: string;
  noResultsTitle: string;
  noResultsSub: string;
  clearFilters: string;
  onlyBookmarked: string;

  // Sections
  categoriesTitle: string;
  categoriesSub: string;
  featuredTitle: string;
  featuredSub: string;
  viewAll: string;
  detailsBtn: string;
  saveToListBtn: string;
  savedBtn: string;

  // Modal
  modalAddress: string;
  modalHours: string;
  modalClosed: string;
  modalPhone: string;
  modalAverageSpend: string;
  modalSignatures: string;
  modalFeatures: string;
  modalViewMap: string;
  modalCopyAddress: string;
  modalCopied: string;
  modalClose: string;

  // CTA Banner
  ctaTitle: string;
  ctaSub: string;
  ctaButton: string;

  // Footer
  footerDesc: string;
  footerHQ: string;
  footerHQAddress: string;
  footerLinks: string;
  footerPrivacy: string;
  footerTerms: string;
  footerContact: string;
  footerRights: string;
  footerHandcrafted: string;
}

const DICTIONARY: Record<Language, Translations> = {
  en: {
    brandName: "machi-mise",
    brandSub: "まちの店",
    brandTagline: "Japan's Premier Dining & Local Shop Directory",

    navBrowse: "Browse",
    navCategories: "Categories",
    navTopRated: "Top Rated",
    navAbout: "About",
    navMyList: "My List",
    navLogIn: "Log in",
    navSignUp: "Sign up",
    navLogOut: "Log out",
    navListBusiness: "List Business",

    heroBadge: "LIVE · Verified Japanese Directory",
    heroHeading1: "Discover",
    heroHeadingAccent: "Authentic Japan",
    heroHeading2: "Through Its Greatest Kitchens",
    heroSubtext:
      "Explore 3-Star Michelin sushi sanctuaries, historic hundred-year izakayas, and hidden ramen temples. Verified real locations, menus, and reservation guides.",
    heroSearchPlaceholder: "Search restaurant, ramen, sushi, Ginza, Kyoto…",
    heroSearchButton: "Search",
    heroBrowseBtn: "Explore Directory →",
    heroListBtn: "Register Your Shop",
    heroStatListings: "Verified Venues",
    heroStatCities: "Major Cities",
    heroStatReviews: "Local Reviews",
    heroScrollDown: "Scroll to explore",

    searchTitle: "Curated Directory",
    searchFilterAllCities: "All Cities",
    searchFilterAllCategories: "All Categories",
    searchFilterSort: "Sort by",
    sortTopRated: "Highest Rated (★ 4.9+)",
    sortMostReviewed: "Most Reviewed",
    sortPriceAsc: "Price: Low to High",
    sortPriceDesc: "Price: High to Low",
    searchResultsCount: "spots found",
    noResultsTitle: "No matching spots found",
    noResultsSub: "Try adjusting your search terms or clearing city/category filters.",
    clearFilters: "Reset all filters",
    onlyBookmarked: "My Saved Spots Only",

    categoriesTitle: "Browse by Cuisine & Craft",
    categoriesSub: "Categories",
    featuredTitle: "Featured Culinary Institutions",
    featuredSub: "Hand-Picked & Verified",
    viewAll: "View All",
    detailsBtn: "View Details & Menu",
    saveToListBtn: "Save",
    savedBtn: "Saved",

    modalAddress: "Address",
    modalHours: "Opening Hours",
    modalClosed: "Regular Holidays",
    modalPhone: "Telephone",
    modalAverageSpend: "Average Spend",
    modalSignatures: "Signature Dishes & Prices",
    modalFeatures: "Amenities & Atmosphere",
    modalViewMap: "Open in Google Maps",
    modalCopyAddress: "Copy Address",
    modalCopied: "Copied!",
    modalClose: "Close",

    ctaTitle: "Own an Authentic Japanese Restaurant or Shop?",
    ctaSub:
      "Join machi-mise to connect directly with discerning food travelers, residents, and Japanese gastronomy enthusiasts worldwide.",
    ctaButton: "List Your Business — Free Registration →",

    footerDesc:
      "machi-mise (まちの店) is the definitive bilingual directory curating Japan's most authentic culinary and cultural institutions.",
    footerHQ: "Tokyo Headquarters",
    footerHQAddress: "Roppongi Hills Mori Tower 28F, 6-10-1 Roppongi, Minato-ku, Tokyo 106-6108, Japan",
    footerLinks: "Quick Navigation",
    footerPrivacy: "Privacy Policy",
    footerTerms: "Terms of Service",
    footerContact: "Contact Support",
    footerRights: "© 2026 machi-mise Inc. All rights reserved.",
    footerHandcrafted: "Handcrafted with pride in Tokyo, Japan 🇯🇵",
  },
  ja: {
    brandName: "まちの店",
    brandSub: "machi-mise",
    brandTagline: "日本全国の名店・老舗・隠れ家グルメ総合案内所",

    navBrowse: "店舗を探す",
    navCategories: "ジャンル",
    navTopRated: "高評価",
    navAbout: "私たちについて",
    navMyList: "お気に入り",
    navLogIn: "ログイン",
    navSignUp: "新規登録",
    navLogOut: "ログアウト",
    navListBusiness: "店舗掲載",

    heroBadge: "LIVE · 毎日更新・実名店舗掲載中",
    heroHeading1: "日本の",
    heroHeadingAccent: "本物の美味",
    heroHeading2: "と出会える場所",
    heroSubtext:
      "ミシュラン三ツ星の鮨処から、創業百年の伝統居酒屋、行列の絶えない名物ラーメン店まで。厳選された日本の名店情報をお届けします。",
    heroSearchPlaceholder: "店舗名、寿司、ラーメン、銀座、京都など…",
    heroSearchButton: "検索する",
    heroBrowseBtn: "名店一覧を見る →",
    heroListBtn: "無料でお店を掲載",
    heroStatListings: "厳選掲載店舗",
    heroStatCities: "対応主要都市",
    heroStatReviews: "リアルな口コミ",
    heroScrollDown: "スクロールして一覧へ",

    searchTitle: "厳選レストラン一覧",
    searchFilterAllCities: "すべての都市",
    searchFilterAllCategories: "すべてのジャンル",
    searchFilterSort: "並び替え",
    sortTopRated: "評価が高い順 (★ 4.9+)",
    sortMostReviewed: "口コミが多い順",
    sortPriceAsc: "予算が安い順",
    sortPriceDesc: "予算が高い順",
    searchResultsCount: "件の名店が見つかりました",
    noResultsTitle: "条件に一致する店舗が見つかりませんでした",
    noResultsSub: "検索キーワードを変更するか、都市・ジャンルフィルターを解除してお試しください。",
    clearFilters: "すべてのフィルターをリセット",
    onlyBookmarked: "保存したお気に入りのみ表示",

    categoriesTitle: "ジャンル・料理から探す",
    categoriesSub: "カテゴリー",
    featuredTitle: "日本を代表する名店・注目スポット",
    featuredSub: "おすすめ",
    viewAll: "すべて見る",
    detailsBtn: "詳細・メニューを見る",
    saveToListBtn: "保存",
    savedBtn: "保存済み",

    modalAddress: "所在地・住所",
    modalHours: "営業時間",
    modalClosed: "定休日",
    modalPhone: "電話番号",
    modalAverageSpend: "平均予算",
    modalSignatures: "名物料理・代表メニュー",
    modalFeatures: "こだわり・設備",
    modalViewMap: "Googleマップで開く",
    modalCopyAddress: "住所をコピー",
    modalCopied: "コピー完了！",
    modalClose: "閉じる",

    ctaTitle: "店舗オーナー様へ — あなたのお店を掲載しませんか？",
    ctaSub:
      "まちの店に登録して、世界中から日本を訪れる旅行者やこだわりの食通たちにお店の魅力を届けましょう。初期費用・月額基本料は無料です。",
    ctaButton: "無料でお店を登録する →",

    footerDesc:
      "まちの店（machi-mise）は、日本の伝統的な食文化と地域の魅力的な個人店を世界に発信するバイリンガル・グルメポータルです。",
    footerHQ: "東京本社",
    footerHQAddress: "〒106-6108 東京都港区六本木6-10-1 六本木ヒルズ森タワー28F",
    footerLinks: "リンク",
    footerPrivacy: "プライバシーポリシー",
    footerTerms: "利用規約",
    footerContact: "お問い合わせ",
    footerRights: "© 2026 machi-mise Inc. 無断転載を禁じます。",
    footerHandcrafted: "日本・東京にて真心込めて開発 🇯🇵",
  },
};

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  toggleLang: () => {},
  t: DICTIONARY.en,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("machi-mise-lang");
    if (saved === "ja" || saved === "en") {
      setLangState(saved);
    } else {
      // Auto detect user language preference
      if (typeof navigator !== "undefined" && navigator.language?.startsWith("ja")) {
        setLangState("ja");
      }
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem("machi-mise-lang", newLang);
    } catch {
      // ignore
    }
  };

  const toggleLang = () => {
    setLang(lang === "en" ? "ja" : "en");
  };

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang,
        toggleLang,
        t: DICTIONARY[lang],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
