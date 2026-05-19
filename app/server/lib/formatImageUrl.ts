"use server";

export async function formatImageUrl(path: string | null | undefined) {
  if (!path) return null;
  if (path.startsWith("http")) return path;

  // Get base URL and remove trailing slash if present
  const baseUrl = (process.env.API_ROOT_URL || "").replace(/\/+$/, "");

  // Replace backslashes with forward slashes and remove duplicate slashes
  const cleanPath = path.replace(/\\/g, "/").replace(/\/+/g, "/");

  // Ensure the path starts with a single forward slash
  const formattedPath = cleanPath.startsWith("/") ? cleanPath : `/${cleanPath}`;

  return `${baseUrl}${formattedPath}`;
}
