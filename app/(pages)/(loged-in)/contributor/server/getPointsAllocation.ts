"use server";

import { customFetch } from "@server/lib";

export async function getPointsAllocation() {
  const pointsAllocation = customFetch(
    "/api/Enabler-dashboard/points-allocation",
    {
      method: "get",
    }
  );
  return pointsAllocation;
}
