import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Wordmark */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-red-700 text-2xl font-bold leading-none select-none">
            店
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-sm font-bold tracking-widest text-stone-900 uppercase">
              machi-mise
            </span>
            <span className="text-[10px] text-stone-400 tracking-wider">
              まちの店
            </span>
          </span>
        </Link>

        {/* Nav links */}
        <nav className="hidden sm:flex items-center gap-6 text-sm text-stone-600">
          <Link href="#browse" className="hover:text-red-700 transition-colors">
            Browse
          </Link>
          <Link
            href="#categories"
            className="hover:text-red-700 transition-colors"
          >
            Categories
          </Link>
          <Link href="#about" className="hover:text-red-700 transition-colors">
            About
          </Link>
        </nav>

        {/* Auth CTA */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm font-medium text-stone-700 hover:text-red-700 transition-colors"
          >
            Log in
          </Link>
          <Link
            href="/login"
            className="text-sm font-semibold px-4 py-2 rounded-full bg-red-700 text-white hover:bg-red-800 transition-colors"
          >
            Sign up
          </Link>
        </div>
      </div>
    </header>
  );
}
