"use client"

import { useState, useEffect } from "react"

export default function CookieBanner() {
  const [dismissed, setDismissed] = useState(true) // start hidden to avoid flash

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      setDismissed(false)
    }
  }, [])

  if (dismissed) return null

  const handleConsent = () => {
    localStorage.setItem("cookie-consent", "true")
    setDismissed(true)
  }

  return (
    <div className="fixed bottom-24 sm:bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-sm z-50 animate-slide-up">
      <div className="bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl p-4">
        <p className="font-bold text-white text-sm mb-1">We use cookies 🍪</p>
        <p className="text-xs text-zinc-400 leading-relaxed mb-4">
          We use cookies to improve your experience and analyze site traffic. By continuing, you
          agree to our use of cookies.
        </p>
        <div className="flex gap-2">
          <button
            onClick={handleConsent}
            className="bg-red-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-red-500 transition-colors"
          >
            Accept
          </button>
          <button
            onClick={handleConsent}
            className="text-zinc-400 text-sm px-4 py-2 hover:text-white transition-colors"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  )
}
