"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../../configs/queryKeys";
import {
  createAdminCollaboration,
  updateAdminCollaboration,
  addCollaborationRole,
  getCollaborationRoles,
  updateCollaborationRole,
  deleteCollaborationRole,
} from "../server/collaboration";

export const useCreateAdminCollaboration = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAdminCollaboration,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.admin.collaborations.list,
      });
    },
  });
};

export const useUpdateAdminCollaboration = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAdminCollaboration,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.admin.collaborations.list,
      });
    },
  });
};

export const useAddCollaborationRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addCollaborationRole,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.admin.collaborations.list,
      });
    },
  });
};

export const useGetCollaborationRoles = (collaborationId: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.admin.collaborations.roles(collaborationId),
    queryFn: () => getCollaborationRoles(collaborationId),
    enabled: !!collaborationId,
  });
};

export const useUpdateCollaborationRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCollaborationRole,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.admin.collaborations.list,
      });
      // Also invalidate roles queries for all collaborations
      queryClient.invalidateQueries({
        predicate: (query) => {
          return (
            query.queryKey[0] === "admin" &&
            query.queryKey[1] === "collaborations" &&
            query.queryKey[2] === "roles"
          );
        },
      });
    },
  });
};

export const useDeleteCollaborationRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCollaborationRole,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.admin.collaborations.list,
      });
      // Also invalidate roles queries for all collaborations
      queryClient.invalidateQueries({
        predicate: (query) => {
          return (
            query.queryKey[0] === "admin" &&
            query.queryKey[1] === "collaborations" &&
            query.queryKey[2] === "roles"
          );
        },
      });
    },
  });
};
