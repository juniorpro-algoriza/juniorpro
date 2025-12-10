import { Input, Select } from "@components";
import { durationOptions, skillOptions } from "./data";

interface MissionFormData {
  missionName: string;
  description: string;
  duration: string | null;
  level: string;
  skills: string | null;
}

interface StepInfoProps {
  formData: MissionFormData;
  updateBasicInfo: (field: keyof MissionFormData, value: string | null) => void;
}

export const StepInfo = ({ formData, updateBasicInfo }: StepInfoProps) => (
  <>
    <Input
      label="Mission Name"
      placeholder="e.g., Full Stack Wizardry"
      value={formData.missionName}
      onChange={(e) => updateBasicInfo("missionName", e.target.value)}
    />
    <Input
      label="Description"
      placeholder="Describe the mission..."
      value={formData.description}
      onChange={(e) => updateBasicInfo("description", e.target.value)}
    />
    <Select
      label="Duration"
      options={durationOptions}
      placeholder="Select duration"
      value={formData.duration}
      onChange={(value) => updateBasicInfo("duration", value as string)}
    />
    <Input
      label="Level"
      placeholder="e.g., 1"
      value={formData.level}
      onChange={(e) => updateBasicInfo("level", e.target.value)}
    />
    <Select
      label="Skills"
      options={skillOptions}
      placeholder="Select skills"
      value={formData.skills}
      onChange={(value) => updateBasicInfo("skills", value as string)}
    />
  </>
);
