import {
  UserIcon,
  FileCheck2Icon,
  CalendarDaysIcon,
  WalletIcon,
} from "lucide-react";

// TODO: why have a seperate cards folder if there is onoly one card?
import { StatCard } from "../../../components/cards/StatCard";
import { getContributorStats } from "../../server";

// TODO: Components should be an export const <name> = () => {}
// export default async function ContributorStats() {
export const ContributorStats = async () => {
  const stats = await getContributorStats();
  const cardConfig = {
    "Active Juniors": { icon: <UserIcon />, variant: "green" },
    Wallet: { icon: <WalletIcon />, variant: "red" },
    "Today's Sessions": { icon: <CalendarDaysIcon />, variant: "blue" },
    "Waiting List": { icon: <FileCheck2Icon />, variant: "gray" },
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
