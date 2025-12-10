import { z } from "zod";

export const pathFormSchema = z.object({
  id: z.number().int().positive().optional(),
  nameEn: z.string().min(1, "Path name is required"),
  description: z.string().min(1, "Path description is required"),
  icon: z.union([
    z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5),
    z.literal(6), z.literal(7), z.literal(8), z.literal(9), z.literal(10),
    z.literal(11), z.literal(12)
  ]),
});

export type PathFormValues = z.infer<typeof pathFormSchema>;
