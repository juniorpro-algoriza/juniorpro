"use server";

import { getFetchHeaders } from "@server";

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
    const { headers } = (await getFetchHeaders(!!body)) || {};

    const safeHeaders =
      headers ||
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
      // ADD: Increase timeout or add signal
      signal: AbortSignal.timeout(40000), // 30 seconds
    });

    if (!res.ok) throw new Error(`Request failed: ${res.status}`);

    return (await res.json()) as T;
  } catch (err) {
    console.error("Error fetching data:", err);

    // IMPROVED: Ensure we always return valid data
    if (dummyData !== undefined) {
      return dummyData;
    }

    // If no dummy data provided, throw the error
    // This helps catch issues during development
    throw err;
  }
};
