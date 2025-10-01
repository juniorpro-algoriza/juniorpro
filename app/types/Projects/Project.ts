// types/Projects.ts

import { Project } from "next/dist/build/swc/types";
// import { ProjectType } from "./ProjectType";

export interface NormalizedProject
  extends Omit<Project, "projectType" | "image" | "nameEn" | "levelNameEn"> {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  // projectType: ProjectType;
  status: "Draft" | "Published" | "Review";
  modificationDate: string | null;
  ageRange: string;
}
