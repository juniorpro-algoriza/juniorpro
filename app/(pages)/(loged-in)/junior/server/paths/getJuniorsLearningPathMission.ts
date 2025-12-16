"use server";

import { customFetch } from "@server/lib";

export async function getJuniorsLearningPathMission({ 
  Id,
  PageNumber = 1,
  PageSize = 1000,
  SearchText
}: { 
  Id?: number;
  PageNumber?: number;
  PageSize?: number;
  SearchText?: string 
}) {
  const missions = await customFetch("/learning-path-management/mission", {
    method: "get",
    params: {
      Id,
      PageNumber,
      PageSize,
      SearchText,
    },
  });
  return missions;
}
