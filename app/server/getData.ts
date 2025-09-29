"use server";

import { getFetchHeaders } from "@server";

interface Props {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  dummyData?: unknown[];
  body?: unknown;
}

const apiRootUrl = process.env.API_ROOT_URL as string;

export const getData = async ({ url, method, body, dummyData }: Props) => {
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

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching data:", err);
    return dummyData;
  }
};
