import { EyeIcon } from "lucide-react";

export const userConfigs = {
  projectManager: {
    entity: "Project Manager",
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
    api: {
      list: "project-manager/get-all",
      details: (id: number) => `project-manager/details/${id}`,
      add: "project-manager/add",
      update: "project-manager/update",
    },
  },
  contributor: {
    entity: "Contributor",
    tableColumns: [
      { header: "Name", key: "name" },
      { header: "Email", key: "email" },
      { header: "Status", key: "status" },
      { header: "Projects", key: "projects" },
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
    api: {
      list: "contributor/get-all",
      details: (id: number) => `contributor/details/${id}`,
      add: "contributor/add",
      update: "contributor/update",
    },
  },
} as const;

export type UserType = keyof typeof userConfigs;
