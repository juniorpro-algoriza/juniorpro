"use server";

import { cookies } from "next/headers";

interface Props {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown; // optional for POST/PUT
  dummyData: unknown[];
}

const apiRootUrl = process.env.API_ROOT_URL as string;

export const getData = async ({ url, method, body, dummyData }: Props) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token)
      throw new Error("No auth token found. User may not be logged in.");

    const headers: Record<string, string> = {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };

    // Only add Content-Type if there is a body
    if (body) headers["Content-Type"] = "application/json";

    const res = await fetch(`${apiRootUrl}/${url}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      cache: "no-store",
    });

    if (!res.ok) throw new Error(`Request failed: ${res.status}`);

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching data:", err);
    return dummyData;
  }
};
