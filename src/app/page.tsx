import type { Metadata } from "next";
import HomeClientExperience from "@/components/HomeClientExperience";

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
  return <HomeClientExperience />;
}
