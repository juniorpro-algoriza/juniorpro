import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { ProjectsHeader } from "./ProjectsHeader";
import { tabClassName, tabListClassName } from "@styles";
import { ProjectsCarousel } from "./ProjectCarousel";
import { twMerge } from "tailwind-merge";
import type { Project, ProjectType } from "@types";
// TODO: whyyyyyy??
// import { getProjects } from "../../../../../server";
import { getProjects } from "@server";

export const ProjectsSection = async () => {
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
    <>
      <ProjectsHeader />
      <TabGroup className="pt-8">
        <div className="flex justify-center px-4">
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
        <TabPanels className="pt-10">
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
    </>
  );
};
