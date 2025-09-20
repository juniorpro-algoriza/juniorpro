"use server";
import { cookies } from "next/headers";

export const inviteExistingJunior = async (email: string) => {
  if (!email) throw new Error("Email is required");

  // Get token from cookies
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  if (!token) throw new Error("User is not authenticated");

  const res = await fetch(
    `https://juniorpro-001-site1.ntempurl.com/api/Contributor/invite-junior?email=${encodeURIComponent(email)}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "text/plain",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}), // Some APIs require a body even if empty
    }
  );

  const text = await res.text();
  console.log("Status:", res.status, "Response:", text);

  if (!res.ok) {
    throw new Error(text || "Failed to send invitation");
  }

  return true;
};
