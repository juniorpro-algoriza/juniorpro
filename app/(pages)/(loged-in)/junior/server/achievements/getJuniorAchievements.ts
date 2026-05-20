"use server";

import { customFetch, formatImageUrl } from "@server/lib";
import { components } from "../../../../../../api-schema";

type BadgeType =
  components["schemas"]["Sawiha.CrossCutting.Model.Entities.BadgeFeature.BadgeType"];
type RecentAchievement =
  components["schemas"]["Sawiha.Services.DTO.JuniorBadgeModels.GetRecentAchievements.GetRecentAchievementModel"];
type BadgeAchievement =
  components["schemas"]["Sawiha.Services.DTO.JuniorBadgeModels.GetBadgeAchievements.GetJuniorBadgeAchievementModel"];
type LevelAchievement =
  components["schemas"]["Sawiha.Services.DTO.JuniorDashboard.GetLevelAchievement.GetJuniorLevelAchievementModel"];
type StreakStat =
  components["schemas"]["Sawiha.Services.DTO.JuniorBadgeModels.GetStreakStats.GetStreakStatsModel"];

const formatRecentAchievementImages = async (
  achievements: RecentAchievement[] | null
) => {
  if (!achievements) return achievements;

  return Promise.all(
    achievements.map(async (achievement) => ({
      ...achievement,
      imageUrl: await formatImageUrl(achievement.imageUrl),
    }))
  );
};

const formatBadgeAchievementImages = async (
  achievements: BadgeAchievement[] | null | undefined
) => {
  if (!achievements) return achievements;

  return Promise.all(
    achievements.map(async (achievement) => ({
      ...achievement,
      imageUrl: await formatImageUrl(achievement.imageUrl),
    }))
  );
};

const formatLevelAchievementImages = async (
  achievements: LevelAchievement[] | null | undefined
) => {
  if (!achievements) return achievements;

  return Promise.all(
    achievements.map(async (achievement) => ({
      ...achievement,
      imageUrl: await formatImageUrl(achievement.imageUrl),
    }))
  );
};

const formatStreakStatImages = async (stats: StreakStat[] | null) => {
  if (!stats) return stats;

  return Promise.all(
    stats.map(async (stat) => ({
      ...stat,
      nextBadgeImageUrl: await formatImageUrl(stat.nextBadgeImageUrl),
    }))
  );
};

export async function getJuniorRecentAchievements() {
  const response = await customFetch("/api/junior-badge/recent-achievements", {
    method: "get",
    graceful404: true,
  });

  return formatRecentAchievementImages(response);
}

export async function getJuniorStreakStats() {
  const response = await customFetch("/api/junior-badge/streak-stats", {
    method: "get",
    graceful404: true,
  });

  return formatStreakStatImages(response);
}

export async function getJuniorBadgeAchievements({
  badgeType,
}: {
  badgeType?: BadgeType;
}) {
  const response = await customFetch("/api/junior-badge/achievements", {
    method: "get",
    graceful404: true,
    params: {
      badgeType,
    },
  });

  if (!response) return response;

  return {
    ...response,
    juniorBadgeAchievements: await formatBadgeAchievementImages(
      response.juniorBadgeAchievements
    ),
  };
}

export async function getJuniorLevelAchievements() {
  const response = await customFetch(
    "/api/junior-dashboard/level-achievements",
    {
      method: "get",
      graceful404: true,
    }
  );

  if (!response) return response;

  return {
    ...response,
    juniorLevelAchievements: await formatLevelAchievementImages(
      response.juniorLevelAchievements
    ),
  };
}

export async function getJuniorLearningPathMilestones() {
  return customFetch("/api/junior-badge/learning-paths-milestones", {
    method: "get",
    graceful404: true,
  });
}

export async function getJuniorCollaborationMilestones() {
  return customFetch("/api/junior-badge/collaborations-milestones", {
    method: "get",
    graceful404: true,
  });
}

export async function getJuniorChallengeMilestones() {
  return customFetch("/api/junior-badge/challenges-milestones", {
    method: "get",
    graceful404: true,
  });
}
