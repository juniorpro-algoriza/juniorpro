"use server";

import { customFetch } from "@server/lib";

export async function getMissionsById({ id }: { id: number }) {
  const mission = customFetch("/learning-path-management/mission/{id}", {
    method: "get",
    path: {
      id,
    },
  });
  return mission;
}
