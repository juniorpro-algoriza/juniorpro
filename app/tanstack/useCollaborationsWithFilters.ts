"use client";

import { useState, useEffect, useMemo } from "react";
import { useAdminCollaborations } from "./useAdminCollaborations";
import type { components } from "../../api-schema/schema";

type CollaborationStatus = "all" | "active" | "completed";
type Collaboration =
  components["schemas"]["Sawiha.Services.DTO.AdminCollaborationModels.GetAll.GetCollaborationListModel"];

interface CollaborationFilters {
  search: string;
  status: CollaborationStatus;
  pageNumber: number;
  pageSize: number;
}

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

    switch (filters.status) {
      case "active":
        return collaborations.filter(
          (collab: Collaboration) =>
            collab.status000 === 1 || collab.status000 === 2
        );
      case "completed":
        return collaborations.filter(
          (collab: Collaboration) =>
            collab.status000 === 3 || collab.status000 === 4
        );
      default:
        return collaborations;
    }
  }, [collaborationsData, filters.status]);

  // Get counts for tabs
  const tabCounts = useMemo(() => {
    if (!collaborationsData?.data) {
      return {
        all: 0,
        active: 0,
        completed: 0,
      };
    }

    const collaborations = collaborationsData.data;
    console.log("collaborations", collaborations);
    return {
      all: collaborations.length,
      active: collaborations.filter(
        (collab: Collaboration) =>
          collab.status000 === 1 || collab.status000 === 2
      ).length,
      completed: collaborations.filter(
        (collab: Collaboration) =>
          collab.status000 === 3 || collab.status000 === 4
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
