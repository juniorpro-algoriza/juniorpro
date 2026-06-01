import z from "zod";

export const PROJECT_MANAGER_PASSWORD_MESSAGE =
  "Password must be at least 8 characters and include uppercase, lowercase, and a special character.";

export const addProjectManagerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email is required"),
  password: z
    .string()
    .min(8, PROJECT_MANAGER_PASSWORD_MESSAGE)
    .regex(/[a-z]/, PROJECT_MANAGER_PASSWORD_MESSAGE)
    .regex(/[A-Z]/, PROJECT_MANAGER_PASSWORD_MESSAGE)
    .regex(/[^a-zA-Z0-9]/, PROJECT_MANAGER_PASSWORD_MESSAGE),
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
