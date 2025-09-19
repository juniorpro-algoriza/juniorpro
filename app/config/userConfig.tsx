import { EyeIcon } from "lucide-react";

export const userConfigs = {
  "project-manager": {
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
  juniors: {
    entity: "Juniors",
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
      add: "AddJuniors",
      edit: "EditJuniorsProfile",
    },
    tabs: ["Projects", "Practice Zone", "Contributors", "Juniors"],
    api: {
      list: "juniors/get-all",
      details: (id: number) => `juniors/details/${id}`,
      add: "juniors/add",
      update: "juniors/update",
    },
  },
  contributor: {
    entity: "Contributor",
    tableColumns: [
      { header: "Name", key: "name" },
      { header: "Email", key: "email" },
      { header: "Status", key: "status" },
      // { header: "Projects", key: "projects" },
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
