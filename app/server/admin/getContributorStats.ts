import type { ContributorStats } from "../types/admin/ContributorStats";

export const getContributorStats = async (): Promise<ContributorStats[]> => {
  const dummyData: ContributorStats[] = [
    { label: "Active Juniors", value: 36 },
    { label: "Wallet", value: 36 },
    { label: "Today's Sessions", value: 36 },
    { label: "Waiting List", value: 36 },
  ];

  return dummyData;
};
