'use server';

import { Achievement } from './types';

export const getPremiumTasks = async (): Promise<Achievement[]> => {
  return premiumTasks;
};

const premiumTasks: Achievement[] = Array(3).fill({
  title: 'HTML & CSS Basics',
  date: '2025-06-15',
  progress: 48,
  badgeUrl: '/images/Expert.svg',
});
