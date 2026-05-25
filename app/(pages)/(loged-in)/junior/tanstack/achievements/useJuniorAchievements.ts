"use client";

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../../../configs/queryKeys";
import { components } from "../../../../../../api-schema";
import {
  getJuniorBadgeAchievements,
  getJuniorChallengeMilestones,
  getJuniorCollaborationMilestones,
  getJuniorLearningPathMilestones,
  getJuniorLevelAchievements,
  getJuniorRecentAchievements,
  getJuniorStreakStats,
} from "../../server";

type BadgeType =
  components["schemas"]["Sawiha.CrossCutting.Model.Entities.BadgeFeature.BadgeType"];

export const useJuniorRecentAchievements = () =>
  useQuery({
    queryKey: QUERY_KEYS.junior.achievements.recent,
    queryFn: getJuniorRecentAchievements,
    staleTime: 5 * 60 * 1000,
  });

export const useJuniorStreakStats = () =>
  useQuery({
    queryKey: QUERY_KEYS.junior.achievements.streakStats,
    queryFn: getJuniorStreakStats,
    staleTime: 5 * 60 * 1000,
  });

export const useJuniorBadgeAchievements = (
  badgeType?: BadgeType,
  enabled: boolean = true
) =>
  useQuery({
    queryKey: QUERY_KEYS.junior.achievements.badges(badgeType),
    queryFn: () => getJuniorBadgeAchievements({ badgeType }),
    enabled,
    staleTime: 5 * 60 * 1000,
  });

export const useJuniorLevelAchievements = () =>
  useQuery({
    queryKey: QUERY_KEYS.junior.achievements.levels,
    queryFn: getJuniorLevelAchievements,
    staleTime: 5 * 60 * 1000,
  });

export const useJuniorLearningPathMilestones = (enabled: boolean = true) =>
  useQuery({
    queryKey: QUERY_KEYS.junior.achievements.learningPathMilestones,
    queryFn: getJuniorLearningPathMilestones,
    enabled,
    staleTime: 5 * 60 * 1000,
  });

export const useJuniorCollaborationMilestones = (enabled: boolean = true) =>
  useQuery({
    queryKey: QUERY_KEYS.junior.achievements.collaborationMilestones,
    queryFn: getJuniorCollaborationMilestones,
    enabled,
    staleTime: 5 * 60 * 1000,
  });

export const useJuniorChallengeMilestones = (enabled: boolean = true) =>
  useQuery({
    queryKey: QUERY_KEYS.junior.achievements.challengeMilestones,
    queryFn: getJuniorChallengeMilestones,
    enabled,
    staleTime: 5 * 60 * 1000,
  });
