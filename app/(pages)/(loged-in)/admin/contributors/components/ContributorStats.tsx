import { UserIcon, WaitingListIcon, CalendarIcon, WalletIcon } from "@icons";
import { StatCard } from "../../../components";
import { getContributorStats } from "../../server";

export default async function ContributorStats() {
  const stats = await getContributorStats();
  const cardConfig = {
    "Active Juniors": { icon: <UserIcon />, variant: "green" },
    Wallet: { icon: <WalletIcon />, variant: "red" },
    "Today's Sessions": { icon: <CalendarIcon />, variant: "blue" },
    "Waiting List": { icon: <WaitingListIcon />, variant: "gray" },
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
}
