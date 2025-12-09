import { z } from "zod";

export const modalNameSchema = z.enum([
  "AddJuniorForContributor",
  "EditProfile",
  "AddProjectManager",
  "EditProjectManagerProfile",
  "AddJuniors",
  "AddContributor",
  "EditContributorProfile",
  "EditJuniorsProfile",
  "AssignPointsForContributors",
  "AssignPointsForJuniors",
  "MissionCompleted",
  "CreateEditMission",
  "CreateEditPlan",
]);
