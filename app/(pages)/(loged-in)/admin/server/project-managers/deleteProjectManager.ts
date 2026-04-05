"use server";

import { customFetch } from "@server/lib";

export async function deleteProjectManager(id: number) {
  const response = await customFetch("/api/project-manager/delete/{id}", {
    method: "delete",
    path: { id },
  });

  return response;
}
