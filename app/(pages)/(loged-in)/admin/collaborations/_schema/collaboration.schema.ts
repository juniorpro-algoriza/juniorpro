import { z } from "zod";

export const taskSchema = z.object({
  id: z.string(),
  text: z.string().min(1, "Task is required"),
});

export const roleSchema = z.object({
  id: z.string(),
  category: z.string().min(1, "Category name is required"),
  roleDescription: z.string().min(1, "Role description is required"),
  responsibilities: z.string().min(1, "Responsibilities are required"),
  toolsRequired: z.array(z.string()).min(1, "At least one tool is required"),
  assignMentor: z.string().min(1, "Assign mentor is required"),
  tasks: z.array(taskSchema).default([]),
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

  startDateTime: z.date({
    message: "Start date & time is required",
  }),
  endDateTime: z.date({
    message: "End date & time is required",
  }),

  xpReward: z.coerce.number().min(1, "XP Reward is required").default(0),
  gemsPoints: z.coerce.number().min(1, "Gems / Points is required").default(0),
  money: z.coerce.number().min(1, "Money is required").default(0),

  // Step 2: Project Details
  whatWereBuilding: z.string().min(1, "Project description is required"),
  goals: z.array(goalSchema).default([]),

  // Step 3: Roles & Team
  roles: z.array(roleSchema).default([]),

  // Step 4: Requirements
  requirements: z.array(requirementSchema).default([]),
});

export const collaborationFormSchema = collaborationSchemaObject.refine(
  (data) => {
    if (data.endDateTime && data.startDateTime) {
      return data.endDateTime > data.startDateTime;
    }
    return true;
  },
  {
    message: "End date must be after start date",
    path: ["endDateTime"],
  }
);

export type CollaborationFormValues = z.infer<typeof collaborationFormSchema>;

// Step 1: Overview
export const step1Schema = collaborationSchemaObject
  .pick({
    projectTitle: true,
    description: true,
    projectIcon: true,
    startDateTime: true,
    endDateTime: true,
    xpReward: true,
    gemsPoints: true,
    money: true,
  })
  .refine(
    (data) => {
      if (data.endDateTime && data.startDateTime) {
        return data.endDateTime > data.startDateTime;
      }
      return true;
    },
    {
      message: "End date must be after start date",
      path: ["endDateTime"],
    }
  );

// Step 2: Project Details
export const step2Schema = collaborationSchemaObject.pick({
  whatWereBuilding: true,
  goals: true,
});

// Step 3: Roles & Team
export const step3Schema = collaborationSchemaObject.pick({
  roles: true,
});

// Step 4: Requirements
export const step4Schema = collaborationSchemaObject.pick({
  requirements: true,
});
