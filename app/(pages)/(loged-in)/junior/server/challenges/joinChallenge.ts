"use server";

import { customFetch } from "@server/lib";

export async function joinChallenge(id: number) {
  const response = await customFetch("/api/junior-challenge/join/{id}", {
    method: "post",
    path: { id },
  });

  return response;
}
