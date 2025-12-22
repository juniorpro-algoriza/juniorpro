"use server";

import { customFetch } from "@server/lib";

export async function getJuniorsLearningPaths({
  SearchText,
}: {
  SearchText?: string;
}) {
  const learningPaths = customFetch("/junior-learning-path", {
    method: "get",
    params: {
      PageNumber: 1,
      PageSize: 1000,
      SearchText,
    },
  });
  return learningPaths;
}
