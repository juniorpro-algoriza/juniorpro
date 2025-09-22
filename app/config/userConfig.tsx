import { EyeIcon } from "lucide-react";

export const userConfigs = {
  "project-manager": {
    entity: "Project Manager",
    endpoint: "project-manager/get-all",
    tableColumns: [
      { header: "Name", key: "name" },
      { header: "Email", key: "email" },
      { header: "Status", key: "status" },
      { header: "Projects", key: "projects" },
      { header: "Practice Content", key: "practiceContent" },
      { header: "Contributors", key: "contributors" },
      { header: "Joined On", key: "joinedOn" },
      {
        header: "Action",
        key: "actionHref",
        isAction: true,
        actionLabel: "View",
        actionIcon: <EyeIcon size={16} />,
      },
    ],
    modals: {
      add: "AddProjectManager",
      edit: "EditProjectManagerProfile",
    },
    tabs: ["Projects", "Practice Zone", "Contributors", "Juniors"],
  },

  contributor: {
    entity: "Contributor",
    endpoint: "contributor/get-all",
    tableColumns: [
      { header: "Name", key: "name" },
      { header: "Email", key: "email" },
      { header: "Status", key: "status" },
      { header: "Joined On", key: "joinedOn" },
      {
        header: "Action",
        key: "actionHref",
        isAction: true,
        actionLabel: "View",
        actionIcon: <EyeIcon size={16} />,
      },
    ],
    modals: {
      add: "AddContributor",
      edit: "EditContributorProfile",
    },
    tabs: ["Projects", "Practice Zone", "Juniors"],
  },

  junior: {
    entity: "Junior",
    endpoint: "junior/get-all",
    tableColumns: [
      { header: "Name", key: "name" },
      { header: "Email", key: "email" },
      { header: "Status", key: "status" },
      // { header: "Joined On", key: "joinedOn" },
      {
        header: "Action",
        key: "actionHref",
        isAction: true,
        actionLabel: "View",
        actionIcon: <EyeIcon size={16} />,
      },
    ],
    modals: {
      add: "AddJuniors",
      edit: "EditJuniorsProfile",
      assign: "AssignContributor",
    },
    tabs: ["Profile", "Projects", "Badge & Achievements"],
  },
} as const;

export type UserType = keyof typeof userConfigs;
