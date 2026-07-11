"use server";

import { customFetch } from "@server/lib";

export async function getJuniorsProjects(params?: {
  PageNumber?: number;
  PageSize?: number;
  SearchText?: string;
}) {
  const projects = customFetch("/api/Enabler-dashboard/juniors-projects", {
    method: "get",
    params: {
      PageNumber: params?.PageNumber ?? 1,
      PageSize: params?.PageSize ?? 10,
      SearchText: params?.SearchText,
    },
  });
  return projects;
}
