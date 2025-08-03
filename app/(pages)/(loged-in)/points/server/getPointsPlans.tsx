'use server';

import type { Plan } from '../types';

export const getPointsPlans = async () => {
  return dummyData;
};

const dummyData: Plan[] = [
  {
    id: 1,
    name: 'Basic',
    description: 'Perfect for trying out a few projects',
    points: 500,
    features: ['No expiration date', 'Allocate to any junior'],
    buttonText: 'Purchase',
  },
  {
    id: 2,
    name: 'Standard',
    description: 'Ideal for regular learners',
    points: 1500,
    features: ['No expiration date', 'Allocate to any junior'],
    buttonText: 'Purchase',
  },
  {
    id: 3,
    name: 'Premium',
    description: 'Best value for active learners',
    points: 4000,
    features: ['No expiration date', 'Allocate to any junior'],
    buttonText: 'Purchase',
  },
];
