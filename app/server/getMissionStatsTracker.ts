"use server";

import { customFetch } from "@server/lib";

export async function getMissionStatsTracker() {
  const missionStats = customFetch(
    "/api/junior-dashboard/mission-stats-tracker",
    {
      method: "get",
    }
  );
  return missionStats;
}
