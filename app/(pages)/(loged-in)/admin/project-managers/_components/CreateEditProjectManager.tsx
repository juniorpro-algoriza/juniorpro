"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input, MainCard } from "@components";
import { toast } from "sonner";
import {
  useAddProjectManager,
  useUpdateProjectManager,
} from "../../tanstack/project-managers";
import {
  addProjectManagerSchema,
  updateProjectManagerSchema,
} from "../_schema/projectManager.schema";

interface CreateEditProjectManagerProps {
  initialData?: {
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
  };
  projectManagerId?: number;
}

export function CreateEditProjectManager({
  initialData,
  projectManagerId,
}: CreateEditProjectManagerProps) {
  const router = useRouter();
  const isEditing = !!projectManagerId;

  const [formData, setFormData] = useState({
    firstName: initialData?.firstName || "",
    lastName: initialData?.lastName || "",
    email: initialData?.email || "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const { mutate: addPM, isPending: isAdding } = useAddProjectManager();
  const { mutate: updatePM, isPending: isUpdating } = useUpdateProjectManager();

  const isPending = isAdding || isUpdating;

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = () => {
    const schema = isEditing
      ? updateProjectManagerSchema
      : addProjectManagerSchema;

    const dataToValidate = isEditing
      ? {
          id: projectManagerId,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
        }
      : formData;

    const result = schema.safeParse(dataToValidate);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    if (isEditing) {
      updatePM(
        {
          id: projectManagerId,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
        },
        {
          onSuccess: () => {
            toast.success("Project manager updated successfully");
            router.push(`/admin/project-managers/${projectManagerId}`);
          },
          onError: (error) => {
            let message = "Failed to update project manager";
            try {
              const parsed = JSON.parse(error.message);
              if (parsed.errorMessage) message = parsed.errorMessage;
            } catch {
              // use default message
            }
            toast.error(message);
          },
        }
      );
    } else {
      addPM(formData, {
        onSuccess: () => {
          toast.success("Project manager created successfully");
          router.push("/admin/project-managers");
        },
        onError: (error) => {
          let message = "Failed to create project manager";
          try {
            const parsed = JSON.parse(error.message);
            if (parsed.errorMessage) message = parsed.errorMessage;
          } catch {
            // use default message
          }
          toast.error(message);
        },
      });
    }
  };

  return (
    <MainCard classname="p-6 md:p-8 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="First Name"
          type="text"
          placeholder="Enter first name"
          value={formData.firstName}
          onChange={(e) => handleChange("firstName", e.target.value)}
          error={errors.firstName}
        />
        <Input
          label="Last Name"
          type="text"
          placeholder="Enter last name"
          value={formData.lastName}
          onChange={(e) => handleChange("lastName", e.target.value)}
          error={errors.lastName}
        />
      </div>

      <Input
        label="Email"
        type="email"
        placeholder="Enter email address"
        value={formData.email}
        onChange={(e) => handleChange("email", e.target.value)}
        error={errors.email}
      />

      {!isEditing && (
        <Input
          label="Password"
          type="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={(e) => handleChange("password", e.target.value)}
          error={errors.password}
        />
      )}

      <div className="flex items-center gap-4 pt-4">
        <Button
          intent="main2"
          size="mainDefault"
          onClick={handleSubmit}
          isLoading={isPending}
        >
          {isEditing ? "Update Project Manager" : "Create Project Manager"}
        </Button>
        <Button
          intent="main"
          size="mainDefault"
          onClick={() => router.back()}
          disabled={isPending}
        >
          Cancel
        </Button>
      </div>
    </MainCard>
  );
}
