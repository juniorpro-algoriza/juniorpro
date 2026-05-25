import { DashboardHeader } from "@components/client";
import {
  StatsCards,
  CurrentPath,
  NextUnlocks,
  WeeklyChallenges,
  TeamProjects,
  DailyMissionTracker,
  WeeklyXPTrend,
  WelcomePopupTrigger,
  OnboardingTourTrigger,
} from "./_components";
import { Suspense } from "react";

const DashboardPage = async () => {
  return (
    <>
      <Suspense fallback={null}>
        <WelcomePopupTrigger />
      </Suspense>
      <Suspense fallback={null}>
        <OnboardingTourTrigger />
      </Suspense>

      {/* Header */}
      <DashboardHeader description="You completed 3 missions this week. Keep it up!" />

      {/* Stats Cards */}
      <div className="mt-6">
        <StatsCards />
      </div>

      {/* Current Path + Next Unlocks */}
      <div className="grid lg:grid-cols-5 grid-cols-1 gap-4 mt-6">
        <div id="current-path-section" className="lg:col-span-3">
          <CurrentPath />
        </div>
        <div id="next-unlocks-section" className="lg:col-span-2">
          <NextUnlocks />
        </div>
      </div>

      {/* Weekly Challenges + Team Projects */}
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mt-6">
        <div id="weekly-challenges-section">
          <WeeklyChallenges />
        </div>
        <div id="team-projects-section">
          <TeamProjects />
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mt-6">
        <DailyMissionTracker />
        <WeeklyXPTrend />
      </div>
    </>
  );
};

export default DashboardPage;
