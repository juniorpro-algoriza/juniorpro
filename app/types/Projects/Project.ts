import type { ProjectStatus } from "./ProjectStatus";
import type { ProjectType } from "./ProjectType";

export type Project = {
  id: string;
  title: string;
  category?: string;
  imageUrl: string;
  description: string;
  rating: number;
  projectType: ProjectType;
  isFree: boolean;
  status: ProjectStatus;
  dueDate?: Date;
  juniors?: string[];
  juniorsCount?: number;
};
