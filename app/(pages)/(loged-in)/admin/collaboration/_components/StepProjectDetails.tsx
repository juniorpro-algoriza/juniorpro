"use client";

import { Input } from "@components";
import { CollaborationFormData, Instruction } from "./types";
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
  const handleAddInstruction = () => {
    const newInstruction: Instruction = { id: Date.now().toString(), text: "" };
    setFormData((prev) => ({
      ...prev,
      instructions: [...(prev.instructions || []), newInstruction],
    }));
  };

  const handleRemoveInstruction = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      instructions: prev.instructions.filter((i) => i.id !== id),
    }));
  };

  const handleInstructionChange = (id: string, text: string) => {
    setFormData((prev) => ({
      ...prev,
      instructions: prev.instructions.map((i) =>
        i.id === id ? { ...i, text } : i
      ),
    }));
  };

  return (
    <div className="space-y-6 py-2">
      <div className="space-y-1">
        <h3 className="text-lg font-semibold">
          How to Complete This Challenge
        </h3>
        <p className="text-sm text-gray-600">
          Define step-by-step instructions for participants
        </p>
      </div>

      <div className="space-y-4">
        {formData.instructions &&
          formData.instructions.map((inst, index) => (
            <div key={inst.id} className="flex gap-3 items-start">
              <span className="mt-3 text-gray-500 font-medium">
                {index + 1}.
              </span>
              <div className="flex-1">
                <Input
                  placeholder="e.g., Register for the challenge and form your team"
                  value={inst.text}
                  onChange={(e) =>
                    handleInstructionChange(inst.id, e.target.value)
                  }
                  error={fieldErrors[`instructions.${index}.text`]}
                />
              </div>
              <button
                type="button"
                onClick={() => handleRemoveInstruction(inst.id)}
                className="mt-3 text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}

        <button
          type="button"
          onClick={handleAddInstruction}
          className="w-full py-3 border border-dashed border-gray-300 rounded-xl text-gray-500 hover:text-dark-blue-main hover:border-dark-blue-main hover:bg-indigo-50 transition-all flex items-center justify-center gap-2 font-medium"
        >
          <Plus size={18} />
          Add Step
        </button>
      </div>
    </div>
  );
};
