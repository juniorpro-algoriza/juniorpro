"use server";

import { customFetch } from "@server/lib";

export async function getXpStatsTracker() {
  return customFetch("/api/junior-dashboard/xp-stats-tracker", {
    method: "get",
    graceful404: true,
  });
}
