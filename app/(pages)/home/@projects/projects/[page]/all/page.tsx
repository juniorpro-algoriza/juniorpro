import { getProjects } from "../../../../server";
import { ProjectsSlider } from "../../../../components/ProjectSlider";

type Params = {
  page: string;
};

interface AllProjectsSlotProps {
  params: Promise<Params>;
}
const AllProjectsSlot = async ({ params }: AllProjectsSlotProps) => {
  const { page } = await params;
  const pageNum = parseInt(page);

  const { data, hasNextPage, hasPrevPage, currentPage, totalPages } =
    await getProjects({
      limit: 4,
      pageNum,
      projectType: "all",
    });

  return (
    <ProjectsSlider
      projects={data}
      currentPage={currentPage}
      hasNextPage={hasNextPage}
      hasPrevPage={hasPrevPage}
      pageNum={pageNum}
      totalPages={totalPages}
    />
  );
};

export default AllProjectsSlot;
