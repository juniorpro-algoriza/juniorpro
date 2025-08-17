import {
  UserIcon,
  UsersIcon,
  BriefcaseIcon,
  FolderCodeIcon,
} from "lucide-react";

import { StatCard } from "../../../components/cards/StatCard";
import { getDashboardStats } from "../../server/getDashboardStats";

export const DashboardStats = async () => {
  const stats = await getDashboardStats();

  const cardConfig = {
    Juniors: { icon: <UserIcon />, variant: "base" },
    Contributors: { icon: <UsersIcon />, variant: "base" },
    "Project Managers": { icon: <BriefcaseIcon />, variant: "base" },
    "Active Projects": { icon: <FolderCodeIcon />, variant: "base" },
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
