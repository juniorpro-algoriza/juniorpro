import { getJuniorStats } from "../../server";
import { cardConfig } from "./cardConfig";
import { JuniorStats } from "./JuniorStats";

export const JuniorStatsContainer = async () => {
  const stats = await getJuniorStats();

  return <JuniorStats stats={stats} cardConfig={cardConfig} />;
};
