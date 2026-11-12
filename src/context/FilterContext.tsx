"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type PrefectureId = "all" | "tokyo" | "osaka" | "kyoto" | "fukuoka";

export interface PrefectureOption {
  id: PrefectureId;
  label: string;
  labelJa: string;
  romaji: string;
  badge: string;
}

export const PREFECTURES: PrefectureOption[] = [
  { id: "all", label: "All Prefectures", labelJa: "全国すべての県", romaji: "All Regions", badge: "JP" },
  { id: "tokyo", label: "Tokyo", labelJa: "東京都", romaji: "Tokyo-to", badge: "東京 12店" },
  { id: "osaka", label: "Osaka", labelJa: "大阪府", romaji: "Osaka-fu", badge: "大阪 12店" },
  { id: "kyoto", label: "Kyoto", labelJa: "京都府", romaji: "Kyoto-fu", badge: "京都 6店" },
  { id: "fukuoka", label: "Fukuoka", labelJa: "福岡県", romaji: "Fukuoka-ken", badge: "福岡 4店" },
];

interface FilterContextType {
  selectedKen: PrefectureId;
  setSelectedKen: (ken: PrefectureId) => void;
  selectedFoodType: string;
  setSelectedFoodType: (food: string) => void;
  foodModalOpen: boolean;
  setFoodModalOpen: (open: boolean) => void;
  requireLoginModalOpen: boolean;
  setRequireLoginModalOpen: (open: boolean) => void;
}

const FilterContext = createContext<FilterContextType>({
  selectedKen: "tokyo", // Default to Tokyo with 12 shops!
  setSelectedKen: () => {},
  selectedFoodType: "all",
  setSelectedFoodType: () => {},
  foodModalOpen: false,
  setFoodModalOpen: () => {},
  requireLoginModalOpen: false,
  setRequireLoginModalOpen: () => {},
});

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [selectedKen, setSelectedKenState] = useState<PrefectureId>("tokyo");
  const [selectedFoodType, setSelectedFoodType] = useState<string>("all");
  const [foodModalOpen, setFoodModalOpen] = useState(false);
  const [requireLoginModalOpen, setRequireLoginModalOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("machi-mise-ken") as PrefectureId;
      if (saved && PREFECTURES.some((p) => p.id === saved)) {
        setSelectedKenState(saved);
      }
    } catch {
      // ignore
    }
  }, []);

  const setSelectedKen = (ken: PrefectureId) => {
    setSelectedKenState(ken);
    try {
      localStorage.setItem("machi-mise-ken", ken);
    } catch {
      // ignore
    }
  };

  return (
    <FilterContext.Provider
      value={{
        selectedKen,
        setSelectedKen,
        selectedFoodType,
        setSelectedFoodType,
        foodModalOpen,
        setFoodModalOpen,
        requireLoginModalOpen,
        setRequireLoginModalOpen,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  return useContext(FilterContext);
}

