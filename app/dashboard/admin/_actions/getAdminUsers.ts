// "use server";



// export async function getAdminUsers() {
//   try {
//     const response = await fetch(
//       `${process.env.BACKEND_URL}/api/admin/users`,
//       {
//         method: "GET",
//         cache: "no-store",
//       }
//     );

//     console.log("Response status:", response.status, "URL:", `${process.env.BACKEND_URL}/api/admin/users`);

//     if (!response.ok) {
//       console.error("Backend returned error status:", response.status);
//       return {
//         success: false,
//         message: `Failed to fetch users - Status: ${response.status}`,
//         data: [],
//       };
//     }

//     const result = await response.json();
//     console.log("Get admin users result:", result);

//     return {
//       success: true,
//       data: result.data?.users || [],
//     };
//   } catch (error) {
//     console.error("Get admin users error:", error);

//     return {
//       success: false,
//       message: "Something went wrong",
//       data: [],
//     };
//   }
// }

"use server";



export async function getAdminUsers() {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/admin/users`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || "Failed to fetch users",
        data: [],
      };
    }

    return {
      success: true,
      data: result.data?.users || [],
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Failed to fetch users",
      data: [],
    };
  }
}