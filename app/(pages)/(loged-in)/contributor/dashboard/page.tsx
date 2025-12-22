import { DashboardCards, DashboardHeader } from "@components/client";
import TargetWithArrow from "@public/images/target_with_arrow.png";
import LightningIcon from "@public/images/lightning-icon.png";
import TrophyIcon from "@public/images/trophy-icon.png";
import HandshakeIcon from "@public/images/hand-shake-icon.png";
import { TrackYourJuniors, UpcomingSessions, YourJuniors } from "./_components";
const DashboardPage = async () => {
  // const pointsData = await getPointsData();

  return (
    <>
      <DashboardHeader description="Here's what's happening with your juniors today." />
      <DashboardCards cardsData={dashboardCardsData} />
      <div className="grid xl:grid-cols-3 md:grid-cols-2 xl:gap-5 gap-4">
        <YourJuniors />
        <div className="xl:space-y-5 space-y-4">
          <UpcomingSessions />
          <TrackYourJuniors />
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
const dashboardCardsData = [
  {
    label: "Total XP",
    value: "530",
    subtext: "Combined progress",
    subtextColor: "text-gray-600",
    icon: LightningIcon.src,
  },
  {
    label: "Missions Completed",
    value: "12",
    subtext: "Across all juniors this week",
    subtextColor: "text-gray-600",
    icon: TargetWithArrow.src,
  },
  {
    label: "Challenges Won ",
    value: "5",
    subtext: "Across all juniors this week",
    subtextColor: "text-gray-600",
    icon: TrophyIcon.src,
  },
  {
    label: "Projects Completed",
    value: "8",
    subtext: "2 active teams",
    subtextColor: "text-gray-600",
    icon: HandshakeIcon.src,
  },
];
