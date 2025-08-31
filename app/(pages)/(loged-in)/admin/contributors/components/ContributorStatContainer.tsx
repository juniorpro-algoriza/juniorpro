import { getContributorStats } from "../../server";
import { ContributorStats } from "./ContributorStats";
import { config } from "./config";

export const ContributorStatContainer = async () => {
  const stats = await getContributorStats();

  return <ContributorStats stats={stats} cardConfig={config} />;
};
