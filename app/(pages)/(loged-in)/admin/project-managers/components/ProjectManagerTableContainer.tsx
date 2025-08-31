import { getProjectManagerData } from "../../server";
import { ProjectManagerTable } from "./ProjectManagerTable";
import { Badge } from "@components";

export const ProjectManagerTableContainer = async () => {
  const ProjectManagerData = await getProjectManagerData();

  const transformedData = ProjectManagerData.map((projectManager) => ({
    ...projectManager,
    status: (
      <Badge
        label={projectManager.status}
        variant={projectManager.status === "active" ? "green" : "orange"}
      />
    ),
  }));

  return (
    <ProjectManagerTable projectManagerData={transformedData} view="full" />
  );
};
