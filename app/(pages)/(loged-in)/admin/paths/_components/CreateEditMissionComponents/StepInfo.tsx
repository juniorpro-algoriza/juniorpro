import { Input, Select } from "@components";
import { Lookup } from "@types";

const convertToNumber = (
  value: string | null | number,
  allowNull = false
): number | null => {
  if (value === null || value === "") return allowNull ? null : 0;
  const num = Number(value);
  return isNaN(num)
    ? allowNull
      ? null
      : 0
    : allowNull
      ? num
      : Math.floor(num);
};

interface MissionFormData {
  nameEn: string;
  description: string;
  durationId: number;
  levelId: number;
  skillId: number;
  xp: number;
  points: number;
}

interface StepInfoProps {
  formData: MissionFormData;
  updateBasicInfo: (
    field: keyof MissionFormData,
    value: string | null | number
  ) => void;
  fieldErrors?: Record<string, string>;
  durationOptions: Lookup[];
  skillsOptions: Lookup[];
  levelsOptions: Lookup[];
}

export const StepInfo = ({
  formData,
  updateBasicInfo,
  fieldErrors = {},
  durationOptions,
  skillsOptions,
  levelsOptions,
}: StepInfoProps) => (
  <>
    <Input
      label="Mission Name"
      placeholder="e.g., Full Stack Wizardry"
      value={formData.nameEn}
      onChange={(e) => updateBasicInfo("nameEn", e.target.value)}
      error={fieldErrors.nameEn}
    />
    <Input
      label="Description"
      placeholder="Describe the mission..."
      value={formData.description}
      onChange={(e) => updateBasicInfo("description", e.target.value)}
      error={fieldErrors.description}
    />
    <Select
      label="Duration"
      options={durationOptions}
      placeholder="Select duration"
      value={formData.durationId}
      onChange={(value) =>
        updateBasicInfo("durationId", convertToNumber(value))
      }
      error={fieldErrors.durationId}
    />
    <Select
      label="Level"
      options={levelsOptions}
      placeholder="Select level"
      value={formData.levelId}
      onChange={(value) => updateBasicInfo("levelId", convertToNumber(value))}
      error={fieldErrors.levelId}
    />
    <Select
      label="Skills"
      options={skillsOptions}
      placeholder="Select skills"
      value={formData.skillId}
      onChange={(value) => updateBasicInfo("skillId", convertToNumber(value))}
      error={fieldErrors.skillId}
    />
    <Input
      label="XP"
      type="number"
      placeholder="e.g., 100"
      value={formData.xp}
      onChange={(e) => updateBasicInfo("xp", convertToNumber(e.target.value))}
      error={fieldErrors.xp}
    />
    <Input
      label="Points"
      type="number"
      placeholder="e.g., 50"
      value={formData.points}
      onChange={(e) =>
        updateBasicInfo("points", convertToNumber(e.target.value))
      }
      error={fieldErrors.points}
    />
  </>
);
