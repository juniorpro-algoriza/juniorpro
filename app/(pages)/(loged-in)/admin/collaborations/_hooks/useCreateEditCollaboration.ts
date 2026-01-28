"use client";

import { useState, useCallback, FormEvent } from "react";
import { toast } from "sonner";
import {
  collaborationFormSchema,
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
  CollaborationFormValues,
} from "../_schema/collaboration.schema";
import { CollaborationFormData } from "../_components/types";

const getInitialFormData = (): CollaborationFormData => ({
  // Step 1: Overview
  projectTitle: "",
  description: "",
  projectIcon: "",

  startDateTime: null,
  endDateTime: null,

  xpReward: 1000,
  gemsPoints: 100,
  money: 50,

  // Step 2: Project Details
  whatWereBuilding: "",
  goals: [{ id: Date.now().toString(), text: "" }],

  // Step 3: Roles & Team
  roles: [
    {
      id: Date.now().toString(),
      category: "",
      roleDescription: "",
      responsibilities: "",
      toolsRequired: [],
      assignMentor: "",
      tasks: [{ id: Date.now().toString(), text: "" }],
    },
  ],

  // Step 4: Requirements
  requirements: [{ id: Date.now().toString(), text: "" }],
});

export const useCreateEditCollaboration = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] =
    useState<CollaborationFormData>(getInitialFormData());
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // Convert formData to match schema expectations
      const dataToValidate = {
        ...formData,
        startDateTime: formData.startDateTime || undefined,
        endDateTime: formData.endDateTime || undefined,
      };

      const result = collaborationFormSchema.safeParse(dataToValidate);

      if (!result.success) {
        const errors: Record<string, string> = {};
        result.error.issues.forEach((issue) => {
          const fieldName = issue.path.join(".");
          errors[fieldName] = issue.message;
        });
        setFieldErrors(errors);
        console.error("Collaboration validation failed:", result.error.issues);
        toast.error("Please fix validation errors before submitting");
        return;
      }

      setFieldErrors({});
      setIsSubmitting(true);

      try {
        const payload: CollaborationFormValues =
          result.data as CollaborationFormValues;

        // TODO: Implement API call
        console.log("Submitting collaboration:", payload);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        toast.success("Collaboration created successfully!");

        // Reset form
        setFormData(getInitialFormData());
        setCurrentStep(1);
      } catch (error) {
        console.error("Failed to create collaboration:", error);
        toast.error("Failed to create collaboration. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData]
  );

  const canProceedToNextStep = useCallback(() => {
    let result;

    // Convert formData to match schema expectations
    const dataToValidate = {
      ...formData,
      startDateTime: formData.startDateTime || undefined,
      endDateTime: formData.endDateTime || undefined,
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
      case 4:
        result = step4Schema.safeParse(dataToValidate);
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
      result.error.issues[0]?.message ??
      "Please complete required fields before continuing";

    return { success: false, message };
  }, [currentStep, formData]);

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
    setCurrentStep((prev) => Math.max(1, prev - 1));
  }, []);

  return {
    currentStep,
    formData,
    fieldErrors,
    isSubmitting,
    setFormData,
    setCurrentStep,
    handleContinue,
    handleBack,
    handleSubmit,
  };
};
