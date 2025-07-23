import { getProjects } from "../../../../server";
import { ProjectsSlider } from "../../../../components/ProjectSlider";

type Params = {
  page: string;
};

interface SoloProjectsSlotProps {
  params: Promise<Params>;
}
const SoloProjectsSlot = async ({ params }: SoloProjectsSlotProps) => {
  const { page } = await params;
  const pageNum = parseInt(page);

  const { data, hasNextPage, hasPrevPage, currentPage, totalPages } =
    await getProjects({
      limit: 4,
      pageNum,
      projectType: "solo",
    });

  return (
    <ProjectsSlider
      projectType="solo"
      projects={data}
      currentPage={currentPage}
      hasNextPage={hasNextPage}
      hasPrevPage={hasPrevPage}
      pageNum={pageNum}
      totalPages={totalPages}
    />
  );
};

export default SoloProjectsSlot;
