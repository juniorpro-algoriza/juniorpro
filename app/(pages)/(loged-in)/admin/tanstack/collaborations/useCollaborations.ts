"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../../../configs/queryKeys";
import {
  createAdminCollaboration,
  updateAdminCollaboration,
  addCollaborationRole,
  getCollaborationRoles,
  updateCollaborationRole,
  deleteCollaborationRole,
  getCollaborationById,
  getCollaborationRoleTasks,
  addCollaborationRoleTask,
  updateCollaborationRoleTask,
  getRoleAssignedJuniors,
  getJuniorRoleRequests,
  acceptJuniorRole,
  rejectJuniorRole,
  getCollaborationRoleTaskById,
  acceptRoleTask,
  rejectRoleTask,
  deleteCollaborationRoleTask,
  makeCollaborationReady,
} from "../../server/collaborations";
import { components } from "../../../../../../api-schema";

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

export const useGetCollaborationById = (id: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.admin.collaborations.detail(id),
    queryFn: () => getCollaborationById(id),
    enabled: !!id,
  });
};

export const useGetCollaborationRoleTasks = (params: {
  collaborationId: number;
  roleId?: number;
  juniorId?: number;
  status?: components["schemas"]["Sawiha.CrossCutting.Model.Entities.CollaborationsFeatures.CollaborationRoleTaskStatus"];
  pageNumber: number;
  pageSize: number;
  searchText?: string;
}) => {
  return useQuery({
    queryKey: QUERY_KEYS.admin.collaborations.roleTasks(params),
    queryFn: () => getCollaborationRoleTasks(params),
    enabled: !!params.collaborationId,
  });
};

export const useAddCollaborationRoleTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addCollaborationRoleTask,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin", "collaborations", "role-tasks"],
      });
    },
  });
};

export const useUpdateCollaborationRoleTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCollaborationRoleTask,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin", "collaborations", "role-tasks"],
      });
    },
  });
};

export const useGetRoleAssignedJuniors = (params: {
  collaborationId: number;
  roleId?: number;
}) => {
  return useQuery({
    queryKey: QUERY_KEYS.admin.collaborations.roleAssignedJuniors(
      params.roleId || 0
    ),
    queryFn: () => getRoleAssignedJuniors(params),
    enabled: !!params.collaborationId,
  });
};

export const useGetJuniorRoleRequests = (params: {
  collaborationId: number;
  roleId?: number;
  status?: components["schemas"]["Sawiha.CrossCutting.Model.Entities.CollaborationsFeatures.CollaborationRoleJuniorStatus"];
  pageNumber?: number;
  pageSize?: number;
  searchText?: string;
}) => {
  return useQuery({
    queryKey: ["admin", "collaborations", "junior-role-requests", params],
    queryFn: () => getJuniorRoleRequests(params),
    enabled: !!params.collaborationId,
  });
};

export const useAcceptJuniorRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: acceptJuniorRole,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin", "collaborations", "junior-role-requests"],
      });
      queryClient.invalidateQueries({
        queryKey: ["admin", "collaborations", "detail"],
      });
    },
  });
};

export const useRejectJuniorRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: rejectJuniorRole,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin", "collaborations", "junior-role-requests"],
      });
    },
  });
};

export const useGetCollaborationRoleTaskById = (id: number) => {
  return useQuery({
    queryKey: ["admin", "collaborations", "role-task-details", id],
    queryFn: () => getCollaborationRoleTaskById(id),
    enabled: !!id,
  });
};

export const useAcceptRoleTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: acceptRoleTask,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin", "collaborations", "role-tasks"],
      });
      queryClient.invalidateQueries({
        queryKey: ["admin", "collaborations", "role-task-details"],
      });
      queryClient.invalidateQueries({
        queryKey: ["admin", "collaborations", "detail"],
      });
    },
  });
};

export const useRejectRoleTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: rejectRoleTask,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin", "collaborations", "role-tasks"],
      });
      queryClient.invalidateQueries({
        queryKey: ["admin", "collaborations", "role-task-details"],
      });
    },
  });
};

export const useDeleteCollaborationRoleTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCollaborationRoleTask,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin", "collaborations", "role-tasks"],
      });
      queryClient.invalidateQueries({
        queryKey: ["admin", "collaborations", "role-task-details"],
      });
    },
  });
};

export const useMakeCollaborationReady = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: makeCollaborationReady,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.admin.collaborations.list,
      });
      queryClient.invalidateQueries({
        queryKey: ["admin", "collaborations", "detail"],
      });
    },
  });
};
