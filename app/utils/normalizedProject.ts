import { projectTypes, projectStatus, ageRanges } from "../(pages)/(loged-in)/admin/projects/new/components/helpers";
import type { NormalizedProject, ProjectType } from "../types/Projects";

export function normalizeProject(apiProject: any): NormalizedProject {
  // Lookup projectType
  const projectTypeObj = projectTypes.find(pt => pt.value === apiProject.projectType);
const projectType: ProjectType = projectTypeObj ? (projectTypeObj.label.trim() as ProjectType) : "Free Solo";
  // Lookup status
  const statusObj = projectStatus.find(s => s.value === apiProject.status);
  const status = statusObj ? statusObj.label : "Draft";

  // Lookup ageRange
  const ageRangeObj = ageRanges.find(a => a.value === apiProject.ageRange);
  const ageRange = ageRangeObj ? ageRangeObj.label : "Not specified";

  return {
    id: apiProject.id,
    title: apiProject.nameEn,
    description: apiProject.levelNameEn || "",
    imageUrl: apiProject.image,
    category: apiProject.categoryNameEn,
    projectType,
    status,
    modificationDate: apiProject.modificationDate,
    ageRange,
  };
}
