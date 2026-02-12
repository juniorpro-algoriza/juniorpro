"use client";
import { FormStepper } from "@components/client";
import React from "react";
import { Button, MainCard } from "@components";
import { ArrowRight } from "lucide-react";
import { StepOverview } from "./StepOverview";
import { StepProjectDetails } from "./StepProjectDetails";
import { StepRolesTeam } from "./StepRolesTeam";
import { StepRequirements } from "./StepRequirements";
import { useCreateEditCollaboration } from "../_hooks/useCreateEditCollaboration";
import { components } from "../../../../../../api-schema";
import { useRouter } from "next/navigation";

type GetCollaborationDetailsModel =
  components["schemas"]["Sawiha.Services.DTO.AdminCollaborationModels.GetById.GetCollaborationDetailsModel"];

const stepData = [
  { step: 1, title: "Overview" },
  { step: 2, title: "Project Details" },
  { step: 3, title: "Requirements" },
  { step: 4, title: "Roles & Team" },
];

interface CreateEditCollaborationProps {
  mode?: "create" | "edit";
  initialData?: GetCollaborationDetailsModel;
  collaborationId?: number;
  initialStep?: number;
}

export const CreateEditCollaboration = ({
  mode = "create",
  initialData,
  collaborationId,
  initialStep = 1,
}: CreateEditCollaborationProps) => {
  const router = useRouter();
  const {
    currentStep,
    formData,
    fieldErrors,
    setFieldErrors,
    isSubmitting,
    setFormData,
    setCurrentStep,
    handleContinue,
    handleBack,
    handleSubmitFirstForm,
    handleSubmitSecondForm,
  } = useCreateEditCollaboration(
    mode,
    initialData,
    collaborationId,
    initialStep
  );

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
    // Update URL when in edit mode
    if (mode === "edit" && collaborationId) {
      router.push(`/admin/collaborations/${collaborationId}/edit?step=${step}`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-100 pb-4 space-y-5">
        <div className="text-nowrap">
          <h2 className="text-xl font-bold text-midnight">
            {mode === "edit" ? "Edit Collaboration" : "Create Collaboration"}
          </h2>
          <p className="text-gray-600 text-sm">
            Step {currentStep} of 4: {stepData[currentStep - 1].title}
          </p>
        </div>

        <FormStepper
          steps={stepData}
          value={currentStep}
          onClick={handleStepChange}
          className="scale-110"
        />
      </div>

      <form
        id="create-collaboration-form"
        onSubmit={(e) => {
          if (currentStep === 4 && mode === "edit") {
            e.preventDefault(); // Prevent form submission in edit mode step 4
            return;
          }
          return currentStep === 4
            ? handleSubmitSecondForm(e)
            : handleSubmitFirstForm(e);
        }}
        className="space-y-6"
      >
        <MainCard isAnimated classname="space-y-2">
          {currentStep === 1 && (
            <StepOverview
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
            <StepRolesTeam
              formData={formData}
              setFormData={setFormData}
              fieldErrors={fieldErrors}
              setFieldErrors={setFieldErrors}
              mode={mode}
              collaborationId={collaborationId}
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
            {currentStep === 3 ? (
              <>
                {/* Create button for create mode */}
                {mode === "create" && (
                  <Button
                    key="create-btn"
                    intent="main2"
                    size="mainDefault"
                    type="submit"
                    form="create-collaboration-form"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Creating..." : "Create Collaboration"}
                    <ArrowRight className="size-5" />
                  </Button>
                )}
                {/* Update button for edit mode */}
                {mode === "edit" && (
                  <Button
                    key="update-first-btn"
                    intent="main"
                    size="mainDefault"
                    type="submit"
                    form="create-collaboration-form"
                    disabled={isSubmitting}
                    className="mr-2"
                  >
                    {isSubmitting ? "Updating..." : "Update Collaboration"}
                  </Button>
                )}
                {/* Next button only for edit mode */}
                {mode === "edit" && (
                  <Button
                    key="continue-btn"
                    intent="main2"
                    size="mainDefault"
                    onClick={handleContinue}
                    type="button"
                  >
                    Next <ArrowRight className="size-5" />
                  </Button>
                )}
              </>
            ) : currentStep === 4 ? (
              /* In edit mode, step 4 doesn't need a submit button since roles are saved individually */
              mode === "create" ? (
                <Button
                  key="submit-second-btn"
                  intent="main2"
                  size="mainDefault"
                  type="submit"
                  form="create-collaboration-form"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Save Roles & Team"}
                  <ArrowRight className="size-5" />
                </Button>
              ) : (
                <Button
                  key="done-btn"
                  intent="main"
                  size="mainDefault"
                  onClick={() => router.push("/admin/collaborations")}
                  type="button"
                >
                  Done
                </Button>
              )
            ) : (
              <>
                {/* Update button for edit mode */}
                {mode === "edit" && currentStep < 3 && (
                  <Button
                    key="update-first-btn"
                    intent="main"
                    size="mainDefault"
                    type="submit"
                    form="create-collaboration-form"
                    disabled={isSubmitting}
                    className="mr-2"
                  >
                    {isSubmitting ? "Updating..." : "Update Collaboration"}
                  </Button>
                )}
                <Button
                  key="continue-btn"
                  intent="main2"
                  size="mainDefault"
                  onClick={handleContinue}
                  type="button"
                >
                  Next <ArrowRight className="size-5" />
                </Button>
              </>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};
