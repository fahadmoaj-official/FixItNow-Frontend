"use server"
import { cookies } from "next/headers";

export const getMe = async () => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return null;
  }

  
    const response = await fetch(`${process.env.BACKEND_URL}/api/users/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "force-cache",
        next:{
          revalidate: 60 * 60 * 24, // Revalidate every 24 hours
          tags:["my-profile"]
        }
      }
    );

    if (!response.ok) {
      return null;
    }

    return await response.json();
  
};