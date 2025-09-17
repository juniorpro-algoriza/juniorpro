/* eslint-disable @typescript-eslint/no-explicit-any */
// app/server/projectManager.ts
"use server";

import { cookies } from "next/headers";
import type { ProjectManager } from "../types/ProjectManager";
import { getData } from "@server";

const API_BASE = "https://juniorpro-001-site1.ntempurl.com/api";

export const getProjectManagerData = async (): Promise<ProjectManager[]> => {
  const json = await getData({
    url: "project-manager/get-all",
    method: "GET",
    dummyData: [],
  });

  return json.data.map((pm: any) => ({
    id: pm.id,
    name: pm.name,
    email: pm.email,
    status: pm.status || "pending",
    projects: pm.projectsCount,
    practiceContent: pm.practiceContentsCount,
    contributors: pm.contributorsCount,
    joinedOn: pm.joiningDate,
  }));
};

export const getProjectManagerDetails = async (
  id: number
): Promise<ProjectManager> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) throw new Error("Unauthorized: No auth token found in cookies");

  const res = await fetch(`${API_BASE}/project-manager/details/${id}`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok)
    throw new Error(`Failed to fetch project manager details for id ${id}`);

  const pm = await res.json();

  return {
    id: pm.id,
    name: pm.name,
    email: pm.email,
    status: pm.status || "pending",
    projects: pm.projectsCount,
    practiceContent: pm.practiceContentsCount,
    juniorsCount: pm.juniorsCount,
    contributors: pm.contributorsCount,
    joinedOn: pm.joiningDate,
  };
};
