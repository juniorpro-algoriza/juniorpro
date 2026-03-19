"use client";

import { Input } from "@components";
import {
  ChallengeFormData,
  ChallengeRequirement,
  ChallengeEvaluation,
} from "./types";
import { Dispatch, SetStateAction, useMemo } from "react";
import { Plus, Trash2, X } from "lucide-react";

interface StepRequirementsProps {
  formData: ChallengeFormData;
  setFormData: Dispatch<SetStateAction<ChallengeFormData>>;
  fieldErrors?: Record<string, string>;
}

export const StepRequirements = ({
  formData,
  setFormData,
  fieldErrors = {},
}: StepRequirementsProps) => {
  // Evaluation handlers
  const handleAddEvaluation = () => {
    const newEval: ChallengeEvaluation = {
      id: Date.now().toString(),
      titleEn: "",
      percentage: 0,
    };
    setFormData((prev) => ({
      ...prev,
      evaluations: [...(prev.evaluations || []), newEval],
    }));
  };

  const handleRemoveEvaluation = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      evaluations: prev.evaluations.filter((e) => e.id !== id),
    }));
  };

  const handleEvaluationChange = <K extends keyof ChallengeEvaluation>(
    id: string,
    field: K,
    value: ChallengeEvaluation[K]
  ) => {
    setFormData((prev) => {
      if (field === "percentage") {
        const othersTotal = (prev.evaluations || [])
          .filter((e) => e.id !== id)
          .reduce((sum, e) => sum + (Number(e.percentage) || 0), 0);
        const maxAllowed = 100 - othersTotal;
        const clamped = Math.min(Math.max(Number(value) || 0, 0), maxAllowed);
        return {
          ...prev,
          evaluations: prev.evaluations.map((e) =>
            e.id === id ? { ...e, percentage: clamped } : e
          ),
        };
      }
      return {
        ...prev,
        evaluations: prev.evaluations.map((e) =>
          e.id === id ? { ...e, [field]: value } : e
        ),
      };
    });
  };

  const totalPercentage = useMemo(() => {
    return (formData.evaluations || []).reduce(
      (sum, item) => sum + (Number(item.percentage) || 0),
      0
    );
  }, [formData.evaluations]);

  // Requirements handlers
  const handleAddRequirement = () => {
    const newRequirement: ChallengeRequirement = {
      id: Date.now().toString(),
      description: "",
    };
    setFormData((prev) => ({
      ...prev,
      requirements: [...prev.requirements, newRequirement],
    }));
  };

  const handleRemoveRequirement = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      requirements: prev.requirements.filter((req) => req.id !== id),
    }));
  };

  const handleRequirementChange = (id: string, description: string) => {
    setFormData((prev) => ({
      ...prev,
      requirements: prev.requirements.map((req) =>
        req.id === id ? { ...req, description } : req
      ),
    }));
  };

  return (
    <div className="space-y-8 py-2">
      {/* Requirements Section */}
      <div className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">Requirements</h3>
          <p className="text-sm text-gray-600">
            What students need before starting
          </p>
        </div>

        <div className="space-y-3">
          {formData.requirements.map((requirement, index) => (
            <div key={requirement.id} className="flex items-start gap-3">
              <div className="flex justify-center w-8 pt-3">
                <span className="text-gray-500 font-medium">{index + 1}.</span>
              </div>
              <div className="flex-1">
                <Input
                  placeholder="e.g., Basic knowledge of HTML & CSS"
                  value={requirement.description}
                  onChange={(e) =>
                    handleRequirementChange(requirement.id, e.target.value)
                  }
                  error={fieldErrors[`requirements.${index}.description`]}
                />
              </div>
              <button
                type="button"
                onClick={() => handleRemoveRequirement(requirement.id)}
                className="mt-3 text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddRequirement}
            className="w-full py-3 border border-dashed border-gray-300 rounded-xl text-gray-500 hover:text-dark-blue-main hover:border-dark-blue-main hover:bg-indigo-50 transition-all flex items-center justify-center gap-2 font-medium"
          >
            <Plus size={18} />
            Add Requirement
          </button>
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Guidelines / Evaluation Criteria Section */}
      <div className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">Guidelines</h3>
          <p className="text-sm text-gray-600">
            Define how submissions will be judged (percentages must total 100%)
          </p>
        </div>

        <div className="space-y-3">
          {formData.evaluations &&
            formData.evaluations.map((evalItem, index) => (
              <div
                key={evalItem.id}
                className="grid grid-cols-12 gap-3 items-start"
              >
                <div className="col-span-8">
                  <Input
                    label="Criteria"
                    placeholder="Innovation & Creativity"
                    value={evalItem.titleEn}
                    onChange={(e) =>
                      handleEvaluationChange(
                        evalItem.id,
                        "titleEn",
                        e.target.value
                      )
                    }
                    error={fieldErrors[`evaluations.${index}.titleEn`]}
                  />
                </div>
                <div className="col-span-3">
                  <Input
                    label="Weight %"
                    type="number"
                    placeholder="40"
                    value={evalItem.percentage}
                    onChange={(e) =>
                      handleEvaluationChange(
                        evalItem.id,
                        "percentage",
                        Number(e.target.value)
                      )
                    }
                    error={fieldErrors[`evaluations.${index}.percentage`]}
                  />
                </div>
                <div className="col-span-1 pt-8 flex justify-center">
                  <button
                    type="button"
                    onClick={() => handleRemoveEvaluation(evalItem.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            ))}

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={handleAddEvaluation}
              className="flex items-center gap-2 text-gray-500 hover:text-dark-blue-main font-medium px-4 py-2 border border-dashed border-gray-300 rounded-lg hover:border-dark-blue-main transition-all flex-1 mr-4 justify-center"
            >
              <Plus size={18} />
              Add Guidline
            </button>

            <div
              className={`px-4 py-2 rounded-lg font-medium text-sm ${totalPercentage === 100 ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}
            >
              Total: {totalPercentage}%
            </div>
          </div>
          {fieldErrors.evaluations && (
            <p className="text-red-500 text-sm mt-1">
              {fieldErrors.evaluations}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
