import {
  ContributorDashboardHeader,
  ContributorStatsCards,
  JuniorsPointsAllocation,
  JuniorsProjects,
  ManageJuniorsWidget,
  AssignPointsWidget,
  CurrentSubscriptionWidget,
} from "./_components";

const DashboardPage = async () => {
  return (
    <>
      {/* Header */}
      <ContributorDashboardHeader />

      {/* Stats Cards */}
      <div className="mt-6">
        <ContributorStatsCards />
      </div>

      {/* Main Content Sections - First Row */}
      <div className="grid lg:grid-cols-5 grid-cols-1 gap-4 mt-6">
        <div id="juniors-projects-section" className="lg:col-span-3">
          <JuniorsProjects />
        </div>
        <div id="juniors-points-allocation-section" className="lg:col-span-2">
          <JuniorsPointsAllocation />
        </div>
      </div>

      {/* New Interactive Widgets - Second Row */}
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 mt-4 items-start">
        <div id="manage-juniors-section" className="lg:col-span-1">
          <ManageJuniorsWidget />
        </div>
        <div id="assign-points-section" className="lg:col-span-1">
          <AssignPointsWidget />
        </div>
        <div id="current-subscription-section" className="lg:col-span-1">
          <CurrentSubscriptionWidget />
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
