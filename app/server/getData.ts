"use server";

import { getFetchHeaders } from "@server";

interface Props<T = unknown> {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  dummyData?: T;
  body?: unknown;
  params?: Record<string, string | number | undefined>;
  timeout?: number;
}

const apiRootUrl = process.env.API_ROOT_URL as string;

export const getData = async <T>({
  url,
  method,
  body,
  dummyData,
  params,
  timeout = 15000,
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
      signal: AbortSignal.timeout(timeout),
    });

    if (!res.ok) {
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
