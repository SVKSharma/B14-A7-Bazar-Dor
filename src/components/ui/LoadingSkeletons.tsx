function SkeletonBlock({ className }: { className: string }) {
  return <div aria-hidden="true" className={`skeleton-shimmer ${className}`} />;
}

function ProductCardsSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          aria-hidden="true"
          className="rounded-2xl border border-emerald-900/10 bg-white p-4 shadow-[0_8px_24px_-20px_rgba(0,80,40,0.3)] sm:p-5"
        >
          <div className="mb-4 flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <SkeletonBlock className="h-11 w-11 shrink-0 rounded-xl" />
              <div className="flex-1 space-y-2">
                <SkeletonBlock className="h-4 w-28 max-w-full rounded" />
                <SkeletonBlock className="h-3 w-20 max-w-full rounded" />
              </div>
            </div>
            <SkeletonBlock className="h-6 w-6 shrink-0 rounded-full" />
          </div>
          <div className="flex items-end justify-between border-t border-gray-100 pt-4">
            <div className="space-y-2">
              <SkeletonBlock className="h-3 w-20 rounded" />
              <div className="flex items-baseline gap-2">
                <SkeletonBlock className="h-6 w-16 rounded" />
                <SkeletonBlock className="h-3 w-8 rounded" />
              </div>
            </div>
            <SkeletonBlock className="h-7 w-18 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function HomePageSkeleton() {
  return (
    <div className="w-full flex-1 bg-[#f8fbf7]">
      <section className="w-full py-6 sm:py-8">
        <div className="keep-content-center">
          <div className="relative flex min-h-72 flex-col items-center justify-between gap-7 overflow-hidden rounded-2xl border border-emerald-900/10 bg-white p-5 text-center shadow-[0_20px_60px_-40px_rgba(0,80,40,0.35)] sm:gap-8 sm:p-10 md:flex-row md:p-12 md:text-left">
            <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-emerald-50/70 blur-3xl" />
            <div className="relative z-10 flex w-full max-w-xl flex-col items-center space-y-4 md:flex-1 md:items-start">
              <SkeletonBlock className="h-7 w-40 rounded-lg" />
              <div className="flex w-full flex-col items-center space-y-2 md:items-start">
                <SkeletonBlock className="h-8 w-4/5 rounded-lg sm:h-9" />
                <SkeletonBlock className="h-8 w-3/5 rounded-lg sm:h-9" />
              </div>
              <div className="flex w-full flex-col items-center space-y-2 pt-1 md:items-start">
                <SkeletonBlock className="h-4 w-full rounded" />
                <SkeletonBlock className="h-4 w-11/12 rounded" />
                <SkeletonBlock className="h-4 w-4/5 rounded" />
              </div>
              <SkeletonBlock className="h-11 w-full rounded-xl sm:w-36" />
            </div>
            <div className="relative flex h-40 w-full max-w-64 items-center justify-center sm:h-52 sm:max-w-80 md:h-56 md:max-w-80">
              <div className="absolute h-40 w-40 rounded-full border border-emerald-100 sm:h-48 sm:w-48" />
              <div className="absolute h-32 w-32 rounded-full border border-dashed border-emerald-200 sm:h-40 sm:w-40" />
              <SkeletonBlock className="h-28 w-28 rounded-[2rem] shadow-lg shadow-emerald-900/10 sm:h-32 sm:w-32" />
              <SkeletonBlock className="absolute right-5 top-5 h-10 w-16 rounded-xl sm:right-8" />
              <SkeletonBlock className="absolute bottom-5 left-4 h-9 w-20 rounded-xl sm:bottom-8 sm:left-8" />
            </div>
          </div>
        </div>
      </section>
      <HomeProductsSkeleton />
    </div>
  );
}

export function HomeProductsSkeleton() {
  return (
    <section className="w-full space-y-8 bg-[#f8fbf7] py-8 sm:py-12">
      <div className="keep-content-center space-y-8">
        {[0, 1, 2].map((section) => (
          <div key={section} className="space-y-5">
            <SkeletonBlock className="h-7 w-48 rounded" />
            <ProductCardsSkeleton count={section === 2 ? 6 : 3} />
          </div>
        ))}
      </div>
    </section>
  );
}

export function CategoryPageSkeleton() {
  return (
    <div className="w-full flex-1 bg-[#f8fbf7] py-6 sm:py-8">
      <div className="keep-content-center space-y-6">
        <div className="flex items-center gap-4 rounded-2xl border border-emerald-900/10 bg-white p-6 shadow-[0_8px_24px_-20px_rgba(0,80,40,0.3)] sm:p-8">
          <SkeletonBlock className="h-14 w-14 shrink-0 rounded-2xl sm:h-16 sm:w-16" />
          <div className="flex-1 space-y-3">
            <SkeletonBlock className="h-7 w-48 rounded" />
            <div className="flex items-center gap-2">
              <SkeletonBlock className="h-3 w-3 rounded-full" />
              <SkeletonBlock className="h-4 w-56 max-w-full rounded" />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between gap-3">
          <SkeletonBlock className="h-4 w-40 rounded" />
          <SkeletonBlock className="h-10 w-48 rounded-xl" />
        </div>
        <ProductCardsSkeleton />
      </div>
    </div>
  );
}

export function ProductPageSkeleton() {
  return (
    <div className="w-full flex-1 bg-[#f8fbf7] py-6 sm:py-8">
      <div className="keep-content-center space-y-6">
        <SkeletonBlock className="h-6 w-64 max-w-full rounded" />
        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-emerald-900/10 bg-white p-6 shadow-[0_8px_24px_-20px_rgba(0,80,40,0.3)] sm:flex-row sm:items-center sm:p-8">
          <div className="flex items-center gap-4">
            <SkeletonBlock className="h-16 w-16 shrink-0 rounded-2xl sm:h-20 sm:w-20" />
            <div className="space-y-3">
              <SkeletonBlock className="h-8 w-48 rounded" />
              <SkeletonBlock className="h-4 w-36 rounded" />
              <SkeletonBlock className="h-4 w-56 max-w-full rounded" />
            </div>
          </div>
          <div className="w-full rounded-xl border border-emerald-900/5 bg-[#fafcf9] p-4 sm:w-56">
            <SkeletonBlock className="mx-auto mb-3 h-3 w-20 rounded sm:ml-auto" />
            <SkeletonBlock className="mx-auto mb-3 h-8 w-32 rounded sm:ml-auto" />
            <SkeletonBlock className="mx-auto h-6 w-20 rounded-full sm:ml-auto" />
          </div>
        </div>
        <div className="space-y-6 rounded-2xl border border-emerald-900/10 bg-white p-6 shadow-[0_8px_24px_-20px_rgba(0,80,40,0.3)] sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <SkeletonBlock className="h-6 w-40 rounded" />
            <SkeletonBlock className="h-5 w-20 rounded-full" />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[0, 1, 2].map((item) => (
              <div key={item} className="rounded-xl border border-emerald-900/5 bg-[#fafdf8] p-4">
                <SkeletonBlock className="mb-3 h-3 w-20 rounded" />
                <SkeletonBlock className="mb-2 h-7 w-28 rounded" />
                <SkeletonBlock className="h-3 w-32 max-w-full rounded" />
              </div>
            ))}
          </div>
          <SkeletonBlock className="h-6 w-56 rounded" />
          <div className="overflow-hidden rounded-xl border border-gray-200/80">
            <div className="grid grid-cols-5 gap-4 border-b border-gray-200/80 bg-[#f8fbf7] p-4">
              {[0, 1, 2, 3, 4].map((cell) => (
                <SkeletonBlock key={cell} className="h-4 w-full rounded" />
              ))}
            </div>
            {[0, 1, 2, 3].map((row) => (
              <div key={row} className="grid grid-cols-5 gap-4 border-b border-gray-100 p-4 last:border-0">
                {[0, 1, 2, 3, 4].map((cell) => (
                  <SkeletonBlock key={cell} className="h-4 w-full rounded" />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProfilePageSkeleton() {
  return (
    <div className="w-full flex-1 bg-[#f8fbf7] px-4 py-6 sm:py-8">
      <div className="keep-content-center max-w-lg space-y-5">
        <div className="space-y-2 text-center">
          <SkeletonBlock className="mx-auto h-8 w-48 rounded" />
          <SkeletonBlock className="mx-auto h-4 w-56 max-w-full rounded" />
        </div>
        <div className="space-y-5 rounded-2xl border border-emerald-900/10 bg-white p-6 shadow-[0_8px_24px_-20px_rgba(0,80,40,0.3)] sm:p-8">
          <div className="flex items-center gap-3 border-b border-gray-100 pb-5">
            <SkeletonBlock className="h-14 w-14 shrink-0 rounded-2xl" />
            <div className="flex-1 space-y-2">
              <SkeletonBlock className="h-5 w-32 rounded" />
              <SkeletonBlock className="h-4 w-48 max-w-full rounded" />
            </div>
            <SkeletonBlock className="h-10 w-24 rounded-xl" />
          </div>
          <SkeletonBlock className="h-5 w-20 rounded" />
          <SkeletonBlock className="h-11 rounded-xl" />
          <SkeletonBlock className="h-11 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
