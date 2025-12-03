"use client";

import { useState, useCallback, FormEvent, Fragment } from "react";
import { Animate, Button, Modal } from "@components";
import { ArrowRight } from "lucide-react";
import { CloseButton } from "@headlessui/react";
import { useSearchParams } from "next/navigation";
import {
  CreateEditMissionStepper,
  defaultGuideStep,
  defaultResource,
  defaultCriteria,
  GuideStep,
  Resource,
  Criteria,
  stepData,
  StepGuide,
  StepInfo,
  StepResources,
  StepCriteria,
  StepSolution,
} from "../../../(pages)/(loged-in)/admin/paths/components/CreateEditMissionComponents";
import { toast } from "sonner";

/** -------------------- Types -------------------- **/
interface MissionFormData {
  // Step 1: Basic Info
  missionName: string;
  description: string;
  duration: string | null;
  level: string;
  skills: string | null;
  // Step 2: Guide Steps (managed as array)
  guideSteps: GuideStep[];
  // Step 3: Resources (managed as array)
  resources: Resource[];
  // Step 4: Criteria (managed as array)
  criteria: Criteria[];
  // Step 5: Solution
  solutionCode: string;
}

const getInitialFormData = (): MissionFormData => ({
  missionName: "",
  description: "",
  duration: null,
  level: "",
  skills: null,
  guideSteps: [defaultGuideStep()],
  resources: [defaultResource()],
  criteria: [defaultCriteria()],
  solutionCode: "",
});

export const CreateEditMission = () => {
  const searchParams = useSearchParams();
  const missionId = searchParams.get("missionId");
  const isEditing = !!missionId;

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] =
    useState<MissionFormData>(getInitialFormData());

  /** -------------------- Basic Info Handlers -------------------- **/
  const updateBasicInfo = useCallback(
    (
      field: keyof Omit<MissionFormData, "guideSteps" | "resources">,
      value: string | null
    ) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  /** -------------------- Guide Steps Handlers -------------------- **/
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
          ? prev.guideSteps.filter((s) => s.id !== id)
          : prev.guideSteps,
    }));
  }, []);

  const updateGuideStep = useCallback(
    (id: string, key: keyof GuideStep, value: string) => {
      setFormData((prev) => ({
        ...prev,
        guideSteps: prev.guideSteps.map((s) =>
          s.id === id ? { ...s, [key]: value } : s
        ),
      }));
    },
    []
  );

  /** -------------------- Resources Handlers -------------------- **/
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
          ? prev.resources.filter((r) => r.id !== id)
          : prev.resources,
    }));
  }, []);

  const updateResource = useCallback(
    <K extends keyof Resource>(id: string, key: K, value: Resource[K]) => {
      setFormData((prev) => ({
        ...prev,
        resources: prev.resources.map((r) =>
          r.id === id ? { ...r, [key]: value } : r
        ),
      }));
    },
    []
  );

  /** -------------------- Criteria Handlers -------------------- **/
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
          ? prev.criteria.filter((c) => c.id !== id)
          : prev.criteria,
    }));
  }, []);

  const updateCriteria = useCallback((id: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      criteria: prev.criteria.map((c) =>
        c.id === id ? { ...c, label: value } : c
      ),
    }));
  }, []);

  const updateSolution = useCallback((value: string) => {
    setFormData((prev) => ({ ...prev, solutionCode: value }));
  }, []);

  /** -------------------- Form Submission -------------------- **/
  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const submissionData = {
        ...formData,
        guideSteps: formData.guideSteps.map(({ id, ...step }) => step),  // eslint-disable-line @typescript-eslint/no-unused-vars
        resources: formData.resources.map(({ id, ...resource }) => resource), // eslint-disable-line @typescript-eslint/no-unused-vars
        criteria: formData.criteria.map(({ id, ...item }) => item), // eslint-disable-line @typescript-eslint/no-unused-vars
      };
      console.log("Mission Submission Data:", submissionData);
    },
    [formData]
  );

  /** -------------------- Step Validation -------------------- **/
  const canProceedToNextStep = useCallback(() => {
    switch (currentStep) {
      case 1:
        return (
          formData.missionName.trim() !== "" &&
          formData.description.trim() !== "" &&
          formData.level.trim() !== ""
        );
      case 2:
        return formData.guideSteps.some(
          (step) => step.title.trim() !== "" || step.description.trim() !== ""
        );
      case 3:
        return formData.resources.some(
          (res) => res.title.trim() !== "" || res.url.trim() !== ""
        );
      case 4:
        return formData.criteria.some((item) => item.label.trim() !== "");
      default:
        return true;
    }
  }, [currentStep, formData]);

  const handleContinue = useCallback(() => {
    if (canProceedToNextStep()) {
      setCurrentStep((p) => p + 1);
    } else {
      toast.warning("Please complete required fields before continuing");
    }
  }, [canProceedToNextStep]);

  return (
    <Modal panelClassName="w-full max-w-2xl p-6 bg-white rounded-2xl shadow-xl max-h-[95dvh]">
      <div className="flex items-center justify-between border-b border-gray-100 pb-2 gap-3 flex-wrap">
        <div className="text-nowrap">
          <h2 className="text-xl font-bold text-midnight">
            {isEditing ? "Edit Mission" : "Create Mission"}
          </h2>
          <p className="text-gray-600 text-sm">
            Step {currentStep} of 5: {stepData[currentStep - 1].subTitle}
          </p>
        </div>

        <CreateEditMissionStepper
          steps={stepData}
          value={currentStep}
          onClick={setCurrentStep}
        />
      </div>

      <form id="create-mission-form" onSubmit={handleSubmit}>
        <Animate className="space-y-2">
          {currentStep === 1 && (
            <StepInfo formData={formData} updateBasicInfo={updateBasicInfo} />
          )}
          {currentStep === 2 && (
            <StepGuide
              guideSteps={formData.guideSteps}
              addGuideStep={addGuideStep}
              removeGuideStep={removeGuideStep}
              updateGuideStep={updateGuideStep}
            />
          )}
          {currentStep === 3 && (
            <StepResources
              resources={formData.resources}
              addResource={addResource}
              updateResource={updateResource}
              removeResource={removeResource}
            />
          )}
          {currentStep === 4 && (
            <StepCriteria
              criteria={formData.criteria}
              addCriteria={addCriteria}
              updateCriteria={updateCriteria}
              removeCriteria={removeCriteria}
            />
          )}
          {currentStep === 5 && (
            <StepSolution
              solutionCode={formData.solutionCode}
              updateSolution={updateSolution}
            />
          )}
        </Animate>
      </form>

      <div className="flex items-center justify-between border-t border-gray-100 pt-3">
        <CloseButton as={Fragment}>
          <Button
            intent="main"
            size="mainDefault"
            className="text-dark-electric-blue"
          >
            Cancel
          </Button>
        </CloseButton>

        {currentStep !== 5 ? (
          <Button
            intent="main2"
            size="mainDefault"
            onClick={handleContinue}
            type="button"
          >
            CONTINUE <ArrowRight className="size-5" />
          </Button>
        ) : (
          <Button
            intent="main2"
            size="mainDefault"
            type="submit"
            form="create-mission-form"
          >
            Submit <ArrowRight className="size-5" />
          </Button>
        )}
      </div>
    </Modal>
  );
};
