"use server";

import { getData } from "@server";
import type { Stats } from "../types";

export const getProjectManagerStats = async (): Promise<Stats[]> => {
  const data = await getData({
    url: "admin-dashboard/project-managers-stats",
    method: "GET",
    dummyData: [],
  });

  const stats: Stats[] = [
    { label: "Active Project Managers", value: data.activeProjectManager },
    { label: "Today's Sessions", value: data.todaysSessions },
    { label: "Waiting List", value: data.waitingList },
    { label: "Wallet", value: data.wallet },
  ];

  return stats;
};
