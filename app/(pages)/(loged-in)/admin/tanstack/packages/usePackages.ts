"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getPackages,
  deletePackage,
  postPackages,
  putPackages,
  getPackageById,
} from "../../server";
import { PlanFormValues } from "../../subscription/_schema";
import { QUERY_KEYS } from "../../../../../configs/queryKeys";

export const usePackages = (
  params: { SearchText: string; DurationType: "month" | "year" },
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: QUERY_KEYS.admin.packages.all(params),
    queryFn: () => getPackages(params),
    enabled,
  });
};

export const usePackageById = (id: number, enabled: boolean = true) => {
  return useQuery({
    queryKey: QUERY_KEYS.admin.packages.byId(id),
    queryFn: () => getPackageById({ id }),
    enabled: !!id && enabled,
  });
};

export const useAddPackage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: PlanFormValues) => postPackages({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.admin.packages.list,
      });
    },
  });
};

export const useUpdatePackage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: PlanFormValues) => putPackages({ data }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.admin.packages.list,
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.admin.packages.byId(variables.id as number),
      });
    },
  });
};

export const useDeletePackage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePackage,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.admin.packages.list,
      });
    },
  });
};
