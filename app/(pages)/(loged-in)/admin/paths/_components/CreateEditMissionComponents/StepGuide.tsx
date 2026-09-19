import { Button, Input, MainCard, CodeEditor } from "@components";
import { Plus, XIcon } from "lucide-react";
import { GuideStep } from "./types";

interface StepGuideProps {
  guideSteps: GuideStep[];
  addGuideStep: () => void;
  removeGuideStep: (id: string) => void;
  updateGuideStep: (id: string, key: keyof GuideStep, value: string) => void;
  fieldErrors?: Record<string, string>;
}

export const StepGuide = ({
  guideSteps,
  addGuideStep,
  removeGuideStep,
  updateGuideStep,
  fieldErrors = {},
}: StepGuideProps) => (
  <div className="space-y-2 max-h-[550px] overflow-y-auto">
    <div className="flex items-center justify-between flex-wrap gap-3">
      <h3 className="font-semibold text-lg">Step-by-Step Guide</h3>
      <Button
        intent="main"
        size="mainDefault"
        type="button"
        className="!cursor-pointer"
        onClick={addGuideStep}
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Step
      </Button>
    </div>

    <div className="space-y-4">
      {guideSteps.map((step, index) => (
        <MainCard key={step.id} classname="p-4 relative">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium">Step {index + 1}</h4>
            {guideSteps.length > 1 && (
              <button
                type="button"
                onClick={() => removeGuideStep(step.id)}
                className="text-gray-400 hover:text-red-500 cursor-pointer"
              >
                <XIcon className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="space-y-3">
            <Input
              label="Title"
              name={`steps[${index}][titleEn]`}
              value={step.titleEn}
              onChange={(e) =>
                updateGuideStep(step.id, "titleEn", e.target.value)
              }
              placeholder="e.g., Setup Environment"
              error={fieldErrors[`steps.${index}.titleEn`]}
            />
            <Input
              label="Description"
              name={`steps[${index}][description]`}
              value={step.description}
              onChange={(e) =>
                updateGuideStep(step.id, "description", e.target.value)
              }
              placeholder="Describe the step..."
              error={fieldErrors[`steps.${index}.description`]}
            />
            <CodeEditor
              label="Code Reference"
              optionalHint="Optional"
              value={step.codeReference}
              onChange={(code) =>
                updateGuideStep(step.id, "codeReference", code)
              }
              placeholder="// Code helper for this step..."
              minHeight="140px"
              showLanguageSelect={false}
              showStatusBar={false}
            />
          </div>
        </MainCard>
      ))}
    </div>
  </div>
);
