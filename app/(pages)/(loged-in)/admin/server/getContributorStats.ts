import type { Stats } from '../types';

export const getContributorStats = async (): Promise<Stats[]> => {
  return dummyData;
};

const dummyData: Stats[] = [
  { label: 'Active Juniors', value: 36 },
  { label: 'Wallet', value: 36 },
  { label: "Today's Sessions", value: 36 },
  { label: 'Waiting List', value: 36 },
];
