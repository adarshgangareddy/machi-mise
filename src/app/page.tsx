import Navbar from "@/components/Navbar";
import Link from "next/link";

// ── Mock data (replace with real API later) ──────────────────────────────────
const CATEGORIES = [
  { id: 1, label: "Ramen", ja: "ラーメン", emoji: "🍜" },
  { id: 2, label: "Sushi", ja: "寿司", emoji: "🍣" },
  { id: 3, label: "Izakaya", ja: "居酒屋", emoji: "🏮" },
  { id: 4, label: "Tempura", ja: "天ぷら", emoji: "🍤" },
  { id: 5, label: "Udon", ja: "うどん", emoji: "🍝" },
  { id: 6, label: "Yakitori", ja: "焼き鳥", emoji: "🍡" },
  { id: 7, label: "Wagashi", ja: "和菓子", emoji: "🍡" },
  { id: 8, label: "Craft Shops", ja: "工芸品", emoji: "🎎" },
];

const FEATURED = [
  {
    id: 1,
    name: "Tanaka Ramen",
    nameJa: "田中ラーメン",
    category: "Ramen",
    location: "Shibuya, Tokyo",
    rating: 4.8,
    reviews: 342,
    tag: "Popular",
  },
  {
    id: 2,
    name: "Sakura Sushi",
    nameJa: "さくら寿司",
    category: "Sushi",
    location: "Shinjuku, Tokyo",
    rating: 4.6,
    reviews: 218,
    tag: "New",
  },
  {
    id: 3,
    name: "Hana Izakaya",
    nameJa: "花居酒屋",
    category: "Izakaya",
    location: "Osaka",
    rating: 4.7,
    reviews: 189,
    tag: "Top Rated",
  },
  {
    id: 4,
    name: "Momiji Tempura",
    nameJa: "もみじ天ぷら",
    category: "Tempura",
    location: "Kyoto",
    rating: 4.9,
    reviews: 97,
    tag: "Editor's Pick",
  },
  {
    id: 5,
    name: "Yoshi Udon",
    nameJa: "よしうどん",
    category: "Udon",
    location: "Fukuoka",
    rating: 4.5,
    reviews: 154,
    tag: "",
  },
  {
    id: 6,
    name: "Nishiki Craft",
    nameJa: "錦工芸",
    category: "Craft Shops",
    location: "Kyoto",
    rating: 4.8,
    reviews: 76,
    tag: "Local Gem",
  },
];

// ── Components ────────────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-1 text-sm text-amber-500 font-semibold">
      ★ {rating.toFixed(1)}
    </span>
  );
}

function CategoryPill({
  emoji,
  label,
  ja,
}: {
  emoji: string;
  label: string;
  ja: string;
}) {
  return (
    <button className="flex flex-col items-center gap-1 px-5 py-4 rounded-2xl bg-white border border-stone-200 hover:border-red-300 hover:shadow-md transition-all group cursor-pointer min-w-[80px]">
      <span className="text-3xl">{emoji}</span>
      <span className="text-xs font-semibold text-stone-800 group-hover:text-red-700 transition-colors">
        {label}
      </span>
      <span className="text-[10px] text-stone-400">{ja}</span>
    </button>
  );
}

function ShopCard({
  name,
  nameJa,
  category,
  location,
  rating,
  reviews,
  tag,
}: (typeof FEATURED)[0]) {
  return (
    <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all group cursor-pointer">
      {/* Placeholder image area */}
      <div className="h-40 bg-gradient-to-br from-stone-100 to-red-50 relative">
        <div className="absolute inset-0 flex items-center justify-center text-5xl opacity-30">
          🏮
        </div>
        {tag && (
          <span className="absolute top-3 left-3 text-[11px] font-bold bg-red-700 text-white px-2.5 py-1 rounded-full">
            {tag}
          </span>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-bold text-stone-900 group-hover:text-red-700 transition-colors">
              {name}
            </h3>
            <p className="text-xs text-stone-400 mt-0.5">{nameJa}</p>
          </div>
          <StarRating rating={rating} />
        </div>

        <div className="mt-3 flex items-center justify-between text-xs text-stone-500">
          <span className="flex items-center gap-1">
            <span>📍</span> {location}
          </span>
          <span>
            {category} · {reviews} reviews
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-b from-red-900 via-red-800 to-red-700 text-white overflow-hidden">
        {/* Decorative pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,.08) 20px, rgba(255,255,255,.08) 21px)",
          }}
        />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-24 text-center">
          <p className="text-red-200 tracking-[0.3em] text-xs uppercase mb-4 font-medium">
            まちの店 — Your Local Japanese Directory
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight mb-6">
            Discover Authentic <br />
            <span className="text-red-200">Japanese Restaurants</span>
            <br />& Local Shops
          </h1>
          <p className="text-red-100 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Find hidden gems, beloved neighborhood spots, and curated local
            businesses — all in one place.
          </p>

          {/* Search bar */}
          <div
            id="browse"
            className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto"
          >
            <input
              type="text"
              placeholder="Search restaurants, ramen, sushi… / 検索"
              className="flex-1 px-5 py-3.5 rounded-xl bg-white/15 border border-white/30 text-white placeholder:text-red-200 focus:outline-none focus:bg-white/25 focus:border-white/60 transition-all text-sm"
            />
            <button className="px-6 py-3.5 rounded-xl bg-white text-red-800 font-bold hover:bg-red-50 transition-colors text-sm shrink-0">
              Search 検索
            </button>
          </div>
        </div>
      </section>

      {/* ── Categories ── */}
      <section id="categories" className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="flex items-baseline gap-3 mb-8">
          <h2 className="text-xl font-bold text-stone-900">Browse by Type</h2>
          <span className="text-sm text-stone-400">カテゴリー</span>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none snap-x">
          {CATEGORIES.map((cat) => (
            <div key={cat.id} className="snap-start shrink-0">
              <CategoryPill emoji={cat.emoji} label={cat.label} ja={cat.ja} />
            </div>
          ))}
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <hr className="border-stone-200" />
      </div>

      {/* ── Featured listings ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="flex items-baseline gap-3 mb-8">
          <h2 className="text-xl font-bold text-stone-900">Featured Spots</h2>
          <span className="text-sm text-stone-400">おすすめ</span>
          <Link
            href="#"
            className="ml-auto text-sm text-red-700 hover:underline font-medium"
          >
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURED.map((shop) => (
            <ShopCard key={shop.id} {...shop} />
          ))}
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="bg-stone-900 text-white py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-4xl mb-4 block">🏮</span>
          <h2 className="text-2xl font-bold mb-3">Own a local business?</h2>
          <p className="text-stone-400 mb-8 leading-relaxed">
            List your restaurant or shop on machi-mise and reach thousands of
            customers looking for authentic local experiences.
            <br />
            <span className="text-stone-500 text-sm">
              地元のお店をまちの店に登録しませんか？
            </span>
          </p>
          <Link
            href="/login"
            className="inline-block px-8 py-3.5 rounded-full bg-red-700 text-white font-bold hover:bg-red-600 transition-colors"
          >
            Get listed — 無料登録
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        id="about"
        className="bg-stone-100 border-t border-stone-200 py-10 px-4 text-sm text-stone-500"
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-red-700 text-xl font-bold">店</span>
            <span className="font-semibold text-stone-700">machi-mise</span>
            <span className="text-stone-400">まちの店</span>
          </div>
          <p className="text-stone-400 text-xs text-center sm:text-right">
            © 2026 machi-mise. All rights reserved. <br />
            Connecting you with local Japanese culture.
          </p>
        </div>
      </footer>
    </>
  );
}
