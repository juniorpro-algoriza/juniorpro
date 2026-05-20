import { z } from "zod";
import type { BadgeTypeId } from "../_components/data";

const badgeTypeSchema = z.union([
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
]);

const isFile = (value: unknown): value is File =>
  typeof File !== "undefined" && value instanceof File;

export const getBadgeFormSchema = (isEditing: boolean) =>
  z
    .object({
      titleEn: z.string().trim().min(1, "Badge title is required."),
      type: badgeTypeSchema.optional(),
      count: z
        .number()
        .int("Dependency must be a whole number.")
        .min(1, "Dependency must be at least 1."),
      image: z.custom<File | null>((value) => value === null || isFile(value)),
    })
    .superRefine((data, ctx) => {
      if (!data.type) {
        ctx.addIssue({
          code: "custom",
          path: ["type"],
          message: "Choose a badge type before creating the badge.",
        });
      }

      if (!isEditing && !isFile(data.image)) {
        ctx.addIssue({
          code: "custom",
          path: ["image"],
          message: "Badge image is required.",
        });
      }
    });

export type BadgeFormValues = {
  titleEn: string;
  type?: BadgeTypeId;
  count: number;
  image: File | null;
};
