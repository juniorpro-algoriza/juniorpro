import { GuideStep, Resource, Criteria } from "./types";

export const stepData = [
  { step: 1, title: "Info", subTitle: "Basic Info" },
  { step: 2, title: "Guide", subTitle: "Step-by-Step Guide" },
  { step: 3, title: "Resources", subTitle: "Upload Resources" },
  { step: 4, title: "Criteria", subTitle: "Criteria" },
  { step: 5, title: "Solution", subTitle: "Solution" },
];

export const durationOptions = [
  { label: "15 min", value: "15" },
  { label: "30 min", value: "30" },
  { label: "45 min", value: "45" },
  { label: "1 hour", value: "60" },
];

export const skillOptions = [
  { label: "Coding", value: "coding" },
  { label: "Design", value: "design" },
  { label: "Marketing", value: "marketing" },
  { label: "Writing", value: "writing" },
  { label: "Photography", value: "photography" },
  { label: "Music", value: "music" },
  { label: "Gaming", value: "gaming" },
  { label: "Cooking", value: "cooking" },
  { label: "Fitness", value: "fitness" },
];

export const defaultGuideStep = (): GuideStep => ({
  id: crypto.randomUUID(),
  title: "",
  description: "",
  codeReference: "",
});

export const defaultResource = (): Resource => ({
  id: crypto.randomUUID(),
  title: "",
  type: "",
  url: "",
  duration: null,
});

export const defaultCriteria = (): Criteria => ({
  id: crypto.randomUUID(),
  label: "",
});
