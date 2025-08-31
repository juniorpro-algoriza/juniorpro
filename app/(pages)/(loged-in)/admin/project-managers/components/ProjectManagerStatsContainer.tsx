import { getProjectManageStats } from "../../server";
import { cardConfig } from "./cardConfig";
import { ProjectManagerStats } from "./ProjectManagerStats";

export const ProjectManagerStatsContainer = async () => {
  const stats = await getProjectManageStats();

  return <ProjectManagerStats stats={stats} cardConfig={cardConfig} />;
};
