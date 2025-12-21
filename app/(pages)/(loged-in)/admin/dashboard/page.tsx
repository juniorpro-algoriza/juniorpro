import {
  DashboardHeader,
  DashboardPracticeZone,
  DashboardStatsContainer,
} from "./_components";

const AdminDashboardPage = async () => {

  return (
    <div className="py-3 px-6 bg-stone-50 space-y-6">
      <DashboardHeader />
      <DashboardStatsContainer />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <DashboardPracticeZone />
      </div>
    </div>
  );
};

export default AdminDashboardPage;
