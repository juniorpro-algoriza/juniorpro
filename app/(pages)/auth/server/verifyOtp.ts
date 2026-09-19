"use server";

import type { ActionState } from "@server/types";
import { cookies } from "next/headers";

export const verifyOtp = async (
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> => {
  const otp = formData.get("otp") as string;

  try {
    const cookieStore = await cookies();
    const email = cookieStore.get("signup_email")?.value;

    if (!email) {
      return { success: false, error: "Email not found, please sign up again" };
    }

    const baseUrl = process.env.API_ROOT_URL || "https://dev-api.sawiha.com";
    const res = await fetch(`${baseUrl}/api/account/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });

    if (!res.ok) {
      return { success: false, error: "OTP verification failed" };
    }

    const data = await res.json();

    if (!data || data === false) {
      return { success: false, error: "OTP verification failed" };
    }

    cookieStore.delete("signup_email");

    // Just return success, no redirect
    return { success: true, error: null };
  } catch (err) {
    console.error(err);
    return { success: false, error: "Unexpected error" };
  }
};
