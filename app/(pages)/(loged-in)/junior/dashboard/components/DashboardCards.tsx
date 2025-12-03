import Image from "next/image";
import TargetWithArrow from "@public/images/target_with_arrow.png";
import LightningIcon from "@public/images/lightning-icon.png";
import TrophyIcon from "@public/images/trophy-icon.png";
import HandshakeIcon from "@public/images/hand-shake-icon.png";
import { MainCard } from "@components";

// interface DashboardStats {
//   dailyStreak: number;
//   finishedTasks: number;
//   pendingTasks: number;
//   myPoints: number;
// }

const dashboardCardsData = [
  {
    label: "Total XP",
    value: "10,340",
    subtext: "+450 this week",
    subtextColor: "text-green-600",
    icon: LightningIcon,
  },
  {
    label: "Missions Completed",
    value: "24",
    subtext: "3 in progress",
    subtextColor: "text-orange-600",
    icon: TargetWithArrow,
  },
  {
    label: "Projects Completed",
    value: "5",
    subtext: "2 active teams",
    subtextColor: "text-green-600",
    icon: TrophyIcon,
  },
  {
    label: "Challenges Won",
    value: "8",
    subtext: "1 active entry",
    subtextColor: "text-green-600",
    icon: HandshakeIcon,
  },
];

export const DashboardCards = async () => {
  // const statistics: DashboardStats = await getData<DashboardStats>({
  //   url: "junior-dashboard/stats",
  //   method: "GET",
  //   dummyData: {
  //     dailyStreak: 0,
  //     finishedTasks: 0,
  //     pendingTasks: 0,
  //     myPoints: 0,
  //   },
  // });

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:gap-6 gap-4">
        {dashboardCardsData.map((card, index) => (
          <MainCard key={index} classname="relative">
            <div className="relative z-10">
              <div className="flex items-center gap-2">
                <Image
                  src={card.icon.src}
                  alt={card.label}
                  width={48}
                  height={48}
                  className="h-12 w-auto"
                />
                <p className="font-bold text-2xl">{card.value}</p>
              </div>
              <p className="text-gray-600">{card.label}</p>
              <p className={`text-13 ${card.subtextColor}`}>{card.subtext}</p>
            </div>
            <Image
              src={card.icon.src}
              alt={card.label}
              width={100}
              height={100}
              className="size-28 absolute top-1/2 -translate-y-1/2 right-0 opacity-5"
            />
          </MainCard>
        ))}
      </div>
    </div>
  );
};
