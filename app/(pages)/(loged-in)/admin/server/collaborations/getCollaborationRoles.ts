"use server";

import { customFetch } from "@server/lib";

export async function getCollaborationRoles(collaborationId: number) {
  const response = await customFetch("/api/admin-collaboration/roles", {
    method: "get",
    params: { Id: collaborationId },
  });

  return response;
}
