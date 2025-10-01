"use server";

import { normalizeProject } from "@utils";
import { NormalizedProject } from "../../../../types/Projects";

interface GetLandingProjectsParams {
  categoryId?: number;
  projectManagerId?: number;
  projectType?: number; // 1, 2, or 3
  pageNumber?: number;
  pageSize?: number;
  searchText?: string;
}

interface ApiResponse {
  status: number;
  data: unknown[];
  code: {
    value: string;
    code: number;
  };
}

export async function getLandingProjects(
  params: GetLandingProjectsParams = {}
): Promise<{ data: NormalizedProject[]; total: number }> {
  const {
    categoryId,
    projectManagerId,
    projectType,
    pageNumber = 1,
    pageSize = 10,
    searchText,
  } = params;

  try {
    const queryParams = new URLSearchParams();

    if (categoryId) queryParams.append("CategoryId", categoryId.toString());
    if (projectManagerId)
      queryParams.append("ProjectManagerId", projectManagerId.toString());
    if (projectType) queryParams.append("ProjectType", projectType.toString());
    if (pageNumber) queryParams.append("PageNumber", pageNumber.toString());
    if (pageSize) queryParams.append("PageSize", pageSize.toString());
    if (searchText) queryParams.append("SearchText", searchText);

    const url = `https://juniorpro-001-site1.ntempurl.com/api/landing-home-page/projects?${queryParams.toString()}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch landing projects: ${response.statusText}`
      );
    }

    const result: ApiResponse = await response.json();

    if (result.status !== 200 && result.status !== 0) {
      throw new Error(`API returned error status: ${result.status}`);
    }

    const normalizedProjects = result.data.map((project) =>
      normalizeProject(project)
    );

    return {
      data: normalizedProjects,
      total: normalizedProjects.length,
    };
  } catch (error) {
    console.error("Error fetching landing projects:", error);
    return {
      data: [],
      total: 0,
    };
  }
}
