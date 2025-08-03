import type { ReactNode } from 'react';

export type Transaction = {
  id: number;
  transactionType: string;
  title: string;
  date: string;
  dueDate: string;
  points: number;
  pointsUsed: number;
  status: string;
  icon: ReactNode;
};
