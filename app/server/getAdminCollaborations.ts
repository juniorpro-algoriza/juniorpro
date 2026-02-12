"use server";
import { customFetch } from "@server/lib";

export async function getAdminCollaborations(params: {
  PageNumber?: number;
  PageSize?: number;
  SearchText?: string;
}) {
  return await customFetch("/api/admin-collaboration", {
    method: "get",
    params,
  });
}
