"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getLearningPaths,
  postLearningPath,
  putLearningPath,
  getLearningPathById,
  deleteLearningPath,
  completeLearningPath,
} from "../../server";

import { components } from "../../../../../../api-schema";
import { QUERY_KEYS } from "../../../../../configs/queryKeys";

type AddLearningPathModel =
  components["schemas"]["Sawiha.Services.DTO.PathModels.AddLearningPathModel"];

export const useLearningPaths = (
  params: { SearchText?: string },
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: ["admin", "paths", params],
    queryFn: () => getLearningPaths(params),
    enabled,
  });
};

export const useLearningPathById = (id: number, enabled: boolean = true) => {
  return useQuery({
    queryKey: QUERY_KEYS.admin.paths.byId(id),
    queryFn: () => getLearningPathById({ id }),
    enabled: !!id && enabled,
  });
};

export const useAddLearningPath = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AddLearningPathModel) => postLearningPath(data),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["admin", "paths"],
        exact: false,
      });
    },
  });
};

export const useUpdateLearningPath = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AddLearningPathModel) => putLearningPath(data),
    onSuccess: (_, variables) => {
      queryClient.refetchQueries({
        queryKey: ["admin", "paths"],
        exact: false,
      });
      queryClient.refetchQueries({
        queryKey: QUERY_KEYS.admin.paths.byId(variables.id as number),
      });
    },
  });
};

export const useDeleteLearningPath = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteLearningPath,
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["admin", "paths"],
        exact: false,
      });
    },
  });
};

export const useCompleteLearningPath = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: completeLearningPath,
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["admin", "paths"],
        exact: false,
      });
    },
  });
};
