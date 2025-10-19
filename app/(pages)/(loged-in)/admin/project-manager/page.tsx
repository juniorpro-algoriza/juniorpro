import { ServerTableWrapper } from "../../tables";
import {
  ProjectManagerHeader,
  ProjectManagerStatsContainer,
} from "./components";

const AdminProductManagerPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) => {
  const params = await searchParams;
  const pageNumber = Number(params.page) || 1;
  const searchText = params.search || undefined;

  return (
    <div className="min-h-screen py-3 px-6 bg-stone-50 space-y-6">
      <ProjectManagerHeader />
      <ProjectManagerStatsContainer />
      <ServerTableWrapper
        title="Project Managers"
        type="project-manager"
        pageNumber={pageNumber}
        searchText={searchText}
      />
    </div>
  );
};

export default AdminProductManagerPage;
