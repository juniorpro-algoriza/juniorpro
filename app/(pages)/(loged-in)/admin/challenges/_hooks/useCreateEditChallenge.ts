"use client";

import { useState, useCallback, FormEvent } from "react";
import { toast } from "sonner";
import {
  challengeFormSchema,
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
  ChallengeFormValues,
} from "../_schema/challenge.schema";
import { ChallengeFormData } from "../_components/types";

const getInitialFormData = (): ChallengeFormData => ({
  // Step 1: Overview
  projectTitle: "",
  description: "",
  challengeType: "",
  difficultyLevel: "",
  category: "",
  skills: [],

  startDateTime: null,
  endDateTime: null,
  registrationDeadline: null,

  icon: "",
  kpPoints: 0,
  gems: 0,

  isPremium: false,
  pointsCost: undefined,
  isSubscriptionOnly: false,

  judges: [{ id: Date.now().toString(), email: "" }],

  // Step 2: How to Complete
  instructions: [{ id: Date.now().toString(), text: "" }],

  // Step 3: Requirements
  evaluationCriteria: [{ id: Date.now().toString(), name: "", weight: 0 }],
  requirements: [{ id: Date.now().toString(), text: "" }],
  successCriteria: [{ id: Date.now().toString(), text: "" }],

  // Step 4: Prizes
  prizes: [
    {
      id: Date.now().toString(),
      rank: 1,
      money: 1000,
      xp: undefined,
      gems: undefined,
      label: "",
    },
  ],
  participationGems: 50,
});

export const useCreateEditChallenge = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] =
    useState<ChallengeFormData>(getInitialFormData());
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
        registrationDeadline: formData.registrationDeadline || undefined,
      };

      const result = challengeFormSchema.safeParse(dataToValidate);

      if (!result.success) {
        const errors: Record<string, string> = {};
        result.error.issues.forEach((issue) => {
          const fieldName = issue.path.join(".");
          errors[fieldName] = issue.message;
        });
        setFieldErrors(errors);
        console.error("Challenges validation failed:", result.error.issues);
        toast.error("Please fix validation errors before submitting");
        return;
      }

      setFieldErrors({});
      setIsSubmitting(true);

      try {
        const payload: ChallengeFormValues = result.data as ChallengeFormValues;

        // TODO: Implement API call
        console.log("Submitting challenges:", payload);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        toast.success("Challenges created successfully!");

        // Reset form
        setFormData(getInitialFormData());
        setCurrentStep(1);
      } catch (error) {
        console.error("Failed to create challenges:", error);
        toast.error("Failed to create challenges. Please try again.");
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

    // Special handling for array errors in nested paths (ui might not show them directly if not wired)
    // But setting fieldErrors should propagate to components if they check them.

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
