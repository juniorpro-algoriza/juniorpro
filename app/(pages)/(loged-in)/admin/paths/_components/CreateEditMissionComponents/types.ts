import { Lookup } from "@types";

export interface GuideStep {
  id: string;
  titleEn: string;
  description: string;
  codeReference: string;
}

export interface Resource {
  id: string;
  titleEn: string;
  type: 1 | 2 | 3 | 4;
  url: string;
  duration: number | null;
}

export interface Criteria {
  id: string;
  label: string;
}

export interface MissionFormData {
  nameEn: string;
  description: string;
  durationId: number;
  levelId: number;
  skillId: number;
  xp: number;
  points: number;
  guideSteps: GuideStep[];
  resources: Resource[];
  criteria: Criteria[];
  solutionCode: string;
}

export interface LookupData {
  duration: Lookup[];
  skills: Lookup[];
  levels: Lookup[];
}

export interface ValidationResult {
  success: boolean;
  message: string | null;
  errors?: Record<string, string>;
}

export interface ValidationIssue {
  path: (string | number | symbol)[];
  message: string;
}
