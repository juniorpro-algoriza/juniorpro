type PointsAllocation = {
  name: string;
  points: number;
};

export type Points = {
  pointsBalance: number;
  cashBalance: number;
  allocations: PointsAllocation[];
};
