"use server";

export async function getAdminBookings() {
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
        message: `Failed to fetch bookings - Status: ${response.status}`,
        data: [],
      };
    }

    const result = await response.json();
    
    // Get all bookings data
    const bookings = result.data?.bookings || [];

    console.log("Total bookings fetched:", bookings.length);

    return {
      success: true,
      data: bookings,
      totalBookings: bookings.length,
    };
  } catch (error) {
    console.error("Get admin bookings error:", error);

    return {
      success: false,
      message: "Something went wrong",
      data: [],
    };
  }
}
