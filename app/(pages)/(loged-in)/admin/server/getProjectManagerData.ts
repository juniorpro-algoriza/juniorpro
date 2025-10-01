"use server";

import { getData } from "@server";

export const getProjectManagerJuniors = async (
  projectManagerId: number,
  pageNumber = 1,
  pageSize = 10
) => {
  const res = (await getData({
    url: `project-manager/juniors?pageNumber=${pageNumber}&pageSize=${pageSize}&ProjectManagerId=${projectManagerId}`,
    method: "GET",
    dummyData: [],
  })) as { data?: unknown[] };
  return res?.data || [];
};

export const getProjectManagerContributors = async (
  projectManagerId: number,
  pageNumber = 1,
  pageSize = 10
) => {
  const res = (await getData({
    url: `project-manager/contributors?pageNumber=${pageNumber}&pageSize=${pageSize}&ProjectManagerId=${projectManagerId}`,
    method: "GET",
    dummyData: [],
  })) as { data?: unknown[] };
  return res?.data || [];
};

export const getProjectManagerProjects = async (
  projectManagerId: number,
  pageNumber = 1,
  pageSize = 10
) => {
  const res = (await getData({
    url: `project-manager/projects?pageNumber=${pageNumber}&pageSize=${pageSize}&ProjectManagerId=${projectManagerId}`,
    method: "GET",
    dummyData: [],
  })) as { data?: unknown[] };
  return res?.data || [];
};

export const getProjectManagerPracticeZone = async (
  projectManagerId: number,
  pageNumber = 1,
  pageSize = 10
) => {
  const res = (await getData({
    url: `project-manager/practice-zone-projects?pageNumber=${pageNumber}&pageSize=${pageSize}&ProjectManagerId=${projectManagerId}`,
    method: "GET",
    dummyData: [],
  })) as { data?: unknown[] };
  return res?.data || [];
};
