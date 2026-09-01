
import { getServices } from "./_actions/getServices"
import { ServiceGrid } from "./_components/ServiceGrid"

export default async function ServicesPage() {
  const result = await getServices()

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Find a service
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Popular Services
          </h1>

          <p className="mt-3 max-w-2xl text-slate-500">
            Find trusted technicians and professional services near you.
          </p>
        </div>

        {/* Error */}
        {!result.success ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
            <h2 className="font-semibold text-red-700">
              Unable to load services
            </h2>

            <p className="mt-2 text-sm text-red-600">
              {result.message}
            </p>
          </div>
        ) : (
          <ServiceGrid services={result.data ?? []} />
        )}
      </div>
    </main>
  )
}

