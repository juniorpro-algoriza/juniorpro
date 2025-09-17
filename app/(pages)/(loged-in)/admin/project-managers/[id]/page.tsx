import { getProjectManagerDetails } from "../../server/getProjectManagerData";
import ProjectManagerProfile from "../components/Profile";
import { ProjectManagerTabs } from "../components/tabs/Tabs";

export default async function ProjectManagerDetailsPage({
  params,
}: {
  params: { id: number };
}) {
  const manager = await getProjectManagerDetails(Number(params.id));

  return (
    <div className="p-6 space-y-6">
      <ProjectManagerProfile manager={manager} />
      <ProjectManagerTabs />
    </div>
  );
}
