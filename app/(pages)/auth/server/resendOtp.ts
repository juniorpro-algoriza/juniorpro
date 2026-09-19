"use server";

import type { ActionState } from "@server/types";
import { cookies } from "next/headers";

export const resendOtp = async (): Promise<ActionState> => {
  try {
    const cookieStore = await cookies();
    const email = cookieStore.get("signup_email")?.value;

    if (!email) {
      return { success: false, error: "Email not found, please sign up again" };
    }

    const baseUrl = process.env.API_ROOT_URL || "https://dev-api.sawiha.com";
    const res = await fetch(`${baseUrl}/api/account/resend-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (!res.ok) {
      return { success: false, error: "Failed to resend OTP" };
    }

    return { success: true, error: null };
  } catch (err) {
    console.error("Resend OTP Error:", err);
    return { success: false, error: "Unexpected error occurred" };
  }
};
