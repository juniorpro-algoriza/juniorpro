"use server";

import { customFetch } from "@server/lib";

export async function confirmGuidance() {
  const result = await customFetch("/api/junior/confirm-guidance", {
    method: "put",
  });
  return result;
}
