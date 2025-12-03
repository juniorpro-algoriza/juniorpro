import { Button, Input, MainCard, CodeBlockInput } from "@components";
import { Plus, XIcon } from "lucide-react";
import { GuideStep } from "./types";

interface StepGuideProps {
  guideSteps: GuideStep[];
  addGuideStep: () => void;
  removeGuideStep: (id: string) => void;
  updateGuideStep: (id: string, key: keyof GuideStep, value: string) => void;
}

export const StepGuide = ({
  guideSteps,
  addGuideStep,
  removeGuideStep,
  updateGuideStep,
}: StepGuideProps) => (
  <div className="space-y-2 max-h-[550px] overflow-y-auto">
    <div className="flex items-center justify-between flex-wrap gap-3">
      <h3 className="font-semibold text-lg">Step-by-Step Guide</h3>
      <Button
        intent="main"
        size="mainDefault"
        type="button"
        onClick={addGuideStep}
      >
        <Plus /> Add Step
      </Button>
    </div>

    <div className="space-y-4">
      {guideSteps.map((step, index) => (
        <MainCard key={step.id} classname="p-0 border border-gray-100">
          <div className="px-5 py-3 border-b border-gray-100 text-gray-600 flex items-center justify-between gap-3 bg-[#F9FAFB80]">
            <p className="text-sm">Step {index + 1}</p>
            <XIcon
              className="size-4 cursor-pointer hover:text-red-500 transition-colors"
              onClick={() => removeGuideStep(step.id)}
            />
          </div>

          <div className="p-5 space-y-2">
            <Input
              label="Step Name"
              name={`steps[${index}][title]`}
              value={step.title}
              onChange={(e) =>
                updateGuideStep(step.id, "title", e.target.value)
              }
              placeholder="e.g., Setup Environment"
            />
            <Input
              label="Description"
              name={`steps[${index}][description]`}
              value={step.description}
              onChange={(e) =>
                updateGuideStep(step.id, "description", e.target.value)
              }
              placeholder="Describe the step..."
            />
            <CodeBlockInput
              label="Code Reference"
              name={`steps[${index}][codeReference]`}
              value={step.codeReference}
              onChange={(e) =>
                updateGuideStep(step.id, "codeReference", e.target.value)
              }
              placeholder="// Code helper for this step..."
            />
          </div>  
        </MainCard>
      ))}
    </div>
  </div>
);
