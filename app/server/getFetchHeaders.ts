"use server";

import { cookies } from "next/headers";

export const getFetchHeaders = async (hasBody = false) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) return null;

  const headers: Record<string, string> = {
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };

  if (hasBody) {
    headers["Content-Type"] = "application/json";
  }

  return { headers };
};
