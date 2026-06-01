"use client";
import { Button, Input, MainCard, Textarea } from "@components";
import Image from "next/image";
import React, { useState, useCallback, FormEvent, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { pathFormSchema, PathFormValues } from "../_schema/path.schema";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { components } from "../../../../../../api-schema";
import {
  useLearningPathById,
  useAddLearningPath,
  useUpdateLearningPath,
  useCompleteLearningPath,
} from "../../tanstack/paths/useLearningPaths";

import { LearningJourneyCard } from "./LearningJourneyCard";
import { PATH_ICON, PATH_STATUS } from "../../../../../configs";

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
  const isEditing = !!pathId;
  const { data: pathData, isLoading } = useLearningPathById(
    pathId ? Number(pathId) : 0,
    isEditing
  );
  console.warn(pathData);

  const addPathMutation = useAddLearningPath();
  const updatePathMutation = useUpdateLearningPath();
  const completePathMutation = useCompleteLearningPath();

  const [formData, setFormData] = useState<PathFormValues>(() => {
    const data = pathData || initialData;
    if (data) {
      return {
        nameEn: data.nameEn ?? "",
        description: data.description ?? "",
        icon: data.icon ?? 1,
      };
    }
    return getInitialFormData();
  });

  useEffect(() => {
    if (pathData) {
      setFormData({
        nameEn: pathData.nameEn ?? "",
        description: pathData.description ?? "",
        icon: pathData.icon ?? 1,
      });
    }
  }, [pathData]);

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleChange = <T extends keyof PathFormValues>(
    field: T,
    value: PathFormValues[T]
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
        const payload = {
          ...result.data,
          ...(isEditing && pathId ? { id: Number(pathId) } : {}),
        };

        if (isEditing && pathId) {
          await updatePathMutation.mutateAsync(payload);
          toast.success("Path updated successfully!");
          router.push("/admin/paths");
          router.refresh();
        } else {
          const response = await addPathMutation.mutateAsync(result.data);
          router.push(`/admin/paths/${response}`);
          toast.success("Path created successfully!");
        }
      } catch (error) {
        console.error("Failed to save path:", error);
        toast.error(
          `Failed to ${isEditing ? "update" : "create"} path. Please try again.`
        );
      }
    },
    [formData, router, isEditing, pathId, addPathMutation, updatePathMutation]
  );

  const isSubmitting =
    addPathMutation.isPending || updatePathMutation.isPending;
  const isCompleting = completePathMutation.isPending;

  const handleCompletePath = async () => {
    if (!pathId) {
      toast.error("Path ID is required to complete path");
      return;
    }

    try {
      await completePathMutation.mutateAsync(Number(pathId));
      toast.success("Learning path completed successfully!");
      router.push("/admin/paths");
      router.refresh();
    } catch (error) {
      let errorMessage = "Failed to complete path. Please try again.";

      if (error instanceof Error) {
        try {
          const errorData = JSON.parse(error.message);
          console.log(errorData);
          if (errorData.errorMessage === "LearningPathHasNoMissions") {
            errorMessage =
              "Cannot complete path: No missions have been added to this learning path yet.";
          }
        } catch {}
      }

      toast.error(errorMessage);
    }
  };

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
                        Number(e.target.value) as PathFormValues["icon"]
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
      {isEditing && (
        <LearningJourneyCard pathId={pathId} status={pathData?.status} />
      )}
      <div className="flex items-center justify-between max-sm:flex-col gap-3 flex-wrap">
        <Button
          intent="main"
          size="mainDefault"
          type="button"
          className="max-sm:w-full"
          onClick={() => router.push("/admin/paths")}
        >
          Cancel
        </Button>
        <div className="flex items-center gap-2 max-sm:w-full flex-wrap">
          {isEditing &&
            !isLoading &&
            pathData?.status !== PATH_STATUS.Completed && (
              <Button
                intent="main"
                size="mainDefault"
                type="button"
                className="max-sm:flex-1"
                onClick={handleCompletePath}
                disabled={isCompleting}
              >
                {isCompleting ? "Completing..." : "Complete Path"}
              </Button>
            )}

          <Button
            intent="main2"
            size="mainDefault"
            type="submit"
            disabled={isSubmitting}
            form="create-path-form"
            className="max-sm:flex-1"
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
    </div>
  );
};
