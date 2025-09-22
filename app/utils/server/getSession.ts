import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) redirect("/login");

  const res = await fetch(
    "https://juniorpro-001-site1.ntempurl.com/api/User/profile",
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (!res.ok) redirect("/login");

  const profile = await res.json();
  return profile;
}
