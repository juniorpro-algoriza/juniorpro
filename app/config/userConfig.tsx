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
      { header: "Juniors", key: "juniorsCount" },
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
      assignPoints: "AssignPointsForContributors",

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
      edit: "EditProfile",
    },
    tabs: ["Profile", "Projects", "Badge & Achievements"],
  },

  "junior-contributor": {
    entity: "Junior",
    endpoint: "Contributor/juniors", // the API endpoint you already have
    tableColumns: [
      { header: "Name", key: "name" },
      { header: "Points", key: "points" },
      { header: "Active Projects", key: "activeProjects" },
      { header: "Completed Projects", key: "completedProjects" },
      // {
      //   header: "Action",
      //   key: "actionHref",
      //   isAction: true,
      //   actionLabel: "View",
      //   actionIcon: <EyeIcon size={16} />,
      // },
    ],
    modals: {
      add: "AddJuniorForContributor",
      edit: "EditJuniorContributor",
      assignPoints: "AssignPointsForJuniors",
    },
    tabs: ["Juniors"], 
  },

} as const;

export type UserType = keyof typeof userConfigs;
