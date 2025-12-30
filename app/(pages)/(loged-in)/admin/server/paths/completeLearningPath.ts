"use server";

import { customFetch } from "@server/lib";

export async function completeLearningPath(id: number) {
  const result = customFetch("/api/learning-path-management/complete/{id}", {
    method: "put",
    path: {
      id,
    },
  });
  return result;
}
