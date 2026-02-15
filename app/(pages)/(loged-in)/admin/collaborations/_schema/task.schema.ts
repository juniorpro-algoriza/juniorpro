import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(1, "Task title is required"),
  roleId: z.string().min(1, "Role is required"),
  juniorId: z.string().optional().nullable(),
  priority: z.string().min(1, "Priority is required"),
  dueDate: z.date().nullable(),
  description: z.string().min(1, "Description is required"),
});

export type CreateTaskValues = z.infer<typeof createTaskSchema>;
