"use server";

import { customFetch } from "@server/lib";

export async function getJuniorsLearningPathCurrentMission({
  PageNumber = 1,
  PageSize = 1000,
  SearchText,
  Id,
}: {
  PageNumber?: number;
  PageSize?: number;
  SearchText?: string;
  Id?: number;
}) {
  const currentMission = await customFetch(
    "/junior-learning-path/current/mission",
    {
      method: "get",
      params: {
        Id,
        PageNumber,
        PageSize,
        SearchText,
      },
    }
  );
  return currentMission;
}
