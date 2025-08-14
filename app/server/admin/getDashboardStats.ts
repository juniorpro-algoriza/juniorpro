import type { Stats } from "@server/types";

export const getDashboardStats = async (): Promise<Stats[]> => {
  const dummyData: Stats[] = [
    { label: "Juniors", value: 36 },
    { label: "Contributors", value: 36 },
    { label: "Project Managers", value: 36 },
    { label: "Active Projects", value: 36 },
  ];

  return dummyData;
};
