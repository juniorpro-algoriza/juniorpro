"use server";

import { customFetch } from "@server/lib";

export async function getJuniorsLearningPathById({ id }: { id: number }) {
  const learningPath = customFetch("/junior-learning-path/{id}", {
    method: "get",
    path: {
      id,
    },
  });
  return learningPath;
}
