"use server";
import { getJuniorStatistic } from "@server";
import {
  DashboardCards,
  DashboardHeader,
  DashboardProjects,
  DashboardTasks,
} from "./components";

const DashboardPage = async () => {
  const statistics = await getJuniorStatistic();
  return (
    <div className="min-h-screen py-3 px-6 space-y-5 bg-stone-50">
      <DashboardHeader />
      <DashboardCards statistics={statistics} />
      <DashboardProjects />
      <DashboardTasks />
    </div>
  );
};

export default DashboardPage;
