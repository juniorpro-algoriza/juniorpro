"use server";

import { customFetch } from "@server/lib";
import { components } from "../../../../../api-schema";

type AddCollaborationModel =
  components["schemas"]["Sawiha.Services.DTO.AdminCollaborationModels.Add.AddCollaborationModel"];
type AddCollaborationRoleRequest =
  components["schemas"]["Sawiha.Services.DTO.CollaborationRoleModels.Add.AddCollaborationRoleRequest"];
type GetCollaborationDetailsModel =
  components["schemas"]["Sawiha.Services.DTO.AdminCollaborationModels.GetById.GetCollaborationDetailsModel"];

export async function createAdminCollaboration(data: AddCollaborationModel) {
  const response = await customFetch("/api/admin-collaboration", {
    method: "post",
    data,
  });

  return response;
}

export async function updateAdminCollaboration(data: AddCollaborationModel) {
  const response = await customFetch("/api/admin-collaboration", {
    method: "put",
    data,
  });

  return response;
}

export async function getCollaborationById(
  id: number
): Promise<GetCollaborationDetailsModel | null> {
  const response = await customFetch("/api/admin-collaboration/{id}", {
    method: "get",
    path: { id },
  });

  return response;
}

export async function addCollaborationRole(data: AddCollaborationRoleRequest) {
  const response = await customFetch("/api/admin-collaboration/add-role", {
    method: "post",
    data,
  });

  return response;
}

export async function getCollaborationRoles(collaborationId: number) {
  const response = await customFetch("/api/admin-collaboration/roles", {
    method: "get",
    params: { Id: collaborationId },
  });

  return response;
}

export async function updateCollaborationRole(
  data: AddCollaborationRoleRequest
) {
  const response = await customFetch("/api/admin-collaboration/update-role", {
    method: "put",
    data,
  });

  return response;
}

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
