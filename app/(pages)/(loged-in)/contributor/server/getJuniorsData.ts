
// server/getJuniorsData.ts
"use server";

import { getData } from "@server";

export const getJuniorsData = async (
  contributorId: number,
  pageNumber = 1,
  pageSize = 10,
  searchText = ""
) => {
  // Use getData instead of fetch
  const json = await getData<{
    pageNumber: number;
    pageSize: number;
    pg_total: number;
    data: any[];
  }>({
    url: `Contributor/juniors?contributorId=${contributorId}&PageNumber=${pageNumber}&PageSize=${pageSize}&SearchText=${searchText}`,
    method: "GET",
    dummyData: { pageNumber, pageSize, pg_total: 0, data: [] },
  });

  return {
    data: json.data.map((junior: any) => ({
      ...junior,
      actionHref: `/admin/junior/${junior.id}`, // for action button
    })),
    total: json.pg_total ?? 0,
    pageNumber: json.pageNumber ?? pageNumber,
    pageSize: json.pageSize ?? pageSize,
  };
};
