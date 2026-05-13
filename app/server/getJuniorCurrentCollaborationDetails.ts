"use server";

import { customFetch } from "@server/lib";

export async function getJuniorCurrentCollaborationDetails() {
  return customFetch("/api/junior-dashboard/current-collaboration-details", {
    method: "get",
    graceful404: true,
  });
}
