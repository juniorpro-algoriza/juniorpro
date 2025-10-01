"use server";

import { getData } from "@server";

interface GetJoinedProjectsParams {
  projectType?: 1 | 2 | 3;
  status?: 1 | 2 | 3 | 4;
  pageNumber?: number;
  pageSize?: number;
  searchText?: string;
}

export interface JoinedProject {
  id: number;
  image: string;
  projectNameAr: string;
  projectNameEn: string;
  status: 1 | 2 | 3 | 4;
  projectType: 1 | 2 | 3;
  categoryNameAr: string;
  categoryNameEn: string;
  modificationDate: string;
}

export interface JoinedProjectsResponse {
  status: number;
  data: JoinedProject[];
}

export const getJoinedProjects = async (
  params: GetJoinedProjectsParams = {}
): Promise<JoinedProjectsResponse> => {
  const {
    projectType,
    status,
    pageNumber = 1,
    pageSize = 10,
    searchText,
  } = params;

  try {
    const response = (await getData({
      url: "junior-dashboard/joined-projects",
      method: "GET",
      params: {
        ProjectType: projectType,
        Status: status,
        PageNumber: pageNumber,
        PageSize: pageSize,
        SearchText: searchText,
      },
    })) as JoinedProjectsResponse;

    return response;
  } catch (error) {
    console.error("Error fetching joined projects:", error);
    return { status: 0, data: [] };
  }
};