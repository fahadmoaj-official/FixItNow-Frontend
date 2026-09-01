
"use server"

import { cookies } from "next/headers"

export type BookingState = {
  success: boolean
  message: string
}

export async function createBooking(
  prevState: BookingState,
  formData: FormData
): Promise<BookingState> {

  const serviceId = formData.get("serviceId")?.toString()
  const technicianId = formData.get("technicianId")?.toString()
  const bookingDate = formData.get("bookingDate")?.toString()
  const startTime = formData.get("startTime")?.toString()
  const endTime = formData.get("endTime")?.toString()

  // Basic validation
  if (
    !serviceId ||
    !technicianId ||
    !bookingDate ||
    !startTime ||
    !endTime
  ) {
    return {
      success: false,
      message: "Please fill in all booking fields.",
    }
  }

  // Validate time
  if (startTime >= endTime) {
    return {
      success: false,
      message: "End time must be after start time.",
    }
  }

  try {
    const cookieStore = await cookies()

    const accessToken =
      cookieStore.get("accessToken")?.value

    // Not logged in
    if (!accessToken) {
      return {
        success: false,
        message: "Please login before booking.",
      }
    }

    const response = await fetch(
      `${process.env.BACKEND_URL}/api/bookings`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          serviceId,
          technicianId,
          bookingDate,
          startTime,
          endTime,
        }),
      }
    )

    const result = await response.json()

    // Backend error
    if (!response.ok || !result.success) {
      return {
        success: false,
        message:
          result.message ||
          "Failed to create booking.",
      }
    }

    return {
      success: true,
      message: "Booking created successfully!",
    }

  } catch (error) {
    console.error("Create booking error:", error)

    return {
      success: false,
      message:
        "Something went wrong while creating booking.",
    }
  }
}
