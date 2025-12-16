"use server";

import { customFetch } from "@server/lib";

export async function getJuniorsLearningPathCurrent({
  SearchText,
  PageNumber = 1,
  PageSize = 1000,
}: {
  SearchText?: string;
  PageNumber?: number;
  PageSize?: number;
}) {
  const currentPath = await customFetch("/junior-learning-path/current", {
    method: "get",
    params: {
      PageNumber,
      PageSize,
      SearchText,
    },
  });
  return currentPath;
}
