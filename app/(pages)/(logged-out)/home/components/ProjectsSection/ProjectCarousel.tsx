'use client';

import {ProjectCard} from '@components';
import {InfiniteCarousel} from '@components/client';
import type {Project, ProjectType} from '@types';
import {capitalize, pickRandom, sleep} from '@utils';
import {getRandomUniqueId} from '@utils/server';

interface ProjectCarouselProps {
  projects: Project[];
  projectType?: ProjectType;
}
export const ProjectsCarousel = ({
  projects: initialProjects,
  projectType,
}: ProjectCarouselProps) => {
  return (
    <InfiniteCarousel
      className="p-4"
      items={initialProjects}
      renderItem={(project) => (
        <ProjectCard
          project={project}
          badgeText="projectType"
          showDescription={true}
          showBadgeNextToDueDate={false}
          showDueDate={true}
          showJuniors={false}
          showBadge={false}
          showRating={false}
        />
      )}
      getItemKey={(project) => project.id}
      loadMore={
        async () => console.log('helloo')
        // await loadMoreProjects({ initialProjects, projectType })
      }
      maxItems={50}
      viewAllText="View All"
      onViewAll={() => {
        console.log('View all projects clicked');
      }}
    />
  );
};

type LoadMoreProjectsParams = {
  initialProjects: Project[];
  projectType?: ProjectType;
};

const loadMoreProjects = async ({
  initialProjects,
  projectType,
}: LoadMoreProjectsParams): Promise<Project[]> => {
  await sleep(1);
  const last = initialProjects[initialProjects.length - 1];

  const arr = Array.from({length: 6}, (_, i) => i);
  const projectsNew = arr.map(async () => {
    let finalProjectType: ProjectType = 'solo';
    if (projectType) finalProjectType = projectType;
    else finalProjectType = pickRandom(['solo', 'team', 'web', 'coding']);
    const id = await getRandomUniqueId();
    const newProject = {
      ...last,
      id: `$project-${id}`,
      title: `${capitalize(finalProjectType)} Project - ${id.slice(0, 3)}`,
    };
    return newProject;
  });
  return Promise.all(projectsNew);
};
