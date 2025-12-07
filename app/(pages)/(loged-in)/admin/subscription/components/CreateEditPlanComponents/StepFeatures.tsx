"use client";

import { Dispatch, SetStateAction } from "react";
import { Checkbox, Field, Label } from "@headlessui/react";
import { Input } from "@components";
import { PlanFormData, Feature, PlanFeature } from "./types";
import { cx } from "@lib";

interface StepFeaturesProps {
  formData: PlanFormData;
  setFormData: Dispatch<SetStateAction<PlanFormData>>;
  features: Feature[];
}

export const StepFeatures = ({
  formData,
  setFormData,
  features,
}: StepFeaturesProps) => {
  const isFeatureSelected = (featureId: number) => {
    return formData.features.some((f) => f.featureId === featureId);
  };

  const getFeatureLimit = (featureId: number) => {
    return (
      formData.features.find((f) => f.featureId === featureId)?.limitCount ?? 0
    );
  };

  const handleToggleFeature = (featureId: number, checked: boolean) => {
    if (checked) {
      setFormData((prev) => {
        if (prev.features.some((f) => f.featureId === featureId)) {
          return prev;
        }
        return {
          ...prev,
          features: [...prev.features, { featureId, limitCount: 0 }],
        };
      });
    } else {
      setFormData((prev) => ({
        ...prev,
        features: prev.features.filter((f) => f.featureId !== featureId),
      }));
    }
  };

  const handleLimitChange = (featureId: number, limit: number | null) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.map((f) =>
        f.featureId === featureId ? { ...f, limitCount: limit } : f
      ),
    }));
  };

  return (
    <div className="space-y-6 py-2">
      <div className="space-y-1">
        <h3 className="text-lg font-semibold">Plan Features</h3>
        <p className="text-sm text-gray-600">
          Select features to include in this plan and set their limits
        </p>
      </div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
        {features.map((feature) => {
          if (!feature.id) return null;
          const isSelected = isFeatureSelected(feature.id);

          return (
            <Field
              key={feature.id}
              className={cx(
                "p-4 rounded-xl border border-dashed transition-all duration-200 flex items-start gap-4",
                isSelected
                  ? "border-blue-main bg-blue-main/5"
                  : "border-gray-200 hover:border-blue-main/30"
              )}
            >
              <Checkbox
                checked={isSelected}
                onChange={(checked) =>
                  handleToggleFeature(feature.id!, checked)
                }
                className="group block size-5 rounded border bg-white data-[checked]:bg-blue-main data-[checked]:border-blue-main duration-200 mt-1"
              >
                <svg
                  className="stroke-white opacity-0 group-data-[checked]:opacity-100"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M3 8L6 11L11 3.5"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Checkbox>
              <div className="flex-1 space-y-3">
                <div
                  onClick={() => handleToggleFeature(feature.id!, !isSelected)}
                  className="cursor-pointer"
                >
                  <Label className="font-medium text-midnight block cursor-pointer">
                    {feature.nameEn}
                  </Label>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {feature.description}
                  </p>
                </div>

                {isSelected && (
                  <div className="pt-2 animate-in fade-in slide-in-from-top-2 duration-200">
                    <Input
                      label="Limit Count"
                      type="number"
                      min={0}
                      placeholder="e.g. 5"
                      value={getFeatureLimit(feature.id) ?? ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        handleLimitChange(
                          feature.id!,
                          val === "" ? null : Number(val)
                        );
                      }}
                      containerClassName="max-w-[200px]"
                      className="h-10 text-sm"
                      helperText="Enter 0 for unlimited"
                    />
                  </div>
                )}
              </div>
            </Field>
          );
        })}
        {features.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No features available to select.
          </div>
        )}
      </div>
    </div>
  );
};
