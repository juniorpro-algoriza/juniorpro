"use client";

import { Fragment } from "react";
import { Animate, Button, Modal } from "@components";
import { FormStepper } from "@components/client";
import { ArrowRight } from "lucide-react";
import { CloseButton } from "@headlessui/react";
import { useSearchParams, useParams } from "next/navigation";
import {
  StepGuide,
  StepInfo,
  StepResources,
  StepCriteria,
  StepSolution,
  stepData,
} from "../../../(pages)/(loged-in)/admin/paths/_components/CreateEditMissionComponents";
import { useCreateEditMission } from "../../../(pages)/(loged-in)/admin/paths/_hooks/useCreateEditMission";

export const CreateEditMission = () => {
  const searchParams = useSearchParams();
  const params = useParams();
  const missionId = searchParams.get("missionId");
  const pathId = params.id
    ? Array.isArray(params.id)
      ? params.id[0]
      : params.id
    : null; // Convert ParamValue to string | null

  const {
    currentStep,
    formData,
    fieldErrors,
    lookupData,
    isEditing,
    isSubmitting,
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
    setCurrentStep,
  } = useCreateEditMission(missionId, pathId);

  return (
    <Modal panelClassName="w-full max-w-2xl p-6 bg-white rounded-2xl shadow-xl max-h-[95dvh] overflow-auto">
      <form
        id="create-mission-form"
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <div className="border-b border-gray-100 pb-2 space-y-5">
          <h2 className="text-xl font-semibold text-gray-900">
            {isEditing ? "Edit Mission" : "Create New Mission"}
          </h2>
          <FormStepper
            steps={stepData}
            value={currentStep}
            onClick={setCurrentStep}
          />
        </div>

        <Animate>
          {currentStep === 1 && (
            <StepInfo
              formData={formData}
              updateBasicInfo={updateBasicInfo}
              fieldErrors={fieldErrors}
              durationOptions={lookupData.duration}
              skillsOptions={lookupData.skills}
              levelsOptions={lookupData.levels}
            />
          )}
          {currentStep === 2 && (
            <StepGuide
              guideSteps={formData.guideSteps}
              addGuideStep={addGuideStep}
              removeGuideStep={removeGuideStep}
              updateGuideStep={updateGuideStep}
              fieldErrors={fieldErrors}
            />
          )}
          {currentStep === 3 && (
            <StepResources
              resources={formData.resources}
              addResource={addResource}
              updateResource={updateResource}
              removeResource={removeResource}
              durationOptions={lookupData.duration}
              fieldErrors={fieldErrors}
            />
          )}
          {currentStep === 4 && (
            <StepCriteria
              criteria={formData.criteria}
              addCriteria={addCriteria}
              updateCriteria={updateCriteria}
              removeCriteria={removeCriteria}
              fieldErrors={fieldErrors}
            />
          )}
          {currentStep === 5 && (
            <StepSolution
              solutionCode={formData.solutionCode}
              updateSolution={updateSolution}
              fieldErrors={fieldErrors}
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
            key="cancel-button"
          >
            Cancel
          </Button>
        </CloseButton>

        <div className="flex gap-2">
          {currentStep > 1 && (
            <Button
              intent="main"
              size="mainDefault"
              onClick={handleBack}
              type="button"
              key="back-button"
            >
              Back
            </Button>
          )}

          {currentStep !== 5 ? (
            <Button
              intent="main2"
              size="mainDefault"
              onClick={handleContinue}
              type="button"
              key="continue-button"
            >
              Continue <ArrowRight className="size-5" />
            </Button>
          ) : (
            <Button
              intent="main2"
              size="mainDefault"
              type="submit"
              form="create-mission-form"
              disabled={isSubmitting}
              key="submit-button"
            >
              {isSubmitting ? "Submitting..." : "Submit"}{" "}
              <ArrowRight className="size-5" />
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};
