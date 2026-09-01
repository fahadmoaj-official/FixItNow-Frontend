

import { getTechnician } from "../_actions/getTechnician"
import { TechnicianProfile } from "../_components/TechnicianProfile"

interface TechnicianPageProps {
  params: Promise<{
    id: string
  }>
  searchParams: Promise<{
    serviceId?: string
  }>
}

export default async function TechnicianPage({
  params,
  searchParams,
}: TechnicianPageProps) {
  const { id } = await params
  console.log("Technician ID:", id) 
  const { serviceId } = await searchParams

// const serviceId = "4abe8f25-9359-407b-87e0-1da017974c06";

  // Make sure serviceId exists
  if (!serviceId) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-red-500">
          Service ID is missing.
        </p>
      </main>
    )
  }

  const result = await getTechnician(id)

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <TechnicianProfile
          technician={result.data.result}
          serviceId={serviceId}
        />
      </div>
    </main>
  )
}