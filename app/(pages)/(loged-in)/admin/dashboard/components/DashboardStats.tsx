import {
  UsersIcon,
  BriefcaseIcon,
  FolderIcon,
  UserCheckIcon,
} from "lucide-react";

import { StatCard } from "../../../components/cards/StatCard";
import { getDashboardStats } from "../../../../../server/admin/getDashboardStats";

export default async function DashboardStats() {
  const stats = await getDashboardStats();

  const cardConfig = {
    Juniors: { icon: <UsersIcon />, variant: "base" },
    Contributors: { icon: <UserCheckIcon />, variant: "base" },
    "Project Managers": { icon: <BriefcaseIcon />, variant: "base" },
    "Active Projects": { icon: <FolderIcon />, variant: "base" },
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
