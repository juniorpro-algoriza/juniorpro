export type Task = {
  id: number;
  taskName: string;
  skills: string;
  deadline: string;
  description: string;
  attachment?: File | null;
};
