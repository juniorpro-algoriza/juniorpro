"use server";

import { customFetch } from "@server/lib";

export async function deleteCollaborationRoleTask(
  id: number
): Promise<boolean | null> {
  const response = await customFetch(
    "/api/admin-collaboration/delete-role-task/{id}",
    {
      method: "delete",
      path: { id },
    }
  );

  return response;
}
