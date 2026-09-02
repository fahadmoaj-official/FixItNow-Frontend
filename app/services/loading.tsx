import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">
          <Skeleton className="h-9 w-64" />
          <Skeleton className="mt-3 h-5 w-96" />
        </div>

        {/* Search */}
        <div className="mb-8">
          <Skeleton className="h-14 w-full rounded-2xl" />
        </div>

        {/* Content */}
        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">

          {/* Sidebar */}
          <div className="hidden lg:block">
            <div className="rounded-2xl border bg-white p-6">
              <Skeleton className="h-6 w-24" />

              <Skeleton className="mt-8 h-5 w-32" />
              <Skeleton className="mt-4 h-5 w-40" />
              <Skeleton className="mt-3 h-5 w-36" />
              <Skeleton className="mt-3 h-5 w-32" />

              <Skeleton className="mt-8 h-5 w-24" />
              <Skeleton className="mt-4 h-11 w-full rounded-xl" />

              <Skeleton className="mt-8 h-5 w-28" />

              <div className="mt-4 grid grid-cols-2 gap-3">
                <Skeleton className="h-11 rounded-xl" />
                <Skeleton className="h-11 rounded-xl" />
              </div>

              <div className="mt-7 flex gap-3">
                <Skeleton className="h-11 flex-1 rounded-xl" />
                <Skeleton className="h-11 flex-1 rounded-xl" />
              </div>
            </div>
          </div>

          {/* Services */}
          <section>
            <div className="mb-5 flex items-center justify-between">
              <Skeleton className="h-7 w-28" />
              <Skeleton className="h-5 w-28" />
            </div>

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <Skeleton className="h-40 w-full rounded-xl" />

                  <Skeleton className="mt-5 h-6 w-3/4" />

                  <Skeleton className="mt-3 h-4 w-full" />
                  <Skeleton className="mt-2 h-4 w-5/6" />

                  <div className="mt-5 flex items-center justify-between">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-5 w-24" />
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}