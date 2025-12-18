"use client";

import { ProjectCard } from "@components";
import { InfiniteCarousel } from "@components/client";
import { useState } from "react";
import { NormalizedProject } from "../../../../../types/Projects";
import { getLandingProjects } from "../../server";

interface ProjectCarouselProps {
  projects: NormalizedProject[];
  projectType?: number; // 1 = Team, 2 = Premium, 3 = Free
}

export const ProjectsCarousel = ({
  projects: initialProjects,
  projectType,
}: ProjectCarouselProps) => {
  const [currentPage, setCurrentPage] = useState(2); // Start from page 2 since page 1 is already loaded

  return (
    <InfiniteCarousel
      className="p-4"
      items={initialProjects}
      renderItem={(project) => (
        <ProjectCard
          project={project}
          showDescription={true}
          showAge={false}
          showStatus={false}
          showLevel={true}
          showRating={true}
          showBadge={true}
          showProjectType={true}
        />
      )}
      getItemKey={(project, index) => `${project.id}-${projectType}-${index}`}
      loadMore={async () => {
        const newProjects = await loadMoreProjects({
          projectType,
          pageNumber: currentPage,
        });
        setCurrentPage((prev) => prev + 1);
        return newProjects;
      }}
      maxItems={50}
      viewAllText="View All"
      onViewAll={() => {
        console.log("View all projects clicked");
      }}
    />
  );
};

type LoadMoreProjectsParams = {
  projectType?: number;
  pageNumber: number;
};

const loadMoreProjects = async ({
  projectType,
  pageNumber,
}: LoadMoreProjectsParams): Promise<NormalizedProject[]> => {
  try {
    const { data } = await getLandingProjects({
      pageNumber,
      pageSize: 6,
      projectType,
    });

    return data;
  } catch (error) {
    console.error("Error loading more projects:", error);
    return [];
  }
};
