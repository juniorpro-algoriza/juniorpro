"use server";

import { customFetch } from "@server/lib";

export async function deleteMission({ id }: { id: number }) {
  const mission = customFetch("/learning-path-management/mission/{id}", {
    method: "delete",
    path: {
      id,
    },
  });
  return mission;
}
