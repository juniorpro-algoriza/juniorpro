"use server";

import { getFetchHeaders } from "@server";
interface Props<T = unknown> {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  dummyData?: T; // not always array, can be full object
  body?: unknown;
}
const apiRootUrl = process.env.API_ROOT_URL as string;


export const getData = async <T>({ url, method, body, dummyData }: Props<T>): Promise<T> => {
  try {
    const { headers } = (await getFetchHeaders(!!body)) || {};
    if (!headers) throw new Error("No headers found");

    const res = await fetch(`${apiRootUrl}/${url}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      cache: "no-store",
    });

    if (!res.ok) throw new Error(`Request failed: ${res.status}`);

    return (await res.json()) as T;
  } catch (err) {
    console.error("Error fetching data:", err);
    return dummyData as T;
  }
};

