export default function SkeletonCard() {
  return (
    <div className="rounded-2xl overflow-hidden bg-zinc-900 border border-white/5">
      {/* Image placeholder */}
      <div className="h-40 skeleton" />
      {/* Content placeholder */}
      <div className="p-4">
        <div className="h-4 w-3/4 mb-2 skeleton" />
        <div className="h-3 w-1/2 skeleton" />
      </div>
    </div>
  )
}
