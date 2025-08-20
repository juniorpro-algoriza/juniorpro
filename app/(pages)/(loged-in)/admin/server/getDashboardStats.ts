import type { Stats } from '../types';

export const getDashboardStats = async (): Promise<Stats[]> => {
  return dummyData;
};

const dummyData: Stats[] = [
  { label: 'Juniors', value: 36 },
  { label: 'Contributors', value: 36 },
  { label: 'Project Managers', value: 36 },
  { label: 'Active Projects', value: 36 },
];
