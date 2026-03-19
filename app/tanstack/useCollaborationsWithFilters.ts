"use client";

import { useState, useEffect, useMemo } from "react";
import { useAdminCollaborations } from "./useAdminCollaborations";
import type { components } from "../../api-schema/schema";

// Matches backend CollaborationStatus enum: Draft=1, Ready=2, Inprogress=3, Completed=4
type CollaborationStatus =
  | "all"
  | "draft"
  | "ready"
  | "inprogress"
  | "completed";
type Collaboration =
  components["schemas"]["Sawiha.Services.DTO.AdminCollaborationModels.GetAll.GetCollaborationListModel"];

interface CollaborationFilters {
  search: string;
  status: CollaborationStatus;
  pageNumber: number;
  pageSize: number;
}

// Map status string to backend CollaborationStatus enum value
const STATUS_TO_ENUM: Record<CollaborationStatus, number | null> = {
  all: null,
  draft: 1,
  ready: 2,
  inprogress: 3,
  completed: 4,
};

export const useCollaborationsWithFilters = () => {
  const [filters, setFilters] = useState<CollaborationFilters>({
    search: "",
    status: "all",
    pageNumber: 1,
    pageSize: 12,
  });

  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(filters.search);
    }, 300);

    return () => clearTimeout(timer);
  }, [filters.search]);

  // Build query params based on filters
  const queryParams = useMemo(() => {
    const params: {
      PageNumber?: number;
      PageSize?: number;
      SearchText?: string;
    } = {
      PageNumber: filters.pageNumber,
      PageSize: filters.pageSize,
    };

    if (debouncedSearch.trim()) {
      params.SearchText = debouncedSearch.trim();
    }

    return params;
  }, [debouncedSearch, filters.pageNumber, filters.pageSize]);

  // Fetch collaborations data
  const {
    data: collaborationsData,
    isLoading,
    error,
    refetch,
  } = useAdminCollaborations(queryParams);

  // Filter collaborations by status
  const filteredCollaborations = useMemo(() => {
    if (!collaborationsData?.data) return [];

    const collaborations = collaborationsData.data;
    const enumValue = STATUS_TO_ENUM[filters.status];

    if (enumValue === null) return collaborations;
    return collaborations.filter(
      (collab: Collaboration) => collab.status === enumValue
    );
  }, [collaborationsData, filters.status]);

  // Get counts for tabs
  const tabCounts = useMemo(() => {
    if (!collaborationsData?.data) {
      return { all: 0, draft: 0, ready: 0, inprogress: 0, completed: 0 };
    }

    const collaborations = collaborationsData.data;
    return {
      all: collaborations.length,
      draft: collaborations.filter(
        (collab: Collaboration) => collab.status === 1
      ).length,
      ready: collaborations.filter(
        (collab: Collaboration) => collab.status === 2
      ).length,
      inprogress: collaborations.filter(
        (collab: Collaboration) => collab.status === 3
      ).length,
      completed: collaborations.filter(
        (collab: Collaboration) => collab.status === 4
      ).length,
    };
  }, [collaborationsData]);

  const updateFilters = (newFilters: Partial<CollaborationFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      status: "all",
      pageNumber: 1,
      pageSize: 12,
    });
  };

  return {
    collaborations: filteredCollaborations,
    isLoading,
    error,
    filters,
    tabCounts,
    updateFilters,
    resetFilters,
    refetch,
    totalCount: collaborationsData?.data?.length || 0,
    hasMore: collaborationsData?.data?.length === filters.pageSize,
  };
};
