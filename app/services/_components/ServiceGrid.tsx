
import { IService } from "@/lib/types"
import { ServiceCard } from "./ServiceCard"

interface ServiceGridProps {
  services: IService[]
}

export function ServiceGrid({ services }: ServiceGridProps) {
  if (services.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center">
        <div className="text-5xl">🔍</div>

        <h3 className="mt-4 text-lg font-semibold text-slate-900">
          No services found
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          Try changing your search or filters.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          service={service}
        />
      ))}
    </div>
  )
}

