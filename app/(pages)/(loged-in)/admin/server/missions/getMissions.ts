"use server";

import { customFetch } from "@server/lib";

export async function getMissions({
  SearchText,
  Id,
}: {
  SearchText?: string;
  Id?: number;
}) {
  const missions = customFetch("/api/learning-path-management/mission", {
    method: "get",
    params: {
      PageNumber: 1,
      PageSize: 1000,
      SearchText,
      Id,
    },
  });
  return missions;
}
