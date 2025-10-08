import { ProjectDetails } from "@components";
import { getLandingProjectDetails } from "@server";

interface LandingProjectDetailsProps {
  params: {
    id: string;
  };
}
const LandingProjectDetails = async ({
  params,
}: LandingProjectDetailsProps) => {
  const id = params.id;
  const projectData = await getLandingProjectDetails(id);
  console.log(projectData);
  return <ProjectDetails />;
};
export default LandingProjectDetails;
