import { z } from "zod";

export const guideStepSchema = z.object({
  id: z.string(),
  description: z.string().min(1, "Step description is required"),
});

export const goalSchema = z.object({
  id: z.string(),
  description: z.string().min(1, "Goal description is required"),
});

export const requirementSchema = z.object({
  id: z.string(),
  description: z.string().min(1, "Requirement description is required"),
});

export const evaluationSchema = z.object({
  id: z.string(),
  titleEn: z.string().min(1, "Criteria name is required"),
  titleAr: z.string().optional(),
  description: z.string().optional(),
  percentage: z.coerce
    .number({
      message: "Weight must be a number between 0 and 100",
    })
    .min(0, "Weight must be at least 0%")
    .max(100, "Weight cannot be more than 100%"),
});

export const prizeSchema = z.object({
  id: z.string(),
  rank: z.number().min(1),
  titleEn: z.string().min(1, "Prize title is required"),
  titleAr: z.string().optional(),
  xp: z.coerce
    .number({ message: "XP is required" })
    .min(0, "XP must be 0 or more"),
  points: z.coerce
    .number({ message: "Points are required" })
    .min(0, "Points must be 0 or more"),
});

export const challengeSchemaObject = z.object({
  id: z.number().int().positive().optional(),

  // Step 1: Overview
  nameEn: z.string().min(1, "Challenge title is required"),
  nameAr: z.string().optional().default(""),
  description: z.string().min(1, "Description is required"),
  levelId: z.coerce
    .number({ message: "Difficulty level is required" })
    .min(1, "Difficulty level is required"),
  categoryId: z.coerce
    .number({ message: "Category is required" })
    .min(1, "Category is required"),
  juniorsCapacity: z.coerce
    .number({ message: "Capacity is required" })
    .min(1, "Capacity must be at least 1"),
  startDate: z.date({ message: "Start date is required" }),
  endDate: z.date({ message: "End date is required" }),
  registerationDeadline: z.date({
    message: "Registration deadline is required",
  }),
  icon: z.coerce
    .number({ message: "Challenge icon is required" })
    .min(1, "Challenge icon is required"),
  accessCostType: z.coerce.number().min(1).max(3).default(1),

  // Step 2: Project Details
  guideSteps: z
    .array(guideStepSchema)
    .min(1, "At least one guide step is required"),
  goals: z.array(goalSchema).min(1, "At least one goal is required"),

  // Step 3: Requirements
  requirements: z
    .array(requirementSchema)
    .min(1, "At least one requirement is required"),
  evaluations: z.array(evaluationSchema).default([]),

  // Step 4: Prizes
  prizes: z.array(prizeSchema).min(1, "At least one prize is required"),
});

export const challengeFormSchema = challengeSchemaObject
  .refine(
    (data) => {
      if (data.endDate && data.startDate) {
        return data.endDate > data.startDate;
      }
      return true;
    },
    {
      message: "End date must be after start date",
      path: ["endDate"],
    }
  )
  .refine(
    (data) => {
      if (data.registerationDeadline && data.startDate) {
        return data.registerationDeadline < data.startDate;
      }
      return true;
    },
    {
      message: "Registration deadline must be before start date",
      path: ["registerationDeadline"],
    }
  )
  .superRefine((data, ctx) => {
    if (data.evaluations && data.evaluations.length > 0) {
      const totalPercentage = data.evaluations.reduce(
        (sum, item) => sum + (item.percentage || 0),
        0
      );
      if (Math.abs(totalPercentage - 100) > 0.1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Evaluation weights must total exactly 100% (current: ${totalPercentage}%)`,
          path: ["evaluations"],
        });
      }
    }
  });

export type ChallengeFormValues = z.infer<typeof challengeFormSchema>;

// Step 1: Overview
export const step1Schema = challengeSchemaObject
  .pick({
    nameEn: true,
    nameAr: true,
    description: true,
    levelId: true,
    categoryId: true,
    juniorsCapacity: true,
    startDate: true,
    endDate: true,
    registerationDeadline: true,
    icon: true,
    accessCostType: true,
  })
  .refine(
    (data) => {
      if (data.endDate && data.startDate) {
        return data.endDate > data.startDate;
      }
      return true;
    },
    {
      message: "End date must be after start date",
      path: ["endDate"],
    }
  )
  .refine(
    (data) => {
      if (data.registerationDeadline && data.startDate) {
        return data.registerationDeadline < data.startDate;
      }
      return true;
    },
    {
      message: "Registration deadline must be before start date",
      path: ["registerationDeadline"],
    }
  );

// Step 2: Project Details
export const step2Schema = challengeSchemaObject.pick({
  guideSteps: true,
  goals: true,
});

// Step 3: Requirements
export const step3Schema = challengeSchemaObject
  .pick({
    requirements: true,
    evaluations: true,
  })
  .superRefine((data, ctx) => {
    if (data.evaluations && data.evaluations.length > 0) {
      const totalPercentage = data.evaluations.reduce(
        (sum, item) => sum + (item.percentage || 0),
        0
      );

      if (Math.abs(totalPercentage - 100) > 0.1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Evaluation weights must total exactly 100% (current: ${totalPercentage}%)`,
          path: ["evaluations"],
        });
      }
    }
  });

// Step 4: Prizes
export const step4Schema = challengeSchemaObject.pick({
  prizes: true,
});
