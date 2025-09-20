import { ServerTableWrapper } from "../../tables/ServerTableWrapper";
import {
  DashboardHeader,
  DashboardPracticeZone,
  DashboardStatsContainer,
} from "./components";

const AdminDashboardPage = async ({
  searchParams,
}: {
  searchParams: { page?: string };
}) => {
  const pageNumber = Number(searchParams.page) || 1;

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
        />
      </div>
    </div>
  );
};

export default AdminDashboardPage;
