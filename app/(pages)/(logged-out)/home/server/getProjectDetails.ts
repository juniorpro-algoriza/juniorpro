"use server";

import { getData } from "@server";


interface Tool {
  id: number;
  nameAr: string;
  nameEn: string;
}

interface Skill {
  id: number;
  nameAr: string;
  nameEn: string;
}

interface Task {
  id: number;
  nameAr: string;
  nameEn: string;
  deadline: string;
  description: string;
  attachment: string;
  taskSkillIds: number[];
}

interface ProjectDetails {
  id: number;
  image: string;
  nameAr: string;
  nameEn: string;
  description: string;
  projectType: number;
  status: number;
  categoryNameEn: string;
  durationNameEn: string;
  levelNameEn: string;
  ageRange: number;
  startDate: string;
  endDate: string;
  projectManagerName: string;
}

export interface ProjectDetailsResponse {
  projectDetails: ProjectDetails;
  tools: Tool[];
  skills: Skill[];
  tasks: Task[];
}

export async function getProjectDetails(id: number) {
  return await getData<ProjectDetailsResponse>({
    url: `landing-home-page/project-details/${id}`,
    method: "GET",
  });
}
