"use server";

import { getData } from "../../../../server/getData";
import type { Stats } from "../types";

export const getJuniorStats = async (): Promise<Stats[]> => {
  const data = await getData({
    url: "admin-dashboard/juniors-stats",
    method: "GET",
    dummyData: dummyData,
  });
  const stats: Stats[] = [
    { label: "Juniors", value: data.activeJuniors },
    { label: "Pending Reviews", value: data.pendingReviews },
    { label: "Today's Sessions", value: data.todaysSessions },
    { label: "Waiting List", value: data.waitingList },
  ];
  return stats;
};
const dummyData: Stats[] = [
  { label: "Juniors", value: 0 },
  { label: "Pending Reviews", value: 0 },
  { label: "Today's Sessions", value: 0 },
  { label: "Waiting List", value: 0 },
];
