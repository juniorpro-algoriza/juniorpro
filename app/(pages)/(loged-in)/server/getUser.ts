"use server";

import { getData } from "@server";
import { UserType } from "../../../config/userConfig";

// Define proper types
type ApiUser = {
  id?: number;
  name?: string;
  email?: string;
  status?: string;
  isVerified?: boolean;
  projectsCount?: number;
  practiceContentsCount?: number;
  contributorsCount?: number;
  juniorsCount?: number;
  wallet?: number;
  points?: number;
  contributorName?: string;
  projects?: number;
  completedProjects?: number;
  joiningDate?: string;
  password?: string;
};

type TransformedUser = {
  id: number | undefined;
  name: string | number;
  email: string | number;
  status: string;
  isVerified?: boolean;
  projects: string | number;
  practiceContent: string | number;
  contributors: string | number;
  juniorsCount: string | number;
  wallet: string | number;
  points: string | number;
  contributorName: string | number;
  activeProjects: string | number;
  completedProjects: string | number;
  joinedOn: string | number;
};

// Helper function to format values or return fallback
const formatValue = (
  value: string | number | null | undefined,
  fallback: string = "-"
): string | number => {
  if (value === null || value === undefined || value === "") {
    return fallback;
  }
  return value;
};

// Helper function to determine status for juniors based on isVerified
const getJuniorStatus = (isVerified: boolean | undefined): string => {
  if (isVerified === undefined || isVerified === null) {
    return "not verified";
  }
  return isVerified ? "verified" : "not verified";
};

export const getUserData = async (
  type: UserType,
  pageNumber = 1,
  pageSize = 10,
  searchText?: string
) => {
  const json = await getData<{
    pageNumber: number;
    pageSize: number;
    pg_total: number;
    data: ApiUser[];
  }>({
    url: `${type}/get-all`,
    method: "GET",
    params: {
      pageNumber: pageNumber,
      pageSize: pageSize,
      ...(searchText && { searchText: searchText }),
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
      json?.data?.map((u: ApiUser): TransformedUser => {
        // Determine status based on user type
        let status = "pending";
        if (type === "junior" || type === "junior-contributor") {
          // For juniors, use isVerified field
          status = getJuniorStatus(u?.isVerified);
        } else {
          // For other types, use status field
          status = u?.status || "pending";
        }

        return {
          id: u?.id,
          name: formatValue(u?.name, "-"),
          email: formatValue(u?.email, "-"),
          status: status,
          isVerified: u?.isVerified,
          // Project Manager fields
          projects: formatValue(u?.projectsCount, "0"),
          practiceContent: formatValue(u?.practiceContentsCount, "0"),
          contributors: formatValue(u?.contributorsCount, "0"),
          // Contributor fields
          juniorsCount: formatValue(u?.juniorsCount, "0"),
          wallet: formatValue(u?.wallet, "0"),
          points: formatValue(u?.points, "0"),
          // Junior fields
          contributorName: formatValue(u?.contributorName, "-"),
          activeProjects: formatValue(u?.projects, "0"),
          completedProjects: formatValue(u?.completedProjects, "0"),
          // Date field
          joinedOn: formatValue(u?.joiningDate, "-"),
        };
      }) ?? [],
  };
};

export const getUserDetails = async (type: UserType, id: number) => {
  const rawData = await getData<ApiUser>({
    url: `${type}/details/${id}`,
    method: "GET",
    dummyData: undefined,
  });

  // Determine status based on user type
  let status = "pending";
  if (type === "junior" || type === "junior-contributor") {
    status = getJuniorStatus(rawData?.isVerified);
  } else {
    status = rawData?.status || "pending";
  }

  return {
    id: rawData?.id,
    name: formatValue(rawData?.name, "-"),
    email: formatValue(rawData?.email, "-"),
    status: status,
    isVerified: rawData?.isVerified,
    projects: formatValue(rawData?.projectsCount, "0"),
    practiceContent: formatValue(rawData?.practiceContentsCount, "0"),
    contributors: formatValue(rawData?.contributorsCount, "0"),
    juniorsCount: formatValue(rawData?.juniorsCount, "0"),
    password: rawData?.password,
    joinedOn: formatValue(rawData?.joiningDate, "-"),
    wallet: formatValue(rawData?.wallet, "0"),
    points: formatValue(rawData?.points, "0"),
    contributorName: formatValue(rawData?.contributorName, "-"),
  };
};
