import { ProjectDetails } from "@components";
import { getProjectDetails } from "../../homeOld/server";

export default async function ProjectDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = Number(resolvedParams.id);

  const data = await getProjectDetails(id);

  if (!data?.projectDetails) {
    return <div className="p-10 text-center text-gray-600">Project not found</div>;
  }

  return <ProjectDetails data={data} />;
}
