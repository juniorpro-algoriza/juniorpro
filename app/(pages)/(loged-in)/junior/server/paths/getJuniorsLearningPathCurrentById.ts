"use server";

import { customFetch } from "@server/lib";

export async function getJuniorsLearningPathCurrentById({ id }: { id: number }) {
  const currentPath = await customFetch("/junior-learning-path/current/{id}", {
    path: { id },
    method: "get",
  });
  return currentPath;
}
