import { ProjectCard } from "@components";
import { getProjects } from "../../../../server";
import { JuniorsDropdown, ProjectsHeader, SearchInput } from "./components";
import type { Project } from "@types";
import { pickRandom } from "@utils";

interface ProjectsPageProps {
  searchParams: Promise<{ junior: string; query: string }>;
}

const ProjectsPage = async ({ searchParams }: ProjectsPageProps) => {
  const junior = (await searchParams).junior;
  const searchQuery = (await searchParams).query;

  const { data: projects } = await getProjects({
    limit: 30,
    pageNum: 1,
    projectType: "all",
    juniors: junior[0] === "all juniors" ? [] : [junior],
    shouldIncludeProject: (p: Project) => {
      if (searchQuery) {
        const projectTitle = p.title;
        return projectTitle.toLowerCase().includes(searchQuery.toLowerCase());
      }
      return true;
    },
  });

  const juniors = ["all juniors", "anas", "marwa", "adam"];

  const completedProjects: Project[] = projects.map((p) => ({
    ...p,
    status: "completed",
  }));

  let allProjects: Project[] = completedProjects;
  if (junior === "all juniors") {
    allProjects = completedProjects
      .map((p) => ({
        ...p,
        juniors: ["Marwa", "Anas ", pickRandom(["Adam", "Samy"])],
      }))
      .filter((_, index) => {
        return index % 5 === 0;
      });
  }

  return (
    <main className="min-h-screen px-6 py-3 bg-stone-50">
      <ProjectsHeader />
      <div className="shadow-soft">
        <div className="flex justify-between items-center px-1 py-2 xl:py-8 md:py-4 xl:px-6 md:px-2 ">
          <h2 className="relative text-2xl font-medium left-2 top-1">
            Projects ({projects.length})
          </h2>
          <div className="flex items-center gap-2">
            <JuniorsDropdown juniors={juniors} />
            <SearchInput />
          </div>
        </div>
        <div className="flex flex-wrap gap-2 px-1 xl:gap-6 md:px-2 xl:px-6">
          {allProjects.map((p) => {
            return (
              <div
                key={p.id}
                className="basis-full md:basis-[calc(50%_-_10px)] flex-1 xl:basis-[calc(30%_-_30px)] xl:max-w-[calc(33%_-_10px)]
"
              >
                <ProjectCard
                  project={p}
                  showDescription={false}
                  showDueDate={true}
                  showJuniors={false}
                  badgeText="status"
                  showBadgeNextToDueDate={false}
                  showBadge={true}
                  showRating={false}
                  showJuniorCount={true}
                />
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};
export default ProjectsPage;
