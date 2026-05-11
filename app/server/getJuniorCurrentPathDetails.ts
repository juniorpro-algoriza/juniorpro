"use server";

import { customFetch } from "@server/lib";

export async function getJuniorCurrentPathDetails() {
  const currentPathDetails = customFetch(
    "/api/junior-dashboard/current-path-details",
    {
      method: "get",
    }
  );
  return currentPathDetails;
}
