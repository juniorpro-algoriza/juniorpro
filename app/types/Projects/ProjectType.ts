
import type { Project } from "@types";
export type ProjectType = "Team" | "Free" | "Premium";

export interface NormalizedProject extends Omit<Project, "projectType"> {
  projectType: ProjectType;
}
