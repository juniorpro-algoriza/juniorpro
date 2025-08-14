export const dynamic = "force-dynamic";

import { getContributorData } from "@server";
import { ContributorTable } from "../../components/client";
import { DashboardHeader } from "./components";
import DashboardPracticeZone from "./components/DashboardPracticeZone";
import DashboardStats from "./components/DashboardStats";

const AdminDashboard = async () => {
  const contributorData = await getContributorData();

  return (
    <div className=" py-3 px-6 bg-stone-50 space-y-6">
      <DashboardHeader />
      <DashboardStats />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <DashboardPracticeZone />
        <ContributorTable contributorData={contributorData} view="dashboard" />
      </div>
    </div>
  );
};

export default AdminDashboard;
