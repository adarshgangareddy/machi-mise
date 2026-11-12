import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { REAL_RESTAURANTS } from "@/data/restaurants";
import ShopDashboardView from "@/components/ShopDashboardView";

export async function generateStaticParams() {
  return REAL_RESTAURANTS.map((shop) => ({
    id: shop.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const shop = REAL_RESTAURANTS.find((r) => r.id === id);

  if (!shop) {
    return {
      title: "Establishment Not Found | machi-mise (まちの店)",
      description: "Verified authentic Japanese dining establishments and booking.",
    };
  }

  return {
    title: `${shop.name} (${shop.nameJa}) — Machi-Mise Japanese Directory & Booking`,
    description: `${shop.tagline}. ${shop.description.slice(0, 150)}...`,
    openGraph: {
      title: `${shop.name} | machi-mise`,
      description: shop.tagline,
      images: [{ url: shop.image }],
    },
  };
}

export default async function ShopPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const restaurant = REAL_RESTAURANTS.find((r) => r.id === id);

  if (!restaurant) {
    notFound();
  }

  return <ShopDashboardView restaurant={restaurant} />;
}
