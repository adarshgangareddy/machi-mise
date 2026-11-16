import type { Metadata } from "next";
import HomeClientExperience from "@/components/HomeClientExperience";

export const metadata: Metadata = {
  title: "Member Dashboard — machi-mise (まちの店)",
  description: "Verified member bookings, saved spots, and dining appointments.",
};

export default function DashboardPage() {
  return <HomeClientExperience />;
}

