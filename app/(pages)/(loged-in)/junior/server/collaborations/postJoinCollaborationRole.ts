"use server";

import { customFetch } from "@server/lib";

interface JoinCollaborationRoleParams {
  roleId: number;
  joiningReason?: string;
}

export async function postJoinCollaborationRole(
  params: JoinCollaborationRoleParams
) {
  try {
    const response = await customFetch("/api/junior-collaboration/join-role", {
      method: "post",
      params: {
        RoleId: params.roleId,
        JoiningReason: params.joiningReason,
      },
    });

    return { success: true, data: response };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
