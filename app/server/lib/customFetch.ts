"use server";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  AvailableMethods,
  FetchOptions,
  HttpMethod,
  Path,
  SuccessResponse,
} from "@server/types";

// Server-side fetch wrapper
export const createServerFetch = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  return async (url: string, options: RequestInit = {}) => {
    const requestHeaders = new Headers(options.headers);
    requestHeaders.set("Content-Type", "application/json");
    requestHeaders.set("Accept", "application/json");

    if (token) {
      requestHeaders.set("Authorization", `Bearer ${token}`);
    }

    return fetch(`${process.env.API_ROOT_URL || ""}${url}`, {
      ...options,
      headers: requestHeaders,
      cache: "no-store",
    });
  };
};

// Client-side fetch wrapper
export const createClientFetch = async () => {
  return async (url: string, options: RequestInit = {}) => {
    const requestHeaders = new Headers(options.headers);
    requestHeaders.set("Content-Type", "application/json");
    requestHeaders.set("Accept", "application/json");

    // Get token from client-side cookie (more robust parsing)
    const token = getCookie("auth_token");

    if (token) {
      requestHeaders.set("Authorization", `Bearer ${token}`);
    }

    return fetch(`${process.env.API_ROOT_URL || ""}${url}`, {
      ...options,
      headers: requestHeaders,
    });
  };
};

// Helper function for client-side cookie parsing
const getCookie = (name: string): string | undefined => {
  if (typeof document === "undefined") return undefined;

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    return parts.pop()?.split(";").shift();
  }

  return undefined;
};

// Strictly typed fetch function with error handling
export const customFetch = async <P extends Path, M extends HttpMethod>(
  url: P,
  options: M extends AvailableMethods<P> ? FetchOptions<P, M> : never,
  isServer?: boolean
): Promise<SuccessResponse<P, M>> => {
  // Auto-detect environment if not specified
  const serverSide = isServer ?? typeof window === "undefined";

  try {
    const fetchFn = serverSide
      ? await createServerFetch()
      : await createClientFetch();

    let finalUrl = url as string;

    // Handle path parameters
    if ("path" in options && options.path) {
      Object.entries(options.path).forEach(([key, value]) => {
        finalUrl = finalUrl.replace(`{${key}}`, String(value));
      });
    }

    // Handle query parameters
    if ("params" in options && options.params) {
      const searchParams = new URLSearchParams();
      Object.entries(options.params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value));
        }
      });
      const queryString = searchParams.toString();
      if (queryString) {
        finalUrl += `?${queryString}`;
      }
    }

    // Prepare fetch options
    const fetchOptions: RequestInit = {
      method: options.method,
      headers: options.headers,
    };

    // Add body for methods that support it
    if ("data" in options && options.data) {
      fetchOptions.body = JSON.stringify(options.data);
    }

    const response = await fetchFn(finalUrl, fetchOptions);

    // Handle 401 Unauthorized
    if (!response.ok && response.status === 401) {
      if (serverSide) {
        // Server-side redirect to logout route
        const headersList = await headers();
        const currentPath = headersList.get("x-pathname") || "/";
        redirect(
          `/api/auth/logout?redirect=${encodeURIComponent(`/auth/login?redirect=${encodeURIComponent(currentPath)}`)}`
        );
      } else {
        document.cookie = "auth_token=; Max-Age=0; path=/";
        document.cookie = "user_type=; Max-Age=0; path=/";

        // Client-side redirect
        const currentPath = window.location.pathname;
        window.location.href = `/auth/login?redirect=${encodeURIComponent(currentPath)}`;
      }
    }

    // Handle other errors
    if (!response.ok) {
      const errorParts = [
        `Request failed: ${response.status} ${response.statusText}`,
      ];

      // Add API error details
      try {
        const errJson = await response.json();
        console.error(errJson);
        const apiError =
          errJson?.errorMessage ||
          errJson?.message ||
          errJson?.error ||
          errJson?.detail;
        if (apiError) errorParts.push(`API Error: ${apiError}`);

        if (errJson?.code) errorParts.push(`Error Code: ${errJson.code}`);
      } catch {
        // ignore if no valid JSON
      }

      // Add request context
      const baseUrl = process.env.API_ROOT_URL || "";
      errorParts.push(`Endpoint: ${baseUrl}${finalUrl}`);
      errorParts.push(`Method: ${options.method}`);

      // Add payload if available
      if (options.data) {
        try {
          const payloadString = JSON.stringify(options.data);
          const truncatedPayload =
            payloadString.length > 1000
              ? payloadString.substring(0, 1000) + "..."
              : payloadString;
          errorParts.push(`Payload: ${truncatedPayload}`);
        } catch {
          errorParts.push("Payload: [Unable to serialize]");
        }
      }

      throw new Error(errorParts.join(" | "));
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error fetching data:", err);
    throw err;
  }
};
