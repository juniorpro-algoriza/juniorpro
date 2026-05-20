import { components } from "../../../../../../api-schema";

export type BadgeType =
  components["schemas"]["Sawiha.CrossCutting.Model.Entities.BadgeFeature.BadgeType"];
export type RecentAchievement =
  components["schemas"]["Sawiha.Services.DTO.JuniorBadgeModels.GetRecentAchievements.GetRecentAchievementModel"];
export type BadgeAchievement =
  components["schemas"]["Sawiha.Services.DTO.JuniorBadgeModels.GetBadgeAchievements.GetJuniorBadgeAchievementModel"];
export type LevelAchievement =
  components["schemas"]["Sawiha.Services.DTO.JuniorDashboard.GetLevelAchievement.GetJuniorLevelAchievementModel"];
export type Milestone =
  components["schemas"]["Sawiha.Services.DTO.JuniorBadgeModels.GetLearningMilestones.JuniorMilestoneModel"];
export type StreakStat =
  components["schemas"]["Sawiha.Services.DTO.JuniorBadgeModels.GetStreakStats.GetStreakStatsModel"];

export type BadgeStatusFilter = "all" | "completed" | "in-progress" | "locked";
export type MilestoneTab = "all" | "learning" | "collaboration" | "challenge";
