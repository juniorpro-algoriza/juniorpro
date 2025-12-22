"use server";

import { customFetch } from "@server/lib";

export async function deleteLearningPath({ id }: { id: number }) {
  const path = customFetch("/api/learning-path-management/{id}", {
    method: "delete",
    path: {
      id,
    },
  });
  return path;
}
