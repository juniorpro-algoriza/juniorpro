"use client";
import { Button, Input, MainCard, PATH_ICON, Textarea } from "@components";
import Image from "next/image";
import React, { useState, useCallback, FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { pathFormSchema, PathFormValues } from "../_schema/path.schema";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { components } from "../../../../../../api-schema";
import { postLearningPath, putLearningPath } from "../../server";
import { LearningJourneyCard } from "./LearningJourneyCard";

const getInitialFormData = (): PathFormValues => ({
  nameEn: "",
  description: "",
  icon: 1,
});

export const PathCreateEdit = ({
  pathId,
  initialData,
}: {
  pathId?: string;
  initialData?: components["schemas"]["Sawiha.Services.DTO.PathModels.GetLearningPathListModel"];
}) => {
  const router = useRouter();
  const [formData, setFormData] = useState<PathFormValues>(() => {
    if (initialData) {
      return {
        nameEn: initialData.nameEn ?? "",
        description: initialData.description ?? "",
        icon: initialData.icon ?? 1,
      };
    }
    return getInitialFormData();
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const isEditing = !!pathId;

  const handleChange = <T extends keyof PathFormValues>(
    field: T,
    value: PathFormValues[T],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setFieldErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const result = pathFormSchema.safeParse(formData);

      if (!result.success) {
        const errors: Record<string, string> = {};
        result.error.issues.forEach((issue) => {
          const fieldName = String(issue.path[0]);
          errors[fieldName] = issue.message;
        });
        setFieldErrors(errors);
        const message =
          result.error.issues[0]?.message ??
          "Please complete required fields before continuing";
        toast.error(message);
        return;
      }

      setFieldErrors({});

      try {
        setIsSubmitting(true);
        const payload = {
          ...result.data,
          ...(isEditing && pathId ? { id: Number(pathId) } : {}),
        } as typeof result.data;

        if (isEditing && pathId) {
          await putLearningPath(payload);
          toast.success("Path updated successfully!");
          router.push("/admin/paths");
        } else {
          const response = await postLearningPath(result.data);
          router.push(`/admin/paths/${response}`);
          toast.success("Path created successfully!");
        }
      } catch (error) {
        console.error("Failed to save path:", error);
        toast.error(
          `Failed to ${isEditing ? "update" : "create"} path. Please try again.`,
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, router, isEditing, pathId],
  );

  return (
    <div className="xl:max-w-4/5 space-y-5">
      <form
        className="flex max-md:flex-col w-full gap-5"
        onSubmit={handleSubmit}
        id="create-path-form"
      >
        <MainCard classname=" flex-1 ">
          <Input
            label="Path Name"
            value={formData.nameEn}
            onChange={(e) => handleChange("nameEn", e.target.value)}
            placeholder="e.g., Full Stack Wizardry"
            error={fieldErrors.nameEn}
          />
          <Textarea
            label="Description"
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="e.g., Learn the fundamentals of web development and build your first full-stack application."
            error={fieldErrors.description}
          />
        </MainCard>
        <MainCard classname=" space-y-4 xl:min-w-[350px] min-w-[250px]">
          <p className="text-sm text-midnight">
            Path Icon
            <span className="px-2 py-1 rounded-lg text-13 bg-gray-50 ms-3">
              Select One
            </span>
          </p>
          <div className="grid xl:grid-cols-4 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-7 grid-cols-5 sm:gap-4 gap-2">
            {Object.entries(PATH_ICON).map(([key, value]) => {
              const iconNumber = Number(key);
              return (
                <label key={key} className="cursor-pointer">
                  <input
                    type="radio"
                    name="icon"
                    value={iconNumber}
                    checked={formData.icon === iconNumber}
                    onChange={(e) =>
                      handleChange(
                        "icon",
                        Number(e.target.value) as PathFormValues["icon"],
                      )
                    }
                    className="peer sr-only"
                  />
                  <div
                    className={`flex items-center justify-center border rounded-3xl aspect-square p-2 transition-all border-gray-100 hover:border-gray-300 peer-checked:border-blue-main peer-checked:bg-blue-main/10 ${
                      formData.icon === iconNumber
                        ? "border-blue-main bg-blue-main/10"
                        : ""
                    }`}
                  >
                    <Image src={value} alt={key} width={40} height={40} />
                  </div>
                </label>
              );
            })}
          </div>
        </MainCard>
      </form>
      {isEditing && <LearningJourneyCard pathId={pathId} />}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <Button
          intent="main"
          size="mainDefault"
          type="button"
          onClick={() => router.push("/admin/paths")}
        >
          Cancel
        </Button>
        <Button
          intent="main2"
          size="mainDefault"
          type="submit"
          disabled={isSubmitting}
          form="create-path-form"
        >
          {isSubmitting
            ? isEditing
              ? "Updating..."
              : "Creating..."
            : isEditing
              ? "Update Path"
              : "Create Path"}
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  );
};
