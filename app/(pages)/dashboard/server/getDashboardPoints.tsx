'use server';

export const getDashboardPoints = async () => {
  return dummyData;
};

const dummyData = {
  pointsBalance: 2500,
  cashBalance: 500,
  allocations: [
    { name: 'Alex', points: 950 },
    { name: 'Alex', points: 950 },
    { name: 'Alex', points: 950 },
  ],
};
