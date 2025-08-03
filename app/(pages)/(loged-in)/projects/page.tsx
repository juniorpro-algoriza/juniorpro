import { ProjectCard } from "@components";
import { ProjectsHeader } from "./components";
import { getProjects } from "@server";
import { Select } from "@components/client";

const ProjectsPage = async () => {
  const { data: projects } = await getProjects({
    limit: 10,
    pageNum: 1,
    projectType: "all",
  });

  return (
    <main className="min-h-screen px-6 py-3 bg-stone-50">
      <ProjectsHeader />
      <div className="shadow-soft">
        <div className="flex justify-between items-center">
          <h2 className="relative px-1 py-2 text-2xl font-medium xl:py-8 md:py-4 xl:px-6 md:px-2 left-2">
            Projects ({projects.length})
          </h2>
          <Select
            description=""
            label=""
            options={[
              { value: "anas", label: "Anas" },
              { value: "One", label: "One" },
            ]}
          />
        </div>
        <div className="flex flex-wrap gap-2 px-1 xl:gap-6 md:px-2 xl:px-6">
          {projects.map((p) => {
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
                  showJuniors={true}
                  badgeText="status"
                  showBadgeNextToDueDate={false}
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
