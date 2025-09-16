import { Project } from "@types";
import { ProjectsCarousel } from "../../home/components/ProjectsSection/ProjectCarousel";

interface ProjectsProps {
  projects: Project[];
}

export const Projects = ({ projects }: ProjectsProps) => {
  return (
    <>
      <h1 className="text-2xl font-medium text-yankees-blue mb-4">
        Project Cost
      </h1>
      <ProjectsCarousel projects={projects} />
    </>
  );
};
