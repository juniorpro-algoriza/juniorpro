"use client";

import React from "react";
import { PathCard } from "@components/client";
import { useLearningPaths } from "../../tanstack/paths/useLearningPaths";
import { PATH_ICON, PATH_STATUS } from "../../../../../configs";
import { components } from "../../../../../../api-schema";
import { Skeleton } from "@components";

export const PathsList = ({ searchText }: { searchText: string }) => {
  const { data: getLearningPathsResponse, isLoading } = useLearningPaths({
    SearchText: searchText,
  });

  const paths =
    getLearningPathsResponse?.data?.map(
      (
        path: components["schemas"]["Sawiha.Services.DTO.PathModels.GetLearningPathListModel"]
      ) => ({
        id: path.id || 0,
        image: PATH_ICON[String(path.icon) as keyof typeof PATH_ICON],
        title: path.nameEn || path.nameAr || "Untitled Path",
        description: path.description || "No description available",
        missions: path.missionsCount || 0,
        xp: path.totalXP || 0,
        points: path.totalPoints || 0,
        status: path.status || PATH_STATUS.Draft,
      })
    ) || [];

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 gap-5">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-48 w-full rounded-2xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-5">
      {paths?.map((path) => (
        <PathCard
          key={path.id}
          path={path}
          userType="admin"
          cardLink={`/admin/paths/${path.id}`}
        />
      ))}
      {paths?.length === 0 && <p className="text-gray-600">No paths found.</p>}
    </div>
  );
};
