"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getLevels,
  getLevelById,
  postLevel,
  putLevel,
  getLastLevel,
} from "../../server";

export const useLevels = (params: {
  SearchText?: string;
  PageNumber?: number;
  PageSize?: number;
}) => {
  return useQuery({
    queryKey: ["admin", "levels", params],
    queryFn: () => getLevels(params),
  });
};

export const useLevelById = (id: number, enabled: boolean = true) => {
  return useQuery({
    queryKey: ["admin", "levels", "byId", id],
    queryFn: () => getLevelById({ id }),
    enabled: !!id && enabled,
  });
};

export const useLastLevel = () => {
  return useQuery({
    queryKey: ["admin", "levels", "last-level"],
    queryFn: () => getLastLevel(),
  });
};

export const useAddLevel = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: FormData) => postLevel(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "levels"] });
    },
  });
};

export const useUpdateLevel = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: FormData) => putLevel(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "levels"] });
    },
  });
};
