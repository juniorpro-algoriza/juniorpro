import { Trophy } from "lucide-react";
import Image from "next/image";
import DaysStreakImage from "@public/images/achievements/Days_Streak.png";
import PathExplorerImage from "@public/images/achievements/9a21a79c-4c2b-4637-936d-ebca6d647df7 2.png";
import type { RecentAchievement } from "./achievementTypes";
import {
  formatDate,
  getBadgeTitle,
  getRecentAchievementSub,
} from "./achievementData";
import NoRecentImage from "@public/images/achievements/No_recent_achievements.png";
import {
  BlueShieldIcon,
  EmptyState,
  LoadingRows,
  Section,
} from "./AchievementShared";

const fakeRecentAchievements: RecentAchievement[] = [
  {
    id: 1,
    titleEn: "Level 1",
    titleAr: "Level 1",
    type: 5,
    imageUrl: null,
    achievedDate: "2026-04-01T09:15:00Z",
  } as RecentAchievement,
  {
    id: 2,
    titleEn: "7- Day Streak",
    titleAr: "7- Day Streak",
    type: 4,
    imageUrl: DaysStreakImage.src,
    achievedDate: "2026-04-01T09:15:00Z",
  } as RecentAchievement,
  {
    id: 3,
    titleEn: "1 Challenge Done",
    titleAr: "1 Challenge Done",
    type: 5,
    imageUrl: PathExplorerImage.src,
    achievedDate: "2026-04-01T09:15:00Z",
  } as RecentAchievement,
];

const getRecentAchievementLabel = (achievement: RecentAchievement) => {
  const title = getBadgeTitle(achievement).toLowerCase();

  if (title.includes("level")) return "Level Unlocked";
  if (title.includes("challenge")) return "Milestones Achieved";
  return getRecentAchievementSub(achievement);
};

const RecentAchievementArtwork = ({
  achievement,
}: {
  achievement: RecentAchievement;
}) => {
  const title = getBadgeTitle(achievement).toLowerCase();

  if (title.includes("level")) {
    return (
      <div className="h-24 w-24">
        <BlueShieldIcon num={1} />
      </div>
    );
  }

  if (achievement.imageUrl) {
    return (
      <Image
        src={achievement.imageUrl}
        alt={getBadgeTitle(achievement)}
        width={96}
        height={96}
        className="h-24 w-24 object-contain"
        unoptimized
      />
    );
  }

  return <Trophy className="size-16 text-violet-normal" />;
};

export const RecentAchievements = ({
  achievements,
  demoMode = false,
  isLoading,
}: {
  achievements: RecentAchievement[];
  demoMode?: boolean;
  isLoading: boolean;
}) => {
  const displayAchievements =
    demoMode && achievements.length === 0
      ? fakeRecentAchievements
      : achievements;

  return (
    <Section title="My Recent Achievement">
      {isLoading ? (
        <LoadingRows rows={3} />
      ) : displayAchievements.length === 0 ? (
        <EmptyState
          image={NoRecentImage}
          title="No recent achievements"
          description="Start your first lesson, challenge, or project and track your progress here."
        />
      ) : (
        <div className="relative">
          <div className="absolute left-24 right-24 top-1/2 hidden h-1 -translate-y-1/2 bg-violet-light md:block" />
          <div className="relative grid gap-8 md:grid-cols-3">
            {displayAchievements.slice(0, 3).map((achievement, index) => {
              return (
                <div
                  key={`${achievement.id ?? achievement.titleEn ?? index}`}
                  className="relative min-h-[130px] min-w-0 rounded-2xl border border-violet-light bg-[#FAFBFE] p-4 pr-12 shadow-[0_8px_24px_rgba(18,24,40,0.02)] transition duration-200"
                >
                  <div className="flex h-full items-center gap-5">
                    <div className="shrink-0">
                      <RecentAchievementArtwork achievement={achievement} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-[#637590] leading-none">
                        {getRecentAchievementLabel(achievement)}
                      </p>
                      <p className="mt-5 truncate text-xl font-bold text-maastricht-blue leading-tight">
                        {getBadgeTitle(achievement)}
                      </p>
                      <p className="mt-3 text-sm font-medium text-[#8CA0BD]">
                        {formatDate(achievement.achievedDate) ||
                          "Recently earned"}
                      </p>
                    </div>
                  </div>

                  <div className="absolute right-3.5 top-5 flex size-7 items-center justify-center rounded-full bg-[#34A853] text-white shadow-sm z-10">
                    <svg
                      className="size-4.5 stroke-white fill-none stroke-[3.5]"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </Section>
  );
};
