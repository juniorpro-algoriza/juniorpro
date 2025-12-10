"use server";

import { customFetch } from "@server/lib";

export async function getMissions({ SearchText }: { SearchText?: string }) {
  const missions = customFetch("/learning-path-management/mission", {
    method: "get",
    params: {
      PageNumber: 1,
      PageSize: 1000,
      SearchText,
    },
  });
  return missions;
}
