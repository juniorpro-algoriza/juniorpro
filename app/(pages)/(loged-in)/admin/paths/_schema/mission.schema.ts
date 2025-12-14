import { z } from "zod";

// Base schemas for nested objects
export const missionDetailsSchema = z.object({
  pathId: z.number().int().positive().optional(),
  nameEn: z.string().min(1, "Mission name is required"),
  description: z.string().min(1, "Description is required"),
  durationId: z.number({ message: "Duration is required" }).positive("Duration is required"),
  levelId: z.number({ message: "Level is required" }).positive("Level is required"),
  skillId: z.number({ message: "Skill is required" }).positive("Skill is required"),
  xp: z.coerce.number({ message: "XP must be a non-negative integer" }).nonnegative("XP must be a non-negative integer"),
  points: z.coerce.number({ message: "Points must be a non-negative integer" }).nonnegative("Points must be a non-negative integer"),
  referenceAnswer: z.string().min(1, "Reference answer is required"),
});

export const missionGuideSchema = z.object({
  titleEn: z.string().min(1, "Step name is required"),
  description: z.string().min(1, "Step description is required"),
  codeReference: z.string(),
});

export const missionCriteriaSchema = z.object({
  description: z.string().min(1, "Criteria description is required"),
});

export const learningResourcesSchema = z.object({
  titleEn: z.string().min(1, "Resource title is required"),
  url: z.url("Please enter a valid URL"),
  type: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]),
  duration: z.number().int().nonnegative().optional().nullable(),
});

// Main mission form schema
export const missionFormSchema = z.object({
  missionDetails: missionDetailsSchema,
  steps: z.array(missionGuideSchema),
  successCriterias: z.array(missionCriteriaSchema),
  learningResources: z.array(learningResourcesSchema),
});

export type MissionFormValues = z.infer<typeof missionFormSchema>;

// Mission details schema without referenceAnswer for step 1
export const missionDetailsWithoutReferenceSchema = missionDetailsSchema.omit({ 
  referenceAnswer: true 
});

export const step1Schema = z.object({
  missionDetails: missionDetailsWithoutReferenceSchema,
});

export const step2Schema = missionFormSchema.pick({
  steps: true,
});

export const step3Schema = missionFormSchema.pick({
  learningResources: true,
});
export const step4Schema = missionFormSchema.pick({
  successCriterias: true,
});

export const step5Schema = missionFormSchema.pick({
  missionDetails: true,
});
