"use server";

import { getData } from "@server";
import type { Stats } from "../types";

export const getJuniorStats = async (): Promise<Stats[]> => {
  const data = await getData<{
    activeJuniors: number;
    pendingReviews: number;
    todaysSessions: number;
    waitingList: number;
  }>({
    url: "admin-dashboard/juniors-stats",
    method: "GET",
  });
  const stats: Stats[] = [
    { label: "Juniors", value: data.activeJuniors },
    { label: "Pending Reviews", value: data.pendingReviews },
    { label: "Today's Sessions", value: data.todaysSessions },
  ];
  return stats;
};
