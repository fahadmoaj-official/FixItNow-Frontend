
import { IService } from "@/lib/types"

type GetServicesResponse = {
  success: boolean
  message?: string
  data?: IService[]
}

export const getServices = async (): Promise<GetServicesResponse> => {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/services/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    )

    const result = await response.json()

    if (!response.ok) {
      return {
        success: false,
        message: result.message || "Failed to fetch services",
      }
    }

    return {
      success: true,
      data: result.data,
    }
  } catch (error) {
    console.error("Get services error:", error)

    return {
      success: false,
      message: "Something went wrong while fetching services",
    }
  }
}

