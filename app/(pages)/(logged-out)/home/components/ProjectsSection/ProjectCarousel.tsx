"use client";

import { InfiniteCarousel } from "@components/client";
import { Project, ProjectType } from "../../types";
import { capitalize, pickRandom, sleep } from "@utils";
import { getRandomUniqueId } from "@utils/server";
import { ProjectCard } from "@components";

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
      items={initialProjects}
      renderItem={(project) => <ProjectCard project={project} />}
      getItemKey={(project) => project.id}
      loadMore={async () =>
        await loadMoreProjects({ initialProjects, projectType })
      }
      maxItems={50}
      viewAllText="View All Projects"
      onViewAll={() => {
        console.log("View all projects clicked");
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

  const arr = Array.from({ length: 6 }, (_, i) => i);
  const projectsNew = arr.map(async () => {
    let finalProjectType: ProjectType = "solo";
    if (projectType) finalProjectType = projectType;
    else finalProjectType = pickRandom(["solo", "team", "web", "coding"]);
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
