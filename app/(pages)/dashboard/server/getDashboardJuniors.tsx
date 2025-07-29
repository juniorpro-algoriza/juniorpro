'use server';

export const getDashboardJuniors = async () => {
  return dummyData;
};

const dummyData = [
  {
    id: 1,
    name: 'Alex',
    points: 300,
    activeProjects: 2,
    completedProjects: 3,
  },
  {
    id: 2,
    name: 'Sam',
    points: 100,
    activeProjects: 5,
    completedProjects: 2,
  },
  {
    id: 3,
    name: 'John',
    points: 200,
    activeProjects: 4,
    completedProjects: 1,
  },
  {
    id: 4,
    name: 'Harry',
    points: 400,
    activeProjects: 6,
    completedProjects: 4,
  },
];
