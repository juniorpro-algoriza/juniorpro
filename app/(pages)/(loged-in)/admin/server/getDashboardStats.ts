"use server";

import { getData } from "@server";
import type { Stats } from "../types";

export const getDashboardStats = async (): Promise<Stats[]> => {
  const data = await getData({
    url: "admin-dashboard/all-users-stats",
    method: "GET",
    dummyData: [],
  });

  const stats: Stats[] = [
    { label: "Juniors", value: data.juniors },
    { label: "Contributors", value: data.contributors },
    { label: "Project Managers", value: data.projectManagers },
    { label: "Active Projects", value: data.activeProjects },
  ];

  return stats;
};
