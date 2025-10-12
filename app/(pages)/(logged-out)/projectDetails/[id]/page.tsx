import { ProjectDetails } from "@components";
import { getLandingProjectDetails } from "@server";

interface LandingProjectDetailsProps {
  params: Promise<{
    id: string;
  }>;
}

const LandingProjectDetails = async ({
  params,
}: LandingProjectDetailsProps) => {
  const { id } = await params;
  const projectData = await getLandingProjectDetails(id);
  console.log(projectData);
  return <ProjectDetails />;
};
export default LandingProjectDetails;
