"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export interface User {
  phone: string;
  email?: string;
  name: string;
  avatar: string;
  memberSince: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (phone: string, email?: string) => void;
  logout: () => void;
  bookmarks: string[];
  toggleBookmark: (restaurantId: string) => void;
  isBookmarked: (restaurantId: string) => boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  bookmarks: [],
  toggleBookmark: () => {},
  isBookmarked: () => false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const storedUser = localStorage.getItem("machi-mise-user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }

      const storedBookmarks = localStorage.getItem("machi-mise-bookmarks");
      if (storedBookmarks) {
        setBookmarks(JSON.parse(storedBookmarks));
      } else {
        // Pre-save 2 favorites by default for delightful first impression
        const defaults = ["sukiyabashi-jiro", "afuri-harajuku"];
        setBookmarks(defaults);
        localStorage.setItem("machi-mise-bookmarks", JSON.stringify(defaults));
      }
    } catch {
      // storage unavailable
    }
  }, []);

  const login = (phone: string, email?: string) => {
    // Generate friendly display name from phone digits
    const cleanDigits = phone.replace(/\D/g, "");
    const lastDigits = cleanDigits.slice(-4) || "7788";
    const newUser: User = {
      phone,
      email: email || undefined,
      name: `Machi Explorer #${lastDigits}`,
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${cleanDigits || "guest"}`,
      memberSince: "Nov 2026",
    };
    setUser(newUser);
    try {
      localStorage.setItem("machi-mise-user", JSON.stringify(newUser));
    } catch {
      // ignore
    }
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem("machi-mise-user");
    } catch {
      // ignore
    }
  };

  const toggleBookmark = (id: string) => {
    setBookmarks((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem("machi-mise-bookmarks", JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const isBookmarked = (id: string) => {
    return bookmarks.includes(id);
  };

  return (
    <AuthContext.Provider
      value={{
        user: mounted ? user : null,
        isAuthenticated: mounted && !!user,
        login,
        logout,
        bookmarks: mounted ? bookmarks : [],
        toggleBookmark,
        isBookmarked,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
