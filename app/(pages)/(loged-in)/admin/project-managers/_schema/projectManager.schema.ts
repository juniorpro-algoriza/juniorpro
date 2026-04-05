import z from "zod";

export const addProjectManagerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const updateProjectManagerSchema = z.object({
  id: z.number(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email is required"),
});

export type AddProjectManagerFormData = z.infer<typeof addProjectManagerSchema>;
export type UpdateProjectManagerFormData = z.infer<
  typeof updateProjectManagerSchema
>;
