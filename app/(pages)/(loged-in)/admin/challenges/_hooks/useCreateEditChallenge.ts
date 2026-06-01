"use client";

import { useState, useCallback, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  challengeFormSchema,
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
} from "../_schema/challenge.schema";
import { ChallengeFormData } from "../_components/types";
import {
  useCreateAdminChallenge,
  useUpdateAdminChallenge,
} from "../../tanstack/challenges";
import { components } from "../../../../../../api-schema";

type AddChallengeRequest =
  components["schemas"]["Sawiha.Services.DTO.AdminChallengeModels.Add.AddChallengeRequest"];

type PersistedChallengeItemIds = {
  guideSteps: Set<string>;
  goals: Set<string>;
  requirements: Set<string>;
  evaluations: Set<string>;
  prizes: Set<string>;
};

const createPersistedIdSet = <T extends { id: string }>(items?: T[]) =>
  new Set(
    (items || [])
      .map((item) => item.id)
      .filter((id) => {
        const numericId = Number(id);
        return Number.isInteger(numericId) && numericId > 0;
      })
  );

const createPersistedIds = (
  initialData?: Partial<ChallengeFormData>
): PersistedChallengeItemIds => ({
  guideSteps: createPersistedIdSet(initialData?.guideSteps),
  goals: createPersistedIdSet(initialData?.goals),
  requirements: createPersistedIdSet(initialData?.requirements),
  evaluations: createPersistedIdSet(initialData?.evaluations),
  prizes: createPersistedIdSet(initialData?.prizes),
});

const getPersistedId = (id: string, persistedIds: Set<string>) =>
  persistedIds.has(id) ? Number(id) : 0;

const getInitialFormData = (
  initialData?: Partial<ChallengeFormData>
): ChallengeFormData => ({
  nameEn: "",
  nameAr: "",
  description: "",
  levelId: null,
  categoryId: null,
  juniorsCapacity: 0,
  startDate: null,
  endDate: null,
  registerationDeadline: null,
  icon: null,
  accessCostType: 1,

  guideSteps: [{ id: Date.now().toString(), description: "" }],
  goals: [{ id: (Date.now() + 1).toString(), description: "" }],

  requirements: [{ id: (Date.now() + 2).toString(), description: "" }],
  evaluations: [],

  prizes: [
    {
      id: (Date.now() + 3).toString(),
      rank: 1,
      titleEn: "",
      xp: 0,
      points: 0,
    },
  ],
  ...initialData,
});

function mapFormToApiPayload(
  formData: ChallengeFormData,
  persistedIds?: PersistedChallengeItemIds
): AddChallengeRequest {
  return {
    challengeDetails: {
      id: formData.id || undefined,
      nameEn: formData.nameEn,
      nameAr: formData.nameAr || formData.nameEn,
      description: formData.description,
      levelId: formData.levelId || undefined,
      categoryId: formData.categoryId || undefined,
      juniorsCapacity: formData.juniorsCapacity,
      startDate: formData.startDate?.toISOString(),
      endDate: formData.endDate?.toISOString(),
      registerationDeadline:
        formData.registerationDeadline?.toISOString() || undefined,
      icon: (formData.icon || 1) as
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
      accessCostType: (formData.accessCostType || 1) as 1 | 2 | 3,
    },
    guideSteps: formData.guideSteps
      .filter((s) => s.description.trim())
      .map((s) => ({
        id: persistedIds
          ? getPersistedId(s.id, persistedIds.guideSteps)
          : undefined,
        description: s.description,
      })),
    goals: formData.goals
      .filter((g) => g.description.trim())
      .map((g) => ({
        id: persistedIds ? getPersistedId(g.id, persistedIds.goals) : undefined,
        description: g.description,
      })),
    requirements: formData.requirements
      .filter((r) => r.description.trim())
      .map((r) => ({
        id: persistedIds
          ? getPersistedId(r.id, persistedIds.requirements)
          : undefined,
        description: r.description,
      })),
    evaluations: formData.evaluations
      .filter((e) => e.titleEn.trim())
      .map((e) => ({
        id: persistedIds
          ? getPersistedId(e.id, persistedIds.evaluations)
          : undefined,
        titleEn: e.titleEn,
        titleAr: e.titleAr || e.titleEn,
        description: e.description || "",
        percentage: e.percentage,
      })),
    prizeDistributions: formData.prizes.map((p, index) => ({
      id: persistedIds ? getPersistedId(p.id, persistedIds.prizes) : undefined,
      titleEn: p.titleEn,
      titleAr: p.titleAr || p.titleEn,
      xp: p.xp,
      points: p.points,
      rank: (index + 1) as 1 | 2 | 3 | 4 | 5 | 6,
    })),
  };
}

export const useCreateEditChallenge = (options?: {
  initialData?: Partial<ChallengeFormData>;
  challengeId?: number;
}) => {
  const router = useRouter();
  const isEditMode = !!options?.challengeId;

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<ChallengeFormData>(
    getInitialFormData(options?.initialData)
  );
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createMutation = useCreateAdminChallenge();
  const updateMutation = useUpdateAdminChallenge();
  const persistedIds = createPersistedIds(options?.initialData);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const dataToValidate = {
        ...formData,
        startDate: formData.startDate || undefined,
        endDate: formData.endDate || undefined,
        registerationDeadline: formData.registerationDeadline || undefined,
        levelId: formData.levelId || 0,
        categoryId: formData.categoryId || 0,
        icon: formData.icon || 0,
      };

      const result = challengeFormSchema.safeParse(dataToValidate);

      if (!result.success) {
        const errors: Record<string, string> = {};
        result.error.issues.forEach((issue) => {
          const fieldName = issue.path.join(".");
          errors[fieldName] = issue.message;
        });
        setFieldErrors(errors);
        toast.error("Please fix validation errors before submitting");
        return;
      }

      setFieldErrors({});
      setIsSubmitting(true);

      try {
        const payload = mapFormToApiPayload(
          formData,
          isEditMode ? persistedIds : undefined
        );

        if (isEditMode) {
          console.log("Update challenge payload:", payload);
          await updateMutation.mutateAsync(payload);
          toast.success("Challenge updated successfully!");
        } else {
          await createMutation.mutateAsync(payload);
          toast.success("Challenge created successfully!");
        }

        router.push("/admin/challenges");
      } catch (error) {
        console.error("Failed to save challenge:", error);
        let message = isEditMode
          ? "Failed to update challenge"
          : "Failed to create challenge";
        try {
          const parsed = JSON.parse(
            error instanceof Error ? error.message : ""
          );
          if (parsed.errorMessage) message = parsed.errorMessage;
        } catch {
          // use default message
        }
        toast.error(message);
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, isEditMode, persistedIds, createMutation, updateMutation, router]
  );

  const canProceedToNextStep = useCallback(() => {
    const dataToValidate = {
      ...formData,
      startDate: formData.startDate || undefined,
      endDate: formData.endDate || undefined,
      registerationDeadline: formData.registerationDeadline || undefined,
      levelId: formData.levelId || 0,
      categoryId: formData.categoryId || 0,
      icon: formData.icon || 0,
    };

    let result;
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
    isEditMode,
    setFormData,
    setCurrentStep,
    handleContinue,
    handleBack,
    handleSubmit,
  };
};
