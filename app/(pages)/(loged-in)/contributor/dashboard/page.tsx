import {
  ContributorDashboardHeader,
  ContributorStatsCards,
  JuniorsPointsAllocation,
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
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-6">
        <div id="manage-juniors-section">
          <ManageJuniorsWidget />
        </div>
        <div id="juniors-points-allocation-section">
          <JuniorsPointsAllocation />
        </div>
      </div>

      {/* New Interactive Widgets - Second Row */}
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4 items-start">
        <div id="assign-points-section">
          <AssignPointsWidget />
        </div>
        <div id="current-subscription-section">
          <CurrentSubscriptionWidget />
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
