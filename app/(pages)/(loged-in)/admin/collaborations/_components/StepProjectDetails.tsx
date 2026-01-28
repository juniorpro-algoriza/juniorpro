"use client";

import { Input, Textarea } from "@components";
import { CollaborationFormData, Goal } from "./types";
import { Dispatch, SetStateAction } from "react";
import { Plus, Trash2 } from "lucide-react";

interface StepProjectDetailsProps {
  formData: CollaborationFormData;
  setFormData: Dispatch<SetStateAction<CollaborationFormData>>;
  fieldErrors?: Record<string, string>;
}

export const StepProjectDetails = ({
  formData,
  setFormData,
  fieldErrors = {},
}: StepProjectDetailsProps) => {
  const handleAddGoal = () => {
    const newGoal: Goal = { id: Date.now().toString(), text: "" };
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

  const handleGoalChange = (id: string, text: string) => {
    setFormData((prev) => ({
      ...prev,
      goals: prev.goals.map((g) => (g.id === id ? { ...g, text } : g)),
    }));
  };

  return (
    <div className="space-y-8 py-2">
      {/* What We're Building Section */}
      <div className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">What We're Building</h3>
          <p className="text-sm text-gray-600">
            Describe the project in detail
          </p>
        </div>

        <Textarea
          placeholder="Brief overview of what students will create and learn in this mission..."
          value={formData.whatWereBuilding}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              whatWereBuilding: e.target.value,
            }))
          }
          rows={6}
          error={fieldErrors.whatWereBuilding}
        />
      </div>

      {/* Key Features & Goals Section */}
      <div className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">Key Features & Goals</h3>
          <p className="text-sm text-gray-600">
            Define the main features and goals of the project
          </p>
        </div>

        <div className="space-y-3">
          {formData.goals &&
            formData.goals.map((goal, index) => (
              <div key={goal.id} className="flex gap-3 items-start">
                <span className="mt-3 text-gray-500 font-medium">
                  {index + 1}.
                </span>
                <div className="flex-1">
                  <Input
                    placeholder="e.g., Watch tutorial videos and learn the concepts"
                    value={goal.text}
                    onChange={(e) => handleGoalChange(goal.id, e.target.value)}
                    error={fieldErrors[`goals.${index}.text`]}
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
