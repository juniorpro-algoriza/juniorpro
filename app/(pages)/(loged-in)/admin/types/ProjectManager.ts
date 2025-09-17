import type { ReactNode } from "react";

export interface ProjectManager extends Record<string, unknown> {
  id: number;
  name: string;
  email: string;
  status: string | ReactNode;
  projects: number;
  practiceContent: number;
  contributors: number;
  joinedOn: string;
  juniorsCount: number;
}

export interface ProjectManagerTableProps {
  projectManagerData: ProjectManager[];
  view?: "dashboard" | "full";
}
