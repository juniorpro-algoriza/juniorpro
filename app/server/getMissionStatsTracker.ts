"use server";

import { customFetch } from "@server/lib";

export async function getMissionStatsTracker() {
  return customFetch("/api/junior-dashboard/mission-stats-tracker", {
    method: "get",
    graceful404: true,
  });
}
