"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Restaurant, REAL_RESTAURANTS, BookingOption } from "@/data/restaurants";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";

interface ShopDashboardViewProps {
  restaurant: Restaurant;
}

export default function ShopDashboardView({ restaurant }: ShopDashboardViewProps) {
  const { lang, t } = useLanguage();
  const { isBookmarked, toggleBookmark, user } = useAuth();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "menu" | "staff" | "reviews">("overview");

  // Booking Appointment State
  const [partySize, setPartySize] = useState(2);
  const [selectedDate, setSelectedDate] = useState("2026-11-18");
  const [selectedTime, setSelectedTime] = useState("18:30");
  const [seatingType, setSeatingType] = useState<"counter" | "table" | "tatami">("counter");
  const [selectedCourseIdx, setSelectedCourseIdx] = useState(0);
  const [payAdvanceMode, setPayAdvanceMode] = useState<"deposit" | "full">("deposit");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypay" | "applepay">("card");
  const [specialRequests, setSpecialRequests] = useState("");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingRefId, setBookingRefId] = useState("");

  // Review submission state
  const [reviewsList, setReviewsList] = useState([
    {
      id: 1,
      name: "Kenji Sato",
      nameJa: "佐藤 健二",
      date: "2 days ago",
      rating: 5,
      comment:
        "The broth and texture of the handmade noodles are unrivaled. You can feel the master's devotion in every single bite.",
      commentJa: "手打ち麺のコシと秘伝スープの深みが圧倒的。大将の一杯にかける魂が伝わってきます。",
      verified: true,
    },
    {
      id: 2,
      name: "Elena Rostova",
      nameJa: "エレナ・ロストワ",
      date: "1 week ago",
      rating: 5,
      comment:
        "Visiting from overseas. Booking via machi-mise with advance deposit was seamless. The staff welcomed us warmly despite the language barrier!",
      commentJa: "海外からの初来店。事前決済付きの予約でスムーズに入店できました。スタッフも温かく迎えてくれました！",
      verified: true,
    },
    {
      id: 3,
      name: "Tatsuya Mori",
      nameJa: "森 達也",
      date: "2 weeks ago",
      rating: 4.8,
      comment:
        "Seasonal ingredients are handled with peak Michelin precision. Booking the counter seat is a must to watch the itamae work.",
      commentJa: "旬の魚の仕込みと温度管理が完璧。板前の手仕事を目の前で堪能できるカウンター席が一番のおすすめです。",
      verified: true,
    },
  ]);
  const [newReviewAuthor, setNewReviewAuthor] = useState("");
  const [newReviewText, setNewReviewText] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const bookmarked = isBookmarked(restaurant.id);
  const activeImage = restaurant.gallery[activeImageIndex] || restaurant.image;

  // Selected course details
  const currentCourse: BookingOption = restaurant.bookingOptions[selectedCourseIdx] || {
    courseName: "Signature Omakase Dining",
    courseNameJa: "店主おまかせ懐石コース",
    pricePerPerson: 8500,
    depositRequired: 2000,
    durationMinutes: 90,
    description: "Multi-course seasonal chef tasting selection.",
    descriptionJa: "旬の特選食材を贅沢に使用した大将おまかせコース。",
  };

  const depositTotal = currentCourse.depositRequired * partySize;
  const fullTotal = currentCourse.pricePerPerson * partySize;
  const amountToCharge = payAdvanceMode === "full" ? fullTotal : depositTotal;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(lang === "ja" ? restaurant.addressJa : restaurant.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = "MM-" + Math.floor(100000 + Math.random() * 900000);
    setBookingRefId(ref);
    setBookingConfirmed(true);
  };

  const handlePostReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewText.trim()) return;
    const authorName = newReviewAuthor.trim() || (user?.email ? user.email.split("@")[0] : "Diner");
    setReviewsList([
      {
        id: Date.now(),
        name: authorName,
        nameJa: authorName,
        date: "Just now",
        rating: newReviewRating,
        comment: newReviewText,
        commentJa: newReviewText,
        verified: true,
      },
      ...reviewsList,
    ]);
    setNewReviewText("");
    setNewReviewAuthor("");
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 3000);
  };

  // Same ken related restaurants
  const relatedShops = REAL_RESTAURANTS.filter(
    (r) => r.ken === restaurant.ken && r.id !== restaurant.id
  ).slice(0, 4);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-red-600 selection:text-white relative overflow-hidden flex flex-col">
      {/* 1. Ambient Background Glowing Spheres (Inspired by Admin Dashboard screenshot) */}
      <div className="fixed top-20 left-[-10%] w-[500px] h-[500px] rounded-full bg-red-600/10 blur-[130px] pointer-events-none -z-10" />
      <div className="fixed top-1/2 right-[-10%] w-[600px] h-[600px] rounded-full bg-amber-600/10 blur-[150px] pointer-events-none -z-10" />
      <div className="fixed bottom-10 left-1/3 w-[450px] h-[450px] rounded-full bg-emerald-600/5 blur-[140px] pointer-events-none -z-10" />

      {/* 2. Global Navbar */}
      <Navbar />

      {/* 3. Main Dashboard Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-6 sm:py-10">
        {/* Breadcrumb Bar */}
        <div className="flex items-center gap-2 text-xs text-zinc-400 mb-6 flex-wrap font-medium">
          <Link href="/" className="hover:text-red-400 transition-colors flex items-center gap-1">
            <span>🏠</span>
            <span>Home</span>
          </Link>
          <span>/</span>
          <Link href="/#browse" className="hover:text-red-400 transition-colors uppercase">
            {lang === "ja" ? restaurant.kenJa : restaurant.city}
          </Link>
          <span>/</span>
          <span className="text-zinc-500">{restaurant.category}</span>
          <span>/</span>
          <span className="text-white font-bold truncate max-w-[200px]">
            {lang === "ja" ? restaurant.nameJa : restaurant.name}
          </span>
        </div>

        {/* HERO CINEMATIC HEADER (MultiMovies & Admin glass aesthetic) */}
        <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-zinc-900/60 backdrop-blur-xl shadow-2xl mb-8 glass-panel">
          {/* Main Hero Photo */}
          <div className="relative h-72 sm:h-96 md:h-[450px] w-full bg-zinc-950 overflow-hidden">
            <Image
              src={activeImage}
              alt={restaurant.name}
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover brightness-90 transition-all duration-700 hover:scale-105"
            />
            {/* Gradients for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-zinc-950/40 to-transparent" />

            {/* Top Badges */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex flex-wrap gap-2 z-10">
              {restaurant.badge && (
                <span className="px-3 py-1 rounded-full text-xs font-black bg-red-600 text-white shadow-lg glow-red tracking-wide">
                  {lang === "ja" ? restaurant.badgeJa || restaurant.badge : restaurant.badge}
                </span>
              )}
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-black/70 backdrop-blur text-zinc-200 border border-white/10">
                {restaurant.categoryEmoji} {lang === "ja" ? restaurant.categoryJa : restaurant.category}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-black/70 backdrop-blur text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{lang === "ja" ? "営業中・予約受付中" : "Open · Appointments Available"}</span>
              </span>
            </div>

            {/* Top Right Quick Actions */}
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-2 z-10">
              <button
                type="button"
                onClick={() => toggleBookmark(restaurant.id)}
                className={`flex items-center justify-center w-10 h-10 rounded-full border backdrop-blur-md transition-all ${
                  bookmarked
                    ? "bg-red-600 border-red-500 text-white glow-red shadow-lg"
                    : "bg-black/60 border-white/20 text-white hover:bg-black/80"
                }`}
                title="Save to My List"
              >
                <span className="text-base leading-none">{bookmarked ? "★" : "☆"}</span>
              </button>
              <button
                type="button"
                onClick={handleCopyAddress}
                className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-black/60 hover:bg-black/80 text-zinc-300 border border-white/20 text-xs font-bold backdrop-blur-md transition-all"
              >
                <span>{copied ? "✓" : "📋"}</span>
                <span className="hidden sm:inline">{copied ? "Copied" : "Copy Address"}</span>
              </button>
            </div>

            {/* Bottom Hero Content */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-10 space-y-2 max-w-3xl">
              <div className="flex items-center gap-2 text-xs font-black text-red-400 uppercase tracking-wider">
                <span>📍 {lang === "ja" ? restaurant.areaJa : restaurant.area}</span>
                <span>·</span>
                <span>{lang === "ja" ? restaurant.kenJa : restaurant.city}</span>
                <span>·</span>
                <span className="text-zinc-400 font-normal font-mono">{restaurant.nearestStationJa}</span>
              </div>

              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight drop-shadow-md">
                {lang === "ja" ? restaurant.nameJa : restaurant.name}
              </h1>

              <p className="text-sm sm:text-base text-zinc-300 font-medium line-clamp-2">
                {lang === "ja" ? restaurant.taglineJa : restaurant.tagline}
              </p>

              {/* Metrics Pill Row */}
              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs sm:text-sm font-semibold">
                <span className="px-3 py-1 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                  ★ <strong className="text-white">{restaurant.rating}</strong> ({restaurant.reviewsCount} {lang === "ja" ? "件のレビュー" : "reviews"})
                </span>
                <span className="px-3 py-1 rounded-xl bg-zinc-800/80 text-zinc-200 border border-white/10 font-mono">
                  {restaurant.averageSpend}
                </span>
                <span className="px-3 py-1 rounded-xl bg-zinc-800/80 text-zinc-300 border border-white/10">
                  🕒 {lang === "ja" ? restaurant.hoursJa : restaurant.hours}
                </span>
              </div>
            </div>
          </div>

          {/* Photo Gallery Thumbnails Carousel Strip */}
          <div className="p-3 sm:p-4 bg-zinc-950/80 border-t border-white/5 flex gap-2 sm:gap-3 overflow-x-auto no-scrollbar">
            {restaurant.gallery.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-20 h-14 sm:w-28 sm:h-18 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                  activeImageIndex === idx
                    ? "border-red-500 scale-105 shadow glow-red"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <Image
                  src={img}
                  alt={`Photo ${idx + 1}`}
                  fill
                  sizes="120px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* TWO COLUMN GRID: Left Content & Right Sticky Food Appointment Widget */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Tabs, Story, Menu, Staff ("Cast"), Reviews */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-8">
            
            {/* Navigation Tabs (Overview, Digital Menu, Master Chefs/Cast, Reviews) */}
            <div className="flex gap-2 border-b border-white/10 pb-2 overflow-x-auto no-scrollbar">
              <button
                type="button"
                onClick={() => setActiveTab("overview")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all shrink-0 ${
                  activeTab === "overview"
                    ? "bg-red-600 text-white shadow glow-red"
                    : "text-zinc-400 hover:text-white bg-zinc-900/60"
                }`}
              >
                📖 {lang === "ja" ? "店舗概要・こだわり" : "Story & Philosophy"}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("menu")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all shrink-0 ${
                  activeTab === "menu"
                    ? "bg-red-600 text-white shadow glow-red"
                    : "text-zinc-400 hover:text-white bg-zinc-900/60"
                }`}
              >
                🍣 {lang === "ja" ? "お品書き・名物料理" : "Signature Menu"}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("staff")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all shrink-0 ${
                  activeTab === "staff"
                    ? "bg-red-600 text-white shadow glow-red"
                    : "text-zinc-400 hover:text-white bg-zinc-900/60"
                }`}
              >
                👨‍🍳 {lang === "ja" ? "料理長・職人紹介 (Cast)" : "Master Chefs & Staff (Cast)"}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("reviews")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all shrink-0 ${
                  activeTab === "reviews"
                    ? "bg-red-600 text-white shadow glow-red"
                    : "text-zinc-400 hover:text-white bg-zinc-900/60"
                }`}
              >
                💬 {lang === "ja" ? `お客様の声 (${reviewsList.length})` : `Diner Reviews (${reviewsList.length})`}
              </button>
            </div>

            {/* TAB 1: OVERVIEW & PHILOSOPHY */}
            {activeTab === "overview" && (
              <div className="space-y-6 animate-fade-in-up">
                {/* Story Glass Box */}
                <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/60 border border-white/10 backdrop-blur-xl space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-red-600 rounded-full" />
                    <h2 className="text-xl sm:text-2xl font-black text-white">
                      {lang === "ja" ? "伝統と職人のこだわり" : "Culinary Heritage & Story"}
                    </h2>
                  </div>
                  <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                    {lang === "ja" ? restaurant.descriptionJa : restaurant.description}
                  </p>
                </div>

                {/* Features & Amenities Badges */}
                <div className="p-6 rounded-3xl bg-zinc-900/60 border border-white/10 backdrop-blur-xl space-y-3">
                  <h3 className="text-sm font-black uppercase text-zinc-400 tracking-wider">
                    {lang === "ja" ? "設備・サービス特徴" : "Key Highlights & Amenities"}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {(lang === "ja" ? restaurant.featuresJa : restaurant.features).map((feat, idx) => (
                      <span
                        key={idx}
                        className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-zinc-800/80 text-zinc-200 border border-white/5 flex items-center gap-1.5"
                      >
                        <span className="text-red-400">✓</span>
                        <span>{feat}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Location & Access Details */}
                <div className="p-6 rounded-3xl bg-zinc-900/60 border border-white/10 backdrop-blur-xl space-y-4">
                  <h3 className="text-sm font-black uppercase text-zinc-400 tracking-wider">
                    {lang === "ja" ? "店舗所在地・アクセス案内" : "Location & Transit Guide"}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                    <div className="p-4 rounded-2xl bg-zinc-950/60 border border-white/5 space-y-1">
                      <span className="text-zinc-500 font-bold block">{lang === "ja" ? "住所" : "Address"}</span>
                      <p className="text-white font-medium">{lang === "ja" ? restaurant.addressJa : restaurant.address}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-zinc-950/60 border border-white/5 space-y-1">
                      <span className="text-zinc-500 font-bold block">{lang === "ja" ? "最寄り駅" : "Nearest Station"}</span>
                      <p className="text-white font-medium">{lang === "ja" ? restaurant.nearestStationJa : restaurant.nearestStation}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-zinc-950/60 border border-white/5 space-y-1">
                      <span className="text-zinc-500 font-bold block">{lang === "ja" ? "電話番号" : "Phone"}</span>
                      <p className="text-white font-medium font-mono">{restaurant.phone}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-zinc-950/60 border border-white/5 space-y-1">
                      <span className="text-zinc-500 font-bold block">{lang === "ja" ? "定休日" : "Closed On"}</span>
                      <p className="text-white font-medium">{lang === "ja" ? restaurant.closedDayJa : restaurant.closedDay}</p>
                    </div>
                  </div>

                  <a
                    href={restaurant.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold border border-white/10 transition-colors"
                  >
                    <span>🗺️</span>
                    <span>{lang === "ja" ? "Googleマップでルート確認" : "Open in Google Maps"} ↗</span>
                  </a>
                </div>
              </div>
            )}

            {/* TAB 2: SIGNATURE MENU & DISHES */}
            {activeTab === "menu" && (
              <div className="space-y-6 animate-fade-in-up">
                <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/60 border border-white/10 backdrop-blur-xl space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-black text-white">
                        {lang === "ja" ? "名物看板料理" : "Signature Dishes"}
                      </h2>
                      <p className="text-xs text-zinc-400 mt-1">
                        {lang === "ja" ? "店主が誇る至高の逸品コレクション" : "Hand-crafted master culinary highlights"}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {restaurant.signatures.map((dish, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-zinc-950/60 border border-white/5 hover:border-red-500/40 transition-all space-y-2 group"
                      >
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="font-black text-sm sm:text-base text-white group-hover:text-red-400 transition-colors">
                            {lang === "ja" ? dish.nameJa : dish.name}
                          </h4>
                          <span className="px-2.5 py-1 rounded-lg bg-red-950/80 text-red-300 font-mono font-bold text-xs shrink-0 border border-red-800/40">
                            {dish.price}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400 leading-relaxed">
                          {dish.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Available Dining Courses for Appointment */}
                <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/60 border border-white/10 backdrop-blur-xl space-y-4">
                  <h3 className="text-lg font-black text-white">
                    {lang === "ja" ? "予約限定 特別コース一覧" : "Reservation & Pre-order Courses"}
                  </h3>
                  <div className="space-y-3">
                    {restaurant.bookingOptions.map((opt, idx) => (
                      <div
                        key={idx}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                          selectedCourseIdx === idx
                            ? "bg-red-950/40 border-red-500 shadow glow-red"
                            : "bg-zinc-950/60 border-white/5 hover:border-white/20"
                        }`}
                        onClick={() => setSelectedCourseIdx(idx)}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-black text-sm text-white">
                              {lang === "ja" ? opt.courseNameJa : opt.courseName}
                            </span>
                            <span className="text-[10px] text-zinc-400 font-mono px-2 py-0.5 rounded bg-zinc-800">
                              ⏱ {opt.durationMinutes} min
                            </span>
                          </div>
                          <p className="text-xs text-zinc-400">
                            {lang === "ja" ? opt.descriptionJa : opt.description}
                          </p>
                        </div>
                        <div className="text-left sm:text-right shrink-0">
                          <div className="text-base font-black text-white font-mono">
                            ¥{opt.pricePerPerson.toLocaleString()}
                          </div>
                          <div className="text-[10px] text-zinc-500">
                            {lang === "ja" ? `手付金: ¥${opt.depositRequired.toLocaleString()}` : `Deposit: ¥${opt.depositRequired.toLocaleString()}`}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: MASTER CHEFS & STAFF (CAST STYLE) */}
            {activeTab === "staff" && (
              <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/60 border border-white/10 backdrop-blur-xl space-y-6 animate-fade-in-up">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-white">
                    {lang === "ja" ? "厨房を率いる匠たち (Cast)" : "Master Chefs & Culinary Artisans (Cast)"}
                  </h2>
                  <p className="text-xs text-zinc-400 mt-1">
                    {lang === "ja" ? "何十年もの修行を積んだ名匠たち" : "Decades of dedicated Japanese apprenticeship and mastery"}
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
                  {restaurant.staff.map((person, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col items-center text-center p-4 rounded-2xl bg-zinc-950/70 border border-white/5 hover:border-red-500/40 transition-all group"
                    >
                      {/* Circular Cast Avatar with glowing border */}
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-red-500/50 p-1 mb-3 shadow-lg group-hover:scale-105 transition-transform glow-red">
                        <div className="relative w-full h-full rounded-full overflow-hidden">
                          <Image
                            src={person.avatar}
                            alt={person.name}
                            fill
                            sizes="96px"
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <h4 className="font-black text-sm text-white group-hover:text-red-400 transition-colors">
                        {lang === "ja" ? person.nameJa : person.name}
                      </h4>
                      <p className="text-xs text-red-400 font-bold mt-0.5">
                        {lang === "ja" ? person.roleJa : person.role}
                      </p>
                      <span className="text-[10px] text-zinc-500 mt-1">
                        {lang === "ja" ? "修行20年以上" : "20+ Years Mastery"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: REVIEWS & COMMUNITY DISCUSSION (Matching user reference Image 15) */}
            {activeTab === "reviews" && (
              <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/60 border border-white/10 backdrop-blur-xl space-y-6 animate-fade-in-up">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-white">
                      {lang === "ja" ? "来店者のクチコミ・評価" : "Diner Reviews & Ratings"}
                    </h2>
                    <p className="text-xs text-zinc-400 mt-1">
                      {lang === "ja" ? "実際に来店した本物のユーザーによる評価" : "Verified dining authentic reviews"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-black text-amber-400">★ {restaurant.rating}</span>
                    <span className="text-xs text-zinc-400">/ 5.0</span>
                  </div>
                </div>

                {/* Review Submission Form */}
                <form onSubmit={handlePostReview} className="p-4 sm:p-6 rounded-2xl bg-zinc-950/70 border border-white/5 space-y-3">
                  <h4 className="text-xs font-black uppercase text-zinc-300 tracking-wider">
                    {lang === "ja" ? "あなたのレビューを投稿する" : "Leave Your Authentic Review"}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder={lang === "ja" ? "お名前（ニックネーム可）" : "Your Name / Nickname"}
                      value={newReviewAuthor}
                      onChange={(e) => setNewReviewAuthor(e.target.value)}
                      className="px-3.5 py-2 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs placeholder-zinc-500 focus:outline-none focus:border-red-500"
                    />
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-zinc-400">{lang === "ja" ? "評価:" : "Rating:"}</span>
                      <select
                        value={newReviewRating}
                        onChange={(e) => setNewReviewRating(Number(e.target.value))}
                        className="px-3 py-2 rounded-xl bg-zinc-900 border border-white/10 text-amber-400 text-xs focus:outline-none focus:border-red-500"
                      >
                        <option value={5}>★★★★★ (5.0 - Exceptional)</option>
                        <option value={4.5}>★★★★☆ (4.5 - Excellent)</option>
                        <option value={4}>★★★★☆ (4.0 - Very Good)</option>
                        <option value={3.5}>★★★☆☆ (3.5 - Good)</option>
                      </select>
                    </div>
                  </div>
                  <textarea
                    rows={3}
                    placeholder={lang === "ja" ? "料理の味、接客、大将の職人技の感想を共有してください..." : "Share your experience with the dishes, service, and master craftsmanship..."}
                    value={newReviewText}
                    onChange={(e) => setNewReviewText(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs placeholder-zinc-500 focus:outline-none focus:border-red-500"
                  />
                  <div className="flex items-center justify-between">
                    {reviewSubmitted && (
                      <span className="text-xs text-emerald-400 font-bold">
                        ✓ {lang === "ja" ? "レビューが掲載されました！" : "Review published successfully!"}
                      </span>
                    )}
                    <button
                      type="submit"
                      className="ml-auto px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs glow-red transition-all"
                    >
                      {lang === "ja" ? "レビューを送信" : "Submit Review"}
                    </button>
                  </div>
                </form>

                {/* Reviews List */}
                <div className="space-y-4">
                  {reviewsList.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-4 rounded-2xl bg-zinc-950/60 border border-white/5 space-y-2"
                    >
                      <div className="flex justify-between items-center text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-black text-white">{lang === "ja" ? rev.nameJa : rev.name}</span>
                          {rev.verified && (
                            <span className="px-2 py-0.5 rounded-full text-[9px] bg-emerald-950/80 text-emerald-400 border border-emerald-800/40 font-bold">
                              ✓ {lang === "ja" ? "来店確認済み" : "Verified Diner"}
                            </span>
                          )}
                        </div>
                        <span className="text-zinc-500 text-[10px]">{rev.date}</span>
                      </div>
                      <div className="text-amber-400 text-xs">
                        {"★".repeat(Math.floor(rev.rating))}
                        <span className="text-zinc-300 ml-1 font-mono font-bold">{rev.rating}</span>
                      </div>
                      <p className="text-xs text-zinc-300 leading-relaxed">
                        {lang === "ja" ? rev.commentJa : rev.comment}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: STICKY INTERACTIVE FOOD APPOINTMENT & ADVANCE PAYMENT WIDGET */}
          <div className="lg:col-span-5 xl:col-span-4 sticky top-24 space-y-6">
            <div className="p-6 rounded-3xl bg-zinc-900/80 border border-white/10 backdrop-blur-2xl shadow-2xl space-y-5 glass-panel">
              
              {/* Header */}
              <div className="border-b border-white/10 pb-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-widest text-red-500 bg-red-950/60 px-3 py-1 rounded-full border border-red-800/40 glow-red">
                    ⚡ {lang === "ja" ? "来店予約・事前決済" : "Food Appointment"}
                  </span>
                  <span className="text-[10px] text-zinc-400">
                    🔒 {lang === "ja" ? "SSL安全決済" : "Secure Hold"}
                  </span>
                </div>
                <h3 className="text-xl font-black text-white mt-2">
                  {lang === "ja" ? "テーブル・お料理を予約" : "Book Your Table & Course"}
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  {lang === "ja" ? "事前決済で確実な席確保とスムーズな入店" : "Pre-pay in advance for guaranteed reservation"}
                </p>
              </div>

              {bookingConfirmed ? (
                /* BOOKING SUCCESS PASS TICKET */
                <div className="p-5 rounded-2xl bg-gradient-to-b from-red-950/40 to-zinc-950 border border-red-500/50 text-center space-y-4 animate-fade-in-up">
                  <div className="w-14 h-14 rounded-full bg-red-600/20 border border-red-500 flex items-center justify-center mx-auto text-2xl glow-red">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-white">
                      {lang === "ja" ? "ご予約・事前決済完了！" : "Appointment Confirmed!"}
                    </h4>
                    <p className="text-xs text-zinc-400 mt-1">
                      {lang === "ja" ? "確認メールとQRコードを発行しました" : "Your reservation QR code is ready"}
                    </p>
                  </div>

                  {/* QR Simulation Card */}
                  <div className="p-4 rounded-xl bg-white text-zinc-950 text-center space-y-2 max-w-[200px] mx-auto shadow-xl">
                    <div className="text-4xl">📱</div>
                    <div className="font-mono text-xs font-black tracking-widest">{bookingRefId}</div>
                    <div className="text-[9px] text-zinc-600">Scan at entrance</div>
                  </div>

                  <div className="text-xs text-left bg-zinc-900/80 p-3 rounded-xl border border-white/5 space-y-1.5 font-mono">
                    <div className="flex justify-between text-zinc-400">
                      <span>Date:</span>
                      <strong className="text-white">{selectedDate} ({selectedTime})</strong>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>Guests:</span>
                      <strong className="text-white">{partySize} {lang === "ja" ? "名様" : "Guests"}</strong>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>Course:</span>
                      <strong className="text-white truncate max-w-[140px]">{currentCourse.courseName}</strong>
                    </div>
                    <div className="flex justify-between text-zinc-400 border-t border-white/10 pt-1">
                      <span>Paid:</span>
                      <strong className="text-emerald-400">¥{amountToCharge.toLocaleString()}</strong>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setBookingConfirmed(false)}
                    className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs transition-colors"
                  >
                    {lang === "ja" ? "別の時間を予約する" : "Make Another Reservation"}
                  </button>
                </div>
              ) : (
                /* INTERACTIVE BOOKING FORM */
                <form onSubmit={handleConfirmBooking} className="space-y-4">
                  
                  {/* Party Size Stepper */}
                  <div>
                    <label className="text-xs font-bold text-zinc-300 block mb-1.5">
                      👥 {lang === "ja" ? "ご利用人数" : "Party Size"}
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {[1, 2, 4, 6].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setPartySize(num)}
                          className={`py-2 rounded-xl text-xs font-bold transition-all ${
                            partySize === num
                              ? "bg-red-600 text-white glow-red"
                              : "bg-zinc-950 border border-white/10 text-zinc-400 hover:text-white"
                          }`}
                        >
                          {num} {lang === "ja" ? "名" : "Ppl"}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Date & Time Grid */}
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] font-bold text-zinc-400 block mb-1">
                        📅 {lang === "ja" ? "来店日" : "Date"}
                      </label>
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full px-2.5 py-2 rounded-xl bg-zinc-950 border border-white/10 text-white text-xs focus:outline-none focus:border-red-500 font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-zinc-400 block mb-1">
                        ⏰ {lang === "ja" ? "時間帯" : "Time"}
                      </label>
                      <select
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        className="w-full px-2.5 py-2 rounded-xl bg-zinc-950 border border-white/10 text-white text-xs focus:outline-none focus:border-red-500 font-mono"
                      >
                        <option value="11:30">11:30 (Lunch)</option>
                        <option value="12:45">12:45 (Lunch)</option>
                        <option value="13:30">13:30 (Lunch)</option>
                        <option value="17:30">17:30 (Dinner)</option>
                        <option value="18:30">18:30 (Dinner Peak)</option>
                        <option value="19:45">19:45 (Dinner)</option>
                        <option value="20:30">20:30 (Late Dinner)</option>
                      </select>
                    </div>
                  </div>

                  {/* Seating Preference */}
                  <div>
                    <label className="text-xs font-bold text-zinc-300 block mb-1.5">
                      🪑 {lang === "ja" ? "座席タイプ" : "Seating Preference"}
                    </label>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <button
                        type="button"
                        onClick={() => setSeatingType("counter")}
                        className={`py-2 rounded-xl font-bold transition-all ${
                          seatingType === "counter"
                            ? "bg-red-600 text-white glow-red"
                            : "bg-zinc-950 border border-white/10 text-zinc-400 hover:text-white"
                        }`}
                      >
                        {lang === "ja" ? "カウンター" : "Counter"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setSeatingType("table")}
                        className={`py-2 rounded-xl font-bold transition-all ${
                          seatingType === "table"
                            ? "bg-red-600 text-white glow-red"
                            : "bg-zinc-950 border border-white/10 text-zinc-400 hover:text-white"
                        }`}
                      >
                        {lang === "ja" ? "テーブル" : "Table"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setSeatingType("tatami")}
                        className={`py-2 rounded-xl font-bold transition-all ${
                          seatingType === "tatami"
                            ? "bg-red-600 text-white glow-red"
                            : "bg-zinc-950 border border-white/10 text-zinc-400 hover:text-white"
                        }`}
                      >
                        {lang === "ja" ? "個室・座敷" : "Tatami"}
                      </button>
                    </div>
                  </div>

                  {/* Advance Deposit vs Full Course Pre-Pay */}
                  <div className="p-3.5 rounded-2xl bg-zinc-950 border border-white/10 space-y-2">
                    <span className="text-[11px] font-black uppercase text-zinc-400 tracking-wider block">
                      💳 {lang === "ja" ? "事前支払いプラン" : "Advance Payment Mode"}
                    </span>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <button
                        type="button"
                        onClick={() => setPayAdvanceMode("deposit")}
                        className={`p-2.5 rounded-xl text-left border transition-all ${
                          payAdvanceMode === "deposit"
                            ? "bg-red-950/60 border-red-500 text-white glow-red"
                            : "bg-zinc-900 border-white/5 text-zinc-400"
                        }`}
                      >
                        <div className="font-bold">{lang === "ja" ? "席手付金のみ" : "Deposit Hold"}</div>
                        <div className="text-[10px] text-zinc-400 font-mono mt-0.5">
                          ¥{depositTotal.toLocaleString()}
                        </div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPayAdvanceMode("full")}
                        className={`p-2.5 rounded-xl text-left border transition-all ${
                          payAdvanceMode === "full"
                            ? "bg-red-950/60 border-red-500 text-white glow-red"
                            : "bg-zinc-900 border-white/5 text-zinc-400"
                        }`}
                      >
                        <div className="font-bold">{lang === "ja" ? "コース全額前払" : "Full Course Pre-Pay"}</div>
                        <div className="text-[10px] text-emerald-400 font-mono mt-0.5">
                          ¥{fullTotal.toLocaleString()}
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Payment Method Selector */}
                  <div>
                    <label className="text-[11px] font-bold text-zinc-400 block mb-1">
                      {lang === "ja" ? "決済手段" : "Payment Method"}
                    </label>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("card")}
                        className={`py-1.5 rounded-xl font-bold border transition-all ${
                          paymentMethod === "card"
                            ? "bg-zinc-800 border-red-500 text-white"
                            : "bg-zinc-950 border-white/5 text-zinc-400"
                        }`}
                      >
                        💳 Card
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("paypay")}
                        className={`py-1.5 rounded-xl font-bold border transition-all ${
                          paymentMethod === "paypay"
                            ? "bg-zinc-800 border-red-500 text-white"
                            : "bg-zinc-950 border-white/5 text-zinc-400"
                        }`}
                      >
                        🔴 PayPay
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("applepay")}
                        className={`py-1.5 rounded-xl font-bold border transition-all ${
                          paymentMethod === "applepay"
                            ? "bg-zinc-800 border-red-500 text-white"
                            : "bg-zinc-950 border-white/5 text-zinc-400"
                        }`}
                      >
                         Pay
                      </button>
                    </div>
                  </div>

                  {/* Total & Action Button */}
                  <div className="pt-2 border-t border-white/10 space-y-3">
                    <div className="flex justify-between items-baseline">
                      <span className="text-xs text-zinc-400">
                        {lang === "ja" ? "本日のお支払い金額:" : "Total Charge Today:"}
                      </span>
                      <span className="text-2xl font-black text-white font-mono">
                        ¥{amountToCharge.toLocaleString()}
                      </span>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-sm shadow-xl glow-red hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                    >
                      <span>🔒</span>
                      <span>
                        {lang === "ja"
                          ? `事前決済して予約確定 (¥${amountToCharge.toLocaleString()})`
                          : `Confirm Appointment & Pre-Pay (¥${amountToCharge.toLocaleString()})`}
                      </span>
                    </button>

                    <p className="text-[10px] text-zinc-500 text-center leading-relaxed">
                      {lang === "ja"
                        ? "※ ご予約日の前日までキャンセル無料。店舗にてQRコードをご提示ください。"
                        : "Free cancellation up to 24 hours prior. Present QR code upon arrival."}
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* RELATED RESTAURANTS IN SAME KEN SECTION */}
        {relatedShops.length > 0 && (
          <section className="mt-16 pt-12 border-t border-white/10">
            <div className="flex justify-between items-end mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-red-500 block mb-1">
                  {lang === "ja" ? "同地域の厳選スポット" : "More in this Prefecture"}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  {lang === "ja"
                    ? `${restaurant.kenJa}のその他の名店`
                    : `Other Top Spots in ${restaurant.city}`}
                </h3>
              </div>
              <Link
                href="/#browse"
                className="text-xs font-bold text-red-400 hover:text-red-300 flex items-center gap-1"
              >
                <span>{lang === "ja" ? "すべて見る" : "View Directory"}</span>
                <span>→</span>
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
              {relatedShops.map((item) => (
                <Link
                  key={item.id}
                  href={`/shop/${item.id}`}
                  className="group rounded-2xl overflow-hidden bg-zinc-900/60 border border-white/10 hover:border-red-500/50 transition-all p-3 flex flex-col justify-between space-y-2 glass-panel"
                >
                  <div className="relative h-28 sm:h-36 w-full rounded-xl overflow-hidden bg-zinc-950">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded bg-black/80 text-[10px] text-amber-400 font-bold">
                      ★ {item.rating}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-black text-white group-hover:text-red-400 truncate">
                      {lang === "ja" ? item.nameJa : item.name}
                    </h4>
                    <p className="text-[10px] text-zinc-400 truncate mt-0.5">
                      {item.categoryEmoji} {lang === "ja" ? item.categoryJa : item.category} · {item.priceTier}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* 4. Global Footer */}
      <Footer />

      {/* 5. Mobile Navigation Bar */}
      <MobileNav />
    </div>
  );
}
