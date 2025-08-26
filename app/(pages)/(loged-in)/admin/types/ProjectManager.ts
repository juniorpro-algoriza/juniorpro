import { ReactNode } from "react";

export type ProjectManager = {
  name: string;
  email: string;
  status: string | ReactNode;
  projects: number;
  practiceContent: number;
  contributors: number;
  joinedOn: string;
};

export interface ProjectManagerTableProps {
  projectManagerData: ProjectManager[];
  view?: "dashboard" | "full";
}
