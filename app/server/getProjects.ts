"use server";

import type { Project, ProjectStatus, ProjectType } from "../types";
import { getData } from "@server";

//backend types response
interface ApiProject {
  id: number | string;
  nameEn: string;
  nameAr: string;
  categoryNameAr: string;
  categoryNameEn: string;
  levelNameAr: string;
  levelNameEn: string;
  image?: string;
  status: number;
  projectType?: string;
  isFree?: boolean;
  dueDate?: string;
}

interface ApiProjectsResponse {
  status: number;
  data: ApiProject[];
  pageNumber: number;
  pageSize: number;
  pg_total: number;
  isSucceeded: boolean;
}

//prams & return types
type GetAllProjectsParams = {
  shouldIncludeProject?: (project: Project) => boolean;
  pageNum: number;
  limit: number;
  projectType: ProjectType;
  juniors?: string[];
  categoryId?: number;
  searchText?: string;
};

type ReturnType = {
  data: Project[];
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

// ==================
// Main Function
// ==================
export const getProjects = async ({
  shouldIncludeProject,
  pageNum,
  limit,
  projectType,
  juniors,
  categoryId,
  searchText,
}: GetAllProjectsParams): Promise<ReturnType> => {
  try {
    const queryParams = new URLSearchParams({
      PageNumber: pageNum.toString(),
      PageSize: limit.toString(),
    });

    if (categoryId) queryParams.append("CategoryId", categoryId.toString());
    if (searchText) queryParams.append("SearchText", searchText);

    const apiData: ApiProjectsResponse = await getData({
      url: `api/project?${queryParams.toString()}`,
      method: "GET",
      dummyData: {
        status: 200,
        data: dummyData,
        pageNumber: pageNum,
        pageSize: limit,
        pg_total: dummyData.length,
        isSucceeded: true,
      },
    });

    // Transform API projects → Project[]
    const transformedProjects: Project[] =
      apiData?.data?.map((p) => transformApiProject(p, juniors)) || [];

    const finalData = transformedProjects.filter((p) =>
      shouldIncludeProject ? shouldIncludeProject(p) : true
    );

    const totalPages = Math.ceil((apiData.pg_total ?? finalData.length) / limit);

    return {
      data: finalData,
      currentPage: apiData.pageNumber || pageNum,
      totalPages,
      hasNextPage: pageNum < totalPages,
      hasPrevPage: pageNum > 1,
    };
  } catch (err) {
    console.error("Error fetching projects:", err);

    // fallback to dummyData → transform
    const filteredData =
      projectType !== "all"
        ? dummyData.filter((p) => mapApiProjectTypeToLocal(p.projectType) === projectType)
        : dummyData;

    const startIndex = (pageNum - 1) * limit;
    const endIndex = startIndex + limit;

    return {
      data: filteredData
        .slice(startIndex, endIndex)
        .map((p) => transformApiProject(p, juniors)),
      currentPage: pageNum,
      totalPages: Math.ceil(filteredData.length / limit),
      hasNextPage: endIndex < filteredData.length,
      hasPrevPage: startIndex > 0,
    };
  }
};

//hel[rs to transform ApiProject to Project]
const transformApiProject = (p: ApiProject, juniors?: string[]): Project => ({
  id: p.id.toString(),
  title: p.nameEn,
  category: p.categoryNameEn,
  imageUrl: p.image || "/images/featued-Project-image.svg",
  description: p.levelNameEn,
  rating: 0,
  projectType: mapApiProjectTypeToLocal(p.projectType),
  isFree: p.isFree ?? false,
  status: mapApiStatusToLocal(p.status),
  dueDate: p.dueDate ? new Date(p.dueDate) : undefined,
  juniors: juniors || [],
});

const mapApiStatusToLocal = (status: number): ProjectStatus => {
  const map: Record<number, ProjectStatus> = {
    0: "not-started",
    1: "in-progress",
    2: "completed",
  };
  return map[status] || "not-started";
};

const mapApiProjectTypeToLocal = (apiType?: string): ProjectType => {
  const typeMap: Record<string, ProjectType> = {
    web: "web",
    solo: "solo",
    team: "team",
    coding: "coding",
  };
  return apiType ? typeMap[apiType.toLowerCase()] : "solo";
};

// dummy
const dummyData: ApiProject[] = [
  {
    id: 1,
    nameEn: "Frontend Landing Page",
    nameAr: "صفحة هبوط",
    categoryNameAr: "ويب",
    categoryNameEn: "Web",
    levelNameAr: "مبتدئ",
    levelNameEn: "Beginner",
    image: "/images/featued-Project-image.svg",
    status: 0,
    projectType: "web",
    isFree: true,
    dueDate: "2025-12-01",
  },
  {
    id: 2,
    nameEn: "Team Dashboard",
    nameAr: "لوحة تحكم الفريق",
    categoryNameAr: "تطوير",
    categoryNameEn: "Development",
    levelNameAr: "متوسط",
    levelNameEn: "Intermediate",
    image: "/images/featued-Project-image.svg",
    status: 1,
    projectType: "team",
    isFree: false,
    dueDate: "2025-11-15",
  },
  {
    id: 2,
    nameEn: "Team Dashboard",
    nameAr: "لوحة تحكم الفريق",
    categoryNameAr: "تطوير",
    categoryNameEn: "Development",
    levelNameAr: "متوسط",
    levelNameEn: "Intermediate",
    image: "/images/featued-Project-image.svg",
    status: 1,
    projectType: "team",
    isFree: false,
    dueDate: "2025-11-15",
  },
  {
    id: 2,
    nameEn: "Team Dashboard",
    nameAr: "لوحة تحكم الفريق",
    categoryNameAr: "تطوير",
    categoryNameEn: "Development",
    levelNameAr: "متوسط",
    levelNameEn: "Intermediate",
    image: "/images/featued-Project-image.svg",
    status: 1,
    projectType: "team",
    isFree: false,
    dueDate: "2025-11-15",
  },
  {
    id: 2,
    nameEn: "Team Dashboard",
    nameAr: "لوحة تحكم الفريق",
    categoryNameAr: "تطوير",
    categoryNameEn: "Development",
    levelNameAr: "متوسط",
    levelNameEn: "Intermediate",
    image: "/images/featued-Project-image.svg",
    status: 1,
    projectType: "team",
    isFree: false,
    dueDate: "2025-11-15",
  },
];
