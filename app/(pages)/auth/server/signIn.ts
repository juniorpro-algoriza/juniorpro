"use server";

import type { ActionState } from "@server/types";
import z from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Schema = z.object({
  email: z.string().email(),
  password: z.string(),
  redirect: z.string().optional(),
  join: z.string().optional(),
});

export const signIn = async (
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> => {
  const baseUrl = process.env.API_ROOT_URL;
  const dataObject = Object.fromEntries(formData);
  const parsed = Schema.safeParse(dataObject);

  if (!parsed.success) {
    return { success: false, error: "Invalid email or password" };
  }

  const { email, password, redirect: redirectUrl, join } = parsed.data;

  const res = await fetch(`${baseUrl}/User/Login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "*/*",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) return { success: false, error: "Invalid credentials" };

  const result = await res.json();
  const token = result?.accessToken;
  if (!token) return { success: false, error: "No token returned from API" };

  const cookieStore = await cookies();
  cookieStore.set("auth_token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
  });

  const profileRes = await fetch(`${baseUrl}/User/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!profileRes.ok)
    return { success: false, error: "Failed to fetch user profile" };

  const profile = await profileRes.json();
  const userType = profile.userType;
  cookieStore.set("user_type", String(userType), {
    httpOnly: false,
    secure: true,
    sameSite: "strict",
    path: "/",
  });

  // Handle redirect if present, i used for join project flow
  if (redirectUrl) {
    if (join) redirect(`${redirectUrl}?join=${join}`);
    redirect(redirectUrl);
  }

  // Default redirects
  switch (userType) {
    case 1:
      redirect("/admin/dashboard");
    case 2:
      redirect("/junior/dashboard");
    case 3:
      redirect("/contributor/dashboard");
    case 4:
      redirect("/project/dashboard");
    default:
      redirect("/");
  }
};
