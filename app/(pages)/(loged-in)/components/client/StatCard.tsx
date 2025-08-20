import { cx } from '@lib';
import {
  statCard,
  statCardIcon,
  statCardIconContainer,
  statCardLabel,
  statCardValue,
} from '@styles';
import type { VariantProps } from 'cva';
import type { ReactNode } from 'react';

export type StatCardVariant =
  | 'blue'
  | 'red'
  | 'green'
  | 'orange'
  | 'gray'
  | 'base';

export interface StatCardProps extends VariantProps<typeof statCard> {
  value: number;
  label: string;
  icon: ReactNode;
  variant?: StatCardVariant;
  className?: string;
}

export function StatCard({
  value,
  label,
  icon,
  variant = 'base',
  className,
}: StatCardProps) {
  return (
    <div className={cx(statCard({ variant }), className)}>
      <div>
        <p className={cx(statCardValue({ variant }))}>{value}</p>
        <p className={cx(statCardLabel({ variant }))}>{label}</p>
      </div>
      <div className={cx(statCardIconContainer({ variant }))}>
        <span className={cx(statCardIcon({ variant }))}>{icon}</span>
      </div>
    </div>
  );
}
