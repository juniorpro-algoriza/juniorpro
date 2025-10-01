'use server';
import { getData } from '@server';

export interface JuniorPoints {
  id: number;
  name: string;
  points: number;
}

export interface PointsData {
  pointsAllocation: number;
  pointsBalance: number;
  cashBalance: number;
  juniors: JuniorPoints[];
}

// Fetch points data from the API using getData
export const getPointsData = async (): Promise<PointsData> => {
  const data = await getData({
    url: 'contributor-dashboard/points-allocation',
    method: 'GET',
  });

  return data as PointsData;
};
