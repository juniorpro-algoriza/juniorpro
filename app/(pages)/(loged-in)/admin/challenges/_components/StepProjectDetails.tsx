"use client";

import { Input } from "@components";
import { ChallengeFormData, GuideStep, Goal } from "./types";
import { Dispatch, SetStateAction } from "react";
import { Plus, Trash2 } from "lucide-react";

interface StepProjectDetailsProps {
  formData: ChallengeFormData;
  setFormData: Dispatch<SetStateAction<ChallengeFormData>>;
  fieldErrors?: Record<string, string>;
}

export const StepProjectDetails = ({
  formData,
  setFormData,
  fieldErrors = {},
}: StepProjectDetailsProps) => {
  // Guide Steps handlers
  const handleAddStep = () => {
    const newStep: GuideStep = { id: Date.now().toString(), description: "" };
    setFormData((prev) => ({
      ...prev,
      guideSteps: [...(prev.guideSteps || []), newStep],
    }));
  };

  const handleRemoveStep = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      guideSteps: prev.guideSteps.filter((s) => s.id !== id),
    }));
  };

  const handleStepChange = (id: string, description: string) => {
    setFormData((prev) => ({
      ...prev,
      guideSteps: prev.guideSteps.map((s) =>
        s.id === id ? { ...s, description } : s
      ),
    }));
  };

  // Goals handlers
  const handleAddGoal = () => {
    const newGoal: Goal = { id: Date.now().toString(), description: "" };
    setFormData((prev) => ({
      ...prev,
      goals: [...(prev.goals || []), newGoal],
    }));
  };

  const handleRemoveGoal = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      goals: prev.goals.filter((g) => g.id !== id),
    }));
  };

  const handleGoalChange = (id: string, description: string) => {
    setFormData((prev) => ({
      ...prev,
      goals: prev.goals.map((g) => (g.id === id ? { ...g, description } : g)),
    }));
  };

  return (
    <div className="space-y-8 py-2">
      {/* How to Complete Section */}
      <div className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">
            How to Complete This Challenge
          </h3>
          <p className="text-sm text-gray-600">
            Define step-by-step instructions for participants
          </p>
        </div>

        <div className="space-y-4">
          {formData.guideSteps &&
            formData.guideSteps.map((step, index) => (
              <div key={step.id} className="flex gap-3 items-start">
                <span className="mt-3 text-gray-500 font-medium">
                  {index + 1}.
                </span>
                <div className="flex-1">
                  <Input
                    placeholder="Define step-by-step instructions for participants"
                    value={step.description}
                    onChange={(e) => handleStepChange(step.id, e.target.value)}
                    error={fieldErrors[`guideSteps.${index}.description`]}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveStep(step.id)}
                  className="mt-3 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}

          <button
            type="button"
            onClick={handleAddStep}
            className="w-full py-3 border border-dashed border-gray-300 rounded-xl text-gray-500 hover:text-dark-blue-main hover:border-dark-blue-main hover:bg-indigo-50 transition-all flex items-center justify-center gap-2 font-medium"
          >
            <Plus size={18} />
            Add Step
          </button>
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Goals Section */}
      <div className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">Project Goals</h3>
          <p className="text-sm text-gray-600">
            What participants will build and achieve
          </p>
        </div>

        <div className="space-y-4">
          {formData.goals &&
            formData.goals.map((goal, index) => (
              <div key={goal.id} className="flex gap-3 items-start">
                <span className="mt-3 text-gray-500 font-medium">
                  {index + 1}.
                </span>
                <div className="flex-1">
                  <Input
                    placeholder="e.g., Develop React components and pages"
                    value={goal.description}
                    onChange={(e) => handleGoalChange(goal.id, e.target.value)}
                    error={fieldErrors[`goals.${index}.description`]}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveGoal(goal.id)}
                  className="mt-3 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}

          <button
            type="button"
            onClick={handleAddGoal}
            className="w-full py-3 border border-dashed border-gray-300 rounded-xl text-gray-500 hover:text-dark-blue-main hover:border-dark-blue-main hover:bg-indigo-50 transition-all flex items-center justify-center gap-2 font-medium"
          >
            <Plus size={18} />
            Add Goal
          </button>
        </div>
      </div>
    </div>
  );
};
