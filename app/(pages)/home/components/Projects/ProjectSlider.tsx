"use client";

import { InfiniteCarousel } from "@components/client";
import { Project } from "../../types";
import { ProjectCard } from "./ProjectCard";

export const ProjectsSlider = ({
  projects: initialProjects,
}: {
  projects: Project[];
}) => {
  const loadMoreProjects = async (): Promise<Project[]> => {
    // Replace this with your actual API call
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
      renderItem={(project) => (
        <ProjectCard
          category={project.category}
          image={project.imageUrl}
          description={project.description}
          rating={project.rating}
          projectType={project.projectType}
          isFree={project.isFree}
          title={project.title}
        />
      )}
      getItemKey={(project, index) => `${project.id}-${index}`}
      loadMore={loadMoreProjects}
      maxItems={50}
      viewAllText="View All Projects"
      onViewAll={() => {
        console.log("View all projects clicked");
      }}
    />
  );
};
