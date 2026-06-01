"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getJuniorsLearningPaths,
  getJuniorsLearningPathById,
  getJuniorsLearningPathMission,
  getJuniorsLearningPathCurrent,
  getJuniorsLearningPathCurrentById,
  getJuniorsLearningPathCurrentMission,
  getJuniorsLearningPathCurrentMissionById,
  postJuniorsLearningPathJoin,
  postJuniorsLearningPathSubmitMission,
} from "../../server";
import { QUERY_KEYS } from "../../../../../configs/queryKeys";

export const useJuniorsLearningPaths = (
  params: { SearchText?: string },
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: QUERY_KEYS.junior.paths.all(params),
    queryFn: () => getJuniorsLearningPaths(params),
    enabled,
  });
};

export const useJuniorsLearningPathById = (
  id: number,
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: QUERY_KEYS.junior.paths.byId(id),
    queryFn: () => getJuniorsLearningPathById({ id }),
    enabled: !!id && enabled,
  });
};

export const useJuniorsLearningPathMission = (
  params: {
    Id?: number;
    PageNumber?: number;
    PageSize?: number;
    SearchText?: string;
  },
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: QUERY_KEYS.junior.paths.mission(params),
    queryFn: () => getJuniorsLearningPathMission(params),
    enabled,
  });
};

export const useJuniorsLearningPathCurrent = (enabled: boolean = true) => {
  return useQuery({
    queryKey: QUERY_KEYS.junior.paths.current,
    queryFn: () => getJuniorsLearningPathCurrent({}),
    enabled,
  });
};

export const useJuniorsLearningPathCurrentById = (
  id: number,
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: QUERY_KEYS.junior.paths.currentById(id),
    queryFn: () => getJuniorsLearningPathCurrentById({ id }),
    enabled: !!id && enabled,
  });
};

export const useJuniorsLearningPathCurrentMission = (
  params: {
    Id?: number;
    PageNumber?: number;
    PageSize?: number;
    SearchText?: string;
  },
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: QUERY_KEYS.junior.paths.currentMission(params),
    queryFn: () => getJuniorsLearningPathCurrentMission(params),
    enabled,
  });
};

export const useJuniorsLearningPathCurrentMissionById = (
  id: number,
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: QUERY_KEYS.junior.paths.currentMissionById(id),
    queryFn: () => getJuniorsLearningPathCurrentMissionById({ id }),
    enabled: !!id && enabled,
  });
};

export const useJoinLearningPath = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postJuniorsLearningPathJoin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.junior.paths.list });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.junior.dashboard.currentPath,
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.junior.paths.current,
      });
    },
  });
};

export const useSubmitMission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postJuniorsLearningPathSubmitMission,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.junior.paths.missionsList,
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.junior.paths.currentMissionList,
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.junior.paths.current,
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.junior.paths.list,
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.junior.dashboard.stats,
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.junior.dashboard.level,
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.junior.achievements.badges(),
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.junior.achievements.recent,
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.junior.achievements.learningPathMilestones,
      });
    },
  });
};
