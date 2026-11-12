"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function MobileStickyCtA() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.6)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (dismissed) return null
  if (!visible) return null

  return (
    <div className="fixed bottom-20 left-4 right-4 z-40 sm:hidden animate-slide-up">
      <div className="bg-red-700 rounded-2xl p-3 shadow-2xl flex items-center gap-3 relative">
        <p className="text-white text-sm font-semibold flex-1">Sign up free — 無料登録</p>
        <Link
          href="/login"
          className="text-white font-bold text-sm shrink-0 hover:text-red-200 transition-colors"
        >
          Get started →
        </Link>
        <button
          onClick={() => setDismissed(true)}
          className="absolute top-2 right-2 text-white/70 hover:text-white text-xs leading-none p-1"
          aria-label="Dismiss"
        >
          ✕
        </button>
      </div>
    </div>
  )
}
