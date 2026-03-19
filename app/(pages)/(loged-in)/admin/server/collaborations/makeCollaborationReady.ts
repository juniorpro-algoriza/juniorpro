"use server";

import { customFetch } from "@server/lib";

export async function makeCollaborationReady(id: number): Promise<boolean> {
  const response = await customFetch(
    "/api/admin-collaboration/make-collaboration-ready/{id}",
    {
      method: "put",
      path: { id },
    }
  );

  return response;
}
