
import { IService } from "@/lib/types"

interface GetServicesParams {
  search?: string
  categoryId?: string
  location?: string
  minPrice?: string
  maxPrice?: string
  minRating?: string
}

export async function getServices(
  params: GetServicesParams
) {
  const query = new URLSearchParams()

  Object.entries(params).forEach(
    ([key, value]) => {
      if (value) {
        query.set(key, value)
      }
    }
  )

  const response = await fetch(
    `${process.env.BACKEND_URL}/api/services?${query.toString()}`,
    {
      cache: "no-store",
    }
  )

  if (!response.ok) {
    throw new Error("Failed to fetch services")
  }

  return response.json()
}
