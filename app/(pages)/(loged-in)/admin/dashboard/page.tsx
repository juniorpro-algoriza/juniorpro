import { ServerTableWrapper } from "../../tables/ServerTableWrapper";
import {
  DashboardHeader,
  DashboardPracticeZone,
  DashboardStatsContainer,
} from "./components";

const AdminDashboardPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) => {
  const params = await searchParams;
  const pageNumber = Number(params.page) || 1;
  const searchText = params.search || undefined;

  return (
    <div className="py-3 px-6 bg-stone-50 space-y-6">
      <DashboardHeader />
      <DashboardStatsContainer />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <DashboardPracticeZone />
        <ServerTableWrapper
          title="Contributors"
          type="contributor"
          view="dashboard"
          pageNumber={pageNumber}
          searchText={searchText}
        />
      </div>
    </div>
  );
};

export default AdminDashboardPage;
