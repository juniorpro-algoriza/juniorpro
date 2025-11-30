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
  "AssignContributor",
  "AssignPointsForContributors",
  "AssignPointsForJuniors",
  "MissionCompleted",
]);
