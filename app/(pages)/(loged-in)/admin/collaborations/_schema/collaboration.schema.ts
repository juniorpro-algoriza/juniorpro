import { z } from "zod";

export const taskSchema = z.object({
  id: z.string(),
  text: z.string().min(1, "Task is required"),
});

export const responsibilitySchema = z.object({
  id: z.string(),
  text: z
    .string()
    .min(1, "Responsibility is required")
    .min(3, "Responsibility must be at least 3 characters long")
    .max(500, "Responsibility must be less than 500 characters")
    .trim()
    .refine(
      (val) => val.trim().length > 0,
      "Responsibility cannot be just whitespace"
    ),
});

export const roleSchema = z.object({
  id: z.string(),
  category: z
    .string()
    .min(1, "Category name is required")
    .refine(
      (val) => !isNaN(parseInt(val)) && parseInt(val) > 0,
      "Please select a valid category"
    ),
  roleDescription: z
    .string()
    .min(1, "Role description is required")
    .min(2, "Role description must be at least 2 characters long")
    .max(200, "Role description must be less than 200 characters")
    .trim()
    .refine(
      (val) => val.trim().length > 0,
      "Role description cannot be just whitespace"
    ),
  teamCapacity: z.coerce
    .number()
    .min(1, "Team capacity must be at least 1")
    .max(50, "Team capacity cannot exceed 50 members")
    .int("Team capacity must be a whole number"),
  responsibilities: z
    .array(responsibilitySchema)
    .min(1, "At least one responsibility is required")
    .max(10, "Cannot have more than 10 responsibilities")
    .refine(
      (responsibilities) =>
        responsibilities.every((resp) => resp.text.trim().length > 0),
      "All responsibilities must have content"
    ),
  toolsRequired: z
    .array(z.string())
    .min(1, "At least one tool is required")
    .max(20, "Cannot select more than 20 tools")
    .refine(
      (tools) => tools.every((tool) => tool.trim().length > 0),
      "All tools must be valid"
    ),
  assignMentor: z
    .string()
    .min(1, "Assign mentor is required")
    .refine(
      (val) => !isNaN(parseInt(val)) && parseInt(val) > 0,
      "Please select a valid mentor"
    ),
});

export const goalSchema = z.object({
  id: z.string(),
  text: z.string().min(1, "Goal is required"),
});

export const requirementSchema = z.object({
  id: z.string(),
  text: z.string().min(1, "Requirement is required"),
});

export const collaborationSchemaObject = z.object({
  id: z.number().int().positive().optional(),

  // Step 1: Overview
  projectTitle: z.string().min(1, "Project title is required"),
  description: z.string().min(1, "Description is required"),
  projectIcon: z.string().min(1, "Project icon is required"),

  registrationDeadline: z.date({
    message: "Registration deadline is required",
  }),
  startDate: z.date({
    message: "Start date is required",
  }),
  endDate: z.date({
    message: "End date is required",
  }),

  xpReward: z.coerce.number().min(1, "XP Reward is required").default(0),
  gemsPoints: z.coerce.number().min(1, "Gems / Points is required").default(0),
  money: z.coerce.number().min(1, "Money is required").default(0),

  // Step 2: Project Details
  goals: z.array(goalSchema).default([]),

  // Step 3: Roles & Team
  roles: z.array(roleSchema).default([]),

  // Step 4: Requirements
  requirements: z.array(requirementSchema).default([]),
});

export const collaborationFormSchema = collaborationSchemaObject;

export type CollaborationFormValues = z.infer<typeof collaborationFormSchema>;

// Step 1: Overview
export const step1Schema = collaborationSchemaObject.pick({
  projectTitle: true,
  description: true,
  projectIcon: true,
  registrationDeadline: true,
  startDate: true,
  endDate: true,
  xpReward: true,
  gemsPoints: true,
  money: true,
});

// Step 2: Project Details
export const step2Schema = collaborationSchemaObject.pick({
  goals: true,
});

// Step 3: Requirements
export const step3Schema = collaborationSchemaObject.pick({
  requirements: true,
});

// Step 4: Roles & Team
export const step4Schema = collaborationSchemaObject.pick({
  roles: true,
});
