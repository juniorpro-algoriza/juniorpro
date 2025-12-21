"use server";

import { customFetch } from "@server/lib";

type ForgetPasswordResponse = { success: true } | { error: string };

export async function resetPassword(
  formData: FormData
): Promise<ForgetPasswordResponse> {
  const email = formData.get("email");

  if (!email || typeof email !== "string") {
    return { error: "Please enter a valid email address" };
  }

  try {
    await customFetch("/account/reset-password", {
      method: "post",
      data: { email },
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
