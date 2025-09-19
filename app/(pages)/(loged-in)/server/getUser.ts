/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";
import { getData } from "@server";
import { UserType } from "../types/UserType";

const API_BASE = "https://juniorpro-001-site1.ntempurl.com/api";

export const getUserData = async (
  type: UserType,
  pageNumber = 1,
  pageSize = 10
) => {
  const json = await getData({
    url: `${type}/get-all?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    method: "GET",
    dummyData: [],
  });

  return {
    total: json?.pg_total ?? 0,
    pageNumber: json?.pageNumber ?? 1,
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
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  if (!token) throw new Error("Unauthorized: No auth token");

  const res = await fetch(`${API_BASE}/${type}/details/${id}`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  // if (!res.ok) throw new Error(`Failed to fetch ${type} details for id ${id}`);
  const u = await res.json();

  return {
    id: u?.id,
    name: u?.name,
    email: u?.email,
    status: u?.status || "pending",
    projects: u?.projectsCount,
    practiceContent: u?.practiceContentsCount,
    contributors: u?.contributorsCount,
    juniorsCount: u?.juniorsCount,
    password: u?.password,
    joinedOn: u?.joiningDate,
  };
};
