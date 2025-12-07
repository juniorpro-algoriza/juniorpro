"use client";

import { useState, useCallback, FormEvent, Fragment, useEffect } from "react";
import { Animate, Button, MainCard, Modal } from "@components";
import { FormStepper } from "@components/client";
import { ArrowRight } from "lucide-react";
import { CloseButton } from "@headlessui/react";
import { useSearchParams } from "next/navigation";
import {
  stepData,
  StepInfo,
  StepPricing,
  StepFeatures,
  PlanFormData,
  Feature,
  PlanPreview,
} from "../../../(pages)/(loged-in)/admin/subscription/components/CreateEditPlanComponents";
import { getFeatures } from "../../../(pages)/(loged-in)/admin/server/getFeaturesData";
import { toast } from "sonner";

const getInitialFormData = (): PlanFormData => ({
  planName: "",
  description: "",
  isActive: true,
  monthlyPrice: 0,
  yearlyPrice: 0,
  features: [],
});

export const CreateEditPlan = () => {
  const searchParams = useSearchParams();
  const planId = searchParams.get("planId");
  const isEditing = !!planId;

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<PlanFormData>(getInitialFormData());
  const [features, setFeatures] = useState<Feature[]>([]);

  useEffect(() => {
    const loadFeatures = async () => {
      try {
        const data = await getFeatures();
        console.log("Features data:", data);
        if (Array.isArray(data)) {
          setFeatures(data);
        }
      } catch (error) {
        console.error("Failed to load features:", error);
        toast.error("Failed to load features");
      }
    };
    loadFeatures();
  }, []);

  /** -------------------- Form Submission -------------------- **/
  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log("Plan Submission Data:", formData);
      toast.success("Plan created successfully!");
    },
    [formData]
  );

  /** -------------------- Step Validation -------------------- **/
  const canProceedToNextStep = useCallback(() => {
    switch (currentStep) {
      case 1:
        return (
          formData.planName.trim() !== "" && formData.description.trim() !== ""
        );
      case 2:
        return formData.monthlyPrice >= 0 && formData.yearlyPrice >= 0;
      case 3:
        return true; // Features step - no validation for now
      default:
        return true;
    }
  }, [currentStep, formData]);

  const handleContinue = useCallback(() => {
    if (true) {
      setCurrentStep((p) => p + 1);
    } else {
      toast.warning("Please complete required fields before continuing");
    }
  }, [canProceedToNextStep]);

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
            <StepInfo formData={formData} setFormData={setFormData} />
          )}
          {currentStep === 2 && (
            <StepPricing formData={formData} setFormData={setFormData} />
          )}
          {currentStep === 3 && (
            <StepFeatures
              formData={formData}
              setFormData={setFormData}
              features={features}
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
          >
            Submit <ArrowRight className="size-5" />
          </Button>
        )}
      </div>
    </Modal>
  );
};
