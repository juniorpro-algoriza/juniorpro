"use server";

import { customFetch } from "@server/lib";

export async function getPackages({
  SearchText,
}: {
  SearchText: string;
}) {
  const packages = customFetch("/admin/package", {
    method: "get",
    params: {
      PageNumber: 1,
      PageSize: 1000,
      SearchText,
    },
  });
  return packages;
}
