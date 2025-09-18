"use server";

import { cookies } from "next/headers";

interface props {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  dummyData?: unknown[];
  body?: unknown;
}

const apiRootUrl = process.env.API_ROOT_URL as string;

export const getData = async ({ url, method, dummyData, body }: props) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
    if (!token) {
      throw new Error("No auth token found. User may not be logged in.");
    }
    const res = await fetch(`${apiRootUrl}/${url}`, {
      method: method,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "force-cache",
      body: JSON.stringify(body),
    });
    // if (!res.ok) {
    //   throw new Error(`Failed to fetch stats: ${res.status}`);
    // }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching dashboard stats:", err);
    // fallback to empty data (avoids crashing UI)
    return dummyData;
  }
};
