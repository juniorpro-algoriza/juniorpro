"use client";

import { InfiniteCarousel } from "@components/client";
import { Project } from "../../types";
import { ProjectCard } from "./ProjectCard";

export const ProjectsCarousel = ({
  projects: initialProjects,
}: {
  projects: Project[];
}) => {
  const loadMoreProjects = async ({
    numItems,
  }: {
    numItems: number;
  }): Promise<Project[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const last = initialProjects[initialProjects.length - 1];
        const arr = Array.from({ length: 6 }, (_, i) => i);
        const projectsNew = arr.map((i) => {
          const newProject = {
            ...last,
            id: `project-${numItems + i}`,
            title: `Project ${numItems + i}`,
          };
          return newProject;
        });
        resolve(projectsNew);
      }, 1500);
    });
  };

  return (
    <InfiniteCarousel
      items={initialProjects}
      renderItem={(project) => <ProjectCard project={project} />}
      getItemKey={(project) => project.id}
      loadMore={loadMoreProjects}
      maxItems={50}
      viewAllText="View All Projects"
      onViewAll={() => {
        console.log("View all projects clicked");
      }}
    />
  );
};
