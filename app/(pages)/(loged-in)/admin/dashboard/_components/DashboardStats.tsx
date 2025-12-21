import { ReactNode } from "react";
import { StatCard } from "../../../components";
export type CardConfig = {
  [key: string]: {
    icon: ReactNode;
    variant: "green" | "red" | "blue" | "gray" | "orange" | "base";
  };
};

export interface StatsProps {
  stats: { label: string; value: number }[];
  cardConfig: CardConfig;
}
export const DashboardStats = async ({ stats, cardConfig }: StatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const config = cardConfig[stat.label as keyof typeof cardConfig];
        return (
          <StatCard
            key={stat.label}
            value={stat.value}
            label={stat.label}
            icon={config.icon}
            variant={config.variant}
          />
        );
      })}
    </div>
  );
};
