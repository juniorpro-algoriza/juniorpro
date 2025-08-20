'use server';

import { Achievement } from './types';

export const getTeamProjects = async (): Promise<Achievement[]> => {
  return teamProjects;
};

const teamProjects: Achievement[] = Array(2).fill({
  title: 'HTML & CSS Basics',
  date: '2025-06-15',
  progress: 48,
  badgeUrl: '/images/Mastermind.svg',
});
