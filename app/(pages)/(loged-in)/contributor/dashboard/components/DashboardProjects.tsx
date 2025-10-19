import Link from "next/link";
import { Button, ProjectCard } from "@components";
import { ChevronRightIcon } from "lucide-react";
import { getContributorJuniorProjects } from "../../../../../server/getContributorJuniorProjects";
import { NormalizedProject } from "../../../../../types/Projects";
import { EmptyData } from "@components/client";

export const DashboardProjects = async () => {
  const { data: projects } = await getContributorJuniorProjects({
    pageNumber: 1,
    pageSize: 2,
  });
  const completedProjects: NormalizedProject[] = projects.map((p) => ({
    ...p,
  }));

  return (
    <main className="bg-stone-50">
      <div className="bg-white rounded-[20px] drop-shadow-xl border border-border-primary">
        <div className="flex justify-between gap-2 flex-wrap items-center p-3 xl:py-8 md:py-4 xl:px-6 md:px-2">
          <h2 className="text-xl md:text-2xl font-medium text-yankees-blue">
            Projects ({projects.length})
          </h2>
          <Link href="./projects">
            <Button
              intent="tertiary"
              iconPosition="right"
              size="small"
              className="border-none text-violet-normal"
              icon={<ChevronRightIcon className="w-4 h-4" />}
            >
              View All
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-3 xl:gap-6 md:px-2 xl:px-6 pb-3 md:pb-10">
          {completedProjects.length > 0 ? (
            completedProjects.map((p) => (
              <div
                key={p.id}
                className="basis-full md:basis-[calc(50%_-_10px)]"
              >
                <ProjectCard
                  project={p}
                  showDescription={true}
                  showDueDate
                  showJuniors
                  showBadge
                  showRating={false}
                  showAge={false}
                  showProjectType={false}
                  buttonText="View Project"
                />
              </div>
            ))
          ) : (
            <EmptyData description="No projects added yet" projectsNum={0} />
          )}
        </div>
      </div>
    </main>
  );
};
