"use server";

import { customFetch } from "@server/lib";

interface JoinCollaborationRoleParams {
  roleId: number;
  joiningReason?: string;
}

export async function postJoinCollaborationRole(
  params: JoinCollaborationRoleParams
) {
  const response = await customFetch("/api/junior-collaboration/join-role", {
    method: "post",
    params: {
      RoleId: params.roleId,
      JoiningReason: params.joiningReason,
    },
  });

  return response;
}
