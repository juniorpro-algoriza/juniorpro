"use server";

import { customFetch } from "@server/lib";

export async function deleteCollaborationRole(id: number) {
  const response = await customFetch(
    "/api/admin-collaboration/delete-role/{id}",
    {
      method: "delete",
      path: { id },
    }
  );

  return response;
}
