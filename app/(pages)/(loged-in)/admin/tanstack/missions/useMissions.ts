"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getMissions,
  postMission,
  putMission,
  getMissionsById,
  deleteMission,
} from "../../server";

import { components } from "../../../../../../api-schema";
import { QUERY_KEYS } from "../../../../../configs/queryKeys";

type AddMissionModel =
  components["schemas"]["Sawiha.Services.DTO.MissionsModels.AddMissionModel"];

export const useMissions = (
  params: { SearchText?: string; Id?: number },
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: QUERY_KEYS.admin.missions.all(params),
    queryFn: () => getMissions(params),
    enabled,
  });
};

export const useMissionById = (id: number, enabled: boolean = true) => {
  return useQuery({
    queryKey: QUERY_KEYS.admin.missions.byId(id),
    queryFn: () => getMissionsById({ id }),
    enabled: !!id && enabled,
  });
};

export const useAddMission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AddMissionModel) => postMission(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.admin.missions.list,
      });
    },
  });
};

export const useUpdateMission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AddMissionModel) => putMission(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.admin.missions.list,
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.admin.missions.byId(
          variables.missionDetails.id as number
        ),
      });
    },
  });
};

export const useDeleteMission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteMission,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.admin.missions.list,
      });
    },
  });
};
