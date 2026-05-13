"use server";

import { customFetch } from "@server/lib";

export async function getJuniorCurrentPathDetails() {
  return customFetch("/api/junior-dashboard/current-path-details", {
    method: "get",
    graceful404: true,
  });
}
