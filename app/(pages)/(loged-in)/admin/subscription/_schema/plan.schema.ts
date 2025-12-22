import { z } from "zod";

export const planFeatureSchema = z.object({
  featureId: z.number().int().positive(),
  limitCount: z.number().int().nonnegative().nullable(),
});

export const planFormSchema = z.object({
  id: z.number().int().positive().optional(),
  planName: z.string().min(1, "Plan name is required"),
  description: z.string().min(1, "Description is required"),
  juniorCapacity: z.number().int().nonnegative(),
  isActive: z.boolean(),
  price: z.number().min(0, "Price must be greater than or equal to 0"),
  durationType: z
    .number()
    .int()
    .min(1, "Duration type is required")
    .max(4, "Invalid duration type"),
  features: z.array(planFeatureSchema),
});

export type PlanFormValues = z.infer<typeof planFormSchema>;

export const step1Schema = planFormSchema.pick({
  planName: true,
  description: true,
  isActive: true,
  juniorCapacity: true,
});

export const step2Schema = planFormSchema.pick({
  price: true,
  durationType: true,
});

export const step3Schema = planFormSchema.pick({
  features: true,
});
