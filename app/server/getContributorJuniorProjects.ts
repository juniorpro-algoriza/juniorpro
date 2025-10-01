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
    const { pageNumber = 1, pageSize = 10, categoryId, projectManagerId, projectType, searchText } = params;

    // Construct query string
    const queryParams = new URLSearchParams();
    queryParams.append("pageNumber", pageNumber.toString());
    queryParams.append("pageSize", pageSize.toString());
    if (categoryId) queryParams.append("categoryId", categoryId.toString());
    if (projectManagerId) queryParams.append("projectManagerId", projectManagerId.toString());
    if (projectType) queryParams.append("projectType", projectType.toString());
    if (searchText) queryParams.append("searchText", searchText);

    const json = await getData<{ data: Project[]; pg_total?: number }>({
      url: `contributor-dashboard/juniors-projects?${queryParams.toString()}`,
      method: "GET",
      dummyData: { data: [], pg_total: 0 },
    });

    const normalizedProjects = json.data.map((project) =>
      normalizeProject(project)
    );

    return {
      data: normalizedProjects,
      total: json.pg_total ?? normalizedProjects.length,
    };
  } catch (error) {
    console.error("Error fetching contributor projects:", error);
    return { data: [], total: 0 };
  }
}

