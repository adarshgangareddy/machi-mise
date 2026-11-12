import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategoriesSection from "@/components/CategoriesSection";
import DirectorySection from "@/components/DirectorySection";
import CommunityShareAndPlatforms from "@/components/CommunityShareAndPlatforms";
import BusinessCtaBanner from "@/components/BusinessCtaBanner";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import MobileStickyCtA from "@/components/MobileStickyCtA";
import MobileNav from "@/components/MobileNav";
import FoodFilterModal from "@/components/FoodFilterModal";
import RequireLoginModal from "@/components/RequireLoginModal";

export const metadata: Metadata = {
  title: "まちの店 — Discover Authentic Japanese Restaurants & Local Gems",
  description:
    "Find authentic Japanese restaurants, 3-Star Michelin sushi, hundred-year izakayas, and famous ramen shops. Verified real locations, menus, and reservation guides. まちの店 — 日本全国の厳選グルメ・名店案内。",
  openGraph: {
    title: "machi-mise (まちの店) — Japanese Restaurant Directory",
    description:
      "Explore Japan's greatest kitchens with verified real menus, ratings, and reservation information.",
    images: [{ url: "/og-image.jpg" }],
    type: "website",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "machi-mise — まちの店",
    description: "Discover authentic Japanese culinary institutions and local businesses.",
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 selection:bg-red-600 selection:text-white">
      {/* 1. Sticky Navigation Bar with Language Switcher and Auth Status */}
      <Navbar />

      {/* 2. Hero Section with Streaming Dark Aesthetic and Live Badge */}
      <HeroSection />

      {/* 3. Browse Categories & Cuisines Showcase */}
      <CategoriesSection />

      {/* 4. Interactive Live Search, Filter & Real Japanese Restaurant Directory */}
      <DirectorySection />

      {/* 4.5. MultiMovies-style Community Share Count & Available Across Japan Badges */}
      <CommunityShareAndPlatforms />

      {/* 5. Business Registration CTA Banner */}
      <BusinessCtaBanner />

      {/* 6. Comprehensive Footer with Real Tokyo HQ Address and Legal Links */}
      <Footer />

      {/* 7. Cookie Banner with Persistent Consent */}
      <CookieBanner />

      {/* 8. Mobile Sticky Call-To-Action above bottom navigation */}
      <MobileStickyCtA />

      {/* 9. Floating Mobile Bottom Navigation Bar (Streaming/MultiMovies style) */}
      <MobileNav />

      {/* 10. Modals: Food Cuisine Filter & Require Login Prompt */}
      <FoodFilterModal />
      <RequireLoginModal />
    </div>
  );
}
