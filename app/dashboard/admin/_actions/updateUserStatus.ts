"use server";



export async function updateUserStatus(
  userId: string,
  status: "ACTIVE" | "BANNED"
) {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/admin/users/${userId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || "Failed to update user status",
      };
    }

    return {
      success: true,
      message: result.message || "User status updated successfully",
    };
  } catch (error) {
    console.error("Update user status error:", error);

    return {
      success: false,
      message: "Something went wrong",
    };
  }
}