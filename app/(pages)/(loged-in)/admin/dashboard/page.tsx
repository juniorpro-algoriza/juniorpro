import { ContributorTable } from "../../components/client";
import { getContributorData } from "../server";
import {
  DashboardHeader,
  DashboardPracticeZone,
  DashboardStatsContainer,
} from "./components";

const AdminDashboardPage = async () => {
  const contributorData = await getContributorData();

  return (
    <div className=" py-3 px-6 bg-stone-50 space-y-6">
      <DashboardHeader />
      <DashboardStatsContainer />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <DashboardPracticeZone />
        <ContributorTable contributorData={contributorData} view="dashboard" />
      </div>
    </div>
  );
};

export default AdminDashboardPage;
