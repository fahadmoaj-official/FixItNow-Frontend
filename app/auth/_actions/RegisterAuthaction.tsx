"use server";

type RegisterState = {
  success: boolean;
  message: string;
};

export const registerActions = async (
  prevState: RegisterState,
  formData: FormData,
): Promise<RegisterState> => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const role = formData.get("role") as string;

//   // Basic validation
//   if (!name || !email || !password || !role) {
//     return {
//       success: false,
//       message: "All fields are required",
//     };
//   }

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role,
        }),
      },
    );

    const result = await response.json();

    if (!response.ok || !result.success) {
      return {
        success: false,
        message: result.message || "Registration failed",
      };
    }

    return {
      success: true,
      message: "Registration successful! Please login.",
    };
  } catch (error) {
    console.error("Register error:", error);

    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
};
