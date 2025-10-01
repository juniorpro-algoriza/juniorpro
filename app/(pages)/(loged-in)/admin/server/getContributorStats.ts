"use server";

import { getData } from "@server";
import type { Stats } from "../types";

export const getContributorStats = async (): Promise<Stats[]> => {
  const data = await getData<{
    activeContributors: number;
    todaysSessions: number;
    waitingList: number;
    wallet: number;
  }>({
    url: "admin-dashboard/contributors-stats",
    method: "GET",
  });

  const stats: Stats[] = [
    { label: "Active Contributors", value: data.activeContributors },
    { label: "Today's Sessions", value: data.todaysSessions },
    { label: "Waiting List", value: data.waitingList },
    { label: "Wallet", value: data.wallet },
  ];

  return stats;
};
