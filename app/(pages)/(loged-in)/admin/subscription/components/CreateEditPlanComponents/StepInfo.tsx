import { Input, Textarea } from "@components";
import { Switch } from "@headlessui/react";
import { PlanFormData } from "./types";
import { Dispatch, SetStateAction } from "react";

interface StepInfoProps {
  formData: PlanFormData;
  setFormData: Dispatch<SetStateAction<PlanFormData>>;
  fieldErrors?: Record<string, string>;
}

export const StepInfo = ({ formData, setFormData, fieldErrors = {} }: StepInfoProps) => {
  const handleChange = <T extends keyof PlanFormData>(
    field: T,
    value: PlanFormData[T],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-2 py-2">
      <div className="space-y-1">
        <h3 className="text-lg font-semibold">Basic Information</h3>
        <p className="text-sm text-gray-600">
          Essential details about this subscription plan
        </p>
      </div>

      <Input
        label="Plan Name *"
        placeholder="Pro Plan"
        value={formData.planName}
        onChange={(e) => handleChange("planName", e.target.value)}
        error={fieldErrors.planName}
      />

      <Textarea
        label="Description *"
        placeholder="Brief overview of what this plan offers..."
        value={formData.description}
        onChange={(e) => handleChange("description", e.target.value)}
        rows={4}
        error={fieldErrors.description}
      />
      <Input
        label="Junior Capacity *"
        placeholder="0"
        type="number"
        min={0}
        value={formData.juniorCapacity ?? ""}
        onChange={(e) => handleChange("juniorCapacity", Number(e.target.value))}
        error={fieldErrors.juniorCapacity}
      />
      <div className="flex items-center justify-between flex-wrap gap-3 p-4 border border-gray-200 rounded-xl">
        <div className="space-y-1">
          <h4 className="font-medium text-midnight">Plan Status</h4>
          <p className="text-sm text-gray-500">
            Is this plan available for purchase?
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span
            className={`text-sm font-medium ${
              formData.isActive ? "text-green-600" : "text-gray-600"
            }`}
          >
            {formData.isActive ? "Active" : "Draft"}
          </span>
          <Switch
            checked={formData.isActive}
            onChange={(checked) => handleChange("isActive", checked)}
            className={`${
              formData.isActive ? "bg-dark-blue-main" : "bg-gray-200"
            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none `}
          >
            <span
              className={`${
                formData.isActive ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
            />
          </Switch>
        </div>
      </div>
    </div>
  );
};
