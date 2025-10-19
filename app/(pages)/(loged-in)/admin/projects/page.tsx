import { Button, ProjectCard } from "@components";
import { pickRandom } from "@utils";
import { SearchInput } from "../../components/client";
import { ProjectsHeader } from "../../admin/projects/components";
import Link from "next/link";
import { getProjects } from "@server";
import { NormalizedProject } from "../../../../types/Projects";

interface ProjectsPageProps {
  searchParams: Promise<{ junior: string; query: string }>;
}

const ProjectsPage = async ({ searchParams }: ProjectsPageProps) => {
  const junior = (await searchParams).junior;

  const { data: projects } = await getProjects({
    limit: 30,
    pageNum: 1,
  });

  const completedProjects: NormalizedProject[] = projects.map((p) => ({
    ...p,
  }));

  let allProjects: NormalizedProject[] = completedProjects;
  if (junior === "all juniors") {
    allProjects = completedProjects
      .map((p) => ({
        ...p,
        juniors: ["Marwa", "Anas", pickRandom(["Adam", "Samy"])],
      }))
      .filter((_, index) => index % 5 === 0);
  }

  return (
    <main className="min-h-screen px-6 py-3 bg-stone-50">
      <ProjectsHeader />
      <div className="bg-white rounded-[20px] drop-shadow-xl border border-border-primary">
        {/* Header */}
        <div className="flex justify-between gap-2 flex-wrap items-center px-1 py-2 xl:py-8 md:py-4 xl:px-6 md:px-2">
          <h2 className="relative text-xl md:text-2xl font-medium left-2 top-1 text-yankees-blue whitespace-nowrap">
            Projects ({projects.length})
          </h2>
          <div className="flex items-center gap-2">
            <Link href="/admin/projects/new">
              <Button
                variant="primary"
                className="whitespace-nowrap text-sm"
                size="medium"
              >
                Add Project
              </Button>
            </Link>
            <SearchInput className="py-2" />
          </div>
        </div>

        {/* Projects grid */}
        <div className="flex flex-wrap gap-2 px-2 xl:gap-6 md:px-2 xl:px-6 pb-3 md:pb-10">
          {allProjects.map((p) => (
            <div
              key={p.id}
              className="basis-full md:basis-[calc(50%_-_10px)] flex-1 xl:basis-[calc(30%_-_30px)] xl:max-w-[calc(33%_-_10px)]"
            >
              <ProjectCard
                project={p}
                showDescription={true}
                showDueDate={true}
                showJuniors={true}
                showBadgeNextToDueDate={false}
                showBadge={true}
                showRating={false}
                showStatus={true}
                showAge={true}
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
