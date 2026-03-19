"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../../../configs/queryKeys";
import {
  getJuniorChallenges,
  getJuniorChallengeById,
  joinChallenge,
} from "../../server/challenges";

// --- Query Hooks ---

export const useJuniorChallenges = (params: {
  searchText?: string;
  pageNumber?: number;
  pageSize?: number;
}) => {
  return useQuery({
    queryKey: QUERY_KEYS.junior.challenges.all({
      SearchText: params.searchText,
    }),
    queryFn: () => getJuniorChallenges(params),
  });
};

export const useJuniorChallengeById = (id: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.junior.challenges.detail(id),
    queryFn: () => getJuniorChallengeById(id),
    enabled: !!id,
  });
};

// --- Mutation Hooks ---

export const useJoinChallenge = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => joinChallenge(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.junior.challenges.list,
      });
    },
  });
};

interface SubmitChallengeInput {
  challengeId: number;
  projectLink?: string;
  additionalNotes?: string;
  file?: File;
}

export const useSubmitChallenge = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: SubmitChallengeInput) => {
      const formData = new FormData();
      formData.append("ChallengeId", String(input.challengeId));
      if (input.projectLink) formData.append("ProjectLink", input.projectLink);
      if (input.additionalNotes)
        formData.append("AdditionalNotes", input.additionalNotes);
      if (input.file) formData.append("File", input.file);

      const response = await fetch("/api/junior-challenge/submit", {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Failed to submit challenge: ${response.statusText}`);
      }

      return response.json();
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.junior.challenges.list,
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.junior.challenges.detail(variables.challengeId),
      });
    },
  });
};
