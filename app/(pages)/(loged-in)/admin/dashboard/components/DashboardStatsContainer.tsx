import {
  UserIcon,
  FolderDetailsIcon,
  UsersIcon,
  UserManagerIcon,
} from "@icons";

import { getDashboardStats } from "../../server";
import { DashboardStats } from "./DashboardStats";
export const DashboardStatsContainer = async () => {
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
        <UsersIcon width="25" height="25" fill="var( --color-violet-normal)" />
      ),
      variant: "base",
    },
    "Project Managers": {
      icon: (
        <UserManagerIcon
          width="25"
          height="25"
          fill="var( --color-violet-normal)"
        />
      ),
      variant: "base",
    },
    "Active Projects": {
      icon: (
        <FolderDetailsIcon
          width="25"
          height="25"
          fill="var( --color-violet-normal)"
        />
      ),
      variant: "base",
    },
  } as const;

  return <DashboardStats stats={stats} cardConfig={cardConfig} />;
};
