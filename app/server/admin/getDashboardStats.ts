import { DashboardStat } from "@server/types";

export const getDashboardStats = async (): Promise<DashboardStat[]> => {
  const dummyData: DashboardStat[] = [
    { label: "Juniors", value: 36 },
    { label: "Contributors", value: 36 },
    { label: "Project Managers", value: 36 },
    { label: "Active Projects", value: 36 },
  ];

  return dummyData;
};
