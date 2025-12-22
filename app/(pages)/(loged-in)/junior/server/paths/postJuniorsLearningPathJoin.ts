"use server";

import { customFetch } from "@server/lib";

export async function postJuniorsLearningPathJoin({ id }: { id: number }) {
  const result = await customFetch("/api/junior-learning-path/join/{id}", {
    method: "post",
    path: {
      id,
    },
  });
  return result;
}
