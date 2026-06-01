"use server";

import { customFetch } from "@server/lib";

export async function distributeChallengePrizes(id: number) {
  const response = await customFetch(
    "/api/admin-challenge/distribute-prizes/{id}",
    {
      method: "put",
      path: { id },
    }
  );

  return response;
}
