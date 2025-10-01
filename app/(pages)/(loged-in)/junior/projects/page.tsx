// app/contributor/projects/index.tsx
import { Button, ProjectCard } from "@components";
import { ProjectsHeader } from "../../admin/projects/components";
import { NormalizedProject } from "../../../../types/Projects";
import { getLandingProjects } from "../../../(logged-out)/home/server";

const ProjectsPage = async () => {
  // Fetch all projects
  const { data: projects } = await getLandingProjects();

  const completedProjects: NormalizedProject[] = projects.map((p) => ({
    ...p,
  }));

  return (
    <main className="min-h-screen px-6 py-3 bg-stone-50">
      <ProjectsHeader />
      <div className="bg-white rounded-[20px] drop-shadow-xl border border-border-primary">
        {/* Header */}
        <div className="flex justify-between gap-2 flex-wrap items-center px-1 py-2 xl:py-8 md:py-4 xl:px-6 md:px-2">
          <h2 className="relative text-xl md:text-2xl font-medium left-2 top-1 text-yankees-blue whitespace-nowrap">
            Projects ({projects.length})
          </h2>
        </div>

        {/* Projects grid */}
        <div className="flex flex-wrap gap-2 px-2 xl:gap-6 md:px-2 xl:px-6 pb-3 md:pb-10">
          {completedProjects.map((p) => (
            <div
              key={p.id}
              className="basis-full md:basis-[calc(50%_-_10px)] flex-1 xl:basis-[calc(30%_-_30px)] xl:max-w-[calc(33%_-_10px)]"
            >
              <ProjectCard
                showAge={false}
                showStatus={false}
                project={p}
                showDescription={false}
                showDueDate={true}
                showJuniors={true}
                showBadgeNextToDueDate={false}
                showBadge={true}
                showRating={false}
                buttonText="Join Project"
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default ProjectsPage;
