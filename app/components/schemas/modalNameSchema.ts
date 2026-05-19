import { z } from "zod";

export const modalNameSchema = z.enum([
  "AddJuniors",
  "MissionCompleted",
  "CreateEditMission",
  "CreateEditPlan",
  "WelcomePopup",
  "PaymentModal",
  "JoinCollaboration",
  "TaskDetails",
  "CreateTask",
  "JuniorTaskDetails",
  "CreateEditLevel",
]);
