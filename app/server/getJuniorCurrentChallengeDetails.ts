"use server";

import { customFetch } from "@server/lib";

export async function getJuniorCurrentChallengeDetails() {
  return customFetch("/api/junior-dashboard/current-challenge-details", {
    method: "get",
    graceful404: true,
  });
}
