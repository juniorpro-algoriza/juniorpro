"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../../../configs/queryKeys";
import {
  getProjectManagers,
  getProjectManagerById,
  addProjectManager,
  updateProjectManager,
  deleteProjectManager,
  getProjectManagerEnablers,
  getProjectManagerJuniors,
  getEnablerDetails,
  getJuniorDetails,
} from "../../server/project-managers";

export const useGetProjectManagers = (params: {
  projectManagerId?: number;
  pageNumber?: number;
  pageSize?: number;
  searchText?: string;
}) => {
  return useQuery({
    queryKey: QUERY_KEYS.admin.projectManagers.all({
      Id: params.projectManagerId,
      PageNumber: params.pageNumber,
      PageSize: params.pageSize,
      SearchText: params.searchText,
    }),
    queryFn: () => getProjectManagers(params),
  });
};

export const useGetProjectManagerById = (id: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.admin.projectManagers.byId(id),
    queryFn: () => getProjectManagerById(id),
    enabled: !!id,
  });
};

export const useAddProjectManager = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addProjectManager,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.admin.projectManagers.list,
      });
    },
  });
};

export const useUpdateProjectManager = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProjectManager,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.admin.projectManagers.list,
      });
    },
  });
};

export const useDeleteProjectManager = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProjectManager,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.admin.projectManagers.list,
      });
    },
  });
};

export const useGetProjectManagerEnablers = (params: {
  projectManagerId?: number;
  pageNumber?: number;
  pageSize?: number;
  searchText?: string;
}) => {
  return useQuery({
    queryKey: QUERY_KEYS.admin.projectManagers.enablers({
      Id: params.projectManagerId,
      PageNumber: params.pageNumber,
      PageSize: params.pageSize,
      SearchText: params.searchText,
    }),
    queryFn: () => getProjectManagerEnablers(params),
    enabled: !!params.projectManagerId,
  });
};

export const useGetProjectManagerJuniors = (params: {
  projectManagerId?: number;
  pageNumber?: number;
  pageSize?: number;
  searchText?: string;
}) => {
  return useQuery({
    queryKey: QUERY_KEYS.admin.projectManagers.juniors({
      Id: params.projectManagerId,
      PageNumber: params.pageNumber,
      PageSize: params.pageSize,
      SearchText: params.searchText,
    }),
    queryFn: () => getProjectManagerJuniors(params),
    enabled: !!params.projectManagerId,
  });
};

export const useGetEnablerDetails = (id: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.admin.projectManagers.enablerDetail(id),
    queryFn: () => getEnablerDetails(id),
    enabled: !!id,
  });
};

export const useGetJuniorDetails = (id: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.admin.projectManagers.juniorDetail(id),
    queryFn: () => getJuniorDetails(id),
    enabled: !!id,
  });
};
