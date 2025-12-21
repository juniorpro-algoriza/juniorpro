
import { Lookup } from "@types";
import type {
  NormalizedProject,
  ProjectStatus,
  ProjectType,
} from "../types/Projects";

export const ageRanges: Lookup[] = [
  { label: "08-12", value: 1 },
  { label: "13-16", value: 2 },
  { label: "17-20", value: 3 },
];

export const projectTypes: Lookup[] = [
  { label: "Team", value: 1 },
  { label: "Premium Solo", value: 2 },
  { label: "Free Solo", value: 3 },
];

export const projectStatus: Lookup[] = [
  { label: "Draft", value: 1 },
  { label: "Published", value: 2 },
  { label: "Review", value: 3 },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function normalizeProject(apiProject: any): NormalizedProject {
  // Lookup projectType
  const projectTypeObj = projectTypes.find(
    (pt) => pt.value === apiProject.projectType
  );
  const projectType: ProjectType = projectTypeObj
    ? (projectTypeObj.label.trim() as ProjectType)
    : "Free Solo";
  // Lookup status
  const statusObj = projectStatus.find((s) => s.value === apiProject.status);
  const status: ProjectStatus = statusObj
    ? (statusObj.label as ProjectStatus)
    : "Draft";
  // Lookup ageRange
  const ageRangeObj = ageRanges.find((a) => a.value === apiProject.ageRange);
  const ageRange = ageRangeObj ? ageRangeObj.label : "Not specified";

  return {
    id: apiProject.id,
    title: apiProject.nameEn || apiProject.projectNameEn || "Untitled Project",
    description: apiProject.description || "No description provided.",
    imageUrl: apiProject.image,
    category: apiProject.categoryNameEn,
    level: apiProject.levelNameEn || apiProject.levelAr,
    rating: apiProject.feedback || 4,
    projectType,
    status,
    modificationDate: apiProject.modificationDate,
    ageRange,
  };
}
