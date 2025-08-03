"use server";

import type { Project, ProjectStatus, ProjectType } from "../types";

type GetAllProjectsParams = {
  pageNum: number;
  limit: number;
  projectType: ProjectType;
};
type ReturnType = {
  data: Project[];
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export const getProjects = async ({
  pageNum,
  limit,
  projectType,
}: GetAllProjectsParams): Promise<ReturnType> => {
  let filteredData = dummyData;

  if (projectType !== "all") {
    filteredData = dummyData.filter(
      (project) => project.projectType === projectType
    );
  }

  const startIndex = (pageNum - 1) * limit;
  const endIndex = startIndex + limit;

  const paginatedData: Project[] = filteredData.slice(startIndex, endIndex);

  return {
    data: paginatedData,
    currentPage: pageNum,
    totalPages: Math.ceil(filteredData.length / limit),
    hasNextPage: endIndex < filteredData.length,
    hasPrevPage: startIndex > 0,
  };
};

const dummyData: Project[] = [
  // 10 solo
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `${i + 1}`,
    category: "Web Development",
    title: `Solo Project ${i + 1}`,
    imageUrl: "/images/featued-Project-image.svg",
    description: "A solo project to build skills.",
    rating: 4 + (i % 2),
    projectType: "solo" as ProjectType,
    isFree: i % 2 === 0,
    status: "not-started" as ProjectStatus,
    dueDate: new Date(),
    juniors: ["anas"],
  })),

  // 10 web
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `${i + 11}`,
    category: "Web Development",
    title: `Web Project ${i + 1}`,
    imageUrl: "/images/featued-Project-image.svg",
    description: "A web development project.",
    rating: 3 + (i % 3),
    projectType: "web" as ProjectType,
    isFree: i % 2 !== 0,
    status: "not-started" as ProjectStatus,
    dueDate: new Date(),
    juniors: ["anas"],
  })),

  // 10 team
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `${i + 21}`,
    category: "Team Collaboration",
    title: `Team Project ${i + 1}`,
    imageUrl: "/images/featued-Project-image.svg",
    description: "A project for teams to collaborate.",
    rating: 4 + (i % 2),
    projectType: "team" as ProjectType,
    isFree: i % 3 === 0,
    status: "not-started" as ProjectStatus,
    dueDate: new Date(),
    juniors: ["anas"],
  })),

  // 10 coding
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `${i + 31}`,
    category: "Coding Challenges",
    title: `Coding Project ${i + 1}`,
    imageUrl: "/images/featued-Project-image.svg",
    description: "Solve coding challenges and learn.",
    rating: 5 - (i % 3),
    projectType: "coding" as ProjectType,
    isFree: i % 2 === 0,
    status: "not-started" as ProjectStatus,
    dueDate: new Date(),
    juniors: ["anas"],
  })),
];
