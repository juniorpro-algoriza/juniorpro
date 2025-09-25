export type Task = {
  id: number;
  taskName: string;
  skills: number;
  deadline: string;
  description: string;
  attachment?: string;
};

export type ProjectDetails = {
  courseName: string;
  projectType: number;
  status: number;
  description: string;
  attachment: string;
  categoryId: number;
  levelId: number;
  durationId: number;
  ageRange: number;
  points: number;
  projectManagerId: number;
  skillIds: number;
  toolIds: number;
  startDate: string;
  endDate: string;
};
