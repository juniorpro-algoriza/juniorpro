"use server";

import { getFetchHeaders } from "@server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { cookies } from "next/headers";

interface Props<T = unknown> {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  dummyData?: T;
  body?: unknown;
  params?: Record<string, string | number | undefined>;
}

const apiRootUrl = process.env.API_ROOT_URL as string;

export const getData = async <T>({
  url,
  method,
  body,
  dummyData,
  params,
}: Props<T>): Promise<T> => {
  try {
    const { headers: fetchHeaders } = (await getFetchHeaders(!!body)) || {};

    const safeHeaders =
      fetchHeaders ||
      (body
        ? { "Content-Type": "application/json" }
        : { Accept: "application/json" });

    const queryString = params
      ? new URLSearchParams(
          Object.entries(params)
            .filter(([, v]) => v !== undefined)
            .map(([k, v]) => [k, String(v)])
        ).toString()
      : "";

    const finalUrl = `${apiRootUrl}/${url}${queryString ? `?${queryString}` : ""}`;

    const res = await fetch(finalUrl, {
      method,
      headers: safeHeaders,
      body: body ? JSON.stringify(body) : undefined,
      cache: "no-store",
    });

    if (!res.ok) {
      // Handle 401 Unauthorized
      if (res.status === 401) {
        const cookieStore = await cookies();
        cookieStore.delete("auth_token");
        cookieStore.delete("user_type");

        const headersList = await headers();
        const currentPath = headersList.get("x-pathname") || "/";
        redirect(`/auth/login?redirect=${encodeURIComponent(currentPath)}`);
      }

      // Handle other errors
      let errorMessage = `Request failed: ${res.status}`;
      try {
        const errJson = await res.json();
        if (errJson?.errorMessage) errorMessage = errJson.errorMessage;
        else if (errJson?.message) errorMessage = errJson.message;
      } catch {
        // ignore if no valid JSON
      }
      throw new Error(errorMessage);
    }

    return (await res.json()) as T;
  } catch (err) {
    console.error("Error fetching data:", err);
    if (dummyData !== undefined) return dummyData;
    throw err;
  }
};
