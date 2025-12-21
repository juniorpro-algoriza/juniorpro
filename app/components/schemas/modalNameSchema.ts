import { z } from "zod";

export const modalNameSchema = z.enum([
  "AddProjectManager",
  "EditProjectManagerProfile",
  "AddJuniors",
  "AddContributor",
  "EditContributorProfile",
  "EditJuniorsProfile",
  "AssignPointsForContributors",
  "MissionCompleted",
  "CreateEditMission",
  "CreateEditPlan",
]);
