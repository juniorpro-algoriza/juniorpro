"use client";

import { Input } from "@components";
import { CollaborationFormData, Requirement } from "./types";
import { Dispatch, SetStateAction } from "react";
import { Plus, Trash2 } from "lucide-react";

interface StepRequirementsProps {
  formData: CollaborationFormData;
  setFormData: Dispatch<SetStateAction<CollaborationFormData>>;
  fieldErrors?: Record<string, string>;
}

export const StepRequirements = ({
  formData,
  setFormData,
  fieldErrors = {},
}: StepRequirementsProps) => {
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
    </div>
  );
};
