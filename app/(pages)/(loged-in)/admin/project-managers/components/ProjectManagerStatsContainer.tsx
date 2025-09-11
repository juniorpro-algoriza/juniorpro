import { getProjectManagerStats } from "../../server";
import { cardConfig } from "./cardConfig";
import { ProjectManagerStats } from "./ProjectManagerStats";

export const ProjectManagerStatsContainer = async () => {
  const stats = await getProjectManagerStats();

  return <ProjectManagerStats stats={stats} cardConfig={cardConfig} />;
};
