"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"

const NAV_ITEMS = [
  { label: "Home", href: "/", icon: "🏠" },
  { label: "Browse", href: "#browse", icon: "🔍" },
  { label: "Map", href: "#", icon: "🗺️" },
  { label: "Saved", href: "#", icon: "🔖" },
  { label: "Search", href: "#", icon: "🔍" },
]

export default function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 sm:hidden">
      <div className="bg-zinc-900/95 backdrop-blur border-t border-white/5 px-6 py-3 pb-safe">
        <div className="flex justify-around">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.label}
                href={item.href}
                className="flex flex-col items-center gap-1"
              >
                <span className="text-xl">{item.icon}</span>
                <span
                  className={`text-[10px] transition-colors ${
                    isActive ? "text-red-500" : "text-zinc-400"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
