import { getProjectManagerData } from "../../server";
import ProjectManagerTable from "./ProjectManagerTable";
import { Badge } from "@components";

export const ProjectManagerTableContainer = async () => {
  const projectManagers = await getProjectManagerData();

  // transform the data to match table needs
  const transformedData = projectManagers.map((pm) => ({
    ...pm,
    status: (
      <Badge
        label={pm.status as string}
        variant={pm.status === "active" ? "green" : "orange"}
      />
    ),
    actionHref: `/admin/project-managers/${pm.id}`,
  }));

  return (
    <ProjectManagerTable projectManagerData={transformedData} view="full" />
  );
};
