"use client";

import { useState, useCallback, useEffect, FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import {
  planFormSchema,
  step1Schema,
  step2Schema,
  step3Schema,
  PlanFormValues,
} from "../_schema";
import { useFeatures } from "../../tanstack/features/useFeatures";
import {
  useAddPackage,
  usePackageById,
  useUpdatePackage,
} from "../../tanstack/packages/usePackages";
import { PlanFormData, Feature } from "../_components/CreateEditPlanComponents";

const getInitialFormData = (): PlanFormData => ({
  planName: "",
  description: "",
  isActive: true,
  price: 0,
  durationType: 3,
  juniorCapacity: 0,
  features: [],
});

export const useCreateEditPlan = () => {
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<PlanFormData>(getInitialFormData());
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const planId = searchParams.get("planId");
  const isEditing = !!planId;

  const { data: featuresData } = useFeatures();
  const features = (featuresData as Feature[]) || [];

  const { data: planData, isLoading: isLoadingPlan } = usePackageById(
    Number(planId),
    isEditing
  );

  const { mutateAsync: addPackage, isPending: isAdding } = useAddPackage();
  const { mutateAsync: updatePackage, isPending: isUpdating } =
    useUpdatePackage();

  const isSubmitting = isAdding || isUpdating;

  useEffect(() => {
    if (planData) {
      setFormData({
        planName: planData.packageData?.nameEn ?? "",
        description: planData.packageData?.description ?? "",
        isActive: planData.packageData?.isActivated ?? true,
        price: planData.packageData?.price ?? 0,
        durationType: planData.packageData?.durationType ?? 1,
        juniorCapacity: planData.packageData?.juniorCapacity ?? 0,
        features:
          planData.features?.map((feature) => ({
            featureId: feature.featureId!,
            limitCount: feature.limitCount ?? null,
          })) || [],
      });
    }
  }, [planData]);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const result = planFormSchema.safeParse(formData);

      if (!result.success) {
        const errors: Record<string, string> = {};
        result.error.issues.forEach((issue) => {
          const fieldName = String(issue.path[0]);
          errors[fieldName] = issue.message;
        });
        setFieldErrors(errors);
        console.error("Plan validation failed:", result.error.issues);
        toast.error("Please fix validation errors before submitting");
        return;
      }

      setFieldErrors({});

      try {
        const payload: PlanFormValues = {
          ...result.data,
          ...(isEditing && planId ? { id: Number(planId) } : {}),
        };

        if (isEditing && planId) {
          await updatePackage(payload);
          toast.success("Plan updated successfully!");
        } else {
          await addPackage(payload);
          toast.success("Plan created successfully!");
        }

        // Close modal
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.delete("modal");
        currentUrl.searchParams.delete("planId");
        window.history.pushState({}, "", currentUrl.toString());
      } catch (error) {
        console.error("Failed to maintain plan:", error);
        toast.error("Failed to maintain plan. Please try again.");
      }
    },
    [formData, isEditing, planId, addPackage, updatePackage]
  );

  const canProceedToNextStep = useCallback(() => {
    let result;
    switch (currentStep) {
      case 1:
        result = step1Schema.safeParse(formData);
        break;
      case 2:
        result = step2Schema.safeParse(formData);
        break;
      case 3:
        result = step3Schema.safeParse(formData);
        break;
      default:
        return { success: true, message: null as string | null };
    }

    if (result.success) {
      return { success: true, message: null as string | null };
    }

    const errors: Record<string, string> = {};
    result.error.issues.forEach((issue) => {
      const fieldName = String(issue.path[0]);
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
    features,
    isEditing,
    isSubmitting,
    isLoadingPlan,
    setFormData,
    setCurrentStep,
    handleContinue,
    handleBack,
    handleSubmit,
  };
};
