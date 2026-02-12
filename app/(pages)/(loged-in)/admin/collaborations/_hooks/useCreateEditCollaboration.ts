"use client";

import { useState, useCallback, FormEvent, useEffect } from "react";
import { toast } from "sonner";
import {
  collaborationFormSchema,
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
} from "../_schema/collaboration.schema";
import { CollaborationFormData } from "../_components/types";
import { useRouter } from "next/navigation";
import {
  useCreateAdminCollaboration,
  useAddCollaborationRole,
  useUpdateAdminCollaboration,
} from "../../tanstack/collaboration";
import { components } from "../../../../../../api-schema";

type GetCollaborationDetailsModel =
  components["schemas"]["Sawiha.Services.DTO.AdminCollaborationModels.GetById.GetCollaborationDetailsModel"];

const getInitialFormData = (): CollaborationFormData => ({
  projectTitle: "",
  description: "",
  projectIcon: "",
  registrationDeadline: null,
  xpReward: 1000,
  gemsPoints: 100,
  money: 50,
  goals: [{ id: "0", text: "" }],
  roles: [
    {
      id: "0",
      category: "",
      roleDescription: "",
      teamCapacity: 1,
      responsibilities: [{ id: "0", text: "" }],
      toolsRequired: [],
      assignMentor: "",
    },
  ],
  requirements: [{ id: "0", text: "" }],
});

const transformApiDataToFormData = (
  apiData: GetCollaborationDetailsModel
): CollaborationFormData => {
  const details = apiData.collaborationDetails;

  // Parse registration deadline from API
  const regDeadlineStr = details?.registerationDeadline;
  const registrationDeadline = regDeadlineStr ? new Date(regDeadlineStr) : null;

  return {
    projectTitle: details?.nameEn || "",
    description: details?.description || "",
    projectIcon: details?.icon?.toString() || "",
    registrationDeadline,
    xpReward: details?.xpReward || 1000,
    gemsPoints: details?.points || 100,
    money: details?.money || 50,
    goals: apiData.goals?.map((g, i) => ({
      id: g.id?.toString() || i.toString(),
      text: g.description || "",
    })) || [{ id: "0", text: "" }],
    roles: [], // Roles need separate fetching or will be handled separately
    requirements: apiData.requirements?.map((r, i) => ({
      id: r.id?.toString() || i.toString(),
      text: r.description || "",
    })) || [{ id: "0", text: "" }],
  };
};

export const useCreateEditCollaboration = (
  mode: "create" | "edit" = "create",
  initialData?: GetCollaborationDetailsModel,
  existingCollaborationId?: number,
  initialStep: number = 1
) => {
  const router = useRouter();

  const createCollaboration = useCreateAdminCollaboration();
  const updateCollaboration = useUpdateAdminCollaboration();
  const addRole = useAddCollaborationRole();

  const [currentStep, setCurrentStep] = useState<number>(initialStep);
  const [formData, setFormData] = useState<CollaborationFormData>(() => {
    if (mode === "edit" && initialData) {
      return transformApiDataToFormData(initialData);
    }
    return getInitialFormData();
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdCollaborationId, setCreatedCollaborationId] = useState<
    number | null
  >(existingCollaborationId || null);

  // Sync currentStep with initialStep when it changes (e.g., from URL query param)
  useEffect(() => {
    setCurrentStep(initialStep);
  }, [initialStep]);

  const handleSubmitFirstForm = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const dataToValidate = {
        ...formData,
        registrationDeadline: formData.registrationDeadline || undefined,
      };

      const result = collaborationFormSchema
        .omit({ roles: true })
        .safeParse(dataToValidate);

      console.log("=== SUBMITTING FIRST FORM (Steps 1-3) ===");
      console.log("Data being validated:", dataToValidate);
      console.log("Validation result:", result);

      if (!result.success) {
        const errors: Record<string, string> = {};
        console.error("Validation failed with issues:");
        result.error.issues.forEach((issue, index) => {
          const fieldName = issue.path.join(".");
          errors[fieldName] = issue.message;
          console.error(
            `  ${index + 1}. Field "${fieldName}": ${issue.message}`
          );
        });
        console.log("Full error object:", result.error);
        setFieldErrors(errors);
        toast.error("Please fix validation errors before submitting");
        return;
      }

      console.log("Validation passed! Payload:", result.data);

      setFieldErrors({});
      setIsSubmitting(true);

      try {
        const payload = result.data;

        const apiPayload = {
          collaborationDetails: {
            nameEn: payload.projectTitle,
            nameAr: payload.projectTitle,
            description: payload.description,
            icon: (parseInt(payload.projectIcon) || 1) as
              | 1
              | 2
              | 3
              | 4
              | 5
              | 6
              | 7
              | 8
              | 9
              | 10
              | 11
              | 12,
            startDate:
              payload.registrationDeadline?.toISOString() ||
              new Date().toISOString(),
            endDate:
              payload.registrationDeadline?.toISOString() ||
              new Date().toISOString(),
            registerationDeadline: payload.registrationDeadline?.toISOString(),
            requiredMissions: 1,
            xpReward: payload.xpReward,
            points: payload.gemsPoints,
            money: payload.money,
          },
          goals: payload.goals.map((goal) => ({ description: goal.text })),
          requirements: payload.requirements.map((req) => ({
            description: req.text,
          })),
        };

        if (mode === "edit" && createdCollaborationId) {
          console.log("[DEBUG] Updating collaboration:", apiPayload);
          // Include the collaboration ID in the payload for updates
          const updatePayload = {
            ...apiPayload,
            collaborationDetails: {
              ...apiPayload.collaborationDetails,
              id: createdCollaborationId,
            },
          };
          console.log("[DEBUG] Update payload with ID:", updatePayload);
          await updateCollaboration.mutateAsync(updatePayload);
          console.log("[DEBUG] Collaboration updated successfully");
          toast.success("Collaboration updated successfully!");
          setIsSubmitting(false);
          return;
        } else {
          console.log(
            "[DEBUG] Creating collaboration with payload:",
            apiPayload
          );
          const newCollaborationId =
            await createCollaboration.mutateAsync(apiPayload);
          console.log("[DEBUG] Created collaboration, ID:", newCollaborationId);

          if (newCollaborationId) {
            console.log("[DEBUG] Redirecting to edit page, step 4");
            toast.success(
              "Collaboration created! Redirecting to add roles and team."
            );
            router.push(
              `/admin/collaborations/${newCollaborationId}/edit?step=4`
            );
          } else {
            console.error("[DEBUG] No collaboration ID returned from API");
            toast.error("Failed to get collaboration ID from server");
          }
        }
      } catch (error) {
        console.error(
          mode === "edit"
            ? "Failed to update collaboration:"
            : "Failed to create collaboration:",
          error
        );
        toast.error(
          mode === "edit"
            ? "Failed to update collaboration. Please try again."
            : "Failed to create collaboration. Please try again."
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [
      formData,
      mode,
      createdCollaborationId,
      createCollaboration,
      router,
      updateCollaboration,
    ]
  );

  const handleSubmitSecondForm = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      console.log("=== SUBMITTING SECOND FORM (Step 4 - Roles) ===");
      console.log("createdCollaborationId:", createdCollaborationId);

      if (!createdCollaborationId) {
        console.error(
          "No collaboration ID found. createdCollaborationId:",
          createdCollaborationId
        );
        toast.error("No collaboration ID found. Please start over.");
        return;
      }

      const dataToValidate = {
        ...formData,
        registrationDeadline: formData.registrationDeadline || undefined,
      };

      const result = step4Schema.safeParse(dataToValidate);

      console.log("=== SUBMITTING SECOND FORM (Step 4 - Roles) ===");
      console.log("Data being validated:", dataToValidate);
      console.log("Collaboration ID:", createdCollaborationId);

      if (!result.success) {
        const errors: Record<string, string> = {};
        console.error("Validation failed with issues:");

        // Group errors by role for better user feedback
        const roleErrors: Record<string, string[]> = {};

        result.error.issues.forEach((issue, index) => {
          const fieldName = issue.path.join(".");
          errors[fieldName] = issue.message;

          // Group role-specific errors
          if (fieldName.startsWith("roles.")) {
            const roleMatch = fieldName.match(/roles\.(\d+)\./);
            if (roleMatch) {
              const roleIndex = roleMatch[1];
              if (!roleErrors[roleIndex]) {
                roleErrors[roleIndex] = [];
              }
              roleErrors[roleIndex].push(issue.message);
            }
          }

          console.error(
            `  ${index + 1}. Field "${fieldName}": ${issue.message}`
          );
        });

        // Show specific error messages for roles
        Object.entries(roleErrors).forEach(([roleIndex, errors]) => {
          const roleNumber = parseInt(roleIndex) + 1;
          toast.error(`Role ${roleNumber}: ${errors[0]}`);
        });

        console.log("Full error object:", result.error);
        setFieldErrors(errors);

        // If there are no role-specific errors, show a general message
        if (Object.keys(roleErrors).length === 0) {
          toast.error("Please fix validation errors before submitting");
        }

        return;
      }

      console.log("Validation passed! Roles payload:", result.data.roles);

      setFieldErrors({});
      setIsSubmitting(true);

      try {
        const payload = result.data;

        // Additional validation: ensure all roles have valid data
        const invalidRoles = payload.roles.filter((role) => {
          return (
            !role.category ||
            !role.roleDescription ||
            role.teamCapacity < 1 ||
            !role.responsibilities ||
            role.responsibilities.length === 0 ||
            role.responsibilities.some((resp) => !resp.text) ||
            !role.assignMentor
          );
        });

        if (invalidRoles.length > 0) {
          toast.error(
            "Please ensure all roles have complete information before submitting"
          );
          return;
        }

        const rolesPayload = payload.roles.map((role) => ({
          collaborationRole: {
            id: 0, // API might expect id
            description: role.roleDescription,
            categoryId: parseInt(role.category) || 0,
            mentorId: parseInt(role.assignMentor) || 0,
            teamCapacity: role.teamCapacity,
            collaborationId: createdCollaborationId,
          },
          tools: role.toolsRequired
            .map((t) => parseInt(t))
            .filter((t) => !isNaN(t)),
          responsibilities: role.responsibilities.map((r) => ({
            id: 0, // API might expect id
            description: r.text,
          })),
        }));

        console.log("Adding roles:", rolesPayload);
        console.log("Individual role data:", rolesPayload[0]);

        for (const roleData of rolesPayload) {
          console.log("Submitting role data:", roleData);
          await addRole.mutateAsync(roleData);
        }

        toast.success("Roles and team added successfully!");
        setFormData(getInitialFormData());
        setCurrentStep(1);
        setCreatedCollaborationId(null);
        router.push("/admin/collaborations");
      } catch (error) {
        console.error("Failed to update roles:", error);
        toast.error("Failed to add roles. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, createdCollaborationId, router, setFieldErrors, addRole]
  );

  const canProceedToNextStep = useCallback(() => {
    let result;

    const dataToValidate = {
      ...formData,
      registrationDeadline: formData.registrationDeadline || undefined,
    };

    switch (currentStep) {
      case 1:
        result = step1Schema.safeParse(dataToValidate);
        break;
      case 2:
        result = step2Schema.safeParse(dataToValidate);
        break;
      case 3:
        result = step3Schema.safeParse(dataToValidate);
        break;
      default:
        return { success: true, message: null as string | null };
    }

    if (result.success) {
      return { success: true, message: null as string | null };
    }

    const errors: Record<string, string> = {};
    result.error.issues.forEach((issue) => {
      const fieldName = issue.path.join(".");
      errors[fieldName] = issue.message;
    });
    setFieldErrors(errors);

    const message =
      result.error.issues[0]?.message ?? "Please complete required fields";
    return { success: false, message };
  }, [currentStep, formData]);

  const handleUpdateAndNext = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!createdCollaborationId) {
        toast.error("No collaboration ID found. Please start over.");
        return;
      }

      const dataToValidate = {
        ...formData,
        registrationDeadline: formData.registrationDeadline || undefined,
      };

      const result = collaborationFormSchema
        .omit({ roles: true })
        .safeParse(dataToValidate);

      console.log("=== SUBMITTING UPDATE AND NEXT ===");
      console.log("Data being validated:", dataToValidate);

      if (!result.success) {
        const errors: Record<string, string> = {};
        console.error("Validation failed with issues:");
        result.error.issues.forEach((issue, index) => {
          const fieldName = issue.path.join(".");
          errors[fieldName] = issue.message;
          console.error(
            `  ${index + 1}. Field "${fieldName}": ${issue.message}`
          );
        });
        console.log("Full error object:", result.error);
        setFieldErrors(errors);
        toast.error("Please fix validation errors before submitting");
        return;
      }

      console.log("Validation passed! Payload:", result.data);

      setFieldErrors({});
      setIsSubmitting(true);

      try {
        const payload = result.data;

        const apiPayload = {
          collaborationDetails: {
            nameEn: payload.projectTitle,
            nameAr: payload.projectTitle,
            description: payload.description,
            icon: (parseInt(payload.projectIcon) || 1) as
              | 1
              | 2
              | 3
              | 4
              | 5
              | 6
              | 7
              | 8
              | 9
              | 10
              | 11
              | 12,
            startDate:
              payload.registrationDeadline?.toISOString() ||
              new Date().toISOString(),
            endDate:
              payload.registrationDeadline?.toISOString() ||
              new Date().toISOString(),
            registerationDeadline: payload.registrationDeadline?.toISOString(),
            requiredMissions: 1,
            xpReward: payload.xpReward,
            points: payload.gemsPoints,
            money: payload.money,
            id: createdCollaborationId,
          },
          goals: payload.goals.map((goal) => ({ description: goal.text })),
          requirements: payload.requirements.map((req) => ({
            description: req.text,
          })),
        };

        await updateCollaboration.mutateAsync(apiPayload);
        console.log("[DEBUG] Collaboration updated successfully");
        toast.success("Collaboration updated successfully!");

        // Move to next step
        setFieldErrors({});
        setCurrentStep((p) => p + 1);
      } catch (error) {
        console.error("Failed to update collaboration:", error);
        toast.error("Failed to update collaboration. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, createdCollaborationId, updateCollaboration]
  );

  const handleContinue = useCallback(() => {
    const { success, message } = canProceedToNextStep();

    if (success) {
      setFieldErrors({});
      setCurrentStep((p) => p + 1);
    } else {
      toast.error(
        message ?? "Please complete required fields before continuing"
      );
    }
  }, [canProceedToNextStep]);

  const handleBack = useCallback(() => {
    if (currentStep === 4) {
      setCurrentStep(3);
      return;
    }
    setCurrentStep((prev) => Math.max(1, prev - 1));
  }, [currentStep]);

  return {
    currentStep,
    formData,
    fieldErrors,
    setFieldErrors,
    isSubmitting,
    createdCollaborationId,
    setFormData,
    setCurrentStep,
    handleContinue,
    handleBack,
    handleSubmitFirstForm,
    handleSubmitSecondForm,
    handleUpdateAndNext,
  };
};
