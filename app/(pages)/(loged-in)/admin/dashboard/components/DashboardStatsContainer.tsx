import { cardConfig } from "./cardConfig";

import { getDashboardStats } from "../../server";
import { DashboardStats } from "./DashboardStats";
export const DashboardStatsContainer = async () => {
  const stats = await getDashboardStats();

  return <DashboardStats stats={stats} cardConfig={cardConfig} />;
};
