"use server";

import { customFetch } from "@server/lib";

export async function getJuniorsLearningPathCurrentMissionById({
  id,
}: {
  id: number;
}) {
  const mission = await customFetch(
    "/api/junior-learning-path/current/mission/{id}",
    {
      method: "get",
      path: {
        id,
      },
    }
  );
  return mission;
}
