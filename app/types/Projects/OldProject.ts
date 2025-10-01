import type { ProjectStatus } from "./ProjectStatus";
import type { ProjectType } from "./ProjectType";

export type Project = {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
  projectType: ProjectType;
  status: ProjectStatus;
  rating?: number;
  isFree?: boolean;
  dueDate?: Date;
  juniors?: string[];
  ageRange?: string;
  modificationDate?: Date;
};
