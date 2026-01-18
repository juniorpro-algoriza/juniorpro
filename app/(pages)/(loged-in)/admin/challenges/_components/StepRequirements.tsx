"use client";

import { Input } from "@components";
import {
  ChallengeFormData,
  Requirement,
  Criterion,
  EvaluationCriterion,
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
  // Evaluation Criteria Handlers
  const handleAddEvalCriterion = () => {
    const newCrit: EvaluationCriterion = {
      id: Date.now().toString(),
      name: "",
      weight: 0,
    };
    setFormData((prev) => ({
      ...prev,
      evaluationCriteria: [...(prev.evaluationCriteria || []), newCrit],
    }));
  };

  const handleRemoveEvalCriterion = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      evaluationCriteria: prev.evaluationCriteria.filter((c) => c.id !== id),
    }));
  };

  const handleEvalCriterionChange = <K extends keyof EvaluationCriterion>(
    id: string,
    field: K,
    value: EvaluationCriterion[K]
  ) => {
    setFormData((prev) => ({
      ...prev,
      evaluationCriteria: prev.evaluationCriteria.map((c) =>
        c.id === id ? { ...c, [field]: value } : c
      ),
    }));
  };

  const totalWeight = useMemo(() => {
    return (formData.evaluationCriteria || []).reduce(
      (sum, item) => sum + (Number(item.weight) || 0),
      0
    );
  }, [formData.evaluationCriteria]);

  // Requirements handlers
  const handleAddRequirement = () => {
    const newRequirement: Requirement = {
      id: Date.now().toString(),
      text: "",
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

  const handleRequirementChange = (id: string, text: string) => {
    setFormData((prev) => ({
      ...prev,
      requirements: prev.requirements.map((req) =>
        req.id === id ? { ...req, text } : req
      ),
    }));
  };

  // Success Criteria handlers
  const handleAddCriterion = () => {
    const newCriterion: Criterion = {
      id: Date.now().toString(),
      text: "",
    };
    setFormData((prev) => ({
      ...prev,
      successCriteria: [...prev.successCriteria, newCriterion],
    }));
  };

  const handleRemoveCriterion = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      successCriteria: prev.successCriteria.filter((crit) => crit.id !== id),
    }));
  };

  const handleCriterionChange = (id: string, text: string) => {
    setFormData((prev) => ({
      ...prev,
      successCriteria: prev.successCriteria.map((crit) =>
        crit.id === id ? { ...crit, text } : crit
      ),
    }));
  };

  return (
    <div className="space-y-8 py-2">
      {/* Evaluation Criteria Section */}
      <div className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">Evaluation Criteria</h3>
          <p className="text-sm text-gray-600">
            Define how submissions will be judged (weights must total 100%)
          </p>
        </div>

        <div className="space-y-3">
          {formData.evaluationCriteria &&
            formData.evaluationCriteria.map((crit, index) => (
              <div
                key={crit.id}
                className="grid grid-cols-12 gap-3 items-start"
              >
                <div className="col-span-8">
                  <Input
                    label="Criteria"
                    placeholder="Innovation & Creativity"
                    value={crit.name}
                    onChange={(e) =>
                      handleEvalCriterionChange(crit.id, "name", e.target.value)
                    }
                    error={fieldErrors[`evaluationCriteria.${index}.name`]}
                  />
                </div>
                <div className="col-span-3">
                  <Input
                    label="Weight %"
                    type="number"
                    placeholder="40"
                    value={crit.weight}
                    onChange={(e) =>
                      handleEvalCriterionChange(
                        crit.id,
                        "weight",
                        Number(e.target.value)
                      )
                    }
                    error={fieldErrors[`evaluationCriteria.${index}.weight`]}
                  />
                </div>
                <div className="col-span-1 pt-8 flex justify-center">
                  <button
                    type="button"
                    onClick={() => handleRemoveEvalCriterion(crit.id)}
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
              onClick={handleAddEvalCriterion}
              className="flex items-center gap-2 text-gray-500 hover:text-dark-blue-main font-medium px-4 py-2 border border-dashed border-gray-300 rounded-lg hover:border-dark-blue-main transition-all flex-1 mr-4 justify-center"
            >
              <Plus size={18} />
              Add Criterion
            </button>

            <div
              className={`px-4 py-2 rounded-lg font-medium text-sm ${totalWeight === 100 ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}
            >
              Total: {totalWeight}%
            </div>
          </div>
          {fieldErrors.evaluationCriteria && (
            <p className="text-red-500 text-sm mt-1">
              {fieldErrors.evaluationCriteria}
            </p>
          )}
        </div>
      </div>

      <hr className="border-gray-100" />

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
                  value={requirement.text}
                  onChange={(e) =>
                    handleRequirementChange(requirement.id, e.target.value)
                  }
                  error={fieldErrors[`requirements.${index}.text`]}
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

      {/* Success Criteria Section */}
      <div className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">Success Criteria</h3>
          <p className="text-sm text-gray-600">How will we measure success?</p>
        </div>

        <div className="space-y-3">
          {formData.successCriteria.map((criterion, index) => (
            <div key={criterion.id} className="flex gap-3">
              <div className="flex justify-center w-8 pt-3">
                <div className="w-6 h-6 rounded-full bg-dark-blue-main text-white flex items-center justify-center text-xs font-bold">
                  {index + 1}
                </div>
              </div>
              <div className="flex-1">
                <Input
                  placeholder="e.g., All calculator functions work correctly"
                  value={criterion.text}
                  onChange={(e) =>
                    handleCriterionChange(criterion.id, e.target.value)
                  }
                  error={fieldErrors[`successCriteria.${index}.text`]}
                />
              </div>
              <button
                type="button"
                onClick={() => handleRemoveCriterion(criterion.id)}
                className="mt-3 text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddCriterion}
            className="w-full py-3 border border-dashed border-gray-300 rounded-xl text-gray-500 hover:text-dark-blue-main hover:border-dark-blue-main hover:bg-indigo-50 transition-all flex items-center justify-center gap-2 font-medium"
          >
            <Plus size={18} />
            Add Criterion
          </button>
        </div>
      </div>
    </div>
  );
};
