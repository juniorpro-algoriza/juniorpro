import { StatCard } from "../../../components";

type CardConfıg = {
  [key: string]: {
    icon: React.ReactNode;
    variant: "green" | "red" | "blue" | "gray";
  };
};

interface ContributorStatProps {
  stats: { label: string; value: number }[];
  cardConfig: CardConfıg;
}

export const ContributorStats = async ({
  stats,
  cardConfig,
}: ContributorStatProps) => {
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
