"use client";

import React from "react";
import { useLevels } from "../../tanstack/levels/useLevels";
import { EmptyData, Skeleton } from "@components";
import { Layers } from "lucide-react";
import { LevelCard } from "./LevelCard";
import { components } from "../../../../../../api-schema";

type Level =
  components["schemas"]["Sawiha.Services.DTO.LevelFeatureModel.GetAll.GetAdminLevelModel"];

export const LevelsList = ({ searchText }: { searchText: string }) => {
  const { data: levelsResponse, isLoading } = useLevels({
    SearchText: searchText,
  });

  const levels = (levelsResponse?.data as Level[]) || [];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <Skeleton key={i} className="h-64 w-full rounded-3xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {levels?.map((level: Level) => (
        <LevelCard key={level.id} level={level} />
      ))}
      {levels?.length === 0 && (
        <div className="col-span-full">
          <EmptyData
            icon={<Layers className="size-6" />}
            title="No Levels Found"
            description={
              searchText
                ? "No levels found matching your search query."
                : "Levels will appear here once created."
            }
          />
        </div>
      )}
    </div>
  );
};
