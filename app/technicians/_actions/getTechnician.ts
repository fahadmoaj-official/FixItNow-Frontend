
import { ITechnicianResponse } from "@/lib/types"

export async function getTechnician(
  id: string
): Promise<ITechnicianResponse> {
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/technicians/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  )

  if (!response.ok) {
    throw new Error("Failed to fetch technician")
  }

  return response.json()
}
