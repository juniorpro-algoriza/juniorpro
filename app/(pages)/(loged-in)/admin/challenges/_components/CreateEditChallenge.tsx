"use client";
import { FormStepper } from "@components/client";
import React from "react";
import { Button, MainCard } from "@components";
import { ArrowRight } from "lucide-react";
import {
  StepBasicInfo,
  StepProjectDetails,
  StepPrizes,
  StepRequirements,
} from "./index";
import { useCreateEditChallenge } from "../_hooks/useCreateEditChallenge";

const stepData = [
  { step: 1, title: "Overview" },
  { step: 2, title: "How to Complete" },
  { step: 3, title: "Requirements" },
  { step: 4, title: "Prizes" },
];

export const CreateEditChallenge = () => {
  const {
    currentStep,
    formData,
    fieldErrors,
    isSubmitting,
    setFormData,
    setCurrentStep,
    handleContinue,
    handleBack,
    handleSubmit,
  } = useCreateEditChallenge();

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-100 pb-4 space-y-5">
        <div className="text-nowrap">
          <h2 className="text-xl font-bold text-midnight">Create Challenges</h2>
          <p className="text-gray-600 text-sm">
            Step {currentStep} of 4: {stepData[currentStep - 1].title}
          </p>
        </div>

        <FormStepper
          steps={stepData}
          value={currentStep}
          onClick={setCurrentStep}
          className="scale-110"
        />
      </div>

      <form
        id="create-challenges-form"
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <MainCard isAnimated classname="space-y-2">
          {currentStep === 1 && (
            <StepBasicInfo
              formData={formData}
              setFormData={setFormData}
              fieldErrors={fieldErrors}
            />
          )}
          {currentStep === 2 && (
            <StepProjectDetails
              formData={formData}
              setFormData={setFormData}
              fieldErrors={fieldErrors}
            />
          )}
          {currentStep === 3 && (
            <StepRequirements
              formData={formData}
              setFormData={setFormData}
              fieldErrors={fieldErrors}
            />
          )}
          {currentStep === 4 && (
            <StepPrizes
              formData={formData}
              setFormData={setFormData}
              fieldErrors={fieldErrors}
            />
          )}
        </MainCard>

        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
          <div className="flex gap-2">
            {currentStep > 1 && (
              <Button
                intent="main"
                size="mainDefault"
                onClick={handleBack}
                type="button"
                key="back-button"
              >
                Previous
              </Button>
            )}
          </div>

          <div className="flex gap-2">
            {currentStep !== 4 ? (
              <Button
                key="continue-btn"
                intent="main2"
                size="mainDefault"
                onClick={handleContinue}
                type="button"
              >
                Next <ArrowRight className="size-5" />
              </Button>
            ) : (
              <Button
                key="submit-btn"
                intent="main2"
                size="mainDefault"
                type="submit"
                form="create-challenges-form"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}{" "}
                <ArrowRight className="size-5" />
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};
