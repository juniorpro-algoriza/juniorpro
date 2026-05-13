"use server";

import { customFetch } from "@server/lib";
import { components } from "../../../../../../api-schema";

type TaskStatus =
  components["schemas"]["Sawiha.CrossCutting.Model.Entities.CollaborationsFeatures.CollaborationRoleTaskStatus"];

export async function changeJuniorTaskStatus(params: {
  id: number;
  status: TaskStatus;
}) {
  const response = await customFetch(
    "/api/junior-collaboration/change-task-status",
    {
      method: "put",
      params: {
        Id: params.id,
        Status: params.status,
      },
    }
  );

  return response;
}
