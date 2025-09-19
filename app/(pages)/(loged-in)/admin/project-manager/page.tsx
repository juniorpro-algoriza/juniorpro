import { ServerTableWrapper } from "../../tables";
import {
  ProjectManagerHeader,
  ProjectManagerStatsContainer,
} from "./components";

const AdminProductManagerPage = async ({
  searchParams,
}: {
  searchParams: { page?: string };
}) => {
  const pageNumber = Number(searchParams.page) || 1;

  return (
    <div className="min-h-screen py-3 px-6 bg-stone-50 space-y-6">
      <ProjectManagerHeader />
      <ProjectManagerStatsContainer />
      <ServerTableWrapper
        title="Project Managers"
        type="project-manager"
        pageNumber={pageNumber}
      />
    </div>
  );
};

export default AdminProductManagerPage;
