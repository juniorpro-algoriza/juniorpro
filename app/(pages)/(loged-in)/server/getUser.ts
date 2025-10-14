/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getData } from "@server";
import { UserType } from "../../../config/userConfig";

export const getUserData = async (
  type: UserType,
  pageNumber = 1,
  pageSize = 10,
  searchText?: string // ← Add search parameter
) => {
  const json = await getData<{
    pageNumber: number;
    pageSize: number;
    pg_total: number;
    data: unknown[];
  }>({
    url: `${type}/get-all`, // ← Keep the working URL!
    method: "GET",
    params: {
      pageNumber: pageNumber,
      pageSize: pageSize,
      ...(searchText && { searchText: searchText }), // ← Add search if exists
    },
    dummyData: {
      pageNumber: 1,
      pageSize: pageSize,
      pg_total: 0,
      data: [],
    },
  });

  return {
    total: json?.pg_total ?? 0,
    pageNumber: json?.pageNumber ?? pageNumber,
    pageSize: json?.pageSize ?? pageSize,
    data:
      json?.data?.map((u: any) => ({
        id: u?.id,
        name: u?.name,
        email: u?.email,
        status: u?.status || "pending",
        projects: u?.projectsCount,
        practiceContent: u?.practiceContentsCount,
        contributors: u?.contributorsCount,
        juniorsCount: u?.juniorsCount,
        joinedOn: u?.joiningDate,
      })) ?? [],
  };
};

export const getUserDetails = async (type: UserType, id: number) => {
  const rawData = await getData<any>({
    url: `${type}/details/${id}`,
    method: "GET",
    dummyData: null,
  });

  return {
    id: rawData?.id,
    name: rawData?.name,
    email: rawData?.email,
    status: rawData?.status || "pending",
    projects: rawData?.projectsCount,
    practiceContent: rawData?.practiceContentsCount,
    contributors: rawData?.contributorsCount,
    juniorsCount: rawData?.juniorsCount,
    password: rawData?.password,
    joinedOn: rawData?.joiningDate,
  };
};
