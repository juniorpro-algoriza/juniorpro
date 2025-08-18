import {
  UserIcon,
  FileCheck2Icon,
  FileClockIcon,
  CalendarDaysIcon,
} from "lucide-react";

import { StatCard } from "../../../components/cards/StatCard";
import { getJuniorStats } from "../../server/getJuniorStat";

// TODO: always use arrow functions instead of normal ones
export const JuniorStats = async () => {
  const stats = await getJuniorStats();

  const cardConfig = {
    "Active Juniors": { icon: <UserIcon />, variant: "green" },
    "Pending Reviews": { icon: <FileClockIcon />, variant: "orange" },
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
