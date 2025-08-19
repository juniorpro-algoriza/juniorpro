import { UserIcon, WaitingListIcon, CalendarIcon, WalletIcon } from "@icons";
import { StatCard } from "../../../components";
import { getContributorStats } from "../../server";

export const ContributorStats = async () => {
  const stats = await getContributorStats();
  const cardConfig = {
    "Active Juniors": {
      icon: <UserIcon width="25" height="25" fill="#41C980" />,
      variant: "green",
    },
    Wallet: {
      icon: <WalletIcon width="25" height="25" fill="#D44E4E" />,
      variant: "red",
    },

    "Today's Sessions": {
      icon: <CalendarIcon width="25" height="25" fill="#5879DC" />,
      variant: "blue",
    },
    "Waiting List": {
      icon: <WaitingListIcon width="25" height="25" fill="#66717E" />,
      variant: "gray",
    },
  } as const;

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
