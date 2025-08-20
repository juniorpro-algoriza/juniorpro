'use server';

import { Achievement } from './types';

export const getFreeTasks = async (): Promise<Achievement[]> => {
  return freeTasks;
};

const freeTasks: Achievement[] = Array(5).fill({
  title: 'HTML & CSS Basics',
  date: '2025-06-15',
  progress: 48,
  badgeUrl: '/images/Rookie.svg',
});
