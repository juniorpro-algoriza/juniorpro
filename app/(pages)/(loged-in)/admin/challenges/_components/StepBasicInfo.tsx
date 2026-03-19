"use client";

import { Input, Select, Textarea } from "@components";
import { ChallengeFormData } from "./types";
import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { ACCESS_COST_OPTIONS, PATH_ICON } from "../../../../../configs";
import { useLookup } from "../../../../../tanstack/useLookup";

interface StepBasicInfoProps {
  formData: ChallengeFormData;
  setFormData: Dispatch<SetStateAction<ChallengeFormData>>;
  fieldErrors?: Record<string, string>;
}

export const StepBasicInfo = ({
  formData,
  setFormData,
  fieldErrors = {},
}: StepBasicInfoProps) => {
  const { data: levels = [] } = useLookup("/api/Lookup/Level");
  const { data: categories = [] } = useLookup("/api/Lookup/Category");

  const levelOptions = levels.map((l) => ({
    label: l.label,
    value: String(l.value),
  }));

  const categoryOptions = categories.map((c) => ({
    label: c.label,
    value: String(c.value),
  }));

  const handleChange = <T extends keyof ChallengeFormData>(
    field: T,
    value: ChallengeFormData[T]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-8 py-2">
      {/* Basic Information Section */}
      <div className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">Basic Information</h3>
          <p className="text-sm text-gray-600">
            Essential details about this mission
          </p>
        </div>

        <Input
          label="Challenge Title *"
          placeholder="e.g., Build a Calculator App"
          value={formData.nameEn}
          onChange={(e) => handleChange("nameEn", e.target.value)}
          error={fieldErrors.nameEn}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            label="Difficulty Level *"
            options={levelOptions}
            value={formData.levelId ? String(formData.levelId) : ""}
            onChange={(val) => handleChange("levelId", Number(val))}
            placeholder="Select Level"
            error={fieldErrors.levelId}
          />

          <Select
            label="Category *"
            options={categoryOptions}
            value={formData.categoryId ? String(formData.categoryId) : ""}
            onChange={(val) => handleChange("categoryId", Number(val))}
            placeholder="Select Category"
            error={fieldErrors.categoryId}
          />

          <Input
            label="Juniors Capacity *"
            type="number"
            placeholder="e.g., 50"
            value={formData.juniorsCapacity || ""}
            onChange={(e) =>
              handleChange("juniorsCapacity", Number(e.target.value))
            }
            error={fieldErrors.juniorsCapacity}
          />
        </div>

        <Textarea
          label="Description *"
          placeholder="Brief overview of what students will create and learn..."
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          rows={4}
          error={fieldErrors.description}
        />
      </div>

      {/* Timeline & Dates Section */}
      <div className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">Timeline & Dates</h3>
          <p className="text-sm text-gray-600">
            Set challenge duration and deadlines
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Start Date & Time *"
            type="datetime-local"
            value={
              formData.startDate
                ? new Date(
                    formData.startDate.getTime() -
                      formData.startDate.getTimezoneOffset() * 60000
                  )
                    .toISOString()
                    .slice(0, 16)
                : ""
            }
            onChange={(e) => {
              const date = e.target.value ? new Date(e.target.value) : null;
              if (date) handleChange("startDate", date);
            }}
            error={fieldErrors.startDate}
          />

          <Input
            label="End Date & Time *"
            type="datetime-local"
            value={
              formData.endDate
                ? new Date(
                    formData.endDate.getTime() -
                      formData.endDate.getTimezoneOffset() * 60000
                  )
                    .toISOString()
                    .slice(0, 16)
                : ""
            }
            onChange={(e) => {
              const date = e.target.value ? new Date(e.target.value) : null;
              if (date) handleChange("endDate", date);
            }}
            error={fieldErrors.endDate}
          />

          <Input
            label="Registration Deadline *"
            type="datetime-local"
            value={
              formData.registerationDeadline
                ? new Date(
                    formData.registerationDeadline.getTime() -
                      formData.registerationDeadline.getTimezoneOffset() * 60000
                  )
                    .toISOString()
                    .slice(0, 16)
                : ""
            }
            onChange={(e) => {
              const date = e.target.value ? new Date(e.target.value) : null;
              if (date) handleChange("registerationDeadline", date);
            }}
            error={fieldErrors.registerationDeadline}
          />
        </div>
      </div>

      {/* Challenge Icon Section */}
      <div className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">Challenge Icon *</h3>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2">
          {Object.entries(PATH_ICON).map(([key, src]) => (
            <button
              key={key}
              type="button"
              onClick={() => handleChange("icon", Number(key))}
              className={`relative w-13 h-13 rounded-2xl flex items-center justify-center border-2 transition-all ${
                formData.icon === Number(key)
                  ? "border-dark-blue-main ring-2 ring-indigo-100"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <Image
                src={src}
                alt="icon"
                width={32}
                height={32}
                className="object-contain"
              />
              {formData.icon === Number(key) && (
                <div className="absolute top-0 right-0 w-3 h-3 bg-dark-blue-main rounded-full border-2 border-white translate-x-1 -translate-y-1" />
              )}
            </button>
          ))}
        </div>
        {fieldErrors.icon && (
          <p className="text-sm text-red-500">{fieldErrors.icon}</p>
        )}
      </div>

      {/* Access Type Section */}
      <div className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">Access Type</h3>
          <p className="text-sm text-gray-600">
            Define how participants can access this challenge
          </p>
        </div>

        <Select
          label="Access Cost Type"
          options={ACCESS_COST_OPTIONS}
          value={String(formData.accessCostType)}
          onChange={(val) => handleChange("accessCostType", Number(val))}
          placeholder="Select access type"
        />
      </div>
    </div>
  );
};
