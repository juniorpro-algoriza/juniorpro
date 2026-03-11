"use client";

import { useState, useCallback, FormEvent } from "react";
import { toast } from "sonner";
import { createTaskSchema, CreateTaskValues } from "../_schema/task.schema";
import {
  useAddCollaborationRoleTask,
  useUpdateCollaborationRoleTask,
} from "../../tanstack/collaborations";
import { useRouter } from "next/navigation";

import { components } from "../../../../../../api-schema";

type GetAllCollaborationRoleTaskModel =
  components["schemas"]["Sawiha.Services.DTO.CollaborationRoleTaskModels.GetAll.GetAllCollaborationRoleTaskModel"];

export const useCreateTask = (
  collaborationId: number,
  initialData?: GetAllCollaborationRoleTaskModel
) => {
  const router = useRouter();
  const addTask = useAddCollaborationRoleTask();
  const updateTask = useUpdateCollaborationRoleTask();

  const [formData, setFormData] = useState<CreateTaskValues>({
    title: initialData?.title || "",
    roleId: initialData?.collaborationRoleId?.toString() || "",
    juniorId: initialData?.roleJuniorId?.toString() || "",
    priority: initialData?.priority?.toString() || "2", // Default to Medium (2)
    dueDate: initialData?.dueDate ? new Date(initialData.dueDate) : null,
    description: initialData?.description || "",
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(
    async (e?: FormEvent) => {
      if (e) e.preventDefault();

      const result = createTaskSchema.safeParse(formData);

      if (!result.success) {
        const errors: Record<string, string> = {};
        result.error.issues.forEach((issue) => {
          const fieldName = issue.path.join(".");
          errors[fieldName] = issue.message;
        });
        setFieldErrors(errors);
        toast.error("Please fix validation errors");
        return;
      }

      setFieldErrors({});
      setIsSubmitting(true);

      try {
        const payload = {
          title: result.data.title,
          description: result.data.description,
          priority: parseInt(result.data.priority) as 1 | 2 | 3,
          status: 1 as 1 | 2 | 3, // Not Started
          collaborationRoleId: parseInt(result.data.roleId),
          roleJuniorId: result.data.juniorId
            ? parseInt(result.data.juniorId)
            : null,
          dueDate: result.data.dueDate
            ? `${result.data.dueDate.getFullYear()}-${String(result.data.dueDate.getMonth() + 1).padStart(2, "0")}-${String(result.data.dueDate.getDate()).padStart(2, "0")}T00:00:00.000Z`
            : null,
        };

        if (initialData?.id) {
          await updateTask.mutateAsync({ ...payload, id: initialData.id });
          toast.success("Task updated successfully");
        } else {
          await addTask.mutateAsync(payload);
          toast.success("Task created successfully");
        }

        router.back();
      } catch (error) {
        console.error("Failed to save task:", error);
        toast.error("Failed to save task. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, initialData, addTask, updateTask, router]
  );

  return {
    formData,
    setFormData,
    fieldErrors,
    isSubmitting,
    handleSubmit,
  };
};
