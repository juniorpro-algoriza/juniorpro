import { step1Schema, step2Schema, step3Schema, step4Schema, step5Schema } from "../../_schema/mission.schema";
import { GuideStep, Resource, Criteria, MissionFormData } from "./types";

export const stepData = [
  { step: 1, title: "Info", subTitle: "Basic Info" },
  { step: 2, title: "Guide", subTitle: "Step-by-Step Guide" },
  { step: 3, title: "Resources", subTitle: "Upload Resources" },
  { step: 4, title: "Criteria", subTitle: "Criteria" },
  { step: 5, title: "Solution", subTitle: "Solution" },
];

export const defaultGuideStep = (): GuideStep => ({
  id: crypto.randomUUID(),
  titleEn: "",
  description: "",
  codeReference: "",
});

export const defaultResource = (): Resource => ({
  id: crypto.randomUUID(),
  titleEn: "",
  type: 1,
  url: "",
  duration: null,
});

export const defaultCriteria = (): Criteria => ({
  id: crypto.randomUUID(),
  label: "",
});

export const INITIAL_FORM_DATA: MissionFormData = {
  nameEn: "",
  nameAr: "",
  description: "",
  durationId: 0,
  levelId: 0,
  skillId: 0,
  xp: 0,
  points: 0,
  guideSteps: [defaultGuideStep()],
  resources: [defaultResource()],
  criteria: [defaultCriteria()],
  solutionCode: "",
};

export const STEP_SCHEMAS = {
  1: step1Schema,
  2: step2Schema,
  3: step3Schema,
  4: step4Schema,
  5: step5Schema,
} as const;