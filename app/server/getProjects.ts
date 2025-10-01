"use server";

import { normalizeProject } from "@utils";
import type { Project } from "@types";
import type { NormalizedProject } from "../types/Projects";
import { getData } from "./getData";

export async function getProjects({
  limit,
  pageNum,
  projectType,
}: {
  limit: number;
  pageNum: number;
  projectType?: string | number; // can be string like "Team" or number
}): Promise<{ data: NormalizedProject[]; hasNextPage: boolean; total: number }> {
  const json = await getData<{
    data: Project[];
    pg_total?: number;
  }>({
    url: "project",
    method: "GET",
    params: {
      PageSize: limit,
      PageNumber: pageNum,
      ProjectType: projectType,
    },
    dummyData: { data: [], pg_total: 0 },
  });

  const totalProjects = json.pg_total || (json.data?.length || 0);

  return {
    data: (json.data || []).map(normalizeProject),
    hasNextPage: totalProjects > pageNum * limit,
    total: totalProjects,
  };
}
