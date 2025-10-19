/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";
import { getData } from "@server";

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
    const response = await getData({
      url: "account/verify-reset-password",
      method: "POST",
      body: { email, password, confirmPassword, token },
    });

    return { success: true, data: response };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}
