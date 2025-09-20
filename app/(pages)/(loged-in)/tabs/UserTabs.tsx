/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Tabs } from "@components/client";
import { TableContainer } from "../tables";
import { userConfigs, type UserType } from "../../../config/userConfig";
import { Badge, ProjectCard } from "@components";
import {
  getProjectManagerContributors,
  getProjectManagerJuniors,
  getProjectManagerProjects,
  getProjectManagerPracticeZone,
} from "../admin/server/getProjectManagerData";

interface UserTabsProps {
  userType: UserType;
  userId: number;
}

export const UserTabs = ({ userType, userId }: UserTabsProps) => {
  const config = userConfigs[userType];
  const [loading, setLoading] = useState(true);

  const [juniors, setJuniors] = useState<any[]>([]);
  const [contributors, setContributors] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [practiceZoneProjects, setPracticeZoneProjects] = useState<any[]>([]);

  // Wrap status with Badge
  const wrapStatus = (status: string) => (
    <Badge label={status} variant={status === "active" ? "green" : "orange"} />
  );

  useEffect(() => {
    if (userType === "project-manager") {
      (async () => {
        setLoading(true);
        const [j, c, p, pz] = await Promise.all([
          getProjectManagerJuniors(userId),
          getProjectManagerContributors(userId),
          getProjectManagerProjects(userId),
          getProjectManagerPracticeZone(userId),
        ]);
        setJuniors(j);
        setContributors(c);
        setProjects(p);
        setPracticeZoneProjects(pz);
        setLoading(false);
      })();
    }
  }, [userId, userType]);

  // Build tabs
  const tabs = config.tabs.map((tabName) => {
    let content;

    if (loading) {
      content = <div className="p-6 text-gray-500">Loading...</div>;
    } else {
      switch (tabName) {
        case "Juniors":
          content = (
            <TableContainer
              type="junior"
              initialData={
                juniors.length > 0
                  ? juniors.map((j) => ({
                      ...j,
                      status: wrapStatus(j.status || "inactive"),
                    }))
                  : []
              }
              title="Assigned Juniors"
            />
          );
          break;

        case "Contributors":
          content = (
            <TableContainer
              type="contributor"
              initialData={
                contributors.length > 0
                  ? contributors.map((c) => ({
                      ...c,
                      status: wrapStatus(c.status || "inactive"),
                    }))
                  : []
              }
              title="Contributors"
            />
          );
          break;

        case "Projects":
          content =
            projects.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4">
                {projects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    showDescription={false}
                    showDueDate={false}
                    showJuniors={true}
                    showJuniorsCountOnly={true}
                    showRating={false}
                    showBadge={true}
                    showBadgeNextToDueDate={false}
                    badgeText={project.status}
                  />
                ))}
              </div>
            ) : (
              <div className="p-6 text-gray-500">No projects found</div>
            );
          break;

        case "Practice Zone":
          content =
            practiceZoneProjects.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4">
                {practiceZoneProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    showDescription={false}
                    showDueDate={false}
                    showJuniors={true}
                    showJuniorsCountOnly={true}
                    showRating={false}
                    showBadge={true}
                    showBadgeNextToDueDate={false}
                    badgeText={project.status}
                  />
                ))}
              </div>
            ) : (
              <div className="p-6 text-gray-500">No practice zone projects</div>
            );
          break;

        default:
          content = <div className="p-6 text-gray-500">No data</div>;
      }
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
