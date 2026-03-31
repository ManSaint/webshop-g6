export default function Loading() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--color-cream)" }}>
      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="h-3 w-32 rounded mb-6 animate-pulse"
          style={{ backgroundColor: "var(--color-border-store)" }} />

        <div className="h-8 w-48 rounded mb-2 animate-pulse"
          style={{ backgroundColor: "var(--color-border-store)" }} />
        <div className="h-3 w-20 rounded mb-8 animate-pulse"
          style={{ backgroundColor: "var(--color-border-store)" }} />

        <div className="flex gap-10">

        
          <div className="w-48 shrink-0 space-y-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-3 rounded animate-pulse"
                style={{ backgroundColor: "var(--color-border-store)", width: `${60 + Math.random() * 40}%` }} />
            ))}
          </div>

         
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i}>
                <div className="w-full h-[320px] rounded animate-pulse"
                  style={{ backgroundColor: "var(--color-border-store)" }} />
                <div className="mt-4 h-3 w-3/4 rounded animate-pulse"
                  style={{ backgroundColor: "var(--color-border-store)" }} />
                <div className="mt-2 h-3 w-1/4 rounded animate-pulse"
                  style={{ backgroundColor: "var(--color-border-store)" }} />
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}