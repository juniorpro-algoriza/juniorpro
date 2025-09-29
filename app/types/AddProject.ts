export type Task = {
  id: number;
  taskName: string;
  skillIds: (string | number)[];
  deadline: string;
  description: string;
  attachment?: string;
};

export type ProjectDetails = {
  courseName: string;
  projectType: number;
  status: number;
  description: string;
  attachment?: string;
  categoryId: number;
  levelId: number;
  numberOfPlaces: number;
  durationId: number;
  ageRange: number;
  points: number;
  projectManagerId: number;
  skillIds: (string | number)[];
  toolIds: (string | number)[];
  startDate: string;
  endDate: string;
};
