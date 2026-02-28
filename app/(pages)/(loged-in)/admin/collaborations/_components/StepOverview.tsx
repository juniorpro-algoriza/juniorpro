"use client";

import { Input, Textarea } from "@components";
import { CollaborationFormData } from "./types";
import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { PATH_ICON } from "../../../../../configs";

interface StepOverviewProps {
  formData: CollaborationFormData;
  setFormData: Dispatch<SetStateAction<CollaborationFormData>>;
  fieldErrors?: Record<string, string>;
}

export const StepOverview = ({
  formData,
  setFormData,
  fieldErrors = {},
}: StepOverviewProps) => {
  const handleChange = <T extends keyof CollaborationFormData>(
    field: T,
    value: CollaborationFormData[T]
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
          label="Project Title *"
          placeholder="e.g., Build a Calculator App"
          value={formData.projectTitle}
          onChange={(e) => handleChange("projectTitle", e.target.value)}
          error={fieldErrors.projectTitle}
        />

        <Textarea
          label="Description *"
          placeholder="Brief overview of what students will create and learn in this mission..."
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          rows={4}
          error={fieldErrors.description}
        />

        <div className="space-y-2">
          <label className="block text-sm font-medium">Project Icon *</label>
          <div className="flex flex-wrap gap-4 overflow-x-auto pb-2">
            {Object.entries(PATH_ICON).map(([key, src]) => (
              <button
                key={key}
                type="button"
                onClick={() => handleChange("projectIcon", key)}
                className={`relative w-13 h-13 rounded-2xl flex items-center justify-center border-2 transition-all ${
                  formData.projectIcon === key
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
                {formData.projectIcon === key && (
                  <div className="absolute top-0 right-0 w-3 h-3 bg-dark-blue-main rounded-full border-2 border-white translate-x-1 -translate-y-1" />
                )}
              </button>
            ))}
          </div>
          {fieldErrors.projectIcon && (
            <p className="text-sm text-red-500">{fieldErrors.projectIcon}</p>
          )}
        </div>
      </div>

      {/* Timeline & Dates Section */}
      <div className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">Timeline & Dates</h3>
          <p className="text-sm text-gray-600">
            Set project duration and deadlines
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="START DATE & TIME *"
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
            label="END DATE & TIME *"
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
        </div>

        <Input
          label="Registration Deadline *"
          type="datetime-local"
          value={
            formData.registrationDeadline
              ? new Date(
                  formData.registrationDeadline.getTime() -
                    formData.registrationDeadline.getTimezoneOffset() * 60000
                )
                  .toISOString()
                  .slice(0, 16)
              : ""
          }
          onChange={(e) => {
            const date = e.target.value ? new Date(e.target.value) : null;
            if (date) handleChange("registrationDeadline", date);
          }}
          error={fieldErrors.registrationDeadline}
        />
      </div>

      {/* Reward Section */}
      <div className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">Reward</h3>
          <p className="text-sm text-gray-600">
            Define how participants can access this collaboration
          </p>
        </div>

        <div className="flex flex-wrap gap-6 w-full">
          {/* XP Reward Card */}
          <div className="border border-yellow-200 rounded-3xl max-md:flex-1 p-4 relative md:max-w-[300px] min-w-[250px] shadow-main">
            <h4 className="text-orange-400 font-bold uppercase text-sm mb-4">
              XP Reward
            </h4>
            <Input
              type="number"
              value={formData.xpReward}
              onChange={(e) => handleChange("xpReward", Number(e.target.value))}
              placeholder="0"
              leftIcon={
                <Image
                  src="/images/lightning-icon-2.png"
                  alt="lightning"
                  width={20}
                  height={20}
                  className="object-contain"
                />
              }
              className="border-orange-100 bg-orange-50/50 text-brown-800 font-bold text-lg h-14 focus:ring-orange-200"
              error={fieldErrors.xpReward}
            />
          </div>

          {/* Gems / Points Card */}
          <div className="border border-purple-200 rounded-3xl max-md:flex-1 p-4 relative md:max-w-[300px] min-w-[250px] shadow-main">
            <h4 className="text-purple-500 font-bold uppercase text-sm mb-4">
              Gems / Points
            </h4>
            <Input
              type="number"
              value={formData.gemsPoints}
              onChange={(e) =>
                handleChange("gemsPoints", Number(e.target.value))
              }
              placeholder="0"
              leftIcon={
                <Image
                  src="/images/diamond-icon-2.png"
                  alt="diamond"
                  width={20}
                  height={20}
                  className="object-contain"
                />
              }
              className="border-purple-100 bg-purple-50/50 text-purple-900 font-bold text-lg  h-14 focus:ring-purple-200"
              error={fieldErrors.gemsPoints}
            />
          </div>

          {/* Money Card */}
          <div className="border border-green-200 rounded-3xl max-md:flex-1 p-4 relative md:max-w-[300px] min-w-[250px] shadow-main">
            <h4 className="text-green-500 font-bold uppercase text-sm mb-4">
              Money (SAR)
            </h4>
            <Input
              type="number"
              value={formData.money}
              onChange={(e) => handleChange("money", Number(e.target.value))}
              placeholder="0"
              leftIcon={
                <span className="font-extrabold text-green-700 text-xs">
                  SAR
                </span>
              }
              className="border-green-100 bg-green-50/50 text-green-700 font-bold text-lg h-14 focus:ring-green-200"
              error={fieldErrors.money}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
