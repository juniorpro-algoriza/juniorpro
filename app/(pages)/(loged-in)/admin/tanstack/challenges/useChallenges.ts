"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../../../configs/queryKeys";
import {
  createAdminChallenge,
  updateAdminChallenge,
  getAdminChallenges,
  getAdminChallengeById,
  deleteAdminChallenge,
  getChallengeParticipants,
  getChallengeParticipantById,
  evaluateChallengeParticipant,
} from "../../server/challenges";

export const useGetAdminChallenges = (params: {
  pageNumber?: number;
  pageSize?: number;
  searchText?: string;
}) => {
  return useQuery({
    queryKey: QUERY_KEYS.admin.challenges.all({
      PageNumber: params.pageNumber,
      PageSize: params.pageSize,
      SearchText: params.searchText,
    }),
    queryFn: () => getAdminChallenges(params),
  });
};

export const useGetAdminChallengeById = (id: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.admin.challenges.byId(id),
    queryFn: () => getAdminChallengeById(id),
    enabled: !!id,
  });
};

export const useCreateAdminChallenge = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAdminChallenge,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.admin.challenges.list,
      });
    },
  });
};

export const useUpdateAdminChallenge = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAdminChallenge,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.admin.challenges.list,
      });
    },
  });
};

export const useDeleteAdminChallenge = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAdminChallenge,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.admin.challenges.list,
      });
    },
  });
};

export const useGetChallengeParticipants = (params: {
  id: number;
  pageNumber?: number;
  pageSize?: number;
  searchText?: string;
}) => {
  return useQuery({
    queryKey: QUERY_KEYS.admin.challenges.participants({
      Id: params.id,
      PageNumber: params.pageNumber,
      PageSize: params.pageSize,
      SearchText: params.searchText,
    }),
    queryFn: () => getChallengeParticipants(params),
    enabled: !!params.id,
  });
};

export const useGetChallengeParticipantById = (id: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.admin.challenges.participantById(id),
    queryFn: () => getChallengeParticipantById(id),
    enabled: !!id,
  });
};

export const useEvaluateChallengeParticipant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: evaluateChallengeParticipant,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.admin.challenges.list,
      });
    },
  });
};
