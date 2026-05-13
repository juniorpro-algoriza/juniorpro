"use server";

import { customFetch } from "@server/lib";

export async function rejectJuniorRole(params: {
  id: number;
  actionReason: string;
}) {
  const response = await customFetch(
    "/api/admin-collaboration/reject-junior-role",
    {
      method: "put",
      params: {
        Id: params.id,
        ActionReason: params.actionReason,
      },
    }
  );

  return response;
}
