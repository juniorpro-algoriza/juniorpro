"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../../../configs/queryKeys";
import {
  getJuniorCollaborations,
  getJuniorCollaborationById,
  getJuniorCollaborationRoles,
  getJuniorCollaborationRoleTasks,
  getJuniorRoleTaskDetails,
  postJoinCollaborationRole,
  submitJuniorTask,
  changeJuniorTaskStatus,
} from "../../server/collaborations";
import { components } from "../../../../../../api-schema";

// --- Query Hooks ---

export const useJuniorCollaborations = (params: {
  searchText?: string;
  pageNumber?: number;
  pageSize?: number;
}) => {
  return useQuery({
    queryKey: QUERY_KEYS.junior.collaborations.all({
      SearchText: params.searchText,
    }),
    queryFn: () => getJuniorCollaborations(params),
  });
};

export const useJuniorCollaborationById = (id: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.junior.collaborations.detail(id),
    queryFn: () => getJuniorCollaborationById(id),
    enabled: !!id,
  });
};

export const useJuniorCollaborationRoles = (collaborationId: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.junior.collaborations.roles(collaborationId),
    queryFn: () => getJuniorCollaborationRoles({ collaborationId }),
    enabled: !!collaborationId,
  });
};

export const useJuniorCollaborationRoleTasks = (params: {
  collaborationId: number;
  roleId?: number;
  juniorId?: number;
  status?: components["schemas"]["Sawiha.CrossCutting.Model.Entities.CollaborationsFeatures.CollaborationRoleTaskStatus"];
  pageNumber: number;
  pageSize: number;
  searchText?: string;
}) => {
  return useQuery({
    queryKey: QUERY_KEYS.junior.collaborations.roleTasks(params),
    queryFn: () => getJuniorCollaborationRoleTasks(params),
    enabled: !!params.collaborationId,
  });
};

export const useJuniorRoleTaskDetails = (id: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.junior.collaborations.roleTaskDetail(id),
    queryFn: () => getJuniorRoleTaskDetails(id),
    enabled: !!id,
  });
};

// --- Mutation Hooks ---

export const useJoinCollaborationRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      input: Parameters<typeof postJoinCollaborationRole>[0]
    ) => {
      const res = await postJoinCollaborationRole(input);
      if (!res.success) {
        throw new Error(res.error);
      }
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.junior.collaborations.list,
      });
      queryClient.invalidateQueries({
        predicate: (query) => {
          return (
            query.queryKey[0] === "junior" &&
            query.queryKey[1] === "collaborations" &&
            query.queryKey[2] === "roles"
          );
        },
      });
    },
  });
};

interface SubmitJuniorTaskInput {
  id: number;
  projectLink?: string;
  additionalNotes?: string;
  file?: File;
}

export const useSubmitJuniorTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: SubmitJuniorTaskInput) => {
      if (input.file) {
        // File upload requires API route (FormData can't be serialized through Server Actions)
        const params = new URLSearchParams();
        params.append("Id", String(input.id));
        if (input.projectLink) params.append("ProjectLink", input.projectLink);
        if (input.additionalNotes)
          params.append("AdditionalNotes", input.additionalNotes);

        const fileFormData = new FormData();
        fileFormData.append("File", input.file);

        const response = await fetch(
          `/api/junior-collaboration/submit-task?${params.toString()}`,
          { method: "PUT", body: fileFormData }
        );

        if (!response.ok) {
          throw new Error(`Failed to submit task: ${response.statusText}`);
        }

        return response.json();
      }

      // No file — use the server action with customFetch
      return submitJuniorTask({
        id: input.id,
        projectLink: input.projectLink,
        additionalNotes: input.additionalNotes,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["junior", "collaborations", "role-tasks"],
      });
      queryClient.invalidateQueries({
        queryKey: ["junior", "collaborations", "role-task-detail"],
      });
    },
  });
};

export const useChangeJuniorTaskStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: changeJuniorTaskStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["junior", "collaborations", "role-tasks"],
      });
      queryClient.invalidateQueries({
        queryKey: ["junior", "collaborations", "role-task-detail"],
      });
    },
  });
};
