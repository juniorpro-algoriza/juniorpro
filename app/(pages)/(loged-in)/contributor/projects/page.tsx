export const dynamic = "force-dynamic";

// app/contributor/projects/index.tsx
import { ProjectCard } from "@components";
import { ProjectsHeader } from "../../admin/projects/components";
import { NormalizedProject } from "../../../../types/Projects";
import { getContributorJuniorProjects } from "../../../../server/getContributorJuniorProjects";

const ProjectsPage = async () => {
  const { data: projects } = await getContributorJuniorProjects({
    pageNumber: 1,
    pageSize: 30,
  });
  const completedProjects: NormalizedProject[] = projects.map((p) => ({
    ...p,
  }));

  return (
    <main className="min-h-screen px-6 py-3 bg-stone-50">
      <ProjectsHeader />
      <div className="bg-white rounded-[20px] drop-shadow-xl border border-border-primary">
        <div className="flex justify-between gap-2 flex-wrap items-center px-3 py-2 xl:py-8 md:py-4 md:px-6">
          <h2 className="text-xl md:text-2xl font-medium text-yankees-blue">
            Projects ({projects.length})
          </h2>
        </div>
        <div className="flex flex-wrap gap-2 px-3 xl:gap-6 md:px-6 pb-3 md:pb-10">
          {completedProjects.map((p) => (
            <div
              key={p.id}
              className="basis-full md:basis-[calc(50%_-_10px)] flex-1 xl:basis-[calc(30%_-_30px)] xl:max-w-[calc(33%_-_10px)]"
            >
              <ProjectCard
                project={p}
                showDescription={true}
                showDueDate
                showJuniors
                showBadge
                showRating={true}
                showAge={false}
                showProjectType={true}
                buttonText="View Project"
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default ProjectsPage;
