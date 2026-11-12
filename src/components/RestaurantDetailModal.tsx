"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Restaurant, BookingOption } from "@/data/restaurants";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";

interface RestaurantDetailModalProps {
  restaurant: Restaurant | null;
  onClose: () => void;
}

export default function RestaurantDetailModal({
  restaurant,
  onClose,
}: RestaurantDetailModalProps) {
  const { lang, t } = useLanguage();
  const { isBookmarked, toggleBookmark, user } = useAuth();

  const [activeTab, setActiveTab] = useState<"overview" | "menu" | "staff" | "book">("overview");
  const [copied, setCopied] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Booking Flow State
  const [partySize, setPartySize] = useState(2);
  const [selectedDate, setSelectedDate] = useState("2026-11-15");
  const [selectedTime, setSelectedTime] = useState("18:30");
  const [selectedCourseIndex, setSelectedCourseIndex] = useState(0);
  const [payAdvance, setPayAdvance] = useState(true);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingRefId, setBookingRefId] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (restaurant) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      setBookingConfirmed(false);
      setActiveTab("overview");
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [restaurant, onClose]);

  if (!restaurant) return null;

  const bookmarked = isBookmarked(restaurant.id);
  const currentImage = restaurant.gallery[activeImageIndex] || restaurant.image;
  const currentCourse: BookingOption = restaurant.bookingOptions[selectedCourseIndex] || {
    courseName: "Standard Dining Reservation",
    courseNameJa: "通常席予約",
    pricePerPerson: 3500,
    depositRequired: 1000,
    durationMinutes: 60,
    description: "Standard table booking with à la carte ordering.",
    descriptionJa: "席のみの通常予約。お料理は当日ご注文いただけます。",
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(lang === "ja" ? restaurant.addressJa : restaurant.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const randomId = "MM-" + Math.floor(100000 + Math.random() * 900000);
    setBookingRefId(randomId);
    setBookingConfirmed(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto bg-black/90 backdrop-blur-xl animate-fade-in-up">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Modal Container — Cinematic Netflix / Streaming Glass Card */}
      <div className="relative w-full max-w-4xl my-4 sm:my-8 overflow-hidden rounded-3xl bg-zinc-950/90 border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.8)] z-10 max-h-[92vh] flex flex-col glass-panel">
        
        {/* Cinematic Hero Image Header */}
        <div className="relative h-64 sm:h-80 md:h-96 w-full shrink-0 overflow-hidden bg-zinc-950">
          <Image
            src={currentImage}
            alt={restaurant.name}
            fill
            sizes="(max-width: 1024px) 100vw, 900px"
            className="object-cover transition-all duration-700 brightness-90"
            priority
          />
          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 via-transparent to-transparent" />

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur-md hover:bg-red-600 transition-colors shadow-lg border border-white/10"
            aria-label={t.modalClose}
          >
            ✕
          </button>

          {/* Top Badges */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-black bg-red-600 text-white shadow-xl glow-red">
              {lang === "ja" ? restaurant.badgeJa || restaurant.badge : restaurant.badge}
            </span>
            <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-black/70 text-zinc-200 backdrop-blur border border-white/10">
              {restaurant.categoryEmoji} {lang === "ja" ? restaurant.categoryJa : restaurant.category}
            </span>
            <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-zinc-900/80 text-red-400 backdrop-blur border border-red-500/30">
              📍 {lang === "ja" ? restaurant.kenJa : restaurant.city}
            </span>
          </div>

          {/* Hero Overlay Content (Title, CTA & Glass Info) */}
          <div className="absolute bottom-4 left-4 right-4 sm:left-8 sm:right-8 z-10 space-y-3">
            <div className="flex items-baseline gap-2">
              <span className="text-xs font-extrabold uppercase tracking-widest text-red-500 bg-red-950/60 px-2.5 py-0.5 rounded border border-red-800/40">
                {lang === "ja" ? restaurant.areaJa : restaurant.area}
              </span>
              <span className="text-xs text-zinc-400 font-mono">
                {restaurant.nearestStationJa}
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight drop-shadow-md">
              {lang === "ja" ? restaurant.nameJa : restaurant.name}
            </h2>

            {/* Quick Action Buttons (Play / Reserve, Bookmark, Share) */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => setActiveTab("book")}
                className="flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-sm shadow-xl glow-red hover:scale-105 transition-all"
              >
                <span>📅</span>
                <span>{lang === "ja" ? "今すぐ予約・事前決済" : "Book Table & Food Appointment"}</span>
              </button>

              <button
                type="button"
                onClick={() => toggleBookmark(restaurant.id)}
                className={`flex items-center justify-center w-11 h-11 rounded-full border backdrop-blur-md transition-all ${
                  bookmarked
                    ? "bg-red-600 border-red-500 text-white glow-red"
                    : "bg-black/60 border-white/20 text-white hover:bg-black/80"
                }`}
                title={bookmarked ? t.savedBtn : t.saveToListBtn}
              >
                <span className="text-lg leading-none">{bookmarked ? "★" : "+"}</span>
              </button>

              <button
                type="button"
                onClick={handleCopyAddress}
                className="flex items-center gap-2 px-4 py-3 rounded-full bg-black/60 hover:bg-black/80 text-zinc-300 border border-white/20 text-xs font-bold backdrop-blur-md transition-colors"
              >
                <span>{copied ? "✓" : "📋"}</span>
                <span>{copied ? t.modalCopied : t.modalCopyAddress}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Glass Specs Strip (Runtime/Language/Quality inspired) */}
        <div className="bg-zinc-900/80 border-y border-white/5 px-4 sm:px-8 py-3.5 backdrop-blur-md grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-zinc-500 block text-[10px] uppercase font-bold tracking-wider">
              {lang === "ja" ? "平均予算" : "Average Spend"}
            </span>
            <span className="text-white font-extrabold text-sm">{restaurant.averageSpend}</span>
          </div>
          <div>
            <span className="text-zinc-500 block text-[10px] uppercase font-bold tracking-wider">
              {lang === "ja" ? "営業時間" : "Opening Hours"}
            </span>
            <span className="text-zinc-200 font-medium truncate block">
              {lang === "ja" ? restaurant.hoursJa : restaurant.hours}
            </span>
          </div>
          <div>
            <span className="text-zinc-500 block text-[10px] uppercase font-bold tracking-wider">
              {lang === "ja" ? "最寄り駅" : "Nearest Station"}
            </span>
            <span className="text-zinc-200 font-medium truncate block">
              {lang === "ja" ? restaurant.nearestStationJa : restaurant.nearestStation}
            </span>
          </div>
          <div>
            <span className="text-zinc-500 block text-[10px] uppercase font-bold tracking-wider">
              {lang === "ja" ? "満足度評価" : "Rating & Reviews"}
            </span>
            <span className="text-amber-400 font-black text-sm">
              ★ {restaurant.rating}{" "}
              <span className="text-zinc-400 text-xs font-normal">
                ({restaurant.reviewsCount.toLocaleString()})
              </span>
            </span>
          </div>
        </div>

        {/* Tab Navigation Controls */}
        <div className="flex border-b border-white/10 px-4 sm:px-8 bg-zinc-950/40 text-xs sm:text-sm font-bold gap-6">
          <button
            type="button"
            onClick={() => setActiveTab("overview")}
            className={`py-3.5 border-b-2 transition-colors ${
              activeTab === "overview"
                ? "border-red-600 text-white"
                : "border-transparent text-zinc-400 hover:text-zinc-200"
            }`}
          >
            {lang === "ja" ? "概要・こだわり" : "Overview & Story"}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("menu")}
            className={`py-3.5 border-b-2 transition-colors ${
              activeTab === "menu"
                ? "border-red-600 text-white"
                : "border-transparent text-zinc-400 hover:text-zinc-200"
            }`}
          >
            {lang === "ja" ? "代表メニュー・価格" : "Signature Menu"}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("staff")}
            className={`py-3.5 border-b-2 transition-colors ${
              activeTab === "staff"
                ? "border-red-600 text-white"
                : "border-transparent text-zinc-400 hover:text-zinc-200"
            }`}
          >
            {lang === "ja" ? "料理長・職人 (Staff)" : "Master Chefs & Staff"}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("book")}
            className={`py-3.5 border-b-2 transition-colors ${
              activeTab === "book"
                ? "border-red-600 text-red-400 glow-red"
                : "border-transparent text-red-500 hover:text-red-400"
            }`}
          >
            {lang === "ja" ? "⚡ 席予約・事前決済" : "⚡ Reserve & Pre-Pay"}
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-5 sm:p-8 space-y-6 flex-1">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6 animate-fade-in-up">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-red-500 mb-2">
                  {lang === "ja" ? "伝統と哲学" : "Philosophy & Heritage"}
                </h3>
                <p className="text-zinc-300 leading-relaxed text-sm sm:text-base">
                  {lang === "ja" ? restaurant.descriptionJa : restaurant.description}
                </p>
              </div>

              {/* Gallery Photos Row */}
              {restaurant.gallery.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
                    {lang === "ja" ? "店舗・料理ギャラリー" : "Photo Gallery"}
                  </h4>
                  <div className="grid grid-cols-3 gap-3">
                    {restaurant.gallery.map((img, idx) => (
                      <div
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className="relative h-24 sm:h-36 rounded-2xl overflow-hidden border border-white/10 hover:border-red-500 cursor-pointer transition-all"
                      >
                        <Image src={img} alt="" fill sizes="250px" className="object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Amenities & Atmosphere */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
                  {t.modalFeatures}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {(lang === "ja" ? restaurant.featuresJa : restaurant.features).map((feat, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-zinc-900 text-zinc-300 border border-white/10"
                    >
                      ✓ {feat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Address & Google Maps link */}
              <div className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <span className="text-xs text-zinc-500 block mb-1">{t.modalAddress}</span>
                  <span className="text-white font-medium text-sm">
                    {lang === "ja" ? restaurant.addressJa : restaurant.address}
                  </span>
                  <span className="text-xs text-red-400 block mt-1">
                    📞 {restaurant.phone}
                  </span>
                </div>
                <a
                  href={restaurant.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full bg-white text-zinc-950 font-bold text-xs hover:bg-zinc-200 transition-colors shrink-0 shadow"
                >
                  🗺️ {t.modalViewMap}
                </a>
              </div>
            </div>
          )}

          {/* TAB 2: SIGNATURE MENU */}
          {activeTab === "menu" && (
            <div className="space-y-4 animate-fade-in-up">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                {t.modalSignatures}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {restaurant.signatures.map((dish, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-zinc-900/80 border border-white/10 space-y-2 hover:border-red-500/40 transition-colors"
                  >
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="font-extrabold text-white text-base">
                        {lang === "ja" ? dish.nameJa : dish.name}
                      </h4>
                      <span className="text-sm font-black text-red-400 bg-red-950/60 px-3 py-1 rounded-xl border border-red-800/40 shrink-0">
                        {dish.price}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">{dish.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: MASTER CHEFS & STAFF (Reference image "Cast") */}
          {activeTab === "staff" && (
            <div className="space-y-6 animate-fade-in-up">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-red-500 mb-1">
                  {lang === "ja" ? "料理人・スタッフ紹介" : "Kitchen Masters & Hostesses"}
                </h3>
                <p className="text-xs text-zinc-400">
                  {lang === "ja"
                    ? "この名店を支える料理長・職人・伝統の担い手たち"
                    : "The dedicated culinary artisans who preserve centuries-old recipes"}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {restaurant.staff.map((member, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center text-center p-5 rounded-2xl bg-zinc-900/60 border border-white/10"
                  >
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-red-500/60 mb-3 shadow-lg glow-red">
                      <Image
                        src={member.avatar}
                        alt={member.name}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    </div>
                    <h4 className="font-bold text-white text-sm">
                      {lang === "ja" ? member.nameJa : member.name}
                    </h4>
                    <span className="text-xs text-red-400 mt-0.5">
                      {lang === "ja" ? member.roleJa : member.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: BOOKING / FOOD APPOINTMENT & ADVANCE PAYMENT */}
          {activeTab === "book" && (
            <div className="space-y-6 animate-fade-in-up">
              {bookingConfirmed ? (
                /* Booking Confirmation Ticket */
                <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-red-500/50 shadow-2xl space-y-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-600/20 border border-emerald-500/50 flex items-center justify-center text-3xl mx-auto shadow-lg glow-red">
                    ✓
                  </div>
                  <div>
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                      {lang === "ja" ? "予約・決済が完了しました" : "Reservation & Payment Confirmed"}
                    </span>
                    <h3 className="text-2xl font-black text-white mt-1">
                      {lang === "ja" ? "ご来店予約が確定しました" : "Your Table is Confirmed!"}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1">
                      Booking Reference: <strong className="text-white font-mono">{bookingRefId}</strong>
                    </p>
                  </div>

                  {/* Confirmed Details Ticket Card */}
                  <div className="max-w-md mx-auto p-5 rounded-2xl bg-black/60 border border-white/10 text-left space-y-3 text-xs">
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span className="text-zinc-500">{lang === "ja" ? "店舗名" : "Venue"}</span>
                      <span className="text-white font-bold">{restaurant.nameJa}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span className="text-zinc-500">{lang === "ja" ? "日時" : "Date & Time"}</span>
                      <span className="text-white font-mono">{selectedDate} @ {selectedTime}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span className="text-zinc-500">{lang === "ja" ? "人数" : "Party Size"}</span>
                      <span className="text-white font-bold">{partySize} {lang === "ja" ? "名様" : "Guests"}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span className="text-zinc-500">{lang === "ja" ? "コース" : "Selected Course"}</span>
                      <span className="text-red-400 font-bold">{lang === "ja" ? currentCourse.courseNameJa : currentCourse.courseName}</span>
                    </div>
                    <div className="flex justify-between pt-1">
                      <span className="text-zinc-500">{lang === "ja" ? "決済ステータス" : "Payment"}</span>
                      <span className="text-emerald-400 font-bold">
                        {payAdvance
                          ? `${lang === "ja" ? "事前デポジット決済済" : "Advance Deposit Paid"}: ¥${(currentCourse.depositRequired * partySize).toLocaleString()}`
                          : lang === "ja" ? "当日現地払い" : "Pay at Venue"}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => setBookingConfirmed(false)}
                      className="px-6 py-2.5 rounded-full bg-zinc-800 text-zinc-300 text-xs font-bold hover:bg-zinc-700"
                    >
                      {lang === "ja" ? "もう一度予約する" : "Book Another Slot"}
                    </button>
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-6 py-2.5 rounded-full bg-red-600 text-white text-xs font-bold hover:bg-red-500 glow-red"
                    >
                      {t.modalClose}
                    </button>
                  </div>
                </div>
              ) : (
                /* Interactive Booking Form */
                <form onSubmit={handleConfirmBooking} className="space-y-6">
                  <div>
                    <h3 className="text-base font-black text-white">
                      {lang === "ja" ? "ご来店予約・事前決済" : "Table Reservation & Advance Payment"}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1">
                      {lang === "ja"
                        ? "訪問日時と人数を選択し、事前決済で確実にお席を確保できます。"
                        : "Select your visit date, hour, party size, and course to guarantee your seating."}
                    </p>
                  </div>

                  {/* Step 1: Party Size & Date & Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Date */}
                    <div>
                      <label className="block text-xs font-bold text-zinc-400 mb-1.5 uppercase">
                        {lang === "ja" ? "ご来店日" : "Visiting Date"}
                      </label>
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:outline-none focus:border-red-500 font-mono"
                        required
                      />
                    </div>

                    {/* Time Slot */}
                    <div>
                      <label className="block text-xs font-bold text-zinc-400 mb-1.5 uppercase">
                        {lang === "ja" ? "ご来店時間" : "Time Slot"}
                      </label>
                      <select
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:outline-none focus:border-red-500 font-mono"
                      >
                        <option value="11:30">11:30 AM (Lunch)</option>
                        <option value="12:30">12:30 PM (Lunch)</option>
                        <option value="13:30">1:30 PM (Lunch)</option>
                        <option value="17:30">5:30 PM (Dinner 1st)</option>
                        <option value="18:30">6:30 PM (Dinner peak)</option>
                        <option value="19:30">7:30 PM (Dinner peak)</option>
                        <option value="20:30">8:30 PM (Dinner 2nd)</option>
                      </select>
                    </div>

                    {/* Guests */}
                    <div>
                      <label className="block text-xs font-bold text-zinc-400 mb-1.5 uppercase">
                        {lang === "ja" ? "ご来店人数" : "Guests (Party)"}
                      </label>
                      <select
                        value={partySize}
                        onChange={(e) => setPartySize(Number(e.target.value))}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:outline-none focus:border-red-500"
                      >
                        {[1, 2, 3, 4, 5, 6, 8].map((n) => (
                          <option key={n} value={n}>
                            {n} {lang === "ja" ? "名様" : n === 1 ? "Person" : "Guests"}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Step 2: Course Selection */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-400 mb-2 uppercase">
                      {lang === "ja" ? "ご予約コースの選択" : "Select Course / Menu"}
                    </label>
                    <div className="space-y-2.5">
                      {restaurant.bookingOptions.map((opt, idx) => (
                        <div
                          key={idx}
                          onClick={() => setSelectedCourseIndex(idx)}
                          className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                            selectedCourseIndex === idx
                              ? "bg-red-950/40 border-red-500 shadow-md glow-red"
                              : "bg-zinc-900/60 border-white/10 hover:border-white/20"
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <h4 className="font-bold text-white text-sm">
                              {lang === "ja" ? opt.courseNameJa : opt.courseName}
                            </h4>
                            <span className="text-red-400 font-black text-sm">
                              ¥{opt.pricePerPerson.toLocaleString()} / person
                            </span>
                          </div>
                          <p className="text-xs text-zinc-400 mt-1">
                            {lang === "ja" ? opt.descriptionJa : opt.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Step 3: Advance Payment vs Pay at Door */}
                  <div className="p-4 rounded-2xl bg-zinc-900/80 border border-white/10 space-y-3">
                    <label className="block text-xs font-bold text-zinc-400 uppercase">
                      {lang === "ja" ? "お支払い方法の選択" : "Payment Preference"}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div
                        onClick={() => setPayAdvance(true)}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                          payAdvance
                            ? "bg-red-950/60 border-red-500 text-white glow-red"
                            : "bg-black/40 border-white/10 text-zinc-400"
                        }`}
                      >
                        <div className="flex items-center justify-between font-bold text-xs mb-1">
                          <span>💳 {lang === "ja" ? "事前デポジット決済 (推奨)" : "Advance Deposit (Guaranteed)"}</span>
                          <span className="text-emerald-400">
                            ¥{(currentCourse.depositRequired * partySize).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-400 leading-tight">
                          {lang === "ja"
                            ? "お席を最優先確保。残金はご来店時のお会計時に差し引かれます。"
                            : "Lock in your table with instant confirmation. Balance settled at venue."}
                        </p>
                      </div>

                      <div
                        onClick={() => setPayAdvance(false)}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                          !payAdvance
                            ? "bg-red-950/60 border-red-500 text-white glow-red"
                            : "bg-black/40 border-white/10 text-zinc-400"
                        }`}
                      >
                        <div className="font-bold text-xs mb-1">
                          <span>🚪 {lang === "ja" ? "当日現地払い" : "Pay in Full at Venue"}</span>
                        </div>
                        <p className="text-[11px] text-zinc-400 leading-tight">
                          {lang === "ja"
                            ? "事前引き落としなし。来店時に現金またはカードでお支払い。"
                            : "No charge today. Settle entire bill during your dining visit."}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* User details */}
                  <div className="text-xs text-zinc-400">
                    {user ? (
                      <p>
                        Booking as: <strong className="text-white">{user.name}</strong> ({user.phone})
                      </p>
                    ) : (
                      <p className="text-zinc-500">
                        {lang === "ja"
                          ? "※ ゲスト予約として受付されます。ログインすると履歴が保存されます。"
                          : "Booking as verified guest. Sign in to track reservations in your profile."}
                      </p>
                    )}
                  </div>

                  {/* Submit Booking Button */}
                  <button
                    type="submit"
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-sm tracking-wide shadow-xl glow-red-lg transition-all"
                  >
                    {payAdvance
                      ? `${lang === "ja" ? "事前デポジット" : "Pay Deposit & Confirm"}: ¥${(currentCourse.depositRequired * partySize).toLocaleString()} →`
                      : lang === "ja" ? "予約を確定する →" : "Confirm Table Reservation →"}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="border-t border-white/10 p-4 sm:p-6 bg-zinc-950/90 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{lang === "ja" ? "実在する店舗情報を直接掲載中" : "Authentic Verified Japanese Dining"}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs transition-colors"
          >
            {t.modalClose}
          </button>
        </div>
      </div>
    </div>
  );
}
