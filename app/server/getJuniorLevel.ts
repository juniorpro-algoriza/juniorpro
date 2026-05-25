"use server";

import { customFetch } from "@server/lib";

export async function getJuniorLevel() {
  return customFetch("/api/junior-dashboard/level", {
    method: "get",
    graceful404: true,
  });
}
