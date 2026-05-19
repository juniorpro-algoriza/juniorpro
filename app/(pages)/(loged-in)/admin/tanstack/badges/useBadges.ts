"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteBadge,
  getBadgeById,
  getBadges,
  postBadge,
  putBadge,
} from "../../server";
import { QUERY_KEYS } from "../../../../../configs/queryKeys";
import { components } from "../../../../../../api-schema";

type BadgeType =
  components["schemas"]["Sawiha.CrossCutting.Model.Entities.BadgeFeature.BadgeType"];

export const useBadges = (params: {
  Type?: BadgeType;
  SearchText?: string;
  PageNumber?: number;
  PageSize?: number;
}) => {
  return useQuery({
    queryKey: QUERY_KEYS.admin.badges.all(params),
    queryFn: () => getBadges(params),
  });
};

export const useBadgeById = (id: number, enabled: boolean = true) => {
  return useQuery({
    queryKey: QUERY_KEYS.admin.badges.byId(id),
    queryFn: () => getBadgeById({ id }),
    enabled: !!id && enabled,
  });
};

export const useAddBadge = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FormData) => postBadge(data),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: QUERY_KEYS.admin.badges.list,
        exact: false,
      });
    },
  });
};

export const useUpdateBadge = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FormData) => putBadge(data),
    onSuccess: (_, variables) => {
      const id = Number(variables.get("Id"));

      queryClient.refetchQueries({
        queryKey: QUERY_KEYS.admin.badges.list,
        exact: false,
      });

      if (id) {
        queryClient.refetchQueries({
          queryKey: QUERY_KEYS.admin.badges.byId(id),
        });
      }
    },
  });
};

export const useDeleteBadge = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBadge,
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: QUERY_KEYS.admin.badges.list,
        exact: false,
      });
    },
  });
};
