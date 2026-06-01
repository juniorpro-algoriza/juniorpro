"use client";
import { userAtom } from "@atoms";

import { UserCard } from "@components/client";
import { useAtom } from "jotai";
import { USER_TYPE } from "../../../configs/constants";
import {
  useJuniorBadgeAchievements,
  useJuniorDashboardStats,
  useJuniorLevel,
} from "../../../(pages)/(loged-in)/junior/tanstack";

export const SidebarUserInfo = () => {
  const [user] = useAtom(userAtom);
  const firstName = user?.firstName || "";
  const lastName = user?.lastName || "";
  const image = user?.image || null;
  const userType = user?.userType || 0;
  const isJunior = userType === USER_TYPE.Junior;
  const { data: dashboardStats } = useJuniorDashboardStats(isJunior);
  const { data: level } = useJuniorLevel(isJunior);
  console.log("level", level);
  const { data: badges } = useJuniorBadgeAchievements(undefined, isJunior);

  const currentLevel = level?.currentLevel ?? 0;
  const totalXP = level?.totalXP ?? dashboardStats?.totalXp ?? 0;
  const levelProgress = Math.round(level?.progressPercentage ?? 0);
  const points = dashboardStats?.myPoints ?? 0;
  const dayStreak = dashboardStats?.dailyStreak ?? 0;
  const badgeCount = badges?.completedBadges ?? badges?.totalBadges ?? 0;

  return (
    <div className="p-2">
      <UserCard
        image={image}
        firstName={firstName}
        lastName={lastName}
        level={currentLevel}
        xp={totalXP}
        userType={userType}
        {...(userType === USER_TYPE.Junior && {
          levelId: "level-progress-section",
          dayStreakId: "day-streak",
          pointsId: "points",
          badgesId: "badges",
          xpTextId: "xp-text",
          xpRemainingToNextLevel: level?.xpRemainingToNextLevel ?? 0,
          nextLevel: level?.nextLevel ?? currentLevel + 1,
          userDetails: {
            levelProgress,
            points,
            dayStreak,
            badges: badgeCount,
          },
        })}
      />
    </div>
  );
};
