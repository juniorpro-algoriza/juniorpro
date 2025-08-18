import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { getProjects } from "../../../../../server";
import { tabClassName, tabListClassName } from "@styles";
import { Project, ProjectType } from "@types";
import { twMerge } from "tailwind-merge";
import { ProjectsCarousel } from "./ProjectCarousel";

export const DashboardProjects = async () => {
  const { data: allProjects } = await getProjects({
    limit: 10,
    pageNum: 1,
    projectType: "all",
  });

  const { data: soloProjects } = await getProjects({
    limit: 10,
    pageNum: 1,
    projectType: "solo",
  });

  const { data: teamProjects } = await getProjects({
    limit: 10,
    pageNum: 1,
    projectType: "team",
  });

  const { data: webProjects } = await getProjects({
    limit: 10,
    pageNum: 1,
    projectType: "web",
  });

  const { data: codingProjects } = await getProjects({
    limit: 10,
    pageNum: 1,
    projectType: "coding",
  });

  const projects: { projectType: ProjectType; items: Project[] }[] = [
    {
      projectType: "all",
      items: allProjects,
    },
    {
      projectType: "solo",
      items: soloProjects,
    },
    {
      projectType: "team",
      items: teamProjects,
    },
    {
      projectType: "web",
      items: webProjects,
    },
    {
      projectType: "coding",
      items: codingProjects,
    },
  ];
  return (
    <div className="bg-white rounded-[20px] drop-shadow-xl border border-border-primary p-6 space-y-4">
      <h3 className="text-2xl font-medium text-yankees-blue">My Projects</h3>
      <TabGroup className="pt-2">
        <div className="flex">
          <TabList className={tabListClassName}>
            {projects.map(({ projectType }) => {
              return (
                <Tab
                  className={twMerge(tabClassName, "capitalize")}
                  key={projectType}
                >
                  {projectType}
                </Tab>
              );
            })}
          </TabList>
        </div>
        <TabPanels className="pt-2">
          {projects.map(({ items, projectType }) => {
            return (
              <TabPanel key={projectType}>
                <ProjectsCarousel
                  projects={items}
                  projectType={projectType === "all" ? undefined : projectType}
                />
              </TabPanel>
            );
          })}
        </TabPanels>
      </TabGroup>
    </div>
  );
};
