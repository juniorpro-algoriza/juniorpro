'use server';

import { MoveDownRight, MoveRight } from 'lucide-react';
import { Transaction } from '../types';

export const getPointsTransactions = async () => {
  return dummyData;
};

const dummyData: Transaction[] = [
  {
    id: 1,
    type: 'purchase',
    title: 'Purchased Standard Points Bundle',
    date: '2025-06-15',
    dueDate: '2025-06-15',
    points: 1500,
    pointsUsed: 250,
    status: 'Completed',
    icon: <MoveDownRight className='text-success-500' />,
  },
  {
    id: 2,
    type: 'allocation',
    title: 'Allocated points to Alex',
    date: '2025-06-15',
    dueDate: '2025-06-15',
    points: 500,
    pointsUsed: 2000,
    status: 'Allocated',
    icon: <MoveRight className='text-violet-normal' />,
  },
  {
    id: 3,
    type: 'purchase',
    title: 'Purchased Standard Points Bundle',
    date: '2025-06-15',
    dueDate: '2025-06-15',
    points: 1500,
    pointsUsed: 250,
    status: 'Completed',
    icon: <MoveDownRight className='text-success-500' />,
  },
];
