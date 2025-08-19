import {
  UserIcon,
  ProjectsIcon,
  ContributorsIcon,
  ProjectManagerIcon,
} from "@icons";

import { StatCard } from "../../../components";
import { getDashboardStats } from "../../server";

export const DashboardStats = async () => {
  const stats = await getDashboardStats();

  const cardConfig = {
    Juniors: {
      icon: (
        <UserIcon width="25" height="25" fill="var( --color-violet-normal)" />
      ),
      variant: "base",
    },
    Contributors: {
      icon: (
        <ContributorsIcon
          width="25"
          height="25"
          fill="var( --color-violet-normal)"
        />
      ),
      variant: "base",
    },
    "Project Managers": {
      icon: (
        <ProjectManagerIcon
          width="25"
          height="25"
          fill="var( --color-violet-normal)"
        />
      ),
      variant: "base",
    },
    "Active Projects": {
      icon: (
        <ProjectsIcon
          width="25"
          height="25"
          fill="var( --color-violet-normal)"
        />
      ),
      variant: "base",
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
