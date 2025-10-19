"use client";

import { ProjectCard } from "@components";
import { InfiniteCarousel } from "@components/client";
import { getJoinedProjects } from "@server";
import { normalizeProject, sleep } from "@utils";
import { JoinedProject } from "../../../../../server/getJoinedProjectsJunior";
import { NormalizedProject } from "../../../../../types/Projects";

interface ProjectsCarouselProps {
  projects: JoinedProject[];
  projectType?: number;
}

export const ProjectsCarousel = ({
  projects: initialProjects,
  projectType,
}: ProjectsCarouselProps) => {
  // Use normalizeProject to get proper ProjectType
  const normalizedProjects: NormalizedProject[] = initialProjects.map(
    (project) =>
      normalizeProject({
        ...project,
        projectType: project.projectType, // numeric from API
        nameEn: project.projectNameEn,
        categoryNameEn: project.categoryNameEn,
        levelNameEn: "", // optional description
      })
  );

  const hasMore = initialProjects.length >= 10;
  const shouldShowNavigation = normalizedProjects.length > 1;

  const loadMoreHandler = async ({ numItems }: { numItems: number }) => {
    if (!hasMore) return [];

    await sleep(1);
    const currentPage = Math.ceil(numItems / 10) + 1;

    try {
      const { data: moreProjects } = await getJoinedProjects({
        pageSize: 10,
        pageNumber: currentPage,
        projectType: projectType as 1 | 2 | 3 | undefined,
      });

      if (!moreProjects || moreProjects.length === 0) return [];

      return moreProjects.map((project: JoinedProject) =>
        normalizeProject({
          ...project,
          projectType: project.projectType,
          nameEn: project.projectNameEn,
          categoryNameEn: project.categoryNameEn,
          levelNameEn: "", // optional description
        })
      );
    } catch (error) {
      console.error("Error loading more projects:", error);
      return [];
    }
  };

  return (
    <InfiniteCarousel
      className="py-4"
      items={normalizedProjects}
      renderItem={(project) => (
        <ProjectCard
          project={project}
          showDescription={true}
          showBadgeNextToDueDate={false}
          showDueDate={true}
          showJuniors={false}
          showBadge={true}
          showAge={false}
          showRating={false}
          showStatus={false}
          showProjectType={true}
          buttonText="View Project"
        />
      )}
      getItemKey={(project) => project.id.toLocaleString()}
      loadMore={loadMoreHandler}
      hasMore={hasMore}
      maxItems={50}
      showNavigation={shouldShowNavigation}
      showViewAll={hasMore}
      viewAllText="View All"
      onViewAll={() => {
        console.log("View all joined projects clicked");
      }}
    />
  );
};
