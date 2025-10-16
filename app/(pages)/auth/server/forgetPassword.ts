"use server";

import { getData } from "@server";

type ForgetPasswordResponse = { success: true } | { error: string };

export async function forgetPassword(
  formData: FormData
): Promise<ForgetPasswordResponse> {
  const email = formData.get("email");

  if (!email || typeof email !== "string") {
    return { error: "Please enter a valid email address" };
  }

  try {
    await getData({
      url: "account/reset-password",
      method: "POST",
      body: { email },
    });

    return { success: true };
  } catch (err: unknown) {
    const message =
      err instanceof Error
        ? err.message
        : "Error sending reset email. Please try again.";
    return { error: message };
  }
}
