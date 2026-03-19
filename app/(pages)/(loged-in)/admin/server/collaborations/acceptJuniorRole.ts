"use server";

import { customFetch } from "@server/lib";

export async function acceptJuniorRole(id: number): Promise<boolean> {
  const response = await customFetch(
    "/api/admin-collaboration/accept-junior-role",
    {
      method: "put",
      params: { id },
    }
  );

  return response;
}
