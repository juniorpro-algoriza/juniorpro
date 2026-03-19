"use client";

import { useState, useCallback, useEffect } from "react";
import { toast } from "sonner";
import {
  GuideStep,
  Resource,
  MissionFormData,
  LookupData,
  ValidationResult,
  ValidationIssue,
  defaultGuideStep,
  defaultResource,
  defaultCriteria,
  INITIAL_FORM_DATA,
  STEP_SCHEMAS,
} from "../_components/CreateEditMissionComponents";
import { useLookup } from "../../../../../tanstack/useLookup";
import {
  useMissionById,
  useAddMission,
  useUpdateMission,
} from "../../tanstack/missions/useMissions";

export const useCreateEditMission = (
  missionId: string | null,
  pathId: string | null
) => {
  const isEditing = !!missionId;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<MissionFormData>(INITIAL_FORM_DATA);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [lookupData, setLookupData] = useState<LookupData>({
    duration: [],
    skills: [],
    levels: [],
  });

  const { data: durationData } = useLookup("/api/Lookup/Duration");
  const { data: skillsData } = useLookup("/api/Lookup/Skill");
  const { data: levelsData } = useLookup("/api/Lookup/Level");

  const { data: missionData } = useMissionById(
    missionId ? parseInt(missionId) : 0,
    isEditing
  );

  const addMissionMutation = useAddMission();
  const updateMissionMutation = useUpdateMission();

  useEffect(() => {
    if (durationData && skillsData && levelsData) {
      setLookupData({
        duration: durationData.map(({ label, value }) => ({
          label: label || "",
          value: typeof value === "string" ? parseInt(value, 10) : value,
        })),
        skills: skillsData.map(({ label, value }) => ({
          label: label || "",
          value: typeof value === "string" ? parseInt(value, 10) : value,
        })),
        levels: levelsData.map(({ label, value }) => ({
          label: label || "",
          value: typeof value === "string" ? parseInt(value, 10) : value,
        })),
      });
    }
  }, [durationData, skillsData, levelsData]);

  useEffect(() => {
    if (isEditing && missionData) {
      console.log("Mission data fetched:", missionData);
      // Transform the mission data to form format
      const transformedData: MissionFormData = {
        nameEn: missionData.missionDetails?.nameEn || "",
        nameAr: missionData.missionDetails?.nameAr || "",
        description: missionData.missionDetails?.description || "",
        durationId: missionData.missionDetails?.durationId || 0,
        levelId: missionData.missionDetails?.levelId || 0,
        skillId: missionData.missionDetails?.skillId || 0,
        xp: missionData.missionDetails?.xp || 0,
        points: missionData.missionDetails?.points || 0,
        guideSteps: missionData.steps?.map((step) => ({
          id: step.id?.toString() || crypto.randomUUID(),
          titleEn: step.titleEn || "",
          description: step.description || "",
          codeReference: step.codeReference || "",
        })) || [defaultGuideStep()],
        resources: missionData.learningResources?.map((resource) => ({
          id: resource.id?.toString() || crypto.randomUUID(),
          titleEn: resource.titleEn || "",
          type: resource.type || 1,
          url: resource.url || "",
          duration: resource.duration || null,
        })) || [defaultResource()],
        criteria: missionData.successCriterias?.map((criteria) => ({
          id: criteria.id?.toString() || crypto.randomUUID(),
          label: criteria.description || "",
        })) || [defaultCriteria()],
        solutionCode: missionData.missionDetails?.referenceAnswer || "",
      };
      setFormData(transformedData);
    }
  }, [isEditing, missionData]);

  const createStepData = useCallback(
    (formData: MissionFormData) => {
      if (!pathId) {
        throw new Error("Path ID is required for mission creation/editing");
      }

      return {
        missionDetails: {
          ...(missionId ? { id: parseInt(missionId, 10) } : {}),
          pathId: parseInt(pathId, 10),
          nameEn: formData.nameEn,
          nameAr: formData.nameEn,
          description: formData.description,
          durationId: formData.durationId,
          levelId: formData.levelId,
          skillId: formData.skillId,
          xp: formData.xp,
          points: formData.points,
          referenceAnswer: formData.solutionCode,
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        steps: formData.guideSteps.map(({ id: _id, ...step }) => step),
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        learningResources: formData.resources.map(
          ({ id: _id, ...resource }) => ({
            titleEn: resource.titleEn,
            type: resource.type,
            url: resource.url,
            duration: resource.duration ?? undefined,
          })
        ),
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        successCriterias: formData.criteria.map(({ id: _id, ...criteria }) => ({
          description: criteria.label,
        })),
      };
    },
    [pathId, missionId]
  );

  const mapValidationErrors = (
    issues: ValidationIssue[]
  ): Record<string, string> => {
    const errors: Record<string, string> = {};

    issues.forEach((issue) => {
      const path = issue.path.join(".");

      if (path.startsWith("missionDetails.")) {
        const fieldName = path.replace("missionDetails.", "");
        errors[fieldName] = issue.message;
      } else {
        errors[path] = issue.message;
      }
    });

    return errors;
  };

  const updateBasicInfo = useCallback(
    (
      field: keyof Omit<MissionFormData, "guideSteps" | "resources">,
      value: string | null | number
    ) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const updateGuideStep = useCallback(
    (id: string, key: keyof GuideStep, value: string) => {
      setFormData((prev) => ({
        ...prev,
        guideSteps: prev.guideSteps.map((step) =>
          step.id === id ? { ...step, [key]: value } : step
        ),
      }));
    },
    []
  );

  const updateResource = useCallback(
    <K extends keyof Resource>(id: string, key: K, value: Resource[K]) => {
      setFormData((prev) => ({
        ...prev,
        resources: prev.resources.map((resource) =>
          resource.id === id ? { ...resource, [key]: value } : resource
        ),
      }));
    },
    []
  );

  const updateCriteria = useCallback((id: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      criteria: prev.criteria.map((criteria) =>
        criteria.id === id ? { ...criteria, label: value } : criteria
      ),
    }));
  }, []);

  const updateSolution = useCallback((value: string) => {
    setFormData((prev) => ({ ...prev, solutionCode: value }));
  }, []);

  const addGuideStep = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      guideSteps: [...prev.guideSteps, defaultGuideStep()],
    }));
  }, []);

  const removeGuideStep = useCallback((id: string) => {
    setFormData((prev) => ({
      ...prev,
      guideSteps:
        prev.guideSteps.length > 1
          ? prev.guideSteps.filter((step) => step.id !== id)
          : prev.guideSteps,
    }));
  }, []);

  const addResource = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      resources: [...prev.resources, defaultResource()],
    }));
  }, []);

  const removeResource = useCallback((id: string) => {
    setFormData((prev) => ({
      ...prev,
      resources:
        prev.resources.length > 1
          ? prev.resources.filter((resource) => resource.id !== id)
          : prev.resources,
    }));
  }, []);

  const addCriteria = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      criteria: [...prev.criteria, defaultCriteria()],
    }));
  }, []);

  const removeCriteria = useCallback((id: string) => {
    setFormData((prev) => ({
      ...prev,
      criteria:
        prev.criteria.length > 1
          ? prev.criteria.filter((criteria) => criteria.id !== id)
          : prev.criteria,
    }));
  }, []);

  const validateStep = useCallback((): ValidationResult => {
    const stepData = createStepData(formData);
    const schema = STEP_SCHEMAS[currentStep as keyof typeof STEP_SCHEMAS];

    if (!schema) {
      return { success: true, message: null };
    }

    const result = schema.safeParse(stepData);

    if (result.success) {
      return { success: true, message: null };
    }

    const errors = mapValidationErrors(result.error.issues);

    return {
      success: false,
      message: "Please complete required fields before continuing",
      errors,
    };
  }, [currentStep, formData, createStepData]);

  const handleContinue = useCallback(() => {
    const { success, errors } = validateStep();

    if (success) {
      setFieldErrors({});
      setCurrentStep((prev) => prev + 1);
    } else {
      setFieldErrors(errors || {});
      toast.error("Please complete required fields before continuing");
    }
  }, [validateStep]);

  const handleBack = useCallback(() => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const { success, errors } = validateStep();

      if (!success) {
        setFieldErrors(errors || {});
        toast.error("Please complete required fields before submitting");
        return;
      }

      setIsSubmitting(true);
      try {
        const submissionData = createStepData(formData);

        if (isEditing && missionId) {
          // Update existing mission
          await updateMissionMutation.mutateAsync(submissionData);
          toast.success("Mission updated successfully");
        } else {
          // Create new mission
          await addMissionMutation.mutateAsync(submissionData);
          toast.success("Mission created successfully");
        }
        // Close modal by removing the modal query parameter
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.delete("modal");
        window.history.pushState({}, "", currentUrl.toString());

        // Handle successful submission (e.g., close modal, redirect)
      } catch (error) {
        console.error("Failed to submit mission:", error);
        toast.error("Failed to submit mission. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [
      validateStep,
      formData,
      isEditing,
      missionId,
      createStepData,
      addMissionMutation,
      updateMissionMutation,
    ]
  );

  const resetForm = useCallback(() => {
    setFormData(INITIAL_FORM_DATA);
    setFieldErrors({});
    setCurrentStep(1);
  }, []);

  const setCurrentStepDirect = useCallback((step: number) => {
    setCurrentStep(step);
  }, []);

  return {
    // State
    currentStep,
    formData,
    fieldErrors,
    lookupData,
    isEditing,
    isSubmitting,

    // Actions
    updateBasicInfo,
    updateGuideStep,
    updateResource,
    updateCriteria,
    updateSolution,
    addGuideStep,
    removeGuideStep,
    addResource,
    removeResource,
    addCriteria,
    removeCriteria,
    handleContinue,
    handleBack,
    handleSubmit,
    resetForm,
    setCurrentStep: setCurrentStepDirect,

    // Utilities
    validateStep,
  };
};
