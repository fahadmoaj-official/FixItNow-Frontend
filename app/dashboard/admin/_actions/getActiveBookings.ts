"use server";

export  async function getActiveBookings() {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/admin/bookings`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    console.log("Bookings Response status:", response.status, "URL:", `${process.env.BACKEND_URL}/api/admin/bookings`);

    if (!response.ok) {
      console.error("Backend returned error status:", response.status);
      return {
        success: false,
        message: `Failed to fetch active bookings - Status: ${response.status}`,
        count: 0,
      };
    }

    const result = await response.json();
    
    // Filter bookings with status CONFIRMED or IN_PROGRESS (these are considered "active")
    const activeBookings = result.data?.bookings?.filter(
      (booking: any) => booking.status === "CONFIRMED" || booking.status === "IN_PROGRESS"
    ) || [];

    console.log("Active bookings count:", activeBookings.length);

    return {
      success: true,
      count: activeBookings.length,
    };
  } catch (error) {
    console.error("Get active bookings error:", error);

    return {
      success: false,
      message: "Something went wrong",
      count: 0,
    };
  }
}
