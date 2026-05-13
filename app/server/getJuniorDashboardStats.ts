"use server";

import { customFetch } from "@server/lib";

export async function getJuniorDashboardStats() {
  return customFetch("/api/junior-dashboard/stats", {
    method: "get",
    graceful404: true,
  });
}
