"use server";

import { getData } from "@server";
import type { Stats } from "../types";

export const getJuniorStats = async (): Promise<Stats[]> => {
  const data = await getData({
    url: "admin-dashboard/juniors-stats",
    method: "GET",
    dummyData: [],
  });
  const stats: Stats[] = [
    { label: "Juniors", value: data.activeJuniors },
    { label: "Pending Reviews", value: data.pendingReviews },
    { label: "Today's Sessions", value: data.todaysSessions },
    { label: "Waiting List", value: data.waitingList },
  ];
  return stats;
};
