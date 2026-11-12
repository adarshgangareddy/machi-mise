import type { Metadata } from "next"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import CookieBanner from "@/components/CookieBanner"
import MobileStickyCtA from "@/components/MobileStickyCtA"
import MobileNav from "@/components/MobileNav"

export const metadata: Metadata = {
  title: "まちの店 — Discover Japanese Restaurants & Local Shops",
  description:
    "Find authentic Japanese restaurants, izakayas, ramen shops and local businesses near you. まちの店 — あなたの地元を探索しよう。",
  openGraph: {
    title: "machi-mise — まちの店",
    description:
      "Find authentic Japanese restaurants, izakayas, ramen shops and local businesses near you.",
    images: [{ url: "/og-image.jpg" }],
  },
  twitter: { card: "summary_large_image" },
}

const CATEGORIES = [
  { id: "ramen", label: "Ramen", ja: "ラーメン", emoji: "🍜" },
  { id: "sushi", label: "Sushi", ja: "寿司", emoji: "🍣" },
  { id: "izakaya", label: "Izakaya", ja: "居酒屋", emoji: "🏮" },
  { id: "tempura", label: "Tempura", ja: "天ぷら", emoji: "🍤" },
  { id: "udon", label: "Udon", ja: "うどん", emoji: "🍝" },
  { id: "yakitori", label: "Yakitori", ja: "焼き鳥", emoji: "🍡" },
  { id: "wagashi", label: "Wagashi", ja: "和菓子", emoji: "🍡" },
  { id: "craft", label: "Craft", ja: "工芸品", emoji: "🎎" },
]

const FEATURED = [
  {
    id: "1",
    name: "Ichiran Shibuya",
    nameJa: "一蘭 渋谷店",
    category: "Ramen",
    location: "Shibuya, Tokyo",
    rating: 4.9,
    reviews: 2341,
    tag: "⭐ Top Rated",
  },
  {
    id: "2",
    name: "Sukiyabashi Jiro",
    nameJa: "すきやばし次郎",
    category: "Sushi",
    location: "Ginza, Tokyo",
    rating: 4.8,
    reviews: 1892,
    tag: "🏅 Michelin",
  },
  {
    id: "3",
    name: "Torikizoku",
    nameJa: "鳥貴族",
    category: "Yakitori",
    location: "Osaka",
    rating: 4.6,
    reviews: 987,
    tag: null,
  },
  {
    id: "4",
    name: "Marugame Seimen",
    nameJa: "丸亀製麺",
    category: "Udon",
    location: "Kyoto",
    rating: 4.5,
    reviews: 1230,
    tag: "🔥 Popular",
  },
  {
    id: "5",
    name: "Tempura Kondo",
    nameJa: "天ぷら近藤",
    category: "Tempura",
    location: "Ginza, Tokyo",
    rating: 4.7,
    reviews: 654,
    tag: null,
  },
  {
    id: "6",
    name: "Toraya Kyoto",
    nameJa: "とらや 京都一条店",
    category: "Wagashi",
    location: "Kyoto",
    rating: 4.8,
    reviews: 445,
    tag: "🆕 New",
  },
]

export default function HomePage() {
  return (
    <>
      {/* SECTION 1 — NAVBAR */}
      <Navbar />

      {/* SECTION 2 — HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-zinc-950">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/40 via-zinc-950 to-zinc-950" />
        {/* Decorative large kanji */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[20vw] font-black text-white/[0.03] select-none pointer-events-none leading-none pr-4 animate-float">
          店
        </div>

        {/* Hero content — centered */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-32 text-center">
          {/* Live badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-900/40 border border-red-800/50 text-red-400 text-xs font-semibold tracking-wider uppercase mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse-dot" />
            LIVE · Updated Daily / 毎日更新
          </div>

          {/* H1 */}
          <h1 className="text-5xl sm:text-7xl font-black tracking-tight text-white leading-[1.05] mb-6 animate-fade-in-up">
            Discover
            <br />
            Authentic <span className="text-red-500">Japanese</span>
            <br />
            Restaurants
          </h1>
          <p
            className="text-zinc-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up"
            style={{ animationDelay: "0.1s", animationFillMode: "both" }}
          >
            Find hidden gems, beloved neighborhood spots, and curated local businesses.
            <br />
            <span className="text-zinc-500 text-sm">
              隠れた名店、地元の人気スポット、厳選されたローカルビジネスを探そう。
            </span>
          </p>

          {/* Search bar */}
          <div
            id="browse"
            className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto mb-10 animate-fade-in-up"
            style={{ animationDelay: "0.2s", animationFillMode: "both" }}
          >
            <input
              type="text"
              placeholder="Search restaurants, ramen, sushi… / 検索"
              className="flex-1 px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-zinc-500 focus:outline-none focus:border-red-500/50 focus:bg-white/8 transition-all text-sm"
              readOnly
            />
            <button className="px-6 py-4 rounded-xl bg-red-600 text-white font-bold hover:bg-red-500 transition-colors text-sm shrink-0">
              Search 検索
            </button>
          </div>

          {/* CTA buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in-up"
            style={{ animationDelay: "0.3s", animationFillMode: "both" }}
          >
            <Link
              href="#browse"
              className="px-8 py-3.5 rounded-full bg-red-600 text-white font-bold hover:bg-red-500 transition-colors"
            >
              Browse Spots →
            </Link>
            <Link
              href="/login"
              className="px-8 py-3.5 rounded-full border border-white/20 text-white font-semibold hover:bg-white/5 transition-colors"
            >
              List Your Business 無料登録
            </Link>
          </div>

          {/* Stats */}
          <div
            className="flex items-center justify-center gap-8 text-sm text-zinc-500 animate-fade-in-up"
            style={{ animationDelay: "0.4s", animationFillMode: "both" }}
          >
            <span>
              <strong className="text-white">2,400+</strong> Listings
            </span>
            <span className="text-zinc-700">·</span>
            <span>
              <strong className="text-white">48</strong> Cities
            </span>
            <span className="text-zinc-700">·</span>
            <span>
              <strong className="text-white">10K+</strong> Reviews
            </span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-600 text-xs animate-float">
          <span>Scroll</span>
          <span>↓</span>
        </div>
      </section>

      {/* SECTION 3 — CATEGORIES */}
      <section id="categories" className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">
            Browse by Type{" "}
            <span className="text-zinc-500 text-base font-normal ml-2">カテゴリー</span>
          </h2>
          <Link href="#" className="text-sm text-red-500 hover:text-red-400">
            View all →
          </Link>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="bg-zinc-900 border border-white/5 hover:border-red-500/50 hover:bg-zinc-800 rounded-2xl p-5 flex flex-col items-center gap-2 cursor-pointer transition-all snap-start shrink-0 min-w-[90px] group"
            >
              <span className="text-3xl">{cat.emoji}</span>
              <span className="text-xs font-semibold text-white group-hover:text-red-400 transition-colors">
                {cat.label}
              </span>
              <span className="text-[10px] text-zinc-500">{cat.ja}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4 — FEATURED SHOPS */}
      <section id="featured" className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">
            Featured Spots{" "}
            <span className="text-zinc-500 text-base font-normal ml-2">おすすめ</span>
          </h2>
          <Link href="#" className="text-sm text-red-500 hover:text-red-400">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURED.map((shop) => (
            <div
              key={shop.id}
              className="bg-zinc-900 border border-white/5 hover:border-red-500/30 hover:shadow-[0_0_30px_rgba(220,38,38,0.08)] hover:-translate-y-1 transition-all rounded-2xl overflow-hidden cursor-pointer group"
            >
              {/* Image area */}
              <div className="h-44 bg-gradient-to-br from-zinc-800 to-zinc-900 relative flex items-center justify-center">
                <span className="text-5xl opacity-20">🏮</span>
                {shop.tag && (
                  <span className="absolute top-3 left-3 text-[11px] font-bold bg-red-600 text-white px-2.5 py-1 rounded-full">
                    {shop.tag}
                  </span>
                )}
              </div>
              {/* Body */}
              <div className="p-5">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-bold text-white group-hover:text-red-400 transition-colors">
                      {shop.name}
                    </h3>
                    <p className="text-xs text-zinc-500 mt-0.5">{shop.nameJa}</p>
                  </div>
                  <span className="text-amber-400 font-semibold text-sm">★ {shop.rating}</span>
                </div>
                <div className="mt-3 flex justify-between text-xs text-zinc-500">
                  <span>📍 {shop.location}</span>
                  <span>
                    {shop.category} · {shop.reviews} reviews
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5 — CTA BANNER */}
      <section className="bg-gradient-to-r from-red-900 to-red-800 py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-5xl mb-6">🏮</div>
          <h2 className="text-3xl font-black text-white mb-4">Own a local business?</h2>
          <p className="text-red-200 mb-8 leading-relaxed">
            Get discovered by thousands of food lovers and travelers every day.
            <br />
            <span className="text-red-300 text-sm">
              何千人もの食好きや旅行者にお店を見つけてもらいましょう。
            </span>
          </p>
          <Link
            href="/login"
            className="inline-block px-8 py-3.5 rounded-full border-2 border-white text-white font-bold hover:bg-white hover:text-red-900 transition-colors"
          >
            List Your Business — 無料登録 →
          </Link>
        </div>
      </section>

      {/* SECTION 6 — FOOTER */}
      <footer className="bg-zinc-950 border-t border-white/5 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
            <div className="flex items-center gap-2">
              <span className="text-red-600 text-2xl font-black">店</span>
              <span className="text-sm font-bold tracking-widest text-white uppercase">
                machi-mise
              </span>
            </div>
            <nav className="flex gap-6 text-sm text-zinc-500">
              <Link href="#" className="hover:text-white transition-colors">
                Privacy
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Terms
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Contact
              </Link>
            </nav>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-sm text-zinc-500">
            <span>© 2026 machi-mise</span>
            <span>Made with ♥ in Japan 🇯🇵</span>
          </div>
        </div>
      </footer>

      <CookieBanner />
      <MobileStickyCtA />
      <MobileNav />
    </>
  )
}
