"use client"

import { useState } from "react"
import Link from "next/link"

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="bg-black/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Left — wordmark */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="text-red-600 text-2xl font-black leading-none">店</span>
          <div className="flex flex-col leading-none">
            <span className="text-sm font-bold tracking-widest text-white uppercase">
              machi-mise
            </span>
            <span className="text-[10px] text-zinc-500">まちの店</span>
          </div>
        </Link>

        {/* Center — desktop nav */}
        <nav className="hidden sm:flex items-center gap-6">
          <Link href="#browse" className="text-zinc-400 hover:text-white transition-colors text-sm">
            Browse
          </Link>
          <Link
            href="#categories"
            className="text-zinc-400 hover:text-white transition-colors text-sm"
          >
            Categories
          </Link>
          <Link href="#" className="text-zinc-400 hover:text-white transition-colors text-sm">
            About
          </Link>
        </nav>

        {/* Right — desktop actions */}
        <div className="hidden sm:flex items-center gap-3">
          <Link href="/login" className="text-zinc-400 hover:text-white text-sm transition-colors">
            Log in
          </Link>
          <Link
            href="/login"
            className="bg-red-600 text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-red-500 transition-colors"
          >
            Sign up
          </Link>
        </div>

        {/* Mobile — hamburger */}
        <button
          className="sm:hidden text-white text-xl p-1"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="sm:hidden absolute top-16 left-0 right-0 bg-zinc-900 border-b border-white/5 p-4 flex flex-col gap-3 z-50">
          <Link
            href="#browse"
            onClick={() => setOpen(false)}
            className="text-zinc-300 hover:text-white text-sm py-1"
          >
            Browse
          </Link>
          <Link
            href="#categories"
            onClick={() => setOpen(false)}
            className="text-zinc-300 hover:text-white text-sm py-1"
          >
            Categories
          </Link>
          <Link
            href="#"
            onClick={() => setOpen(false)}
            className="text-zinc-300 hover:text-white text-sm py-1"
          >
            About
          </Link>
          <div className="border-t border-white/5 pt-3 flex flex-col gap-2">
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="text-zinc-400 hover:text-white text-sm"
            >
              Log in
            </Link>
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="bg-red-600 text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-red-500 transition-colors text-center"
            >
              Sign up
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
