export const dynamic = "force-dynamic";

// import { getJuniorStatistic } from "@server";
import {
  DailyGoals,
  DashboardCards,
  DashboardHeader,
  ContinueLearning,
  WhatsNext,
  UpcomingSession,
  LeaderBoard,
} from "./components";

const DashboardPage = async () => {
  return (
    <div className="min-h-screen py-3 px-6 space-y-5 bg-[#FAFBFC]">
      <DashboardHeader />
      <DashboardCards />
      <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 xl:gap-8 gap-4 mt-8">
        <div className="xl:col-span-2 space-y-6">
          <DailyGoals />
          <ContinueLearning />
          <WhatsNext />
        </div>
        <div className="space-y-6">
          <UpcomingSession />
          <LeaderBoard />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
