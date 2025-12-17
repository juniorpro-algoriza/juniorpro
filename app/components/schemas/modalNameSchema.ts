import { z } from "zod";

export const modalNameSchema = z.enum([
  "EditProfile",
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
