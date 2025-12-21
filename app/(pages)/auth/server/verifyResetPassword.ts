"use server";
import { customFetch } from "@server/lib";

interface VerifyResetPayload {
  email: string;
  password: string;
  confirmPassword: string;
  token: string;
}

export async function verifyResetPassword({
  email,
  password,
  confirmPassword,
  token,
}: VerifyResetPayload) {
  try {
    const response = await customFetch("/account/verify-reset-password", {
      method: "post",
      data: { email, password, confirmPassword, token },
    });

    return { success: true, data: response };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return { success: false, message: errorMessage };
  }
}