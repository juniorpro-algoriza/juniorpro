"use server";

import { customFetch } from "@server/lib";

export async function deleteAdminChallenge(id: number) {
  const response = await customFetch("/api/admin-challenge/{id}", {
    method: "delete",
    path: { id },
  });

  return response;
}
