import { ProjectCard } from "@components";
import { getProjects } from "../../(logged-out)/home/server";
import { ProjectsHeader } from "./components";

const ProjectsPage = async () => {
  const { data: projects } = await getProjects({
    limit: 10,
    pageNum: 1,
    projectType: "all",
  });

  return (
    <main className="min-h-screen px-6 py-3 bg-stone-50">
      <ProjectsHeader />
      <div className="flex flex-wrap">
        {projects.map((p) => {
          return (
            <div key={p.id} className="basis-1/3">
              <ProjectCard project={p} />
            </div>
          );
        })}
      </div>
    </main>
  );
};
export default ProjectsPage;
