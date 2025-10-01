'use client';

import { ProjectCard } from '@components';
import { InfiniteCarousel } from '@components/client';
import { getJoinedProjects } from '@server';
import { sleep } from '@utils';
import { JoinedProject } from '../../../../../server/getJoinedProjectsJunior';

interface ProjectsCarouselProps {
  projects: JoinedProject[];
  projectType?: number;
}

export const ProjectsCarousel = ({
  projects: initialProjects,
  projectType,
}: ProjectsCarouselProps) => {
  // Normalize projects to match ProjectCard expected format
  const normalizedProjects = initialProjects.map((project) => ({
    id: project.id,
    title: project.projectNameEn,
    description: '', 
    imageUrl: project.image,
    category: project.categoryNameEn,
    projectType: project.projectType.toString(),
    modificationDate: project.modificationDate,
    ageRange: '',
    isJoined: true,
  }));

  // Determine if there might be more items (if we got a full page, there might be more)
  const hasMore = initialProjects.length >= 10;
  
  // Determine if we should show navigation (more than 1 item)
  const shouldShowNavigation = normalizedProjects.length > 1;

  const loadMoreHandler = async ({ numItems }: { numItems: number }) => {
    // If we have less than 10 initial items, don't load more
    if (!hasMore) {
      return [];
    }

    await sleep(1);
    
    const currentPage = Math.ceil(numItems / 10) + 1;

    try {
      const { data: moreProjects } = await getJoinedProjects({
        pageSize: 10,
        pageNumber: currentPage,
        projectType: projectType as 1 | 2 | 3 | undefined,
      });

      // Return empty array if no more projects
      if (!moreProjects || moreProjects.length === 0) {
        return [];
      }

      // Normalize the new projects
      return moreProjects.map((project: JoinedProject) => ({
        id: project.id,
        title: project.projectNameEn,
        description: '',
        imageUrl: project.image,
        category: project.categoryNameEn,
        projectType: project.projectType.toString(),
        modificationDate: project.modificationDate,
        ageRange: '',
        isJoined: true,
      }));
    } catch (error) {
      console.error('Error loading more projects:', error);
      return [];
    }
  };

  return (
    <InfiniteCarousel
      className='py-4'
      items={normalizedProjects}
      renderItem={(project) => (
        <ProjectCard
          project={project}
          showDescription={false}
          showBadgeNextToDueDate={false}
          showDueDate={true}
          showJuniors={false}
          showBadge={true}
          showRating={false}
          buttonText="View Project"
        />
      )}
      getItemKey={(project) => project.id.toLocaleString()}
      loadMore={loadMoreHandler}
      hasMore={hasMore}
      maxItems={50}
      showNavigation={shouldShowNavigation}
      showViewAll={hasMore}
      viewAllText='View All'
      onViewAll={() => {
        console.log('View all joined projects clicked');
      }}
    />
  );
};

