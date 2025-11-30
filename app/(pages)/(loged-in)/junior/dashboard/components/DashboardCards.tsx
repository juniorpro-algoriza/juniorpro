import Image from "next/image";
import TargetWithArrow from "@public/images/target_with_arrow.png";
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
    icon: TargetWithArrow,
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
    icon: TargetWithArrow,
  },
  {
    label: "Challenges Won",
    value: "8",
    subtext: "1 active entry",
    subtextColor: "text-green-600",
    icon: TargetWithArrow,
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
          <MainCard key={index}>
            <Image
              src={card.icon.src}
              alt={card.label}
              width={48}
              height={48}
              className="size-12"
            />
            <p className="text-13 text-gray-600">{card.label}</p>
            <p className="font-bold lg:text-[32px] text-[24px]">{card.value}</p>
            <p className={`text-13 ${card.subtextColor}`}>{card.subtext}</p>
          </MainCard>
        ))}
      </div>
    </div>
  );
};
