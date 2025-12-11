"use server";

import { customFetch } from "@server/lib";

export async function getPackages({
  SearchText,
  DurationType,
}: {
  SearchText: string;
  DurationType: "month" | "year";
}) {
  const packages = customFetch("/admin/package", {
    method: "get",
    params: {
      PageNumber: 1,
      PageSize: 1000,
      SearchText,
      DurationType:
        DurationType === "month" ? 3 : DurationType === "year" ? 4 : 3,
    },
  });
  return packages;
}
