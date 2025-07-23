import { ProjectsSlider } from "../../../../components/ProjectSlider";
import { getProjects } from "../../../../server";

type Params = {
  page: string;
};

interface CodingProjectsSlotProps {
  params: Promise<Params>;
}
const CodingProjectsSlot = async ({ params }: CodingProjectsSlotProps) => {
  const { page } = await params;
  const pageNum = parseInt(page);

  const { data, hasNextPage, hasPrevPage, currentPage, totalPages } =
    await getProjects({
      limit: 4,
      pageNum,
      projectType: "coding",
    });

  return (
    <ProjectsSlider
      projectType="coding"
      projects={data}
      currentPage={currentPage}
      hasNextPage={hasNextPage}
      hasPrevPage={hasPrevPage}
      pageNum={pageNum}
      totalPages={totalPages}
    />
  );
};

export default CodingProjectsSlot;
