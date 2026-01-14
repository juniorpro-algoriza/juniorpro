"use client";

import { Fragment } from "react";
import { Button, MainCard, Modal } from "@components";
import { FormStepper } from "@components/client";
import { ArrowRight } from "lucide-react";
import { CloseButton } from "@headlessui/react";
import {
  stepData,
  StepInfo,
  StepPricing,
  StepFeatures,
  PlanPreview,
} from "../../../(pages)/(loged-in)/admin/subscription/_components/CreateEditPlanComponents";
import { useCreateEditPlan } from "../../../(pages)/(loged-in)/admin/subscription/_hooks/useCreateEditPlan";

export const CreateEditPlan = () => {
  const {
    currentStep,
    formData,
    fieldErrors,
    features,
    isEditing,
    isSubmitting,
    setFormData,
    setCurrentStep,
    handleContinue,
    handleBack,
    handleSubmit,
  } = useCreateEditPlan();

  return (
    <Modal panelClassName="w-full max-w-5xl p-6 bg-white rounded-2xl shadow-xl max-h-[95dvh]">
      <div className="border-b border-gray-100 pb-2 space-y-5 ">
        <div className="text-nowrap">
          <h2 className="text-xl font-bold text-midnight">
            {isEditing ? "Edit Plan" : "Create Plan"}
          </h2>
          <p className="text-gray-600 text-sm">
            Step {currentStep} of 3: {stepData[currentStep - 1].subTitle}
          </p>
        </div>

        <FormStepper
          steps={stepData}
          value={currentStep}
          onClick={setCurrentStep}
        />
      </div>

      <form
        id="create-plan-form"
        onSubmit={handleSubmit}
        className="flex items-center justify-between gap-5"
      >
        <MainCard isAnimated classname="space-y-2 flex-1">
          {currentStep === 1 && (
            <StepInfo
              formData={formData}
              setFormData={setFormData}
              fieldErrors={fieldErrors}
            />
          )}
          {currentStep === 2 && (
            <StepPricing
              formData={formData}
              setFormData={setFormData}
              fieldErrors={fieldErrors}
            />
          )}
          {currentStep === 3 && (
            <StepFeatures
              formData={formData}
              setFormData={setFormData}
              features={features}
              fieldErrors={fieldErrors}
            />
          )}
        </MainCard>
        <PlanPreview formData={formData} features={features} />
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

          {currentStep !== 3 ? (
            <Button
              key="continue-btn"
              intent="main2"
              size="mainDefault"
              onClick={handleContinue}
              type="button"
            >
              CONTINUE <ArrowRight className="size-5" />
            </Button>
          ) : (
            <Button
              key="submit-btn"
              intent="main2"
              size="mainDefault"
              type="submit"
              form="create-plan-form"
              disabled={isSubmitting}
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
