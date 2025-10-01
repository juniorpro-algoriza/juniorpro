"use server";

import { normalizeProject } from "@utils";
import { NormalizedProject } from "../types/Projects";
import { Project } from "next/dist/build/swc/types";
import { getData } from "./getData";

interface getContributorJuniorProjectsParams {
  categoryId?: number;
  projectManagerId?: number;
  projectType?: number; // 1, 2, or 3
  pageNumber?: number;
  pageSize?: number;
  searchText?: string;
}

export async function getContributorJuniorProjects(
  params: getContributorJuniorProjectsParams = {}
): Promise<{ data: NormalizedProject[]; total: number }> {
  try {
    const json = await getData<{ data: Project[]; pg_total?: number }>({
      url: "contributor-dashboard/juniors-projects",
      method: "GET",
      dummyData: { data: [], pg_total: 0 },
    });

    const normalizedProjects = json.data.map((project) => normalizeProject(project));

    return {
      data: normalizedProjects,
      total: normalizedProjects.length,
    };
  } catch (error) {
    console.error("Error fetching contributor projects:", error);
    return { data: [], total: 0 };
  }
}
