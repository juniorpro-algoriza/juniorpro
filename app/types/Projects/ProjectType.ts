import type { Project } from "@types";
export type ProjectType = "Team" | "Free Solo" | "Premium Solo";

export interface NormalizedProject extends Omit<Project, "projectType"> {
  projectType: ProjectType;
}
