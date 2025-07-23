import { ProjectsSlider } from "../../../../components/ProjectSlider";
import { getProjects } from "../../../../server";

type Params = {
  page: string;
};

interface TeamProjectsSlotProps {
  params: Promise<Params>;
}
const TeamProjectsSlot = async ({ params }: TeamProjectsSlotProps) => {
  const { page } = await params;
  const pageNum = parseInt(page);

  const { data, hasNextPage, hasPrevPage, currentPage, totalPages } =
    await getProjects({
      limit: 10,
      pageNum,
      projectType: "team",
    });

  return (
    <ProjectsSlider
      projectType="team"
      projects={data}
      currentPage={currentPage}
      hasNextPage={hasNextPage}
      hasPrevPage={hasPrevPage}
      pageNum={pageNum}
      totalPages={totalPages}
    />
  );
};

export default TeamProjectsSlot;
