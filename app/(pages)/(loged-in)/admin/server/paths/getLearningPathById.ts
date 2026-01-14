"use server";

import { customFetch } from "@server/lib";

export async function getLearningPathById({ id }: { id: number }) {
  const learningPath = customFetch("/api/learning-path-management/{id}", {
    method: "get",
    path: {
      id,
    },
  });
  return learningPath;
}
