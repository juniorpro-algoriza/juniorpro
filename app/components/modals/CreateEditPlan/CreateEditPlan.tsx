"use client";

import { useState, useCallback, FormEvent, Fragment, useEffect } from "react";
import { Button, MainCard, Modal } from "@components";
import { FormStepper } from "@components/client";
import { ArrowRight } from "lucide-react";
import { CloseButton } from "@headlessui/react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  stepData,
  StepInfo,
  StepPricing,
  StepFeatures,
  PlanFormData,
  Feature,
  PlanPreview
} from "../../../(pages)/(loged-in)/admin/subscription/components/CreateEditPlanComponents";

import { toast } from "sonner";
import { planFormSchema, step1Schema, step2Schema, step3Schema } from "../../../(pages)/(loged-in)/admin/subscription/schema";
import { getFeatures, getPackageById, postPackages, putPackages } from "../../../(pages)/(loged-in)/admin/server";

const getInitialFormData = (): PlanFormData => ({
  planName: "",
  description: "",
  isActive: true,
  price: 0,
  durationType: 1,
  juniorCapacity: 0,
  // monthlyPrice: 0,
  // yearlyPrice: 0,
  features: [],
});

export const CreateEditPlan = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const planId = searchParams.get("planId");
  const isEditing = !!planId;

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<PlanFormData>(getInitialFormData());
  const [features, setFeatures] = useState<Feature[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

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

  useEffect(() => {
    if (!isEditing || !planId) return;

    const loadPlan = async () => {
      try {
        const id = Number(planId);
        if (Number.isNaN(id)) return;

        const data = await getPackageById({ id });

        setFormData((prev) => ({
          ...prev,
          planName: data.packageData?.nameEn ?? "",
          description: data.packageData?.description ?? "",
          isActive: data.packageData?.isActivated ?? true,
          price: data.packageData?.price ?? 0,
          durationType: data.packageData?.durationType ?? 1,
          juniorCapacity: data.packageData?.juniorCapacity ?? 0,
          features: data.features?.map(feature => ({
            featureId: feature.featureId!,
            limitCount: feature.limitCount ?? null
          })) || []
        }));
      } catch (error) {
        console.error("Failed to load plan details:", error);
        toast.error("Failed to load plan details");
      }
    };

    loadPlan();
  }, [isEditing, planId]);

  /** -------------------- Form Submission -------------------- **/
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
        setIsSubmitting(true);
        const payload = {
          ...result.data,
          ...(isEditing && planId
            ? { id: Number(planId) }
            : {}),
        } as typeof result.data;

        if (isEditing && planId) {
          await putPackages({ data: payload });
          toast.success("Plan updated successfully!");
        } else {
          await postPackages({ data: payload });
          toast.success("Plan created successfully!");
        }
        router.refresh();
        // Close modal by removing the modal query parameter
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.delete('modal');
        window.history.pushState({}, '', currentUrl.toString());
      } catch (error) {
        console.error("Failed to create plan:", error);
        toast.error("Failed to create plan. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, router, isEditing, planId]
  );

  /** -------------------- Step Validation -------------------- **/
  const canProceedToNextStep = useCallback(() => {
    let result
    switch (currentStep) {
      case 1:result = step1Schema.safeParse(formData);break;
      case 2:result = step2Schema.safeParse(formData);break;
      case 3:result = step3Schema.safeParse(formData);break;
      default:return { success: true, message: null as string | null };
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

    const message = result.error.issues[0]?.message ?? "Please complete required fields before continuing";

    return { success: false, message };
  }, [currentStep, formData]);

  const handleContinue = useCallback(() => {
    const { success, message } = canProceedToNextStep();

    if (success) {
      setFieldErrors({});
      setCurrentStep((p) => p + 1);
    } else {
      toast.error(message ?? "Please complete required fields before continuing");
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
            <StepInfo formData={formData} setFormData={setFormData} fieldErrors={fieldErrors} />
          )}
          {currentStep === 2 && (
            <StepPricing formData={formData} setFormData={setFormData} fieldErrors={fieldErrors} />
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
            {isSubmitting ? "Submitting..." : "Submit"} <ArrowRight className="size-5" />
          </Button>
        )}
      </div>
    </Modal>
  );
};
