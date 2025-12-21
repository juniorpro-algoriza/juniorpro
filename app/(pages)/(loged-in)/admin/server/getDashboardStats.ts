"use server";

import { getData } from "@server";
type Stats = {
  label: string;
  value: number;
};
export const getDashboardStats = async (): Promise<Stats[]> => {
  const data = await getData<{
    juniors: number;
    contributors: number;
    projectManagers: number;
    activeProjects: number;
  }>({
    url: "admin-dashboard/all-users-stats",
    method: "GET",
    dummyData: {
      juniors: 0,
      contributors: 0,
      projectManagers: 0,
      activeProjects: 0,
    },
  });

  const stats: Stats[] = [
    { label: "Juniors", value: data?.juniors ?? 0 },
    { label: "Contributors", value: data?.contributors ?? 0 },
    { label: "Project Managers", value: data?.projectManagers ?? 0 },
    { label: "Active Projects", value: data?.activeProjects ?? 0 },
  ];

  return stats;
};
