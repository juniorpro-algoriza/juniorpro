"use server";

import { customFetch } from "@server/lib";

export async function rejectRoleTask(params: {
  id: number;
  actionReason?: string;
}): Promise<boolean | null> {
  const response = await customFetch(
    "/api/admin-collaboration/reject-role-task",
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
