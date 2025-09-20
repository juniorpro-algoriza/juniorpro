/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Tabs } from "@components/client";
import { TableContainer } from "../tables";
import { userConfigs, type UserType } from "../../../config/userConfig";
import { Badge } from "@components"; // make sure you import your Badge

interface UserTabsProps {
  userType: UserType;
  userId: number;
}

export const UserTabs = ({ userType, userId }: UserTabsProps) => {
  const config = userConfigs[userType];

  // Helper to wrap status in Badge
  const wrapStatus = (status: string) => (
    <Badge label={status} variant={status === "active" ? "green" : "orange"} />
  );

  // Generate tab content dynamically
  const tabs = config.tabs.map((tabName) => {
    let content;
    switch (tabName) {
      case "Juniors":
        content = (
          <TableContainer
            type="junior"
            initialData={[
              {
                id: 101,
                name: "Alice Smith",
                email: "alice@example.com",
                status: wrapStatus("active"),
                projects: "0",
                joinedOn: "30-0-2020",
                PracticeZone: 0,
                contributors: 1,
              },
              {
                id: 102,
                name: "Bob Johnson",
                email: "bob@example.com",
                status: wrapStatus("inactive"),
                projects: "0",
                joinedOn: "30-0-2020",
                PracticeZone: 0,
                contributors: 1,
              },
              {
                id: 103,
                name: "Charlie Brown",
                email: "charlie@example.com",
                status: wrapStatus("active"),
                projects: "0",
                joinedOn: "30-0-2020",
                PracticeZone: 0,
                contributors: 1,
              },
            ]}
            title="Assigned Juniors"
          />
        );
        break;
      case "Contributors":
        content = (
          <TableContainer
            type="contributor"
            initialData={[
              {
                id: 201,
                name: "David Lee",
                email: "david@example.com",
                status: wrapStatus("active"),
                projects: "0",
                joinedOn: "30-0-2020",
              },
              {
                id: 202,
                name: "Eva Green",
                email: "eva@example.com",
                status: wrapStatus("active"),
                projects: "0",
                joinedOn: "30-0-2020",
              },
            ]}
            title="Contributors"
          />
        );
        break;
      case "Projects":
        content = <div className="p-6 text-gray-500">Projects list here</div>;
        break;
      case "Practice Zone":
        content = (
          <div className="p-6 text-gray-500">Practice Zone content here</div>
        );
        break;
      default:
        content = <div className="p-6 text-gray-500">No data</div>;
    }
    return { name: tabName, content };
  });

  return (
    <Tabs
      tabs={tabs}
      tabListClassName="flex m-3 rounded-full bg-gray-50 p-2 mb-3 w-150"
    />
  );
};
