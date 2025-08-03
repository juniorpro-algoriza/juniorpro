import { ProjectType } from "./ProjectType";

export type Project = {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
  rating: number;
  projectType: ProjectType;
  isFree: boolean;
};
