"use server";

import { getData } from "@server";

export interface ContributorJunior {
  id: number;
  name: string;
  points: number;
  activeProjects: number;
  completedProjects: number;
  contributorAcceptanceStatus: number;
}

export interface ContributorJuniorsResponse {
  pageNumber: number;
  pageSize: number;
  pg_total: number;
  status: number;
  data: ContributorJunior[];
  isSucceeded: boolean;
}

export const getContributorJuniors = async ({
  projectManagerId,
  pageNumber = 1,
  pageSize = 10,
  searchText = "",
}: {
  projectManagerId: number;
  pageNumber?: number;
  pageSize?: number;
  searchText?: string;
}): Promise<ContributorJuniorsResponse> => {
  return await getData({
    url: `Contributor/juniors?ProjectManagerId=${projectManagerId}&PageNumber=${pageNumber}&PageSize=${pageSize}&SearchText=${encodeURIComponent(
      searchText
    )}`,
    method: "GET",
  });
};
