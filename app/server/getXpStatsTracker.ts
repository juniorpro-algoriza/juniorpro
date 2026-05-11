"use server";

import { customFetch } from "@server/lib";

export async function getXpStatsTracker() {
  const xpStats = customFetch("/api/junior-dashboard/xp-stats-tracker", {
    method: "get",
  });
  return xpStats;
}
