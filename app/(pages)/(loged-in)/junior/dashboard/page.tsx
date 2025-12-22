import { DashboardCards, DashboardHeader } from "@components/client";
import TargetWithArrow from "@public/images/target_with_arrow.png";
import LightningIcon from "@public/images/lightning-icon.png";
import TrophyIcon from "@public/images/trophy-icon.png";
import HandshakeIcon from "@public/images/hand-shake-icon.png";
import {
  DailyGoals,
  ContinueLearning,
  UpcomingSession,
  LeaderBoard,
  DashboardBanner,
} from "./_components";

const DashboardPage = async () => {
  return (
    <>
      <DashboardHeader description="Ready to level up your coding skills today?" />
      <DashboardBanner />
      <DashboardCards cardsData={dashboardCardsData} />
      <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 xl:gap-8 gap-4 mt-8">
        <div className="xl:col-span-2 space-y-6">
          <DailyGoals />
          <ContinueLearning />
        </div>
        <div className="space-y-6">
          <UpcomingSession />
          <LeaderBoard />
        </div>
      </div>
    </>
  );
};

export default DashboardPage;

const dashboardCardsData = [
  {
    label: "Total XP",
    value: "10,340",
    subtext: "+450 this week",
    subtextColor: "text-green-600",
    icon: LightningIcon.src,
  },
  {
    label: "Missions Completed",
    value: "24",
    subtext: "3 in progress",
    subtextColor: "text-orange-600",
    icon: TargetWithArrow.src,
  },
  {
    label: "Projects Completed",
    value: "5",
    subtext: "2 active teams",
    subtextColor: "text-green-600",
    icon: TrophyIcon.src,
  },
  {
    label: "Challenges Won",
    value: "8",
    subtext: "1 active entry",
    subtextColor: "text-green-600",
    icon: HandshakeIcon.src,
  },
];
