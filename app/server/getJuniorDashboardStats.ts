"use server";

import { customFetch } from "@server/lib";

export async function getJuniorDashboardStats() {
  const stats = customFetch("/api/junior-dashboard/stats", {
    method: "get",
  });
  return stats;
}
