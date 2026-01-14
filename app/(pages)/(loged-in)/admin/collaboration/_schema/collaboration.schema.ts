import { z } from "zod";

export const judgeSchema = z.object({
  id: z.string(),
  email: z.string().email("Invalid email format"),
});

export const instructionSchema = z.object({
  id: z.string(),
  text: z.string().min(1, "Instruction is required"),
});

export const evaluationCriterionSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Criteria name is required"),
  weight: z.coerce
    .number({ message: "Weight is required" })
    .min(1, "Weight must be greater than 0")
    .max(100),
});

export const prizeSchema = z.object({
  id: z.string(),
  rank: z.number(),
  money: z.coerce
    .number({ message: "Money reward is required" })
    .min(1, "Money reward is required"),
  xp: z.coerce.number({ message: "XP is required" }).min(1, "XP is required"),
  gems: z.coerce
    .number({ message: "Gems are required" })
    .min(1, "Gems are required"),
  label: z.string({ message: "Label is required" }).min(1, "Label is required"),
});

export const requirementSchema = z.object({
  id: z.string(),
  text: z.string().min(1, "Requirement text is required"),
});

export const criterionSchema = z.object({
  id: z.string(),
  text: z.string().min(1, "Criterion text is required"),
});

export const collaborationSchemaObject = z.object({
  id: z.number().int().positive().optional(),

  // Step 1: Overview
  projectTitle: z.string().min(1, "Challenge title is required"),
  description: z.string().min(1, "Description is required"),
  challengeType: z.string().min(1, "Challenge type is required"),
  difficultyLevel: z.string().min(1, "Difficulty level is required"),
  category: z.string().min(1, "Category is required"),
  skills: z
    .array(z.string())
    .min(1, "At least one skill is required")
    .default([]),

  startDateTime: z.date({
    message: "Start date & time is required",
  }),
  endDateTime: z.date({
    message: "End date & time is required",
  }),
  registrationDeadline: z.date().optional(),

  icon: z.string().min(1, "Challenge icon is required"),
  kpPoints: z.coerce.number().min(0).default(0),
  gems: z.coerce.number().min(0).default(0),

  isPremium: z.boolean().default(false),
  pointsCost: z.coerce.number().int().nonnegative().optional(),
  isSubscriptionOnly: z.boolean().optional(),

  judges: z.array(judgeSchema).default([]),

  // Step 2: How to Complete (Instructions)
  instructions: z.array(instructionSchema).default([]),

  // Step 3: Requirements (Evaluation & Success)
  evaluationCriteria: z.array(evaluationCriterionSchema).default([]),
  requirements: z.array(requirementSchema).default([]),
  successCriteria: z.array(criterionSchema).default([]),

  // Step 4: Prizes
  prizes: z.array(prizeSchema).default([]),
  participationGems: z.coerce.number().min(0).default(0),
});

export const collaborationFormSchema = collaborationSchemaObject
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
  )
  .superRefine((data, ctx) => {
    if (data.isPremium && !data.isSubscriptionOnly) {
      if (
        data.pointsCost === undefined ||
        data.pointsCost === null ||
        data.pointsCost <= 0
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Points cost is required for premium projects",
          path: ["pointsCost"],
        });
      }
    }

    // Validate Evaluation Criteria weights sum to 100
    if (data.evaluationCriteria && data.evaluationCriteria.length > 0) {
      const totalWeight = data.evaluationCriteria.reduce(
        (sum, item) => sum + (item.weight || 0),
        0
      );
      // Allow some tolerance or exact 100? Let's say exact 100 is good but validation might be annoying while typing.
      // Ideally check if not 100 only on submit? Zod runs on change mostly.
      if (Math.abs(totalWeight - 100) > 0.1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Total weight must be 100% (current: ${totalWeight}%)`,
          path: ["evaluationCriteria"],
        });
      }
    }
  });

export type CollaborationFormValues = z.infer<typeof collaborationFormSchema>;

// Step 1: Overview
export const step1Schema = collaborationSchemaObject
  .pick({
    projectTitle: true,
    description: true,
    challengeType: true,
    difficultyLevel: true,
    category: true,
    skills: true,
    startDateTime: true,
    endDateTime: true,
    registrationDeadline: true,
    icon: true,
    kpPoints: true,
    gems: true,
    isPremium: true,
    pointsCost: true,
    isSubscriptionOnly: true,
    judges: true,
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
  )
  .superRefine((data, ctx) => {
    if (data.isPremium && !data.isSubscriptionOnly) {
      if (
        data.pointsCost === undefined ||
        data.pointsCost === null ||
        data.pointsCost <= 0
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Points cost is required",
          path: ["pointsCost"],
        });
      }
    }
  });

// Step 2: How to Complete
export const step2Schema = collaborationSchemaObject.pick({
  instructions: true,
});

// Step 3: Requirements
export const step3Schema = collaborationSchemaObject.pick({
  evaluationCriteria: true,
  requirements: true,
  successCriteria: true,
});

// Step 4: Prizes
export const step4Schema = collaborationSchemaObject.pick({
  prizes: true,
  participationGems: true,
});
