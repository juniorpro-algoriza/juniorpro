"use client";

import { InfiniteCarousel } from "@components/client";
import { Project } from "../../types";
import { ProjectCard } from "./ProjectCard";

export const ProjectsCarousel = ({
  projects: initialProjects,
}: {
  projects: Project[];
}) => {
  const loadMoreProjects = async (): Promise<Project[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const last = initialProjects[initialProjects.length - 1];
        const newProject = {
          ...last,
          id: `${last.id}-${Date.now()}`,
          title: `Project ${initialProjects.length + 1}`,
        };
        resolve([newProject]);
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
