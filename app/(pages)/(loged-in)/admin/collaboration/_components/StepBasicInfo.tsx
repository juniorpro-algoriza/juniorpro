"use client";

import { Input, Select, Textarea } from "@components";
import { Switch } from "@headlessui/react";
import { CollaborationFormData, Judge } from "./types";
import { Dispatch, SetStateAction } from "react";
import { Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { PATH_ICON } from "../../../../../configs";

interface StepBasicInfoProps {
  formData: CollaborationFormData;
  setFormData: Dispatch<SetStateAction<CollaborationFormData>>;
  fieldErrors?: Record<string, string>;
}

const CHALLENGE_TYPES = [
  { label: "Frontend", value: "Frontend" },
  { label: "Backend", value: "Backend" },
  { label: "Fullstack", value: "Fullstack" },
  { label: "Mobile", value: "Mobile" },
  { label: "Design", value: "Design" },
  { label: "Data Science", value: "Data Science" },
];

const DIFFICULTY_LEVELS = [
  { label: "Beginner", value: "Beginner" },
  { label: "Intermediate", value: "Intermediate" },
  { label: "Advanced", value: "Advanced" },
  { label: "Expert", value: "Expert" },
];

const CATEGORIES = [
  { label: "Web Development", value: "Web Development" },
  { label: "App Development", value: "App Development" },
  { label: "Software Engineering", value: "Software Engineering" },
  { label: "UI/UX Design", value: "UI/UX Design" },
  { label: "Machine Learning", value: "Machine Learning" },
];

const SKILL_OPTIONS = [
  { label: "React", value: "React" },
  { label: "TypeScript", value: "TypeScript" },
  { label: "Tailwind CSS", value: "Tailwind CSS" },
  { label: "Node.js", value: "Node.js" },
  { label: "Next.js", value: "Next.js" },
  { label: "Python", value: "Python" },
  { label: "Figma", value: "Figma" },
  { label: "Git", value: "Git" },
];

export const StepBasicInfo = ({
  formData,
  setFormData,
  fieldErrors = {},
}: StepBasicInfoProps) => {
  const handleChange = <T extends keyof CollaborationFormData>(
    field: T,
    value: CollaborationFormData[T]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Judge handlers
  const handleAddJudge = () => {
    const newJudge: Judge = {
      id: Date.now().toString(),
      email: "",
    };
    setFormData((prev) => ({
      ...prev,
      judges: [...(prev.judges || []), newJudge],
    }));
  };

  const handleRemoveJudge = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      judges: prev.judges.filter((judge) => judge.id !== id),
    }));
  };

  const handleJudgeEmailChange = (id: string, email: string) => {
    setFormData((prev) => ({
      ...prev,
      judges: prev.judges.map((judge) =>
        judge.id === id ? { ...judge, email } : judge
      ),
    }));
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            label="Challenge Type *"
            options={CHALLENGE_TYPES}
            value={formData.challengeType || ""}
            onChange={(val) => handleChange("challengeType", String(val))}
            placeholder="Select Type"
            error={fieldErrors.challengeType}
          />

          <Select
            label="Difficulty Level *"
            options={DIFFICULTY_LEVELS}
            value={formData.difficultyLevel || ""}
            onChange={(val) => handleChange("difficultyLevel", String(val))}
            placeholder="Select Level"
            error={fieldErrors.difficultyLevel}
          />

          <Select
            label="Category *"
            options={CATEGORIES}
            value={formData.category || ""}
            onChange={(val) => handleChange("category", String(val))}
            placeholder="Select Category"
            error={fieldErrors.category}
          />
        </div>

        {/* Skills */}
        <div className="space-y-1">
          <Select
            label="Skills You'll Learn"
            options={SKILL_OPTIONS}
            multiple={true}
            value={formData.skills || []}
            onChange={(val) => handleChange("skills", val as string[])}
            placeholder="Select skills from Web Development"
            error={
              fieldErrors.skills
                ? "At least one skill is required"
                : mapSkillsError(fieldErrors)
            }
          />
        </div>
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
              formData.startDateTime
                ? new Date(
                    formData.startDateTime.getTime() -
                      formData.startDateTime.getTimezoneOffset() * 60000
                  )
                    .toISOString()
                    .slice(0, 16)
                : ""
            }
            onChange={(e) => {
              const date = e.target.value ? new Date(e.target.value) : null;
              if (date) handleChange("startDateTime", date);
            }}
            error={fieldErrors.startDateTime}
          />

          <Input
            label="End Date & Time *"
            type="datetime-local"
            value={
              formData.endDateTime
                ? new Date(
                    formData.endDateTime.getTime() -
                      formData.endDateTime.getTimezoneOffset() * 60000
                  )
                    .toISOString()
                    .slice(0, 16)
                : ""
            }
            onChange={(e) => {
              const date = e.target.value ? new Date(e.target.value) : null;
              if (date) handleChange("endDateTime", date);
            }}
            error={fieldErrors.endDateTime}
          />

          <Input
            label="Registration Deadline"
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
              const date = e.target.value
                ? new Date(e.target.value)
                : undefined;
              handleChange("registrationDeadline", date);
            }}
          />
        </div>
      </div>

      {/* Visual & Rewards Section */}
      <div className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">Visual & Rewards</h3>
          <p className="text-sm text-gray-600">
            Choose an icon and set rewards
          </p>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Challenge Icon</label>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {Object.entries(PATH_ICON).map(([key, src]) => (
              <button
                key={key}
                type="button"
                onClick={() => handleChange("icon", key)}
                className={`relative w-13 h-13 rounded-2xl flex items-center justify-center border-2 transition-all ${
                  formData.icon === key
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
                {formData.icon === key && (
                  <div className="absolute top-0 right-0 w-3 h-3 bg-dark-blue-main rounded-full border-2 border-white translate-x-1 -translate-y-1" />
                )}
              </button>
            ))}
          </div>
          {fieldErrors.icon && (
            <p className="text-sm text-red-500">{fieldErrors.icon}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="KP Points"
            type="number"
            placeholder="100"
            value={formData.kpPoints}
            onChange={(e) => handleChange("kpPoints", Number(e.target.value))}
          />
          <Input
            label="Gems"
            type="number"
            placeholder="50"
            value={formData.gems}
            onChange={(e) => handleChange("gems", Number(e.target.value))}
          />
        </div>
      </div>

      {/* Access Type Section */}
      <div className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">Access Type</h3>
          <p className="text-sm text-gray-600">
            Define how participants can access this challenge
          </p>
        </div>

        <div className="space-y-4">
          <div className="p-5 border border-gray-200 rounded-2xl bg-gray-50/50 flex items-center justify-between transition-all hover:border-gray-300">
            <div className="space-y-1">
              <h4 className="font-semibold">Premium Challenge</h4>
              <p className="text-sm text-gray-500">
                Require points or subscription to access
              </p>
            </div>
            <Switch
              checked={formData.isPremium}
              onChange={(checked) => {
                handleChange("isPremium", checked);
                if (!checked) {
                  handleChange("pointsCost", undefined);
                  handleChange("isSubscriptionOnly", false);
                }
              }}
              className={`${
                formData.isPremium ? "bg-dark-blue-main" : "bg-gray-200"
              } relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-dark-blue-main focus:ring-offset-2`}
            >
              <span
                className={`${
                  formData.isPremium ? "translate-x-6" : "translate-x-1"
                } inline-block h-5 w-5 transform rounded-full bg-white transition-transform shadow-sm`}
              />
            </Switch>
          </div>

          {formData.isPremium && (
            <div className="p-5 border border-gray-200 rounded-2xl bg-white animate-in fade-in slide-in-from-top-4 duration-300">
              {/* Points Cost Option */}
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <div className="relative flex items-center">
                    <input
                      type="radio"
                      id="points-cost"
                      name="access-type"
                      checked={!formData.isSubscriptionOnly}
                      onChange={() => handleChange("isSubscriptionOnly", false)}
                      className="w-5 h-5 text-dark-blue-main border-gray-300 focus:ring-dark-blue-main"
                    />
                  </div>
                  <label
                    htmlFor="points-cost"
                    className="font-medium text-gray-700 cursor-pointer"
                  >
                    Points Cost
                  </label>
                </div>
                <div className="w-32">
                  <Input
                    type="number"
                    min={0}
                    placeholder="500"
                    disabled={formData.isSubscriptionOnly}
                    value={formData.pointsCost ?? ""}
                    onChange={(e) =>
                      handleChange(
                        "pointsCost",
                        e.target.value ? Number(e.target.value) : undefined
                      )
                    }
                    error={fieldErrors.pointsCost}
                  />
                </div>
              </div>

              {/* Subscription Only Option */}
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  id="subscription-only"
                  name="access-type"
                  checked={formData.isSubscriptionOnly}
                  onChange={() => {
                    handleChange("isSubscriptionOnly", true);
                    handleChange("pointsCost", undefined);
                  }}
                  className="w-5 h-5 text-dark-blue-main border-gray-300 focus:ring-dark-blue-main"
                />
                <label
                  htmlFor="subscription-only"
                  className="font-medium text-gray-700 cursor-pointer"
                >
                  Subscription Only
                </label>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Judges Section (Moved) */}
      <div className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">Judges</h3>
          <p className="text-sm text-gray-600">
            Add judges who will evaluate submissions
          </p>
        </div>

        <div className="space-y-3">
          {formData.judges &&
            formData.judges.map((judge, index) => (
              <div key={judge.id} className="flex items-start gap-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-dark-blue-main text-white font-medium text-sm mt-2">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <Input
                    placeholder="e.g., @Lina"
                    type="email"
                    value={judge.email}
                    onChange={(e) =>
                      handleJudgeEmailChange(judge.id, e.target.value)
                    }
                    error={fieldErrors[`judges.${index}.email`]}
                  />
                </div>
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveJudge(judge.id)}
                    className="mt-2 p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            ))}

          <button
            type="button"
            onClick={handleAddJudge}
            className="w-full py-3 border border-dashed border-gray-300 rounded-xl text-gray-500 hover:text-dark-blue-main hover:border-dark-blue-main hover:bg-indigo-50 transition-all flex items-center justify-center gap-2 font-medium"
          >
            <Plus size={18} />
            Add Judge
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper to map array errors from Zod to a string if needed, although Select might handle string only.
// If fieldErrors.skills is an array issue it usually comes as "skills" or "skills.0", etc.
// For the Select component, it expects a string error.
function mapSkillsError(errors: Record<string, string>) {
  // If there's a general skills error, return it.
  if (errors.skills) return errors.skills;
  // If there are specific item errors, maybe return a generic message or the first one?
  // Zod array min(1) validation returns error on "skills" path.
  return "";
}
