import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
      {/* Background decorative kanji */}
      <div className="absolute inset-0 flex items-center justify-center text-[30vw] font-black text-white/[0.02] select-none pointer-events-none">
        迷
      </div>
      <div className="relative z-10">
        <p className="text-8xl font-black text-red-600 mb-4">404</p>
        <h1 className="text-2xl font-bold text-white mb-2">Page Not Found</h1>
        <p className="text-zinc-500 mb-2">ページが見つかりません</p>
        <p className="text-zinc-600 text-sm mb-10 max-w-sm">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-3.5 rounded-full bg-red-600 text-white font-bold hover:bg-red-500 transition-colors"
        >
          ← Back to machi-mise
        </Link>
      </div>
    </div>
  );
}

